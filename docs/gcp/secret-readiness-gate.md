# HM-GCP-003E.2-B — Secret Readiness Gate

**Статус:** Proposed
**Тип:** Операционный процесс / preflight-проверка (НЕ архитектурное решение — ADR не требуется, см. `docs/architecture/adr-checklist.md`: ADR фиксирует только "что и почему", детали реализации выносятся в инженерные задачи)
**Связано с:** HM-GCP-003E (Bootstrap Apply), `docs/gcp/deployment-checklist.md` (раздел "После apply (до первого рабочего релиза)")
**Не затрагивает:** `deletion_protection`, ручной IAM, dual-context архитектуру (ADR-0005), значения секретов, ADR-документы

---

## Проблема

`deployment-checklist.md` уже фиксирует шаг «Добавить версии секретов» и предупреждает, что без этого «ревизия Cloud Run с секретными env не стартует — ожидаемо». Однако это **необязательный пункт списка**, а не проверяемое условие: ничего технически не мешает выполнить `terraform apply` до того, как версии секретов будут добавлены.

Результат такого пропуска на практике:
1. Cloud Run пытается создать ревизию, обращаясь к `secret_key_ref` с `version = "latest"`.
2. Версии не существует → readiness-check проваливается (`SECRETS_ACCESS_CHECK_FAILED`).
3. Сервис становится `tainted`.
4. Следующий `terraform plan`/`apply` требует destroy+recreate сервиса.
5. Apply блокируется на `deletion_protection`, требуя ручного вмешательства.

Secret Readiness Gate переносит эту проверку **до** `terraform apply`, чтобы недостающая версия секрета останавливала процесс с понятной ошибкой, а не приводила к tainted-ресурсу и блокировке на уровне state.

---

## Правило (обязательное условие)

> **Cloud Run apply запрещён, если у любого runtime-секрета, реально используемого в `google_cloud_run_v2_service.web` (через `local.secret_env_map`), нет хотя бы одной версии в состоянии `ENABLED`.**

Это правило — hard gate, а не рекомендация. Наличие созданного контейнера секрета (`google_secret_manager_secret`) недостаточно — проверяется именно версия.

---

## Проверяемые секреты (минимум)

| Секрет | Условие проверки |
|---|---|
| `auth-secret` | Всегда, если сервис деплоится |
| `google-client-id` | Всегда, если сервис деплоится |
| `google-client-secret` | Всегда, если сервис деплоится |
| `database-url` | **Только если** `database-url` реально присутствует в `local.secret_env_map` на момент проверки |

Список секретов для проверки должен браться из фактического содержимого `local.secret_env_map` в момент запуска gate, а не быть захардкожен — таблица выше отражает известный на сегодня минимум, взятый из `deployment-checklist.md`.

### Решение по `database-url`

Одно из двух — должно быть явно зафиксировано перед деплоем:

- **(a) `database-url` остаётся в Cloud Run runtime secret map** → он обязан пройти gate наравне с остальными тремя секретами (см. таблицу).
- **(b) `database-url` откладывается архитектурно** (до решения по dual-context / Personal Context) → он должен быть **временно исключён** из `local.secret_env_map`, чтобы Cloud Run вообще не пытался на него ссылаться. Это изменение вносится отдельно и не описывается данным документом — фиксируется как отдельная инженерная задача с явной пометкой "временно, до дуал-контекст решения".

Gate не принимает решение (a) или (b) сам — это решение принимает Markelus до запуска gate.

---

## Preflight-скрипт (PowerShell)

Скрипт ничего не создаёт и не изменяет — только читает состояние Secret Manager и завершает работу с ненулевым кодом, если условие не выполнено.

```powershell
# secret-readiness-gate.ps1
# Использование: .\secret-readiness-gate.ps1 -ProjectId housemaster-dev-503409
# Опционально: -Secrets @("auth-secret","google-client-id","google-client-secret","database-url")

param(
    [Parameter(Mandatory = $true)]
    [string]$ProjectId,

    [string[]]$Secrets = @("auth-secret", "google-client-id", "google-client-secret", "database-url")
)

$failed = @()

foreach ($secretName in $Secrets) {
    Write-Host "Checking secret: $secretName ..." -ForegroundColor Cyan

    $existsCheck = & gcloud secrets describe $secretName --project=$ProjectId --format="value(name)" 2>$null
    if (-not $existsCheck) {
        Write-Host "  [FAIL] Secret '$secretName' does not exist in project $ProjectId." -ForegroundColor Red
        $failed += "$secretName (secret container not found)"
        continue
    }

    $enabledVersions = & gcloud secrets versions list $secretName `
        --project=$ProjectId `
        --filter="state:ENABLED" `
        --format="value(name)" 2>$null

    if (-not $enabledVersions) {
        Write-Host "  [FAIL] Secret '$secretName' has no ENABLED version." -ForegroundColor Red
        $failed += "$secretName (no ENABLED version)"
    }
    else {
        Write-Host "  [OK] Secret '$secretName' has at least one ENABLED version." -ForegroundColor Green
    }
}

Write-Host ""
if ($failed.Count -gt 0) {
    Write-Host "Secret Readiness Gate: FAILED" -ForegroundColor Red
    Write-Host "The following secrets are not ready for Cloud Run deployment:" -ForegroundColor Red
    $failed | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Write-Host ""
    Write-Host "Do NOT run 'terraform apply' until these are resolved." -ForegroundColor Yellow
    exit 1
}
else {
    Write-Host "Secret Readiness Gate: PASSED" -ForegroundColor Green
    Write-Host "All checked secrets have at least one ENABLED version. Safe to proceed to 'terraform plan'." -ForegroundColor Green
    exit 0
}
```

Скрипт не хранит и не выводит значения секретов — только имена и статус версий (`ENABLED` / отсутствует).

---

## Процесс (обязательная последовательность)

1. Запустить `secret-readiness-gate.ps1` для целевого проекта.
2. Если gate **FAILED** — остановиться. Добавить недостающие версии вручную (`gcloud secrets versions add ...`, см. `deployment-checklist.md`) либо, для `database-url`, принять и зафиксировать решение (a)/(b) выше. Повторить шаг 1.
3. Если gate **PASSED** — выполнить `terraform plan -var-file=dev.tfvars -out=<plan>.plan`.
4. Проверить план: **если план требует destroy/recreate `google_cloud_run_v2_service.web`** — остановиться и разобраться в причине (не выполнять apply вслепую; это тот же класс проблемы, что уже был диагностирован ранее).
5. Только если план **не** содержит destroy/recreate по Cloud Run — выполнять `terraform apply`.

Gate не заменяет и не отменяет существующие шаги `deployment-checklist.md` — он добавляется как обязательная точка **перед** первым `terraform plan`/`apply` после создания контейнеров секретов.

---

## Явно вне рамок этого документа

- Изменение `deletion_protection` — не выполняется этим документом ни при каких условиях.
- Ручной IAM (`gcloud secrets add-iam-policy-binding` и т.п.) — не входит в scope gate; текущий IAM-биндинг уже проверен и корректен.
- Архитектурное решение по dual-context / Personal Context для `database-url` — принимается отдельно, вне этого документа.
- Управление содержимым/значениями секретов через Terraform — намеренно исключено (см. отклонённый вариант A в обсуждении HM-GCP-003E.2).
- Новый ADR — не требуется (см. пометку "Тип" выше).

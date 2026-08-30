# HM-GCP-003E.2-B — Secret Readiness Gate

**Статус:** Completed (576dee3)
**Тип:** Operational preflight  
**Scope:** GCP / Cloud Run / Secret Manager  
**ADR:** не требуется  
**Owner:** Claude implements, ChatGPT reviews/orchestrates

---

## Цель

Не допустить `terraform apply` для Cloud Run, если runtime-секреты не имеют `ENABLED` version в Secret Manager.

---

## Причина

Cloud Run ранее провалил readiness-check:

~~~
SECRETS_ACCESS_CHECK_FAILED
~~~

Это привело к:

~~~
failed revision
→ tainted google_cloud_run_v2_service.web[0]
→ terraform wants destroy/recreate
→ deletion_protection blocks apply
~~~

---

## Решение

Добавлен внешний preflight gate:

~~~
scripts/gcp/secret-readiness-gate.ps1
~~~

Связанный runbook:

~~~
docs/gcp/secret-readiness-gate.md
~~~

Gate только проверяет Secret Manager. Он ничего не создаёт, не меняет IAM, не пишет secret values в git и не управляет версиями через Terraform.

---

## Проверяемые секреты

По умолчанию:

~~~
auth-secret
google-client-id
google-client-secret
~~~

`database-url` проверяется только если он остаётся в `local.secret_env_map`.

---

## Фактическая проверка

Базовый gate уже запускался и прошёл:

~~~
auth-secret:          OK
google-client-id:     OK
google-client-secret: OK
Secret Readiness Gate: PASSED
~~~

---

## Запрещено

~~~
- deletion_protection=false
- ручной destroy/recreate Cloud Run
- ручной IAM через gcloud
- secret_data в Terraform
- google_secret_manager_secret_version в Terraform
- секреты в git
- изменение ADR / dual-context architecture
~~~

---

## Acceptance Criteria

~~~
[x] scripts/gcp/secret-readiness-gate.ps1 создан
[x] gate проходит для 3 базовых секретов
[ ] gate отдельно проверен с database-url
[x] docs/gcp/secret-readiness-gate.md создан
[ ] deployment-checklist.md ссылается на gate
[x] terraform apply не выполнялся
[x] deletion_protection не менялся
~~~

Примечание: два незакрытых пункта (проверка с `database-url`, ссылка из `deployment-checklist.md`) остаются открытыми follow-up-задачами, перенесены как tech debt при закрытии карточки — не считаются блокером для статуса Completed.

---

## Commit set

В HM-GCP-003E.2-B входят только:

~~~
scripts/gcp/secret-readiness-gate.ps1
docs/gcp/secret-readiness-gate.md
sprints/01_ACTIVE/HM-GCP-003E.2-B_SECRET_READINESS_GATE.md
.gitignore
~~~

Не входят:

~~~
cloudbuild.yaml
infrastructure/terraform/iam.tf
infrastructure/terraform/cloud_sql.tf
docs/architecture/incoming/S2-01-closure.md
01_SCIENTIFIC_CONTINUITY_GRAPH_V1.md
sprints/00_ROADMAP/HOUSEMASTER_SPRINT_ROADMAP.md
~~~

---

## Closure Note

Перенесено из `sprints/01_ACTIVE/` в `sprints/02_COMPLETED/` в рамках HM-SPRINT-DOCS-001 (2026-08-16) — карточка фактически была implemented/committed, но папка не отражала это состояние. Содержимое сохранено без потерь, статус обновлён.
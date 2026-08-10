# HM-GCP-003E.2-B — Secret Readiness Gate

**Статус:** Implemented / pending commit  
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

```text
SECRETS_ACCESS_CHECK_FAILED
```

Это привело к:

```text
failed revision
→ tainted google_cloud_run_v2_service.web[0]
→ terraform wants destroy/recreate
→ deletion_protection blocks apply
```

---

## Решение

Добавлен внешний preflight gate:

```text
scripts/gcp/secret-readiness-gate.ps1
```

Связанный runbook:

```text
docs/gcp/secret-readiness-gate.md
```

Gate только проверяет Secret Manager. Он ничего не создаёт, не меняет IAM, не пишет secret values в git и не управляет версиями через Terraform.

---

## Проверяемые секреты

По умолчанию:

```text
auth-secret
google-client-id
google-client-secret
```

`database-url` проверяется только если он остаётся в `local.secret_env_map`.

---

## Фактическая проверка

Базовый gate уже запускался и прошёл:

```text
auth-secret:          OK
google-client-id:     OK
google-client-secret: OK
Secret Readiness Gate: PASSED
```

---

## Запрещено

```text
- deletion_protection=false
- ручной destroy/recreate Cloud Run
- ручной IAM через gcloud
- secret_data в Terraform
- google_secret_manager_secret_version в Terraform
- секреты в git
- изменение ADR / dual-context architecture
```

---

## Acceptance Criteria

```text
[x] scripts/gcp/secret-readiness-gate.ps1 создан
[x] gate проходит для 3 базовых секретов
[ ] gate отдельно проверен с database-url
[x] docs/gcp/secret-readiness-gate.md создан
[ ] deployment-checklist.md ссылается на gate
[x] terraform apply не выполнялся
[x] deletion_protection не менялся
```

---

## Commit set

В HM-GCP-003E.2-B входят только:

```text
scripts/gcp/secret-readiness-gate.ps1
docs/gcp/secret-readiness-gate.md
sprints/01_ACTIVE/HM-GCP-003E.2-B_SECRET_READINESS_GATE.md
.gitignore
```

Не входят:

```text
cloudbuild.yaml
infrastructure/terraform/iam.tf
infrastructure/terraform/cloud_sql.tf
docs/architecture/incoming/S2-01-closure.md
01_SCIENTIFIC_CONTINUITY_GRAPH_V1.md
sprints/00_ROADMAP/HOUSEMASTER_SPRINT_ROADMAP.md
```

---

## Next Step

```text
Claude reviews final card content
→ confirms clean commit set
→ Markelus commits HM-GCP-003E.2-B
```
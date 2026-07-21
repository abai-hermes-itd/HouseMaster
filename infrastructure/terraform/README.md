# HouseMaster — Terraform Foundation (HM-GCP-002)

Infrastructure as Code для Google Cloud Platform. Описывает **всю** базовую инфраструктуру HouseMaster: сервисные аккаунты, IAM, Secret Manager, Cloud Storage, Artifact Registry, Cloud Run, Pub/Sub и задел под Vertex AI.

Связанные документы: [`docs/architecture/002-gcp-architecture.md`](../../docs/architecture/002-gcp-architecture.md) (целевая архитектура), [ADR-0002](../../docs/adr/ADR-0002-gcp-first.md) (GCP First), [ADR-0003](../../docs/adr/ADR-0003-cloud-sql-postgresql.md) (Cloud SQL — Terraform для БД добавится в HM-GCP-003).

---

## Структура

| Файл | Назначение |
|---|---|
| `versions.tf` | Требования: Terraform >= 1.8, Google Provider ~> 6.0 |
| `backend.tf` | Remote state в GCS (параметры — через `-backend-config`) |
| `providers.tf` | Провайдер Google (project/region из переменных) |
| `apis.tf` | Включение API проекта (run, artifactregistry, secretmanager, pubsub, aiplatform, …) |
| `variables.tf` | Все входные переменные; хардкода в ресурсах нет |
| `locals.tf` | Метки, список секретов, соответствие secret → env |
| `service_accounts.tf` | 4 SA: `sa-web` (рантайм), `sa-ai-worker` (Vertex), `sa-cloudbuild` (сборка), `sa-deployer` (CI/CD) |
| `iam.tf` | Least privilege: гранты на уровне ресурсов; Owner/Editor не используются |
| `secret_manager.tf` | Контейнеры секретов (без значений) |
| `storage.tf` | Бакеты images / documents / media |
| `artifact_registry.tf` | Docker-репозиторий + политика очистки старых образов |
| `cloud_run.tf` | Сервис `next-web`: порт 8080, автоскейлинг, env + секреты, SA |
| `logging.tf` | Срок хранения логов; logs-based метрика ERROR-записей приложения |
| `monitoring.tf` | Канал уведомлений (e-mail) и алерты: 5xx, p95 latency, DLQ, ERROR-логи. Создаются только при заданном `alert_email` |
| `pubsub.tf` | Topic `knowledge-indexing`, подписка воркера, DLQ |
| `vertex_ai.tf` | Staging-bucket Vector Search; скелет индекса (Phase 2) |
| `outputs.tf` | URL сервиса, e-mail'ы SA, имена бакетов, путь registry |
| `dev.tfvars.example` / `prod.tfvars.example` | Шаблоны конфигураций окружений |
| `backend-*.tfbackend.example` | Шаблоны конфигурации remote state |

Окружения `dev` и `prod` — **отдельные GCP-проекты** с одним и тем же кодом и разными tfvars. Workspaces не используются: изоляция на уровне проектов надёжнее (биллинг, квоты, IAM).

---

## Схема поставки

```text
Terraform ──► Cloud Build ──► Artifact Registry ──► Cloud Run
   │                                                   │
   │ владеет конфигурацией                             ▼
   │ (SA, IAM, secrets, buckets,                   Vertex AI
   │  pubsub, logging, monitoring)                     │
   │                                                   ▼
   └───────────────────────────────────────────►   Storage
                                                       │
                                                       ▼
                                                    Pub/Sub ──► Monitoring
```

Terraform владеет конфигурацией; CI/CD владеет версиями образов
(`lifecycle.ignore_changes` на image в `cloud_run.tf`). Полный bootstrap —
в [`docs/gcp/deployment-checklist.md`](../../docs/gcp/deployment-checklist.md).

---

## Предварительные условия (однократный bootstrap)

1. Созданы GCP-проекты `housemaster-dev` и `housemaster-prod`, привязан биллинг.
2. Установлены `terraform >= 1.8` и `gcloud`; выполнен вход:
   ```bash
   gcloud auth application-default login
   ```
3. Создан bucket состояния (для каждого окружения):
   ```bash
   gsutil mb -l europe-west1 gs://housemaster-dev-tfstate
   gsutil versioning set on gs://housemaster-dev-tfstate
   ```
4. Скопированы и заполнены конфигурации:
   ```bash
   cp dev.tfvars.example dev.tfvars
   cp backend-dev.tfbackend.example backend-dev.tfbackend
   ```

---

## Порядок применения

```bash
# 1. Инициализация (провайдер + remote state)
terraform init -backend-config=backend-dev.tfbackend

# 2. Проверка формата и валидность
terraform fmt -check -recursive
terraform validate

# 3. План — прочитать ДО apply
terraform plan -var-file=dev.tfvars

# 4. Применение
terraform apply -var-file=dev.tfvars
```

Для prod — те же команды с `prod.tfvars` / `backend-prod.tfbackend` (и `terraform init -reconfigure` при переключении окружения; либо два локальных клона каталога).

### После первого apply — обязательные ручные шаги

1. **Добавить версии секретов** (Terraform создаёт только контейнеры):
   ```bash
   echo -n "<значение>" | gcloud secrets versions add auth-secret --project=housemaster-dev --data-file=-
   # аналогично: google-client-id, google-client-secret, database-url
   ```
   Пока версий нет, ревизия Cloud Run с секретными env **не стартует** — это ожидаемо: первая рабочая выкатка происходит после настройки OAuth (Phase 1) и заполнения секретов.
2. Проверить outputs: `terraform output`.

---

## Принятые решения и отклонения от ТЗ

| Пункт | Решение |
|---|---|
| `VERTEX_API_KEY` | **Не создаётся.** Vertex AI аутентифицируется через service accounts + IAM (`roles/aiplatform.user`), API-ключи не применяются. Обоснование — в комментарии `secret_manager.tf`. |
| Cloud SQL | Вне охвата по ТЗ («SQL не писать»). Секрет `database-url` и API `sqladmin` (закомментирован в `apis.tf`) подготовлены; ресурсы БД — задача **HM-GCP-003**. |
| Vector Search Index | Отложен до Phase 2: требует размерности эмбеддингов конкретной модели, а развёрнутый endpoint тарифицируется за существование. Скелет — в `vertex_ai.tf`. |
| Образ Cloud Run | Заглушка Google по умолчанию; смену образа Terraform игнорирует (`ignore_changes`) — релизы выполняет CI/CD. Terraform владеет конфигурацией, CI/CD — версиями. |
| Размещение кода | Terraform живёт в монорепо (`infrastructure/terraform/`), а не в отдельном репозитории — уточнение к ADR-0001/0002. |

## Ограничения (по ТЗ)

Не используются: Firebase, App Engine, Compute Engine, GKE, Cloud Functions. Не входит в охват: Cloud Build pipeline, GitHub Actions, OAuth-настройка, ресурсы SQL, код приложения.

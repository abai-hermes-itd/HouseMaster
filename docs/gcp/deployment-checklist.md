# HouseMaster — Deployment Checklist (Bootstrap)

| Поле | Значение |
|---|---|
| Документ | docs/gcp/deployment-checklist.md |
| Идентификатор | HM-GCP-004 |
| Назначение | Пошаговый bootstrap окружения GCP до первого рабочего деплоя |
| Связано | `infrastructure/terraform/README.md`, `002-gcp-architecture.md` |

Чек-лист выполняется **один раз на окружение** (dev, затем prod). Команды даны для dev — для prod заменить `housemaster-dev` → `housemaster-prod` и файлы `dev.*` → `prod.*`.

---

## Схема поставки

```text
        Terraform
            │   создаёт и владеет: SA, IAM, Secret Manager, buckets,
            │   Artifact Registry, Cloud Run (конфигурация), Pub/Sub,
            │   Logging, Monitoring
            ▼
        Cloud Build
            │   собирает образ по Dockerfile, прогоняет линт и тесты
            │   (пайплайн — cloudbuild.yaml, реализация на фазе деплоя)
            ▼
     Artifact Registry
            │   хранит неизменяемые образы; тег = commit SHA
            ▼
        Cloud Run
            │   выкатка ревизии (образ меняет CI/CD, Terraform игнорирует);
            │   рантайм под sa-web, секреты из Secret Manager
            ▼
        Vertex AI
            │   Gemini / Vision / Document AI / Embeddings — вызовы
            │   из приложения и AI-воркеров под IAM
            ▼
         Storage
            │   images / documents / media + vertex-staging;
            │   доступ только через signed URLs приложения
            ▼
         Pub/Sub
            │   knowledge-indexing → воркер; сбои → DLQ
            ▼
        Monitoring
                алерты: 5xx, p95 latency, DLQ, ERROR-логи
                (создаются при заданном alert_email)
```

---

## Чек-лист

### ✔ 1. Создать Project

```bash
gcloud projects create housemaster-dev --name="HouseMaster Dev"
gcloud config set project housemaster-dev
```

- [ ] Проект создан, ID зафиксирован в `dev.tfvars` (`project_id`)

### ✔ 2. Billing

```bash
gcloud billing accounts list
gcloud billing projects link housemaster-dev --billing-account=XXXXXX-XXXXXX-XXXXXX
```

- [ ] Биллинг привязан (без него API не включатся)
- [ ] Настроен budget alert на аккаунте (рекомендация: консоль → Billing → Budgets)

### ✔ 3. API

Базовые API для работы самого Terraform (остальные включит `apis.tf`):

```bash
gcloud services enable cloudresourcemanager.googleapis.com \
                       serviceusage.googleapis.com \
                       iam.googleapis.com
```

- [ ] Три bootstrap-API включены

### ✔ 4. Bucket tfstate

```bash
gsutil mb -l europe-west1 -p housemaster-dev gs://housemaster-dev-tfstate
gsutil versioning set on gs://housemaster-dev-tfstate
```

- [ ] Bucket создан, версионирование включено
- [ ] Имя вписано в `backend-dev.tfbackend` (копия `backend-dev.tfbackend.example`)

### ✔ 5. Service Account (для запуска Terraform)

Вариант A — **личная учётка (рекомендуется для bootstrap):**

```bash
gcloud auth application-default login
```

Вариант B — выделенный SA (для будущего CI-запуска Terraform):

```bash
gcloud iam service-accounts create sa-terraform \
  --display-name="Terraform runner"
# Роли: минимум для управления описанными ресурсами
for role in roles/run.admin roles/storage.admin roles/artifactregistry.admin \
            roles/secretmanager.admin roles/pubsub.admin roles/iam.serviceAccountAdmin \
            roles/resourcemanager.projectIamAdmin roles/logging.admin roles/monitoring.admin \
            roles/serviceusage.serviceUsageAdmin; do
  gcloud projects add-iam-policy-binding housemaster-dev \
    --member="serviceAccount:sa-terraform@housemaster-dev.iam.gserviceaccount.com" \
    --role="$role"
done
```

- [ ] Аутентификация Terraform настроена (ADC или SA через impersonation; **json-ключи не создавать**)

### ✔ 6. Terraform Init

```bash
cd infrastructure/terraform
cp dev.tfvars.example dev.tfvars                      # заполнить значения
cp backend-dev.tfbackend.example backend-dev.tfbackend
terraform init -backend-config=backend-dev.tfbackend
terraform fmt -check -recursive
terraform validate
```

- [ ] `init` прошёл, state подключён к GCS
- [ ] `fmt -check` и `validate` — без ошибок

### ✔ 7. Terraform Plan

```bash
terraform plan -var-file=dev.tfvars -out=dev.plan
```

- [ ] План прочитан полностью; только создания (`+`), никаких неожиданных изменений
- [ ] Ожидаемый состав: APIs, 4 SA, IAM-гранты, 4 секрета, 4 бакета, Artifact Registry, Cloud Run, 2 topic + подписка, logging; алерты — только при заданном `alert_email`

### ✔ 8. Terraform Apply

```bash
terraform apply dev.plan
terraform output
```

- [ ] Apply завершён без ошибок, outputs получены

---

## После apply (до первого рабочего релиза)

- [ ] **Добавить версии секретов** (Terraform создал только контейнеры):
  ```bash
  echo -n "<значение>" | gcloud secrets versions add auth-secret --data-file=-
  # аналогично: google-client-id, google-client-secret, database-url
  ```
  До этого ревизия Cloud Run с секретными env не стартует — ожидаемо.
- [ ] Создать OAuth-клиент админ-контура (тип **Internal**, в организации abay-germes.kz), значения → в секреты (HM-005); клиент контура Users и SMTP — при HM-006
- [ ] Первая сборка образа через Cloud Build → Artifact Registry → выкатка
- [ ] Проверить `cloud_run_service_url` из outputs в браузере
- [ ] prod: повторить чек-лист; убедиться, что `alert_email` задан и алерты созданы

## Откат

Ошибка релиза → переключить трафик на предыдущую ревизию Cloud Run (консоль или `gcloud run services update-traffic`). Ошибка инфраструктуры → `terraform plan` покажет дрейф; state в GCS версионируется — восстановление возможно.

---

> TODO
>
> Legacy secret names require review after HM-GCP-003E.2.

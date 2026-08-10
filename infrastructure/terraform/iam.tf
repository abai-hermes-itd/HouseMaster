# Разграничение прав: least privilege, без Owner/Editor.
# Правила:
#   - гранты на уровне ресурса (bucket, secret, topic, service), где возможно;
#   - project-level роли — только там, где ресурсного уровня нет (Vertex AI);
#   - никакой SA не имеет прав шире своей функции.
#
# Паттерн for_each (HM-GCP-003D.3): ключи for_each берутся из статичных
# `local` (local.runtime_secrets, local.buckets), а не из целого upstream-
# ресурса. Значения получаются через индексацию [each.key] — сохраняет
# implicit dependency, но не требует существования upstream-ресурса в state
# на момент terraform import: ссылка на for_each целого ресурса ломает import
# (команда не строит полный граф зависимостей и не может разрешить ключи).

# ─────────────────────────────────────────────────────────────────────────────
# sa-web — рантайм приложения
# ─────────────────────────────────────────────────────────────────────────────

# Чтение всех рантайм-секретов (грант на каждый секрет, не на проект)
resource "google_secret_manager_secret_iam_member" "web_secret_access" {
  for_each = toset(local.runtime_secrets)

  project   = var.project_id
  secret_id = google_secret_manager_secret.runtime[each.key].secret_id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run.email}"
}

# Работа с объектами своих бакетов (чтение/запись, signed URLs)
resource "google_storage_bucket_iam_member" "web_bucket_rw" {
  for_each = local.buckets

  bucket = google_storage_bucket.buckets[each.key].name
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${google_service_account.cloud_run.email}"
}

# Вызов моделей Vertex AI (ресурсного уровня нет — project-level, узкая роль)
resource "google_project_iam_member" "web_vertex_user" {
  project = var.project_id
  role    = "roles/aiplatform.user"
  member  = "serviceAccount:${google_service_account.cloud_run.email}"
}

# Публикация задач индексации в topic (грант на topic)
resource "google_pubsub_topic_iam_member" "web_publish_indexing" {
  project = var.project_id
  topic   = google_pubsub_topic.knowledge_indexing.name
  role    = "roles/pubsub.publisher"
  member  = "serviceAccount:${google_service_account.cloud_run.email}"
}

# ─────────────────────────────────────────────────────────────────────────────
# sa-ai-worker — AI-конвейер
# ─────────────────────────────────────────────────────────────────────────────

resource "google_project_iam_member" "worker_vertex_user" {
  project = var.project_id
  role    = "roles/aiplatform.user"
  member  = "serviceAccount:${google_service_account.vertex_worker.email}"
}

# Чтение исходных документов и фото (только чтение — воркер не пишет в бакеты)
resource "google_storage_bucket_iam_member" "worker_docs_read" {
  for_each = {
    documents = google_storage_bucket.buckets["documents"].name
    images    = google_storage_bucket.buckets["images"].name
  }

  bucket = each.value
  role   = "roles/storage.objectViewer"
  member = "serviceAccount:${google_service_account.vertex_worker.email}"
}

# Потребление задач из подписки (грант на subscription)
resource "google_pubsub_subscription_iam_member" "worker_subscribe" {
  project      = var.project_id
  subscription = google_pubsub_subscription.knowledge_indexing_worker.name
  role         = "roles/pubsub.subscriber"
  member       = "serviceAccount:${google_service_account.vertex_worker.email}"
}

# ─────────────────────────────────────────────────────────────────────────────
# sa-cloudbuild — сборка
# ─────────────────────────────────────────────────────────────────────────────

# Push образов в конкретный репозиторий (грант на repository)
resource "google_artifact_registry_repository_iam_member" "build_push" {
  project    = var.project_id
  location   = var.region
  repository = google_artifact_registry_repository.docker.repository_id
  role       = "roles/artifactregistry.writer"
  member     = "serviceAccount:${google_service_account.cloud_build.email}"
}

resource "google_project_iam_member" "build_logs" {
  project = var.project_id
  role    = "roles/logging.logWriter"
  member  = "serviceAccount:${google_service_account.cloud_build.email}"
}

# ─────────────────────────────────────────────────────────────────────────────
# sa-deployer — выкатка
# ─────────────────────────────────────────────────────────────────────────────

# Деплой ревизий (developer, не admin: без управления IAM сервиса)
resource "google_cloud_run_v2_service_iam_member" "deployer_run" {
  count = var.deploy_cloud_run ? 1 : 0

  project  = var.project_id
  location = var.region
  name     = google_cloud_run_v2_service.web[0].name
  role     = "roles/run.developer"
  member   = "serviceAccount:${google_service_account.cicd_deployer.email}"
}

# Право выпускать ревизии ОТ ИМЕНИ sa-web (actAs строго на один SA)
resource "google_service_account_iam_member" "deployer_act_as_web" {
  service_account_id = google_service_account.cloud_run.name
  role               = "roles/iam.serviceAccountUser"
  member             = "serviceAccount:${google_service_account.cicd_deployer.email}"
}

# ─────────────────────────────────────────────────────────────────────────────
# Публичный HTTP-доступ к сервису (вход в приложение).
# Авторизацию пользователей выполняет само приложение (Workspace OAuth + RBAC).
# ─────────────────────────────────────────────────────────────────────────────

resource "google_cloud_run_v2_service_iam_member" "public_invoker" {
  count = (var.deploy_cloud_run && var.cloud_run_allow_unauthenticated) ? 1 : 0

  project  = var.project_id
  location = var.region
  name     = google_cloud_run_v2_service.web[0].name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
# ─────────────────────────────────────────────────────────────────────────────
# sa-cloudbuild — дополнительные права для CI/CD (HM-CI-001)
# ─────────────────────────────────────────────────────────────────────────────

# Доступ к Cloud Build source bucket
resource "google_project_iam_member" "build_storage" {
  project = var.project_id
  role    = "roles/storage.objectAdmin"
  member  = "serviceAccount:${google_service_account.cloud_build.email}"
}

# Чтение образов из Artifact Registry внутри Cloud Build
resource "google_project_iam_member" "build_registry_read" {
  project = var.project_id
  role    = "roles/artifactregistry.reader"
  member  = "serviceAccount:${google_service_account.cloud_build.email}"
}

# Деплой ревизий Cloud Run из Cloud Build
resource "google_project_iam_member" "build_run_developer" {
  count   = var.deploy_cloud_run ? 1 : 0
  project = var.project_id
  role    = "roles/run.developer"
  member  = "serviceAccount:${google_service_account.cloud_build.email}"
}

# actAs на sa-web для выпуска ревизий
resource "google_service_account_iam_member" "build_act_as_web" {
  service_account_id = google_service_account.cloud_run.name
  role               = "roles/iam.serviceAccountUser"
  member             = "serviceAccount:${google_service_account.cloud_build.email}"
}

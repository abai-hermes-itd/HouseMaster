# Разграничение прав: least privilege, без Owner/Editor.
# Правила:
#   - гранты на уровне ресурса (bucket, secret, topic, service), где возможно;
#   - project-level роли — только там, где ресурсного уровня нет (Vertex AI);
#   - никакой SA не имеет прав шире своей функции.
#
# Паттерн for_each (HM-GCP-003D.3): ключи for_each берутся из статичных
# `local` (local.runtime_secrets, local.buckets), а не из целого upstream-
# ресурса. Значения получаются через индексацию [each.key] - сохраняет
# implicit dependency, но не требует существования upstream-ресурса в state
# на момент terraform import: ссылка на for_each целого ресурса ломает import
# (команда не строит полный граф зависимостей и не может разрешить ключи).

resource "google_secret_manager_secret_iam_member" "web_secret_access" {
  for_each = toset(local.runtime_secrets)

  project   = var.project_id
  secret_id = google_secret_manager_secret.runtime[each.key].secret_id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloud_run.email}"
}

resource "google_storage_bucket_iam_member" "web_bucket_rw" {
  for_each = local.buckets

  bucket = google_storage_bucket.buckets[each.key].name
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${google_service_account.cloud_run.email}"
}

resource "google_project_iam_member" "web_vertex_user" {
  project = var.project_id
  role    = "roles/aiplatform.user"
  member  = "serviceAccount:${google_service_account.cloud_run.email}"
}

resource "google_pubsub_topic_iam_member" "web_publish_indexing" {
  project = var.project_id
  topic   = google_pubsub_topic.knowledge_indexing.name
  role    = "roles/pubsub.publisher"
  member  = "serviceAccount:${google_service_account.cloud_run.email}"
}

resource "google_project_iam_member" "worker_vertex_user" {
  project = var.project_id
  role    = "roles/aiplatform.user"
  member  = "serviceAccount:${google_service_account.vertex_worker.email}"
}

resource "google_storage_bucket_iam_member" "worker_docs_read" {
  for_each = {
    documents = google_storage_bucket.buckets["documents"].name
    images    = google_storage_bucket.buckets["images"].name
  }

  bucket = each.value
  role   = "roles/storage.objectViewer"
  member = "serviceAccount:${google_service_account.vertex_worker.email}"
}

resource "google_pubsub_subscription_iam_member" "worker_subscribe" {
  project      = var.project_id
  subscription = google_pubsub_subscription.knowledge_indexing_worker.name
  role         = "roles/pubsub.subscriber"
  member       = "serviceAccount:${google_service_account.vertex_worker.email}"
}

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

resource "google_cloud_run_v2_service_iam_member" "deployer_run" {
  project  = var.project_id
  location = var.region
  name     = google_cloud_run_v2_service.web.name
  role     = "roles/run.developer"
  member   = "serviceAccount:${google_service_account.cicd_deployer.email}"
}

resource "google_service_account_iam_member" "deployer_act_as_web" {
  service_account_id = google_service_account.cloud_run.name
  role               = "roles/iam.serviceAccountUser"
  member             = "serviceAccount:${google_service_account.cicd_deployer.email}"
}

resource "google_cloud_run_v2_service_iam_member" "public_invoker" {
  count = var.cloud_run_allow_unauthenticated ? 1 : 0

  project  = var.project_id
  location = var.region
  name     = google_cloud_run_v2_service.web.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Включение необходимых API проекта.
# Все остальные ресурсы зависят от этого набора (см. depends_on).

locals {
  required_apis = [
    "run.googleapis.com",              # Cloud Run
    "artifactregistry.googleapis.com", # Artifact Registry
    "secretmanager.googleapis.com",    # Secret Manager
    "storage.googleapis.com",          # Cloud Storage
    "pubsub.googleapis.com",           # Pub/Sub
    "aiplatform.googleapis.com",       # Vertex AI (Gemini, Embeddings, Vector Search)
    "iam.googleapis.com",              # IAM / Service Accounts
    "cloudresourcemanager.googleapis.com",
    "logging.googleapis.com",    # Cloud Logging
    "monitoring.googleapis.com", # Cloud Monitoring
    "cloudbuild.googleapis.com", # Cloud Build (пайплайн — вне охвата HM-GCP-002)
    "sqladmin.googleapis.com",   # Cloud SQL — уже включён в GCP вручную (HM-004);
    # раскомментировано в HM-GCP-003D.1 для синхронизации
    # кода с реальностью, см. HM-GCP-003B Diff Report
    "iap.googleapis.com", # Identity-Aware Proxy — SPRINT-6B-2Q. Не был включён
    # здесь ранее; отсутствие явного enable — вероятная причина, по которой
    # service-<PROJECT_NUMBER>@gcp-sa-iap.iam.gserviceaccount.com ещё не
    # существовал при попытке apply в SPRINT-6B-2P ("Service account ...
    # does not exist"). Включение API обычно провижининг service agent'а
    # как побочный эффект — это не подтверждено apply в этой задаче,
    # только код.
  ]
}

resource "google_project_service" "apis" {
  for_each = toset(local.required_apis)

  project            = var.project_id
  service            = each.value
  disable_on_destroy = false
}

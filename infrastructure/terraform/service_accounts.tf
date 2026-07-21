# Выделенные Service Accounts (см. 002-gcp-architecture.md, раздел 4).
# Default service accounts не используются. Ключи (json keys) не создаются —
# только workload identity / attached SA.

# 1) Рантайм Cloud Run — основное приложение (Next.js: UI + API)
resource "google_service_account" "cloud_run" {
  project      = var.project_id
  account_id   = "sa-web-${var.environment}"
  display_name = "HouseMaster Web (Cloud Run runtime, ${var.environment})"
  description  = "Рантайм основного сервиса: Secret Manager (чтение), Storage (signed URLs), Vertex AI, Pub/Sub publish"

  depends_on = [google_project_service.apis]
}

# 2) Vertex AI / AI-воркеры — асинхронный конвейер базы знаний
resource "google_service_account" "vertex_worker" {
  project      = var.project_id
  account_id   = "sa-ai-worker-${var.environment}"
  display_name = "HouseMaster AI Worker (${var.environment})"
  description  = "AI-конвейер: OCR, embeddings, индексация Vector Search; подписка knowledge-indexing"

  depends_on = [google_project_service.apis]
}

# 3) Cloud Build — сборка и публикация образов
resource "google_service_account" "cloud_build" {
  project      = var.project_id
  account_id   = "sa-cloudbuild-${var.environment}"
  display_name = "HouseMaster Cloud Build (${var.environment})"
  description  = "Шаги сборки: push в Artifact Registry, запись логов. Без доступа к данным."

  depends_on = [google_project_service.apis]
}

# 4) CI/CD deployer — выкатка ревизий Cloud Run
#    Отделён от cloud_build: сборка и деплой — разные привилегии.
resource "google_service_account" "cicd_deployer" {
  project      = var.project_id
  account_id   = "sa-deployer-${var.environment}"
  display_name = "HouseMaster CI/CD Deployer (${var.environment})"
  description  = "Деплой ревизий Cloud Run; actAs только на sa-web. Без доступа к данным."

  depends_on = [google_project_service.apis]
}

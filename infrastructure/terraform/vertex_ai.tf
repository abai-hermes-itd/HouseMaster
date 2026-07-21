# Инфраструктурный задел Vertex AI. Без вызовов моделей.
#
# Gemini / Vision / Document AI / Embeddings — управляемые API: отдельных
# ресурсов не требуют, достаточно aiplatform.googleapis.com (apis.tf)
# и IAM-роли aiplatform.user у сервисных аккаунтов (iam.tf).
#
# Здесь создаётся только staging-bucket под артефакты Vector Search
# (батчи эмбеддингов для построения индекса).

resource "google_storage_bucket" "vertex_staging" {
  project  = var.project_id
  name     = "${var.project_id}-vertex-staging"
  location = var.vertex_location
  labels   = merge(local.common_labels, { content = "vertex-staging" })

  uniform_bucket_level_access = true
  public_access_prevention    = "enforced"
  force_destroy               = var.environment == "dev"

  # staging-данные эфемерны — чистим через 30 дней
  lifecycle_rule {
    condition {
      age = 30
    }
    action {
      type = "Delete"
    }
  }

  depends_on = [google_project_service.apis]
}

resource "google_storage_bucket_iam_member" "worker_vertex_staging_rw" {
  bucket = google_storage_bucket.vertex_staging.name
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${google_service_account.vertex_worker.email}"
}

# ─────────────────────────────────────────────────────────────────────────────
# Vector Search Index — НАМЕРЕННО ОТЛОЖЕН до фазы Knowledge Base (Phase 2):
#   - индекс требует зафиксированной размерности эмбеддингов (зависит от
#     выбранной модели) и конфигурации шардирования;
#   - развёрнутый index endpoint тарифицируется за само существование узлов —
#     держать его пустым дорого и бессмысленно.
# Скелет для Phase 2:
#
# resource "google_vertex_ai_index" "knowledge_base" {
#   project      = var.project_id
#   region       = var.vertex_location
#   display_name = "housemaster-knowledge-${var.environment}"
#   metadata {
#     contents_delta_uri = "gs://${google_storage_bucket.vertex_staging.name}/index"
#     config {
#       dimensions                  = 768   # = размерность модели эмбеддингов
#       approximate_neighbors_count = 150
#       distance_measure_type       = "DOT_PRODUCT_DISTANCE"
#       algorithm_config {
#         tree_ah_config {}
#       }
#     }
#   }
#   index_update_method = "BATCH_UPDATE"
# }
# ─────────────────────────────────────────────────────────────────────────────

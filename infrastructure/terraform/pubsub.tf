# Асинхронный конвейер базы знаний:
#   приложение (sa-web) --publish--> knowledge-indexing --pull--> AI-воркер (sa-ai-worker)
# Поток: документ загружен -> OCR -> chunking -> embeddings -> Vector Search.

resource "google_pubsub_topic" "knowledge_indexing" {
  project = var.project_id
  name    = "knowledge-indexing"
  labels  = local.common_labels

  message_retention_duration = "86400s" # сутки: пережить простой воркера

  depends_on = [google_project_service.apis]
}

# Мёртвая очередь: сообщения, не обработанные после max_delivery_attempts
resource "google_pubsub_topic" "knowledge_indexing_dlq" {
  project = var.project_id
  name    = "knowledge-indexing-dlq"
  labels  = local.common_labels

  depends_on = [google_project_service.apis]
}

resource "google_pubsub_subscription" "knowledge_indexing_worker" {
  project = var.project_id
  name    = "knowledge-indexing-worker"
  topic   = google_pubsub_topic.knowledge_indexing.id
  labels  = local.common_labels

  # OCR + embeddings — долгая обработка
  ack_deadline_seconds       = 600
  message_retention_duration = "604800s" # 7 дней

  retry_policy {
    minimum_backoff = "10s"
    maximum_backoff = "600s"
  }

  dead_letter_policy {
    dead_letter_topic     = google_pubsub_topic.knowledge_indexing_dlq.id
    max_delivery_attempts = 5
  }

  expiration_policy {
    ttl = "" # подписка не истекает
  }
}

# Служебному аккаунту Pub/Sub нужно право пересылать сообщения в DLQ
data "google_project" "current" {
  project_id = var.project_id
}

resource "google_pubsub_topic_iam_member" "pubsub_service_dlq_publisher" {
  project = var.project_id
  topic   = google_pubsub_topic.knowledge_indexing_dlq.name
  role    = "roles/pubsub.publisher"
  member  = "serviceAccount:service-${data.google_project.current.number}@gcp-sa-pubsub.iam.gserviceaccount.com"
}

resource "google_pubsub_subscription_iam_member" "pubsub_service_dlq_subscriber" {
  project      = var.project_id
  subscription = google_pubsub_subscription.knowledge_indexing_worker.name
  role         = "roles/pubsub.subscriber"
  member       = "serviceAccount:service-${data.google_project.current.number}@gcp-sa-pubsub.iam.gserviceaccount.com"
}

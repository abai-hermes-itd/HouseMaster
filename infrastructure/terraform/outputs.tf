# Выходные значения: используются CI/CD и для ручной проверки после apply.

output "cloud_run_service_url" {
  description = "URL сервиса Cloud Run. null, пока Cloud Run ещё не задеплоен (HM-GCP-003E)."
  value       = try(google_cloud_run_v2_service.web[0].uri, null)
}

output "artifact_registry_repository" {
  description = "Полный путь Docker-репозитория (для docker push / cloudbuild)"
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.docker.repository_id}"
}

output "service_account_emails" {
  description = "E-mail'ы сервисных аккаунтов"
  value = {
    cloud_run     = google_service_account.cloud_run.email
    vertex_worker = google_service_account.vertex_worker.email
    cloud_build   = google_service_account.cloud_build.email
    cicd_deployer = google_service_account.cicd_deployer.email
  }
}

output "bucket_names" {
  description = "Имена созданных бакетов"
  value       = { for k, b in google_storage_bucket.buckets : k => b.name }
}

output "vertex_staging_bucket" {
  description = "Staging-bucket Vertex AI / Vector Search"
  value       = google_storage_bucket.vertex_staging.name
}

output "pubsub_topic_knowledge_indexing" {
  description = "Topic конвейера индексации базы знаний"
  value       = google_pubsub_topic.knowledge_indexing.name
}

output "secret_ids" {
  description = "Созданные контейнеры секретов (значения добавляются вручную)"
  value       = [for s in google_secret_manager_secret.runtime : s.secret_id]
}

output "logging_metric_app_errors" {
  description = "Имя logs-based метрики ошибок приложения"
  value       = google_logging_metric.app_errors.name
}

output "monitoring_alert_policies" {
  description = "Созданные алерты (пусто, если alert_email не задан)"
  value = concat(
    google_monitoring_alert_policy.run_5xx[*].display_name,
    google_monitoring_alert_policy.run_latency[*].display_name,
    google_monitoring_alert_policy.dlq_messages[*].display_name,
    google_monitoring_alert_policy.app_errors[*].display_name,
  )
}

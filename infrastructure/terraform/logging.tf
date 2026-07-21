# Cloud Logging.
# Логи Cloud Run (stdout контейнеров) попадают в Logging автоматически —
# отдельных "приёмников" не требуется. Здесь управляем:
#   1) сроком хранения логов проекта;
#   2) logs-based метрикой ошибок приложения (используется алертом в monitoring.tf).

# Срок хранения дефолтного лог-бакета проекта
resource "google_logging_project_bucket_config" "default" {
  project        = var.project_id
  location       = "global"
  bucket_id      = "_Default"
  retention_days = var.log_retention_days

  depends_on = [google_project_service.apis]
}

# Метрика: количество записей severity >= ERROR от ревизий Cloud Run
resource "google_logging_metric" "app_errors" {
  project = var.project_id
  name    = "housemaster-app-errors"

  filter = <<-FILTER
    resource.type="cloud_run_revision"
    resource.labels.service_name="${var.cloud_run_service_name}"
    severity>=ERROR
  FILTER

  metric_descriptor {
    metric_kind = "DELTA"
    value_type  = "INT64"
    unit        = "1"
  }

  depends_on = [google_project_service.apis]
}

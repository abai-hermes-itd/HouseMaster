# Cloud Monitoring: канал уведомлений и базовые алерты.
# Всё создаётся ТОЛЬКО если задан var.alert_email (в dev можно оставить "" —
# тогда мониторинг-ресурсы не создаются и validate/plan проходят без него).

locals {
  monitoring_enabled = var.alert_email != "" ? 1 : 0
}

resource "google_monitoring_notification_channel" "email" {
  count = local.monitoring_enabled

  project      = var.project_id
  display_name = "HouseMaster alerts (${var.environment})"
  type         = "email"

  labels = {
    email_address = var.alert_email
  }

  depends_on = [google_project_service.apis]
}

# ── Алерт 1: доля 5xx-ответов Cloud Run ─────────────────────────────────────
resource "google_monitoring_alert_policy" "run_5xx" {
  count = local.monitoring_enabled

  project      = var.project_id
  display_name = "[${var.environment}] Cloud Run: 5xx responses"
  combiner     = "OR"

  conditions {
    display_name = "5xx rate > threshold"

    condition_threshold {
      filter = join(" AND ", [
        "resource.type=\"cloud_run_revision\"",
        "resource.labels.service_name=\"${var.cloud_run_service_name}\"",
        "metric.type=\"run.googleapis.com/request_count\"",
        "metric.labels.response_code_class=\"5xx\"",
      ])
      comparison      = "COMPARISON_GT"
      threshold_value = var.alert_5xx_rate_threshold
      duration        = "300s"

      aggregations {
        alignment_period   = "300s"
        per_series_aligner = "ALIGN_RATE"
      }
    }
  }

  notification_channels = [google_monitoring_notification_channel.email[0].id]

  documentation {
    content = "Сервис ${var.cloud_run_service_name} отдаёт 5xx. Проверить логи ревизии: Cloud Run -> Logs. Откат: переключить трафик на предыдущую ревизию."
  }
}

# ── Алерт 2: латентность p95 ────────────────────────────────────────────────
resource "google_monitoring_alert_policy" "run_latency" {
  count = local.monitoring_enabled

  project      = var.project_id
  display_name = "[${var.environment}] Cloud Run: p95 latency"
  combiner     = "OR"

  conditions {
    display_name = "p95 latency > ${var.alert_latency_ms_threshold} ms"

    condition_threshold {
      filter = join(" AND ", [
        "resource.type=\"cloud_run_revision\"",
        "resource.labels.service_name=\"${var.cloud_run_service_name}\"",
        "metric.type=\"run.googleapis.com/request_latencies\"",
      ])
      comparison      = "COMPARISON_GT"
      threshold_value = var.alert_latency_ms_threshold
      duration        = "300s"

      aggregations {
        alignment_period   = "300s"
        per_series_aligner = "ALIGN_PERCENTILE_95"
      }
    }
  }

  notification_channels = [google_monitoring_notification_channel.email[0].id]

  documentation {
    content = "p95 латентность превышает порог. Проверить: cold start (min_instances), нагрузку, медленные запросы к Vertex AI / БД."
  }
}

# ── Алерт 3: сообщения в мёртвой очереди индексации ─────────────────────────
resource "google_monitoring_alert_policy" "dlq_messages" {
  count = local.monitoring_enabled

  project      = var.project_id
  display_name = "[${var.environment}] Knowledge indexing: DLQ not empty"
  combiner     = "OR"

  conditions {
    display_name = "messages sent to DLQ"

    condition_threshold {
      filter = join(" AND ", [
        "resource.type=\"pubsub_topic\"",
        "resource.labels.topic_id=\"${google_pubsub_topic.knowledge_indexing_dlq.name}\"",
        "metric.type=\"pubsub.googleapis.com/topic/send_message_operation_count\"",
      ])
      comparison      = "COMPARISON_GT"
      threshold_value = 0
      duration        = "0s"

      aggregations {
        alignment_period   = "300s"
        per_series_aligner = "ALIGN_SUM"
      }
    }
  }

  notification_channels = [google_monitoring_notification_channel.email[0].id]

  documentation {
    content = "Документы не проходят конвейер индексации (5 неудачных попыток). Проверить логи AI-воркера и содержимое knowledge-indexing-dlq."
  }
}

# ── Алерт 4: ошибки приложения (logs-based метрика из logging.tf) ───────────
resource "google_monitoring_alert_policy" "app_errors" {
  count = local.monitoring_enabled

  project      = var.project_id
  display_name = "[${var.environment}] App: ERROR logs burst"
  combiner     = "OR"

  conditions {
    display_name = "ERROR-записей больше порога"

    condition_threshold {
      filter = join(" AND ", [
        "resource.type=\"cloud_run_revision\"",
        "metric.type=\"logging.googleapis.com/user/${google_logging_metric.app_errors.name}\"",
      ])
      comparison      = "COMPARISON_GT"
      threshold_value = var.alert_error_logs_threshold
      duration        = "300s"

      aggregations {
        alignment_period   = "300s"
        per_series_aligner = "ALIGN_SUM"
      }
    }
  }

  notification_channels = [google_monitoring_notification_channel.email[0].id]

  documentation {
    content = "Всплеск ERROR-логов приложения. Смотреть Error Reporting и логи сервиса ${var.cloud_run_service_name}."
  }
}

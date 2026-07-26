# Cloud SQL — импорт существующей инфраструктуры под управление Terraform.
#
# Instance создан вручную ДО написания этого файла (HM-004/HM-004-инвентаризация).
# Цель этого файла — НЕ создать новый ресурс, а описать существующий с точностью,
# достаточной для `terraform import` без последующего drift.
#
# Контекст и обоснование каждого параметра — HM-GCP-003C (Cloud SQL Import Design).
# Импорт выполняется отдельным шагом (HM-GCP-003D.3), этот файл только объявляет ресурс.
#
# НЕ включён: google_sql_database (логическая БД) — импортируется вторым этапом,
# после утверждения ADR-0005 (см. HM-GCP-003C, раздел "Двухэтапный импорт").
# НЕ включён: google_sql_user — пароль пользователя не должен попадать в TF state;
# управление пользователями БД — через `gcloud sql users`, вне Terraform.

resource "google_sql_database_instance" "main" {
  project          = var.project_id
  name             = var.cloud_sql_instance_name
  region           = var.cloud_sql_region # ОТДЕЛЬНО от var.region — см. переменные
  database_version = "POSTGRES_18"

  # Критично: снятие защиты через TF должно быть explicit-действием, видимым в PR,
  # а не побочным эффектом другого изменения.
  deletion_protection = true

  settings {
    tier              = var.cloud_sql_tier
    availability_type = "ZONAL"
    disk_type         = "PD_SSD"
    disk_size         = 10
    disk_autoresize   = true

    backup_configuration {
      enabled                        = true
      point_in_time_recovery_enabled = true
      transaction_log_retention_days = 7
      start_time                     = "04:00"
      location                       = "eu"

      backup_retention_settings {
        retained_backups = 7
        retention_unit   = "COUNT"
      }
    }

    ip_configuration {
      ipv4_enabled = true
      ssl_mode     = "ENCRYPTED_ONLY"
      require_ssl  = false # deprecated-поле; реальная защита через ssl_mode выше

      authorized_networks {
        name  = "Home-PC"
        value = "91.234.208.141/32"
      }
    }

    database_flags {
      name  = "cloudsql.iam_authentication"
      value = "on"
    }

    password_validation_policy {
      enable_password_policy      = true
      min_length                  = 8
      complexity                  = "COMPLEXITY_DEFAULT"
      disallow_username_substring = true
    }

    maintenance_window {
      day  = 0 # без предпочтения дня (GCP default)
      hour = 0 # без предпочтения часа (GCP default)
    }
  }

  lifecycle {
    ignore_changes = [
      # Обновляется GCP автоматически при патчах PostgreSQL —
      # отслеживание через TF создавало бы постоянный ложный drift.
      settings[0].maintenance_version,

      # Может изменяться вручную (добавление IP разработчиков) без PR —
      # операционное действие, не архитектурное решение.
      settings[0].ip_configuration[0].authorized_networks,
    ]
  }
}

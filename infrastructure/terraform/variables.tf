# Входные переменные. Хардкод project id / region / имён ресурсов запрещён —
# все значения поступают из *.tfvars (см. dev.tfvars.example / prod.tfvars.example).

variable "project_id" {
  description = "Идентификатор GCP-проекта окружения (housemaster-dev / housemaster-prod)"
  type        = string
}

variable "region" {
  description = "Основной регион ресурсов (Cloud Run, Artifact Registry, buckets, Pub/Sub)"
  type        = string
}

variable "environment" {
  description = "Окружение: dev или prod"
  type        = string

  validation {
    condition     = contains(["dev", "prod"], var.environment)
    error_message = "environment должен быть 'dev' или 'prod'."
  }
}

variable "artifact_registry_name" {
  description = "Имя Docker-репозитория в Artifact Registry"
  type        = string
}

variable "cloud_run_service_name" {
  description = "Имя основного сервиса Cloud Run (Next.js: UI + API)"
  type        = string
}

variable "storage_bucket_images" {
  description = "Bucket для фотографий дефектов и осмотров (имя глобально уникально)"
  type        = string
}

variable "storage_bucket_documents" {
  description = "Bucket для документов: нормативы, паспорта зданий, сканы актов"
  type        = string
}

variable "storage_bucket_media" {
  description = "Bucket для видео и прочих медиа"
  type        = string
}

variable "vertex_location" {
  description = "Локация Vertex AI (может отличаться от region из-за доступности моделей)"
  type        = string
}

# --- Параметры Cloud Run (со значениями по умолчанию) ---

variable "cloud_run_container_image" {
  description = <<-DESC
    Образ контейнера Cloud Run. По умолчанию — публичная заглушка Google,
    чтобы terraform apply проходил до появления собственных образов.
    Реальные релизы деплоит Cloud Build; Terraform игнорирует смену образа
    (lifecycle.ignore_changes в cloud_run.tf).
  DESC
  type        = string
  default     = "us-docker.pkg.dev/cloudrun/container/hello"
}

variable "cloud_run_min_instances" {
  description = "Минимум инстансов (0 = scale-to-zero; в prod можно 1 против cold start)"
  type        = number
  default     = 0
}

variable "cloud_run_max_instances" {
  description = "Максимум инстансов автоскейлинга"
  type        = number
  default     = 10
}

variable "cloud_run_cpu" {
  description = "CPU на инстанс"
  type        = string
  default     = "1"
}

variable "cloud_run_memory" {
  description = "Память на инстанс"
  type        = string
  default     = "512Mi"
}

variable "cloud_run_allow_unauthenticated" {
  description = "Разрешить неаутентифицированный HTTP-доступ (публичный вход в приложение; авторизацию пользователей выполняет само приложение через Workspace OAuth)"
  type        = bool
  default     = true
}

# --- Наблюдаемость (HM-GCP-004) ---

variable "log_retention_days" {
  description = "Срок хранения логов дефолтного бакета Cloud Logging, дней"
  type        = number
  default     = 30
}

variable "alert_email" {
  description = "E-mail для алертов Cloud Monitoring. Пустая строка = мониторинг-ресурсы не создаются (удобно в dev)"
  type        = string
  default     = ""
}

variable "alert_5xx_rate_threshold" {
  description = "Порог алерта: 5xx-ответов в секунду (ALIGN_RATE за 5 минут)"
  type        = number
  default     = 0.1
}

variable "alert_latency_ms_threshold" {
  description = "Порог алерта: p95 латентность запросов, мс"
  type        = number
  default     = 2000
}

variable "alert_error_logs_threshold" {
  description = "Порог алерта: количество ERROR-записей за 5 минут"
  type        = number
  default     = 20
}

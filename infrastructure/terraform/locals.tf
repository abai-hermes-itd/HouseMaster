# Производные значения и единые соглашения об именовании.

locals {
  # Единые метки всех ресурсов — для биллинга и инвентаризации
  common_labels = {
    app         = "housemaster"
    environment = var.environment
    managed_by  = "terraform"
  }

  # Секреты рантайма (контракт — .env.example в корне монорепо).
  # Terraform создаёт контейнеры секретов; значения (versions) добавляются
  # вне Terraform: gcloud secrets versions add <name> --data-file=-
  runtime_secrets = [
    "google-client-id",     # GOOGLE_CLIENT_ID
    "google-client-secret", # GOOGLE_CLIENT_SECRET
    "auth-secret",          # AUTH_SECRET (Auth.js v5)
    "database-url",         # DATABASE_URL (Cloud SQL — HM-GCP-003)
  ]

  # Соответствие "имя секрета -> имя переменной окружения" для Cloud Run
  secret_env_map = {
    "google-client-id"     = "GOOGLE_CLIENT_ID"
    "google-client-secret" = "GOOGLE_CLIENT_SECRET"
    "auth-secret"          = "AUTH_SECRET"
    "database-url"         = "DATABASE_URL"
  }

  buckets = {
    images    = var.storage_bucket_images
    documents = var.storage_bucket_documents
    media     = var.storage_bucket_media
  }
}

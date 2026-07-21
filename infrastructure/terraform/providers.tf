# Конфигурация провайдера Google. Только переменные, без хардкода.

provider "google" {
  project = var.project_id
  region  = var.region
}

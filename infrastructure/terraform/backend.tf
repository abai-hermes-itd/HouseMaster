# Remote state в GCS. Значения НЕ хардкодятся — передаются при init
# через backend-config (см. README, раздел «Порядок применения»):
#
#   terraform init -backend-config=backend-dev.tfbackend
#
# Bucket состояния создаётся один раз вручную (bootstrap) до первого init:
#   gsutil mb -l <region> gs://<project_id>-tfstate
#   gsutil versioning set on gs://<project_id>-tfstate

terraform {
  backend "gcs" {}
}

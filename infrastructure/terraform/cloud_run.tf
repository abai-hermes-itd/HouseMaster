# Основной сервис Cloud Run (Next.js: UI + API).
#
# Ключевые решения:
#   - образ по умолчанию — заглушка Google (var.cloud_run_container_image),
#     чтобы apply проходил до появления собственных образов;
#   - смену образа Terraform игнорирует (ignore_changes) — релизы катит CI/CD;
#   - секретные env подключаются из Secret Manager (version = "latest").
#     ВАЖНО: перед первым apply у каждого секрета должна существовать
#     хотя бы одна версия (см. README, шаг 3), иначе ревизия не стартует.
resource "google_cloud_run_v2_service" "web" {
  count    = var.deploy_cloud_run ? 1 : 0
  project  = var.project_id
  location = var.region
  name     = var.cloud_run_service_name
  ingress  = "INGRESS_TRAFFIC_ALL"
  labels   = local.common_labels
  template {
    service_account = google_service_account.cloud_run.email
    scaling {
      min_instance_count = var.cloud_run_min_instances
      max_instance_count = var.cloud_run_max_instances
    }

    # Cloud SQL connector (Unix socket) — HM-GCP-003F.1.
    # Approved model: Cloud Run -> connector -> Cloud SQL, без VPC/private IP.
    volumes {
      name = "cloudsql"
      cloud_sql_instance {
        instances = [google_sql_database_instance.main.connection_name]
      }
    }

    containers {
      image = var.cloud_run_container_image
      ports {
        container_port = 8080
      }
      resources {
        limits = {
          cpu    = var.cloud_run_cpu
          memory = var.cloud_run_memory
        }
        cpu_idle = true # биллинг CPU только под запросами
      }

      volume_mounts {
        name       = "cloudsql"
        mount_path = "/cloudsql"
      }

      # --- Несекретная конфигурация (контракт — .env.example) ---
      env {
        name  = "NODE_ENV"
        value = "production"
      }
      env {
        name  = "PROJECT_ID"
        value = var.project_id
      }
      env {
        name  = "REGION"
        value = var.region
      }
      env {
        name  = "VERTEX_LOCATION"
        value = var.vertex_location
      }
      env {
        name  = "BUCKET_IMAGES"
        value = google_storage_bucket.buckets["images"].name
      }
      env {
        name  = "BUCKET_DOCS"
        value = google_storage_bucket.buckets["documents"].name
      }
      env {
        name  = "BUCKET_MEDIA"
        value = google_storage_bucket.buckets["media"].name
      }
      env {
        name  = "PUBSUB_TOPIC_INGEST"
        value = google_pubsub_topic.knowledge_indexing.name
      }
      # --- Секреты из Secret Manager ---
      dynamic "env" {
        for_each = local.secret_env_map
        content {
          name = env.value
          value_source {
            secret_key_ref {
              secret  = google_secret_manager_secret.runtime[env.key].secret_id
              version = "latest"
            }
          }
        }
      }
      startup_probe {
        http_get {
          path = "/"
          port = 8080
        }
        initial_delay_seconds = 5
        period_seconds        = 5
        failure_threshold     = 6
      }
    }
  }
  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }
  lifecycle {
    ignore_changes = [
      template[0].containers[0].image, # релизы выполняет CI/CD, не Terraform
      client,
      client_version,
    ]
  }
  depends_on = [
    google_project_service.apis,
    google_secret_manager_secret_iam_member.web_secret_access,
  ]
}
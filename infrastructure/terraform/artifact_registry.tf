# Docker-репозиторий для образов приложения.
# Тег каждого релиза = commit SHA (неизменяемые артефакты, см. cloudbuild.yaml).

resource "google_artifact_registry_repository" "docker" {
  project       = var.project_id
  location      = var.region
  repository_id = var.artifact_registry_name
  description   = "HouseMaster container images (${var.environment})"
  format        = "DOCKER"
  labels        = local.common_labels

  # Храним последние 20 версий каждого образа; старые чистим автоматически
  cleanup_policies {
    id     = "keep-recent"
    action = "KEEP"
    most_recent_versions {
      keep_count = 20
    }
  }

  cleanup_policies {
    id     = "delete-old"
    action = "DELETE"
    condition {
      older_than = "2592000s" # 30 дней
    }
  }

  depends_on = [google_project_service.apis]
}

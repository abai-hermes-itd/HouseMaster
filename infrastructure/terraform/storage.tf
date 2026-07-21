# Бакеты Cloud Storage: images / documents / media.
# Имена — только из переменных (глобально уникальны, задаются в tfvars).
# Публичного доступа нет: объекты отдаются приложением через signed URLs.

resource "google_storage_bucket" "buckets" {
  for_each = local.buckets

  project  = var.project_id
  name     = each.value
  location = var.region
  labels   = merge(local.common_labels, { content = each.key })

  uniform_bucket_level_access = true
  public_access_prevention    = "enforced"

  # Документы (нормативы, акты) — с версионированием: защита от перезаписи
  versioning {
    enabled = each.key == "documents"
  }

  # Холодные медиа через 90 дней переводим в Nearline (экономия)
  dynamic "lifecycle_rule" {
    for_each = each.key == "media" ? [1] : []
    content {
      condition {
        age = 90
      }
      action {
        type          = "SetStorageClass"
        storage_class = "NEARLINE"
      }
    }
  }

  # В dev допускаем удаление непустых бакетов; в prod — запрещено
  force_destroy = var.environment == "dev"

  depends_on = [google_project_service.apis]
}

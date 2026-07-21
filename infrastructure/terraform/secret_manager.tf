# Контейнеры секретов рантайма. ЗНАЧЕНИЯ НЕ СОЗДАЮТСЯ Terraform'ом —
# ни в коде, ни в state секретов быть не должно. Версии добавляются вручную:
#
#   echo -n "<value>" | gcloud secrets versions add auth-secret \
#     --project=<project_id> --data-file=-
#
# Примечание по ТЗ: секрет VERTEX_API_KEY намеренно НЕ создаётся.
# Vertex AI не аутентифицируется API-ключом — доступ выполняется через
# service account (sa-web / sa-ai-worker) и IAM-роль roles/aiplatform.user
# (см. iam.tf). Хранить несуществующий ключ — лишняя поверхность атаки.
# Если появится внешний AI-сервис с ключом — добавить его в locals.runtime_secrets.

resource "google_secret_manager_secret" "runtime" {
  for_each = toset(local.runtime_secrets)

  project   = var.project_id
  secret_id = each.value
  labels    = local.common_labels

  replication {
    auto {}
  }

  depends_on = [google_project_service.apis]
}

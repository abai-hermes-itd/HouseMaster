# Sprint 6B - IAP / Load Balancer contour
#
# First narrow plan-only contour:
# - serverless NEG for Cloud Run next-web
# - backend service with IAP enabled
# - Google-managed OAuth client
# - no explicit oauth2_client_id / oauth2_client_secret
# - no certificate / DNS / HTTPS proxy / forwarding rule yet

resource "google_compute_region_network_endpoint_group" "next_web_serverless_neg" {
  name                  = "next-web-serverless-neg"
  network_endpoint_type = "SERVERLESS"
  region                = var.region

  cloud_run {
    service = google_cloud_run_v2_service.web[0].name
  }
}

resource "google_compute_backend_service" "next_web_iap_backend" {
  name                  = "next-web-iap-backend"
  protocol              = "HTTP"
  load_balancing_scheme = "EXTERNAL_MANAGED"

  backend {
    group = google_compute_region_network_endpoint_group.next_web_serverless_neg.id
  }

  iap {
    enabled = true
  }
}

# roles/iap.httpsResourceAccessor — decides who may pass through IAP to reach
# this backend at all (platform-level access; app-level admin-realm auth is
# separate, see ALLOWED_WORKSPACE_DOMAIN in cloud_run.tf).
#
# Domain-scoped, not a single user (SPRINT-6B-2I decision): matches this
# backend's existing app-level domain guard, and matches the original target
# access model in SPRINT-6B_IAP_CONTROLLED_ACCESS_IMPLEMENTATION_PLAN.md §3.3
# ("restricted to Abay-Germes / approved workspace users"), not one named
# individual.
#
# No binding for this role existed anywhere in the project's IAM hierarchy
# (resource, project, or org level) as of SPRINT-6B-2H's read-only
# inspection — this resource fills that gap. Code only: this change is not
# planned or applied by this commit (SPRINT-6B-2I §6 / hard gate: no
# terraform plan against live state, no apply, in this task).
resource "google_iap_web_backend_service_iam_member" "next_web_iap_domain_accessor" {
  project             = var.project_id
  web_backend_service = google_compute_backend_service.next_web_iap_backend.name
  role                = "roles/iap.httpsResourceAccessor"
  member              = "domain:abay-germes.kz"
}

# Cloud Run invoker grant for the IAP service agent — SPRINT-6B-2N.
#
# Confirmed missing (SPRINT-6B-2N diagnosis, after the domain accessor
# binding above went live): the IAP service agent had never been
# provisioned for this project (`gcloud iam service-accounts describe
# service-<PROJECT_NUMBER>@gcp-sa-iap.iam.gserviceaccount.com` -> NOT_FOUND),
# and even once it exists, nothing grants it roles/run.invoker on
# `next-web` — the binding IAP itself needs to actually reach the Cloud Run
# backend on an authenticated user's behalf. This is separate from
# roles/iap.httpsResourceAccessor above, which only controls who may
# authenticate TO IAP, not whether IAP can reach the backend.
#
# No explicit provisioning resource: google_project_service_identity
# requires the google-beta provider, which is not configured in this repo
# (terraform validate confirmed "hashicorp/google does not support resource
# type"). Following the same pattern this repo already uses for another
# Google-managed service agent (pubsub.tf's gcp-sa-pubsub grant): reference
# the well-known deterministic service-agent email directly via the
# existing `data.google_project.current` (defined in pubsub.tf) — granting
# an IAM role to it is expected to provision the agent as a side effect,
# same as any other Google-managed service agent grant in this codebase.
#
# Code only: not planned or applied by this commit (hard gate — no
# terraform plan/apply, no `gcloud services identity create`, no IAM
# mutation outside Terraform, in this task).
resource "google_cloud_run_v2_service_iam_member" "iap_invoker" {
  count = var.deploy_cloud_run ? 1 : 0

  project  = var.project_id
  location = var.region
  name     = google_cloud_run_v2_service.web[0].name
  role     = "roles/run.invoker"
  member   = "serviceAccount:service-${data.google_project.current.number}@gcp-sa-iap.iam.gserviceaccount.com"
}

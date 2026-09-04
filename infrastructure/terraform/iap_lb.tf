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

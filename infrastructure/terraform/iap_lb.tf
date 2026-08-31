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

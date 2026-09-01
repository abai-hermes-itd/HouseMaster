# Sprint 6B-2B - External HTTPS/IAP entry contour
#
# Plan-only contour:
# - global static IP
# - Google-managed SSL certificate for iap-dev.housemasters.kz
# - URL map to existing IAP backend service
# - HTTPS target proxy
# - global forwarding rule
#
# DNS A record is manual/outside Terraform for first iteration.
# Cloud Run ingress remains unchanged.

resource "google_compute_global_address" "iap_dev_lb_ip" {
  name = "iap-dev-lb-ip"
}

resource "google_compute_managed_ssl_certificate" "iap_dev_cert" {
  name = "iap-dev-housemaster-cert"

  managed {
    domains = ["iap-dev.housemasters.kz"]
  }
}

resource "google_compute_url_map" "next_web_iap_url_map" {
  name            = "next-web-iap-url-map"
  default_service = google_compute_backend_service.next_web_iap_backend.id
}

resource "google_compute_target_https_proxy" "next_web_iap_https_proxy" {
  name             = "next-web-iap-https-proxy"
  url_map          = google_compute_url_map.next_web_iap_url_map.id
  ssl_certificates = [google_compute_managed_ssl_certificate.iap_dev_cert.id]
}

resource "google_compute_global_forwarding_rule" "next_web_iap_https_forwarding_rule" {
  name                  = "next-web-iap-https-fr"
  ip_address            = google_compute_global_address.iap_dev_lb_ip.id
  port_range            = "443"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  target                = google_compute_target_https_proxy.next_web_iap_https_proxy.id
}

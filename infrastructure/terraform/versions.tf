# HM-GCP-002 — Terraform Foundation
# Требования к версиям инструментов и провайдеров.

terraform {
  required_version = ">= 1.8"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
  }
}

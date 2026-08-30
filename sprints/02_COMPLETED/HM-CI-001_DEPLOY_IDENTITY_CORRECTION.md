# HM-CI-001 — Correct deploy identity to sa-deployer-dev via impersonation

**Status:** Completed
**Scope:** Cloud Build / IAM / Terraform
**Type:** Security correction / least-privilege enforcement
**ADR:** не требуется (реализация уже принятого решения — ignore_changes на image в cloud_run.tf, комментарий "релизы катит CI/CD")

---

## Problem

Первоначальная реализация HM-CI-001 (Cloud Build pipeline, commit `fb989db`) давала
`sa-cloudbuild-dev` прямые права на деплой Cloud Run:

```text
google_project_iam_member.build_run_developer   — roles/run.developer (project-level)
google_service_account_iam_member.build_act_as_web — actAs на sa-web-dev
```

Это нарушало принцип least privilege: `sa-cloudbuild-dev` предназначен только для
build/push ("Без доступа к данным" — из его собственного description), но получил
project-wide право деплоить Cloud Run. При этом уже существовал специально созданный
для деплоя `sa-deployer-dev` (`cicd_deployer`) с корректным resource-scoped грантом,
который `cloudbuild.yaml` не использовал.

---

## Root Cause

`cloudbuild.yaml` в шаге `deploy-cloud-run` не указывал `--impersonate-service-account`,
поэтому `gcloud run deploy` выполнялся напрямую от top-level `serviceAccount` билда
(`sa-cloudbuild-dev`), а не от предназначенного для этого `sa-deployer-dev`.

---

## Decisions

- Деплой выполняется через `--impersonate-service-account=sa-deployer-dev`, а не
  напрямую от `sa-cloudbuild-dev`.
- `sa-cloudbuild-dev` сохраняет только build/push права (least privilege).
- `sa-deployer-dev` получает `roles/iam.serviceAccountTokenCreator` от `sa-cloudbuild-dev`
  (impersonation grant) — точечно, только на этот SA, не на проект.
- Дополнительно: `sa-deployer-dev` получает `roles/artifactregistry.reader` на конкретный
  repository `housemaster` — обнаружено эмпирически (impersonated identity должна
  подтвердить доступность образа при `gcloud run deploy`, не только runtime-SA).
- Runtime identity сервиса (`sa-web-dev`) не затронута этим изменением.
- Terraform `ignore_changes` на `image` остаётся неизменным механизмом — не пересматривался.
- Изменения применялись через targeted plan/apply, изолированно от независимого
  scaling drift на `google_cloud_run_v2_service.web[0]` (см. Follow-ups).

---

## Execution Summary

```text
1. Обнаружено расхождение: cloudbuild.yaml выполняет gcloud run deploy напрямую
   от sa-cloudbuild-dev, минуя специально созданный sa-deployer-dev.
2. cloudbuild.yaml: добавлен --impersonate-service-account=sa-deployer-dev в шаг
   deploy-cloud-run.
3. iam.tf: удалены build_run_developer (project-level run.developer) и
   build_act_as_web (actAs на sa-web) для sa-cloudbuild-dev.
4. iam.tf: добавлен build_impersonate_deployer — serviceAccountTokenCreator на
   sa-deployer-dev, member sa-cloudbuild-dev.
5. Targeted plan/apply на 3 IAM-ресурса (1 create, 2 destroy) — изолировано от
   full plan, который также показывал несвязанный scaling drift.
6. Commit 705ac81 — iam-часть закрыта.
7. Первый практический прогон gcloud builds submit — build-image упал на
   TypeScript ошибках в src/app/admin/page.tsx и auth.ts (несвязано с IAM):
   - session.user optional guard (754f857)
   - next-auth module augmentation не подхватывался Turbopack из src/lib/,
     перенесён в apps/web/next-auth.d.ts (f25affe)
   - profile.hd unknown type cast (99e6651)
8. Билд с 99e6651: build-image и push-image прошли успешно, deploy-cloud-run
   упал — PERMISSION_DENIED на artifactregistry.repositories.downloadArtifacts
   для sa-deployer-dev (impersonated identity не могла подтвердить образ).
9. iam.tf: добавлен deployer_registry_read — artifactregistry.reader на
   repository housemaster для sa-deployer-dev.
10. Targeted apply (1 create). Commit d27910b.
11. gcloud builds submit --substitutions=SHORT_SHA=d27910b — SUCCESS
    (build-image + push-image + deploy-cloud-run все прошли).
```

---

## Verification

```text
Build ID: 99f1d450-4db6-4d3d-a572-e55995f504f5
Status: SUCCESS
Duration: 2m27s
Image: europe-west1-docker.pkg.dev/housemaster-dev-503409/housemaster/web:d27910b

Cloud Build logs подтверждают impersonation:
WARNING: This command is using service account impersonation.
All API calls will be executed as [sa-deployer-dev@housemaster-dev-503409.iam.gserviceaccount.com].

gcloud run services describe next-web --format="value(spec.template.spec.serviceAccountName)"
→ sa-web-dev@housemaster-dev-503409.iam.gserviceaccount.com
(runtime identity подтверждена неизменной)
```

IAM-модель build SA ≠ deploy SA ≠ runtime SA подтверждена:
- build/push:  sa-cloudbuild-dev
- deploy:      sa-deployer-dev (via impersonation)
- runtime:     sa-web-dev

---

## Out of Scope

- Публичный unauthenticated-доступ / run.invoker модель (см. Follow-ups).
- Scaling drift на google_cloud_run_v2_service.web[0] (см. Follow-ups).
- Пересмотр Terraform ignore_changes на image.
- Cloud Build triggers (автоматический запуск на push) — деплой пока только ручной
  через gcloud builds submit.

---

## Tech Debt / Follow-ups

```text
1. HTTP-доступ к сервису возвращает 401/403 на неавторизованные запросы —
   ожидаемо, т.к. cloud_run_allow_unauthenticated=false в dev.tfvars
   (см. HM-GCP-003E.2-C, тот же follow-up: public_invoker/allUsers access model
   требует отдельной задачи — domain principal / IAP / LB / application-level auth).
2. Scaling drift на google_cloud_run_v2_service.web[0]:
   manual_instance_count = 0 -> null, min_instance_count = 0 -> null.
   Обнаружен во время targeted plan для HM-CI-001, изолирован и не применялся
   (сохранён в full-plan-post-iam.plan). Источник drift не установлен — требует
   отдельного расследования (ручное изменение через consone/gcloud, либо
   provider normalization).
3. SHORT_SHA сейчас передаётся вручную через --substitutions при каждом
   gcloud builds submit — понадобится Cloud Build Trigger для автоматического
   заполнения при push-driven деплое.
4. sprints/00_ROADMAP и sprints/README.md остаются untracked в git на момент
   закрытия этой карточки — стоит явно решить, добавлять ли их в репозиторий.
```
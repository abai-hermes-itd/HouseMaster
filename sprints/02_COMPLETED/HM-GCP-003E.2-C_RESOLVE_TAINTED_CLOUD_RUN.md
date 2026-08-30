# HM-GCP-003E.2-C — Resolve tainted Cloud Run service in dev

**Status:** Completed
**Scope:** GCP / Cloud Run / Terraform / Secret Manager
**Type:** Operational recovery / Terraform state stabilization
**ADR:** не требуется

---

## Problem

`google_cloud_run_v2_service.web[0]` находился в `tainted` состоянии после failed readiness-check:

```text
SECRETS_ACCESS_CHECK_FAILED
Secret .../secrets/database-url/versions/latest was not found
```

Terraform требовал replacement ресурса, но `destroy` блокировался `deletion_protection=true`.

---

## Root Cause

Cloud Run ссылался на Secret Manager secret `database-url/latest`, но у `database-url` не было валидной `ENABLED` version с реальным `DATABASE_URL`. Secret container существовал (создан заранее), но наличие container не равно готовности runtime secret — Cloud Run не может резолвить алиас `latest` без хотя бы одной enabled-версии.

---

## Decisions

- Controlled untaint использован как unlock-step, не как способ скрыть проблему.
- `deletion_protection=false` установлен временно, только для dev, точечно в `cloud_run.tf`.
- Добавлена реальная `ENABLED` version для `database-url`.
- Ошибочная placeholder-версия `database-url` (version 2) отключена.
- Secret Readiness Gate запущен с явным списком из 4 секретов.
- Выполнен controlled replace Cloud Run service через `-replace`.
- Organization Policy не менялась.
- Ручной IAM через `gcloud` не выполнялся.
- `public_invoker`/`allUsers` отключён для dev через `cloud_run_allow_unauthenticated=false`.
- `deletion_protection=true` восстановлен после успешного recovery.

---

## Execution Summary

```text
1. Re-authenticated gcloud (ADC token had expired — invalid_rapt).
2. Checked Cloud SQL instance/users/databases (housemaster-db, user housemaster, db housemaster).
3. Set Cloud SQL user housemaster password via gcloud sql users set-password (interactive, secure).
4. Added database-url version 3 with real DATABASE_URL via gcloud secrets versions add.
5. Disabled incorrect database-url version 2.
6. Ran Secret Readiness Gate with:
   - auth-secret
   - google-client-id
   - google-client-secret
   - database-url
7. terraform untaint google_cloud_run_v2_service.web[0] (unlock-step).
8. Applied deletion_protection=false as isolated update-in-place change.
9. terraform plan -replace="google_cloud_run_v2_service.web[0]" — verified scope (only this resource + expected IAM).
10. Applied controlled Cloud Run replacement.
11. public_invoker apply failed — blocked by Organization Policy (allUsers not permitted).
12. Verified Cloud Run Ready state and logs.
13. Set cloud_run_allow_unauthenticated=false in dev.tfvars to remove public_invoker from plan graph.
14. Re-ran plan/apply — public_invoker cleanly absent (never existed in state).
15. Reverted deletion_protection=true, final plan/apply.
```

---

## Verification

```text
Secret Readiness Gate: PASSED (4/4 secrets)

Cloud Run conditions:
- Ready = True
- ConfigurationsReady = True
- RoutesReady = True

latestCreatedRevisionName == latestReadyRevisionName
(next-web-00001-6tc)

Cloud Run URL:
https://next-web-bbqvhnfzta-ew.a.run.app

Logs:
STARTUP HTTP probe succeeded after 1 attempt
Hello from Cloud Run! The container started successfully...
```

`Hello from Cloud Run` подтверждает, что сервис отвечает на placeholder-образе (`hello-1`), а не на реальном HouseMaster application image — деплой приложения ещё не выполнялся.

---

## Out of Scope

- Реальный деплой HouseMaster приложения.
- Изменение Organization Policy.
- Публичный unauthenticated-доступ.
- Private IP strategy для Cloud SQL.
- Production access model.
- Переработка Auth.js / Google Workspace SSO.

---

## Tech Debt / Follow-ups

```text
1. Secret Readiness Gate default list не включает database-url — при дефолтном запуске
   (без явного -Secrets) database-url не проверяется, хотя Cloud Run на него ссылается.
2. public_invoker/allUsers access model требует отдельной задачи
   (domain principal / IAP / LB / application-level auth).
3. Реальный Cloud Build deploy должен заменить placeholder Cloud Run image.
4. Cloud SQL сейчас использует публичный IP (PRIVATE_ADDRESS пуст);
   private IP strategy остаётся открытым вопросом.
5. dev.tfvars теперь отключает unauthenticated Cloud Run access
   (cloud_run_allow_unauthenticated=false) — учитывать при следующих deploy/access задачах.
```

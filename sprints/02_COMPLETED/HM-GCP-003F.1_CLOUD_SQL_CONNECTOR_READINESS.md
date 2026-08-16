# HM-GCP-003F.1 — Cloud SQL Connector Readiness

**Статус:** Completed
**Тип:** Infrastructure / Terraform / IAM
**Scope:** GCP / Cloud Run / Cloud SQL
**ADR:** не требуется (реализация в рамках уже принятой ADR-0003 Cloud SQL/PostgreSQL)

---

## Цель

Обеспечить связность Cloud Run ↔ Cloud SQL на уровне инфраструктуры перед началом работы над Prisma datasource readiness (HM-GCP-003F.3).

---

## Выполнено

~~~
- Cloud Run сервис next-web получил /cloudsql unix-socket mount
- sa-web-dev получил роль roles/cloudsql.client
- Cloud SQL инстанс housemaster-dev-503409:europe-west3:housemaster-db подключён
- Post-apply full plan показал только уже известный scaling drift, новых расхождений нет
- Коммит 8c95aa2 создан и запушен
- HEAD и origin синхронизированы
~~~

---

## Out of Scope

~~~
- Работа со схемой/миграциями Prisma (перенесено в HM-GCP-003F.3)
- Изменение содержимого секрета database-url
- Реальный деплой HouseMaster application image (Cloud Run остаётся на placeholder hello-1)
~~~

---

## Follow-ups

~~~
- DATABASE_URL socket-format secret update (контролируемое обновление, отдельная задача)
- Cloud Run scaling drift (manual_instance_count / min_instance_count: 0 → null)
- run.invoker / public access model — заблокирован org policy (allUsers)
- Cloud Build Trigger — автоматическая SHORT_SHA substitution не настроена
~~~
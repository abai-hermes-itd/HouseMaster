# HM-GCP-003F.3B — ADR-0006 Prisma 7 Configuration Model

**Статус:** Completed
**Тип:** Docs / Architecture
**Scope:** Prisma / Architecture Decision Record
**ADR:** docs/architecture/ADR-0006-prisma7-config-model.md

---

## Контекст

HM-GCP-003F.3 (Prisma Datasource & Migration Script Readiness, исходный scope) был остановлен: добавление `url = env("DATABASE_URL")` в `prisma/schema.prisma` вызвало ошибку валидации P1012 — Prisma 7.9.0 больше не поддерживает `datasource.url` в файле схемы. HM-GCP-003F.3A зафиксировал решение проблемы как decision note (без изменений кода). HM-GCP-003F.3B формализовал это решение в виде ADR.

---

## Выполнено

~~~
- Discovery pass: найдены ADR-0001..0005, следующий свободный номер — 0006
- ADR-0006 создан в docs/architecture/ (по конвенции ADR-0005, самого свежего ADR)
- Структура: Terminology, Architectural Principles, Context, Problem Statement,
  Constraints, Decision, Consequences, Non-goals, Accepted Defaults,
  Context Diagram Notes, Follow-up implementation tasks
- Коммит d02633d создан и запушен в origin/feat/hm-gcp-003d-cloud-sql-import
~~~

---

## Ключевое решение (см. ADR-0006 полностью)

~~~
- schema.prisma остаётся только со схемой/провайдером/моделями
- prisma.config.ts вводится для конфигурации Prisma CLI (datasource.url, schema path, migrations path)
- Runtime PrismaClient использует PostgreSQL driver adapter (ориентировочно @prisma/adapter-pg + pg)
- DATABASE_URL остаётся в Secret Manager; переход на Unix socket формат — отдельное контролируемое действие
- IAM DB auth отложен в будущий hardening-трек
- Понижение версии Prisma до 6 исключено
~~~

---

## Out of Scope

~~~
- Создание prisma.config.ts (перенесено в HM-GCP-003F.3C)
- Изменение package.json / зависимостей
- Изменение содержимого секрета database-url
- Выполнение prisma migrate deploy
~~~

---

## Follow-ups

~~~
- HM-GCP-003F.3C — Prisma 7 Config Implementation Planning
- Добавление зависимостей: @prisma/adapter-pg, pg, @types/pg, dotenv при необходимости
- Создание prisma.config.ts
- Добавление package.json scripts: db:generate, db:migrate:deploy
- Создание runtime Prisma client wrapper
- Валидация Unix socket DATABASE_URL против dev Cloud SQL
- Контролируемое обновление Secret Manager (database-url)
- Контролируемый prisma migrate deploy
- Cloud Run redeploy
~~~
# ADR-0006: Prisma 7 Configuration Model

| Поле | Значение |
|---|---|
| Статус | Proposed |
| Дата | 2026-08-15 |
| Авторы | HouseMaster Architecture Team |
| Связанные | ADR-0003 (Cloud SQL), ADR-0005 (Dual-Context Data Architecture), HM-GCP-003F.1, HM-GCP-003F.2 |
| Следующий шаг | HM-GCP-003F.3 (реализация, после approval) |

---

## Terminology

| Термин | Определение |
|---|---|
| **CLI Config** | Конфигурация Prisma CLI (generate, migrate, studio), задаваемая в prisma.config.ts, отдельно от схемы моделей. |
| **Driver Adapter** | Обязательный в Prisma 7 компонент, через который Prisma Client устанавливает runtime-подключение к БД (например, @prisma/adapter-pg). |
| **Datasource URL** | Строка подключения к базе данных; в Prisma 7 не хранится в schema.prisma, а передаётся отдельно для CLI (prisma.config.ts) и runtime (конструктор адаптера). |
| **Unix Socket Connection** | Способ подключения Cloud Run к Cloud SQL через файловый сокет /cloudsql/... вместо TCP host:port. |
| **IAM DB Auth** | Аутентификация к Cloud SQL через IAM-идентичность вместо пары user/password; не используется в первом dev-подключении. |

---

## Architectural Principles

**1. Разделение схемы и окружения.**
schema.prisma описывает только модели, enum'ы и провайдера БД. Все environment-specific параметры подключения (URL, credentials) выносятся за пределы схемы — в prisma.config.ts для CLI и в код приложения для runtime.

**2. Явный driver adapter, без скрытого engine-подключения.**
Prisma 7 не открывает соединение автоматически. Runtime-подключение конструируется явно через adapter (@prisma/adapter-pg), что даёт контроль над connection string и совместимость с нестандартными форматами (Unix socket).

**3. Совместимость с уже принятой инфраструктурой Cloud SQL.**
Решение не пересматривает HM-GCP-003F.1 (Cloud Run /cloudsql mount, sa-web-dev с roles/cloudsql.client) и HM-GCP-003F.2 (Unix socket + user/password для первого dev-подключения) — оно строится поверх этих решений.

**4. Секреты остаются в Secret Manager, изменяются контролируемо.**
Формат DATABASE_URL может измениться (Unix socket query param), но это отдельное governed-действие, не часть данного ADR.

**5. Не понижать версию Prisma.**
Явно исключается откат на Prisma 6 как способ обойти изменения конфигурационной модели.

---

## Context

HouseMaster использует Prisma ORM 7.9.0 как ORM-слой для Service Context (Cloud SQL, PostgreSQL). HM-GCP-003F.1 завершён: Cloud Run сервис next-web получил /cloudsql mount, sa-web-dev получил roles/cloudsql.client, Cloud SQL инстанс housemaster-dev-503409:europe-west3:housemaster-db подключён и подтверждён post-apply планом (только известный scaling drift, без новых расхождений).

HM-GCP-003F.2 зафиксировал решение: первое dev-подключение к БД выполняется через Unix socket + существующую пару PostgreSQL user/password, без IAM DB auth на этом этапе.

---

## Problem Statement

Попытка добавить url = env("DATABASE_URL") в блок datasource в prisma/schema.prisma (в рамках HM-GCP-003F.3) завершилась ошибкой валидации:

~~~
Error code: P1012
error: The datasource property url is no longer supported in schema files.
~~~

Prisma 7.9.0 удалил поддержку datasource.url в файле схемы. Подключение для CLI-операций (generate, migrate deploy) переносится в отдельный файл prisma.config.ts. Подключение для runtime (PrismaClient) требует обязательный driver adapter — прямого встроенного engine-подключения больше нет.

Без архитектурного решения по новой конфигурационной модели дальнейшая работа над HM-GCP-003F.3 (Prisma Datasource & Migration Script Readiness) заблокирована.

---

## Constraints

| Ограничение | Источник | Тип |
|---|---|---|
| datasource.url недопустим в schema.prisma | Prisma 7.9.0, ошибка P1012 | Технический, обязательный |
| CLI требует prisma.config.ts для connection URL | Prisma 7 официальная документация | Технический, обязательный |
| Runtime PrismaClient требует driver adapter | Prisma 7 официальная документация | Технический, обязательный |
| Первое dev-подключение — Unix socket + user/password, без IAM DB auth | HM-GCP-003F.2 | Архитектурный, принятый |
| Cloud Run /cloudsql mount и sa-web-dev с roles/cloudsql.client уже настроены | HM-GCP-003F.1 | Инфраструктурный, принятый |
| Не понижать версию Prisma до 6 | Явное решение проекта | Архитектурный, принятый |
| Формат Unix socket DATABASE_URL для pg/@prisma/adapter-pg не проверен эмпирически | Discovery в рамках HM-GCP-003F.3A | Технический, требует валидации |

---

## Decision

1. prisma/schema.prisma остаётся только со схемой/провайдером/моделями — без url, directUrl или shadowDatabaseUrl.
2. Вводится файл prisma.config.ts в корне проекта для конфигурации Prisma CLI: путь к схеме, путь к миграциям, datasource.url из env("DATABASE_URL").
3. Runtime PrismaClient использует PostgreSQL driver adapter, ориентировочно @prisma/adapter-pg + pg.
4. DATABASE_URL остаётся в Secret Manager; переход на формат Unix socket connection string выполняется отдельным контролируемым действием, вне рамок этого ADR.
5. IAM DB auth не реализуется в первом dev runtime-подключении — откладывается в будущий hardening-трек.
6. Понижение версии Prisma до 6 исключается как вариант.

---

## Consequences

**Positive:**
- Совместимость с Prisma 7.9.0 и текущей/будущей линией релизов.
- Чёткое разделение схемы моделей и environment-specific секретов подключения.
- CLI и runtime используют согласованную, документированную Prisma-модель конфигурации.
- Решение не требует пересмотра уже принятых HM-GCP-003F.1 и HM-GCP-003F.2.

**Trade-offs:**
- Новые зависимости в package.json: @prisma/adapter-pg, pg, @types/pg, возможно dotenv.
- Требуется отдельная runtime-обвязка (файл инициализации PrismaClient с адаптером).
- Требуется контролируемое обновление секрета database-url в Secret Manager.
- Требуется эмпирическая проверка совместимости Unix socket connection string с pg/@prisma/adapter-pg на dev-контуре, прежде чем считать путь подтверждённым.
- Возможны сопутствующие изменения (ESM/"type": "module", dotenv явный импорт), не проверенные в рамках этого ADR.

---

## Non-goals

- Обновление содержимого секрета database-url в Secret Manager — вне рамок этого ADR.
- Выполнение prisma migrate deploy.
- Деплой Cloud Run.
- Реализация IAM DB auth.
- Понижение версии Prisma до 6.
- Продакшн-хардening подключения к БД.

---

## Accepted Defaults

**1. Выбор между @prisma/adapter-pg и @google-cloud/cloud-sql-connector.**
**Принятое решение по умолчанию:** начать с @prisma/adapter-pg + прямая Unix socket connection string, как более простой путь, использующий уже готовую инфраструктуру HM-GCP-003F.1.
**Следующий шаг:** эмпирическая валидация на dev-контуре — отдельная задача, результат которой может изменить это решение на @google-cloud/cloud-sql-connector, но не блокирует принятие текущего ADR.

**2. Формат DATABASE_URL для Unix socket.**
**Принятое решение по умолчанию:** postgresql://USER:PASSWORD@localhost/DBNAME?host=/cloudsql/PROJECT:REGION:INSTANCE, по документации pg/Google Cloud SQL.
**Следующий шаг:** подтверждение точного формата при валидации на dev, до изменения продакшн-секрета.

**3. Необходимость dotenv и ESM-настроек.**
**Принятое решение по умолчанию:** не предполагать наличие/отсутствие — проверить фактическое состояние package.json и tsconfig/module-настроек apps/web на шаге реализации (Follow-up task 1-2), прежде чем добавлять зависимости.

---

## Context Diagram Notes

Данный ADR не меняет dual-contour архитектуру (ADR-0005) и не требует обновления context-architecture.svg. Изменения затрагивают исключительно внутренний механизм подключения Service Context к Cloud SQL — уровень реализации, не архитектурный контекст. Диаграмма контекстов остаётся без изменений.

---

## Follow-up implementation tasks

1. Добавить зависимости: @prisma/adapter-pg, pg, @types/pg, dotenv при необходимости.
2. Создать prisma.config.ts.
3. Добавить package.json scripts: db:generate, db:migrate:deploy.
4. Создать runtime Prisma client wrapper.
5. Валидировать Unix socket DATABASE_URL против dev Cloud SQL.
6. Контролируемое обновление Secret Manager (database-url).
7. Контролируемый prisma migrate deploy.
8. Cloud Run redeploy для применения обновлённого секрета/runtime-кода.
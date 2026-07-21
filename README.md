# HouseMaster

Property Management Platform

## Stack

- TypeScript
- React
- Next.js
- Node.js
- PostgreSQL
- Docker
- Google Cloud Platform

Repository initialized.
## Future deployment

### Google Cloud Platform

HouseMaster проектируется как cloud-native приложение для **Google Cloud Platform** (решение зафиксировано в [ADR-0002](docs/adr/ADR-0002-gcp-first.md)). Развёртывание ещё не выполняется — текущий этап готовит проект к нему.

Целевая инфраструктура:

| Слой | Сервис |
|---|---|
| Вычисления | Cloud Run (контейнер из [`Dockerfile`](Dockerfile)) |
| База данных | Cloud SQL — PostgreSQL ([ADR-0003](docs/adr/ADR-0003-cloud-sql-postgresql.md)) |
| Файлы | Cloud Storage |
| AI | Vertex AI: Gemini, Vision, Document AI, Vector Search |
| Идентичность | Два контура (ADR-0004): клиенты — любой e-mail/Google; админ — Workspace |
| Секреты | Secret Manager |
| CI/CD | Cloud Build → Artifact Registry → Cloud Run ([`cloudbuild.yaml`](cloudbuild.yaml)) |

Документация:

- Архитектура GCP: [`docs/architecture/002-gcp-architecture.md`](docs/architecture/002-gcp-architecture.md)
- Справочник сервисов: [`docs/gcp/services.md`](docs/gcp/services.md)
- Контракт конфигурации: [`.env.example`](.env.example)

Требования к коду уже сейчас: stateless-контейнер, конфигурация только через переменные окружения, секреты вне репозитория, логи в stdout, `output: 'standalone'` в конфигурации Next.js.

# HouseMaster — GCP Architecture

| Поле | Значение |
|---|---|
| Документ | 002-gcp-architecture.md |
| Идентификатор | HM-GCP-001 |
| Статус | Draft v1.0 (target architecture; деплой не выполнен) |
| Дата | 2026-07-21 |
| Связано | 000-system-overview.md, ADR-0002 (GCP First), ADR-0003 (Cloud SQL) |

Документ описывает **целевую** инфраструктуру HouseMaster в Google Cloud Platform. Это спецификация будущего развёртывания: на текущем этапе ни один сервис не создаётся, деплой не выполняется. Назначение документа — чтобы приложение с первого дня писалось под эту среду (конфигурация через переменные окружения, stateless-контейнер, секреты вне кода).

Это единственный источник правды по GCP-архитектуре. Каталог `docs/gcp/` содержит операционные справочные материалы (см. `docs/gcp/services.md`) и не дублирует данный документ.

---

## 1. Целевая схема

```text
                         Internet
                            │
                          HTTPS
                            │
              ┌─────────────┴──────────────┐
              │  [Phase 2+]                │
              │  Cloud Load Balancer       │
              │  + Cloud CDN + Cloud Armor │
              └─────────────┬──────────────┘
                            │   (MVP: Cloud Run напрямую,
                            │    managed TLS + custom domain)
                            ▼
                 ┌─────────────────────┐
                 │      Cloud Run      │
                 │  next-web (Next.js) │
                 │  UI + API Layer     │
                 └──────────┬──────────┘
                            │
      ┌──────────┬──────────┼──────────────┬─────────────┐
      ▼          ▼          ▼              ▼             ▼
┌──────────┐ ┌─────────┐ ┌─────────────┐ ┌──────────┐ ┌──────────────┐
│ Cloud SQL│ │  Cloud  │ │  Vertex AI  │ │  Secret  │ │   Pub/Sub    │
│(Postgres)│ │ Storage │ │ Gemini      │ │ Manager  │ │ + Scheduler  │
│ private  │ │ photos/ │ │ Vision AI   │ │          │ │ (async jobs) │
│    IP    │ │ docs/   │ │ Document AI │ └──────────┘ └──────┬───────┘
└──────────┘ │ media   │ │ Embeddings  │                     │
             └─────────┘ │ VectorSearch│                     ▼
                         └─────────────┘          ┌────────────────────┐
                                                  │ Cloud Run workers  │
      ┌─────────────┐                             │ (AI-конвейер:      │
      │  BigQuery   │◄── batch export ── Postgres │  OCR, embeddings,  │
      │ (analytics) │                             │  индексация)       │
      └─────────────┘                             └────────────────────┘

  Идентичность (ADR-0004): Users — любой e-mail/Google · Admin — Workspace (hd)
  Identity Platform НЕ используется
  Наблюдаемость: Cloud Logging · Cloud Monitoring · Error Reporting · Audit Logs
  Поставка: GitHub → Cloud Build → Artifact Registry → Cloud Run
```

Примечания к схеме:

- **Cloud Load Balancer вынесен в Phase 2+.** Для MVP Cloud Run самостоятельно терминирует HTTPS и обслуживает кастомный домен. Внешний LB подключается при появлении реальных причин: Cloud CDN для медиа, Cloud Armor (WAF), несколько сервисов за одним доменом, IAP.
- **Аутентификация — два контура** (см. ADR-0004): контур *Users* — клиенты платформы с любым e-mail (Google OAuth / Email+Password, Auth.js); контур *Admin* — только Google Workspace: OAuth-клиент Internal + серверная проверка claim `hd` из ID-токена (`hd` в параметрах запроса — лишь UX-фильтр). Identity Platform в архитектуре отсутствует.
- **AI-воркеры** — отдельные Cloud Run сервисы, получающие задачи через Pub/Sub (загрузка документа → OCR → chunking → embeddings → индексация в Vector Search). В MVP конвейер может жить внутри основного сервиса; выделение в воркеры — по мере роста нагрузки, без смены архитектуры.

---

## 2. Проекты и окружения

| Окружение | GCP-проект | Назначение |
|---|---|---|
| dev | `housemaster-dev` | Разработка и интеграционное тестирование; минимальные инстансы; Cloud SQL останавливается вне рабочих часов (Cloud Scheduler) |
| prod | `housemaster-prod` | Продакшн; те же Terraform-модули, другие параметры (размер инстансов, бэкапы, алерты) |

Правила:

1. Оба проекта создаются **только** через Terraform (репозиторий инфраструктуры); ручные изменения в консоли запрещены.
2. Конфигурация приложения идентична по составу переменных (`.env.example` — контракт), различается только значениями.
3. Регион по умолчанию: `europe-west1` (будет уточнён в Terraform с учётом доступности Vertex AI-моделей и близости к Казахстану; `VERTEX_LOCATION` может отличаться от региона Cloud Run).

---

## 3. Слой данных

| Хранилище | Содержимое | Доступ |
|---|---|---|
| Cloud SQL (PostgreSQL) | Операционные данные: дома, системы, осмотры, дефекты, работы, пользователи, роли, акты (метаданные) | Private IP; из Cloud Run через Cloud SQL connector; учётные данные в Secret Manager |
| Cloud Storage | Бакеты по типам: `*-images` (фото дефектов), `*-docs` (нормативы, паспорта, сканы), `*-media` (видео) | Только через приложение (signed URLs); публичного доступа нет; lifecycle-политики для холодных данных |
| Vertex AI Vector Search | Векторный индекс базы знаний (текстовые чанки + мультимодальные эмбеддинги) | Из API-слоя и AI-воркеров через service account |
| BigQuery | Аналитика: статистика дефектов, отчётность по фонду | Наполняется экспортом из PostgreSQL; прямых записей из приложения нет |

Выбор PostgreSQL вместо Firestore обоснован в **ADR-0003** (реляционная доменная модель, транзакции, PostGIS-перспектива, переносимость).

---

## 4. Идентичность и IAM

Разграничение двух уровней:

- **Пользователи** — два контура (ADR-0004): клиенты — Google OAuth / Email+Password; сотрудники (админ-портал) — Google Workspace с серверной проверкой `hd`. Оба контура → JWT-сессия с признаком `realm` → RBAC в PostgreSQL. Провайдер входа отвечает «кто ты», приложение — «что тебе можно».
- **Сервисы** — выделенные service accounts с минимальными правами:

| Service Account | Права |
|---|---|
| `sa-web` (основной сервис) | Cloud SQL Client; чтение нужных секретов; вызов Vertex AI; signed URLs на свои бакеты |
| `sa-ai-worker` | Vertex AI (модели + Vector Search), чтение `*-docs`, подписка Pub/Sub |
| `sa-cloudbuild` | Artifact Registry push; deploy в Cloud Run; **без** доступа к данным |

Запрещено: default service accounts, ключи в файлах/репозитории (только workload identity), роль `Editor`/`Owner` у рабочих аккаунтов.

---

## 5. Поставка

```text
GitHub (monorepo, push в main)
   │  триггер
   ▼
Cloud Build            # cloudbuild.yaml в корне репозитория
   │  install → lint → test → build → docker build (turbo prune)
   ▼
Artifact Registry      # неизменяемые образы, тег = commit SHA
   ▼
Cloud Run              # ревизии; канареечный трафик; откат = переключение ревизии
```

- Dockerfile в корне монорепо, оптимизирован под Cloud Run (multi-stage, non-root, Next.js standalone) — см. `/Dockerfile`.
- Скелет пайплайна — `/cloudbuild.yaml` (без реализации до Phase «Развёртывание»).
- Terraform живёт в отдельном репозитории; каталог `infrastructure/` в монорепо зарезервирован под CI-конфигурацию и связку с ним.

---

## 6. Наблюдаемость

- **Cloud Logging** — структурированные JSON-логи приложения (stdout контейнера подхватывается автоматически); обязательные поля: `severity`, `userId`, `traceId`, доменный контекст (`buildingId`, `inspectionId`).
- **Cloud Monitoring** — метрики Cloud Run (латентность, ошибки, инстансы), Cloud SQL (соединения, диск), алерты в prod.
- **Error Reporting** — агрегация исключений.
- **Audit Logs** — действия над инфраструктурой; прикладной аудит (кто изменил дефект/акт) — собственная таблица в PostgreSQL.

---

## 7. Что приложение обязано соблюдать уже сейчас

Эти требования действуют до всякого деплоя — они и есть смысл HM-GCP-001:

1. **Stateless.** Никакого локального состояния в контейнере: файлы — в Cloud Storage, сессии — в JWT/БД.
2. **Конфигурация только через env.** Контракт — `.env.example`; никаких захардкоженных URL, ключей, project ID.
3. **Секреты вне кода.** Локально — `.env` (в `.gitignore`); в GCP — Secret Manager, монтируемый в Cloud Run.
4. **Порт из окружения.** Сервер слушает `process.env.PORT` (Cloud Run передаёт порт сам).
5. **Логи в stdout JSON-строками.**
6. **Graceful shutdown** по SIGTERM (Cloud Run даёт 10 секунд).
7. **Next.js standalone output** — требование Dockerfile (`output: 'standalone'` в `next.config`).

---

## 8. Явно вне охвата (текущий этап)

Не выполняется до соответствующих фаз roadmap: создание GCP-проектов, деплой, сборка образов, написание Terraform, подключение Cloud Run/Cloud SQL, настройка OAuth-клиентов в консоли Google.

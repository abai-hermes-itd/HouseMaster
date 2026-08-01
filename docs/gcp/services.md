# HouseMaster — GCP Services Reference

> NOTE
>
> This document is an operational reference.
>
> Authoritative architecture is defined in:
>
> - ADR-0005-final.md
> - Architecture-Principles.md
> - data-classification.md

Краткий справочник: какой сервис GCP для чего используется в HouseMaster.
Целевая архитектура и связи между сервисами — в [`docs/architecture/002-gcp-architecture.md`](../architecture/002-gcp-architecture.md). Список согласован со стеком из `000-system-overview.md` (v1.1).

| Сервис | Для чего используется в HouseMaster |
|---|---|
| **Cloud Run** | Запуск приложения (Next.js: UI + API) и AI-воркеров как stateless-контейнеров. Автоскейлинг от нуля, ревизии, откаты. Единственная вычислительная платформа проекта. |
| **Cloud SQL (PostgreSQL)** | Основная операционная БД: дома, инженерные системы, осмотры, дефекты, работы, пользователи, роли, акты. Private IP, доступ только через connector. Выбор обоснован в ADR-0003. |
| **Cloud Storage** | Файлы: фото дефектов, видео осмотров, сканы нормативов и актов, проектная документация. Раздельные бакеты по типам контента, доступ через signed URLs. |
| **Secret Manager** | Все секреты рантайма: OAuth client secret, `AUTH_SECRET`, пароль БД, API-ключи. В коде и репозитории секретов нет; локально — `.env` вне git. |
| **Vertex AI** | AI-платформа: Gemini (LLM для RAG-ответов, генерации актов и рекомендаций), text/multimodal embeddings. Ядро AI-слоя системы. |
| **Vertex AI Vector Search** | Векторный индекс базы знаний — семантический поиск по нормативам, дефектам и фото; основа Multimodal RAG. |
| **Vision AI** | Анализ фотографий с осмотров: что изображено, признаки дефектов, состояние конструкций и оборудования. |
| **Document AI** | OCR и структурное извлечение из документов: СНиП, ГОСТ, паспорта зданий, сканы актов — вход документного конвейера. |
| **BigQuery** | Аналитическое хранилище: статистика дефектов, отчётность по жилому фонду. Наполняется экспортом из PostgreSQL. |
| **Pub/Sub** | Асинхронные задачи AI-конвейера: «документ загружен → OCR → chunking → embeddings → индексация». Развязывает API и тяжёлую обработку. |
| **Cloud Scheduler** | Регулярные задания: экспорт в BigQuery, регламентные напоминания об осмотрах, остановка dev-инстанса Cloud SQL вне рабочих часов. |
| **Cloud Build** | CI/CD: сборка, тесты, docker build, публикация образа, деплой в Cloud Run по push в `main`. Конфигурация — `cloudbuild.yaml` в корне монорепо. |
| **Artifact Registry** | Хранилище контейнерных образов. Каждый релиз — неизменяемый образ с тегом commit SHA; откат = переключение ревизии Cloud Run на прежний образ. |
| **Cloud Logging** | Централизованные структурированные логи всех сервисов (stdout контейнеров подхватывается автоматически). |
| **Cloud Monitoring** | Метрики и алерты: латентность и ошибки Cloud Run, состояние Cloud SQL, расход квот Vertex AI. |

**Не используются (осознанно):** Firebase (весь набор — ADR-0002), Identity Platform (аутентификация — Auth.js: клиенты с любым e-mail + Workspace для админ-контура, ADR-0004), Firestore (ADR-0003), GKE (избыточен — достаточно Cloud Run).

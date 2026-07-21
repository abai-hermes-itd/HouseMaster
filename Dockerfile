# =============================================================================
# HouseMaster — Dockerfile для Cloud Run
# =============================================================================
# Multi-stage сборка монорепозитория (Turborepo + pnpm), приложение apps/web.
#
# ТРЕБОВАНИЕ: в apps/web/next.config.(js|ts) должно быть включено
#     output: 'standalone'
# — иначе stage "runner" не найдёт .next/standalone.
#
# Принципы (см. 002-gcp-architecture.md, раздел 7):
#   - минимальный итоговый образ: только standalone-бандл, без node_modules
#     монорепы и dev-зависимостей;
#   - non-root пользователь;
#   - порт берётся из $PORT (Cloud Run передаёт его сам);
#   - никаких секретов в образе — вся конфигурация через env в рантайме.
#
# Образ НЕ собирается на текущем этапе (HM-GCP-001) — файл готовит проект
# к фазе развёртывания.
# =============================================================================

# --- Stage 1: prune — вырезаем из монорепы только то, что нужно apps/web -----
FROM node:22-alpine AS pruner
RUN corepack enable pnpm
WORKDIR /repo
COPY . .
RUN pnpm dlx turbo prune web --docker

# --- Stage 2: build — установка зависимостей и сборка ------------------------
FROM node:22-alpine AS builder
RUN corepack enable pnpm
WORKDIR /repo

# Сначала только манифесты — слой install кэшируется, пока не меняются deps
COPY --from=pruner /repo/out/json/ .
RUN pnpm install --frozen-lockfile

# Затем исходники и сборка
COPY --from=pruner /repo/out/full/ .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm turbo run build --filter=web

# --- Stage 3: runner — минимальный рантайм для Cloud Run ---------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Cloud Run задаёт PORT; 8080 — значение по умолчанию платформы
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

# Non-root пользователь
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Только standalone-бандл и статика — без pnpm, turbo и dev-зависимостей
COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /repo/apps/web/public ./apps/web/public

USER nextjs
EXPOSE 8080

CMD ["node", "apps/web/server.js"]

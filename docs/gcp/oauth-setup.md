# OAuth Setup — Admin Portal (HM-005)

> NOTE
>
> This document is an operational guide for the Admin Identity contour only.
>
> Authoritative architecture: ADR-0004, ADR-0005-final.md, Architecture-Principles.md

Инструкция по созданию OAuth-клиента для административного контура HouseMaster.
Контекст: [ADR-0004](../adr/ADR-0004-authentication-architecture.md).

---

## 1. Создать OAuth Client в Google Cloud Console

1. Открыть [console.cloud.google.com](https://console.cloud.google.com) → проект `housemaster-dev`
2. **APIs & Services → Credentials → Create Credentials → OAuth client ID**
3. Application type: **Web application**
4. Name: `HouseMaster Admin (dev)`

**Authorized redirect URIs:**
```
# Локальная разработка
http://localhost:3000/api/auth/callback/google

# Production (после деплоя в Cloud Run)
https://<your-cloud-run-url>/api/auth/callback/google
```

5. Сохранить Client ID и Client Secret → добавить в `.env.local` (локально) и в Secret Manager (prod)

---

## 2. Настроить Consent Screen

1. **APIs & Services → OAuth consent screen**
2. User Type: **Internal** ← обязательно
   - Internal = только аккаунты вашего Google Workspace
   - Это первый эшелон защиты: Google сам не пустит чужих
3. App name: `HouseMaster`
4. User support email: `<ваш email>`
5. Scopes: `email`, `profile`, `openid` (добавятся автоматически через Auth.js)

> **Важно:** тип **Internal** доступен только если GCP-проект создан под организацией Google Workspace (`abay-germes.kz`). Если проект личный — выбрать External и ограничить тестовыми пользователями.

---

## 3. Сгенерировать AUTH_SECRET

```bash
npx auth secret
# или
openssl rand -base64 33
```

Добавить в `.env.local` как `AUTH_SECRET=<значение>`.

---

## 4. Локальный запуск

```bash
# В C:\Abay-Germes\HouseMaster

cp apps/web/.env.local.example apps/web/.env.local
# Заполнить GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET

pnpm install
pnpm --filter web dev
```

Открыть http://localhost:3000

---

## 5. Чек-лист приёмки HM-005

### Позитивный сценарий
- [ ] Открыть http://localhost:3000/admin → редирект на /login (middleware)
- [ ] Нажать «Войти через Google»
- [ ] Выбрать аккаунт `*@abay-germes.kz`
- [ ] Попасть на /admin с именем, email, аватаром и доменом
- [ ] Обновить страницу → сессия сохранилась
- [ ] Нажать «Выйти» → редирект на /login, сессия закрыта
- [ ] Повторный вход работает

### Негативный сценарий
- [ ] Попытаться войти с личным Gmail (`@gmail.com`)
- [ ] Получить сообщение: «Доступ разрешён только для сотрудников домена abay-germes.kz»
- [ ] Сессия не создана
- [ ] /admin недоступен

### Middleware (default-deny)
- [ ] http://localhost:3000/admin без сессии → редирект на /login
- [ ] http://localhost:3000/login → доступна без авторизации
- [ ] http://localhost:3000/api/auth/session → доступна без авторизации

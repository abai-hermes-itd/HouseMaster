import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const ALLOWED_DOMAIN = process.env.ALLOWED_WORKSPACE_DOMAIN ?? "";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          // UX-фильтр: подсказывает Google показать аккаунты нужного домена.
          // НЕ является защитой — серверная проверка ниже в callbacks.signIn
          hd: ALLOWED_DOMAIN,
          prompt: "select_account",
        },
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    // ── Эшелон 2: серверная проверка домена ─────────────────────────────────
    // Эшелон 1 — OAuth-клиент типа Internal в GCP (закрывает чужих на уровне Google).
    // Эшелон 2 защищает даже если клиент переключён в External.
    async signIn({ profile }) {
      if (!profile) return false;

      // email_verified: защита от неподтверждённых аккаунтов
      if (!profile.email_verified) return false;

      // isAllowedDomain: заменяемый источник — сегодня конфиг, завтра БД (ADR-0004)
      return isAllowedDomain(profile.hd as string | undefined);
    },

    // Кладём realm и domain в токен — понадобится middleware и UI
    async jwt({ token, profile }) {
      if (profile) {
        token.realm = "admin";
        token.domain = profile.hd;
        token.picture = profile.picture as string | undefined;
      }
      return token;
    },

    // Пробрасываем в сессию только то, что нужно клиенту
    async session({ session, token }) {
      session.user.realm = token.realm as string;
      session.user.domain = token.domain as string;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    // При отказе редиректим на /login с читаемым параметром, а не на /api/auth/error
    error: "/login",
  },
});

// ── isAllowedDomain ──────────────────────────────────────────────────────────
// Алгоритм не меняется при переходе на несколько доменов или хранение в БД —
// меняется только источник данных (ADR-0004, раздел «Решение», п.2).
function isAllowedDomain(hd: string | undefined): boolean {
  if (!hd) return false; // личный Gmail — hd отсутствует
  // Будущий вариант: const domains = await getAllowedDomains(); return domains.includes(hd);
  return hd === ALLOWED_DOMAIN;
}

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Route-level gate for /admin/* — ADR-0004 (docs/adr/ADR-0004-authentication-architecture.md,
// раздел «Последствия»): «Периметр админ-контура должен быть отделён на уровне маршрутов
// (/admin/*) с собственным middleware; сессия контура Users не даёт доступа к
// админ-маршрутам ни при какой роли.»
//
// Это второй эшелон defense-in-depth поверх server-side `hd`-проверки в lib/auth.ts
// (callbacks.signIn) и третий поверх in-component redirect в app/admin/page.tsx —
// последний остаётся как есть (страховка), middleware перехватывает раньше.
export default auth((req) => {
  const session = req.auth;

  // Нет сессии ИЛИ сессия не админ-контура (realm !== "admin", например будущий
  // Users-контур из HM-006) — оба случая отправляем на /login, без различия
  // в сообщении, чтобы не раскрывать структуру контуров неавторизованному клиенту.
  if (!session || session.user?.realm !== "admin") {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};

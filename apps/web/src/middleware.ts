import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Маршруты, доступные без авторизации (whitelist)
const PUBLIC_PATHS = [
  "/login",
  "/api/auth",
  "/_next",
  "/favicon.ico",
];

function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Публичные маршруты — пропускаем
  if (isPublic(pathname)) return NextResponse.next();

  // Не авторизован — редирект на /login
  if (!req.auth) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Авторизован, но не админ — forbidden (на случай будущего контура Users)
  if (req.auth.user?.realm !== "admin") {
    const loginUrl = new URL("/login?error=AccessDenied", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  // Исключаем статику Next.js из middleware (производительность)
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
};

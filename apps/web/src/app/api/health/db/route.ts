import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET() {
  try {
    await getPrisma().$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok" });
  } catch (err) {
    // Логируем только безопасные, диагностические поля ошибки — ни в коем
    // случае не весь объект ошибки целиком и не process.env: у некоторых
    // драйверов (pg/Prisma) на объекте ошибки может присутствовать
    // connectionString/DATABASE_URL, а полный дамп этого не гарантирует.
    const error = err as {
      name?: string;
      message?: string;
      code?: unknown;
      cause?: unknown;
    };
    console.error("[health/db] database connectivity check failed", {
      name: error?.name,
      message: error?.message,
      code: error?.code,
      cause: error?.cause,
    });
    return NextResponse.json(
      { status: "error", message: "Database connectivity check failed" },
      { status: 500 },
    );
  }
}

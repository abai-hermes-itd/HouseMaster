import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required to initialize PrismaClient");
  }

  const adapter = new PrismaPg({ connectionString: databaseUrl });

  return new PrismaClient({
    adapter,
  });
}

let cachedClient: PrismaClient | undefined;

/**
 * Lazily creates (or reuses) the PrismaClient singleton.
 * Deferred until first call so that merely importing this module
 * (e.g. during Next.js build-time page-data collection) does not
 * require DATABASE_URL to be set.
 */
export function getPrisma(): PrismaClient {
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma ??= createPrismaClient();
    return globalForPrisma.prisma;
  }

  cachedClient ??= createPrismaClient();
  return cachedClient;
}

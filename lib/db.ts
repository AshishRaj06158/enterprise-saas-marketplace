import { PrismaClient } from "@prisma/client";

// Safe Build-Time Fallback for Database Connection:
// If DATABASE_URL is undefined during static generation / build time, provide a safe
// fallback URI so Prisma Client initialization does not throw an unhandled connection crash.
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL =
    "postgresql://nexus_build_user:nexus_build_pass@localhost:5432/nexus_build_db?schema=public";
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;

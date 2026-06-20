import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL || "";

  if (url.startsWith("postgres://") || url.startsWith("postgresql://")) {
    return new PrismaClient({
      adapter: new PrismaPg({ connectionString: url }),
    });
  }

  // For prisma+postgres:// (local Prisma dev server)
  return new PrismaClient();
}

// Lazy initialization: only create when first used (avoids build-time DB connection)
function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

// Export a Proxy that lazily initializes the client
export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop: string | symbol) {
    const client = getPrisma();
    const value = (client as unknown as Record<string | symbol, unknown>)[prop];
    if (typeof value === "function") {
      return (value as (...args: unknown[]) => unknown).bind(client);
    }
    return value;
  },
});


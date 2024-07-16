import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

// Globalthis.prisma is set up and checked on hot reload to prevent creation of multiple instances of PrismaClient in production mode. Global is not affected by hot reload.
export const db = globalThis.prisma || new PrismaClient(); 
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
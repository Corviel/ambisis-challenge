import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

/**
 * Este código chega se uma cópia do objeto global possui uma instância do prisma, se não tiver ele cria uma nova instância e atribui à copia.
 * O motivo dele é impedir que o HMR (Hot Module Reloading) crie uma nova instância do prisma a cada mudança de código. Em produção isto não seria necessário.
 */
let globalWithPrisma = global as typeof globalThis & {
  prisma: PrismaClient;
};

if (!globalWithPrisma.prisma) {
  globalWithPrisma.prisma = new PrismaClient();
}

prisma = globalWithPrisma.prisma;

export default prisma;

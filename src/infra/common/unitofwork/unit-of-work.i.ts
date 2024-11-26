import { PrismaClient, Prisma } from '@prisma/client';

export interface UnitOfWork {
    startTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>;
    getRepository<T>(repository: { new(context: Prisma.TransactionClient): T }): T;
}

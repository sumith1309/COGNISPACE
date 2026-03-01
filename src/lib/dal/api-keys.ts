import { db } from '@/lib/db';
import type { Prisma, ApiKey } from '../../../generated/prisma/client';
import type { PaginatedResult, PaginationParams } from './users';

export async function findApiKeyByHash(keyHash: string): Promise<ApiKey | null> {
  return db.apiKey.findUnique({ where: { keyHash } });
}

export async function findApiKeysByUser(
  userId: string,
  params: PaginationParams = {}
): Promise<PaginatedResult<ApiKey>> {
  const { page = 1, perPage = 20 } = params;
  const skip = (page - 1) * perPage;

  const where: Prisma.ApiKeyWhereInput = {
    userId,
    revokedAt: null,
  };

  const [data, total] = await Promise.all([
    db.apiKey.findMany({
      where,
      skip,
      take: perPage,
      orderBy: { createdAt: 'desc' },
    }),
    db.apiKey.count({ where }),
  ]);

  return {
    data,
    meta: { page, perPage, total, totalPages: Math.ceil(total / perPage) },
  };
}

export async function findApiKeysByOrg(
  orgId: string,
  params: PaginationParams = {}
): Promise<PaginatedResult<ApiKey>> {
  const { page = 1, perPage = 20 } = params;
  const skip = (page - 1) * perPage;

  const where: Prisma.ApiKeyWhereInput = {
    orgId,
    revokedAt: null,
  };

  const [data, total] = await Promise.all([
    db.apiKey.findMany({
      where,
      skip,
      take: perPage,
      orderBy: { createdAt: 'desc' },
    }),
    db.apiKey.count({ where }),
  ]);

  return {
    data,
    meta: { page, perPage, total, totalPages: Math.ceil(total / perPage) },
  };
}

export async function createApiKey(data: Prisma.ApiKeyCreateInput): Promise<ApiKey> {
  return db.apiKey.create({ data });
}

export async function revokeApiKey(id: string): Promise<ApiKey> {
  return db.apiKey.update({
    where: { id },
    data: { revokedAt: new Date() },
  });
}

export async function updateLastUsed(id: string): Promise<void> {
  await db.apiKey.update({
    where: { id },
    data: { lastUsedAt: new Date() },
  });
}

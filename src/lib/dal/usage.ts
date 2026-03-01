import { db } from '@/lib/db';
import type { Prisma, UsageLog } from '../../../generated/prisma/client';
import type { PaginatedResult, PaginationParams } from './users';

export async function createUsageLog(data: Prisma.UsageLogCreateInput): Promise<UsageLog> {
  return db.usageLog.create({ data });
}

export async function getUsageStats(
  params: PaginationParams & {
    userId?: string;
    apiKeyId?: string;
    modelId?: string;
    startDate?: Date;
    endDate?: Date;
  } = {}
): Promise<PaginatedResult<UsageLog>> {
  const { page = 1, perPage = 20, userId, apiKeyId, modelId, startDate, endDate } = params;
  const skip = (page - 1) * perPage;

  const where: Prisma.UsageLogWhereInput = {
    ...(userId ? { userId } : {}),
    ...(apiKeyId ? { apiKeyId } : {}),
    ...(modelId ? { modelId } : {}),
    ...(startDate || endDate
      ? {
          createdAt: {
            ...(startDate ? { gte: startDate } : {}),
            ...(endDate ? { lte: endDate } : {}),
          },
        }
      : {}),
  };

  const [data, total] = await Promise.all([
    db.usageLog.findMany({
      where,
      skip,
      take: perPage,
      orderBy: { createdAt: 'desc' },
    }),
    db.usageLog.count({ where }),
  ]);

  return {
    data,
    meta: { page, perPage, total, totalPages: Math.ceil(total / perPage) },
  };
}

export async function getUsageSummary(params: {
  userId?: string;
  orgId?: string;
  startDate?: Date;
  endDate?: Date;
}) {
  const { userId, startDate, endDate } = params;

  const where: Prisma.UsageLogWhereInput = {
    ...(userId ? { userId } : {}),
    ...(startDate || endDate
      ? {
          createdAt: {
            ...(startDate ? { gte: startDate } : {}),
            ...(endDate ? { lte: endDate } : {}),
          },
        }
      : {}),
  };

  const result = await db.usageLog.aggregate({
    where,
    _count: true,
    _sum: {
      tokensInput: true,
      tokensOutput: true,
      latencyMs: true,
    },
    _avg: {
      latencyMs: true,
    },
  });

  return {
    totalCalls: result._count,
    totalTokensInput: result._sum.tokensInput ?? 0,
    totalTokensOutput: result._sum.tokensOutput ?? 0,
    totalLatencyMs: result._sum.latencyMs ?? 0,
    avgLatencyMs: result._avg.latencyMs ?? 0,
  };
}

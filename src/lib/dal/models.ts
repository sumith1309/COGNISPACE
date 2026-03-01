import { db } from '@/lib/db';
import type { Prisma, AiModel } from '../../../generated/prisma/client';
import type { ModelCategory } from '../../../generated/prisma/client';
import type { PaginatedResult, PaginationParams } from './users';

export async function findModelById(id: string): Promise<AiModel | null> {
  return db.aiModel.findUnique({ where: { id } });
}

export async function findModelBySlug(slug: string): Promise<AiModel | null> {
  return db.aiModel.findUnique({ where: { slug } });
}

export async function findModels(
  params: PaginationParams & {
    category?: ModelCategory;
    isActive?: boolean;
    isPublic?: boolean;
  } = {}
): Promise<PaginatedResult<AiModel>> {
  const { page = 1, perPage = 20, category, isActive, isPublic } = params;
  const skip = (page - 1) * perPage;

  const where: Prisma.AiModelWhereInput = {
    ...(category ? { category } : {}),
    ...(isActive !== undefined ? { isActive } : {}),
    ...(isPublic !== undefined ? { isPublic } : {}),
  };

  const [data, total] = await Promise.all([
    db.aiModel.findMany({
      where,
      skip,
      take: perPage,
      orderBy: { name: 'asc' },
    }),
    db.aiModel.count({ where }),
  ]);

  return {
    data,
    meta: { page, perPage, total, totalPages: Math.ceil(total / perPage) },
  };
}

export async function findModelWithDeployments(id: string) {
  return db.aiModel.findUnique({
    where: { id },
    include: { deployments: true },
  });
}

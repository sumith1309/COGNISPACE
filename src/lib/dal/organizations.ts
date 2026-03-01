import { db } from '@/lib/db';
import type { Prisma, Organization } from '../../../generated/prisma/client';
import type { PaginatedResult, PaginationParams } from './users';

export async function findOrgById(id: string): Promise<Organization | null> {
  return db.organization.findUnique({ where: { id } });
}

export async function findOrgBySlug(slug: string): Promise<Organization | null> {
  return db.organization.findUnique({ where: { slug } });
}

export async function findOrgs(
  params: PaginationParams & { search?: string } = {}
): Promise<PaginatedResult<Organization>> {
  const { page = 1, perPage = 20, search } = params;
  const skip = (page - 1) * perPage;

  const where: Prisma.OrganizationWhereInput = search
    ? { name: { contains: search, mode: 'insensitive' } }
    : {};

  const [data, total] = await Promise.all([
    db.organization.findMany({
      where,
      skip,
      take: perPage,
      orderBy: { createdAt: 'desc' },
    }),
    db.organization.count({ where }),
  ]);

  return {
    data,
    meta: { page, perPage, total, totalPages: Math.ceil(total / perPage) },
  };
}

export async function createOrg(data: Prisma.OrganizationCreateInput): Promise<Organization> {
  return db.organization.create({ data });
}

export async function updateOrg(
  id: string,
  data: Prisma.OrganizationUpdateInput
): Promise<Organization> {
  return db.organization.update({ where: { id }, data });
}

export async function findOrgWithMembers(id: string) {
  return db.organization.findUnique({
    where: { id },
    include: {
      memberships: {
        include: { user: true },
      },
    },
  });
}

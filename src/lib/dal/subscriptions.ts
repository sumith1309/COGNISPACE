import { db } from '@/lib/db';
import type { Prisma, Subscription, Invoice } from '../../../generated/prisma/client';
import type { PaginatedResult, PaginationParams } from './users';

export async function findSubscriptionByOrgId(orgId: string): Promise<Subscription | null> {
  return db.subscription.findUnique({ where: { orgId } });
}

export async function createSubscription(
  data: Prisma.SubscriptionCreateInput
): Promise<Subscription> {
  return db.subscription.create({ data });
}

export async function updateSubscription(
  id: string,
  data: Prisma.SubscriptionUpdateInput
): Promise<Subscription> {
  return db.subscription.update({ where: { id }, data });
}

export async function findInvoicesByOrg(
  orgId: string,
  params: PaginationParams = {}
): Promise<PaginatedResult<Invoice>> {
  const { page = 1, perPage = 20 } = params;
  const skip = (page - 1) * perPage;

  const where: Prisma.InvoiceWhereInput = { orgId };

  const [data, total] = await Promise.all([
    db.invoice.findMany({
      where,
      skip,
      take: perPage,
      orderBy: { createdAt: 'desc' },
    }),
    db.invoice.count({ where }),
  ]);

  return {
    data,
    meta: { page, perPage, total, totalPages: Math.ceil(total / perPage) },
  };
}

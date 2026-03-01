import { db } from '@/lib/db';
import type { Prisma, Notification } from '../../../generated/prisma/client';
import type { PaginatedResult, PaginationParams } from './users';

export async function findNotificationsByUser(
  userId: string,
  params: PaginationParams & { unreadOnly?: boolean } = {}
): Promise<PaginatedResult<Notification>> {
  const { page = 1, perPage = 20, unreadOnly } = params;
  const skip = (page - 1) * perPage;

  const where: Prisma.NotificationWhereInput = {
    userId,
    ...(unreadOnly ? { readAt: null } : {}),
  };

  const [data, total] = await Promise.all([
    db.notification.findMany({
      where,
      skip,
      take: perPage,
      orderBy: { createdAt: 'desc' },
    }),
    db.notification.count({ where }),
  ]);

  return {
    data,
    meta: { page, perPage, total, totalPages: Math.ceil(total / perPage) },
  };
}

export async function createNotification(
  data: Prisma.NotificationCreateInput
): Promise<Notification> {
  return db.notification.create({ data });
}

export async function markAsRead(id: string): Promise<Notification> {
  return db.notification.update({
    where: { id },
    data: { readAt: new Date() },
  });
}

export async function markAllAsRead(userId: string): Promise<void> {
  await db.notification.updateMany({
    where: { userId, readAt: null },
    data: { readAt: new Date() },
  });
}

export async function getUnreadCount(userId: string): Promise<number> {
  return db.notification.count({
    where: { userId, readAt: null },
  });
}

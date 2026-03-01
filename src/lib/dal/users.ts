import { db } from '@/lib/db';
import type { Prisma, User, UserRole } from '../../../generated/prisma/client';

export interface PaginationParams {
  page?: number;
  perPage?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

// ── User Repository ──

export async function findUserById(id: string): Promise<User | null> {
  return db.user.findUnique({ where: { id } });
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return db.user.findUnique({ where: { email } });
}

export async function findUsers(
  params: PaginationParams & { role?: string; search?: string } = {}
): Promise<PaginatedResult<User>> {
  const { page = 1, perPage = 20, role, search } = params;
  const skip = (page - 1) * perPage;

  const where = {
    ...(role ? { role: role as UserRole } : {}),
    ...(search
      ? {
          OR: [
            { fullName: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  } satisfies Prisma.UserWhereInput;

  const [data, total] = await Promise.all([
    db.user.findMany({
      where,
      skip,
      take: perPage,
      orderBy: { createdAt: 'desc' },
    }),
    db.user.count({ where }),
  ]);

  return {
    data,
    meta: { page, perPage, total, totalPages: Math.ceil(total / perPage) },
  };
}

export async function createUser(data: Prisma.UserCreateInput): Promise<User> {
  return db.user.create({ data });
}

export async function updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
  return db.user.update({ where: { id }, data });
}

export async function deleteUser(id: string): Promise<void> {
  await db.user.delete({ where: { id } });
}

export async function findUserWithOrgs(id: string) {
  return db.user.findUnique({
    where: { id },
    include: {
      memberships: {
        include: { organization: true },
      },
    },
  });
}

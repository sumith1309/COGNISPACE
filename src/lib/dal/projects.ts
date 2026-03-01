import { db } from '@/lib/db';
import type { Prisma, ProjectStatus } from '../../../generated/prisma/client';
import type { PaginationParams } from './users';

// ── Get all projects for a client's organization ──

export async function findProjectsByOrgId(
  orgId: string,
  params: PaginationParams & { status?: string } = {}
) {
  const { page = 1, perPage = 20, status } = params;
  const skip = (page - 1) * perPage;

  const where = {
    orgId,
    ...(status ? { status: status as ProjectStatus } : {}),
  } satisfies Prisma.ProjectWhereInput;

  const [data, total] = await Promise.all([
    db.project.findMany({
      where,
      skip,
      take: perPage,
      orderBy: { updatedAt: 'desc' },
      include: {
        milestones: { orderBy: { sortOrder: 'asc' } },
        members: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                avatarUrl: true,
                role: true,
              },
            },
          },
        },
        _count: { select: { messages: true, deliverables: true } },
      },
    }),
    db.project.count({ where }),
  ]);

  return {
    data,
    meta: { page, perPage, total, totalPages: Math.ceil(total / perPage) },
  };
}

// ── Get single project with all details ──

export async function findProjectBySlug(slug: string) {
  return db.project.findUnique({
    where: { slug },
    include: {
      organization: true,
      milestones: {
        orderBy: { sortOrder: 'asc' },
        include: {
          deliverables: { orderBy: { createdAt: 'desc' } },
        },
      },
      deliverables: { orderBy: { createdAt: 'desc' } },
      members: {
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              avatarUrl: true,
              role: true,
              email: true,
            },
          },
        },
      },
      activities: {
        orderBy: { createdAt: 'desc' },
        take: 20,
      },
    },
  });
}

// ── Get project messages (paginated) ──

export async function findProjectMessages(projectId: string, params: PaginationParams = {}) {
  const { page = 1, perPage = 50 } = params;
  const skip = (page - 1) * perPage;

  const [data, total] = await Promise.all([
    db.projectMessage.findMany({
      where: { projectId },
      skip,
      take: perPage,
      orderBy: { createdAt: 'asc' },
      include: {
        sender: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            role: true,
          },
        },
      },
    }),
    db.projectMessage.count({ where: { projectId } }),
  ]);

  return {
    data,
    meta: { page, perPage, total, totalPages: Math.ceil(total / perPage) },
  };
}

// ── Get unread message count for a user across all their projects ──

export async function getUnreadMessageCount(userId: string) {
  const memberships = await db.projectMember.findMany({
    where: { userId },
    select: { projectId: true },
  });

  const projectIds = memberships.map((m) => m.projectId);
  if (projectIds.length === 0) return 0;

  return db.projectMessage.count({
    where: {
      projectId: { in: projectIds },
      senderId: { not: userId },
      isRead: false,
    },
  });
}

// ── Send a message ──

export async function createProjectMessage(data: {
  projectId: string;
  senderId: string;
  content: string;
  type?: string;
  attachments?: string[];
}) {
  return db.projectMessage.create({
    data: {
      projectId: data.projectId,
      senderId: data.senderId,
      content: data.content,
      type: (data.type as 'TEXT' | 'FILE' | 'SYSTEM') ?? 'TEXT',
      attachments: data.attachments ?? [],
    },
    include: {
      sender: {
        select: {
          id: true,
          fullName: true,
          avatarUrl: true,
          role: true,
        },
      },
    },
  });
}

// ── Approve / reject deliverable ──

export async function approveDeliverable(deliverableId: string, userId: string) {
  return db.deliverable.update({
    where: { id: deliverableId },
    data: {
      approvedAt: new Date(),
      approvedBy: userId,
      rejectedAt: null,
      rejectionNote: null,
    },
  });
}

export async function rejectDeliverable(deliverableId: string, note: string) {
  return db.deliverable.update({
    where: { id: deliverableId },
    data: {
      rejectedAt: new Date(),
      rejectionNote: note,
      approvedAt: null,
      approvedBy: null,
    },
  });
}

import { db } from '@/lib/db';
import type { Prisma, SupportTicket, TicketMessage } from '../../../generated/prisma/client';
import type { TicketStatus, TicketPriority } from '../../../generated/prisma/client';
import type { PaginatedResult, PaginationParams } from './users';

export async function findTicketById(id: string) {
  return db.supportTicket.findUnique({
    where: { id },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
        include: { sender: true },
      },
      creator: true,
      assignee: true,
    },
  });
}

export async function findTickets(
  params: PaginationParams & {
    userId?: string;
    orgId?: string;
    status?: TicketStatus;
    priority?: TicketPriority;
  } = {}
): Promise<PaginatedResult<SupportTicket>> {
  const { page = 1, perPage = 20, userId, orgId, status, priority } = params;
  const skip = (page - 1) * perPage;

  const where: Prisma.SupportTicketWhereInput = {
    ...(userId ? { userId } : {}),
    ...(orgId ? { orgId } : {}),
    ...(status ? { status } : {}),
    ...(priority ? { priority } : {}),
  };

  const [data, total] = await Promise.all([
    db.supportTicket.findMany({
      where,
      skip,
      take: perPage,
      orderBy: { createdAt: 'desc' },
    }),
    db.supportTicket.count({ where }),
  ]);

  return {
    data,
    meta: { page, perPage, total, totalPages: Math.ceil(total / perPage) },
  };
}

export async function createTicket(data: Prisma.SupportTicketCreateInput): Promise<SupportTicket> {
  return db.supportTicket.create({ data });
}

export async function updateTicket(
  id: string,
  data: Prisma.SupportTicketUpdateInput
): Promise<SupportTicket> {
  return db.supportTicket.update({ where: { id }, data });
}

export async function addMessage(data: Prisma.TicketMessageCreateInput): Promise<TicketMessage> {
  return db.ticketMessage.create({ data });
}

export async function findMessagesByTicket(ticketId: string): Promise<TicketMessage[]> {
  return db.ticketMessage.findMany({
    where: { ticketId },
    orderBy: { createdAt: 'asc' },
  });
}

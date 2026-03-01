import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { findProjectMessages, createProjectMessage } from '@/lib/dal/projects';
import { messageSchema } from '@/lib/validations/projects';

// GET: Fetch messages
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    const project = await db.project.findUnique({
      where: { slug },
      select: { id: true, orgId: true },
    });

    if (!project || (project.orgId !== session.user.orgId && session.user.role === 'CLIENT')) {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Access denied' } },
        { status: 403 }
      );
    }

    const page = parseInt(req.nextUrl.searchParams.get('page') ?? '1');
    const result = await findProjectMessages(project.id, { page });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Messages list error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } },
      { status: 500 }
    );
  }
}

// POST: Send message
export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    const project = await db.project.findUnique({
      where: { slug },
      select: { id: true, orgId: true },
    });

    if (!project || (project.orgId !== session.user.orgId && session.user.role === 'CLIENT')) {
      return NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'Access denied' } },
        { status: 403 }
      );
    }

    const body: unknown = await req.json();
    const { content } = messageSchema.parse(body);

    const message = await createProjectMessage({
      projectId: project.id,
      senderId: session.user.id,
      content,
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid input',
            details: error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }
    console.error('Message send error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } },
      { status: 500 }
    );
  }
}

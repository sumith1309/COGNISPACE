import { db } from '@/lib/db';
import type { Prisma, BlogPost } from '../../../generated/prisma/client';
import type { PostStatus } from '../../../generated/prisma/client';
import type { PaginatedResult, PaginationParams } from './users';

export async function findPostBySlug(slug: string): Promise<BlogPost | null> {
  return db.blogPost.findUnique({ where: { slug } });
}

export async function findPosts(
  params: PaginationParams & {
    status?: PostStatus;
    category?: string;
  } = {}
): Promise<PaginatedResult<BlogPost>> {
  const { page = 1, perPage = 20, status, category } = params;
  const skip = (page - 1) * perPage;

  const where: Prisma.BlogPostWhereInput = {
    ...(status ? { status } : {}),
    ...(category ? { category } : {}),
  };

  const [data, total] = await Promise.all([
    db.blogPost.findMany({
      where,
      skip,
      take: perPage,
      orderBy: { publishedAt: 'desc' },
    }),
    db.blogPost.count({ where }),
  ]);

  return {
    data,
    meta: { page, perPage, total, totalPages: Math.ceil(total / perPage) },
  };
}

export async function createPost(data: Prisma.BlogPostCreateInput): Promise<BlogPost> {
  return db.blogPost.create({ data });
}

export async function updatePost(id: string, data: Prisma.BlogPostUpdateInput): Promise<BlogPost> {
  return db.blogPost.update({ where: { id }, data });
}

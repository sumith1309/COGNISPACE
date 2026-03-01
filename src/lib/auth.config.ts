import type { NextAuthConfig } from 'next-auth';

/**
 * Edge-compatible auth config (no Prisma, no Node.js APIs).
 * Used by middleware for lightweight JWT session verification.
 * The full config with PrismaAdapter lives in auth.ts.
 */
export const authConfig = {
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    newUser: '/dashboard',
  },
  session: { strategy: 'jwt', maxAge: 7 * 24 * 60 * 60 },
  providers: [],
} satisfies NextAuthConfig;

import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await db.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) {
          throw new Error('Invalid email or password');
        }

        // Check account lockout
        if (user.lockedUntil && user.lockedUntil > new Date()) {
          const minutesLeft = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000);
          throw new Error(`Account locked. Try again in ${String(minutesLeft)} minutes.`);
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
          const failedAttempts = user.failedLoginAttempts + 1;

          if (failedAttempts >= 5) {
            await db.user.update({
              where: { id: user.id },
              data: {
                failedLoginAttempts: failedAttempts,
                lockedUntil: new Date(Date.now() + 15 * 60 * 1000),
              },
            });
          } else {
            await db.user.update({
              where: { id: user.id },
              data: { failedLoginAttempts: failedAttempts },
            });
          }

          throw new Error('Invalid email or password');
        }

        // Check email verification
        if (!user.emailVerified) {
          throw new Error('Please verify your email before signing in');
        }

        // Success — reset failed attempts, update login time
        await db.user.update({
          where: { id: user.id },
          data: {
            failedLoginAttempts: 0,
            lockedUntil: null,
            lastLoginAt: new Date(),
          },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          image: user.avatarUrl,
        };
      },
    }),
    Google({
      clientId: process.env['GOOGLE_CLIENT_ID'] ?? '',
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'] ?? '',
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env['GITHUB_CLIENT_ID'] ?? '',
      clientSecret: process.env['GITHUB_CLIENT_SECRET'] ?? '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // On initial sign-in, enrich token
      if (user?.id) {
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          include: {
            memberships: {
              include: { organization: true },
              take: 1,
              orderBy: { createdAt: 'asc' },
            },
          },
        });

        if (dbUser) {
          token.userId = dbUser.id;
          token.email = dbUser.email;
          token.role = dbUser.role;
          token.fullName = dbUser.fullName;
          token.avatarUrl = dbUser.avatarUrl ?? null;
          token.onboardingCompleted = dbUser.onboardingCompleted;

          const membership = dbUser.memberships[0];
          if (membership != null) {
            token.orgId = membership.orgId;
            token.orgRole = membership.role;
            token.orgName = membership.organization.name;
            token.orgSlug = membership.organization.slug;
          }
        }
      }

      // Handle session updates (profile edits etc.)
      if (trigger === 'update' && session != null) {
        const s = session as Record<string, unknown>;
        if (typeof s['fullName'] === 'string') {
          token.fullName = s['fullName'];
        }
        if (typeof s['avatarUrl'] === 'string' || s['avatarUrl'] === null) {
          token.avatarUrl = s['avatarUrl'] as string | null;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.role = token.role as string;
        session.user.fullName = token.fullName as string;
        session.user.avatarUrl = (token.avatarUrl as string | null) ?? null;
        session.user.onboardingCompleted = token.onboardingCompleted as boolean;
        if (typeof token.orgId === 'string') {
          session.user.orgId = token.orgId;
        }
        if (typeof token.orgRole === 'string') {
          session.user.orgRole = token.orgRole;
        }
        if (typeof token.orgName === 'string') {
          session.user.orgName = token.orgName;
        }
        if (typeof token.orgSlug === 'string') {
          session.user.orgSlug = token.orgSlug;
        }
      }
      return session;
    },

    async signIn({ user, account }) {
      // For OAuth: auto-create workspace if user is new
      if (account?.provider !== 'credentials' && user.id) {
        const existingMembership = await db.membership.findFirst({
          where: { userId: user.id },
        });

        if (!existingMembership) {
          const emailPrefix =
            user.email
              ?.split('@')[0]
              ?.toLowerCase()
              .replace(/[^a-z0-9]/g, '-') ?? `user-${user.id.slice(0, 8)}`;

          const org = await db.organization.create({
            data: {
              name: `${user.name ?? 'My'} Workspace`,
              slug: `${emailPrefix}-${Date.now().toString(36)}`,
            },
          });

          await db.membership.create({
            data: {
              userId: user.id,
              orgId: org.id,
              role: 'OWNER',
              acceptedAt: new Date(),
            },
          });

          // Create free subscription
          const now = new Date();
          await db.subscription.create({
            data: {
              orgId: org.id,
              plan: 'FREE',
              status: 'ACTIVE',
              currentPeriodStart: now,
              currentPeriodEnd: new Date(now.getFullYear() + 100, 0, 1),
            },
          });
        }

        // Update last login
        await db.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });
      }

      return true;
    },
  },
});

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { hashPassword, validatePasswordStrength, createVerificationToken } from '@/lib/auth-utils';
import { signUpSchema } from '@/lib/validations/auth';

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    const { email, password, fullName, companyName } = signUpSchema.parse(body);

    // Validate password strength
    const strength = validatePasswordStrength(password);
    if (!strength.isValid) {
      return NextResponse.json(
        {
          error: {
            code: 'WEAK_PASSWORD',
            message: 'Password too weak',
            details: strength.errors,
          },
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        {
          error: {
            code: 'EMAIL_EXISTS',
            message: 'An account with this email already exists',
          },
        },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user with CLIENT role by default
    const user = await db.user.create({
      data: {
        email,
        passwordHash,
        fullName,
        role: 'CLIENT',
        emailVerified: false,
      },
    });

    // Create workspace organization for the client
    const orgName = companyName ?? `${fullName}'s Workspace`;
    const slug = orgName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 40);

    const org = await db.organization.create({
      data: {
        name: orgName,
        slug: `${slug}-${Date.now().toString(36)}`,
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

    // Create free-tier subscription
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

    // Generate verification token
    const verificationToken = await createVerificationToken(email);

    // TODO: Send verification email (Prompt 19 — email system)
    if (process.env['NODE_ENV'] === 'development') {
      console.log(`\n📧 Verification token for ${email}: ${verificationToken}\n`);
    }

    return NextResponse.json(
      {
        message: 'Account created. Please check your email to verify your account.',
        userId: user.id,
      },
      { status: 201 }
    );
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
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } },
      { status: 500 }
    );
  }
}

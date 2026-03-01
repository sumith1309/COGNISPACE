import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createPasswordResetToken } from '@/lib/auth-utils';
import { forgotPasswordSchema } from '@/lib/validations/auth';

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    const { email } = forgotPasswordSchema.parse(body);
    const token = await createPasswordResetToken(email);

    // Never reveal whether user exists — always return success
    if (token && process.env['NODE_ENV'] === 'development') {
      console.log(`\n🔑 Password reset token for ${email}: ${token}\n`);
    }

    return NextResponse.json({
      message: 'If an account with that email exists, we sent a password reset link.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Invalid email' } },
        { status: 400 }
      );
    }
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } },
      { status: 500 }
    );
  }
}

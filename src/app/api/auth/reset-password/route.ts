import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { resetPasswordWithToken, validatePasswordStrength } from '@/lib/auth-utils';
import { resetPasswordSchema } from '@/lib/validations/auth';

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    const { email, token, password } = resetPasswordSchema.parse(body);

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

    const success = await resetPasswordWithToken(email, token, password);
    if (!success) {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_TOKEN',
            message: 'Invalid or expired reset link',
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Password reset successfully. You can now sign in.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } },
        { status: 400 }
      );
    }
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } },
      { status: 500 }
    );
  }
}

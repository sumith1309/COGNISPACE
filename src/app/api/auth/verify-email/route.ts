import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyEmailToken } from '@/lib/auth-utils';
import { verifyEmailSchema } from '@/lib/validations/auth';

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    const { email, token } = verifyEmailSchema.parse(body);
    const isValid = await verifyEmailToken(email, token);

    if (!isValid) {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_TOKEN',
            message: 'Invalid or expired verification link',
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: 'Email verified successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } },
        { status: 400 }
      );
    }
    console.error('Verify email error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } },
      { status: 500 }
    );
  }
}

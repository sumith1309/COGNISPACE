import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contactFormSchema } from '@/lib/validations/contact-form';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    const data = contactFormSchema.parse(body);

    await db.enterpriseLead.create({
      data: {
        contactName: data.fullName,
        contactEmail: data.email,
        companyName: data.company || 'Not specified',
        contactPhone: data.phone || null,
        useCase: data.description,
        industry: data.serviceType,
        budgetRange: data.budget ?? 'not-sure',
        timeline: 'not-specified',
        companySize: 'not-specified',
        modelsOfInterest: [],
        monthlyVolume: 'not-specified',
        integrationReqs: [],
        referralSource: data.referralSource ?? null,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.issues.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error('[Contact API] Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

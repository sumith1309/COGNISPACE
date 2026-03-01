import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { findProjectsByOrgId } from '@/lib/dal/projects';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    const orgId = session.user.orgId;
    if (!orgId) {
      return NextResponse.json(
        { error: { code: 'NO_ORG', message: 'No organization found' } },
        { status: 400 }
      );
    }

    const { searchParams } = req.nextUrl;
    const page = parseInt(searchParams.get('page') ?? '1');
    const statusParam = searchParams.get('status');

    const params: Parameters<typeof findProjectsByOrgId>[1] = { page };
    if (statusParam) {
      params.status = statusParam;
    }

    const result = await findProjectsByOrgId(orgId, params);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Projects list error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } },
      { status: 500 }
    );
  }
}

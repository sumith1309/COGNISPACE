import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;
  const isAuthenticated = !!session?.user;
  const pathname = nextUrl.pathname;
  const userRole = session?.user?.role;

  // Public routes (always accessible)
  const publicPaths = [
    '/',
    '/pricing',
    '/about',
    '/blog',
    '/contact',
    '/solutions',
    '/careers',
    '/partners',
    '/status',
    '/privacy',
    '/terms',
    '/auth/signin',
    '/auth/signup',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/auth/verify-email',
    '/auth/error',
  ];

  const isPublicRoute = publicPaths.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const isApiAuthRoute = pathname.startsWith('/api/auth');
  const isPublicApi = pathname === '/api/health' || pathname.startsWith('/api/v1/public');
  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isAdminRoute = pathname.startsWith('/admin');
  const isAuthRoute = pathname.startsWith('/auth/');

  // Always allow public & auth API routes
  if (isApiAuthRoute || isPublicApi || isPublicRoute) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from auth pages → dashboard
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  // Protect Client Portal (/dashboard)
  if (isDashboardRoute && !isAuthenticated) {
    const callbackUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(new URL(`/auth/signin?callbackUrl=${callbackUrl}`, nextUrl));
  }

  // Protect Admin Panel (/admin)
  if (isAdminRoute) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/auth/signin', nextUrl));
    }
    if (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', nextUrl));
    }
  }

  // Protect API routes
  if (pathname.startsWith('/api/v1/') && !isPublicApi && !isAuthenticated) {
    return NextResponse.json(
      {
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
        },
      },
      { status: 401 }
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};

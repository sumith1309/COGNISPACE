'use client';

import { useSession, signIn as nextSignIn, signOut as nextSignOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';
  const user = session?.user ?? null;

  // Role checks
  const isClient = user?.role === 'CLIENT';
  const isTeamMember = user?.role === 'TEAM_MEMBER';
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';
  const isInternalUser = isTeamMember || isAdmin || isSuperAdmin;

  const signIn = async (
    provider: 'credentials' | 'google' | 'github',
    options?: { email?: string; password?: string; callbackUrl?: string }
  ) => {
    if (provider === 'credentials') {
      const result = await nextSignIn('credentials', {
        email: options?.email,
        password: options?.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push((options?.callbackUrl ?? '/dashboard') as '/dashboard');
      router.refresh();
      return result;
    }

    return nextSignIn(provider, {
      callbackUrl: options?.callbackUrl ?? '/dashboard',
    });
  };

  const signOut = async () => {
    await nextSignOut({ callbackUrl: '/' });
  };

  return {
    user,
    session,
    isLoading,
    isAuthenticated,
    isClient,
    isTeamMember,
    isAdmin,
    isSuperAdmin,
    isInternalUser,
    signIn,
    signOut,
    updateSession: update,
  };
}

/** Redirects to sign-in if not authenticated */
export function useRequireAuth() {
  const auth = useAuth();
  const router = useRouter();

  if (!auth.isLoading && !auth.isAuthenticated) {
    router.push('/auth/signin');
  }

  return auth;
}

/** Check if user has at least the specified role level */
export function usePermission(
  requiredRole: 'CLIENT' | 'TEAM_MEMBER' | 'ADMIN' | 'SUPER_ADMIN'
): boolean {
  const { user } = useAuth();
  if (!user) return false;

  const roleHierarchy: Record<string, number> = {
    CLIENT: 1,
    TEAM_MEMBER: 2,
    ADMIN: 3,
    SUPER_ADMIN: 4,
  };

  return (roleHierarchy[user.role] ?? 0) >= (roleHierarchy[requiredRole] ?? 999);
}

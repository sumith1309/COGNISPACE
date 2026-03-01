import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: string;
      fullName: string;
      avatarUrl: string | null;
      onboardingCompleted: boolean;
      orgId?: string;
      orgRole?: string;
      orgName?: string;
      orgSlug?: string;
    };
  }

  interface User {
    id: string;
    role?: string;
    fullName?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string;
    role: string;
    fullName: string;
    avatarUrl: string | null;
    onboardingCompleted: boolean;
    orgId?: string;
    orgRole?: string;
    orgName?: string;
    orgSlug?: string;
  }
}

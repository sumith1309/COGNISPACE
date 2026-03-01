import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { findProjectsByOrgId, getUnreadMessageCount } from '@/lib/dal/projects';
import { DashboardOverview } from '@/components/dashboard/dashboard-overview';

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');

  const orgId = session.user.orgId;
  if (!orgId) redirect('/auth/signin');

  const [projectsResult, unreadCount] = await Promise.all([
    findProjectsByOrgId(orgId, { perPage: 50 }),
    getUnreadMessageCount(session.user.id),
  ]);

  return (
    <DashboardOverview
      user={{
        fullName: session.user.fullName,
        role: session.user.role,
      }}
      projects={projectsResult.data}
      unreadMessages={unreadCount}
    />
  );
}

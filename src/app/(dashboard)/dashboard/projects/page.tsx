import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { findProjectsByOrgId } from '@/lib/dal/projects';
import { ProjectsList } from '@/components/dashboard/projects-list';

export default async function ProjectsPage() {
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');

  const orgId = session.user.orgId;
  if (!orgId) redirect('/auth/signin');

  const result = await findProjectsByOrgId(orgId, { perPage: 50 });

  return <ProjectsList projects={result.data} />;
}

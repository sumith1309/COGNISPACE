import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { findProjectBySlug, findProjectMessages } from '@/lib/dal/projects';
import { ProjectDetail } from '@/components/dashboard/project-detail';

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await auth();
  if (!session?.user) redirect('/auth/signin');

  const orgId = session.user.orgId;
  if (!orgId) redirect('/auth/signin');

  const project = await findProjectBySlug(slug);
  if (!project || project.orgId !== orgId) {
    notFound();
  }

  const messagesResult = await findProjectMessages(project.id);

  return (
    <ProjectDetail
      project={project}
      messages={messagesResult.data}
      currentUserId={session.user.id}
      currentUserRole={session.user.role}
    />
  );
}

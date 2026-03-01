'use client';

import Link from 'next/link';
import { StatCard } from './stat-card';
import { ProjectCard } from './project-card';
import { ActivityFeed } from './activity-feed';

interface ProjectData {
  slug: string;
  name: string;
  description: string;
  status: string;
  progressPercent: number;
  techStack: string[];
  tags: string[];
  updatedAt: string | Date;
  startDate: string | Date | null;
  targetEndDate: string | Date | null;
  budgetAmount: number | null;
  members: Array<{
    user: { id: string; fullName: string; avatarUrl: string | null };
  }>;
  milestones: Array<{ status: string }>;
  _count: { messages: number; deliverables: number };
  activities?: Array<{
    id: string;
    action: string;
    details: unknown;
    createdAt: string | Date;
    userId: string | null;
  }>;
}

interface DashboardOverviewProps {
  user: { fullName: string; role: string };
  projects: ProjectData[];
  unreadMessages: number;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function DashboardOverview({ user, projects, unreadMessages }: DashboardOverviewProps) {
  const firstName = user.fullName.split(' ')[0] ?? user.fullName;

  const activeProjects = projects.filter((p) => p.status === 'IN_PROGRESS').length;
  const completedProjects = projects.filter((p) => p.status === 'COMPLETED').length;
  const pendingReviews = projects.reduce((count, p) => {
    return count + p.milestones.filter((m) => m.status === 'PENDING_REVIEW').length;
  }, 0);

  // Get latest 3 projects by updatedAt
  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  // Collect all activities from all projects
  const allActivities = projects
    .flatMap((p) => p.activities ?? [])
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {getGreeting()}, {firstName}
        </h1>
        <p className="mt-1 text-slate-500">Here&apos;s what&apos;s happening with your projects.</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Active Projects"
          value={activeProjects}
          icon="FolderKanban"
          iconColor="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
        />
        <StatCard
          title="Pending Reviews"
          value={pendingReviews}
          icon="Clock"
          iconColor="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
        />
        <StatCard
          title="Unread Messages"
          value={unreadMessages}
          icon="MessageSquare"
          iconColor="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400"
        />
        <StatCard
          title="Completed"
          value={completedProjects}
          icon="CheckCircle"
          iconColor="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
        />
      </div>

      {/* Two-column layout */}
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Left: Recent Projects */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Your Projects</h2>
            <Link
              href="/dashboard/projects"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              View all
            </Link>
          </div>
          {recentProjects.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {recentProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
              <p className="text-slate-500">No projects yet</p>
            </div>
          )}
        </div>

        {/* Right: Activity Feed */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
            Recent Activity
          </h2>
          <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
            <ActivityFeed activities={allActivities} maxItems={8} />
          </div>
        </div>
      </div>
    </div>
  );
}

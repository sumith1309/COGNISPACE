'use client';

import Link from 'next/link';
import { cn, formatRelativeTime } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ProjectMemberUser {
  id: string;
  fullName: string;
  avatarUrl: string | null;
}

interface ProjectCardData {
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
  members: Array<{ user: ProjectMemberUser }>;
  _count: { messages: number; deliverables: number };
}

interface ProjectCardProps {
  project: ProjectCardData;
  className?: string;
}

const statusConfig: Record<
  string,
  { variant: 'default' | 'secondary' | 'success' | 'warning' | 'destructive'; label: string }
> = {
  DISCOVERY: { variant: 'secondary', label: 'Discovery' },
  PROPOSAL: { variant: 'secondary', label: 'Proposal' },
  IN_PROGRESS: { variant: 'default', label: 'In Progress' },
  REVIEW: { variant: 'warning', label: 'Review' },
  COMPLETED: { variant: 'success', label: 'Completed' },
  ON_HOLD: { variant: 'warning', label: 'On Hold' },
  CANCELLED: { variant: 'destructive', label: 'Cancelled' },
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const status = statusConfig[project.status] ?? {
    variant: 'secondary' as const,
    label: project.status,
  };

  const visibleTechStack = project.techStack.slice(0, 4);
  const remainingTech = project.techStack.length - 4;
  const visibleMembers = project.members.slice(0, 3);
  const remainingMembers = project.members.length - 3;

  return (
    <Link href={`/dashboard/projects/${project.slug}`}>
      <Card variant="interactive" className={cn('overflow-hidden', className)}>
        {/* Gradient cover */}
        <div className="h-32 bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-blue-500/5 p-5">
          <div className="flex justify-end">
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
        </div>

        <div className="p-5">
          {/* Title & description */}
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">{project.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-500">{project.description}</p>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs text-slate-500">Progress</span>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {project.progressPercent}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500"
                style={{ width: `${project.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Tech stack tags */}
          {visibleTechStack.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {visibleTechStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                >
                  {tech}
                </span>
              ))}
              {remainingTech > 0 && (
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-400 dark:bg-slate-800">
                  +{remainingTech} more
                </span>
              )}
            </div>
          )}

          {/* Bottom row: team avatars + updated time */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex -space-x-2">
              {visibleMembers.map((member) => (
                <Avatar
                  key={member.user.id}
                  size="sm"
                  className="border-2 border-white dark:border-slate-900"
                >
                  {member.user.avatarUrl ? (
                    <AvatarImage src={member.user.avatarUrl} alt={member.user.fullName} />
                  ) : null}
                  <AvatarFallback>{getInitials(member.user.fullName)}</AvatarFallback>
                </Avatar>
              ))}
              {remainingMembers > 0 && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-xs font-medium text-slate-600 dark:border-slate-900 dark:bg-slate-800 dark:text-slate-400">
                  +{remainingMembers}
                </div>
              )}
            </div>
            <span className="text-xs text-slate-400">{formatRelativeTime(project.updatedAt)}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

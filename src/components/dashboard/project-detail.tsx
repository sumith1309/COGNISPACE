'use client';

import { cn, formatDate, formatCurrency } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { ProgressRing } from './progress-ring';
import { MilestoneTimeline } from './milestone-timeline';
import { ProjectChat } from './project-chat';
import { ActivityFeed } from './activity-feed';
import { Calendar, DollarSign, Users } from 'lucide-react';

interface DeliverableData {
  id: string;
  title: string;
  description: string | null;
  type: string;
  externalUrl: string | null;
  version: string;
  approvedAt: string | Date | null;
  approvedBy: string | null;
  rejectedAt: string | Date | null;
  rejectionNote: string | null;
}

interface MilestoneData {
  id: string;
  title: string;
  description: string | null;
  status: string;
  dueDate: string | Date | null;
  completedAt: string | Date | null;
  deliverables: DeliverableData[];
}

interface MemberData {
  role: string;
  user: {
    id: string;
    fullName: string;
    avatarUrl: string | null;
    role: string;
    email: string;
  };
}

interface ActivityData {
  id: string;
  action: string;
  details: unknown;
  createdAt: string | Date;
  userId: string | null;
}

interface MessageData {
  id: string;
  content: string;
  type: string;
  createdAt: string | Date;
  sender: {
    id: string;
    fullName: string;
    avatarUrl: string | null;
    role: string;
  };
}

interface ProjectData {
  slug: string;
  name: string;
  description: string;
  status: string;
  progressPercent: number;
  techStack: string[];
  tags: string[];
  startDate: string | Date | null;
  targetEndDate: string | Date | null;
  actualEndDate: string | Date | null;
  budgetAmount: number | null;
  budgetCurrency: string;
  milestones: MilestoneData[];
  members: MemberData[];
  activities: ActivityData[];
}

interface ProjectDetailProps {
  project: ProjectData;
  messages: MessageData[];
  currentUserId: string;
  currentUserRole: string;
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

function getRoleLabel(role: string): string {
  switch (role) {
    case 'lead':
      return 'Project Lead';
    case 'client':
      return 'Client';
    case 'member':
      return 'Team Member';
    case 'viewer':
      return 'Viewer';
    default:
      return role;
  }
}

export function ProjectDetail({
  project,
  messages,
  currentUserId,
  currentUserRole,
}: ProjectDetailProps) {
  const status = statusConfig[project.status] ?? {
    variant: 'secondary' as const,
    label: project.status,
  };
  const isClient = currentUserRole === 'CLIENT';

  async function handleApproveDeliverable(deliverableId: string) {
    try {
      await fetch(`/api/v1/projects/${project.slug}/deliverables/${deliverableId}/approve`, {
        method: 'POST',
      });
      window.location.reload();
    } catch {
      // Handle error
    }
  }

  async function handleRejectDeliverable(deliverableId: string, note: string) {
    try {
      await fetch(`/api/v1/projects/${project.slug}/deliverables/${deliverableId}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note }),
      });
      window.location.reload();
    } catch {
      // Handle error
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{project.name}</h1>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">{project.description}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones & Deliverables</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* ── Overview Tab ── */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              {/* Progress */}
              <Card className="p-6">
                <div className="flex items-center gap-8">
                  <ProgressRing progress={project.progressPercent} />
                  <div className="space-y-3">
                    {/* Dates */}
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span>
                        {project.startDate
                          ? formatDate(project.startDate, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : 'TBD'}
                        {' — '}
                        {project.actualEndDate
                          ? formatDate(project.actualEndDate, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : project.targetEndDate
                            ? formatDate(project.targetEndDate, {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : 'TBD'}
                      </span>
                    </div>

                    {/* Budget */}
                    {project.budgetAmount != null && (
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <DollarSign className="h-4 w-4 text-slate-400" />
                        <span>
                          {formatCurrency(
                            project.budgetAmount / 100,
                            project.budgetCurrency.toUpperCase()
                          )}
                        </span>
                      </div>
                    )}

                    {/* Team count */}
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span>
                        {project.members.length} team member
                        {project.members.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Tech Stack */}
              {project.techStack.length > 0 && (
                <Card className="p-6">
                  <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Right: Team */}
            <div>
              <Card className="p-6">
                <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">Team</h3>
                <div className="space-y-3">
                  {project.members.map((member) => (
                    <div key={member.user.id} className="flex items-center gap-3">
                      <Avatar size="sm">
                        {member.user.avatarUrl ? (
                          <AvatarImage src={member.user.avatarUrl} alt={member.user.fullName} />
                        ) : null}
                        <AvatarFallback>{getInitials(member.user.fullName)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                          {member.user.fullName}
                        </p>
                        <p className="text-xs text-slate-400">{getRoleLabel(member.role)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ── Milestones Tab ── */}
        <TabsContent value="milestones" className="mt-6">
          <Card className="p-6">
            <MilestoneTimeline
              milestones={project.milestones}
              isClient={isClient}
              onApproveDeliverable={handleApproveDeliverable}
              onRejectDeliverable={handleRejectDeliverable}
            />
          </Card>
        </TabsContent>

        {/* ── Messages Tab ── */}
        <TabsContent value="messages" className="mt-6">
          <ProjectChat
            projectSlug={project.slug}
            initialMessages={messages}
            currentUserId={currentUserId}
          />
        </TabsContent>

        {/* ── Activity Tab ── */}
        <TabsContent value="activity" className="mt-6">
          <Card className="p-6">
            <ActivityFeed activities={project.activities} maxItems={20} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

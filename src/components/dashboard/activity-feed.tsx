'use client';

import { cn, formatRelativeTime } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ActivityItem {
  id: string;
  action: string;
  details: unknown;
  createdAt: string | Date;
  userId: string | null;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  maxItems?: number;
  className?: string;
}

const actionConfig: Record<string, { color: string; label: string }> = {
  project_created: { color: 'bg-blue-500', label: 'Project created' },
  status_changed: { color: 'bg-blue-500', label: 'Status changed' },
  milestone_completed: { color: 'bg-emerald-500', label: 'Milestone completed' },
  deliverable_approved: { color: 'bg-emerald-500', label: 'Deliverable approved' },
  deliverable_uploaded: { color: 'bg-violet-500', label: 'Deliverable uploaded' },
  deliverable_rejected: { color: 'bg-red-500', label: 'Changes requested' },
  message_sent: { color: 'bg-violet-500', label: 'Message sent' },
};

function isDetailsObject(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
}

function getActivityDescription(activity: ActivityItem): string {
  const config = actionConfig[activity.action];
  const details = activity.details;

  if (!isDetailsObject(details)) return config?.label ?? activity.action;

  switch (activity.action) {
    case 'status_changed': {
      const from = typeof details['from'] === 'string' ? details['from'] : '';
      const to = typeof details['to'] === 'string' ? details['to'] : '';
      return `Status changed from ${from.replace('_', ' ')} to ${to.replace('_', ' ')}`;
    }
    case 'milestone_completed': {
      const milestone = typeof details['milestone'] === 'string' ? details['milestone'] : '';
      return `Milestone "${milestone}" completed`;
    }
    case 'deliverable_approved': {
      const deliverable = typeof details['deliverable'] === 'string' ? details['deliverable'] : '';
      return `Approved "${deliverable}"`;
    }
    case 'deliverable_uploaded': {
      const name = typeof details['deliverable'] === 'string' ? details['deliverable'] : '';
      const version = typeof details['version'] === 'string' ? details['version'] : '';
      return `Uploaded "${name}"${version ? ` v${version}` : ''}`;
    }
    case 'project_created': {
      const projectName = typeof details['name'] === 'string' ? details['name'] : '';
      return `Project "${projectName}" created`;
    }
    default:
      return config?.label ?? activity.action.replace(/_/g, ' ');
  }
}

export function ActivityFeed({ activities, maxItems = 8, className }: ActivityFeedProps) {
  const items = activities.slice(0, maxItems);

  if (items.length === 0) {
    return (
      <div className={cn('py-8 text-center text-sm text-slate-400', className)}>
        No recent activity
      </div>
    );
  }

  return (
    <div className={cn('space-y-0', className)}>
      {items.map((activity, index) => {
        const config = actionConfig[activity.action] ?? {
          color: 'bg-slate-400',
          label: activity.action,
        };

        return (
          <div key={activity.id} className="relative flex gap-3 pb-6 last:pb-0">
            {/* Timeline connector */}
            {index < items.length - 1 && (
              <div className="absolute top-5 left-[9px] h-full w-px bg-slate-200 dark:bg-slate-700" />
            )}

            {/* Dot */}
            <div
              className={cn(
                'mt-1.5 h-[18px] w-[18px] shrink-0 rounded-full border-[3px] border-white dark:border-slate-900',
                config.color
              )}
            />

            {/* Content */}
            <div className="min-w-0 flex-1">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {getActivityDescription(activity)}
              </p>
              <p className="mt-0.5 text-xs text-slate-400">
                {formatRelativeTime(activity.createdAt)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

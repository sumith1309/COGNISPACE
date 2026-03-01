'use client';

import { useState } from 'react';
import { cn, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Palette,
  Globe,
  Code,
  Package,
  MoreHorizontal,
  ExternalLink,
  Check,
  X,
  Clock,
} from 'lucide-react';

interface Deliverable {
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
  deliverables: Deliverable[];
}

interface MilestoneTimelineProps {
  milestones: MilestoneData[];
  onApproveDeliverable?: (id: string) => void;
  onRejectDeliverable?: (id: string, note: string) => void;
  isClient?: boolean;
  className?: string;
}

const milestoneStatusConfig: Record<string, { color: string; bgColor: string; label: string }> = {
  UPCOMING: { color: 'bg-slate-400', bgColor: 'bg-slate-50', label: 'Upcoming' },
  IN_PROGRESS: { color: 'bg-blue-500', bgColor: 'bg-blue-50', label: 'In Progress' },
  PENDING_REVIEW: { color: 'bg-amber-500', bgColor: 'bg-amber-50', label: 'Pending Review' },
  APPROVED: { color: 'bg-emerald-500', bgColor: 'bg-emerald-50', label: 'Approved' },
  REVISION: { color: 'bg-amber-500', bgColor: 'bg-amber-50', label: 'Revision' },
};

const deliverableIcons: Record<string, typeof FileText> = {
  DOCUMENT: FileText,
  DESIGN: Palette,
  PROTOTYPE: Package,
  CODE: Code,
  DEPLOYMENT: Globe,
  OTHER: MoreHorizontal,
};

export function MilestoneTimeline({
  milestones,
  onApproveDeliverable,
  onRejectDeliverable,
  isClient = false,
  className,
}: MilestoneTimelineProps) {
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectionNote, setRejectionNote] = useState('');

  function handleReject(deliverableId: string) {
    if (rejectionNote.trim() && onRejectDeliverable) {
      onRejectDeliverable(deliverableId, rejectionNote);
      setRejectingId(null);
      setRejectionNote('');
    }
  }

  return (
    <div className={cn('space-y-0', className)}>
      {milestones.map((milestone, index) => {
        const config = milestoneStatusConfig[milestone.status] ?? {
          color: 'bg-slate-400',
          bgColor: 'bg-slate-50',
          label: milestone.status,
        };

        return (
          <div key={milestone.id} className="relative flex gap-4 pb-8 last:pb-0">
            {/* Timeline line */}
            {index < milestones.length - 1 && (
              <div className="absolute top-7 left-[13px] h-[calc(100%-16px)] w-px bg-slate-200 dark:bg-slate-700" />
            )}

            {/* Circle indicator */}
            <div
              className={cn(
                'mt-1 h-[26px] w-[26px] shrink-0 rounded-full border-4 border-white dark:border-slate-900',
                config.color
              )}
            />

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {milestone.title}
                  </h4>
                  {milestone.description && (
                    <p className="mt-0.5 text-sm text-slate-500">{milestone.description}</p>
                  )}
                </div>
                <Badge
                  variant={
                    milestone.status === 'APPROVED'
                      ? 'success'
                      : milestone.status === 'IN_PROGRESS'
                        ? 'default'
                        : milestone.status === 'PENDING_REVIEW' || milestone.status === 'REVISION'
                          ? 'warning'
                          : 'secondary'
                  }
                >
                  {config.label}
                </Badge>
              </div>

              {/* Due date */}
              {milestone.dueDate && (
                <p className="mt-1 text-xs text-slate-400">
                  {milestone.completedAt
                    ? `Completed ${formatDate(milestone.completedAt)}`
                    : `Due ${formatDate(milestone.dueDate)}`}
                </p>
              )}

              {/* Deliverables */}
              {milestone.deliverables.length > 0 && (
                <div className="mt-3 space-y-2">
                  {milestone.deliverables.map((deliverable) => {
                    const Icon = deliverableIcons[deliverable.type] ?? FileText;
                    const isApproved = deliverable.approvedAt != null;
                    const isRejected = deliverable.rejectedAt != null;
                    const isPending = !isApproved && !isRejected;

                    return (
                      <div
                        key={deliverable.id}
                        className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800/50"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 rounded-lg bg-slate-100 p-1.5 dark:bg-slate-700">
                            <Icon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                {deliverable.title}
                              </span>
                              <span className="text-xs text-slate-400">v{deliverable.version}</span>
                            </div>
                            {deliverable.description && (
                              <p className="mt-0.5 text-xs text-slate-500">
                                {deliverable.description}
                              </p>
                            )}

                            {/* Status indicators */}
                            <div className="mt-2 flex items-center gap-2">
                              {isApproved && (
                                <span className="flex items-center gap-1 text-xs text-emerald-600">
                                  <Check className="h-3 w-3" />
                                  Approved{' '}
                                  {deliverable.approvedAt ? formatDate(deliverable.approvedAt) : ''}
                                </span>
                              )}
                              {isRejected && (
                                <span className="flex items-center gap-1 text-xs text-red-600">
                                  <X className="h-3 w-3" />
                                  Changes requested
                                </span>
                              )}
                              {isPending && (
                                <span className="flex items-center gap-1 text-xs text-amber-600">
                                  <Clock className="h-3 w-3" />
                                  Pending review
                                </span>
                              )}
                              {deliverable.externalUrl && (
                                <a
                                  href={deliverable.externalUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  View
                                </a>
                              )}
                            </div>

                            {/* Rejection note */}
                            {isRejected && deliverable.rejectionNote && (
                              <div className="mt-2 rounded bg-red-50 p-2 text-xs text-red-700 dark:bg-red-900/20 dark:text-red-400">
                                {deliverable.rejectionNote}
                              </div>
                            )}

                            {/* Approval actions for client */}
                            {isClient && isPending && (
                              <div className="mt-2 flex gap-2">
                                {rejectingId === deliverable.id ? (
                                  <div className="w-full space-y-2">
                                    <textarea
                                      value={rejectionNote}
                                      onChange={(e) => setRejectionNote(e.target.value)}
                                      placeholder="Describe the changes needed..."
                                      className="w-full rounded-md border border-slate-300 p-2 text-sm dark:border-slate-600 dark:bg-slate-800"
                                      rows={2}
                                    />
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleReject(deliverable.id)}
                                        disabled={!rejectionNote.trim()}
                                      >
                                        Submit
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => {
                                          setRejectingId(null);
                                          setRejectionNote('');
                                        }}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <Button
                                      size="sm"
                                      onClick={() => onApproveDeliverable?.(deliverable.id)}
                                    >
                                      <Check className="mr-1 h-3 w-3" />
                                      Approve
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => setRejectingId(deliverable.id)}
                                    >
                                      Request Changes
                                    </Button>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ProjectCard } from './project-card';

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
  _count: { messages: number; deliverables: number };
}

interface ProjectsListProps {
  projects: ProjectData[];
}

const tabs = [
  { value: 'all', label: 'All' },
  { value: 'IN_PROGRESS', label: 'Active' },
  { value: 'REVIEW', label: 'Review' },
  { value: 'DISCOVERY', label: 'Discovery' },
  { value: 'COMPLETED', label: 'Completed' },
] as const;

export function ProjectsList({ projects }: ProjectsListProps) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProjects =
    activeTab === 'all' ? projects : projects.filter((p) => p.status === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Projects</h1>
          <p className="mt-1 text-sm text-slate-500">
            {projects.length} project{projects.length !== 1 ? 's' : ''} total
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredProjects.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
              <p className="text-slate-500">No projects match this filter</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

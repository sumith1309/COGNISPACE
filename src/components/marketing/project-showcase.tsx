'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { getIcon } from '@/lib/icons';
import { projects, industries, type Project, type IndustryCategory } from '@/lib/projects-data';

const categoryColors: Record<IndustryCategory, string> = {
  finance: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  healthcare: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
  education: 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300',
  retail: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  logistics: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  'customer-experience': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300',
  'ethics-governance': 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  'knowledge-management': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
  'computer-vision': 'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300',
};

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const Icon = getIcon(project.icon);
  const industry = industries.find((i) => i.id === project.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      layout
    >
      <button
        onClick={onClick}
        className="group relative w-full rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
      >
        {/* Industry Badge */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex h-10 w-10 items-center justify-center rounded-lg">
                <Icon className="h-5 w-5" />
              </div>
            )}
          </div>
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 text-xs font-medium',
              categoryColors[project.category]
            )}
          >
            {industry?.shortLabel}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {project.shortDescription}
        </p>

        {/* Tech Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-400 dark:bg-slate-800 dark:text-slate-500">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Highlight Metric */}
        {project.highlightMetric && (
          <div className="text-brand-500 dark:text-brand-400 mt-4 text-xs font-medium">
            {project.highlightMetric}
          </div>
        )}
      </button>
    </motion.div>
  );
}

const validCategories = new Set<string>(industries.map((i) => i.id));

export function ProjectShowcase() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const initialCategory: 'all' | IndustryCategory =
    categoryParam && validCategories.has(categoryParam)
      ? (categoryParam as IndustryCategory)
      : 'all';

  const [activeCategory, setActiveCategory] = useState<'all' | IndustryCategory>(initialCategory);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const SelectedIcon = selectedProject ? getIcon(selectedProject.icon) : null;
  const selectedIndustry = selectedProject
    ? industries.find((i) => i.id === selectedProject.category)
    : null;

  return (
    <section className="bg-white py-16 lg:py-24 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-12 text-center"
        >
          <span className="text-brand-500 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase dark:bg-blue-950">
            Portfolio
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Our Work
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">
            60+ AI projects delivered across 9 industries. Every project — containerized, monitored,
            deployed. Built for production, not just presentations.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors',
              activeCategory === 'all'
                ? 'bg-brand-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
            )}
          >
            All ({projects.length})
          </button>
          {industries.map((industry) => (
            <button
              key={industry.id}
              onClick={() => setActiveCategory(industry.id)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                activeCategory === industry.id
                  ? 'bg-brand-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
              )}
            >
              {industry.shortLabel} ({industry.projectCount})
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-500 dark:text-slate-400">No projects in this category yet.</p>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <div className="mb-2 flex items-center gap-3">
              {SelectedIcon && (
                <div className="bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex h-10 w-10 items-center justify-center rounded-lg">
                  <SelectedIcon className="h-5 w-5" />
                </div>
              )}
              {selectedIndustry && (
                <span
                  className={cn(
                    'rounded-full px-2.5 py-0.5 text-xs font-medium',
                    categoryColors[selectedProject!.category]
                  )}
                >
                  {selectedIndustry.label}
                </span>
              )}
            </div>
            <DialogTitle className="text-xl">{selectedProject?.title}</DialogTitle>
            <DialogDescription className="mt-2 leading-relaxed">
              {selectedProject?.fullDescription}
            </DialogDescription>
          </DialogHeader>

          {/* Tech Stack */}
          <div className="mt-4">
            <h4 className="mb-2 text-sm font-medium text-slate-900 dark:text-white">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject?.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Highlight */}
          {selectedProject?.highlightMetric && (
            <div className="mt-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
              <span className="text-brand-600 dark:text-brand-400 text-sm font-medium">
                {selectedProject.highlightMetric}
              </span>
            </div>
          )}

          {/* CTA */}
          <div className="mt-6">
            <Button asChild className="w-full">
              <Link href="/contact">
                Discuss a Similar Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

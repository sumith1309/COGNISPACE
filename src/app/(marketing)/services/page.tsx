import type { Metadata } from 'next';
import Link from 'next/link';
import { Lightbulb, Code, Server, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'AI Strategy, Custom Development, MLOps Infrastructure, and AI Audits. Cognispace builds production-grade AI solutions.',
};

const services = [
  {
    id: 'strategy',
    icon: Lightbulb,
    title: 'AI Strategy & Discovery',
    description:
      'We start by deeply understanding your domain, data landscape, and business objectives. Then we identify where AI creates the highest leverage and build a clear roadmap to get there.',
    deliverables: [
      'Feasibility analysis & opportunity mapping',
      'Data audit and readiness assessment',
      'AI roadmap with prioritized use cases',
      'Technology stack recommendation',
    ],
    color: 'blue',
  },
  {
    id: 'development',
    icon: Code,
    title: 'Custom AI Development',
    description:
      'End-to-end design, build, and deployment of AI solutions — from LangGraph agents and recommendation engines to computer vision pipelines and NLP systems.',
    deliverables: [
      'Full-stack AI application development',
      'Model selection, training & fine-tuning',
      'API design and integration',
      'Production deployment with CI/CD',
    ],
    color: 'violet',
  },
  {
    id: 'mlops',
    icon: Server,
    title: 'MLOps & Infrastructure',
    description:
      'Production pipelines that keep your AI systems reliable, monitored, and continuously improving. We build the infrastructure so your models get smarter over time, not stale.',
    deliverables: [
      'Automated training & retraining pipelines',
      'Model monitoring & drift detection',
      'Prometheus / Grafana observability',
      'Containerized deployment (Docker, K8s)',
    ],
    color: 'emerald',
  },
  {
    id: 'audits',
    icon: Shield,
    title: 'AI Audits & Ethics',
    description:
      'Bias analysis, explainability reviews, and governance compliance for AI systems. We help you build AI that is fair, transparent, and trustworthy.',
    deliverables: [
      'Algorithmic bias analysis & remediation',
      'Model explainability (SHAP, LIME)',
      'ESG compliance assessment',
      'Governance framework recommendations',
    ],
    color: 'slate',
  },
];

const colorMap: Record<string, { bg: string; icon: string }> = {
  blue: {
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900',
    icon: 'text-blue-500',
  },
  violet: {
    bg: 'bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950 dark:to-violet-900',
    icon: 'text-violet-500',
  },
  emerald: {
    bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900',
    icon: 'text-emerald-500',
  },
  slate: {
    bg: 'bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700',
    icon: 'text-slate-500',
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-white dark:bg-slate-900">
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-brand-500 inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase dark:bg-blue-950">
            Services
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            What we do
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">
            From initial strategy through production deployment, we partner with your team to build
            AI solutions that create real business value.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              const colors = colorMap[service.color];
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:shadow-lg lg:p-10 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div
                    className={cn(
                      'inline-flex h-14 w-14 items-center justify-center rounded-xl',
                      colors?.bg
                    )}
                  >
                    <Icon className={cn('h-7 w-7', colors?.icon)} />
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-white">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-slate-500 dark:text-slate-400">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <span className="text-brand-500 mt-1">&#8226;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Start a Conversation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

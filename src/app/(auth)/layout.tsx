import { Logo } from '@/components/shared/logo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50/30 to-violet-50/20 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950/20">
      <div className="mb-8">
        <Logo size="lg" />
      </div>
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {children}
      </div>
      <p className="mt-6 text-sm text-slate-400 dark:text-slate-500">
        © 2026 Cognispace Technologies
      </p>
    </div>
  );
}

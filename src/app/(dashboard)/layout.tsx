'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { DashboardTopbar } from '@/components/layout/dashboard-topbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-slate-950">
      <Sidebar />
      <div className="ml-[260px] flex flex-1 flex-col transition-all duration-300">
        <DashboardTopbar />
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-[1280px]">{children}</div>
        </main>
      </div>
    </div>
  );
}

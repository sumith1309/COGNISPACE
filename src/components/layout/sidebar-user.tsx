'use client';

import React from 'react';
import { User, Settings, CreditCard, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SidebarUserProps {
  isCollapsed: boolean;
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
}

export function SidebarUser({
  isCollapsed,
  user = {
    name: 'Demo User',
    email: 'demo@cognispace.com',
    avatarUrl: undefined,
  },
}: SidebarUserProps) {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="min-w-0 flex-1 text-left"
              >
                <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                  {user.name}
                </p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600 dark:text-red-400">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

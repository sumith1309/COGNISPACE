'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Check, X, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/spinner';

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}

const PASSWORD_RULES = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { label: 'One number', test: (p: string) => /[0-9]/.test(p) },
  {
    label: 'One special character',
    test: (p: string) => /[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(p),
  },
] as const;

function getStrengthColor(score: number): string {
  if (score <= 1) return 'bg-red-500';
  if (score === 2) return 'bg-orange-500';
  if (score === 3) return 'bg-yellow-500';
  if (score === 4) return 'bg-lime-500';
  return 'bg-green-500';
}

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const token = searchParams.get('token') ?? '';
  const email = searchParams.get('email') ?? '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordScore = PASSWORD_RULES.filter((r) => r.test(password)).length;
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      router.push('/auth/signin');
    }, 3000);
    return () => clearTimeout(timer);
  }, [success, router]);

  if (!token || !email) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Invalid reset link</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          This password reset link is invalid or has expired.
        </p>
        <Link
          href="/auth/forgot-password"
          className="text-brand-500 dark:text-brand-400 mt-4 inline-block text-sm font-medium hover:underline"
        >
          Request a new reset link
        </Link>
      </motion.div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordScore < 5 || !passwordsMatch) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, password }),
      });

      const data: Record<string, unknown> = await res.json();

      if (!res.ok) {
        const error = data['error'] as { message?: string } | undefined;
        throw new Error(error?.message ?? 'Something went wrong');
      }

      setSuccess(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      toast({
        title: 'Reset failed',
        description: message,
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle2 className="h-7 w-7 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Password updated!</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Redirecting you to sign in...
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Set a new password</h1>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          Choose a strong password for your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <Input
            type={showPassword ? 'text' : 'password'}
            label="New password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftElement={<Lock className="h-4 w-4" />}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            required
            autoComplete="new-password"
          />

          {password.length > 0 && (
            <div className="mt-3 space-y-2.5">
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'h-1.5 flex-1 rounded-full transition-colors duration-200',
                      i < passwordScore
                        ? getStrengthColor(passwordScore)
                        : 'bg-slate-200 dark:bg-slate-700'
                    )}
                  />
                ))}
              </div>

              <ul className="space-y-1">
                {PASSWORD_RULES.map((rule) => {
                  const met = rule.test(password);
                  return (
                    <li key={rule.label} className="flex items-center gap-1.5 text-xs">
                      {met ? (
                        <Check className="h-3.5 w-3.5 text-green-500" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" />
                      )}
                      <span
                        className={
                          met
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-slate-400 dark:text-slate-500'
                        }
                      >
                        {rule.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <Input
          type={showPassword ? 'text' : 'password'}
          label="Confirm password"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          leftElement={<Lock className="h-4 w-4" />}
          error={
            confirmPassword.length > 0 && !passwordsMatch ? 'Passwords do not match' : undefined
          }
          required
          autoComplete="new-password"
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          isLoading={isLoading}
          disabled={isLoading || passwordScore < 5 || !passwordsMatch}
        >
          Reset Password
        </Button>
      </form>

      <p className="mt-6 text-center">
        <Link
          href="/auth/signin"
          className="text-brand-500 dark:text-brand-400 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </p>
    </motion.div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
  User,
  Building2,
  Check,
  X,
  MailCheck,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

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

export default function SignUpPage() {
  const { signIn } = useAuth();
  const { toast } = useToast();

  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const passwordScore = PASSWORD_RULES.filter((r) => r.test(password)).length;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordScore < 5) {
      toast({
        title: 'Weak password',
        description: 'Please meet all password requirements.',
        variant: 'error',
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          fullName,
          companyName: companyName || undefined,
        }),
      });

      const data: Record<string, unknown> = await res.json();

      if (!res.ok) {
        const error = data['error'] as { message?: string; details?: unknown } | undefined;
        throw new Error((error?.message as string | undefined) ?? 'Something went wrong');
      }

      setSuccess(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      toast({
        title: 'Sign up failed',
        description: message,
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    setOauthLoading(provider);
    try {
      await signIn(provider, { callbackUrl: '/dashboard' });
    } catch {
      toast({
        title: 'Sign in failed',
        description: 'Something went wrong. Please try again.',
        variant: 'error',
      });
      setOauthLoading(null);
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
          <MailCheck className="h-7 w-7 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Check your email!</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          We&apos;ve sent a verification link to{' '}
          <span className="font-medium text-slate-700 dark:text-slate-300">{email}</span>. Please
          verify your email to sign in.
        </p>
        <Link
          href="/auth/signin"
          className="text-brand-500 dark:text-brand-400 mt-6 inline-block text-sm font-medium hover:underline"
        >
          Back to sign in
        </Link>
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
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create your account</h1>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          Get started with your client portal
        </p>
      </div>

      <form onSubmit={handleSignUp} className="mt-6 space-y-4">
        <Input
          type="text"
          label="Full name"
          placeholder="Your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          leftElement={<User className="h-4 w-4" />}
          required
          autoComplete="name"
        />

        <Input
          type="text"
          label="Company name"
          placeholder="Your company name (optional)"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          leftElement={<Building2 className="h-4 w-4" />}
          autoComplete="organization"
        />

        <Input
          type="email"
          label="Email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftElement={<Mail className="h-4 w-4" />}
          required
          autoComplete="email"
        />

        <div>
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="Create a strong password"
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

          {/* Password strength meter */}
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

        <Button
          type="submit"
          className="mt-2 w-full"
          size="lg"
          isLoading={isLoading}
          disabled={isLoading || oauthLoading !== null || passwordScore < 5}
        >
          Create Account
        </Button>
      </form>

      <div className="relative my-6">
        <Separator />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-slate-400 dark:bg-slate-900 dark:text-slate-500">
          or continue with
        </span>
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleOAuthSignIn('google')}
          isLoading={oauthLoading === 'google'}
          disabled={isLoading || oauthLoading !== null}
          leftIcon={
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          }
        >
          Continue with Google
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleOAuthSignIn('github')}
          isLoading={oauthLoading === 'github'}
          disabled={isLoading || oauthLoading !== null}
          leftIcon={<Github className="h-4 w-4" />}
        >
          Continue with GitHub
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{' '}
        <Link
          href="/auth/signin"
          className="text-brand-500 dark:text-brand-400 font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}

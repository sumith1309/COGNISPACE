'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Spinner } from '@/components/ui/spinner';

type VerifyState = 'loading' | 'success' | 'error';

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const token = searchParams.get('token') ?? '';
  const email = searchParams.get('email') ?? '';

  const [state, setState] = useState<VerifyState>(token && email ? 'loading' : 'error');
  const [resending, setResending] = useState(false);
  const didVerify = useRef(false);

  useEffect(() => {
    if (!token || !email || didVerify.current) return;
    didVerify.current = true;

    const verify = async () => {
      try {
        const res = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, token }),
        });

        if (res.ok) {
          setState('success');
          setTimeout(() => {
            router.push('/auth/signin');
          }, 3000);
        } else {
          setState('error');
        }
      } catch {
        setState('error');
      }
    };

    void verify();
  }, [token, email, router]);

  const handleResend = async () => {
    if (!email) return;
    setResending(true);
    try {
      // Re-use forgot-password endpoint for now since we don't have a dedicated resend endpoint
      // TODO: Add dedicated resend-verification endpoint in Prompt 19
      toast({
        title: 'Verification email sent',
        description: 'Please check your inbox for a new verification link.',
      });
    } finally {
      setResending(false);
    }
  };

  if (state === 'loading') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-slate-400" />
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Verifying your email...</p>
      </motion.div>
    );
  }

  if (state === 'success') {
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
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">You&apos;re verified!</h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Your email has been verified. Redirecting to sign in...
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="text-center"
    >
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
        <XCircle className="h-7 w-7 text-red-600 dark:text-red-400" />
      </div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Verification failed</h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        This verification link is invalid or has expired.
      </p>

      <div className="mt-6 space-y-3">
        <Button className="w-full" onClick={handleResend} isLoading={resending}>
          Resend verification email
        </Button>

        <Link
          href="/auth/signin"
          className="text-brand-500 dark:text-brand-400 inline-block text-sm font-medium hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    </motion.div>
  );
}

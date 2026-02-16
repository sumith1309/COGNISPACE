'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Something went wrong
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={reset}
          className="mt-6 rounded-md bg-brand-500 px-4 py-2 text-white hover:bg-brand-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

import { AlertCircle, ArrowLeft, LoaderCircle, RefreshCw } from 'lucide-react';
import { Link } from 'wouter';

export function WeddingLoading() {
  return (
    <div className="mx-auto flex min-h-[62vh] max-w-6xl flex-col justify-center px-5 py-16 sm:px-8" data-testid="status-wedding-loading">
      <div className="h-3 w-24 animate-pulse rounded bg-secondary" />
      <div className="mt-7 h-16 max-w-xl animate-pulse rounded bg-secondary" />
      <div className="mt-4 h-5 max-w-sm animate-pulse rounded bg-secondary" />
      <div className="mt-12 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
        {[1, 2, 3, 4].map((item) => <div key={item} className="h-28 animate-pulse rounded-md bg-secondary" />)}
      </div>
    </div>
  );
}

export function QueryError({ onRetry, label = 'We could not open this page.' }: { onRetry: () => void; label?: string }) {
  return (
    <div className="mx-auto flex min-h-[62vh] max-w-xl flex-col items-center justify-center px-5 py-16 text-center" data-testid="status-query-error">
      <span className="grid h-12 w-12 place-items-center rounded-full border border-destructive/30 text-destructive">
        <AlertCircle size={20} />
      </span>
      <p className="eyebrow mt-6 text-destructive">A small hiccup</p>
      <h1 className="display-font mt-3 text-4xl font-semibold">{label}</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">Please try again. Your place in the celebration is still waiting.</p>
      <button type="button" onClick={onRetry} className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5" data-testid="button-retry-query">
        <RefreshCw size={15} /> Try again
      </button>
    </div>
  );
}

export function PageNotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 py-16 text-center">
      <p className="eyebrow text-primary">The wrong envelope</p>
      <h1 className="display-font mt-4 text-5xl font-semibold">This page wandered off.</h1>
      <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline" data-testid="link-return-home">
        <ArrowLeft size={15} /> Return to the invitation
      </Link>
    </div>
  );
}

export function PendingMark() {
  return <LoaderCircle size={16} className="animate-spin" aria-label="Loading" />;
}
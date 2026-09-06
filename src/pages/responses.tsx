import { ArrowLeft, ChevronRight, MessageCircle, Phone, Users, Wine, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'wouter';
// import {
//   getGetRsvpQueryKey,
//   useGetRsvp,
//   useGetRsvpSummary,
//   useGetWedding,
//   useListRsvps,
// } from '@workspace/api-client-react';
import { QueryError } from '@/components/data-states';
import { Ornament } from '@/components/ornament';

function formatSubmitted(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(parsed);
}

function phoneForWhatsApp(phone: string) {
  return phone.replace(/[^\d]/g, '');
}

export default function ResponsesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // const weddingQuery = useGetWedding();
  // const summaryQuery = useGetRsvpSummary();
  // const listQuery = useListRsvps();
  // const selectedQuery = useGetRsvp(selectedId ?? '', {
  //   query: { enabled: Boolean(selectedId), queryKey: getGetRsvpQueryKey(selectedId ?? '') },
  // });
  // const wedding = weddingQuery.data;
  // const summary = summaryQuery.data;
  // const rsvps = listQuery.data;
  // const sortedRsvps = useMemo(() => [...(rsvps ?? [])].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()), [rsvps]);

  // if (weddingQuery.isError || summaryQuery.isError || listQuery.isError) {
  //   const retry = () => {
  //     void weddingQuery.refetch();
  //     void summaryQuery.refetch();
  //     void listQuery.refetch();
  //   };
  //   return <QueryError onRetry={retry} label="We could not load the response notes." />;
  // }

  // if (weddingQuery.isLoading || summaryQuery.isLoading || listQuery.isLoading || !wedding || !summary || !rsvps) {
  //   return (
  //     <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20" data-testid="status-responses-loading">
  //       <div className="h-3 w-28 animate-pulse rounded bg-secondary" />
  //       <div className="mt-6 h-16 w-80 max-w-full animate-pulse rounded bg-secondary" />
  //       <div className="mt-12 grid gap-3 sm:grid-cols-4">
  //         {[1, 2, 3, 4].map((item) => <div key={item} className="h-32 animate-pulse rounded-xl bg-secondary" />)}
  //       </div>
  //       <div className="mt-8 h-80 animate-pulse rounded-xl bg-secondary" />
  //     </div>
  //   );
  // }

  // const drinkLabel = (drink: string) => wedding.drinks.find((option) => option.id === drink)?.name ?? drink;
  // const selected = selectedQuery.data;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="flex flex-col gap-7 border-b border-border pb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary" data-testid="link-responses-back">
            <ArrowLeft size={14} /> Invitation
          </Link>
          <p className="eyebrow mt-12 text-primary">A quiet little dashboard</p>
          <h1 className="display-font mt-4 text-6xl font-semibold leading-[.88] tracking-[-.04em] sm:text-7xl">
            The guest<br /><span className="italic text-primary">book.</span>
          </h1>
        </div>
        <div className="max-w-xs sm:text-right">
          {/* <p className="text-sm leading-6 text-muted-foreground">A private overview for {wedding.couple}. Every reply, in one warm place.</p> */}
          <p className="mt-3 text-xs text-muted-foreground/70">Responses refresh when you return to this page.</p>
        </div>
      </div>

      <section className="grid gap-3 py-8 sm:grid-cols-2 lg:grid-cols-4" aria-label="RSVP summary">
        <div className="rounded-xl bg-primary p-5 text-primary-foreground shadow-[0_12px_30px_hsl(var(--primary)/.14)]" data-testid="card-summary-total">
          <p className="eyebrow text-primary-foreground/65">Replies</p>
          {/* <p className="display-font mt-3 text-5xl font-semibold">{summary.total}</p>
          <p className="mt-1 text-sm text-primary-foreground/70">{summary.invited} invitations sent</p> */}
        </div>
        <div className="rounded-xl border border-border bg-card p-5" data-testid="card-summary-attending">
          <Users size={18} className="text-primary" strokeWidth={1.6} />
          <p className="eyebrow mt-5 text-muted-foreground">Coming</p>
          {/* <p className="display-font mt-2 text-4xl font-semibold">{summary.attending}</p>
          <p className="mt-1 text-sm text-muted-foreground">{summary.guests} seats to save</p> */}
        </div>
        <div className="rounded-xl border border-border bg-card p-5" data-testid="card-summary-declined">
          <span className="text-xl text-primary">○</span>
          <p className="eyebrow mt-4 text-muted-foreground">From afar</p>
          {/* <p className="display-font mt-2 text-4xl font-semibold">{summary.declined}</p> */}
          <p className="mt-1 text-sm text-muted-foreground">kind regrets</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5" data-testid="card-summary-drinks">
          <Wine size={18} className="text-primary" strokeWidth={1.6} />
          <p className="eyebrow mt-5 text-muted-foreground">Most loved</p>
          {/* <p className="display-font mt-2 truncate text-3xl font-semibold">{Object.entries(summary.drinkCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ? drinkLabel(Object.entries(summary.drinkCounts).sort(([, a], [, b]) => b - a)[0][0]) : 'Not yet known'}</p> */}
          <p className="mt-1 text-sm text-muted-foreground">on the drinks list</p>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_19rem] lg:items-start">
        <div className="overflow-hidden rounded-xl border border-border bg-card" data-testid="panel-response-list">
          <div className="flex items-center justify-between border-b border-border px-5 py-5 sm:px-7">
            <div>
              <p className="eyebrow text-primary">The responses</p>
              <h2 className="display-font mt-2 text-3xl font-semibold">Fresh from the post</h2>
            </div>
            {/* <span className="hidden text-xs text-muted-foreground sm:block">{sortedRsvps.length} {sortedRsvps.length === 1 ? 'reply' : 'replies'}</span> */}
          </div>
          {/* {sortedRsvps.length === 0 ? (
            <div className="px-7 py-16 text-center" data-testid="status-responses-empty">
              <Ornament />
              <p className="display-font mt-6 text-3xl font-semibold">The guest book is waiting.</p>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-muted-foreground">Share the invitation with your people and the first note will appear here.</p>
            </div>
          ) : (
            <div>
              {sortedRsvps.map((rsvp) => (
                <button
                  type="button"
                  key={rsvp.id}
                  onClick={() => setSelectedId(rsvp.id)}
                  className="group flex w-full items-center gap-4 border-b border-border px-5 py-5 text-left transition-colors last:border-0 hover:bg-secondary/45 sm:px-7"
                  data-testid={`button-response-${rsvp.id}`}
                >
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold ${rsvp.attending ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'}`}>
                    {rsvp.guestName.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <span className="truncate text-sm font-bold">{rsvp.guestName}</span>
                      <span className={`text-[.65rem] font-bold uppercase tracking-[.12em] ${rsvp.attending ? 'text-primary' : 'text-muted-foreground'}`}>{rsvp.attending ? 'Coming' : 'From afar'}</span>
                    </span>
                    <span className="mt-1 block truncate text-xs text-muted-foreground">{rsvp.attending ? rsvp.drinks.map(drinkLabel).join(' · ') : rsvp.note || 'A kind regret'}</span>
                  </span>
                  <span className="hidden text-xs text-muted-foreground sm:block">{formatSubmitted(rsvp.createdAt)}</span>
                  <ChevronRight size={17} className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </button>
              ))}
            </div>
          )} */}
        </div>

        <aside className="rounded-xl border border-border bg-secondary/45 p-6">
          <p className="eyebrow text-primary">A little barometer</p>
          <h2 className="display-font mt-3 text-3xl font-semibold">Drinks, please.</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">The pours your people are hoping for.</p>
          <div className="mt-7 space-y-4">
            {/* {Object.entries(summary.drinkCounts).length === 0 ? (
              <p className="text-sm text-muted-foreground">Drink preferences will appear after the first yes.</p>
            ) : Object.entries(summary.drinkCounts).map(([drink, count]) => {
              const total = Math.max(summary.attending, 1);
              return (
                <div key={drink} data-testid={`row-drink-${drink}`}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">{drinkLabel(drink)}</span>
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background">
                    <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${Math.min((count / total) * 100, 100)}%` }} />
                  </div>
                </div>
              );
            })} */}
          </div>
        </aside>
      </section>

      {selectedId && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/20 p-3 backdrop-blur-[2px] sm:items-center" role="dialog" aria-modal="true" data-testid="dialog-response-detail">
          <div className="animate-rise-in w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-primary">A closer look</p>
                {/* <h2 className="display-font mt-2 text-4xl font-semibold">{selected?.guestName ?? 'Loading note'}</h2> */}
              </div>
              <button type="button" onClick={() => setSelectedId(null)} className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" aria-label="Close response detail" data-testid="button-close-response">
                <X size={17} />
              </button>
            </div>
            {/* {selectedQuery.isLoading && <div className="mt-8 h-28 animate-pulse rounded-lg bg-secondary" data-testid="status-response-detail-loading" />}
            {selectedQuery.isError && <p className="mt-8 text-sm text-destructive" data-testid="status-response-detail-error">This note could not be opened. Please close and try again.</p>}
            {selected && (
              <div className="mt-7 space-y-5">
                <div className="flex items-center gap-3 rounded-lg bg-secondary/65 p-4">
                  <span className={`grid h-9 w-9 place-items-center rounded-full ${selected.attending ? 'bg-accent' : 'bg-background'}`}><Users size={16} /></span>
                  <div><p className="text-sm font-bold">{selected.attending ? 'Coming to celebrate' : 'Celebrating from afar'}</p><p className="text-xs text-muted-foreground">{formatSubmitted(selected.createdAt)}</p></div>
                </div>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="inline-flex items-center gap-3"><Phone size={16} className="text-primary" /><span>{selected.phone}</span></span>
                  <a href={`https://wa.me/${phoneForWhatsApp(selected.phone)}?text=${encodeURIComponent(`Hola ${selected.guestName}, aquí está el enlace de nuestra invitación: ${window.location.origin}/rsvp?guestId=${selected.guestId}`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-foreground" data-testid="link-whatsapp">
                    <MessageCircle size={15} /> WhatsApp
                  </a>
                </div>
                {selected.attending && <div className="flex items-start gap-3 text-sm"><Wine size={16} className="mt-0.5 text-primary" /><span>{selected.drinks.map(drinkLabel).join(', ')}</span></div>}
                {selected.note && <blockquote className="border-l-2 border-accent pl-4 text-sm italic leading-7 text-muted-foreground">&ldquo;{selected.note}&rdquo;</blockquote>}
              </div>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
}
import { ArrowLeft, ArrowRight, Check, Wine } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'wouter';
// import {
//   getGetInviteQueryKey,
//   useGetInvite,
//   useGetWedding,
// } from '@workspace/api-client-react';
import { Ornament } from '@/components/ornament';
import { PendingMark, QueryError, WeddingLoading } from '@/components/data-states';
import { useSubmitRsvp } from '@/hooks/use-rsvp';

type FormValues = {
  attending: boolean;
  drinks: string[];
  note: string;
};

const initialValues: FormValues = {
  attending: true,
  drinks: [],
  note: '',
};

export default function RsvpPage() {
  // const weddingQuery = useGetWedding();
  const searchParams = new URLSearchParams(window.location.search);
  const guestId =
    searchParams.get('guestId') ?? searchParams.get('invite') ?? 'demo-invite';
  // const inviteQuery = useGetInvite(guestId, {
  //   query: { queryKey: getGetInviteQueryKey(guestId) },
  // });
  // const wedding = weddingQuery.data;
  // const invite = inviteQuery.data;
  const rsvp = useSubmitRsvp();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<{ drinks?: string; note?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  // useEffect(() => {
  //   if (invite?.selectedDrinks?.length && values.drinks.length === 0) {
  //     setValues((current) => ({
  //       ...current,
  //       attending: invite.status !== 'declined',
  //       drinks: invite.selectedDrinks,
  //     }));
  //   }
  // }, [invite, values.drinks.length]);

  // if (weddingQuery.isLoading || inviteQuery.isLoading) return <WeddingLoading />;
  // if (weddingQuery.isError || !wedding) {
  //   return <QueryError onRetry={() => void weddingQuery.refetch()} label="We could not load your RSVP." />;
  // }
  // if (inviteQuery.isError || !invite) {
  //   return <QueryError onRetry={() => void inviteQuery.refetch()} label="This invitation link is no longer available." />;
  // }

  const update = (field: keyof FormValues, value: string | boolean | string[]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const toggleDrink = (drinkId: string) => {
    const drinks = values.drinks.includes(drinkId)
      ? values.drinks.filter((selected) => selected !== drinkId)
      : [...values.drinks, drinkId];
    update('drinks', drinks);
  };

  const validate = () => {
    const nextErrors: { drinks?: string; note?: string } = {};
    if (values.attending && values.drinks.length === 0) {
      nextErrors.drinks = 'Please select at least one drink.';
    }
    if (values.note.length > 500) {
      nextErrors.note = 'Keep your note under 500 characters.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    rsvp.submit(
      {
        guestId,
        attending: values.attending,
        drinks: values.attending ? values.drinks : [],
        note: values.note.trim() || undefined,
      },
      () => setSubmitted(true),
    );
  };

  if (submitted) {
    return (
      <div className="mx-auto flex min-h-[calc(100dvh-9.5rem)] max-w-2xl items-center justify-center px-5 py-16 sm:px-8">
        <div className="animate-rise-in w-full rounded-[2rem] border border-primary/20 bg-card px-6 py-14 text-center shadow-[0_20px_60px_hsl(var(--foreground)/.07)] sm:px-16">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent text-accent-foreground">
            <Check size={28} strokeWidth={1.8} />
          </span>
          <p className="eyebrow mt-8 text-primary">Your reply has landed</p>
          <h1 className="display-font mt-4 text-5xl font-semibold leading-[.95] sm:text-6xl">
            {values.attending ? 'We’ll save you a seat.' : 'Thank you for letting us know.'}
          </h1>
          {/* <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-muted-foreground">
            {values.attending
              ? `Thank you, ${invite.guestName}. We are looking forward to celebrating with you.`
              : `We’ll miss you dearly, ${invite.guestName}, and will raise a glass in your direction.`}
          </p> */}
          <Ornament className="mt-8" />
          <Link href="/" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-primary underline decoration-accent underline-offset-8 hover:text-foreground" data-testid="link-success-home">
            <ArrowLeft size={15} /> Back to the invitation
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
        <div className="lg:sticky lg:top-12 lg:self-start">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary" data-testid="link-rsvp-back">
            <ArrowLeft size={14} /> Invitation
          </Link>
          <p className="eyebrow mt-14 text-primary">A little reply</p>
          <h1 className="display-font mt-5 text-6xl font-semibold leading-[.88] tracking-[-.04em] sm:text-7xl">
            Will you<br /><span className="italic text-primary">join us?</span>
          </h1>
          <div className="section-rule mt-8" />
          <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
            Just confirm your plans and tell us which drinks you&apos;d like waiting for you.
          </p>
          <div className="mt-10 rounded-xl bg-secondary/55 p-5">
            <p className="eyebrow text-muted-foreground">Reply for</p>
            {/* <p className="display-font mt-2 text-2xl font-semibold">{invite.guestName}</p>
            <p className="mt-1 text-sm text-muted-foreground">{wedding.venue}</p> */}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[1.5rem] border border-border bg-card p-5 shadow-[0_18px_54px_hsl(var(--foreground)/.055)] sm:p-9" noValidate>
          <div className="flex items-center justify-between border-b border-border pb-6">
            <div>
              <p className="eyebrow text-primary">01 — Your reply</p>
              <p className="mt-2 text-sm text-muted-foreground">This invitation is just for you.</p>
            </div>
            <span className="hidden text-xs text-muted-foreground sm:block">Takes about 30 seconds</span>
          </div>

          <div className="border-b border-border py-8">
            <p className="eyebrow text-primary">Will we see you there?</p>
            <p className="mt-2 text-sm text-muted-foreground">Choose the answer that feels right.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={() => update('attending', true)} className={`rounded-lg border px-4 py-4 text-left transition-all ${values.attending ? 'border-primary bg-primary text-primary-foreground shadow-sm' : 'border-border bg-background hover:border-primary/50'}`} data-testid="button-attending-yes">
                <span className="block text-sm font-bold">Joyfully, yes</span>
                <span className={`mt-1 block text-xs ${values.attending ? 'text-primary-foreground/75' : 'text-muted-foreground'}`}>I&apos;ll be there to celebrate</span>
              </button>
              <button type="button" onClick={() => update('attending', false)} className={`rounded-lg border px-4 py-4 text-left transition-all ${!values.attending ? 'border-primary bg-primary text-primary-foreground shadow-sm' : 'border-border bg-background hover:border-primary/50'}`} data-testid="button-attending-no">
                <span className="block text-sm font-bold">With love, no</span>
                <span className={`mt-1 block text-xs ${!values.attending ? 'text-primary-foreground/75' : 'text-muted-foreground'}`}>I&apos;ll be celebrating from afar</span>
              </button>
            </div>
          </div>

          {values.attending && (
            <div className="border-b border-border py-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-primary">02 — Your drinks</p>
                  <p className="mt-2 text-sm text-muted-foreground">Select everything you&apos;d enjoy.</p>
                </div>
                <Wine size={19} className="text-primary" strokeWidth={1.6} />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {/* {wedding.drinks.map((drink) => {
                  const selected = values.drinks.includes(drink.id);
                  return (
                    <label key={drink.id} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-all ${selected ? 'border-primary bg-secondary/70' : 'border-border bg-background hover:border-primary/50'}`}>
                      <input type="checkbox" checked={selected} onChange={() => toggleDrink(drink.id)} className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]" data-testid={`checkbox-drink-${drink.id}`} />
                      <span>
                        <span className="block text-sm font-bold">{drink.name}</span>
                        <span className="mt-1 block text-xs leading-5 text-muted-foreground">{drink.description}</span>
                      </span>
                    </label>
                  );
                })} */}
              </div>
              {errors.drinks && <span className="mt-3 block text-xs text-destructive" data-testid="error-drinks">{errors.drinks}</span>}
            </div>
          )}

          <div className="py-8">
            <label className="block">
              <span className="mb-2 flex items-baseline justify-between text-sm font-semibold">
                A note for us <span className="text-xs font-normal text-muted-foreground">{values.note.length}/500</span>
              </span>
              <textarea value={values.note} onChange={(event) => update('note', event.target.value)} rows={4} placeholder="A little message, a dietary note, or a song request..." className={`w-full resize-none rounded-md border bg-background px-3 py-3 text-sm leading-6 outline-none placeholder:text-muted-foreground/70 focus:border-primary ${errors.note ? 'border-destructive' : 'border-input'}`} data-testid="textarea-note" />
              {errors.note && <span className="mt-2 block text-xs text-destructive" data-testid="error-note">{errors.note}</span>}
            </label>
          </div>

          {rsvp.isError && <p className="mb-5 rounded-md border border-destructive/25 bg-destructive/5 px-4 py-3 text-sm text-destructive" data-testid="status-rsvp-error">Your RSVP could not be sent just yet. Please try again.</p>}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-muted-foreground">Your reply is linked to this personal invitation.</p>
            <button type="submit" disabled={rsvp.isPending} className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-65" data-testid="button-submit-rsvp">
              {rsvp.isPending ? <><PendingMark /> Sending your reply</> : <>Send RSVP <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
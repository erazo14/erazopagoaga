import {zodResolver} from '@hookform/resolvers/zod';
import {ArrowLeft, ArrowRight, Check} from 'lucide-react';
import {useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link} from 'wouter';
import {z} from 'zod';
import {Ornament} from '@/components/ornament';
import {RsvpEventDetails} from '@/components/rsvp-event-details';
import {PendingMark, WeddingLoading} from '@/components/data-states';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Textarea} from '@/components/ui/textarea';
import {useSubmitRsvp, useInvitation} from '@/hooks/use-rsvp';
import {useI18n} from '@/lib/i18n';
import {ApiRequestError, type Invitation} from '@/lib/rsvp-api';

type FormValues = {
  decision: 'attending' | 'declined';
  guestCount: number;
  note: string;
};

export default function RsvpPage() {
  const {t} = useI18n();
  const searchParams = new URLSearchParams(window.location.search);
  const guestId =
    searchParams.get('guestId') ??
    searchParams.get('invite') ??
    searchParams.get('Uid') ??
    '';
  const invitationQuery = useInvitation(guestId || undefined);

  if (invitationQuery.isLoading) {
    return <WeddingLoading />;
  }

  if (!guestId) {
    return <InvitationError message={t('rsvp.errorInvite')} />;
  }

  if (invitationQuery.isError || !invitationQuery.data) {
    const message =
      invitationQuery.error instanceof ApiRequestError &&
      invitationQuery.error.status === 404
        ? t('rsvp.errorInvite')
        : t('rsvp.errorLoad');

    return (
      <InvitationError
        message={message}
        onRetry={() => void invitationQuery.refetch()}
      />
    );
  }

  return (
    <RsvpForm
      key={guestId}
      guestId={guestId}
      invitation={invitationQuery.data}
    />
  );
}

function InvitationError({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  const {t} = useI18n();

  return (
    <div className="mx-auto flex min-h-[62vh] max-w-xl flex-col items-center justify-center px-5 py-16 text-center" data-testid="status-rsvp-invitation-error">
      <p className="eyebrow text-primary">{t('errors.hiccup')}</p>
      <h1 className="display-font mt-4 text-4xl font-semibold">{message}</h1>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            data-testid="button-rsvp-retry"
          >
            {t('errors.tryAgain')}
          </button>
        )}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          data-testid="link-rsvp-error-home"
        >
          <ArrowLeft size={15} /> {t('rsvp.back')}
        </Link>
      </div>
    </div>
  );
}

function RsvpForm({
  guestId,
  invitation,
}: {
  guestId: string;
  invitation: Invitation;
}) {
  const {t, guestLabel} = useI18n();
  const mutation = useSubmitRsvp(guestId);
  const [submitted, setSubmitted] = useState(false);
  const formSchema = useMemo(
    () =>
      z.object({
        decision: z.enum(['attending', 'declined']),
        guestCount: z
          .number()
          .int()
          .min(1)
          .max(Math.max(invitation.maxGuests, 1)),
        note: z.string().max(500),
      }),
    [invitation.maxGuests],
  );
  const previousCount = invitation.rsvp.guestCount || 1;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      decision:
        invitation.rsvp.status === 'declined' ? 'declined' : 'attending',
      guestCount: Math.min(
        Math.max(previousCount, 1),
        Math.max(invitation.maxGuests, 1),
      ),
      note: invitation.rsvp.note ?? '',
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    mutation.mutate(
      {
        status: values.decision,
        guestCount: values.decision === 'attending' ? values.guestCount : 0,
        note: values.note.trim() || undefined,
      },
      {onSuccess: () => setSubmitted(true)},
    );
  });

  if (submitted) {
    return (
      <div
        id="confirmation"
        className="mx-auto flex min-h-[calc(100dvh-9.5rem)] max-w-2xl scroll-mt-24 items-center justify-center px-5 py-16 sm:px-8"
      >
        <div className="animate-rise-in w-full rounded-[2rem] border border-primary/20 bg-card px-6 py-14 text-center shadow-[0_20px_60px_hsl(var(--foreground)/.07)] sm:px-16">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent text-accent-foreground">
            <Check size={28} strokeWidth={1.8} />
          </span>
          <p className="eyebrow mt-8 text-primary">{t('rsvp.successEyebrow')}</p>
          <h1 className="display-font mt-4 text-5xl font-semibold leading-[.95] sm:text-6xl">
            {form.getValues('decision') === 'attending'
              ? t('rsvp.successYes')
              : t('rsvp.successNo')}
          </h1>
          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-muted-foreground">
            {form.getValues('decision') === 'attending'
              ? t('rsvp.successYesCopy', {name: invitation.principal.name})
              : t('rsvp.successNoCopy', {name: invitation.principal.name})}
          </p>
          <Ornament className="mt-8" />
          <Link
            href={`/?guestId=${encodeURIComponent(guestId)}`}
            className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-primary underline decoration-accent underline-offset-8 hover:text-foreground"
            data-testid="link-success-home"
          >
            <ArrowLeft size={15} /> {t('rsvp.back')}
          </Link>
        </div>
      </div>
    );
  }

  const noteLength = form.watch('note').length;

  return (
    <div className="px-5 py-12 sm:px-8 sm:py-20">
      <RsvpEventDetails guestName={invitation.principal.name} />
      <section
        id="confirmation"
        className="mx-auto mt-8 max-w-6xl scroll-mt-24 py-12 sm:py-16"
        data-reveal
      >
        <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
        <div className="lg:sticky lg:top-12 lg:self-start">
          <Link
            href={`/?guestId=${encodeURIComponent(guestId)}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
            data-testid="link-rsvp-back"
          >
            <ArrowLeft size={14} /> {t('rsvp.back')}
          </Link>
          <p className="eyebrow mt-14 text-primary">{t('rsvp.eyebrow')}</p>
          <h1 className="display-font mt-5 text-6xl font-semibold leading-[.88] tracking-[-.04em] sm:text-7xl">
            {t('rsvp.title')}
            <br />
            <span className="italic text-primary">{t('rsvp.titleAccent')}</span>
          </h1>
          <div className="section-rule mt-8" />
          <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
            {t('rsvp.description')}
          </p>
          <div className="mt-10 rounded-xl bg-secondary/55 p-5">
            <p className="eyebrow text-muted-foreground">{t('rsvp.replyFor')}</p>
            <p className="display-font mt-2 text-2xl font-semibold" data-testid="text-rsvp-principal">
              {invitation.principal.salutation
                ? `${invitation.principal.salutation} `
                : ''}
              {invitation.principal.name}
            </p>
            <p className="mt-2 text-xs text-muted-foreground" data-testid="text-rsvp-capacity">
              {t('rsvp.partyCopy')} · {invitation.maxGuests} {guestLabel(invitation.maxGuests)}
            </p>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="rounded-[1.5rem] border border-border bg-card p-5 shadow-[0_18px_54px_hsl(var(--foreground)/.055)] sm:p-9"
            noValidate
          >
            <div className="flex items-center justify-between border-b border-border pb-6">
              <div>
                <p className="eyebrow text-primary">{t('rsvp.stepReply')}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t('rsvp.invitationJustForYou')}
                </p>
              </div>
              <span className="hidden text-xs text-muted-foreground sm:block">
                {t('rsvp.takesSeconds')}
              </span>
            </div>

            <FormField
              control={form.control}
              name="decision"
              render={({field}) => (
                <FormItem className="border-b border-border py-8">
                  <FormLabel className="eyebrow text-primary">
                    {t('rsvp.seeThere')}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="mt-5 grid gap-3 sm:grid-cols-2"
                    >
                      <label
                        htmlFor="decision-attending"
                        className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-4 transition-all ${
                          field.value === 'attending'
                            ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                            : 'border-border bg-background hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem
                          value="attending"
                          id="decision-attending"
                          data-testid="radio-attending-yes"
                        />
                        <span>
                          <span className="block text-sm font-bold">{t('rsvp.yes')}</span>
                          <span className="mt-1 block text-xs opacity-75">
                            {t('rsvp.yesCopy')}
                          </span>
                        </span>
                      </label>
                      <label
                        htmlFor="decision-declined"
                        className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-4 transition-all ${
                          field.value === 'declined'
                            ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                            : 'border-border bg-background hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem
                          value="declined"
                          id="decision-declined"
                          data-testid="radio-attending-no"
                        />
                        <span>
                          <span className="block text-sm font-bold">{t('rsvp.no')}</span>
                          <span className="mt-1 block text-xs opacity-75">
                            {t('rsvp.noCopy')}
                          </span>
                        </span>
                      </label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('decision') === 'attending' && (
              <FormField
                control={form.control}
                name="guestCount"
                render={({field}) => (
                  <FormItem className="border-b border-border py-8">
                    <FormLabel className="eyebrow text-primary">
                      {t('rsvp.stepParty')}
                    </FormLabel>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t('rsvp.partyCopy')}
                    </p>
                    <FormControl>
                      <select
                        value={field.value}
                        onChange={(event) => field.onChange(Number(event.target.value))}
                        className="mt-5 w-full rounded-md border border-input bg-background px-3 py-3 text-sm outline-none focus:border-primary"
                        data-testid="select-rsvp-guest-count"
                      >
                        {Array.from(
                          {length: invitation.maxGuests},
                          (_, index) => index + 1,
                        ).map((count) => (
                          <option key={count} value={count}>
                            {count} {guestLabel(count)}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="note"
              render={({field}) => (
                <FormItem className="py-8">
                  <FormLabel className="flex items-baseline justify-between text-sm font-semibold">
                    {t('rsvp.noteLabel')}
                    <span className="text-xs font-normal text-muted-foreground">
                      {noteLength}/500
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      maxLength={500}
                      placeholder={t('rsvp.notePlaceholder')}
                      className="w-full resize-none leading-6"
                      data-testid="textarea-rsvp-note"
                    />
                  </FormControl>
                  <FormMessage>{t('rsvp.noteLimit')}</FormMessage>
                </FormItem>
              )}
            />

            {mutation.isError && (
              <p
                className="mb-5 rounded-md border border-destructive/25 bg-destructive/5 px-4 py-3 text-sm text-destructive"
                data-testid="status-rsvp-error"
              >
                {t('rsvp.sendError')}
              </p>
            )}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-muted-foreground">
                {t('rsvp.linked')}
              </p>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-65"
                data-testid="button-submit-rsvp"
              >
                {mutation.isPending ? (
                  <>
                    <PendingMark /> {t('rsvp.sending')}
                  </>
                ) : (
                  <>
                    {t('rsvp.send')}
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </div>
          </form>
        </Form>
        </div>
      </section>
    </div>
  );
}

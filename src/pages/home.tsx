import { ArrowRight, CalendarDays, Images, Clock3, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
// import { useGetWedding } from '@workspace/api-client-react';
import { Ornament } from '@/components/ornament';
// import { QueryError, WeddingLoading } from '@/components/data-states';
import { GalleryCarousel } from '@/components/gallery-carousel';

function formatDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(parsed);
}

export default function Home() {
  // const weddingQuery = useGetWedding();
  // const wedding = weddingQuery.data;

  // if (weddingQuery.isLoading) return <WeddingLoading />;
  // if (weddingQuery.isError || !wedding) return <QueryError onRetry={() => void weddingQuery.refetch()} label="We could not open the invitation." />;

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full border border-accent/25 sm:h-96 sm:w-96" />
        <div className="absolute -right-10 top-24 h-48 w-48 rounded-full border border-accent/20 sm:h-64 sm:w-64" />
        <div className="absolute left-[-5rem] top-16 h-48 w-48 rounded-full bg-secondary/65 blur-3xl sm:h-72 sm:w-72" />
        <div className="relative mx-auto grid max-w-6xl gap-16 px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-10">
          <div className="animate-rise-in">
            <p className="eyebrow text-primary">A little note from us</p>
            <h1 className="display-font mt-6 max-w-3xl text-[4.3rem] font-medium leading-[.84] tracking-[-.05em] text-foreground sm:text-[6.8rem]">
              We&apos;re <span className="italic text-primary">getting</span><br />
              married.
            </h1>
            {/* <p className="mt-8 max-w-md text-[1.05rem] leading-8 text-muted-foreground" data-testid="text-wedding-message">
              {wedding.message}
            </p> */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {/* <Link
                href="/rsvp?guestId=demo-invite"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_8px_22px_hsl(var(--primary)/.18)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_hsl(var(--primary)/.25)]"
                data-testid="link-home-rsvp"
              >
                Tell us you&apos;re coming <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link> */}
              {/* <a href="#details" className="text-sm font-semibold text-foreground underline decoration-accent underline-offset-8 transition-colors hover:text-primary" data-testid="link-home-details">
                See the details
              </a> */}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[28rem] animate-rise-in [animation-delay:150ms]">
            <div className="relative aspect-[.86] overflow-hidden rounded-t-[10rem] rounded-b-[1rem] border border-primary/20 bg-secondary/60 p-3 shadow-[0_24px_70px_hsl(var(--foreground)/.09)]">
              <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-t-[9.25rem] rounded-b-[.55rem] border border-primary/15 bg-[radial-gradient(circle_at_50%_15%,hsl(var(--accent)/.25),transparent_40%),hsl(var(--secondary))] px-8 text-center">
                <div className="absolute left-4 top-12 h-28 w-16 rounded-full border border-primary/20 opacity-70" />
                <div className="absolute right-3 bottom-16 h-40 w-24 rounded-full border border-primary/20 opacity-70" />
                <span className="eyebrow text-primary">Save the date</span>
                <span className="script-font mt-6 text-3xl text-primary/80">for a day full of</span>
                <span className="display-font mt-1 text-6xl font-semibold leading-none sm:text-7xl">good<br />people</span>
                <Ornament className="my-7" />
                <p className="display-font text-2xl italic" data-testid="text-save-date">{formatDate("2027-02-28")}</p>
                {/* <p className="mt-3 text-xs uppercase tracking-[.18em] text-muted-foreground" data-testid="text-save-date-venue">{wedding.venue}</p> */}
                <div className="absolute bottom-5 left-0 right-0 text-[.62rem] uppercase tracking-[.2em] text-muted-foreground">G + F · together with their families</div>
              </div>
            </div>
            <div className="animate-drift absolute -bottom-6 -left-3 grid h-16 w-16 place-items-center rounded-full bg-accent text-center text-[.65rem] font-bold uppercase leading-tight tracking-[.12em] text-accent-foreground shadow-lg sm:-left-7">
              Be<br />there
            </div>
          </div>
        </div>
      </section>

      {/* when activate bottom section add this styles mx-auto max-w-6xl and remove bg-primary text-primary-foreground */}
      <section id="details" className="bg-primary text-primary-foreground scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <div>
            {/* <p className="eyebrow text-primary">The where &amp; when</p> */}
            <h2 className="display-font mt-5 text-5xl font-semibold leading-[.92] tracking-[-.035em] sm:text-6xl">
              {/* to the span add style text-primary when down section active */}
              Keep the<br /><span className="italic">day free.</span>
            </h2>
            <div className="section-rule mt-8" />
            <p className="mt-6 max-w-xs text-sm leading-7 text-muted-foreground">We&apos;re making a whole day of it. Come for the vows, stay for the dancing, and bring the people you love.</p>
          </div>
          <div className="grid gap-0 sm:grid-cols-2">
            <div className="border-t border-border py-7 sm:pr-10">
              <CalendarDays size={20} strokeWidth={1.5} className="text-primary" />
              <p className="eyebrow mt-5 text-muted-foreground">The date</p>
              <p className="display-font mt-2 text-3xl font-semibold" data-testid="text-event-date">{formatDate("2027-02-28")}</p>
            </div>
            {/* <div className="border-t border-border py-7 sm:pl-10 sm:border-l">
              <Clock3 size={20} strokeWidth={1.5} className="text-primary" />
              <p className="eyebrow mt-5 text-muted-foreground">The time</p>
              <p className="display-font mt-2 text-3xl font-semibold" data-testid="text-event-time">{wedding.time}</p>
            </div> */}
            {/* <div className="border-t border-border py-7 sm:pr-10">
              <MapPin size={20} strokeWidth={1.5} className="text-primary" />
              <p className="eyebrow mt-5 text-muted-foreground">The place</p>
              <p className="display-font mt-2 text-3xl font-semibold" data-testid="text-event-venue">{wedding.venue}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground" data-testid="text-event-address">{wedding.address}</p>
            </div> */}
            {/* <div className="border-t border-border py-7 sm:pl-10 sm:border-l">
              <Sparkles size={20} strokeWidth={1.5} className="text-primary" />
              <p className="eyebrow mt-5 text-muted-foreground">The feeling</p>
              <p className="display-font mt-2 text-3xl font-semibold">Easy, warm, ours.</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Dress for a summer evening and bring your best stories.</p>
            </div> */}
          </div>
        </div>
      </section>

      {/* <section className="bg-primary px-5 py-20 text-primary-foreground sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow text-accent">One more thing</p>
            <h2 className="display-font mt-5 max-w-2xl text-5xl font-semibold leading-[.9] tracking-[-.04em] sm:text-7xl">
              Your company is the <span className="italic text-accent">best gift.</span>
            </h2>
            <p className="mt-7 max-w-lg text-sm leading-7 text-primary-foreground/75">Let us know if you can make it so we can save you a seat, a drink, and a very enthusiastic hug.</p>
          </div>
          <Link href="/rsvp?guestId=demo-invite" className="group inline-flex w-fit items-center gap-3 rounded-full border border-primary-foreground/35 px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-primary-foreground hover:text-primary" data-testid="link-invitation-rsvp">
            RSVP by note <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section> */}

      <section id="gallery" className="border-t border-border/60 bg-secondary/25 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-center lg:gap-24">
          <div>
            <p className="eyebrow text-primary">A few memories</p>
            <h2 className="display-font mt-5 text-5xl font-semibold leading-[.92] tracking-[-.035em] sm:text-6xl">
              Little moments,<br /><span className="italic text-primary">kept close.</span>
            </h2>
            <div className="section-rule mt-8" />
            <p className="mt-6 max-w-xs text-sm leading-7 text-muted-foreground">Five favorite frames on repeat, with a few more waiting in the full gallery.</p>
            <Link href="/gallery" className="group mt-8 inline-flex items-center gap-3 rounded-full border border-primary/35 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground" data-testid="link-view-gallery">
              <Images size={16} /> View gallery <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <GalleryCarousel />
        </div>
      </section>
    </div>
  );
}
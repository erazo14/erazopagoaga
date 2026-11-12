import {
  ArrowRight,
  CalendarDays,
  Download,
  Heart,
  Hotel,
  MapPin,
  Music2,
  Sparkles,
  Utensils,
} from 'lucide-react';
import { useEffect } from 'react';
import Countdown from '@/components/ui/count-down';
import { useI18n } from '@/lib/i18n';
import { weddingDetails } from '@/lib/wedding-details';
import { Ornament } from './ornament';

function datePartsInWeddingTimeZone(date: Date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: weddingDetails.timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return {
    year: values.year ?? '',
    month: values.month ?? '',
    day: values.day ?? '',
  };
}

function formatDate(date: Date, language: 'en' | 'es') {
  return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'es-HN', {
    timeZone: weddingDetails.timeZone,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function formatDateParts(date: Date, language: 'en' | 'es') {
  const locale = language === 'en' ? 'en-US' : 'es-HN';
  return {
    day: new Intl.DateTimeFormat(locale, {
      timeZone: weddingDetails.timeZone,
      day: 'numeric',
    }).format(date),
    month: new Intl.DateTimeFormat(locale, {
      timeZone: weddingDetails.timeZone,
      month: 'long',
    }).format(date),
    year: new Intl.DateTimeFormat(locale, {
      timeZone: weddingDetails.timeZone,
      year: 'numeric',
    }).format(date),
  };
}

function formatTime(date: Date, language: 'en' | 'es') {
  return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'es-HN', {
    timeZone: weddingDetails.timeZone,
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

function escapeCalendarText(value: string) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

export function RsvpEventDetails({ guestName }: { guestName: string }) {
  const { t, language } = useI18n();
  const start = new Date(weddingDetails.startsAt);
  const { year, month, day } = datePartsInWeddingTimeZone(start);
  const startDay = `${year}${month}${day}`;
  const nextDay = new Date(`${year}-${month}-${day}T00:00:00Z`);
  nextDay.setUTCDate(nextDay.getUTCDate() + 1);
  const { year: endYear, month: endMonth, day: endDate } =
    datePartsInWeddingTimeZone(nextDay);
  const endDay = `${endYear}${endMonth}${endDate}`;
  const time = formatTime(start, language);
  const dateLabel = formatDate(start, language);
  const displayDate = formatDateParts(start, language);
  const location = `${weddingDetails.venue}, ${weddingDetails.address}, ${weddingDetails.country}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(location)}&navigate=yes`;
  const hotelUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`hotels near ${location}`)}`;
  const calendarDescription = t('event.calendarDescription', { time });
  const calendarUrl = new URL('https://calendar.google.com/calendar/render');
  calendarUrl.searchParams.set('action', 'TEMPLATE');
  calendarUrl.searchParams.set('text', t('event.title'));
  calendarUrl.searchParams.set('dates', `${startDay}/${endDay}`);
  calendarUrl.searchParams.set('details', calendarDescription);
  calendarUrl.searchParams.set('location', location);
  calendarUrl.searchParams.set('ctz', weddingDetails.timeZone);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.hasAttribute('data-reveal-repeat')) {
            entry.target.classList.toggle('is-visible', entry.isIntersecting);
          } else if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const downloadCalendar = () => {
    const calendarText = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Grecia & Fernando//Wedding Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:grecia-fernando-${startDay}@wedding`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
      `DTSTART;VALUE=DATE:${startDay}`,
      `DTEND;VALUE=DATE:${endDay}`,
      `SUMMARY:${escapeCalendarText(t('event.title'))}`,
      `DESCRIPTION:${escapeCalendarText(calendarDescription)}`,
      `LOCATION:${escapeCalendarText(location)}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    const file = new Blob([calendarText], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'grecia-fernando-wedding.ics';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const agenda = [
    { icon: Sparkles, label: t('event.ceremony') },
    { icon: Heart, label: t('event.reception') },
    { icon: Utensils, label: t('event.dinner') },
    { icon: Music2, label: t('event.party') },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <section
        className="border-b border-border/60 py-10 text-center sm:py-16"
        data-reveal
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="display-font mt-5 text-3xl font-medium text-primary sm:text-3xl">
            {t('event.invitationTitle')}
          </h2>
          <h1 className="display-font mt-5 text-5xl font-semibold leading-[.92] tracking-[-.04em] sm:text-7xl">
            {t('event.title')}
          </h1>
          <Ornament className="mx-auto my-7" />
          <div
            className="display-font mx-auto mt-2 flex w-fit items-center justify-center gap-2 text-xl font-medium capitalize sm:gap-3 sm:text-2xl"
            aria-label={dateLabel}
            data-testid="text-invitation-date"
          >
            <span>{displayDate.day}</span>
            <span className="text-primary/55" aria-hidden="true">|</span>
            <span>{displayDate.month}</span>
            <span className="text-primary/55" aria-hidden="true">|</span>
            <span>{displayDate.year}</span>
          </div>
          <div
            className="rsvp-fade mx-auto mt-8 max-w-2xl overflow-hidden rounded-3xl shadow-[0_18px_48px_hsl(var(--foreground)/.12)]"
            data-reveal
            data-reveal-repeat
          >
            <img
              src={`${import.meta.env.BASE_URL}1.jpeg`}
              alt={t('event.couplePhotoAlt')}
              className="rsvp-photo-pulse aspect-[4/3] w-full object-cover object-center"
              loading="lazy"
              data-testid="image-invitation-couple"
            />
          </div>
        </div>
      </section>

      <Countdown targetDate={weddingDetails.startsAt} compact />

      <section className="border-b border-border/60 py-16 sm:py-20">
        <div
          className="rsvp-fade mx-auto grid max-w-6xl gap-12 rounded-[2rem] border border-primary/15 bg-card/70 p-6 shadow-[0_20px_60px_hsl(var(--foreground)/.07)] sm:p-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-24 lg:p-12"
          data-reveal
        >
        <div>
          <p className="eyebrow text-primary">{t('event.detailsEyebrow')}</p>
          <h2 className="display-font mt-5 text-4xl font-semibold leading-[.94] sm:text-5xl">
            {t('event.detailsTitle')}
          </h2>
          <div className="section-rule mt-7" />
          <p className="mt-6 text-sm leading-7 text-muted-foreground">
            {t('event.calendarNote', { time })}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={calendarUrl.toString()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5"
              data-testid="link-add-google-calendar"
            >
              <CalendarDays size={16} />
              {t('event.addCalendar')}
            </a>
            <button
              type="button"
              onClick={downloadCalendar}
              className="inline-flex items-center gap-2 rounded-full border border-primary/25 px-5 py-3 text-sm font-semibold text-primary transition hover:bg-secondary"
              data-testid="button-download-calendar"
            >
              <Download size={16} />
              {t('event.downloadCalendar')}
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2">
          <div className="border-t border-border py-6 sm:pr-8">
            <p className="eyebrow text-muted-foreground">{t('event.dateLabel')}</p>
            <p className="display-font mt-2 text-2xl font-semibold capitalize">
              {dateLabel}
            </p>
          </div>
          <div className="border-t border-border py-6 sm:border-l sm:pl-8">
            <p className="eyebrow text-muted-foreground">{t('event.timeLabel')}</p>
            <p className="display-font mt-2 text-2xl font-semibold">{time}</p>
          </div>
          <div className="border-t border-border py-6 sm:col-span-2">
            <MapPin className="text-primary" size={19} />
            <p className="eyebrow mt-4 text-muted-foreground">{t('event.venueLabel')}</p>
            <p className="display-font mt-2 text-3xl font-semibold">
              {weddingDetails.venue}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {weddingDetails.address}, {weddingDetails.country}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/25 px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary"
                data-testid="link-venue-google-maps"
              >
                <MapPin size={15} />
                {t('event.googleMaps')}
                <ArrowRight size={14} />
              </a>
              <a
                href={wazeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/25 px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary"
                data-testid="link-venue-waze"
              >
                <MapPin size={15} />
                {t('event.waze')}
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section
        className="grid gap-8 border-b border-border/60 py-14 sm:py-16 lg:grid-cols-[auto_1fr_auto] lg:items-center"
        data-reveal
      >
        <span className="grid h-14 w-14 place-items-center rounded-full border border-primary/20 text-primary">
          <Hotel size={22} />
        </span>
        <div>
          <p className="eyebrow text-primary">{t('event.travelEyebrow')}</p>
          <h2 className="display-font mt-2 text-3xl font-semibold sm:text-4xl">
            {t('event.lodgingTitle')}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            {t('event.lodgingCopy')}
          </p>
        </div>
        <a
          href={hotelUrl}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5"
          data-testid="link-nearby-lodging"
        >
          {t('event.findHotels')}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </a>
      </section>

      <section className="py-16 sm:py-20" data-reveal>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-primary">{t('event.agendaEyebrow')}</p>
          <h2 className="display-font mt-4 text-4xl font-semibold sm:text-5xl">
            {t('event.agendaTitle')}
          </h2>
          <div className="section-rule mx-auto mt-6" />
          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            {t('event.agendaCopy')}
          </p>
        </div>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {agenda.map(({ icon: Icon, label }, index) => (
            <li
              key={label}
              className="rounded-2xl border border-border bg-card/60 px-5 py-7 text-center shadow-sm"
              data-testid={`agenda-step-${index + 1}`}
            >
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-primary/20 text-primary">
                <Icon size={22} strokeWidth={1.6} />
              </span>
              <p className="eyebrow mt-5 text-muted-foreground">
                {String(index + 1).padStart(2, '0')}
              </p>
              <p className="display-font mt-2 text-2xl font-medium">{label}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

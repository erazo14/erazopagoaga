import { useEffect, useState } from 'react';
import { Ornament } from '../ornament';
import { useI18n } from '@/lib/i18n';

interface CountdownProps {
  targetDate: string;
  compact?: boolean;
}

const Countdown = ({ targetDate, compact = false }: CountdownProps) => {
  const {t} = useI18n();
  const getTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - Date.now();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    {
      value: timeLeft.days,
      label: 'Days',
    },
    {
      value: timeLeft.hours,
      label: 'Hours',
    },
    {
      value: timeLeft.minutes,
      label: 'Minutes',
    },
    {
      value: timeLeft.seconds,
      label: 'Seconds',
    },
  ] as const;;

  return (
    compact ? (
      <section className="border-b border-border/60 px-5 py-10 sm:px-8 sm:py-12" data-reveal>
        <div className="mx-auto max-w-4xl text-center">
          <p className="display-font text-3xl font-medium sm:text-4xl">
            {t('event.countdownPrefix')}
          </p>
          <Ornament
            className="my-5"
            label={t('event.countdownDivider')}
          />
          <div className="mx-auto grid max-w-2xl grid-cols-4 gap-2 sm:gap-4">
            {units.map((unit) => (
              <div key={unit.label} className="px-1 py-2 text-center">
                <div className="display-font text-3xl font-semibold leading-none tracking-[-.04em] text-primary sm:text-5xl">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div className="eyebrow-coudnt-down mt-2 text-muted-foreground">
                  {t(unit.label)}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {t('event.countdownSuffix')}
          </p>
        </div>
      </section>
    ) : (
    <section className="relative overflow-hidden border-b border-border/60 bg-secondary/25 px-5 py-7 sm:px-8 sm:py-5">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full border border-accent/25 sm:h-96 sm:w-96" />
      <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full border border-primary/15" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-primary">
            {t('home.countingDown')}
          </p>

          <h2 className="display-font mt-5 text-5xl font-semibold leading-[.92] tracking-[-.035em] sm:text-6xl">
            {t('home.untilThe')} <span className="italic text-primary">{t('home.bigDay')}</span>
          </h2>

          <div className="section-rule mx-auto mt-8" />

          <p className="mt-6 text-sm italic leading-7 text-muted-foreground">
            {t('home.countDownDescription')}
          </p>
        </div>
        <Ornament className="my-7" />
        <div className="mx-auto grid max-w-2xl grid-cols-4 gap-3 sm:grid-cols-4">
          {units.map((unit) => (
            <div
              key={unit.label}
              className="relative overflow-hidden rounded-[1.25rem] px-2 py-4 text-center shadow-[0_12px_40px_hsl(var(--foreground)/.06)]"
            >
              <div className="absolute -right-8 -top-8 h-20 w-6 rounded-full border border-primary/10" />

              <div className="display-font text-4xl font-semibold leading-none tracking-[-.04em] text-primary sm:text-5xl">
                {String(unit.value).padStart(2, '0')}
              </div>

              <div className="eyebrow-coudnt-down mt-3 text-muted-foreground">
                {t(unit.label)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    )
  );
};

export default Countdown;

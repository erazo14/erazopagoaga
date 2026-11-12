import { ArrowUp, Pause, Play, TicketCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { weddingDetails } from '@/lib/wedding-details';

export function FloatingInvitationControls() {
  const { t } = useI18n();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const player: HTMLAudioElement = audio;

    player.volume = 0.35;
    function removeGestureFallback() {
      document.removeEventListener('pointerdown', playAfterGesture);
      document.removeEventListener('keydown', playAfterGesture);
      player.removeEventListener('play', removeGestureFallback);
    }

    function playAfterGesture(event: Event) {
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest('[data-testid="button-toggle-wedding-music"]')
      ) {
        return;
      }

      void player.play().catch(() => {
        if (player.paused) setIsPlaying(false);
      });
    }

    document.addEventListener('pointerdown', playAfterGesture, { passive: true });
    document.addEventListener('keydown', playAfterGesture);
    player.addEventListener('play', removeGestureFallback);

    const autoplayTimer = window.setTimeout(() => {
      void player.play().catch(() => {
        if (player.paused) setIsPlaying(false);
      });
    }, 2500);

    return () => {
      window.clearTimeout(autoplayTimer);
      removeGestureFallback();
    };
  }, []);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio || !audioAvailable) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
  };

  const scrollToConfirmation = () => {
    document.getElementById('confirmation')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const playLabel = audioAvailable
    ? isPlaying ? t('controls.pauseMusic') : t('controls.playMusic')
    : t('controls.audioMissing');

  return (
    <>
      <audio
        ref={audioRef}
        src={weddingDetails.audioPath}
        preload="auto"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onCanPlay={() => setAudioAvailable(true)}
        onError={() => {
          setAudioAvailable(false);
          setIsPlaying(false);
        }}
        aria-hidden="true"
      />
      <div
        className="fixed z-[60] flex flex-col gap-3"
        style={{
          right: 'max(1rem, env(safe-area-inset-right))',
          bottom: 'calc(env(safe-area-inset-bottom) + 1rem)',
        }}
        role="group"
        aria-label={t('controls.groupLabel')}
        data-testid="group-floating-invitation-controls"
      >
        <button
          type="button"
          onClick={() => void toggleAudio()}
          disabled={!audioAvailable}
          aria-label={playLabel}
          title={playLabel}
          className="grid h-12 w-12 place-items-center rounded-full border border-primary/20 bg-background/95 text-primary shadow-lg backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-55"
          data-testid="button-toggle-wedding-music"
        >
          {isPlaying ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}
        </button>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={t('controls.scrollTop')}
          title={t('controls.scrollTop')}
          className="grid h-12 w-12 place-items-center rounded-full border border-primary/20 bg-background/95 text-primary shadow-lg backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          data-testid="button-scroll-invitation-top"
        >
          <ArrowUp size={19} />
        </button>
        <button
          type="button"
          onClick={scrollToConfirmation}
          aria-label={t('controls.scrollToConfirmation')}
          title={t('controls.scrollToConfirmation')}
          className="grid h-12 w-12 place-items-center rounded-full border border-primary/20 bg-primary text-primary-foreground shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          data-testid="button-scroll-to-confirmation"
        >
          <TicketCheck size={19} />
        </button>
      </div>
    </>
  );
}

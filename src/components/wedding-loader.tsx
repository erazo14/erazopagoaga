import { useI18n } from '@/lib/i18n';
import { ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface WeddingLoaderProps {
  onComplete: () => void;
  waitForOpen?: boolean;
  onOpenInvitation?: () => void;
}

const frames = [
    '/loader/frame-1.png',
    '/loader/frame-2.png',
    '/loader/frame-3.png',
    '/loader/frame-4.png',
    '/loader/frame-5.png',
    '/loader/frame-6.png',
    '/loader/frame-7.png',
];

export function WeddingLoader({
  onComplete,
  waitForOpen = false,
  onOpenInvitation,
}: WeddingLoaderProps) {
    const {t} = useI18n();
    const [frame, setFrame] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const finishTimerRef = useRef<number | undefined>(undefined);

    const hideLoader = useCallback(() => {
        setFadeOut(true);
        finishTimerRef.current = window.setTimeout(onComplete, 600);
    }, [onComplete]);

    useEffect(() => {
        frames.forEach((src) => {
        const image = new Image();
        image.src = src;
        });

        const frameInterval = window.setInterval(() => {
        setFrame((current) => (current + 1) % frames.length);
        }, 350);

        const readyTimer = window.setTimeout(() => {
        window.clearInterval(frameInterval);
        setIsReady(true);
        if (!waitForOpen) {
            hideLoader();
        }
        }, 5000);

        return () => {
        window.clearInterval(frameInterval);
        window.clearTimeout(readyTimer);
        if (finishTimerRef.current) {
            window.clearTimeout(finishTimerRef.current);
        }
        };
    }, [hideLoader, waitForOpen]);

    const handleOpenInvitation = () => {
        onOpenInvitation?.();
        hideLoader();
    };

    return (
        <div
        className={`
            fixed inset-0 z-[9999]
            flex flex-col items-center justify-center
            bg-background
            transition-opacity duration-700
            ${fadeOut ? 'opacity-0' : 'opacity-100'}
        `}
        >
            <div className="absolute -right-24 top-10 h-72 w-72 rounded-full border border-primary/20 sm:h-96 sm:w-96" />

            <div className="absolute -right-10 top-24 h-48 w-48 rounded-full border border-primary/15 sm:h-67 sm:w-67" />

            <div className="absolute -left-24 bottom-10 h-72 w-72 rounded-full border border-primary/20 sm:h-96 sm:w-96" />

            <div className="absolute -left-10 bottom-24 h-48 w-48 rounded-full border border-primary/15 sm:h-67 sm:w-67" />

        <div className="relative h-[200px] w-[200px] sm:h-[270px] sm:w-[270px]">
            <img
            src={frames[frame]}
            alt=""
            className="absolute inset-0 h-full w-full object-contain"
            />
        </div>

        <p className="mt-6 text-sm uppercase tracking-[0.3em] text-muted-foreground">
            {t('loading')}
        </p>
        {waitForOpen && isReady && (
            <div className="motion-safe:animate-[rise-in_900ms_ease-out_both]">
            <button
                type="button"
                onClick={handleOpenInvitation}
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                data-testid="button-open-invitation"
            >
                {t('loading.openInvitation')}
                <ArrowRight size={17} />
            </button>
            </div>
        )}
        </div>
    );
}
import { useI18n } from '@/lib/i18n';
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
    const [showEnvelope, setShowEnvelope] = useState(false);
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
        if (waitForOpen) {
            const envelope = new Image();
            envelope.src = `${import.meta.env.BASE_URL}loader/invitation-envelope.png`;
        }

        const frameInterval = window.setInterval(() => {
        setFrame((current) => (current + 1) % frames.length);
        }, 350);

        let envelopeTimer: number | undefined;
        const readyTimer = window.setTimeout(() => {
        window.clearInterval(frameInterval);
        setIsReady(true);
        if (waitForOpen) {
            envelopeTimer = window.setTimeout(() => setShowEnvelope(true), 700);
        } else {
            hideLoader();
        }
        }, 5000);

        return () => {
        window.clearInterval(frameInterval);
        window.clearTimeout(readyTimer);
        window.clearTimeout(envelopeTimer);
        if (finishTimerRef.current) {
            window.clearTimeout(finishTimerRef.current);
        }
        };
    }, [hideLoader, waitForOpen]);

    const handleOpenInvitation = () => {
        if (fadeOut) return;
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

        <div className={waitForOpen ? 'relative grid w-full max-w-lg place-items-center px-6' : 'contents'}>
        <div
            className={waitForOpen ? `col-start-1 row-start-1 flex flex-col items-center transition-opacity duration-700 motion-reduce:transition-none ${isReady ? 'pointer-events-none opacity-0' : 'opacity-100'}` : 'contents'}
            aria-hidden={waitForOpen && isReady}
        >
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
        </div>
        {waitForOpen && showEnvelope && (
            <div className="col-start-1 row-start-1 w-full motion-safe:animate-[invitation-envelope-in_1000ms_ease-in-out_both]">
            <button
                type="button"
                onClick={handleOpenInvitation}
                disabled={fadeOut}
                aria-label={t('loading.openInvitation')}
                className="group flex w-full flex-col items-center rounded-xl bg-transparent p-3 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 disabled:cursor-default"
                data-testid="button-open-invitation"
            >
                <img
                    src={`${import.meta.env.BASE_URL}loader/invitation-envelope.png`}
                    alt=""
                    width={1000}
                    height={709}
                    className="w-full object-contain drop-shadow-lg transition-transform duration-500 motion-safe:group-hover:-translate-y-1 motion-reduce:transition-none"
                    draggable={false}
                />
                <span className="mt-7 text-sm tracking-wide">
                    {t('loading.tapEnvelope')}
                </span>
            </button>
            </div>
        )}
        </div>
        </div>
    );
}
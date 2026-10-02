import { useI18n } from '@/lib/i18n';
import { useEffect, useState } from 'react';

interface WeddingLoaderProps {
  onComplete: () => void;
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

export function WeddingLoader({ onComplete }: WeddingLoaderProps) {
    const {t} = useI18n();
    const [frame, setFrame] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        frames.forEach((src) => {
            const image = new Image();
            image.src = src;
        });
    }, []);

    useEffect(() => {
        frames.forEach((src) => {
        const image = new Image();
        image.src = src;
        });

        const frameInterval = window.setInterval(() => {
        setFrame((current) => (current + 1) % frames.length);
        }, 350);

        const hideTimer = window.setTimeout(() => {
        setFadeOut(true);

        window.setTimeout(() => {
            onComplete();
        }, 600);
        }, 5000);

        return () => {
        window.clearInterval(frameInterval);
        window.clearTimeout(hideTimer);
        };
    }, [onComplete]);

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
        </div>
    );
}
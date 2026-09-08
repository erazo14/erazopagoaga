import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { galleryImages } from '@/lib/gallery';

const featuredImages = galleryImages.slice(0, 5);

export function GalleryCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // const timer = window.setInterval(() => {
    //   setActiveIndex((current) => (current + 1) % featuredImages.length);
    // }, 5000);

    // return () => window.clearInterval(timer);
  }, []);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + featuredImages.length) % featuredImages.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % featuredImages.length);
  };

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-primary/15 bg-secondary/55 p-3 shadow-[0_20px_60px_hsl(var(--foreground)/.08)]" data-testid="gallery-carousel">
      <div className="relative aspect-[1.15] overflow-hidden rounded-[1rem] bg-muted sm:aspect-[1.6]">
        {featuredImages.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/75 via-foreground/15 to-transparent px-5 pb-5 pt-20 text-primary-foreground sm:px-7 sm:pb-7">
          <p className="eyebrow text-primary-foreground/75">A few frames</p>
          <p className="display-font mt-2 text-2xl font-semibold sm:text-3xl">{featuredImages[activeIndex].caption}</p>
        </div>
        <button
          type="button"
          onClick={showPrevious}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-foreground/25 text-white backdrop-blur-sm transition-colors hover:bg-foreground/50"
          data-testid="button-gallery-previous"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/35 bg-foreground/25 text-white backdrop-blur-sm transition-colors hover:bg-foreground/50"
          data-testid="button-gallery-next"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="flex items-center justify-center gap-2 px-2 pb-1 pt-4" aria-label="Choose a photo">
        {featuredImages.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show photo ${index + 1}`}
            aria-current={index === activeIndex}
            className={`h-1.5 rounded-full transition-all ${index === activeIndex ? 'w-8 bg-primary' : 'w-1.5 bg-primary/25 hover:bg-primary/55'}`}
            data-testid={`button-gallery-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}

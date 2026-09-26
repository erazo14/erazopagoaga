import { ArrowLeft, Images } from 'lucide-react';
import { Link } from 'wouter';
import { useEffect } from 'react';
import { galleryImages } from '@/lib/gallery';

export default function GalleryPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
      <div className="flex flex-col gap-7 border-b border-border pb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary" data-testid="link-gallery-back">
            <ArrowLeft size={14} /> Home
          </Link>
          <p className="eyebrow mt-12 text-primary">A little gallery</p>
          <h1 className="display-font mt-4 max-w-2xl text-6xl font-semibold leading-[.88] tracking-[-.04em] sm:text-7xl">
            The days we<br /><span className="italic text-primary">keep close.</span>
          </h1>
        </div>
        <div className="max-w-xs sm:text-right">
          <Images size={22} className="mb-4 text-primary sm:ml-auto" strokeWidth={1.5} />
          <p className="text-sm leading-6 text-muted-foreground">A few memories, details, and happy places from our story.</p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="gallery-grid">
        {galleryImages.map((image, index) => (
          <figure
            key={index}
            className={`group overflow-hidden rounded-xl border border-border bg-card`}
          >
            <div className={`overflow-hidden ${index !== 4 ? 'aspect-[.78] sm:h-full' : 'aspect-[1.15]'}`}>
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-contain bg-secondary/35 transition duration-700 group-hover:scale-[1.02]"
                loading={index < 3 ? 'eager' : 'lazy'}
              />
            </div>
            {/* <figcaption className="px-4 py-4">
              <p className="text-sm font-semibold">{image.caption}</p>
              <p className="mt-1 text-xs text-muted-foreground">G + F</p>
            </figcaption> */}
          </figure>
        ))}
      </div>
    </div>
  );
}

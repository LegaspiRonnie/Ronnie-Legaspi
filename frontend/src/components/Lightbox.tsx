import { useEffect, useState } from 'react';

interface LightboxImage {
  src: string;
  alt?: string;
}

interface LightboxProps {
  images: LightboxImage[];
}

// Thumbnail grid + fullscreen lightbox with keyboard navigation
export default function Lightbox({ images }: LightboxProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const total = images.length;

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + total) % total);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % total);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, total]);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            className="group relative aspect-square overflow-hidden rounded-xl cursor-zoom-in"
          >
            <img src={image.src} alt={image.alt ?? ''} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in">
          <div onClick={() => setOpen(false)} className="absolute inset-0"></div>

          <img
            src={images[index].src}
            alt={images[index].alt ?? ''}
            className="relative z-0 max-h-[85vh] max-w-[90vw] object-contain rounded-lg animate-page-in"
          />

          <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="absolute z-10 top-4 right-4 p-2 rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/60 transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button type="button" onClick={() => setIndex((i) => (i - 1 + total) % total)} aria-label="Previous image" className="absolute z-10 left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/60 transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button type="button" onClick={() => setIndex((i) => (i + 1) % total)} aria-label="Next image" className="absolute z-10 right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/60 transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}





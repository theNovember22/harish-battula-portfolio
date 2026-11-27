import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, MapPin, X } from 'lucide-react';
import { CONFERENCE_GALLERY } from '../data/profile.js';

export const ConferenceCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const total = CONFERENCE_GALLERY.length;
  const active = CONFERENCE_GALLERY[index];

  const go = (nextIdx: number) => {
    const wrapped = ((nextIdx % total) + total) % total;
    setDirection(nextIdx >= index ? 1 : -1);
    setIndex(wrapped);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      else if (e.key === 'ArrowRight') go(index + 1);
      else if (e.key === 'ArrowLeft') go(index - 1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxOpen, index]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    touchStartRef.current = null;
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      if (dx < 0) go(index + 1);
      else go(index - 1);
    }
  };

  return (
    <>
      <div className="surface-card overflow-hidden rounded-2xl p-4 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
          <div>
            <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-signal)] sm:text-[11px]">
              Conferences &amp; Poster Sessions • Field Record
            </span>
            <h3 className="font-serif-display mt-0.5 text-lg font-medium text-[var(--ink-primary)] sm:text-2xl">
              Research Presented on Stage &amp; Poster Floors
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono-tech text-xs font-semibold text-[var(--ink-secondary)]">
              {index + 1} / {total}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous conference photograph"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--ink-primary)] transition-colors hover:border-[var(--accent-signal)] hover:text-[var(--accent-signal)] md:h-9 md:w-9"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next conference photograph"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--ink-primary)] transition-colors hover:border-[var(--accent-signal)] hover:text-[var(--accent-signal)] md:h-9 md:w-9"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Split & Mobile Swipeable Gallery */}
        <div className="grid gap-4 lg:grid-cols-12 lg:items-center lg:gap-6">
          {/* Interactive Photo Stage with Soft Ambient Fill + Exact Aspect Ratio (0% Face Distortion) */}
          <div className="lg:col-span-7">
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="surface-instrument group relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden rounded-xl sm:aspect-[16/10]"
            >
              {/* Soft Ambient Fill Layer for mixed 3:4 / 4:3 photography */}
              <img
                src={active.src}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-xl"
              />

              <motion.img
                key={active.id}
                src={active.src}
                alt={active.alt}
                loading="lazy"
                initial={{ opacity: 0.35, x: direction * 20, scale: 0.985 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setLightboxOpen(true)}
                className="relative z-10 mx-auto h-full w-auto max-w-full cursor-zoom-in object-contain transition-transform duration-300 group-hover:scale-[1.015]"
              />

              {/* Top Overlay Pill & Expand Button */}
              <div className="pointer-events-none absolute inset-x-3 top-3 z-20 flex items-center justify-between">
                <span className="rounded-full border border-white/15 bg-black/55 px-2.5 py-1 font-mono-tech text-[10px] font-medium text-white backdrop-blur-md">
                  {active.year} • {active.location}
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  aria-label="Enlarge photograph"
                  className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition-colors hover:border-[#2DD4BF] hover:text-[#2DD4BF]"
                >
                  <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>

              {/* Mobile Swipe Indicator Hint Pill */}
              <div className="pointer-events-none absolute bottom-2.5 left-1/2 z-20 -translate-x-1/2 md:hidden">
                <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 backdrop-blur-md">
                  {CONFERENCE_GALLERY.map((item, idx) => (
                    <span
                      key={item.id}
                      className={`block rounded-full transition-all ${
                        idx === index ? 'h-1.5 w-4 bg-[#2DD4BF]' : 'h-1.5 w-1.5 bg-white/45'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Caption, Metadata & Desktop Thumbnail Strip */}
          <div className="flex flex-col justify-between gap-4 lg:col-span-5">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-signal)]">
                <span>{active.event}</span>
                <span className="inline-flex items-center gap-1 text-[var(--ink-muted)]">
                  <MapPin className="h-3 w-3 text-[var(--accent-signal)]" aria-hidden="true" />
                  {active.location}
                </span>
              </div>

              <p className="mt-2 text-sm font-medium leading-snug text-[var(--ink-primary)] sm:text-base">
                {active.caption}
              </p>

              <div className="mt-2.5 font-mono-tech text-[11px] text-[var(--ink-secondary)]">
                {active.role}
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {active.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-2 py-0.5 font-mono-tech text-[10px] text-[var(--ink-primary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Desktop Interactive Thumbnail Strip */}
            <div className="hidden grid-cols-6 gap-2 md:grid" role="tablist" aria-label="Conference photographs">
              {CONFERENCE_GALLERY.map((item, idx) => {
                const isSelected = idx === index;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-label={`View ${item.event}`}
                    onClick={() => go(idx)}
                    className={`group relative aspect-square overflow-hidden rounded-lg border transition-all ${
                      isSelected
                        ? 'border-[var(--accent-signal)] ring-2 ring-[var(--accent-signal-ring)]'
                        : 'border-[var(--border-hairline)] opacity-65 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={item.src}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-200 group-hover:scale-105"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Crisp Enlarged View */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.event}
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#090D12]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="font-mono-tech text-xs text-[#2DD4BF]">
                {active.event} • {index + 1}/{total}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Previous photo"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white hover:border-[#2DD4BF]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Next photo"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white hover:border-[#2DD4BF]"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  aria-label="Close lightbox"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white hover:border-[#F05252]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center overflow-hidden p-4">
              <img
                src={active.src}
                alt={active.alt}
                className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain"
              />
            </div>
            <div className="border-t border-white/10 px-4 py-3 text-xs text-gray-300">
              {active.caption} — <span className="text-[#2DD4BF]">{active.location}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

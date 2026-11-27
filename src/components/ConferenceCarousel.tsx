import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Expand, MapPin, Pause, Play, X } from 'lucide-react';
import { CONFERENCE_GALLERY, PROFILE } from '../data/profile.js';

type EventFilter = 'all' | 'interspeech' | 'eusipco';

export const ConferenceCarousel: React.FC = () => {
  const [filter, setFilter] = useState<EventFilter>('all');
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [userLocked, setUserLocked] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const thumbRailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const items = useMemo(() => {
    if (filter === 'interspeech') return CONFERENCE_GALLERY.filter((c) => c.eventKey === 'interspeech-2025');
    if (filter === 'eusipco') return CONFERENCE_GALLERY.filter((c) => c.eventKey === 'eusipco-2024');
    return CONFERENCE_GALLERY;
  }, [filter]);

  const total = items.length;
  const safeIdx = index < total ? index : 0;
  const active = items[safeIdx] ?? items[0];

  const go = (nextIdx: number, byUser = false) => {
    if (total === 0) return;
    const wrapped = ((nextIdx % total) + total) % total;
    setDirection(nextIdx >= safeIdx ? 1 : -1);
    setIndex(wrapped);
    if (byUser) setUserLocked(true);
  };

  // Automatic 3-second progression unless user selects a specific image or pauses
  useEffect(() => {
    if (userLocked || lightboxOpen || reducedMotion || total <= 1) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % total);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [userLocked, lightboxOpen, reducedMotion, total]);

  // Keep active desktop thumbnail scrolled into horizontal view without affecting page scroll
  useEffect(() => {
    const rail = thumbRailRef.current;
    if (!rail) return;
    const activeBtn = rail.children[safeIdx] as HTMLElement | undefined;
    if (!activeBtn) return;
    const targetLeft =
      activeBtn.offsetLeft - rail.clientWidth / 2 + activeBtn.clientWidth / 2;
    rail.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
  }, [safeIdx]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      else if (e.key === 'ArrowRight') go(safeIdx + 1, true);
      else if (e.key === 'ArrowLeft') go(safeIdx - 1, true);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxOpen, safeIdx, total]);

  const handleFilterChange = (nextFilter: EventFilter) => {
    setFilter(nextFilter);
    setIndex(0);
    setDirection(1);
    setUserLocked(false);
  };

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
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      if (dx < 0) go(safeIdx + 1, true);
      else go(safeIdx - 1, true);
    }
  };

  return (
    <>
      <div className="surface-card overflow-hidden rounded-2xl p-4 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
          <div>
            <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-signal)] sm:text-[11px]">
              Conferences &amp; Field Photography • {CONFERENCE_GALLERY.length} Photos
            </span>
            <h3 className="font-serif-display mt-0.5 text-lg font-medium text-[var(--ink-primary)] sm:text-2xl">
              Research Presented on Stage &amp; Poster Floors
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Auto-advance 3s / Locked status toggle */}
            <button
              type="button"
              onClick={() => setUserLocked((v) => !v)}
              aria-pressed={!userLocked}
              title={userLocked ? 'Resume 3s auto-play' : 'Auto-playing every 3s'}
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-mono-tech text-[10px] font-medium transition-colors ${
                !userLocked
                  ? 'border-[var(--accent-signal-ring)] bg-[var(--accent-signal-soft)] text-[var(--accent-signal)]'
                  : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
              }`}
            >
              {userLocked ? (
                <>
                  <Play className="h-3 w-3" aria-hidden="true" />
                  Auto 3s
                </>
              ) : (
                <>
                  <Pause className="h-3 w-3" aria-hidden="true" />
                  3s Live
                </>
              )}
            </button>

            <span className="font-mono-tech text-xs font-semibold text-[var(--ink-secondary)]">
              {safeIdx + 1} / {total}
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => go(safeIdx - 1, true)}
                aria-label="Previous conference photograph"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--ink-primary)] transition-colors hover:border-[var(--accent-signal)] hover:text-[var(--accent-signal)] md:h-9 md:w-9"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(safeIdx + 1, true)}
                aria-label="Next conference photograph"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--ink-primary)] transition-colors hover:border-[var(--accent-signal)] hover:text-[var(--accent-signal)] md:h-9 md:w-9"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Event Filter Row */}
        <div className="no-scrollbar mb-4 flex items-center justify-between gap-3 overflow-x-auto pb-0.5">
          <div className="flex shrink-0 items-center gap-1.5">
            {[
              { id: 'all' as EventFilter, label: `All (${CONFERENCE_GALLERY.length})` },
              {
                id: 'interspeech' as EventFilter,
                label: `INTERSPEECH 2025 (${CONFERENCE_GALLERY.filter((c) => c.eventKey === 'interspeech-2025').length})`,
              },
              {
                id: 'eusipco' as EventFilter,
                label: `EUSIPCO 2024 (${CONFERENCE_GALLERY.filter((c) => c.eventKey === 'eusipco-2024').length})`,
              },
            ].map((tab) => {
              const isSelected = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleFilterChange(tab.id)}
                  className={`shrink-0 rounded-full border px-3 py-1 font-mono-tech text-[10.5px] font-medium transition-colors ${
                    isSelected
                      ? 'border-[var(--accent-signal)] bg-[var(--accent-signal)] text-[var(--btn-primary-fg)]'
                      : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--ink-secondary)] hover:border-[var(--accent-signal)]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <a
            href={PROFILE.links.researchJournal}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center gap-1 font-mono-tech text-[11px] font-medium text-[var(--accent-signal)] hover:underline sm:inline-flex"
          >
            Research Journal
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        {/* Desktop Split & Mobile Swipeable Gallery */}
        <div className="grid gap-4 lg:grid-cols-12 lg:items-center lg:gap-6">
          {/* Photo Stage */}
          <div className="lg:col-span-7">
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="surface-instrument group relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden rounded-xl sm:aspect-[16/10]"
            >
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
                onClick={() => {
                  setUserLocked(true);
                  setLightboxOpen(true);
                }}
                className="relative z-10 mx-auto h-full w-auto max-w-full cursor-zoom-in object-contain transition-transform duration-300 group-hover:scale-[1.015]"
              />

              <div className="pointer-events-none absolute inset-x-3 top-3 z-20 flex items-center justify-between">
                <span className="rounded-full border border-white/15 bg-black/55 px-2.5 py-1 font-mono-tech text-[10px] font-medium text-white backdrop-blur-md">
                  {active.year} • {active.location}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setUserLocked(true);
                    setLightboxOpen(true);
                  }}
                  aria-label="Enlarge photograph"
                  className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition-colors hover:border-[#2DD4BF] hover:text-[#2DD4BF]"
                >
                  <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Caption, Metadata & Scrollable Thumbnail Rail */}
          <div className="flex min-w-0 flex-col justify-between gap-4 lg:col-span-5">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="surface-subtle rounded-xl p-4"
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

              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {active.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-2 py-0.5 font-mono-tech text-[10px] text-[var(--ink-primary)]"
                  >
                    {tag}
                  </span>
                ))}
                <a
                  href={active.journalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-0.5 font-mono-tech text-[10px] font-semibold text-[var(--accent-signal)] hover:underline"
                >
                  Journal
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </motion.div>

            {/* Horizontal Thumbnail Strip for all photos */}
            <div
              ref={thumbRailRef}
              className="no-scrollbar flex gap-2 overflow-x-auto pb-1"
              role="tablist"
              aria-label="Conference photographs"
            >
              {items.map((item, idx) => {
                const isSelected = idx === safeIdx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-label={`View ${item.event} (${idx + 1}/${total})`}
                    onClick={() => go(idx, true)}
                    className={`group relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border transition-all sm:h-16 sm:w-16 ${
                      isSelected
                        ? 'border-[var(--accent-signal)] ring-2 ring-[var(--accent-signal-ring)]'
                        : 'border-[var(--border-hairline)] opacity-60 hover:opacity-100'
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

      {/* Lightbox Modal */}
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
                {active.event} • {safeIdx + 1}/{total}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(safeIdx - 1, true)}
                  aria-label="Previous photo"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white hover:border-[#2DD4BF]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(safeIdx + 1, true)}
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

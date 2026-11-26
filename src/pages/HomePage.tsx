import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, FileDown } from 'lucide-react';
import { HERO_CONTENT, PROFILE, PROJECT_CHAPTERS_META } from '../data/profile.js';
import { MorphWaveformCanvas } from '../visuals/MorphWaveformCanvas';

const ChapterMiniGlyph: React.FC<{ idx: number }> = ({ idx }) => {
  switch (idx) {
    case 0:
      return (
        <svg viewBox="0 0 28 16" className="h-4 w-7" aria-hidden="true">
          <path d="M1 8 Q5 2 9 8 T17 8 L20 2 L22 14 L24 8 L27 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 28 16" className="h-4 w-7" aria-hidden="true">
          <rect x="2" y="8" width="3" height="6" rx="1" fill="currentColor" opacity="0.45" />
          <rect x="7" y="4" width="3" height="10" rx="1" fill="currentColor" opacity="0.7" />
          <rect x="12" y="2" width="3" height="12" rx="1" fill="currentColor" />
          <rect x="17" y="5" width="3" height="9" rx="1" fill="currentColor" opacity="0.7" />
          <rect x="22" y="9" width="3" height="5" rx="1" fill="currentColor" opacity="0.45" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 28 16" className="h-4 w-7" aria-hidden="true">
          <line x1="6" y1="5" x2="15" y2="12" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
          <line x1="15" y1="12" x2="23" y2="5" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
          <line x1="6" y1="5" x2="23" y2="5" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
          <circle cx="6" cy="5" r="2.2" fill="currentColor" />
          <circle cx="15" cy="12" r="2.2" fill="var(--accent-data)" />
          <circle cx="23" cy="5" r="2.2" fill="currentColor" />
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 28 16" className="h-4 w-7" aria-hidden="true">
          <path d="M1 8 H6 L8 2 L10 14 L12 8 H16 L17 5 L18 11 L19 8 H27" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 4:
      return (
        <svg viewBox="0 0 28 16" className="h-4 w-7" aria-hidden="true">
          <rect x="14" y="2" width="11" height="2.6" rx="1.2" fill="var(--accent-data)" />
          <rect x="14" y="6.7" width="8" height="2.6" rx="1.2" fill="var(--accent-data)" opacity="0.7" />
          <rect x="5" y="11.4" width="9" height="2.6" rx="1.2" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 28 16" className="h-4 w-7" aria-hidden="true">
          <path d="M2 12 C8 11, 11 9, 14 8 C19 6, 22 4, 26 3" fill="none" stroke="var(--accent-data)" strokeWidth="1.5" strokeDasharray="2.5 2" />
          <path d="M2 12 C8 11, 11 9, 14 8 C19 9.5, 22 11, 26 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
  }
};

export const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero — preserved multi-page structure with calibrated Light/Dark physics */}
      <section
        id="hero"
        className="flex min-h-[calc(100svh-3.75rem)] flex-col justify-center py-8 sm:py-10 md:py-12"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 font-mono-tech text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-signal)] sm:text-xs">
              <span className="animate-cardiac h-1.5 w-1.5 rounded-full bg-[var(--accent-data)]" />
              <span>{HERO_CONTENT.eyebrow}</span>
            </div>

            <h1 className="font-serif-display mt-3 text-4xl font-medium leading-[1.06] tracking-[-0.025em] text-[var(--ink-primary)] sm:text-6xl lg:text-[66px]">
              {HERO_CONTENT.headline}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--ink-secondary)] sm:text-lg">
              {HERO_CONTENT.subline}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--btn-primary-bg)] px-5 py-3 font-mono-tech text-xs font-semibold tracking-wider text-[var(--btn-primary-fg)] transition-all hover:-translate-y-0.5 hover:bg-[var(--btn-primary-hover)] active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-signal)]"
              >
                {HERO_CONTENT.primaryCta}
              </Link>
              <a
                href={PROFILE.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded px-1 py-1 font-mono-tech text-xs font-medium text-[var(--ink-secondary)] underline-offset-4 transition-colors hover:text-[var(--accent-signal)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-signal)]"
              >
                <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
                {HERO_CONTENT.secondaryCta}
              </a>
            </div>
          </motion.div>

          {/* Interactive Live Speech-to-Heartbeat Oscilloscope */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 sm:mt-10"
          >
            <MorphWaveformCanvas />
          </motion.div>

          {/* Compact 4-Fact Quick Strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {PROFILE.quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="surface-card rounded-xl px-3.5 py-2.5 transition-colors hover:border-[var(--accent-signal)]"
              >
                <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
                  {fact.label}
                </div>
                <div className="mt-0.5 text-xs font-semibold leading-snug text-[var(--ink-primary)] sm:text-[13px]">
                  {fact.value}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Curiosity Arc Chapters Directory — links directly to /projects chapters */}
      <section
        className="border-t border-[var(--border-hairline)] py-10 transition-colors duration-200 sm:py-12 md:py-14"
        style={{ backgroundColor: 'var(--bg-tint)' }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-signal)]">
                Curiosity Arc • Chapters 01–06
              </span>
              <h2 className="font-serif-display mt-1 text-2xl font-medium text-[var(--ink-primary)] sm:text-3xl">
                Follow the research chapters
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[var(--accent-signal)] hover:underline"
            >
              Open all 6 chapters
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
            {PROJECT_CHAPTERS_META.map((ch, idx) => (
              <Link
                key={ch.id}
                to={`/projects#${ch.id}`}
                className="surface-card group flex min-w-[236px] shrink-0 snap-start items-center justify-between rounded-xl px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:border-[var(--accent-signal)] sm:min-w-0"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[var(--accent-signal)]">
                    <span className="font-mono-tech text-[10px] font-semibold">
                      CHAPTER {ch.code}
                    </span>
                    <span className="opacity-70 transition-opacity group-hover:opacity-100">
                      <ChapterMiniGlyph idx={idx} />
                    </span>
                  </div>
                  <div className="mt-1 truncate text-sm font-semibold text-[var(--ink-primary)] transition-colors group-hover:text-[var(--accent-signal)]">
                    {ch.shortTitle}
                  </div>
                </div>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-[var(--ink-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent-signal)]"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

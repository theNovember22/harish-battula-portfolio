import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, FileDown } from 'lucide-react';
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
  const [aboutExpanded, setAboutExpanded] = useState(false);

  return (
    <div>
      {/* Level 1 Hero (5-second immediate understanding) */}
      <section
        id="hero"
        className="flex min-h-[calc(100svh-3.75rem)] flex-col justify-center py-7 sm:py-10 md:py-12"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="flex flex-wrap items-center gap-2 font-mono-tech text-[10.5px] font-semibold uppercase tracking-[0.15em] text-[var(--accent-signal)] sm:text-xs">
              <span className="animate-cardiac h-1.5 w-1.5 rounded-full bg-[var(--accent-data)]" />
              <span>{HERO_CONTENT.eyebrow}</span>
            </div>

            <h1 className="font-serif-display mt-2.5 text-4xl font-medium leading-[1.05] tracking-[-0.025em] text-[var(--ink-primary)] sm:mt-3 sm:text-6xl lg:text-[64px]">
              {HERO_CONTENT.headline}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ink-secondary)] sm:mt-4 sm:text-lg">
              {HERO_CONTENT.subline}
            </p>

            {/* Level 1 Keyword Pills */}
            <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
              {HERO_CONTENT.roles.map((r) => (
                <span
                  key={r}
                  className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-2.5 py-0.5 font-mono-tech text-[10px] font-medium text-[var(--ink-secondary)] sm:px-3 sm:py-1 sm:text-[11px]"
                >
                  {r}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4 sm:mt-6">
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
            transition={{ duration: 0.38, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 sm:mt-9"
          >
            <MorphWaveformCanvas />
          </motion.div>

          {/* Compact Visual Metric Strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-5 sm:grid-cols-4 sm:gap-3"
          >
            {PROFILE.quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="surface-card rounded-xl px-3.5 py-2.5 transition-colors hover:border-[var(--accent-signal)]"
              >
                <div className="font-mono-tech text-[9.5px] uppercase tracking-wider text-[var(--ink-muted)] sm:text-[10px]">
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

      {/* Level 2 Visual Story Arc + Interactive Chapters Directory */}
      <section
        className="border-t border-[var(--border-hairline)] py-9 transition-colors duration-200 sm:py-12 md:py-14"
        style={{ backgroundColor: 'var(--bg-tint)' }}
      >
        <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
          {/* Compact Visual Narrative Progression: SIGNALS -> MODELS -> EVIDENCE -> IMPACT */}
          <div className="surface-card rounded-2xl p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-signal)]">
                  The Approach
                </span>
                <h2 className="font-serif-display mt-0.5 text-xl font-medium text-[var(--ink-primary)] sm:text-2xl">
                  {HERO_CONTENT.storyHeadline}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setAboutExpanded((v) => !v)}
                aria-expanded={aboutExpanded}
                className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3 py-1.5 font-mono-tech text-[11px] font-medium text-[var(--ink-primary)] transition-colors hover:border-[var(--accent-signal)] hover:text-[var(--accent-signal)]"
              >
                {aboutExpanded ? 'Hide research bio' : 'Read research bio'}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${aboutExpanded ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
              {HERO_CONTENT.storyStages.map((s) => (
                <div
                  key={s.step}
                  className="surface-subtle rounded-xl px-3.5 py-2.5 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between font-mono-tech text-[10px]">
                    <span className="font-semibold text-[var(--accent-signal)]">{s.step}</span>
                    <span className="font-semibold tracking-wider text-[var(--ink-primary)]">
                      {s.word}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-[var(--ink-secondary)]">{s.detail}</div>
                </div>
              ))}
            </div>

            {aboutExpanded && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 border-t border-[var(--border-subtle)] pt-3.5 text-sm leading-relaxed text-[var(--ink-secondary)]"
              >
                {HERO_CONTENT.aboutDrawerCopy}
              </motion.p>
            )}
          </div>

          {/* Interactive Chapters Shortcut Grid */}
          <div>
            <div className="mb-4 flex flex-col gap-1.5 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-signal)]">
                  Interactive Signal Labs • Chapters 01–06
                </span>
                <h2 className="font-serif-display mt-0.5 text-2xl font-medium text-[var(--ink-primary)] sm:text-3xl">
                  Open an experiment
                </h2>
              </div>
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[var(--accent-signal)] hover:underline"
              >
                Explore all 6 visual labs
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
              {PROJECT_CHAPTERS_META.map((ch, idx) => (
                <Link
                  key={ch.id}
                  to={`/projects#${ch.id}`}
                  className="surface-card group flex min-w-[230px] shrink-0 snap-start items-center justify-between rounded-xl px-4 py-3.5 hover:-translate-y-0.5 active:scale-[0.985] sm:min-w-0"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[var(--accent-signal)]">
                      <span className="font-mono-tech text-[10px] font-semibold">
                        LAB {ch.code}
                      </span>
                      <span className="opacity-75 transition-opacity group-hover:opacity-100">
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
        </div>
      </section>
    </div>
  );
};

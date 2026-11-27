import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { RESEARCH_CARDS } from '../data/profile.js';
import { ProjectLabModal } from '../components/ProjectLabModal';

const RESEARCH_AREAS = ['All', 'Sensing', 'Acoustics', 'Graph ML', 'Diagnostics', 'Explainability', 'Trajectory'];

const ProjectPreviewVisual: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
    case 'speech-hr':
      return (
        <svg viewBox="0 0 240 68" className="h-16 w-full" aria-hidden="true">
          <path d="M6 20 Q28 8 48 20 T90 20 T132 20 T174 20 T234 20" fill="none" stroke="#2DD4BF" strokeWidth="1.8" />
          <path d="M6 48 H46 L54 34 L62 58 L70 42 L78 48 H130 L138 34 L146 58 L154 42 L162 48 H234" fill="none" stroke="#F05252" strokeWidth="1.8" />
        </svg>
      );
    case 'confidence':
      return (
        <svg viewBox="0 0 240 68" className="h-16 w-full" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => {
            const h = 10 + ((i * 7) % 24);
            return (
              <rect
                key={i}
                x={10 + i * 12}
                y={34 - h / 2}
                width="7"
                height={h}
                rx="2"
                fill={i % 5 === 0 ? '#F05252' : '#2DD4BF'}
                opacity={0.45 + (i % 3) * 0.2}
              />
            );
          })}
          <path d="M10 56 Q70 46 130 55 T230 50" fill="none" stroke="#F05252" strokeWidth="1.7" />
        </svg>
      );
    case 'alzheimers':
      return (
        <svg viewBox="0 0 240 68" className="h-16 w-full" aria-hidden="true">
          <line x1="36" y1="24" x2="94" y2="18" stroke="#2DD4BF" strokeOpacity="0.6" strokeWidth="1.4" />
          <line x1="94" y1="18" x2="152" y2="30" stroke="#F05252" strokeOpacity="0.75" strokeWidth="1.7" />
          <line x1="94" y1="18" x2="84" y2="52" stroke="#2DD4BF" strokeOpacity="0.6" strokeWidth="1.4" />
          <line x1="84" y1="52" x2="152" y2="30" stroke="#F05252" strokeOpacity="0.75" strokeWidth="1.7" />
          <line x1="152" y1="30" x2="204" y2="48" stroke="#2DD4BF" strokeOpacity="0.6" strokeWidth="1.4" />
          <circle cx="36" cy="24" r="6" fill="#0B1117" stroke="#2DD4BF" strokeWidth="1.6" />
          <circle cx="94" cy="18" r="6" fill="#0B1117" stroke="#2DD4BF" strokeWidth="1.6" />
          <circle cx="152" cy="30" r="7" fill="#1A2430" stroke="#F05252" strokeWidth="1.8" />
          <circle cx="84" cy="52" r="6" fill="#0B1117" stroke="#2DD4BF" strokeWidth="1.6" />
          <circle cx="204" cy="48" r="6" fill="#0B1117" stroke="#2DD4BF" strokeWidth="1.6" />
        </svg>
      );
    case 'stethoscope':
      return (
        <svg viewBox="0 0 240 68" className="h-16 w-full" aria-hidden="true">
          <rect x="86" y="10" width="44" height="48" rx="4" fill="rgba(240,82,82,0.16)" />
          <path d="M8 36 H48 L56 14 L64 56 L72 22 L80 36 H94 L100 28 L106 44 L112 27 L118 43 L124 36 H162 L170 16 L178 52 L186 24 L194 36 H232" fill="none" stroke="#2DD4BF" strokeWidth="1.8" />
        </svg>
      );
    case 'trust':
      return (
        <svg viewBox="0 0 240 68" className="h-16 w-full" aria-hidden="true">
          <rect x="34" y="12" width="142" height="7" rx="3.5" fill="#F05252" />
          <rect x="34" y="25" width="108" height="7" rx="3.5" fill="#F05252" opacity="0.78" />
          <rect x="34" y="38" width="76" height="7" rx="3.5" fill="#2DD4BF" />
          <rect x="34" y="51" width="44" height="7" rx="3.5" fill="#2DD4BF" opacity="0.72" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 240 68" className="h-16 w-full" aria-hidden="true">
          <polygon points="132,36 226,12 226,32" fill="rgba(240,82,82,0.18)" />
          <polygon points="132,36 226,42 226,60" fill="rgba(45,212,191,0.18)" />
          <path d="M14 52 C52 48, 90 42, 132 36" fill="none" stroke="#E2E8F0" strokeWidth="2" />
          <path d="M132 36 C168 28, 198 22, 226 19" fill="none" stroke="#F05252" strokeWidth="1.8" strokeDasharray="4 3" />
          <path d="M132 36 C168 42, 198 48, 226 52" fill="none" stroke="#2DD4BF" strokeWidth="2" />
          <circle cx="42" cy="49" r="3.2" fill="#2DD4BF" />
          <circle cx="88" cy="42" r="3.2" fill="#2DD4BF" />
          <circle cx="132" cy="36" r="3.6" fill="#F8FAFC" />
        </svg>
      );
  }
};

export const ProjectsPage: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState('All');
  const [activeLabId, setActiveLabId] = useState<string | null>(null);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = hash.replace(/^#/, '');
      if (RESEARCH_CARDS.some((c) => c.id === target)) {
        setActiveLabId(target);
      }
    }
  }, [hash]);

  const visibleCards =
    selectedArea === 'All'
      ? RESEARCH_CARDS
      : RESEARCH_CARDS.filter((c) => c.area === selectedArea);

  return (
    <div className="py-6 sm:py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Compact Visual Header + Interactive Research Domain Node Filter */}
        <div className="flex flex-col gap-4 border-b border-[var(--border-hairline)] pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="font-mono-tech text-[10.5px] font-semibold uppercase tracking-[0.15em] text-[var(--accent-signal)] sm:text-xs">
              Research &amp; Signal Labs • 01–06
            </span>
            <h1 className="font-serif-display mt-1.5 text-3xl font-medium tracking-tight text-[var(--ink-primary)] sm:text-5xl">
              Six questions, built as live labs.
            </h1>
          </div>

          <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0">
            {RESEARCH_AREAS.map((area) => {
              const active = selectedArea === area;
              return (
                <button
                  key={area}
                  type="button"
                  onClick={() => setSelectedArea(area)}
                  className="relative shrink-0 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-3 py-1.5 font-mono-tech text-[11px] font-medium transition-colors"
                >
                  {active && (
                    <motion.span
                      layoutId="research-area-filter"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="pointer-events-none absolute inset-0 rounded-full bg-[var(--accent-signal)]"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`pointer-events-none relative z-10 ${
                      active ? 'font-semibold text-[var(--btn-primary-fg)]' : 'text-[var(--ink-secondary)]'
                    }`}
                  >
                    {area}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Project Cards Grid */}
        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {visibleCards.map((card, i) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActiveLabId(card.id)}
              className="surface-card group flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl p-4 transition-all hover:-translate-y-1 hover:border-[var(--accent-signal)] sm:p-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 font-mono-tech text-[10px]">
                  <span className="font-semibold text-[var(--accent-signal)]">
                    LAB {card.code} • {card.area.toUpperCase()}
                  </span>
                  <span className="rounded-full border border-[var(--accent-signal-ring)] bg-[var(--accent-signal-soft)] px-2 py-0.5 font-semibold text-[var(--accent-signal)]">
                    {card.metric}
                  </span>
                </div>

                {/* Calibrated Instrument Visual Thumbnail */}
                <div className="surface-instrument mt-3 overflow-hidden rounded-xl p-2.5 transition-transform duration-300 group-hover:scale-[1.015]">
                  <ProjectPreviewVisual id={card.id} />
                </div>

                <div className="mt-3.5">
                  <div className="font-mono-tech text-[10px] text-[var(--ink-muted)]">
                    {card.venue}
                  </div>
                  <h2 className="font-serif-display mt-1 text-xl font-medium leading-snug text-[var(--ink-primary)] transition-colors group-hover:text-[var(--accent-signal)] sm:text-2xl">
                    {card.question}
                  </h2>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--ink-secondary)] sm:text-sm">
                    {card.oneLiner}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-[var(--border-subtle)] pt-3">
                <div className="flex flex-wrap gap-1.5">
                  {card.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-2 py-0.5 font-mono-tech text-[10px] text-[var(--ink-primary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveLabId(card.id);
                  }}
                  className="mt-3 inline-flex w-full items-center justify-between rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3 py-2 font-mono-tech text-[11px] font-semibold text-[var(--ink-primary)] transition-colors group-hover:border-[var(--accent-signal)] group-hover:bg-[var(--accent-signal-soft)] group-hover:text-[var(--accent-signal)]"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Play className="h-3 w-3" aria-hidden="true" />
                    Open Interactive Lab
                  </span>
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Level 3 Interactive Lab Modal / Drawer */}
      <ProjectLabModal
        projectId={activeLabId}
        onClose={() => setActiveLabId(null)}
        onSelectProject={(id) => setActiveLabId(id)}
      />
    </div>
  );
};

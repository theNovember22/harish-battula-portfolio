import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Building2,
  Check,
  ChevronDown,
  Copy,
  MapPin,
  User,
} from 'lucide-react';
import {
  EXPERIENCE_DETAILS,
  EXPERIENCE_TIMELINE,
  PUBLICATIONS,
} from '../data/profile.js';
import { ConferenceCarousel } from '../components/ConferenceCarousel';
import { SkillConstellation } from '../components/SkillConstellation';

type MobileTab = 'timeline' | 'papers' | 'skills';

export const ExperiencePage: React.FC = () => {
  const [photoMissing, setPhotoMissing] = useState(false);
  const [bioOpen, setBioOpen] = useState(false);
  const [activeMilestoneId, setActiveMilestoneId] = useState('tcs');
  const [activeStreamId, setActiveStreamId] = useState(EXPERIENCE_DETAILS.tcs.workstreams[0].id);
  const [showStreamProblem, setShowStreamProblem] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>('timeline');
  const [openBibId, setOpenBibId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeMilestone =
    EXPERIENCE_TIMELINE.find((m) => m.id === activeMilestoneId) ??
    EXPERIENCE_TIMELINE[EXPERIENCE_TIMELINE.length - 1];

  const activeStream =
    EXPERIENCE_DETAILS.tcs.workstreams.find((w) => w.id === activeStreamId) ??
    EXPERIENCE_DETAILS.tcs.workstreams[0];

  const copyBibtex = async (id: string, bibtex: string) => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      setOpenBibId(id);
    }
  };

  return (
    <div className="py-5 sm:py-12 md:py-16">
      <div className="mx-auto max-w-6xl space-y-6 px-4 sm:space-y-12 sm:px-6 lg:px-8">
        {/* Level 1 Identity Hero + Portrait Split */}
        <section className="grid items-center gap-4 lg:grid-cols-12 lg:gap-10">
          {/* Mobile Compact Identity Card */}
          <div className="surface-card flex min-w-0 items-center gap-3.5 rounded-2xl p-3.5 lg:hidden">
            {!photoMissing ? (
              <img
                src={EXPERIENCE_DETAILS.photoUrl}
                alt={EXPERIENCE_DETAILS.photoAlt}
                loading="lazy"
                onError={() => setPhotoMissing(true)}
                className="h-16 w-14 shrink-0 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-16 w-14 shrink-0 items-center justify-center rounded-xl border border-dashed border-[var(--border-hairline)] bg-[var(--bg-subtle)]">
                <User className="h-6 w-6 text-[var(--accent-signal)]" aria-hidden="true" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <span className="block font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-signal)]">
                Career &amp; Conferences
              </span>
              <div className="mt-0.5 text-base font-semibold text-[var(--ink-primary)]">
                Harish Battula
              </div>
              <div className="mt-0.5 font-mono-tech text-[10px] text-[var(--ink-muted)]">
                3+ Yrs • 40+ Cohort • 4 Papers • IEEE/BSPC Reviewer
              </div>
            </div>
          </div>

          {/* Desktop Concise Hero + Metrics + Expandable Full Bio */}
          <div className="hidden min-w-0 lg:col-span-7 lg:block">
            <span className="font-mono-tech text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-signal)]">
              {EXPERIENCE_DETAILS.eyebrow}
            </span>
            <h1 className="font-serif-display mt-2.5 text-5xl font-medium leading-[1.08] tracking-[-0.025em] text-[var(--ink-primary)]">
              {EXPERIENCE_DETAILS.headline}
            </h1>

            <div className="mt-6 grid grid-cols-4 gap-3">
              {EXPERIENCE_DETAILS.highlights.map((h) => (
                <div
                  key={h.label}
                  className="surface-card rounded-xl p-4 transition-colors hover:border-[var(--accent-signal)]"
                >
                  <div className="font-serif-display text-3xl font-medium text-[var(--ink-primary)]">
                    {h.value}
                  </div>
                  <div className="mt-1 font-mono-tech text-[11px] text-[var(--ink-muted)]">
                    {h.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-signal-ring)] bg-[var(--accent-signal-soft)] px-4 py-1.5 font-mono-tech text-xs text-[var(--accent-signal)]">
                <Award className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Peer Reviewer: IEEE IAS &amp; Elsevier BSPC</span>
              </div>

              <button
                type="button"
                onClick={() => setBioOpen((v) => !v)}
                aria-expanded={bioOpen}
                className="inline-flex items-center gap-1 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-3.5 py-1.5 font-mono-tech text-xs font-medium text-[var(--ink-secondary)] transition-colors hover:border-[var(--accent-signal)] hover:text-[var(--accent-signal)]"
              >
                {bioOpen ? 'Hide summary' : 'Read summary'}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${bioOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {bioOpen && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-4 text-sm leading-relaxed text-[var(--ink-secondary)]"
              >
                {EXPERIENCE_DETAILS.summary}
              </motion.p>
            )}
          </div>

          {/* Desktop Portrait Specimen Frame */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="surface-card rounded-2xl p-3.5">
              {!photoMissing ? (
                <img
                  src={EXPERIENCE_DETAILS.photoUrl}
                  alt={EXPERIENCE_DETAILS.photoAlt}
                  loading="lazy"
                  onError={() => setPhotoMissing(true)}
                  className="aspect-[3/4] max-h-[430px] w-full rounded-xl object-cover object-top"
                />
              ) : (
                <div className="scientific-grid flex aspect-[3/4] max-h-[430px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-6 text-center">
                  <User className="h-10 w-10 text-[var(--accent-signal)]" aria-hidden="true" />
                </div>
              )}
              <div className="mt-3 flex items-center justify-between px-1 font-mono-tech text-[11px] text-[var(--ink-muted)]">
                <span>{EXPERIENCE_DETAILS.photoCaption}</span>
                <span className="text-[var(--accent-signal)]">FIG 01</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Segmented Switcher */}
        <div className="grid grid-cols-3 gap-1 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-1 lg:hidden">
          {[
            { id: 'timeline' as MobileTab, label: 'Timeline' },
            { id: 'papers' as MobileTab, label: `Papers (${PUBLICATIONS.length})` },
            { id: 'skills' as MobileTab, label: 'Skills' },
          ].map((tab) => {
            const isSelected = mobileTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setMobileTab(tab.id)}
                className="relative rounded-lg py-2 font-mono-tech text-xs font-semibold transition-colors"
              >
                {isSelected && (
                  <motion.span
                    layoutId="exp-mobile-tab"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="pointer-events-none absolute inset-0 rounded-lg bg-[var(--bg-paper)] shadow-sm"
                  />
                )}
                <span
                  className={`pointer-events-none relative z-10 ${
                    isSelected ? 'text-[var(--ink-primary)]' : 'text-[var(--ink-muted)]'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* TIMELINE + TCS RESEARCH + CONFERENCE PHOTO CAROUSEL */}
        <div className={`space-y-6 sm:space-y-10 ${mobileTab === 'timeline' ? 'block' : 'hidden lg:block'}`}>
          {/* Interactive Timeline Rail */}
          <section className="surface-card rounded-2xl p-4 sm:p-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-signal)] sm:text-xs">
                  Interactive Career Timeline
                </span>
                <h2 className="font-serif-display mt-0.5 text-xl font-medium text-[var(--ink-primary)] sm:text-3xl">
                  From Engineering Foundations to TCS Research
                </h2>
              </div>
              <span className="hidden font-mono-tech text-[10px] text-[var(--ink-muted)] sm:inline">
                SELECT NODE TO EXPLORE ROLE
              </span>
            </div>

            {/* Horizontal Year Timeline Nodes */}
            <div className="no-scrollbar relative -mx-1 flex gap-2 overflow-x-auto px-1 pb-2 md:mx-0 md:grid md:grid-cols-4 md:gap-3 md:overflow-visible md:px-0">
              {EXPERIENCE_TIMELINE.map((node) => {
                const isSelected = node.id === activeMilestone.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setActiveMilestoneId(node.id)}
                    onMouseEnter={() => {
                      if (window.innerWidth >= 1024) setActiveMilestoneId(node.id);
                    }}
                    className={`min-w-[168px] shrink-0 rounded-xl border p-3 text-left transition-all md:min-w-0 ${
                      isSelected
                        ? 'border-[var(--accent-signal)] bg-[var(--accent-signal-soft)] shadow-sm'
                        : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] hover:border-[var(--accent-signal)]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono-tech text-[10px]">
                      <span className="font-semibold text-[var(--accent-signal)]">{node.year}</span>
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isSelected
                            ? 'animate-cardiac bg-[var(--accent-signal)]'
                            : 'bg-[var(--border-hairline)]'
                        }`}
                      />
                    </div>
                    <div className="mt-1.5 truncate text-xs font-semibold text-[var(--ink-primary)] sm:text-sm">
                      {node.org}
                    </div>
                    <div className="mt-0.5 truncate font-mono-tech text-[9.5px] text-[var(--ink-muted)]">
                      {node.badge}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Milestone Card (Concise 1-line impact + expandable deep-dive) */}
            <motion.div
              key={activeMilestone.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-4 sm:p-6"
            >
              <div className="flex flex-col gap-1 border-b border-[var(--border-hairline)] pb-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 font-mono-tech text-[10.5px] font-semibold text-[var(--accent-signal)]">
                    <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{activeMilestone.org}</span>
                  </div>
                  <h3 className="font-serif-display mt-1 text-lg font-medium text-[var(--ink-primary)] sm:text-2xl">
                    {activeMilestone.role}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 font-mono-tech text-[11px] text-[var(--ink-muted)]">
                  <MapPin className="h-3 w-3 text-[var(--accent-signal)]" aria-hidden="true" />
                  {activeMilestone.location} • {activeMilestone.year}
                </span>
              </div>

              <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--ink-primary)] sm:text-base">
                {activeMilestone.impact}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--ink-secondary)] sm:text-sm">
                {activeMilestone.detail}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {activeMilestone.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-2 py-0.5 font-mono-tech text-[10px] text-[var(--ink-primary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* When TCS Research is active, show compact Interactive Workstream Explorer right inside */}
              {activeMilestone.id === 'tcs' && (
                <div className="mt-5 border-t border-[var(--border-hairline)] pt-4">
                  <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-signal)]">
                      TCS Research Workstreams (01–04)
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowStreamProblem((v) => !v)}
                      className="font-mono-tech text-[10px] font-medium text-[var(--ink-muted)] hover:text-[var(--accent-signal)]"
                    >
                      {showStreamProblem ? 'Hide problem context' : 'Show problem context'}
                    </button>
                  </div>

                  <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-2">
                    {EXPERIENCE_DETAILS.tcs.workstreams.map((ws) => {
                      const selected = ws.id === activeStream.id;
                      return (
                        <button
                          key={ws.id}
                          type="button"
                          onClick={() => setActiveStreamId(ws.id)}
                          className={`shrink-0 rounded-full border px-3 py-1 font-mono-tech text-[10.5px] font-medium transition-colors ${
                            selected
                              ? 'border-[var(--accent-signal)] bg-[var(--accent-signal)] text-[var(--btn-primary-fg)]'
                              : 'border-[var(--border-hairline)] bg-[var(--bg-paper)] text-[var(--ink-secondary)] hover:border-[var(--accent-signal)]'
                          }`}
                        >
                          {ws.code}: {ws.title.split('&')[0].trim()}
                        </button>
                      );
                    })}
                  </div>

                  <motion.div
                    key={activeStream.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className="mt-2 grid gap-2.5 sm:grid-cols-2"
                  >
                    {showStreamProblem && (
                      <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-3 sm:col-span-2">
                        <div className="font-mono-tech text-[9.5px] font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
                          Problem
                        </div>
                        <p className="mt-0.5 text-xs text-[var(--ink-secondary)]">
                          {activeStream.problem}
                        </p>
                      </div>
                    )}
                    <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-3">
                      <div className="font-mono-tech text-[9.5px] font-semibold uppercase tracking-wider text-[var(--accent-signal)]">
                        Method
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-[var(--ink-primary)]">
                        {activeStream.approach}
                      </p>
                    </div>
                    <div className="rounded-lg border border-[var(--accent-signal-ring)] bg-[var(--accent-signal-soft)] p-3">
                      <div className="font-mono-tech text-[9.5px] font-semibold uppercase tracking-wider text-[var(--accent-signal)]">
                        Outcome • {activeStream.venue}
                      </div>
                      <p className="mt-0.5 text-xs font-medium leading-relaxed text-[var(--ink-primary)]">
                        {activeStream.outcome}
                      </p>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </section>

          {/* REAL CONFERENCE PHOTO CAROUSEL (Lyon EUSIPCO 2024 + Rotterdam INTERSPEECH 2025) */}
          <ConferenceCarousel />
        </div>

        {/* PAPERS & ACHIEVEMENTS AS TACTILE OBJECT CARDS */}
        <section className={mobileTab === 'papers' ? 'block' : 'hidden lg:block'}>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-signal)] sm:text-xs">
                Achievements &amp; Peer-Reviewed Proceedings
              </span>
              <h2 className="font-serif-display mt-0.5 text-2xl font-medium text-[var(--ink-primary)] sm:text-3xl">
                Accepted Publications
              </h2>
            </div>
            <span className="hidden font-mono-tech text-xs text-[var(--ink-muted)] sm:inline">
              INTERSPEECH • EUSIPCO • IEEE IAS
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {PUBLICATIONS.map((pub, idx) => (
              <article
                key={pub.id}
                className="surface-card group flex flex-col justify-between rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--accent-signal)] sm:p-5"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[10px]">
                    <span className="rounded bg-[var(--accent-signal-soft)] px-2 py-0.5 font-semibold text-[var(--accent-signal)]">
                      {pub.venue} {pub.year}
                    </span>
                    <span className="text-[var(--ink-muted)]">
                      [{String(idx + 1).padStart(2, '0')}] {pub.location}
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-sm font-semibold leading-snug text-[var(--ink-primary)] sm:text-base">
                    {pub.title}
                  </h3>

                  <div className="mt-1.5 font-mono-tech text-[11px] text-[var(--accent-signal)]">
                    {pub.highlight}
                  </div>
                </div>

                <div className="mt-4 border-t border-[var(--border-subtle)] pt-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {pub.links.map((link) =>
                      link.url ? (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-2.5 py-1 font-mono-tech text-[10.5px] font-medium text-[var(--ink-primary)] transition-colors hover:border-[var(--accent-signal)] hover:text-[var(--accent-signal)]"
                        >
                          {link.label}
                          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                        </a>
                      ) : (
                        <span
                          key={link.label}
                          className="hidden rounded-md border border-dashed border-[var(--border-hairline)] px-2 py-1 font-mono-tech text-[10px] text-[var(--ink-muted)] sm:inline-block"
                        >
                          {link.label.replace(/\s*\(TODO\)/i, ' Pending')}
                        </span>
                      )
                    )}

                    <button
                      type="button"
                      onClick={() => setOpenBibId((prev) => (prev === pub.id ? null : pub.id))}
                      className="hidden items-center gap-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-2.5 py-1 font-mono-tech text-[10.5px] text-[var(--ink-secondary)] hover:border-[var(--accent-signal)] hover:text-[var(--ink-primary)] sm:inline-flex"
                    >
                      <BookOpen className="h-3 w-3" aria-hidden="true" />
                      BibTeX
                    </button>

                    <button
                      type="button"
                      onClick={() => copyBibtex(pub.id, pub.bibtex)}
                      className="hidden items-center gap-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-2.5 py-1 font-mono-tech text-[10.5px] text-[var(--ink-secondary)] hover:border-[var(--accent-signal)] hover:text-[var(--ink-primary)] sm:inline-flex"
                    >
                      {copiedId === pub.id ? (
                        <>
                          <Check className="h-3 w-3 text-[var(--accent-signal)]" aria-hidden="true" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" aria-hidden="true" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  {openBibId === pub.id && (
                    <pre className="mt-3 overflow-x-auto rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-2.5 font-mono-tech text-[10.5px] leading-relaxed text-[var(--ink-primary)]">
                      {pub.bibtex}
                    </pre>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* INTERACTIVE SKILL CONSTELLATION */}
        <section className={mobileTab === 'skills' ? 'block' : 'hidden lg:block'}>
          <SkillConstellation />
        </section>

        <div className="hidden justify-end lg:flex">
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[var(--accent-signal)] hover:underline"
          >
            Proceed to Contact
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};

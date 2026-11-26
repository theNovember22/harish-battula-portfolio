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
  Copy,
  MapPin,
  User,
} from 'lucide-react';
import { EXPERIENCE_DETAILS, PUBLICATIONS } from '../data/profile.js';

type MobileTab = 'research' | 'papers' | 'skills';

export const ExperiencePage: React.FC = () => {
  const [photoMissing, setPhotoMissing] = useState(false);
  const [activeStreamId, setActiveStreamId] = useState(EXPERIENCE_DETAILS.tcs.workstreams[0].id);
  const [mobileTab, setMobileTab] = useState<MobileTab>('research');
  const [openBibId, setOpenBibId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
    <div className="py-5 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Hero + Portrait Split */}
        <section className="grid items-center gap-4 pb-5 sm:gap-10 sm:pb-14 lg:grid-cols-12">
          {/* Mobile Compact Profile Header */}
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
                Professional Experience
              </span>
              <div className="mt-0.5 text-base font-semibold text-[var(--ink-primary)]">
                Harish Battula
              </div>
              <div className="mt-0.5 font-mono-tech text-[10px] text-[var(--ink-muted)]">
                3+ Yrs Research • 40+ Cohort • 4 Papers • IEEE/BSPC Reviewer
              </div>
            </div>
          </div>

          {/* Desktop Hero Text + Stats */}
          <div className="hidden min-w-0 lg:col-span-7 lg:block">
            <span className="font-mono-tech text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-signal)]">
              {EXPERIENCE_DETAILS.eyebrow}
            </span>
            <h1 className="font-serif-display mt-3 text-5xl font-medium leading-[1.08] tracking-[-0.025em] text-[var(--ink-primary)]">
              {EXPERIENCE_DETAILS.headline}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--ink-secondary)]">
              {EXPERIENCE_DETAILS.summary}
            </p>

            <div className="mt-8 grid grid-cols-4 gap-3">
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

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--accent-signal-ring)] bg-[var(--accent-signal-soft)] px-4 py-2 font-mono-tech text-xs text-[var(--accent-signal)]">
              <Award className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>Peer Reviewer: IEEE Industrial Application Society (IAS) &amp; Elsevier BSPC</span>
            </div>
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
                  className="aspect-[3/4] w-full rounded-xl object-cover"
                />
              ) : (
                <div className="scientific-grid flex aspect-[3/4] w-full flex-col items-center justify-center rounded-xl border border-dashed border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-6 text-center">
                  <User className="h-10 w-10 text-[var(--accent-signal)]" aria-hidden="true" />
                  <p className="mt-2 font-mono-tech text-xs text-[var(--ink-muted)]">
                    /public/images/harish.jpg
                  </p>
                </div>
              )}
              <div className="mt-3 flex items-center justify-between px-1 font-mono-tech text-[11px] text-[var(--ink-muted)]">
                <span>{EXPERIENCE_DETAILS.photoCaption}</span>
                <span className="text-[var(--accent-signal)]">FIG 01</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile App Segmented Switcher with Framer Motion spring pill */}
        <div className="mb-4 grid grid-cols-3 gap-1 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-1 lg:hidden">
          {[
            { id: 'research' as MobileTab, label: 'Experience' },
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
                    className="absolute inset-0 rounded-lg bg-[var(--bg-paper)] shadow-sm"
                  />
                )}
                <span
                  className={`relative z-10 ${
                    isSelected ? 'text-[var(--ink-primary)]' : 'text-[var(--ink-muted)]'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* EXPERIENCE / RESEARCH TAB (Properly highlights TCS Research + ZF Technologies on ALL viewports) */}
        <div className={mobileTab === 'research' ? 'block' : 'hidden lg:block'}>
          {/* Unified TCS Research Showcase */}
          <section className="surface-card rounded-2xl p-4 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-2 border-b border-[var(--border-subtle)] pb-4 lg:flex-row lg:items-end lg:justify-between lg:pb-6">
              <div>
                <div className="inline-flex items-center gap-2 font-mono-tech text-xs font-semibold text-[var(--accent-signal)]">
                  <Building2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{EXPERIENCE_DETAILS.tcs.organization}</span>
                </div>
                <h2 className="font-serif-display mt-1 text-xl font-medium text-[var(--ink-primary)] sm:mt-1.5 sm:text-3xl">
                  {EXPERIENCE_DETAILS.tcs.role}
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 font-mono-tech text-[11px] text-[var(--ink-muted)] lg:block lg:text-right lg:text-xs">
                <div className="inline-flex items-center gap-1.5 font-semibold text-[var(--ink-primary)] lg:justify-end">
                  <span className="animate-cardiac h-1.5 w-1.5 rounded-full bg-[var(--accent-signal)]" />
                  {EXPERIENCE_DETAILS.tcs.period}
                </div>
                <div className="inline-flex items-center gap-1 lg:mt-0.5 lg:justify-end">
                  <MapPin className="h-3 w-3 text-[var(--accent-signal)] lg:hidden" aria-hidden="true" />
                  {EXPERIENCE_DETAILS.tcs.locations}
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:mt-7 lg:grid-cols-12 lg:gap-6">
              {/* Workstream Selector: horizontal pills on mobile, stacked cards on desktop */}
              <div className="no-scrollbar -mx-1 flex min-w-0 gap-2 overflow-x-auto px-1 pb-1 lg:col-span-5 lg:mx-0 lg:flex-col lg:space-y-2 lg:overflow-visible lg:px-0 lg:pb-0">
                {EXPERIENCE_DETAILS.tcs.workstreams.map((ws) => {
                  const isSelected = ws.id === activeStream.id;
                  return (
                    <button
                      key={ws.id}
                      type="button"
                      onClick={() => setActiveStreamId(ws.id)}
                      className={`relative min-w-[190px] shrink-0 rounded-xl border p-3 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-signal)] lg:w-full lg:min-w-0 lg:p-4 ${
                        isSelected
                          ? 'border-[var(--accent-signal)] bg-[var(--accent-signal-soft)] shadow-sm'
                          : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] hover:border-[var(--accent-signal)]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono-tech text-[10px]">
                        <span className="font-semibold text-[var(--accent-signal)]">{ws.code}</span>
                        <span className="hidden text-[var(--ink-muted)] sm:inline">{ws.venue}</span>
                      </div>
                      <div className="mt-1 text-xs font-semibold text-[var(--ink-primary)] lg:text-base">
                        {ws.title}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Workstream Dossier with non-blocking entrance transition */}
              <div className="flex min-w-0 flex-col justify-between rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-4 sm:p-6 lg:col-span-7">
                <motion.div
                  key={activeStream.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-mono-tech text-[10px] font-semibold text-[var(--accent-signal)] sm:text-xs">
                    {activeStream.code} // {activeStream.venue}
                  </span>

                  <h3 className="font-serif-display mt-2 text-lg font-medium text-[var(--ink-primary)] sm:mt-3 sm:text-2xl">
                    {activeStream.title}
                  </h3>

                  <div className="mt-3 space-y-2.5 sm:mt-5 sm:space-y-4">
                    <div className="hidden rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-4 sm:block">
                      <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
                        Research Problem
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--ink-secondary)]">
                        {activeStream.problem}
                      </p>
                    </div>

                    <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-3.5 sm:p-4">
                      <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-signal)]">
                        Method
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--ink-primary)] sm:text-sm">
                        {activeStream.approach}
                      </p>
                    </div>

                    <div className="rounded-lg border border-[var(--accent-signal-ring)] bg-[var(--accent-signal-soft)] p-3.5 sm:p-4">
                      <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-signal)]">
                        Outcome
                      </div>
                      <p className="mt-1 text-xs font-medium leading-relaxed text-[var(--ink-primary)] sm:text-sm">
                        {activeStream.outcome}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3.5 flex flex-wrap gap-1.5 pt-1 sm:mt-5">
                    {activeStream.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-2 py-0.5 font-mono-tech text-[10px] text-[var(--ink-primary)] sm:px-2.5 sm:py-1 sm:text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Earlier Work — ZF Technologies */}
          <section
            className="mt-4 rounded-2xl border border-[var(--border-hairline)] p-4 sm:mt-8 sm:p-8"
            style={{ backgroundColor: 'var(--bg-tint)' }}
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:border-b sm:border-[var(--border-hairline)] sm:pb-4">
              <div>
                <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-signal)] sm:text-[11px]">
                  Earlier Work • Computer Vision
                </span>
                <h2 className="font-serif-display mt-0.5 text-lg font-medium text-[var(--ink-primary)] sm:mt-1 sm:text-2xl">
                  {EXPERIENCE_DETAILS.zf.organization} — {EXPERIENCE_DETAILS.zf.role}
                </h2>
              </div>
              <span className="font-mono-tech text-[11px] text-[var(--ink-muted)] sm:text-xs">
                {EXPERIENCE_DETAILS.zf.period} • {EXPERIENCE_DETAILS.zf.location}
              </span>
            </div>

            <p className="mt-4 hidden max-w-3xl text-base leading-relaxed text-[var(--ink-secondary)] sm:block">
              {EXPERIENCE_DETAILS.zf.summary}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4">
              {EXPERIENCE_DETAILS.zf.pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="surface-card rounded-lg px-3 py-1.5 sm:rounded-xl sm:p-4"
                >
                  <div className="text-xs font-semibold text-[var(--ink-primary)] sm:text-sm">
                    {pillar.title}
                  </div>
                  <p className="mt-1 hidden text-xs leading-relaxed text-[var(--ink-muted)] sm:block">
                    {pillar.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* PAPERS TAB */}
        <section className={`lg:mt-14 ${mobileTab === 'papers' ? 'block' : 'hidden lg:block'}`}>
          <div className="mb-4 hidden items-end justify-between lg:flex">
            <div>
              <span className="font-mono-tech text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-signal)]">
                Peer-Reviewed Proceedings
              </span>
              <h2 className="font-serif-display mt-1 text-3xl font-medium text-[var(--ink-primary)]">
                Publications
              </h2>
            </div>
            <span className="font-mono-tech text-xs text-[var(--ink-muted)]">
              4 Accepted Papers • INTERSPEECH, EUSIPCO &amp; IEEE IAS
            </span>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {PUBLICATIONS.map((pub, idx) => (
              <article
                key={pub.id}
                className="surface-card rounded-xl p-3.5 transition-colors hover:border-[var(--accent-signal)]/50 sm:p-6"
              >
                <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2 font-mono-tech text-[10px] sm:text-[11px]">
                      <span className="text-[var(--ink-muted)]">[{String(idx + 1).padStart(2, '0')}]</span>
                      <span className="rounded bg-[var(--accent-signal-soft)] px-2 py-0.5 font-semibold text-[var(--accent-signal)]">
                        {pub.venue} {pub.year}
                      </span>
                      <span className="text-[var(--ink-muted)]">{pub.location}</span>
                    </div>
                    <h3 className="mt-1.5 text-sm font-semibold leading-snug text-[var(--ink-primary)] sm:mt-2 sm:text-lg">
                      {pub.title}
                    </h3>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    {pub.links.map((link) =>
                      link.url ? (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-2.5 py-1 font-mono-tech text-[10px] font-medium text-[var(--ink-primary)] transition-colors hover:border-[var(--accent-signal)] hover:text-[var(--accent-signal)] sm:px-3 sm:py-1.5 sm:text-[11px]"
                        >
                          {link.label}
                          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                        </a>
                      ) : (
                        <span
                          key={link.label}
                          className="hidden rounded-md border border-dashed border-[var(--border-hairline)] px-2.5 py-1.5 font-mono-tech text-[11px] text-[var(--ink-muted)] sm:inline-block"
                        >
                          {link.label.replace(/\s*\(TODO\)/i, ' Pending')}
                        </span>
                      )
                    )}

                    <button
                      type="button"
                      onClick={() => setOpenBibId((prev) => (prev === pub.id ? null : pub.id))}
                      className="hidden items-center gap-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-2.5 py-1.5 font-mono-tech text-[11px] text-[var(--ink-secondary)] transition-colors hover:border-[var(--accent-signal)] hover:text-[var(--ink-primary)] sm:inline-flex"
                    >
                      <BookOpen className="h-3 w-3" aria-hidden="true" />
                      BibTeX
                    </button>

                    <button
                      type="button"
                      onClick={() => copyBibtex(pub.id, pub.bibtex)}
                      className="hidden items-center gap-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-2.5 py-1.5 font-mono-tech text-[11px] text-[var(--ink-secondary)] transition-colors hover:border-[var(--accent-signal)] hover:text-[var(--ink-primary)] sm:inline-flex"
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
                </div>

                {openBibId === pub.id && (
                  <pre className="mt-4 overflow-x-auto rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-3 font-mono-tech text-[11px] leading-relaxed text-[var(--ink-primary)]">
                    {pub.bibtex}
                  </pre>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* SKILLS TAB */}
        <section className={`lg:mt-14 ${mobileTab === 'skills' ? 'block' : 'hidden lg:block'}`}>
          <h2 className="font-serif-display mb-5 hidden text-3xl font-medium text-[var(--ink-primary)] lg:block">
            Technical Capabilities
          </h2>
          <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-4">
            {EXPERIENCE_DETAILS.skillGroups.map((sg) => (
              <div key={sg.group} className="surface-card rounded-xl p-3.5 sm:rounded-2xl sm:p-5">
                <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-signal)] sm:text-[11px]">
                  {sg.group}
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3">
                  {sg.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-2 py-0.5 font-mono-tech text-[11px] text-[var(--ink-primary)] sm:px-2.5 sm:py-1 sm:text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 hidden justify-end lg:flex">
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

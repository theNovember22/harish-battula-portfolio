import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown, GraduationCap, MapPin } from 'lucide-react';
import { EDUCATION_PAGE_DATA } from '../data/profile.js';
import { LoadHorizonVisual } from '../visuals/LoadHorizonVisual';

export const EducationPage: React.FC = () => {
  const { masters, bachelors, bridgeSteps } = EDUCATION_PAGE_DATA;
  const [thesisExpanded, setThesisExpanded] = useState(false);

  return (
    <div className="py-5 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="max-w-3xl pb-4 sm:pb-10">
          <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-signal)] sm:text-xs sm:tracking-[0.16em]">
            {EDUCATION_PAGE_DATA.eyebrow}
          </span>
          <h1 className="font-serif-display mt-1.5 text-2xl font-medium leading-[1.12] tracking-[-0.025em] text-[var(--ink-primary)] sm:mt-3 sm:text-5xl">
            <span className="md:hidden">From power grids to human signals.</span>
            <span className="hidden md:inline">{EDUCATION_PAGE_DATA.headline}</span>
          </h1>
          <p className="mt-2.5 hidden text-base leading-relaxed text-[var(--ink-secondary)] md:block">
            {EDUCATION_PAGE_DATA.subline}
          </p>
        </div>

        {/* M.Tech. Card */}
        <section className="surface-card rounded-2xl p-4 sm:p-8 lg:p-10">
          <div className="grid items-center gap-5 lg:grid-cols-12 lg:gap-8">
            <div className="order-2 lg:order-1 lg:col-span-6">
              <div className="flex flex-wrap items-center gap-2 font-mono-tech text-[10px] sm:text-xs">
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-signal-soft)] px-2.5 py-0.5 font-semibold text-[var(--accent-signal)] sm:px-3 sm:py-1">
                  <GraduationCap className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                  {masters.period}
                </span>
                <span className="hidden items-center gap-1 text-[var(--ink-muted)] sm:inline-flex">
                  <MapPin className="h-3.5 w-3.5 text-[var(--accent-signal)]" aria-hidden="true" />
                  {masters.location}
                </span>
              </div>

              <div className="mt-2.5 flex items-start justify-between gap-3 sm:mt-4">
                <div className="min-w-0">
                  <h2 className="font-serif-display text-xl font-medium tracking-tight text-[var(--ink-primary)] sm:text-3xl">
                    {masters.institution}
                  </h2>
                  <p className="mt-0.5 font-mono-tech text-[11px] font-medium text-[var(--ink-secondary)] sm:text-xs">
                    {masters.degree} — {masters.field}
                  </p>
                </div>

                <div className="shrink-0 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3 py-2 text-right sm:px-4 sm:py-2.5">
                  <span className="font-mono-tech text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-signal)] sm:text-[10px]">
                    CGPA
                  </span>
                  <div className="mt-0.5 flex items-baseline justify-end gap-0.5 sm:gap-1">
                    <span className="font-serif-display text-xl font-medium tracking-tight text-[var(--ink-primary)] sm:text-3xl">
                      {masters.cgpa}
                    </span>
                    <span className="font-mono-tech text-[10px] text-[var(--ink-muted)] sm:text-xs">
                      {masters.cgpaScale}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded-xl border-l-2 border-[var(--accent-signal)] bg-[var(--bg-subtle)] px-3 py-2.5 sm:mt-5 sm:px-4 sm:py-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-tech text-[9.5px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-signal)] sm:text-[10px]">
                    Master’s Thesis
                  </span>
                  <button
                    type="button"
                    onClick={() => setThesisExpanded((v) => !v)}
                    aria-expanded={thesisExpanded}
                    className="inline-flex items-center gap-1 font-mono-tech text-[10px] font-medium text-[var(--ink-muted)] hover:text-[var(--accent-signal)]"
                  >
                    {thesisExpanded ? 'Hide abstract' : 'Details'}
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${thesisExpanded ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div className="mt-0.5 text-xs font-semibold text-[var(--ink-primary)] sm:mt-1 sm:text-base">
                  {masters.thesisTitle}
                </div>
                {thesisExpanded && (
                  <p className="mt-2 border-t border-[var(--border-hairline)] pt-2 text-xs leading-relaxed text-[var(--ink-secondary)]">
                    {masters.thesisSummary}
                  </p>
                )}
              </div>

              <ul className="mt-4 hidden space-y-1.5 md:block">
                {masters.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs text-[var(--ink-secondary)] sm:text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-signal)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3.5 flex flex-wrap gap-4 border-t border-[var(--border-subtle)] pt-3 sm:mt-5 sm:pt-4">
                <a
                  href={masters.links[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono-tech text-[11px] font-semibold text-[var(--accent-signal)] hover:underline sm:text-xs"
                >
                  {masters.links[0].label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href={masters.links[1].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden items-center gap-1 font-mono-tech text-xs font-semibold text-[var(--accent-signal)] hover:underline sm:inline-flex"
                >
                  {masters.links[1].label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-6">
              <LoadHorizonVisual />
            </div>
          </div>
        </section>

        {/* B.Tech. Card */}
        <section className="surface-card mt-3.5 rounded-2xl p-4 sm:mt-6 sm:p-8">
          <div className="flex items-center justify-between gap-3 md:grid md:grid-cols-12 md:gap-6">
            <div className="min-w-0 md:col-span-8">
              <span className="font-mono-tech text-[10px] font-semibold text-[var(--ink-muted)] sm:text-xs">
                {bachelors.period}
              </span>
              <h2 className="font-serif-display mt-1 text-lg font-medium text-[var(--ink-primary)] sm:mt-2 sm:text-3xl">
                {bachelors.institution}
              </h2>
              <p className="mt-0.5 font-mono-tech text-[11px] font-medium text-[var(--ink-secondary)] sm:text-xs">
                {bachelors.degree} — {bachelors.field}
              </p>
              <p className="mt-2.5 hidden max-w-2xl text-sm leading-relaxed text-[var(--ink-secondary)] md:block">
                {bachelors.summary}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0.75, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3.5 py-2.5 text-right sm:p-6 md:col-span-4"
            >
              <span className="font-mono-tech text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-signal)] sm:text-[10px]">
                CGPA
              </span>
              <div className="mt-0.5 flex items-baseline justify-end gap-0.5 sm:mt-2 sm:gap-1">
                <span className="font-serif-display text-2xl font-medium tracking-tight text-[var(--ink-primary)] sm:text-5xl">
                  {bachelors.cgpa}
                </span>
                <span className="font-mono-tech text-[11px] text-[var(--ink-muted)] sm:text-sm">
                  {bachelors.cgpaScale}
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Desktop Visual Progression Strip */}
        <section
          className="mt-10 hidden rounded-2xl border border-[var(--border-hairline)] p-8 md:block"
          style={{ backgroundColor: 'var(--bg-tint)' }}
        >
          <div className="mb-5 flex items-center justify-between">
            <span className="font-mono-tech text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-signal)]">
              How Training Built Into Research
            </span>
            <Link
              to="/experience"
              className="inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[var(--ink-primary)] hover:text-[var(--accent-signal)]"
            >
              Open Experience Timeline &amp; Photos
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {bridgeSteps.map((b, idx) => (
              <div
                key={b.step}
                className="surface-card group relative rounded-xl p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--accent-signal)]"
              >
                <div className="flex items-center justify-between font-mono-tech text-[11px] font-semibold text-[var(--accent-signal)]">
                  <span>{b.step}</span>
                  {idx < bridgeSteps.length - 1 && (
                    <ArrowRight className="hidden h-3 w-3 text-[var(--ink-muted)] lg:inline" />
                  )}
                </div>
                <div className="mt-1.5 text-sm font-semibold text-[var(--ink-primary)]">{b.title}</div>
                <div className="mt-1 text-xs text-[var(--ink-muted)]">{b.detail}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

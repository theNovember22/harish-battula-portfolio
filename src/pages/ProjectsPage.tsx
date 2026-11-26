import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  CHAPTER_01,
  CHAPTER_02,
  CHAPTER_03,
  CHAPTER_04,
  CHAPTER_05,
  CHAPTER_06,
  PROJECT_CHAPTERS_META,
} from '../data/profile.js';
import { ChapterShell } from '../components/ChapterShell';
import { ThreeTrackSignalVisual } from '../visuals/ThreeTrackSignalVisual';
import { ConfidenceSpectrogramVisual } from '../visuals/ConfidenceSpectrogramVisual';
import { TranscriptToGraphVisual } from '../visuals/TranscriptToGraphVisual';
import { StethoscopeDysarthriaVisual } from '../visuals/StethoscopeDysarthriaVisual';
import { ShapSignalVisual } from '../visuals/ShapSignalVisual';
import { TrajectoryCurveVisual } from '../visuals/TrajectoryCurveVisual';

export const ProjectsPage: React.FC = () => {
  const [techMode, setTechMode] = useState<'simple' | 'technical'>('simple');
  const [activeId, setActiveId] = useState<string>('speech-hr');
  const [direction, setDirection] = useState(1);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace(/^#/, '');
      if (PROJECT_CHAPTERS_META.some((c) => c.id === targetId)) {
        setActiveId(targetId);
        const el = document.getElementById(targetId);
        if (el && window.innerWidth >= 768) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }, [hash]);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]'));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = visible[0].target.getAttribute('data-chapter');
          if (id) setActiveId(id);
        }
      },
      { threshold: [0.3, 0.55] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const activeIdx = Math.max(
    0,
    PROJECT_CHAPTERS_META.findIndex((c) => c.id === activeId)
  );

  const selectChapter = (id: string) => {
    const nextIdx = PROJECT_CHAPTERS_META.findIndex((c) => c.id === id);
    if (nextIdx !== -1) {
      setDirection(nextIdx >= activeIdx ? 1 : -1);
    }
    setActiveId(id);
    if (window.innerWidth >= 768) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const mobileChapters = [
    {
      id: 'speech-hr',
      tag: 'CH 01 • EUSIPCO 2024',
      question: CHAPTER_01.question,
      summary:
        'Synchronized speech, ECG & PPG (40+ participants) separating breathing and heart rate via ICA across rest vs. exercise.',
      linkText: CHAPTER_01.linkText,
      linkUrl: CHAPTER_01.linkUrl,
      visual: <ThreeTrackSignalVisual />,
    },
    {
      id: 'confidence',
      tag: 'CH 02 • INTERSPEECH 2025',
      question: CHAPTER_02.question,
      summary:
        'Quantifies heart-rate responses alongside vocal acoustics as a physiological proxy for speaker confidence.',
      linkText: CHAPTER_02.linkText,
      linkUrl: CHAPTER_02.linkUrl,
      visual: <ConfidenceSpectrogramVisual />,
    },
    {
      id: 'alzheimers',
      tag: 'CH 03 • EUSIPCO 2026',
      question: CHAPTER_03.question,
      summary:
        techMode === 'simple'
          ? CHAPTER_03.simpleExplanation
          : CHAPTER_03.technicalExplanation,
      linkText: CHAPTER_03.linkText,
      linkUrl: CHAPTER_03.linkUrl,
      hasToggle: true,
      visual: (
        <TranscriptToGraphVisual
          tokens={CHAPTER_03.sampleTranscriptTokens}
          accuracyLabel={CHAPTER_03.accuracyCallout}
        />
      ),
    },
    {
      id: 'stethoscope',
      tag: 'CH 04 • PCG & DYSARTHRIA',
      question: CHAPTER_04.question,
      summary:
        'PCG murmur detection and CAD acoustic indicators alongside ML pipelines for dysarthria speech severity.',
      linkText: CHAPTER_04.linkText,
      linkUrl: CHAPTER_04.linkUrl,
      visual: <StethoscopeDysarthriaVisual />,
    },
    {
      id: 'trust',
      tag: 'CH 05 • TRUSTWORTHY ML',
      question: CHAPTER_05.question,
      summary:
        'SHAP and LIME attributions mapped directly onto physiological signals toward uncertainty-aware, fair ML.',
      linkText: CHAPTER_05.linkText,
      linkUrl: CHAPTER_05.linkUrl,
      visual: <ShapSignalVisual features={CHAPTER_05.shapFeatures} />,
    },
    {
      id: 'vision',
      tag: 'CH 06 • RESEARCH VISION',
      question: CHAPTER_06.question,
      summary:
        'Extending multimodal sensing to longitudinal disease progression under sparse, irregular observations alongside clinicians.',
      visual: <TrajectoryCurveVisual />,
    },
  ];

  const activeMobileChapter = mobileChapters[activeIdx] ?? mobileChapters[0];
  const prevChapter = activeIdx > 0 ? PROJECT_CHAPTERS_META[activeIdx - 1] : null;
  const nextChapter =
    activeIdx < PROJECT_CHAPTERS_META.length - 1 ? PROJECT_CHAPTERS_META[activeIdx + 1] : null;

  return (
    <div className="relative">
      {/* Sticky Chapter Pill Rail */}
      <div
        className="sticky top-[55px] z-30 border-b border-[var(--border-hairline)] backdrop-blur-md transition-colors duration-200 md:static"
        style={{ backgroundColor: 'var(--bg-header)' }}
      >
        <div className="mx-auto max-w-6xl px-4 py-2.5 sm:px-6 md:py-8 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="hidden md:block">
              <span className="font-mono-tech text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-signal)]">
                Research Projects • Chapters 01–06
              </span>
              <h1 className="font-serif-display mt-2 text-3xl font-medium tracking-tight text-[var(--ink-primary)] sm:text-4xl">
                Six questions from voice to clinical trust.
              </h1>
            </div>
            <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0">
              {PROJECT_CHAPTERS_META.map((ch) => {
                const isActive = activeId === ch.id;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => selectChapter(ch.id)}
                    className="relative shrink-0 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-3 py-1.5 font-mono-tech text-[11px] font-medium transition-colors hover:border-[var(--accent-signal)] lg:rounded-md lg:px-2.5"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="project-pill-active"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-[var(--accent-signal)] lg:rounded-[5px]"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`relative z-10 ${
                        isActive ? 'text-[var(--btn-primary-fg)] font-semibold' : 'text-[var(--ink-secondary)]'
                      }`}
                    >
                      {ch.code} {ch.shortTitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP FLOATING RIGHT-EDGE CHAPTER TELEMETRY RULER */}
      <aside
        aria-label="Chapter quick ruler"
        className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-2.5 xl:flex"
      >
        {PROJECT_CHAPTERS_META.map((ch) => {
          const isActive = activeId === ch.id;
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => selectChapter(ch.id)}
              title={`${ch.code} ${ch.shortTitle}`}
              className="group flex items-center gap-2 focus:outline-none"
            >
              <span
                className={`font-mono-tech text-[10px] transition-opacity ${
                  isActive
                    ? 'opacity-100 font-semibold text-[var(--accent-signal)]'
                    : 'opacity-0 text-[var(--ink-muted)] group-hover:opacity-100'
                }`}
              >
                {ch.code}
              </span>
              <span
                className={`block rounded-full transition-all ${
                  isActive
                    ? 'h-2.5 w-6 bg-[var(--accent-signal)]'
                    : 'h-2 w-2 bg-[var(--border-hairline)] group-hover:bg-[var(--accent-signal)]'
                }`}
              />
            </button>
          );
        })}
      </aside>

      {/* MOBILE APP VIEW: Only 1 focused chapter at a time with instant non-blocking slide transition */}
      <section className="py-5 md:hidden">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            key={activeMobileChapter.id}
            initial={{ opacity: 0, x: direction * 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {activeMobileChapter.visual}

            <div className="surface-card rounded-2xl p-4">
              <span className="font-mono-tech text-[10px] font-semibold tracking-[0.14em] text-[var(--accent-signal)]">
                {activeMobileChapter.tag}
              </span>
              <h1 className="font-serif-display mt-1 text-2xl font-medium leading-tight text-[var(--ink-primary)]">
                {activeMobileChapter.question}
              </h1>

              {activeMobileChapter.hasToggle && (
                <div className="mt-2.5 inline-flex rounded-md border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-0.5">
                  <button
                    type="button"
                    onClick={() => setTechMode('simple')}
                    className={`rounded px-2.5 py-1 font-mono-tech text-[10px] font-medium transition-colors ${
                      techMode === 'simple'
                        ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)]'
                        : 'text-[var(--ink-secondary)]'
                    }`}
                  >
                    Simple
                  </button>
                  <button
                    type="button"
                    onClick={() => setTechMode('technical')}
                    className={`rounded px-2.5 py-1 font-mono-tech text-[10px] font-medium transition-colors ${
                      techMode === 'technical'
                        ? 'bg-[var(--accent-signal)] text-[var(--btn-primary-fg)]'
                        : 'text-[var(--ink-secondary)]'
                    }`}
                  >
                    Technical
                  </button>
                </div>
              )}

              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
                {activeMobileChapter.summary}
              </p>

              {activeMobileChapter.linkUrl && (
                <a
                  href={activeMobileChapter.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 font-mono-tech text-xs font-semibold text-[var(--accent-signal)] hover:underline"
                >
                  {activeMobileChapter.linkText}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Mobile Chapter Stepper */}
          <div className="flex items-center justify-between gap-2 pt-4">
            {prevChapter ? (
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => selectChapter(prevChapter.id)}
                className="surface-card inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 font-mono-tech text-[11px] font-medium text-[var(--ink-primary)]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {prevChapter.code} {prevChapter.shortTitle}
              </motion.button>
            ) : (
              <div />
            )}
            {nextChapter ? (
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => selectChapter(nextChapter.id)}
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--btn-primary-bg)] px-3.5 py-2 font-mono-tech text-[11px] font-semibold text-[var(--btn-primary-fg)]"
              >
                {nextChapter.code} {nextChapter.shortTitle}
                <ArrowRight className="h-3.5 w-3.5" />
              </motion.button>
            ) : (
              <Link
                to="/education"
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-signal)] px-3.5 py-2 font-mono-tech text-[11px] font-semibold text-[var(--btn-primary-fg)]"
              >
                Education
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* DESKTOP VIEW: Full 6-chapter editorial scroll experience */}
      <div className="hidden md:block">
        <ChapterShell id="speech-hr" tinted>
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[var(--accent-signal)]">
                {CHAPTER_01.code}
              </span>
              <h2 className="font-serif-display mt-2 text-4xl font-medium leading-tight tracking-tight text-[var(--ink-primary)]">
                {CHAPTER_01.question}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--ink-secondary)]">
                {CHAPTER_01.answer}
              </p>
              <p className="mt-4 font-mono-tech text-xs text-[var(--ink-muted)]">
                {CHAPTER_01.citationLabel}
              </p>
              <a
                href={CHAPTER_01.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[var(--accent-signal)] hover:underline"
              >
                {CHAPTER_01.linkText}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
            <div className="lg:col-span-7">
              <ThreeTrackSignalVisual />
            </div>
          </div>
        </ChapterShell>

        <ChapterShell id="confidence">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="order-2 lg:order-1 lg:col-span-7">
              <ConfidenceSpectrogramVisual />
            </div>
            <div className="order-1 lg:order-2 lg:col-span-5">
              <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[var(--accent-signal)]">
                {CHAPTER_02.code}
              </span>
              <h2 className="font-serif-display mt-2 text-4xl font-medium leading-tight tracking-tight text-[var(--ink-primary)]">
                {CHAPTER_02.question}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--ink-secondary)]">
                {CHAPTER_02.answer}
              </p>
              <p className="mt-4 font-mono-tech text-xs text-[var(--ink-muted)]">
                {CHAPTER_02.citationLabel}
              </p>
              <a
                href={CHAPTER_02.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[var(--accent-signal)] hover:underline"
              >
                {CHAPTER_02.linkText}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </ChapterShell>

        <ChapterShell id="alzheimers" tinted>
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[var(--accent-signal)]">
                {CHAPTER_03.code}
              </span>
              <h2 className="font-serif-display mt-2 text-4xl font-medium leading-tight tracking-tight text-[var(--ink-primary)]">
                {CHAPTER_03.question}
              </h2>
              <div className="mt-4 inline-flex rounded-md border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-0.5">
                {(['simple', 'technical'] as const).map((modeOption) => {
                  const isSelected = techMode === modeOption;
                  return (
                    <button
                      key={modeOption}
                      type="button"
                      onClick={() => setTechMode(modeOption)}
                      className="relative rounded px-3 py-1 font-mono-tech text-[11px] font-medium transition-colors"
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="tech-mode-pill"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                          className={`absolute inset-0 rounded ${
                            modeOption === 'technical'
                              ? 'bg-[var(--accent-signal)]'
                              : 'bg-[var(--btn-primary-bg)]'
                          }`}
                        />
                      )}
                      <span
                        className={`relative z-10 ${
                          isSelected ? 'text-[var(--btn-primary-fg)]' : 'text-[var(--ink-secondary)]'
                        }`}
                      >
                        {modeOption === 'simple' ? 'Explain simply' : 'Show technical'}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-base leading-relaxed text-[var(--ink-secondary)]">
                {techMode === 'simple'
                  ? CHAPTER_03.simpleExplanation
                  : CHAPTER_03.technicalExplanation}
              </p>
              <p className="mt-4 font-mono-tech text-xs text-[var(--ink-muted)]">
                {CHAPTER_03.citationLabel}
              </p>
              <a
                href={CHAPTER_03.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[var(--accent-signal)] hover:underline"
              >
                {CHAPTER_03.linkText}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
            <div className="lg:col-span-7">
              <TranscriptToGraphVisual
                tokens={CHAPTER_03.sampleTranscriptTokens}
                accuracyLabel={CHAPTER_03.accuracyCallout}
              />
            </div>
          </div>
        </ChapterShell>

        <ChapterShell id="stethoscope">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="order-2 lg:order-1 lg:col-span-7">
              <StethoscopeDysarthriaVisual />
            </div>
            <div className="order-1 lg:order-2 lg:col-span-5">
              <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[var(--accent-signal)]">
                {CHAPTER_04.code}
              </span>
              <h2 className="font-serif-display mt-2 text-4xl font-medium leading-tight tracking-tight text-[var(--ink-primary)]">
                {CHAPTER_04.question}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--ink-secondary)]">
                {CHAPTER_04.answer}
              </p>
              <a
                href={CHAPTER_04.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[var(--accent-signal)] hover:underline"
              >
                {CHAPTER_04.linkText}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </ChapterShell>

        <ChapterShell id="trust" tinted>
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[var(--accent-signal)]">
                {CHAPTER_05.code}
              </span>
              <h2 className="font-serif-display mt-2 text-4xl font-medium leading-tight tracking-tight text-[var(--ink-primary)]">
                {CHAPTER_05.question}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--ink-secondary)]">
                {CHAPTER_05.answer}
              </p>
              <a
                href={CHAPTER_05.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[var(--accent-signal)] hover:underline"
              >
                {CHAPTER_05.linkText}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
            <div className="lg:col-span-7">
              <ShapSignalVisual features={CHAPTER_05.shapFeatures} />
            </div>
          </div>
        </ChapterShell>

        <ChapterShell id="vision">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="order-2 lg:order-1 lg:col-span-7">
              <TrajectoryCurveVisual />
              <div className="mt-3 grid grid-cols-4 gap-2.5">
                {CHAPTER_06.milestones.map((m) => (
                  <div key={m.label} className="surface-card rounded-lg px-3 py-2.5">
                    <div className="text-xs font-semibold text-[var(--ink-primary)]">{m.label}</div>
                    <div className="mt-0.5 font-mono-tech text-[10px] text-[var(--ink-muted)]">
                      {m.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-5">
              <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[var(--accent-signal)]">
                {CHAPTER_06.code}
              </span>
              <h2 className="font-serif-display mt-2 text-4xl font-medium leading-tight tracking-tight text-[var(--ink-primary)]">
                {CHAPTER_06.question}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--ink-secondary)]">
                {CHAPTER_06.answerFirstPerson}
              </p>
              <Link
                to="/experience"
                className="mt-5 inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[var(--accent-signal)] hover:underline"
              >
                Explore professional experience
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </ChapterShell>
      </div>
    </div>
  );
};

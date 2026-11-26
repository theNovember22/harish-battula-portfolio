import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
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
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace(/^#/, '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveId(targetId);
      }
    }
  }, [hash]);

  useEffect(() => {
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

  const scrollToChapter = (id: string) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      {/* Projects Page Sub-Header + Sticky Mobile Chapter Pill Rail */}
      <div className="border-b border-[#E4E1D8] bg-white/85">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="font-mono-tech text-xs font-semibold uppercase tracking-[0.14em] text-[#0F766E]">
                Research Projects • Chapters 01–06
              </span>
              <h1 className="font-serif-display mt-2 text-2xl font-medium tracking-tight text-[#111318] sm:text-4xl">
                Six questions from voice to clinical trust.
              </h1>
            </div>
            <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0">
              {PROJECT_CHAPTERS_META.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => scrollToChapter(ch.id)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 font-mono-tech text-[11px] font-medium transition-colors lg:rounded-md lg:px-2.5 ${
                    activeId === ch.id
                      ? 'border-[#0F766E] bg-[#0F766E] text-white'
                      : 'border-[#E4E1D8] bg-[#FAF9F6] text-[#434956] hover:border-[#0F766E]'
                  }`}
                >
                  {ch.code} {ch.shortTitle}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 1. CAN A VOICE REVEAL A HEARTBEAT? */}
      <ChapterShell id="speech-hr" tinted>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[#0F766E]">
              {CHAPTER_01.code}
            </span>
            <h2 className="font-serif-display mt-2 text-3xl font-medium leading-tight tracking-tight text-[#111318] sm:text-4xl">
              {CHAPTER_01.question}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#434956]">
              {CHAPTER_01.answer}
            </p>
            <p className="mt-4 font-mono-tech text-xs text-[#6B7280]">
              {CHAPTER_01.citationLabel}
            </p>
            <a
              href={CHAPTER_01.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
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

      {/* 2. CAN HEARTBEAT REVEAL CONFIDENCE? */}
      <ChapterShell id="confidence">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <ConfidenceSpectrogramVisual />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[#0F766E]">
              {CHAPTER_02.code}
            </span>
            <h2 className="font-serif-display mt-2 text-3xl font-medium leading-tight tracking-tight text-[#111318] sm:text-4xl">
              {CHAPTER_02.question}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#434956]">
              {CHAPTER_02.answer}
            </p>
            <p className="mt-4 font-mono-tech text-xs text-[#6B7280]">
              {CHAPTER_02.citationLabel}
            </p>
            <a
              href={CHAPTER_02.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
            >
              {CHAPTER_02.linkText}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </ChapterShell>

      {/* 3. CAN THE WAY WE TALK REVEAL ALZHEIMER'S? */}
      <ChapterShell id="alzheimers" tinted>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[#0F766E]">
              {CHAPTER_03.code}
            </span>
            <h2 className="font-serif-display mt-2 text-3xl font-medium leading-tight tracking-tight text-[#111318] sm:text-4xl">
              {CHAPTER_03.question}
            </h2>

            <div className="mt-4 inline-flex rounded-md border border-[#E4E1D8] bg-white p-0.5">
              <button
                type="button"
                onClick={() => setTechMode('simple')}
                className={`rounded px-3 py-1 font-mono-tech text-[11px] font-medium transition-colors ${
                  techMode === 'simple'
                    ? 'bg-[#111318] text-white'
                    : 'text-[#434956] hover:text-[#111318]'
                }`}
              >
                Explain simply
              </button>
              <button
                type="button"
                onClick={() => setTechMode('technical')}
                className={`rounded px-3 py-1 font-mono-tech text-[11px] font-medium transition-colors ${
                  techMode === 'technical'
                    ? 'bg-[#0F766E] text-white'
                    : 'text-[#434956] hover:text-[#111318]'
                }`}
              >
                Show technical
              </button>
            </div>

            <p className="mt-4 text-base leading-relaxed text-[#434956]">
              {techMode === 'simple'
                ? CHAPTER_03.simpleExplanation
                : CHAPTER_03.technicalExplanation}
            </p>
            <p className="mt-4 font-mono-tech text-xs text-[#6B7280]">
              {CHAPTER_03.citationLabel}
            </p>
            <a
              href={CHAPTER_03.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
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

      {/* 4. WHAT CAN A STETHOSCOPE SOUND TELL US? */}
      <ChapterShell id="stethoscope">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <StethoscopeDysarthriaVisual />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[#0F766E]">
              {CHAPTER_04.code}
            </span>
            <h2 className="font-serif-display mt-2 text-3xl font-medium leading-tight tracking-tight text-[#111318] sm:text-4xl">
              {CHAPTER_04.question}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#434956]">
              {CHAPTER_04.answer}
            </p>
            <a
              href={CHAPTER_04.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
            >
              {CHAPTER_04.linkText}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </ChapterShell>

      {/* 5. WHY SHOULD ANYONE TRUST THE MODEL? */}
      <ChapterShell id="trust" tinted>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[#0F766E]">
              {CHAPTER_05.code}
            </span>
            <h2 className="font-serif-display mt-2 text-3xl font-medium leading-tight tracking-tight text-[#111318] sm:text-4xl">
              {CHAPTER_05.question}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#434956]">
              {CHAPTER_05.answer}
            </p>
            <a
              href={CHAPTER_05.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
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

      {/* 6. WHERE IS THIS GOING? */}
      <ChapterShell id="vision">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <TrajectoryCurveVisual />
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {CHAPTER_06.milestones.map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-[#E4E1D8] bg-white px-3 py-2.5"
                >
                  <div className="text-xs font-semibold text-[#111318]">{m.label}</div>
                  <div className="mt-0.5 font-mono-tech text-[10px] text-[#6B7280]">{m.detail}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[#0F766E]">
              {CHAPTER_06.code}
            </span>
            <h2 className="font-serif-display mt-2 text-3xl font-medium leading-tight tracking-tight text-[#111318] sm:text-4xl">
              {CHAPTER_06.question}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#434956]">
              {CHAPTER_06.answerFirstPerson}
            </p>
            <Link
              to="/experience"
              className="mt-5 inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
            >
              Explore professional experience &amp; publications
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </ChapterShell>
    </div>
  );
};

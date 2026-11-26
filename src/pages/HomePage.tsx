import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileDown } from 'lucide-react';
import { HERO_CONTENT, PROFILE, PROJECT_CHAPTERS_META } from '../data/profile.js';
import { MorphWaveformCanvas } from '../visuals/MorphWaveformCanvas';

export const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero — preserved exactly as approved */}
      <section
        id="hero"
        className="flex min-h-[calc(100svh-3.75rem)] flex-col justify-center py-10 sm:py-12"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0F766E] sm:text-xs">
              {HERO_CONTENT.eyebrow}
            </p>
            <h1 className="font-serif-display mt-3 text-4xl font-medium leading-[1.06] tracking-[-0.025em] text-[#111318] sm:text-6xl lg:text-[66px]">
              {HERO_CONTENT.headline}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#434956] sm:text-lg">
              {HERO_CONTENT.subline}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-lg bg-[#111318] px-5 py-3 font-mono-tech text-xs font-semibold tracking-wider text-white transition-colors hover:bg-[#0F766E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
              >
                {HERO_CONTENT.primaryCta}
              </Link>
              <a
                href={PROFILE.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono-tech text-xs font-medium text-[#434956] underline-offset-4 hover:text-[#0F766E] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] rounded px-1 py-1"
              >
                <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
                {HERO_CONTENT.secondaryCta}
              </a>
            </div>
          </div>

          {/* Live Speech-to-Heartbeat Waveform */}
          <div className="mt-8 sm:mt-10">
            <MorphWaveformCanvas />
          </div>

          {/* Compact 4-Fact Strip */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PROFILE.quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-lg border border-[#E4E1D8] bg-white/80 px-3.5 py-2.5"
              >
                <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[#6B7280]">
                  {fact.label}
                </div>
                <div className="mt-0.5 text-xs font-semibold text-[#111318] sm:text-[13px]">
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subtle Curiosity Arc Preview Gateway below Hero */}
      <section className="border-t border-[#E4E1D8] bg-[#F2EFE8]/45 py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0F766E]">
                Curiosity Arc • Chapters 01–06
              </span>
              <h2 className="font-serif-display mt-1 text-2xl font-medium text-[#111318] sm:text-3xl">
                Follow the research chapters
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
            >
              Open all 6 chapters
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
            {PROJECT_CHAPTERS_META.map((ch) => (
              <Link
                key={ch.id}
                to={`/projects#${ch.id}`}
                className="group flex min-w-[235px] shrink-0 snap-start items-center justify-between rounded-2xl border border-[#E4E1D8] bg-white px-4 py-4 shadow-sm transition-all hover:border-[#0F766E] sm:min-w-0 sm:rounded-xl sm:py-3.5 sm:shadow-none"
              >
                <div>
                  <span className="font-mono-tech text-[10px] font-semibold text-[#0F766E]">
                    CHAPTER {ch.code}
                  </span>
                  <div className="mt-0.5 text-sm font-semibold text-[#111318] group-hover:text-[#0F766E]">
                    {ch.shortTitle}
                  </div>
                </div>
                <ArrowRight
                  className="h-4 w-4 text-[#6B7280] transition-transform group-hover:translate-x-0.5 group-hover:text-[#0F766E]"
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

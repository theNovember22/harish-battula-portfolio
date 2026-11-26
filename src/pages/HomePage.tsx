import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileDown } from 'lucide-react';
import { HERO_CONTENT, PROFILE, PROJECT_CHAPTERS_META } from '../data/profile.js';
import { MorphWaveformCanvas } from '../visuals/MorphWaveformCanvas';

export const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero — compact, single-screen on mobile; editorial full-viewport on desktop */}
      <section
        id="hero"
        className="flex flex-col justify-center py-6 sm:py-10 md:min-h-[calc(100svh-3.75rem)] md:py-12"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0F766E] sm:text-xs sm:tracking-[0.16em]">
              {HERO_CONTENT.eyebrow}
            </p>
            <h1 className="font-serif-display mt-2 text-3xl font-medium leading-[1.08] tracking-[-0.025em] text-[#111318] sm:mt-3 sm:text-6xl lg:text-[66px]">
              {HERO_CONTENT.headline}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#434956] sm:mt-4 sm:text-lg">
              {HERO_CONTENT.subline}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6 sm:gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-lg bg-[#111318] px-4 py-2.5 font-mono-tech text-xs font-semibold tracking-wider text-white transition-colors hover:bg-[#0F766E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] sm:px-5 sm:py-3"
              >
                {HERO_CONTENT.primaryCta}
              </Link>
              <a
                href={PROFILE.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded px-1 py-1 font-mono-tech text-xs font-medium text-[#434956] underline-offset-4 hover:text-[#0F766E] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
              >
                <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
                {HERO_CONTENT.secondaryCta}
              </a>
            </div>
          </div>

          {/* Live Speech-to-Heartbeat Waveform */}
          <div className="mt-6 sm:mt-10">
            <MorphWaveformCanvas />
          </div>

          {/* Compact 4-Fact Strip */}
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-5 sm:gap-3 sm:grid-cols-4">
            {PROFILE.quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-lg border border-[#E4E1D8] bg-white/85 px-3 py-2 sm:px-3.5 sm:py-2.5"
              >
                <div className="font-mono-tech text-[9.5px] uppercase tracking-wider text-[#6B7280] sm:text-[10px]">
                  {fact.label}
                </div>
                <div className="mt-0.5 text-[11px] font-semibold leading-snug text-[#111318] sm:text-[13px]">
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop-only Curiosity Arc Directory (Mobile uses bottom pill dock directly) */}
      <section className="hidden border-t border-[#E4E1D8] bg-[#F2EFE8]/45 py-12 md:block md:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0F766E]">
                Curiosity Arc • Chapters 01–06
              </span>
              <h2 className="font-serif-display mt-1 text-3xl font-medium text-[#111318]">
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

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {PROJECT_CHAPTERS_META.map((ch) => (
              <Link
                key={ch.id}
                to={`/projects#${ch.id}`}
                className="group flex items-center justify-between rounded-xl border border-[#E4E1D8] bg-white px-4 py-3.5 transition-all hover:border-[#0F766E]"
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

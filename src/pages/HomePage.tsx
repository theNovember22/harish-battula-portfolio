import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileDown } from 'lucide-react';
import { HERO_CONTENT, PROFILE, PROJECT_CHAPTERS_META } from '../data/profile.js';
import { MorphWaveformCanvas } from '../visuals/MorphWaveformCanvas';

export const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero — ultra-clean 1-screen mobile app layout; editorial full-viewport on desktop */}
      <section
        id="hero"
        className="flex flex-col justify-center py-5 sm:py-10 md:min-h-[calc(100svh-3.75rem)] md:py-12"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0F766E] sm:text-xs sm:tracking-[0.16em]">
              <span className="md:hidden">AI/ML Researcher • TCS Research</span>
              <span className="hidden md:inline">{HERO_CONTENT.eyebrow}</span>
            </p>
            <h1 className="font-serif-display mt-2 text-[32px] font-medium leading-[1.06] tracking-[-0.025em] text-[#111318] sm:mt-3 sm:text-6xl lg:text-[66px]">
              {HERO_CONTENT.headline}
            </h1>
            <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-[#434956] md:mt-4 md:text-lg">
              <span className="md:hidden">
                Models that listen to speech and physiological signals to detect disease earlier.
              </span>
              <span className="hidden md:inline">{HERO_CONTENT.subline}</span>
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 md:mt-6 md:gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-[#111318] px-4 py-2.5 font-mono-tech text-xs font-semibold tracking-wider text-white transition-colors hover:bg-[#0F766E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] md:rounded-lg md:px-5 md:py-3"
              >
                {HERO_CONTENT.primaryCta}
              </Link>
              <a
                href={PROFILE.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 rounded px-1 py-1 font-mono-tech text-xs font-medium text-[#434956] underline-offset-4 hover:text-[#0F766E] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] md:inline-flex"
              >
                <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
                {HERO_CONTENT.secondaryCta}
              </a>
            </div>
          </div>

          {/* Live Speech-to-Heartbeat Waveform */}
          <div className="mt-5 md:mt-10">
            <MorphWaveformCanvas />
          </div>

          {/* Mobile: Single compact inline stat strip; Desktop: 4-card grid */}
          <div className="mt-4 flex items-center justify-between gap-2 rounded-xl border border-[#E4E1D8] bg-white/90 px-3.5 py-2.5 font-mono-tech text-[11px] md:hidden">
            <div>
              <span className="font-semibold text-[#111318]">4</span>{' '}
              <span className="text-[#6B7280]">Papers</span>
            </div>
            <span className="text-[#D5D1C5]">•</span>
            <div>
              <span className="font-semibold text-[#111318]">40+</span>{' '}
              <span className="text-[#6B7280]">Cohort</span>
            </div>
            <span className="text-[#D5D1C5]">•</span>
            <div>
              <span className="font-semibold text-[#0F766E]">~91%</span>{' '}
              <span className="text-[#6B7280]">AD Set</span>
            </div>
          </div>

          <div className="mt-5 hidden grid-cols-4 gap-3 md:grid">
            {PROFILE.quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-lg border border-[#E4E1D8] bg-white/85 px-3.5 py-2.5"
              >
                <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[#6B7280]">
                  {fact.label}
                </div>
                <div className="mt-0.5 text-[13px] font-semibold leading-snug text-[#111318]">
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop-only Curiosity Arc Directory */}
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

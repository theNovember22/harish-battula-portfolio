import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, FileDown, FlaskConical } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { HeroVisual } from '../components/HeroVisual';

export const Hero: React.FC = () => {
  return (
    <section id="top" className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Left Identity & Research Positioning */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-6"
          >
            {/* Status indicators */}
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#0F766E]/30 bg-[#0F766E]/8 px-3 py-1 font-mono-tech text-[11px] font-medium text-[#0F766E]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0F766E]" />
                {PROFILE.affiliation}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E3E0D6] bg-white px-3 py-1 font-mono-tech text-[11px] text-[#434956]">
                <FlaskConical className="h-3 w-3 text-[#0F766E]" aria-hidden="true" />
                {PROFILE.tenureNote}
              </span>
            </div>

            <h1 className="font-mono-tech text-xs font-semibold uppercase tracking-[0.22em] text-[#434956] sm:text-sm">
              {PROFILE.name}
            </h1>

            <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-4xl font-semibold tracking-[-0.035em] text-[#111318] sm:text-5xl">
                {PROFILE.role}
              </span>
            </div>

            {/* Domain line */}
            <p className="mt-3 font-mono-tech text-xs font-medium tracking-wide text-[#0F766E] sm:text-[13px]">
              {PROFILE.domains.join('  •  ')}
            </p>

            {/* Primary research statement */}
            <p className="mt-5 text-lg font-medium leading-snug text-[#111318] sm:text-xl">
              {PROFILE.heroHeadline}
            </p>

            <p className="mt-3.5 text-sm leading-relaxed text-[#434956] sm:text-base">
              {PROFILE.heroSubstatement}
            </p>

            {/* Venue credentials inline */}
            <div className="mt-5 flex flex-wrap items-center gap-2 font-mono-tech text-[11px] text-[#6B7280]">
              <span className="rounded border border-[#E3E0D6] bg-white px-2 py-0.5 text-[#111318]">
                M.Tech. EE — NIT Warangal
              </span>
              <span className="rounded border border-[#E3E0D6] bg-white px-2 py-0.5 text-[#111318]">
                INTERSPEECH 2025
              </span>
              <span className="rounded border border-[#E3E0D6] bg-white px-2 py-0.5 text-[#111318]">
                EUSIPCO 2024 &amp; 2026
              </span>
            </div>

            {/* Primary CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#selected-research"
                className="inline-flex items-center gap-2 rounded-lg bg-[#111318] px-5 py-3 font-mono-tech text-xs font-semibold uppercase tracking-[0.1em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#0F766E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
              >
                View Research
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href={PROFILE.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#D5D1C5] bg-white px-5 py-3 font-mono-tech text-xs font-semibold uppercase tracking-[0.1em] text-[#111318] transition-all hover:-translate-y-0.5 hover:border-[#0F766E] hover:text-[#0F766E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
              >
                <FileDown className="h-4 w-4" aria-hidden="true" />
                Download CV
              </a>
            </div>
          </motion.div>

          {/* Right Scientific Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="lg:col-span-6"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

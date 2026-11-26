import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { FUTURE_RESEARCH_DIRECTIONS } from '../data/skills';
import { AboutAndContact } from '../sections/AboutAndContact';
import { SectionHeader } from '../components/SectionHeader';
import { PageHeader, PagePager } from '../components/PageChrome';
import { PageRoute } from '../lib/router';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div>
      <PageHeader
        sectionTag="05 // Researcher Profile & Future Trajectory"
        title="About, Research Direction & Contact"
        lead="Background, forward research agenda in longitudinal disease modeling and trustworthy machine learning, and direct channels for research collaboration or roles."
      />

      {/* Where I'm Going Next */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            index="TRAJECTORY"
            eyebrow="Forward Research Map"
            title="Where I'm Going Next"
            subtitle="Extending physiological sensing and speech biomarkers toward longitudinal disease progression modeling and trustworthy clinical ML."
            rightSlot={
              <div className="inline-flex items-center gap-2 rounded-lg border border-[#E3E0D6] bg-white px-3 py-2 font-mono-tech text-[11px] text-[#434956]">
                <Compass className="h-3.5 w-3.5 text-[#0F766E]" aria-hidden="true" />
                Past → Current → Future Trajectory
              </div>
            }
          />

          <div className="mb-8 grid gap-4 md:grid-cols-3">
            {FUTURE_RESEARCH_DIRECTIONS.progression.map((node, idx) => (
              <div
                key={node.stage}
                className={`relative rounded-xl border p-5 ${
                  idx === 2
                    ? 'border-[#0F766E] bg-white shadow-[0_12px_30px_-20px_rgba(15,118,110,0.35)]'
                    : 'border-[#E3E0D6] bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-wider text-[#0F766E]">
                    {node.stage}
                  </span>
                  <span className="font-mono-tech text-[11px] text-[#6B7280]">
                    {node.period}
                  </span>
                </div>
                <p className="mt-2.5 text-sm font-medium leading-relaxed text-[#111318]">
                  {node.focus}
                </p>
                {idx < 2 && (
                  <ArrowRight
                    className="mt-3 hidden h-4 w-4 text-[#0F766E] md:block"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FUTURE_RESEARCH_DIRECTIONS.interests.map((interest, idx) => (
              <div
                key={interest.title}
                className="rounded-xl border border-[#E3E0D6] bg-white p-5 transition-colors hover:border-[#0F766E]/60"
              >
                <span className="font-mono-tech text-[11px] font-semibold text-[#0F766E]">
                  DIRECTION 0{idx + 1}
                </span>
                <h3 className="mt-2 text-base font-semibold text-[#111318]">
                  {interest.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#434956]">
                  {interest.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AboutAndContact />

      <PagePager
        prev={{
          label: 'Experience & Toolbox',
          subtitle: 'TCS Research, NIT Warangal & capabilities',
          route: '/experience',
        }}
        next={{
          label: 'Overview',
          subtitle: 'Return to executive research summary',
          route: '/',
        }}
        onNavigate={onNavigate}
      />
    </div>
  );
};

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { RESEARCH_TIMELINE } from '../data/experience';
import { PUBLICATIONS } from '../data/publications';
import { SectionHeader } from '../components/SectionHeader';
import { PublicationCard } from '../components/PublicationCard';
import { PROFILE } from '../data/profile';

export const TimelineAndPublications: React.FC = () => {
  const [expandedYear, setExpandedYear] = useState<string>('2026');

  return (
    <>
      {/* Research Timeline Section */}
      <section id="timeline" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            index="05"
            eyebrow="Chronology"
            title="Research Timeline"
            subtitle="Key milestones from NIT Warangal and TCS Research through INTERSPEECH and EUSIPCO acceptances. Click any year to inspect details."
          />

          {/* Horizontal selector on desktop / stack on mobile */}
          <div className="grid gap-3 md:grid-cols-5">
            {RESEARCH_TIMELINE.map((milestone) => {
              const isOpen = expandedYear === milestone.year;
              return (
                <button
                  key={milestone.year}
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setExpandedYear((prev) => (prev === milestone.year ? '' : milestone.year))
                  }
                  className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
                    isOpen
                      ? 'border-[#0F766E] bg-white shadow-[0_12px_28px_-18px_rgba(15,118,110,0.35)]'
                      : 'border-[#E3E0D6] bg-white/80 hover:border-[#0F766E]/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono-tech text-sm font-semibold ${
                          isOpen ? 'text-[#0F766E]' : 'text-[#111318]'
                        }`}
                      >
                        {milestone.year}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 text-[#0F766E]" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-[#6B7280]" aria-hidden="true" />
                      )}
                    </div>
                    <h3 className="mt-2 text-sm font-semibold leading-snug text-[#111318]">
                      {milestone.title}
                    </h3>
                  </div>
                  <p className="mt-2 font-mono-tech text-[11px] text-[#6B7280]">
                    {milestone.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Expanded Milestone Panel */}
          {expandedYear && (() => {
            const active = RESEARCH_TIMELINE.find((m) => m.year === expandedYear);
            if (!active) return null;
            return (
              <div className="mt-4 rounded-xl border border-[#0F766E]/35 bg-white p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EFECE4] pb-3">
                  <div>
                    <span className="font-mono-tech text-xs font-semibold text-[#0F766E]">
                      MILESTONE // {active.year}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-[#111318]">
                      {active.title}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-[#E3E0D6] bg-[#FAF9F6] px-2.5 py-1 font-mono-tech text-xs text-[#434956]">
                    <MapPin className="h-3.5 w-3.5 text-[#0F766E]" aria-hidden="true" />
                    {active.location}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#434956]">
                  {active.summary}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {active.details.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2.5 text-sm text-[#111318]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F766E]" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="border-y border-[#E3E0D6] bg-[#F3F1EA]/55 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            index="06"
            eyebrow="Peer-Reviewed Literature"
            title="Publications"
            subtitle="Accepted conference papers across speech processing, physiological sensing, healthcare AI, and deep time-series modeling."
            rightSlot={
              <a
                href={PROFILE.links.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#0F766E] bg-white px-4 py-2 font-mono-tech text-xs font-semibold text-[#0F766E] transition-colors hover:bg-[#0F766E] hover:text-white"
              >
                Google Scholar Profile ↗
              </a>
            }
          />

          <div className="grid gap-5">
            {PUBLICATIONS.map((pub, idx) => (
              <PublicationCard key={pub.id} pub={pub} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

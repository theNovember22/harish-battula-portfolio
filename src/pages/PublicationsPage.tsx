import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { PUBLICATIONS } from '../data/publications';
import { RESEARCH_TIMELINE } from '../data/experience';
import { PublicationCard } from '../components/PublicationCard';
import { PageHeader, PagePager } from '../components/PageChrome';
import { SectionHeader } from '../components/SectionHeader';
import { PROFILE } from '../data/profile';
import { PageRoute } from '../lib/router';

interface PublicationsPageProps {
  onNavigate: (route: PageRoute) => void;
}

const VENUE_FILTERS = ['ALL', 'EUSIPCO', 'INTERSPEECH', 'IEEE IAS'] as const;

export const PublicationsPage: React.FC<PublicationsPageProps> = ({ onNavigate }) => {
  const [venueFilter, setVenueFilter] = useState<(typeof VENUE_FILTERS)[number]>('ALL');
  const [expandedYear, setExpandedYear] = useState<string>('2026');

  const filteredPubs =
    venueFilter === 'ALL'
      ? PUBLICATIONS
      : PUBLICATIONS.filter((p) => p.venueShort.toUpperCase().includes(venueFilter));

  return (
    <div>
      <PageHeader
        sectionTag="03 // Peer-Reviewed Literature & Chronology"
        title="Publications & Research Timeline"
        lead="Accepted research proceedings across speech processing, physiological sensing, healthcare AI, and deep time-series modeling—with copyable BibTeX citations."
        metaRight={
          <a
            href={PROFILE.links.scholar}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#0F766E] bg-white px-4 py-2.5 font-mono-tech text-xs font-semibold text-[#0F766E] transition-colors hover:bg-[#0F766E] hover:text-white"
          >
            Google Scholar Profile
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        }
      />

      {/* Publications Library */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {VENUE_FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setVenueFilter(filter)}
                  className={`rounded-md border px-3 py-1.5 font-mono-tech text-xs font-medium transition-colors ${
                    venueFilter === filter
                      ? 'border-[#111318] bg-[#111318] text-white'
                      : 'border-[#E3E0D6] bg-white text-[#434956] hover:border-[#0F766E]'
                  }`}
                >
                  {filter === 'ALL' ? `All Venues (${PUBLICATIONS.length})` : filter}
                </button>
              ))}
            </div>
            <span className="font-mono-tech text-xs text-[#6B7280]">
              Showing {filteredPubs.length} of {PUBLICATIONS.length} accepted papers
            </span>
          </div>

          <div className="grid gap-5">
            {filteredPubs.map((pub, idx) => (
              <PublicationCard key={pub.id} pub={pub} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Research Timeline */}
      <section className="border-t border-[#E3E0D6] bg-[#F3F1EA]/55 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            index="TIMELINE"
            eyebrow="Chronology"
            title="Research Milestones (2023 – Present)"
            subtitle="Click any year to expand milestone details."
          />

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
                      : 'border-[#E3E0D6] bg-white/85 hover:border-[#0F766E]/50'
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

      <PagePager
        prev={{
          label: 'Signal Lab',
          subtitle: 'Interactive biomedical waveforms & open code',
          route: '/signal-lab',
        }}
        next={{
          label: 'Experience & Toolbox',
          subtitle: 'TCS Research, NIT Warangal & capabilities',
          route: '/experience',
        }}
        onNavigate={onNavigate}
      />
    </div>
  );
};

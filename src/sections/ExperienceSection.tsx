import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Building2 } from 'lucide-react';
import { RESEARCH_STORIES, TCS_EXPERIENCE_HEADER } from '../data/experience';
import { SectionHeader } from '../components/SectionHeader';

export const ExperienceSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'sync-collection': true,
    'alzheimers-asr-gnn': true,
  });

  const toggleStory = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="experience" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="07"
          eyebrow="Research Appointment"
          title="Research Experience"
          subtitle="Structured research investigations carried out at Tata Consultancy Services (TCS) Research—from experimental protocol design to evaluation and peer review."
        />

        {/* TCS Research Header Card */}
        <div className="mb-8 rounded-2xl border border-[#E3E0D6] bg-white p-5 sm:p-7">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 font-mono-tech text-xs font-semibold text-[#0F766E]">
                <Building2 className="h-4 w-4" aria-hidden="true" />
                {TCS_EXPERIENCE_HEADER.organization}
              </div>
              <h3 className="mt-1.5 text-xl font-semibold text-[#111318] sm:text-2xl">
                {TCS_EXPERIENCE_HEADER.role}
              </h3>
            </div>
            <div className="font-mono-tech text-xs text-[#434956] md:text-right">
              <div className="font-semibold text-[#111318]">{TCS_EXPERIENCE_HEADER.period}</div>
              <div className="mt-0.5 text-[#6B7280]">{TCS_EXPERIENCE_HEADER.locations}</div>
            </div>
          </div>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[#434956] sm:text-base">
            {TCS_EXPERIENCE_HEADER.summary}
          </p>
        </div>

        {/* Expandable Research Stories */}
        <div className="space-y-4">
          {RESEARCH_STORIES.map((story) => {
            const isOpen = !!openIds[story.id];
            return (
              <div
                key={story.id}
                className="overflow-hidden rounded-xl border border-[#E3E0D6] bg-white transition-colors hover:border-[#0F766E]/50"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleStory(story.id)}
                  className="flex w-full items-start justify-between gap-4 p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0F766E]"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-wider text-[#0F766E]">
                        {story.domain}
                      </span>
                      <span className="rounded border border-[#E3E0D6] bg-[#FAF9F6] px-2 py-0.5 font-mono-tech text-[11px] font-medium text-[#111318]">
                        {story.highlight}
                      </span>
                    </div>
                    <h4 className="mt-1.5 text-base font-semibold text-[#111318] sm:text-lg">
                      {story.title}
                    </h4>
                  </div>
                  <span className="mt-1 shrink-0 rounded-md border border-[#E3E0D6] bg-[#FAF9F6] p-1.5 text-[#434956]">
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-[#0F766E]" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-[#EFECE4] bg-[#FAF9F6]/65 px-5 pb-5 pt-4">
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                      {[
                        { label: 'Problem', text: story.problem },
                        { label: 'Methodology', text: story.methodology },
                        { label: 'Implementation', text: story.implementation },
                        { label: 'Evaluation', text: story.evaluation },
                        { label: 'Scientific Outcome', text: story.outcome },
                      ].map((stage) => (
                        <div
                          key={stage.label}
                          className="rounded-lg border border-[#EAE7DF] bg-white p-3"
                        >
                          <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[#0F766E]">
                            {stage.label}
                          </div>
                          <p className="mt-1.5 text-xs leading-relaxed text-[#434956]">
                            {stage.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {story.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-[#E3E0D6] bg-white px-2 py-0.5 font-mono-tech text-[11px] text-[#434956]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

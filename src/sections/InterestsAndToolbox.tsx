import React, { useState } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { FUTURE_RESEARCH_DIRECTIONS, TOOLBOX_CATEGORIES } from '../data/skills';
import { SectionHeader } from '../components/SectionHeader';

export const InterestsAndToolbox: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const visibleToolbox =
    selectedCat === 'all'
      ? TOOLBOX_CATEGORIES
      : TOOLBOX_CATEGORIES.filter((c) => c.id === selectedCat);

  return (
    <>
      {/* Where I'm Going Next */}
      <section id="research-interests" className="border-y border-[#E3E0D6] bg-[#F3F1EA]/55 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            index="08"
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

          {/* Trajectory Strip */}
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

          {/* 6 Research Interest Cards */}
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

      {/* Research Toolbox & Technical Skills */}
      <section id="toolbox" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            index="09"
            eyebrow="Capabilities & Instruments"
            title="Research Toolbox"
            subtitle="Organized by research modality and engineering stack—focused on signal pipelines, graph architectures, explainability, and reproducible prototypes."
          />

          {/* Filter Pills */}
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCat('all')}
              className={`rounded-md border px-3 py-1.5 font-mono-tech text-xs font-medium transition-colors ${
                selectedCat === 'all'
                  ? 'border-[#111318] bg-[#111318] text-white'
                  : 'border-[#E3E0D6] bg-white text-[#434956] hover:border-[#0F766E]'
              }`}
            >
              All Modalities ({TOOLBOX_CATEGORIES.length})
            </button>
            {TOOLBOX_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCat(cat.id)}
                className={`rounded-md border px-3 py-1.5 font-mono-tech text-xs font-medium transition-colors ${
                  selectedCat === cat.id
                    ? 'border-[#0F766E] bg-[#0F766E] text-white'
                    : 'border-[#E3E0D6] bg-white text-[#434956] hover:border-[#0F766E]'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleToolbox.map((group) => (
              <div
                key={group.id}
                className="rounded-xl border border-[#E3E0D6] bg-white p-5 transition-all hover:border-[#0F766E]/60"
              >
                <h3 className="text-base font-semibold text-[#111318]">
                  {group.category}
                </h3>
                <p className="mt-1 text-xs text-[#6B7280]">{group.subtitle}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-[#E6E3DA] bg-[#FAF9F6] px-2.5 py-1 font-mono-tech text-xs text-[#111318] transition-colors hover:border-[#0F766E] hover:bg-[#0F766E]/8 hover:text-[#0F766E]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

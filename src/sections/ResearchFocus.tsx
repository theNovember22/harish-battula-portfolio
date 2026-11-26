import React, { useState } from 'react';
import { Network } from 'lucide-react';
import { RESEARCH_FOCUS_AREAS } from '../data/skills';
import { SectionHeader } from '../components/SectionHeader';

export const ResearchFocus: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('speech-audio');
  const activeArea = RESEARCH_FOCUS_AREAS.find((a) => a.id === activeId) ?? RESEARCH_FOCUS_AREAS[0];

  return (
    <section id="research-focus" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="01"
          eyebrow="Connected Research Map"
          title="Research Focus"
          subtitle="Five interconnected domains linking raw acoustic and physiological sensing with clinically reliable machine learning."
          rightSlot={
            <div className="inline-flex items-center gap-2 rounded-lg border border-[#E3E0D6] bg-white px-3 py-2 font-mono-tech text-[11px] text-[#434956]">
              <Network className="h-3.5 w-3.5 text-[#0F766E]" aria-hidden="true" />
              Select a domain to trace connections
            </div>
          }
        />

        {/* Interconnected Domain Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {RESEARCH_FOCUS_AREAS.map((area) => {
            const isSelected = area.id === activeId;
            const isLinked = activeArea.connectedTo.includes(area.title);

            return (
              <button
                key={area.id}
                type="button"
                onClick={() => setActiveId(area.id)}
                onMouseEnter={() => setActiveId(area.id)}
                className={`group flex h-full flex-col justify-between rounded-xl border p-5 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
                  isSelected
                    ? 'border-[#0F766E] bg-white shadow-[0_12px_30px_-18px_rgba(15,118,110,0.35)]'
                    : isLinked
                    ? 'border-[#0F766E]/45 bg-[#0F766E]/[0.03]'
                    : 'border-[#E3E0D6] bg-white/80 hover:border-[#C5C0B2]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-tech text-[11px] font-semibold tracking-wider text-[#0F766E]">
                      {area.code}
                    </span>
                    {isSelected ? (
                      <span className="rounded bg-[#0F766E] px-2 py-0.5 font-mono-tech text-[10px] font-medium text-white">
                        ACTIVE
                      </span>
                    ) : isLinked ? (
                      <span className="rounded border border-[#0F766E]/30 bg-[#0F766E]/10 px-2 py-0.5 font-mono-tech text-[10px] font-medium text-[#0F766E]">
                        COUPLED
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-2.5 text-lg font-semibold text-[#111318]">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#434956]">
                    {area.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EFECE4]">
                  <div className="flex flex-wrap gap-1.5">
                    {area.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="rounded border border-[#E6E3DA] bg-[#FAF9F6] px-2 py-0.5 font-mono-tech text-[11px] text-[#111318]"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2.5 font-mono-tech text-[10px] text-[#6B7280]">
                    Coupled with: {area.connectedTo.join(' • ')}
                  </div>
                </div>
              </button>
            );
          })}

          {/* Cross-Domain Synthesis Card */}
          <div className="flex flex-col justify-between rounded-xl border border-dashed border-[#0F766E]/40 bg-[#0F766E]/[0.04] p-5">
            <div>
              <span className="font-mono-tech text-[11px] font-semibold tracking-wider text-[#0F766E]">
                SYNTHESIS
              </span>
              <h3 className="mt-2.5 text-lg font-semibold text-[#111318]">
                Sensing → Structure → Trust
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#434956]">
                Every research project links real physiological or vocal measurements to
                interpretable representations—from ASR-derived speech graphs to ICA cardiac
                decomposition and SHAP/LIME clinical validation.
              </p>
            </div>
            <div className="mt-4 rounded-lg border border-[#0F766E]/20 bg-white px-3.5 py-2.5 font-mono-tech text-xs text-[#111318]">
              Active coupling:{' '}
              <span className="font-semibold text-[#0F766E]">{activeArea.title}</span> →{' '}
              {activeArea.connectedTo.join(' & ')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

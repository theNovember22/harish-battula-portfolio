import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RESEARCH_APPROACH_PIPELINE } from '../data/skills';
import { SectionHeader } from '../components/SectionHeader';

export const ResearchApproach: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState(0);
  const current = RESEARCH_APPROACH_PIPELINE[selectedStep];

  return (
    <section id="approach" className="border-y border-[#E3E0D6] bg-[#F3F1EA]/55 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="04"
          eyebrow="End-to-End Scientific Methodology"
          title="How I Approach Research"
          subtitle="From framing clinical hypotheses and collecting synchronized multimodal cohorts to interpretable evaluation."
        />

        {/* 8-Stage Pipeline Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {RESEARCH_APPROACH_PIPELINE.map((item, idx) => {
            const isActive = idx === selectedStep;
            return (
              <motion.button
                key={item.step}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                onClick={() => setSelectedStep(idx)}
                onMouseEnter={() => setSelectedStep(idx)}
                className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
                  isActive
                    ? 'border-[#0F766E] bg-[#0F766E] text-white shadow-sm'
                    : 'border-[#E3E0D6] bg-white text-[#111318] hover:border-[#0F766E]/60'
                }`}
              >
                <span
                  className={`font-mono-tech text-[11px] font-semibold ${
                    isActive ? 'text-teal-100' : 'text-[#0F766E]'
                  }`}
                >
                  {item.step}
                </span>
                <span className="mt-3 text-sm font-semibold leading-tight">
                  {item.title}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Active Stage Inspection Panel */}
        <div className="mt-5 rounded-xl border border-[#E3E0D6] bg-white p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="font-mono-tech text-xs font-semibold uppercase tracking-wider text-[#0F766E]">
                Stage {current.step} // {current.title}
              </div>
              <p className="mt-2 text-base leading-relaxed text-[#111318]">
                {current.description}
              </p>
            </div>
            <div className="shrink-0 rounded-lg border border-[#EAE7DF] bg-[#FAF9F6] px-4 py-3">
              <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[#6B7280]">
                Empirical Evidence
              </div>
              <div className="mt-1 font-mono-tech text-xs font-medium text-[#111318]">
                {current.evidence}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

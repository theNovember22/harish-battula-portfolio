import React from 'react';
import { GraduationCap, Eye } from 'lucide-react';
import { EARLIER_WORK, EDUCATION } from '../data/profile';
import { SectionHeader } from '../components/SectionHeader';

export const EducationAndEarlierWork: React.FC = () => {
  return (
    <section id="education" className="border-y border-[#E3E0D6] bg-[#F3F1EA]/55 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="10"
          eyebrow="Academic Foundation & Prior Work"
          title="Education & Earlier Work"
          subtitle="Electrical engineering and time-series modeling training at NIT Warangal, alongside earlier computer vision engineering at ZF Technologies."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Education Cards */}
          <div className="space-y-4 lg:col-span-7">
            {EDUCATION.map((edu) => (
              <div
                key={edu.institution}
                className="rounded-xl border border-[#E3E0D6] bg-white p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="inline-flex items-center gap-2 font-mono-tech text-xs font-semibold text-[#0F766E]">
                    <GraduationCap className="h-4 w-4" aria-hidden="true" />
                    {edu.institution}
                  </div>
                  <span className="font-mono-tech text-xs text-[#6B7280]">
                    {edu.period} • {edu.location}
                  </span>
                </div>

                <h3 className="mt-2 text-lg font-semibold text-[#111318]">
                  {edu.degree}
                </h3>

                {'thesis' in edu && edu.thesis && (
                  <div className="mt-3 rounded-lg border border-[#0F766E]/25 bg-[#0F766E]/[0.04] p-3.5">
                    <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0F766E]">
                      Master’s Thesis Research
                    </div>
                    <div className="mt-1 text-sm font-semibold text-[#111318]">
                      {edu.thesis}
                    </div>
                  </div>
                )}

                {'grade' in edu && edu.grade && (
                  <div className="mt-2.5 inline-block rounded border border-[#E3E0D6] bg-[#FAF9F6] px-2.5 py-0.5 font-mono-tech text-xs font-semibold text-[#111318]">
                    {edu.grade}
                  </div>
                )}

                <p className="mt-3 text-sm leading-relaxed text-[#434956]">
                  {edu.details}
                </p>
              </div>
            ))}
          </div>

          {/* Earlier Work — Computer Vision */}
          <div className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-xl border border-[#E3E0D6] bg-white p-5 sm:p-6">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 font-mono-tech text-xs font-semibold uppercase tracking-wider text-[#0F766E]">
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    Earlier Work — Computer Vision
                  </span>
                  <span className="font-mono-tech text-[11px] text-[#6B7280]">
                    {EARLIER_WORK.period}
                  </span>
                </div>

                <h3 className="mt-2.5 text-lg font-semibold text-[#111318]">
                  {EARLIER_WORK.company}
                </h3>
                <p className="font-mono-tech text-xs text-[#434956]">
                  {EARLIER_WORK.role} • {EARLIER_WORK.location}
                </p>

                <ul className="mt-4 space-y-2.5">
                  {EARLIER_WORK.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-[#434956]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F766E]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-[#EFECE4] pt-4">
                {EARLIER_WORK.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-[#E3E0D6] bg-[#FAF9F6] px-2.5 py-1 font-mono-tech text-[11px] text-[#111318]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

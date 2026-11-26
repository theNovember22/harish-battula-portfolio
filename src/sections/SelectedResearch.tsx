import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SELECTED_RESEARCH } from '../data/researchProjects';
import { SectionHeader } from '../components/SectionHeader';
import { CaseStudyVisuals } from '../components/CaseStudyVisuals';

export const SelectedResearch: React.FC = () => {
  return (
    <section id="selected-research" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="03"
          eyebrow="Research Case Studies"
          title="Selected Research"
          subtitle="Structured from research problem and experimental data through representation, model architecture, and scientific outcome."
        />

        <div className="space-y-8">
          {SELECTED_RESEARCH.map((project, idx) => (
            <motion.article
              key={project.id}
              id={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="rounded-2xl border border-[#E3E0D6] bg-white p-5 shadow-[0_14px_40px_-28px_rgba(17,19,24,0.2)] sm:p-7 lg:p-8"
            >
              {/* Case Study Header */}
              <div className="flex flex-col gap-4 border-b border-[#EFECE4] pb-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono-tech text-xs font-semibold tracking-wider text-[#6B7280]">
                      {project.number}
                    </span>
                    <span className="rounded-md bg-[#0F766E] px-2.5 py-0.5 font-mono-tech text-xs font-semibold text-white">
                      {project.venueBadge}
                    </span>
                    <span className="rounded-md border border-[#E3E0D6] bg-[#FAF9F6] px-2.5 py-0.5 font-mono-tech text-[11px] text-[#434956]">
                      {project.status}
                    </span>
                  </div>

                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#111318] sm:text-[26px]">
                    {project.title}
                  </h3>

                  <p className="mt-2 font-mono-tech text-xs font-medium text-[#0F766E]">
                    {project.areas.join('  •  ')}
                  </p>
                </div>

                {/* Highlight Evidence Callout */}
                <div className="shrink-0 rounded-xl border border-[#0F766E]/25 bg-[#0F766E]/[0.05] px-4 py-3 text-left lg:text-right">
                  <div className="font-mono-tech text-2xl font-semibold text-[#0F766E]">
                    {project.highlightMetric}
                  </div>
                  <div className="mt-0.5 font-mono-tech text-[11px] text-[#434956]">
                    {project.highlightLabel}
                  </div>
                </div>
              </div>

              {/* Research Question */}
              <div className="mt-5 rounded-lg border-l-2 border-[#0F766E] bg-[#FAF9F6] px-4 py-3">
                <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0F766E]">
                  Core Research Question
                </span>
                <p className="mt-1 text-sm font-medium text-[#111318] sm:text-base">
                  “{project.question}”
                </p>
              </div>

              {/* Interactive / Scientific Visual */}
              <div className="mt-5">
                <CaseStudyVisuals project={project} />
              </div>

              {/* Structured Paper Breakdown Grid */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { label: 'Research Problem', value: project.problem },
                  { label: 'Motivation', value: project.motivation },
                  { label: 'Data & Cohort', value: project.data },
                  { label: 'Method', value: project.method },
                  { label: 'Model & Architecture', value: project.model },
                  { label: 'Result & Outcome', value: project.result },
                ].map((cell) => (
                  <div
                    key={cell.label}
                    className="rounded-lg border border-[#EFECE4] bg-[#FAF9F6]/70 p-3.5"
                  >
                    <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0F766E]">
                      {cell.label}
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#434956] sm:text-[13px]">
                      {cell.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Publication, Tech Stack & Links Footer */}
              <div className="mt-5 flex flex-col gap-3 border-t border-[#EFECE4] pt-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-[#E3E0D6] bg-white px-2.5 py-1 font-mono-tech text-[11px] text-[#111318]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.links && project.links.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

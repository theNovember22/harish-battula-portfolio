import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, GraduationCap, MapPin } from 'lucide-react';
import { EDUCATION_PAGE_DATA } from '../data/profile.js';
import { LoadHorizonVisual } from '../visuals/LoadHorizonVisual';

export const EducationPage: React.FC = () => {
  const { masters, bachelors, bridgeSteps } = EDUCATION_PAGE_DATA;

  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="max-w-3xl pb-10 sm:pb-12">
          <span className="font-mono-tech text-xs font-semibold uppercase tracking-[0.16em] text-[#0F766E]">
            {EDUCATION_PAGE_DATA.eyebrow}
          </span>
          <h1 className="font-serif-display mt-3 text-4xl font-medium leading-[1.08] tracking-[-0.025em] text-[#111318] sm:text-5xl">
            {EDUCATION_PAGE_DATA.headline}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#434956] sm:text-lg">
            {EDUCATION_PAGE_DATA.subline}
          </p>
        </div>

        {/* M.Tech. Showcase Card with Interactive Forecasting Visual */}
        <section className="rounded-2xl border border-[#E4E1D8] bg-white p-6 shadow-[0_18px_50px_-32px_rgba(17,19,24,0.22)] sm:p-8 lg:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0F766E]/10 px-3 py-1 font-semibold text-[#0F766E]">
                  <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                  {masters.period}
                </span>
                <span className="inline-flex items-center gap-1 text-[#6B7280]">
                  <MapPin className="h-3.5 w-3.5 text-[#0F766E]" aria-hidden="true" />
                  {masters.location}
                </span>
              </div>

              <h2 className="font-serif-display mt-4 text-2xl font-medium tracking-tight text-[#111318] sm:text-3xl">
                {masters.institution}
              </h2>
              <p className="mt-1 font-mono-tech text-xs font-medium text-[#434956]">
                {masters.degree} — {masters.field}
              </p>

              <div className="mt-6 rounded-xl border-l-2 border-[#0F766E] bg-[#FAF9F6] px-4 py-3.5">
                <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0F766E]">
                  Master’s Thesis
                </div>
                <div className="mt-1 text-base font-semibold text-[#111318]">
                  {masters.thesisTitle}
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#434956] sm:text-base">
                {masters.thesisSummary}
              </p>

              <ul className="mt-4 space-y-2">
                {masters.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#111318]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F766E]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-4 border-t border-[#EFECE4] pt-4">
                {masters.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <LoadHorizonVisual />
            </div>
          </div>
        </section>

        {/* B.Tech. Feature Card with Hardware-Spec CGPA Callout */}
        <section className="mt-6 rounded-2xl border border-[#E4E1D8] bg-white p-6 shadow-[0_14px_40px_-30px_rgba(17,19,24,0.18)] sm:p-8">
          <div className="grid items-center gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs text-[#6B7280]">
                <span className="rounded-full border border-[#E4E1D8] bg-[#FAF9F6] px-3 py-1 font-semibold text-[#111318]">
                  {bachelors.period}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-[#0F766E]" aria-hidden="true" />
                  {bachelors.location}
                </span>
              </div>

              <h2 className="font-serif-display mt-3 text-2xl font-medium text-[#111318] sm:text-3xl">
                {bachelors.institution}
              </h2>
              <p className="mt-1 font-mono-tech text-xs font-medium text-[#434956]">
                {bachelors.degree} — {bachelors.field}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#434956] sm:text-base">
                {bachelors.summary}
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-xl border border-[#E4E1D8] bg-[#FAF9F6] p-6 text-left md:col-span-4 md:text-right">
              <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0F766E]">
                Undergraduate Standing
              </span>
              <div className="mt-2 flex items-baseline gap-1 md:justify-end">
                <span className="font-serif-display text-5xl font-medium tracking-tight text-[#111318]">
                  {bachelors.cgpa}
                </span>
                <span className="font-mono-tech text-sm text-[#6B7280]">{bachelors.cgpaScale}</span>
              </div>
              <span className="mt-1 font-mono-tech text-xs text-[#434956]">Cumulative GPA</span>
            </div>
          </div>
        </section>

        {/* Academic-to-Research Bridge Strip */}
        <section className="mt-10 rounded-2xl border border-[#E4E1D8] bg-[#F2EFE8]/60 p-6 sm:p-8">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono-tech text-xs font-semibold uppercase tracking-[0.14em] text-[#0F766E]">
              How Training Built Into Research
            </span>
            <Link
              to="/experience"
              className="inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#111318] hover:text-[#0F766E]"
            >
              See Professional Experience
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {bridgeSteps.map((b) => (
              <div key={b.step} className="rounded-xl border border-[#E4E1D8] bg-white p-4">
                <div className="font-mono-tech text-[11px] font-semibold text-[#0F766E]">
                  {b.step}
                </div>
                <div className="mt-1.5 text-sm font-semibold text-[#111318]">{b.title}</div>
                <div className="mt-1 text-xs text-[#6B7280]">{b.detail}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

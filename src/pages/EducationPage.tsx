import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, GraduationCap, MapPin } from 'lucide-react';
import { EDUCATION_PAGE_DATA } from '../data/profile.js';
import { LoadHorizonVisual } from '../visuals/LoadHorizonVisual';

export const EducationPage: React.FC = () => {
  const { masters, bachelors, bridgeSteps } = EDUCATION_PAGE_DATA;

  return (
    <div className="py-5 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="max-w-3xl pb-4 sm:pb-10">
          <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0F766E] sm:text-xs sm:tracking-[0.16em]">
            {EDUCATION_PAGE_DATA.eyebrow}
          </span>
          <h1 className="font-serif-display mt-1.5 text-2xl font-medium leading-[1.1] tracking-[-0.025em] text-[#111318] sm:mt-3 sm:text-5xl">
            <span className="md:hidden">Academic Foundation</span>
            <span className="hidden md:inline">{EDUCATION_PAGE_DATA.headline}</span>
          </h1>
          <p className="mt-3 hidden text-base leading-relaxed text-[#434956] md:block md:text-lg">
            {EDUCATION_PAGE_DATA.subline}
          </p>
        </div>

        {/* M.Tech. Card */}
        <section className="rounded-2xl border border-[#E4E1D8] bg-white p-4 shadow-[0_18px_50px_-32px_rgba(17,19,24,0.22)] sm:p-8 lg:p-10">
          <div className="grid items-center gap-5 lg:grid-cols-12 lg:gap-8">
            <div className="order-2 lg:order-1 lg:col-span-6">
              <div className="flex flex-wrap items-center gap-2 font-mono-tech text-[10px] sm:text-xs">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#0F766E]/10 px-2.5 py-0.5 font-semibold text-[#0F766E] sm:px-3 sm:py-1">
                  <GraduationCap className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                  {masters.period}
                </span>
                <span className="hidden items-center gap-1 text-[#6B7280] sm:inline-flex">
                  <MapPin className="h-3.5 w-3.5 text-[#0F766E]" aria-hidden="true" />
                  {masters.location}
                </span>
              </div>

              <h2 className="font-serif-display mt-2.5 text-xl font-medium tracking-tight text-[#111318] sm:mt-4 sm:text-3xl">
                {masters.institution}
              </h2>
              <p className="mt-0.5 font-mono-tech text-[11px] font-medium text-[#434956] sm:text-xs">
                {masters.degree} — {masters.field}
              </p>

              <div className="mt-3 rounded-xl border-l-2 border-[#0F766E] bg-[#FAF9F6] px-3 py-2.5 sm:mt-6 sm:px-4 sm:py-3.5">
                <div className="font-mono-tech text-[9.5px] font-semibold uppercase tracking-[0.12em] text-[#0F766E] sm:text-[10px]">
                  Master’s Thesis
                </div>
                <div className="mt-0.5 text-xs font-semibold text-[#111318] sm:mt-1 sm:text-base">
                  {masters.thesisTitle}
                </div>
              </div>

              <p className="mt-4 hidden text-base leading-relaxed text-[#434956] md:block">
                {masters.thesisSummary}
              </p>

              <ul className="mt-4 hidden space-y-2 md:block">
                {masters.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#111318]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F766E]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3.5 flex flex-wrap gap-4 border-t border-[#EFECE4] pt-3 sm:mt-6 sm:pt-4">
                <a
                  href={masters.links[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono-tech text-[11px] font-semibold text-[#0F766E] hover:underline sm:text-xs"
                >
                  {masters.links[0].label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href={masters.links[1].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden items-center gap-1 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline sm:inline-flex"
                >
                  {masters.links[1].label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-6">
              <LoadHorizonVisual />
            </div>
          </div>
        </section>

        {/* B.Tech. Card */}
        <section className="mt-3.5 rounded-2xl border border-[#E4E1D8] bg-white p-4 shadow-[0_14px_40px_-30px_rgba(17,19,24,0.18)] sm:mt-6 sm:p-8">
          <div className="flex items-center justify-between gap-3 md:grid md:grid-cols-12 md:gap-6">
            <div className="min-w-0 md:col-span-8">
              <span className="font-mono-tech text-[10px] font-semibold text-[#6B7280] sm:text-xs">
                {bachelors.period}
              </span>
              <h2 className="font-serif-display mt-1 text-lg font-medium text-[#111318] sm:mt-2 sm:text-3xl">
                {bachelors.institution}
              </h2>
              <p className="mt-0.5 font-mono-tech text-[11px] font-medium text-[#434956] sm:text-xs">
                {bachelors.degree} — {bachelors.field}
              </p>
              <p className="mt-3 hidden max-w-2xl text-base leading-relaxed text-[#434956] md:block">
                {bachelors.summary}
              </p>
            </div>

            <div className="shrink-0 rounded-xl border border-[#E4E1D8] bg-[#FAF9F6] px-3.5 py-2.5 text-right sm:p-6 md:col-span-4">
              <span className="font-mono-tech text-[9px] font-semibold uppercase tracking-[0.12em] text-[#0F766E] sm:text-[10px]">
                CGPA
              </span>
              <div className="mt-0.5 flex items-baseline justify-end gap-0.5 sm:mt-2 sm:gap-1">
                <span className="font-serif-display text-2xl font-medium tracking-tight text-[#111318] sm:text-5xl">
                  {bachelors.cgpa}
                </span>
                <span className="font-mono-tech text-[11px] text-[#6B7280] sm:text-sm">{bachelors.cgpaScale}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Desktop Bridge */}
        <section className="mt-10 hidden rounded-2xl border border-[#E4E1D8] bg-[#F2EFE8]/60 p-8 md:block">
          <div className="mb-5 flex items-center justify-between">
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

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
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

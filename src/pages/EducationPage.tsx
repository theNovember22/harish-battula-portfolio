import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, GraduationCap, MapPin } from 'lucide-react';
import { EDUCATION_DETAILS } from '../data/profile.js';

export const EducationPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 border-b border-[#E4E1D8] pb-6">
          <span className="font-mono-tech text-xs font-semibold uppercase tracking-[0.14em] text-[#0F766E]">
            Academic Training
          </span>
          <h1 className="font-serif-display mt-2 text-3xl font-medium tracking-tight text-[#111318] sm:text-5xl">
            Education Details
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#434956] sm:text-lg">
            Graduate research in electrical engineering and deep time-series forecasting at NIT Warangal, built upon undergraduate EEE foundations.
          </p>
        </div>

        <div className="space-y-6">
          {EDUCATION_DETAILS.map((edu) => (
            <article
              key={edu.institution}
              className="rounded-2xl border border-[#E4E1D8] bg-white p-6 shadow-[0_12px_34px_-24px_rgba(17,19,24,0.2)] sm:p-8"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 font-mono-tech text-xs font-semibold text-[#0F766E]">
                    <GraduationCap className="h-4 w-4" aria-hidden="true" />
                    {edu.institution}
                  </div>
                  <h2 className="mt-2 text-xl font-semibold text-[#111318] sm:text-2xl">
                    {edu.degree}
                  </h2>
                </div>
                <div className="font-mono-tech text-xs text-[#6B7280] sm:text-right">
                  <div className="font-semibold text-[#111318]">{edu.period}</div>
                  <div className="mt-0.5 inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-[#0F766E]" aria-hidden="true" />
                    {edu.location}
                  </div>
                </div>
              </div>

              {'thesis' in edu && edu.thesis && (
                <div className="mt-5 rounded-xl border border-[#0F766E]/25 bg-[#0F766E]/[0.04] p-4">
                  <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0F766E]">
                    Master’s Thesis
                  </div>
                  <div className="mt-1 text-base font-semibold text-[#111318]">
                    {edu.thesis}
                  </div>
                </div>
              )}

              {'grade' in edu && edu.grade && (
                <div className="mt-4 inline-block rounded-md border border-[#E4E1D8] bg-[#FAF9F6] px-3 py-1 font-mono-tech text-xs font-semibold text-[#111318]">
                  {edu.grade}
                </div>
              )}

              <ul className="mt-4 space-y-2">
                {edu.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#434956] sm:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F766E]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {'relatedLink' in edu && edu.relatedLink && (
                <div className="mt-5 border-t border-[#EFECE4] pt-4">
                  <a
                    href={edu.relatedLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
                  >
                    {edu.relatedLink.label}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            to="/experience"
            className="inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
          >
            Continue to Professional Experience
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};

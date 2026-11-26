import React from 'react';
import { ArrowRight, Activity, BookOpen, Briefcase, FlaskConical, User } from 'lucide-react';
import { Hero } from '../sections/Hero';
import { ResearchAtAGlance } from '../components/ResearchAtAGlance';
import { SELECTED_RESEARCH } from '../data/researchProjects';
import { PageRoute } from '../lib/router';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
}

const PORTFOLIO_SECTIONS: {
  route: PageRoute;
  tag: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    route: '/research',
    tag: '01 / CASE STUDIES',
    title: 'Research & Methodology',
    description:
      '4 structured research case studies—including the interactive ASR-to-graph Alzheimer’s pipeline—plus the 8-stage research lifecycle.',
    icon: <FlaskConical className="h-4 w-4 text-[#0F766E]" aria-hidden="true" />,
  },
  {
    route: '/signal-lab',
    tag: '02 / INTERACTIVE LAB',
    title: 'Research Signal & Open Code',
    description:
      'Explore Speech, ECG, PPG, and PCG waveforms interactively alongside public GitHub repositories and Signal Explorer.',
    icon: <Activity className="h-4 w-4 text-[#0F766E]" aria-hidden="true" />,
  },
  {
    route: '/publications',
    tag: '03 / LIBRARY',
    title: 'Publications & Timeline',
    description:
      'Peer-reviewed papers accepted at INTERSPEECH 2025, EUSIPCO 2024 & 2026, and IEEE IAS 2023 with BibTeX citations.',
    icon: <BookOpen className="h-4 w-4 text-[#0F766E]" aria-hidden="true" />,
  },
  {
    route: '/experience',
    tag: '04 / APPOINTMENT',
    title: 'Experience, Education & Toolbox',
    description:
      'TCS Research investigations, NIT Warangal M.Tech. thesis, ZF Technologies vision work, and categorized research stack.',
    icon: <Briefcase className="h-4 w-4 text-[#0F766E]" aria-hidden="true" />,
  },
  {
    route: '/about',
    tag: '05 / PROFILE',
    title: 'About, Trajectory & Contact',
    description:
      'Research profile, forward directions in trustworthy healthcare AI, and direct correspondence links.',
    icon: <User className="h-4 w-4 text-[#0F766E]" aria-hidden="true" />,
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const featuredStudies = SELECTED_RESEARCH.slice(0, 2);

  return (
    <div>
      <Hero onNavigate={onNavigate} />
      <ResearchAtAGlance />

      {/* Flagship Research Spotlight (only top 2 highlights, keeping homepage concise) */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 border-b border-[#E3E0D6] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-mono-tech text-xs font-semibold uppercase tracking-[0.14em] text-[#0F766E]">
                Selected Highlights
              </span>
              <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-[#111318] sm:text-3xl">
                Recent Accepted Research
              </h2>
            </div>
            <a
              href="#/research"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/research');
              }}
              className="inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
            >
              View all 4 case studies
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {featuredStudies.map((study) => (
              <article
                key={study.id}
                className="flex flex-col justify-between rounded-xl border border-[#E3E0D6] bg-white p-6 transition-all hover:border-[#0F766E]/60"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded bg-[#0F766E] px-2.5 py-0.5 font-mono-tech text-[11px] font-semibold text-white">
                      {study.venueBadge}
                    </span>
                    <span className="font-mono-tech text-xs font-semibold text-[#0F766E]">
                      {study.highlightMetric}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold leading-snug text-[#111318]">
                    {study.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#434956]">
                    {study.result}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#EFECE4] pt-4">
                  <span className="font-mono-tech text-[11px] text-[#6B7280]">
                    {study.areas.slice(0, 2).join(' • ')}
                  </span>
                  <a
                    href="#/research"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/research');
                    }}
                    className="inline-flex items-center gap-1 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
                  >
                    Read case study
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Pages Index */}
      <section className="border-t border-[#E3E0D6] bg-[#F3F1EA]/45 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="font-mono-tech text-xs font-semibold uppercase tracking-[0.14em] text-[#0F766E]">
              Portfolio Directory
            </span>
            <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-[#111318] sm:text-3xl">
              Explore by Section
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#434956] sm:text-base">
              Each area of Harish’s research portfolio lives on its own dedicated page for focused reading.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO_SECTIONS.map((sec) => (
              <a
                key={sec.route}
                href={`#${sec.route}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(sec.route);
                }}
                className="group flex flex-col justify-between rounded-xl border border-[#E3E0D6] bg-white p-5 transition-all hover:border-[#0F766E] hover:shadow-[0_12px_28px_-20px_rgba(15,118,110,0.35)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tech text-[11px] font-semibold tracking-wider text-[#0F766E]">
                      {sec.tag}
                    </span>
                    {sec.icon}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-[#111318] group-hover:text-[#0F766E]">
                    {sec.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#434956]">
                    {sec.description}
                  </p>
                </div>

                <div className="mt-4 inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#111318] group-hover:text-[#0F766E]">
                  Open page
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { ExperienceSection } from '../sections/ExperienceSection';
import { EducationAndEarlierWork } from '../sections/EducationAndEarlierWork';
import { TOOLBOX_CATEGORIES } from '../data/skills';
import { SectionHeader } from '../components/SectionHeader';
import { PageHeader, PagePager } from '../components/PageChrome';
import { PageRoute } from '../lib/router';

interface ExperiencePageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({ onNavigate }) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const visibleToolbox =
    selectedCat === 'all'
      ? TOOLBOX_CATEGORIES
      : TOOLBOX_CATEGORIES.filter((c) => c.id === selectedCat);

  return (
    <div>
      <PageHeader
        sectionTag="04 // Research Appointment, Education & Stack"
        title="Experience & Credentials"
        lead="Applied AI/ML research at Tata Consultancy Services (TCS) Research, M.Tech. thesis work at NIT Warangal, earlier computer vision engineering at ZF Technologies, and Harish’s categorized technical toolbox."
      />

      <ExperienceSection />
      <EducationAndEarlierWork />

      {/* Research Toolbox */}
      <section id="toolbox" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            index="TOOLBOX"
            eyebrow="Capabilities & Instruments"
            title="Research Toolbox"
            subtitle="Organized by research modality and engineering stack—focused on signal pipelines, graph architectures, explainability, and reproducible prototypes."
          />

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

      <PagePager
        prev={{
          label: 'Publications & Timeline',
          subtitle: 'Accepted papers & research chronology',
          route: '/publications',
        }}
        next={{
          label: 'About & Contact',
          subtitle: 'Research trajectory, bio & correspondence',
          route: '/about',
        }}
        onNavigate={onNavigate}
      />
    </div>
  );
};

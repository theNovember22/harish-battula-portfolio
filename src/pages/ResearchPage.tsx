import React, { useState } from 'react';
import { ResearchFocus } from '../sections/ResearchFocus';
import { SelectedResearch } from '../sections/SelectedResearch';
import { ResearchApproach } from '../sections/ResearchApproach';
import { PageHeader, PagePager } from '../components/PageChrome';
import { SELECTED_RESEARCH } from '../data/researchProjects';
import { PageRoute } from '../lib/router';

interface ResearchPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({ onNavigate }) => {
  const [activeJump, setActiveJump] = useState<string>(SELECTED_RESEARCH[0].id);

  const scrollToStudy = (id: string) => {
    setActiveJump(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      <PageHeader
        sectionTag="01 // Selected Research & Methodology"
        title="Research Case Studies"
        lead="Detailed scientific case studies spanning spontaneous speech Alzheimer’s detection, physiological heart-rate confidence proxies, exercise-speech ICA decomposition, and synchronized 40+ participant multimodal data collection."
        metaRight={
          <div className="flex flex-wrap gap-1.5">
            {SELECTED_RESEARCH.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToStudy(item.id)}
                className={`rounded-md border px-2.5 py-1.5 font-mono-tech text-[11px] font-medium transition-colors ${
                  activeJump === item.id
                    ? 'border-[#0F766E] bg-[#0F766E] text-white'
                    : 'border-[#E3E0D6] bg-white text-[#434956] hover:border-[#0F766E]'
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        }
      />

      <div className="border-b border-[#E3E0D6] bg-[#F3F1EA]/45">
        <ResearchFocus />
      </div>
      <SelectedResearch />
      <ResearchApproach />

      <PagePager
        prev={{
          label: 'Overview',
          subtitle: 'Hero, metrics & research domains',
          route: '/',
        }}
        next={{
          label: 'Signal Lab',
          subtitle: 'Interactive Speech, ECG, PPG & PCG traces',
          route: '/signal-lab',
        }}
        onNavigate={onNavigate}
      />
    </div>
  );
};

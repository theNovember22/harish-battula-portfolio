import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SignalLab } from '../components/SignalLab';
import { OpenResearch } from '../sections/OpenResearch';
import { PageHeader, PagePager } from '../components/PageChrome';
import { PROFILE } from '../data/profile';
import { PageRoute } from '../lib/router';

interface SignalLabPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const SignalLabPage: React.FC<SignalLabPageProps> = ({ onNavigate }) => {
  return (
    <div>
      <PageHeader
        sectionTag="02 // Interactive Signal Lab & Open Tools"
        title="Research Signal & Open Code"
        lead="Inspect the four biomedical and acoustic modalities central to Harish’s research—Speech, ECG, PPG, and PCG—alongside his public signal-processing and time-series repositories."
        metaRight={
          <a
            href={PROFILE.links.signalExplorer}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0F766E] px-4 py-2.5 font-mono-tech text-xs font-semibold text-white transition-colors hover:bg-[#0D5E57]"
          >
            Launch Signal Explorer
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        }
      />

      <section className="border-b border-[#E3E0D6] bg-[#F3F1EA]/45 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SignalLab />
        </div>
      </section>

      <OpenResearch />

      <PagePager
        prev={{
          label: 'Research Case Studies',
          subtitle: '4 structured papers & methodology pipeline',
          route: '/research',
        }}
        next={{
          label: 'Publications & Timeline',
          subtitle: 'INTERSPEECH, EUSIPCO & IEEE IAS library',
          route: '/publications',
        }}
        onNavigate={onNavigate}
      />
    </div>
  );
};

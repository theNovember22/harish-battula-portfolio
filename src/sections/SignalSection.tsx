import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { SignalLab } from '../components/SignalLab';

export const SignalSection: React.FC = () => {
  return (
    <section id="research-signal" className="border-y border-[#E3E0D6] bg-[#F3F1EA]/55 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="02"
          eyebrow="Interactive Signal Lab"
          title="Research Signal"
          subtitle="Switch across the four physiological and acoustic modalities central to Harish’s research—inspecting what each waveform captures and how it translates into ML studies."
        />
        <SignalLab />
      </div>
    </section>
  );
};

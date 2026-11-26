import React from 'react';
import { PROFILE } from '../data/profile';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#E3E0D6] bg-[#F3F1EA]/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-xs text-[#6B7280] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 font-mono-tech">
          <span className="font-semibold text-[#111318]">{PROFILE.name}</span>
          <span>•</span>
          <span>{PROFILE.role}</span>
          <span>•</span>
          <span>{PROFILE.location}</span>
        </div>
        <div className="font-mono-tech text-[11px]">
          Speech • Biomedical Signals • Healthcare AI • Trustworthy ML
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { PROFILE } from '../data/profile';
import { PageRoute, ROUTES } from '../lib/router';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#E3E0D6] bg-[#F3F1EA]/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-xs text-[#6B7280] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-wrap items-center gap-2 font-mono-tech">
          <span className="font-semibold text-[#111318]">{PROFILE.name}</span>
          <span>•</span>
          <span>{PROFILE.role}</span>
          <span>•</span>
          <span>{PROFILE.location}</span>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-4 font-mono-tech text-[11px]">
          {ROUTES.map((item) => (
            <a
              key={item.path}
              href={`#${item.path}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.path);
              }}
              className="text-[#434956] transition-colors hover:text-[#0F766E]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};

import React from 'react';
import { ArrowUpRight, FileDown, Mail, MapPin } from 'lucide-react';
import { CHAPTER_09_CONTACT, PROFILE } from '../data/profile.js';

export const ContactPage: React.FC = () => {
  return (
    <div className="flex min-h-[calc(100svh-12rem)] items-center py-12 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#111318] bg-[#111318] p-7 text-[#FAF9F6] sm:p-12">
          <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[#2DD4BF]">
            {CHAPTER_09_CONTACT.code}
          </span>
          <h1 className="font-serif-display mt-3 max-w-3xl text-3xl font-medium leading-tight text-white sm:text-5xl">
            {CHAPTER_09_CONTACT.closingLine}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300">
            {CHAPTER_09_CONTACT.subline}
          </p>

          <div className="mt-5 inline-flex items-center rounded-full border border-[#2DD4BF]/35 bg-[#2DD4BF]/10 px-3.5 py-1.5 font-mono-tech text-[11px] text-[#2DD4BF]">
            {PROFILE.openTo}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0F766E] px-5 py-3 font-mono-tech text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#115E59]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {PROFILE.email}
            </a>
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-4 py-3 font-mono-tech text-xs font-medium text-white transition-colors hover:border-[#2DD4BF] hover:text-[#2DD4BF]"
            >
              LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={PROFILE.links.scholar}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-4 py-3 font-mono-tech text-xs font-medium text-white transition-colors hover:border-[#2DD4BF] hover:text-[#2DD4BF]"
            >
              Google Scholar
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-4 py-3 font-mono-tech text-xs font-medium text-white transition-colors hover:border-[#2DD4BF] hover:text-[#2DD4BF]"
            >
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={PROFILE.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-4 py-3 font-mono-tech text-xs font-medium text-white transition-colors hover:border-[#2DD4BF] hover:text-[#2DD4BF]"
            >
              <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
              Download CV
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-5 font-mono-tech text-xs text-gray-400">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#2DD4BF]" aria-hidden="true" />
              {PROFILE.location}
            </span>
            <span>Harish Battula • AI/ML Researcher</span>
          </div>
        </div>
      </div>
    </div>
  );
};

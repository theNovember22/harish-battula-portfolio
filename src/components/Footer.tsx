import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, FileDown, Mail, MapPin } from 'lucide-react';
import { PROFILE } from '../data/profile.js';

export const Footer: React.FC = () => {
  return (
    <footer className="hidden border-t border-[#E4E1D8] bg-[#F2EFE8]/75 md:block">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-12">
          {/* Column 1: Researcher Identity */}
          <div className="md:col-span-5">
            <div className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[#111318]">
              {PROFILE.name.toUpperCase()}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[#434956]">
              {PROFILE.role} at {PROFILE.affiliation}. Working across speech processing,
              biomedical signals (ECG, PPG, PCG), graph neural networks, and trustworthy
              machine learning for healthcare.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3 font-mono-tech text-[11px] text-[#6B7280]">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-[#0F766E]" aria-hidden="true" />
                {PROFILE.location}
              </span>
              <span>•</span>
              <span>Reviewer: IEEE IAS &amp; Elsevier BSPC</span>
            </div>
          </div>

          {/* Column 2: Portfolio Navigation */}
          <div className="md:col-span-3">
            <div className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0F766E]">
              Navigation
            </div>
            <nav aria-label="Footer navigation" className="mt-3 flex flex-col gap-2 text-sm">
              <Link to="/" className="text-[#434956] hover:text-[#0F766E]">
                Home
              </Link>
              <Link to="/projects" className="text-[#434956] hover:text-[#0F766E]">
                Projects (Chapters 01–06)
              </Link>
              <Link to="/education" className="text-[#434956] hover:text-[#0F766E]">
                Education Details
              </Link>
              <Link to="/experience" className="text-[#434956] hover:text-[#0F766E]">
                Professional Experience
              </Link>
              <Link to="/contact" className="text-[#434956] hover:text-[#0F766E]">
                Contact
              </Link>
            </nav>
          </div>

          {/* Column 3: Research & Contact Links */}
          <div className="md:col-span-4">
            <div className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0F766E]">
              Research &amp; Direct Links
            </div>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-1.5 text-[#111318] hover:text-[#0F766E]"
              >
                <Mail className="h-3.5 w-3.5 text-[#0F766E]" aria-hidden="true" />
                {PROFILE.email}
              </a>
              <a
                href={PROFILE.links.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#434956] hover:text-[#0F766E]"
              >
                Google Scholar
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href={PROFILE.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#434956] hover:text-[#0F766E]"
              >
                LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href={PROFILE.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#434956] hover:text-[#0F766E]"
              >
                GitHub (battulaharish2)
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href={PROFILE.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[#0F766E] hover:underline"
              >
                <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
                Download CV (PDF)
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-[#DFDBD0] pt-5 font-mono-tech text-[11px] text-[#6B7280] sm:flex-row sm:items-center sm:justify-between">
          <span>{PROFILE.openTo}</span>
          <span>Harish Battula • Research Portfolio</span>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { ArrowUpRight, FileDown, Mail } from 'lucide-react';
import { PROFILE } from '../data/profile.js';

export const Footer: React.FC = () => {
  return (
    <footer
      className="hidden border-t border-[var(--border-hairline)] backdrop-blur-xl transition-colors duration-200 md:block"
      style={{ backgroundColor: 'var(--bg-header)' }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        {/* Essential identity */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[var(--ink-secondary)]">
          <span className="font-mono-tech font-semibold tracking-[0.12em] text-[var(--ink-primary)]">
            {PROFILE.name.toUpperCase()}
          </span>
          <span className="text-[var(--ink-muted)]">•</span>
          <span>
            {PROFILE.role}, {PROFILE.affiliation}
          </span>
          <span className="text-[var(--ink-muted)]">•</span>
          <span className="font-mono-tech text-[11px] text-[var(--ink-muted)]">
            {PROFILE.location}
          </span>
        </div>

        {/* Essential direct contact & research links */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono-tech text-xs">
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-1.5 text-[var(--ink-primary)] transition-colors hover:text-[var(--accent-signal)]"
          >
            <Mail className="h-3.5 w-3.5 text-[var(--accent-signal)]" aria-hidden="true" />
            {PROFILE.email}
          </a>
          <a
            href={PROFILE.links.scholar}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-[var(--ink-secondary)] transition-colors hover:text-[var(--accent-signal)]"
          >
            Scholar
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
          <a
            href={PROFILE.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-[var(--ink-secondary)] transition-colors hover:text-[var(--accent-signal)]"
          >
            LinkedIn
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
          <a
            href={PROFILE.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-[var(--ink-secondary)] transition-colors hover:text-[var(--accent-signal)]"
          >
            GitHub
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
          <a
            href={PROFILE.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[var(--accent-signal)] hover:underline"
          >
            <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
            CV
          </a>
        </div>
      </div>
    </footer>
  );
};

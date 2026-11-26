import React from 'react';
import { FileDown } from 'lucide-react';
import { CHAPTERS, PROFILE } from '../data/profile.js';

interface NavbarProps {
  activeChapterId: string;
  progressRatio: number;
  onJumpToChapter: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeChapterId,
  progressRatio,
  onJumpToChapter,
}) => {
  const activeIndex = Math.max(
    0,
    CHAPTERS.findIndex((c) => c.id === activeChapterId)
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#E4E1D8]/80 bg-[#FAF9F6]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onJumpToChapter('hero')}
          className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[#111318] transition-colors hover:text-[#0F766E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] rounded px-1 py-0.5 sm:text-sm"
        >
          {PROFILE.name.toUpperCase()}
        </button>

        <div className="flex items-center gap-3 sm:gap-5">
          {/* Chapter Progress Dots */}
          <nav
            aria-label="Chapter progress navigation"
            className="hidden items-center gap-1.5 sm:flex"
          >
            {CHAPTERS.map((ch, idx) => {
              const isActive = ch.id === activeChapterId;
              const isPassed = idx < activeIndex;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => onJumpToChapter(ch.id)}
                  title={`${ch.code} — ${ch.shortTitle}`}
                  aria-label={`Jump to chapter ${ch.code}: ${ch.shortTitle}`}
                  aria-current={isActive ? 'step' : undefined}
                  className="group relative flex h-6 w-4 items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] rounded"
                >
                  <span
                    className={`block rounded-full transition-all ${
                      isActive
                        ? 'h-2.5 w-2.5 bg-[#0F766E] ring-4 ring-[#0F766E]/15'
                        : isPassed
                        ? 'h-1.5 w-1.5 bg-[#0F766E]/55 group-hover:scale-125'
                        : 'h-1.5 w-1.5 bg-[#C9C4B8] group-hover:bg-[#111318]'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Mobile compact chapter counter */}
          <span className="font-mono-tech text-[11px] text-[#6B7280] sm:hidden">
            {String(activeIndex).padStart(2, '0')} / {String(CHAPTERS.length - 1).padStart(2, '0')}
          </span>

          <a
            href={PROFILE.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-[#111318] bg-[#111318] px-3 py-1.5 font-mono-tech text-[11px] font-medium tracking-wider text-white transition-colors hover:border-[#0F766E] hover:bg-[#0F766E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
          >
            <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
            CV
          </a>
        </div>
      </div>

      {/* Thin Reading Progress Line */}
      <div className="h-[2px] w-full bg-[#ECE9E0]" aria-hidden="true">
        <div
          className="h-full bg-[#0F766E] transition-[width] duration-150 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progressRatio * 100))}%` }}
        />
      </div>
    </header>
  );
};

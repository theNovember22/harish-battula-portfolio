import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileDown, Menu, X } from 'lucide-react';
import { PROFILE } from '../data/profile.js';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Education', to: '/education' },
  { label: 'Experience', to: '/experience' },
  { label: 'Contact', to: '/contact' },
];

export const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E4E1D8]/80 bg-[#FAF9F6]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[#111318] transition-colors hover:text-[#0F766E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] rounded px-1 py-0.5 sm:text-sm"
        >
          {PROFILE.name.toUpperCase()}
        </Link>

        {/* Top-right blended navigation links directly left of CV button */}
        <div className="flex items-center gap-2 md:gap-5">
          <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={isActive ? 'page' : undefined}
                  className={`rounded-md px-3 py-1.5 font-mono-tech text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
                    isActive
                      ? 'text-[#0F766E] underline decoration-[#0F766E] decoration-2 underline-offset-[6px] font-semibold'
                      : 'text-[#434956] hover:text-[#111318]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <a
            href={PROFILE.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-[#111318] bg-[#111318] px-3 py-1.5 font-mono-tech text-[11px] font-medium tracking-wider text-white transition-colors hover:border-[#0F766E] hover:bg-[#0F766E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
          >
            <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
            CV
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex items-center justify-center rounded-md border border-[#E4E1D8] bg-white p-1.5 text-[#111318] transition-colors hover:border-[#0F766E] hover:text-[#0F766E] md:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-[#E4E1D8] bg-[#FAF9F6] px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`rounded-md px-3 py-2 font-mono-tech text-xs font-medium ${
                    isActive
                      ? 'bg-[#0F766E]/10 font-semibold text-[#0F766E]'
                      : 'text-[#111318] hover:bg-[#F2EFE8]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};

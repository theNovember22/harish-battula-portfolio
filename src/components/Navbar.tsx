import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Activity,
  Briefcase,
  FileDown,
  GraduationCap,
  Home,
  Mail,
} from 'lucide-react';
import { PROFILE } from '../data/profile.js';

const NAV_LINKS = [
  { label: 'Home', mobileLabel: 'Home', to: '/', icon: Home },
  { label: 'Projects', mobileLabel: 'Projects', to: '/projects', icon: Activity },
  { label: 'Education', mobileLabel: 'Edu', to: '/education', icon: GraduationCap },
  { label: 'Experience', mobileLabel: 'Exp', to: '/experience', icon: Briefcase },
  { label: 'Contact', mobileLabel: 'Contact', to: '/contact', icon: Mail },
];

export const Navbar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      {/* Top Bar: Full blended nav on Desktop; minimal native app bar on Mobile */}
      <header className="sticky top-0 z-50 border-b border-[#E4E1D8]/80 bg-[#FAF9F6]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center gap-2 rounded px-1 py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
          >
            <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[#111318] transition-colors hover:text-[#0F766E] sm:text-sm">
              {PROFILE.name.toUpperCase()}
            </span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#0F766E] md:hidden" aria-hidden="true" />
          </Link>

          <div className="flex items-center gap-2 md:gap-5">
            {/* Desktop blended links directly left of CV */}
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
              className="inline-flex items-center gap-1.5 rounded-full border border-[#111318] bg-[#111318] px-3.5 py-1.5 font-mono-tech text-[11px] font-medium tracking-wider text-white transition-colors hover:border-[#0F766E] hover:bg-[#0F766E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] md:rounded-md"
            >
              <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
              CV
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Floating Bottom Pill Navigation Dock */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 pb-[env(safe-area-inset-bottom)] md:hidden">
        <nav
          aria-label="Mobile bottom navigation"
          className="pointer-events-auto flex w-full max-w-sm items-center justify-between gap-1 rounded-full border border-[#D8D4C9] bg-[#FAF9F6]/92 p-1.5 shadow-[0_16px_38px_-12px_rgba(17,19,24,0.32)] backdrop-blur-xl"
        >
          {NAV_LINKS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full py-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
                  isActive
                    ? 'bg-[#111318] text-white shadow-sm'
                    : 'text-[#434956] hover:bg-[#EFECE4] hover:text-[#111318]'
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${isActive ? 'text-[#2DD4BF]' : 'text-current'}`}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  aria-hidden="true"
                />
                <span className="font-mono-tech text-[9.5px] font-medium leading-none tracking-tight">
                  {item.mobileLabel}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

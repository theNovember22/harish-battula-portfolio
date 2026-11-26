import React, { useState, useEffect } from 'react';
import { Menu, X, FileDown } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { PageRoute, ROUTES } from '../lib/router';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, path: PageRoute) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled
          ? 'border-[#E3E0D6] bg-[#FAF9F6]/94 backdrop-blur-md'
          : 'border-[#E3E0D6]/70 bg-[#FAF9F6]/85 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <a
          href="#/"
          onClick={(e) => handleNavClick(e, '/')}
          className="group inline-flex items-center gap-2.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#111318] bg-[#111318] font-mono-tech text-xs font-semibold tracking-wider text-[#FAF9F6] transition-colors group-hover:border-[#0F766E] group-hover:bg-[#0F766E]">
            {PROFILE.monogram}
          </span>
          <span className="font-mono-tech text-xs font-semibold tracking-[0.12em] text-[#111318] sm:text-sm">
            HARISH BATTULA
          </span>
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:gap-2 md:flex">
          {ROUTES.map((item) => {
            const isActive = currentRoute === item.path;
            return (
              <a
                key={item.path}
                href={`#${item.path}`}
                onClick={(e) => handleNavClick(e, item.path)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative rounded-md px-2.5 py-1.5 font-mono-tech text-[11px] font-medium tracking-[0.11em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] lg:px-3 ${
                  isActive
                    ? 'bg-[#0F766E]/10 text-[#0F766E] font-semibold'
                    : 'text-[#434956] hover:bg-[#F3F1EA] hover:text-[#111318]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href={PROFILE.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-1.5 rounded-md border border-[#0F766E] bg-[#0F766E]/5 px-3 py-1.5 font-mono-tech text-[11px] font-semibold tracking-[0.08em] text-[#0F766E] transition-colors hover:bg-[#0F766E] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
          >
            <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
            CV
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex items-center justify-center rounded-md border border-[#E3E0D6] bg-white p-2 text-[#111318] transition-colors hover:border-[#0F766E] hover:text-[#0F766E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] md:hidden"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-[#E3E0D6] bg-[#FAF9F6] px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {ROUTES.map((item) => {
              const isActive = currentRoute === item.path;
              return (
                <a
                  key={item.path}
                  href={`#${item.path}`}
                  onClick={(e) => handleNavClick(e, item.path)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`rounded-md px-3 py-2.5 font-mono-tech text-xs font-medium tracking-[0.12em] ${
                    isActive
                      ? 'bg-[#0F766E]/10 font-semibold text-[#0F766E]'
                      : 'text-[#111318] hover:bg-[#F3F1EA] hover:text-[#0F766E]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href={PROFILE.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-[#0F766E] px-4 py-2.5 font-mono-tech text-xs font-medium tracking-[0.1em] text-white"
            >
              <FileDown className="h-4 w-4" aria-hidden="true" />
              DOWNLOAD CV (PDF)
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

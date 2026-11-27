import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import {
  Activity,
  Briefcase,
  FileDown,
  GraduationCap,
  Home,
  Mail,
  Moon,
  Sun,
} from 'lucide-react';
import { PROFILE } from '../data/profile.js';
import { useTheme } from '../lib/ThemeContext';

const NAV_LINKS = [
  { label: 'Home', mobileLabel: 'Home', to: '/', icon: Home },
  { label: 'Projects', mobileLabel: 'Projects', to: '/projects', icon: Activity },
  { label: 'Education', mobileLabel: 'Edu', to: '/education', icon: GraduationCap },
  { label: 'Experience', mobileLabel: 'Exp', to: '/experience', icon: Briefcase },
  { label: 'Contact', mobileLabel: 'Contact', to: '/contact', icon: Mail },
];

export const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  const isDark = theme === 'dark';

  return (
    <>
      {/* Top Bar: Apple OS Liquid Glass header */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-2xl backdrop-saturate-200 transition-colors duration-200"
        style={{
          backgroundColor: 'var(--bg-header)',
          borderColor: 'var(--border-hairline)',
          boxShadow: 'inset 0 1px 0 var(--glass-rim), inset 0 -1px 0 var(--glass-bottom-rim)',
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="group flex items-center gap-2 rounded px-1 py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-signal)]"
          >
            <span
              className="animate-cardiac inline-block h-2 w-2 rounded-full bg-[var(--accent-signal)]"
              aria-hidden="true"
            />
            <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[var(--ink-primary)] transition-colors group-hover:text-[var(--accent-signal)] sm:text-sm">
              {PROFILE.name.toUpperCase()}
            </span>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Desktop blended links directly left of Theme + CV */}
            <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((item) => {
                const isActive = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative rounded-md px-3 py-1.5 font-mono-tech text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-signal)] ${
                      isActive
                        ? 'font-semibold text-[var(--accent-signal)]'
                        : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="desktop-nav-underline"
                        transition={{ type: 'spring', stiffness: 440, damping: 34 }}
                        className="pointer-events-none absolute inset-x-2.5 -bottom-[1px] h-[2px] rounded-full bg-[var(--accent-signal)]"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Theme Switcher Button (Light / Dark) */}
            <motion.button
              type="button"
              onClick={toggleTheme}
              whileTap={{ scale: 0.92 }}
              aria-label={isDark ? 'Switch to light editorial theme' : 'Switch to dark oscilloscope theme'}
              title={isDark ? 'Switch to Light theme' : 'Switch to Dark theme'}
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-2.5 font-mono-tech text-[11px] font-medium text-[var(--ink-secondary)] transition-colors hover:border-[var(--accent-signal)] hover:text-[var(--accent-signal)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-signal)] md:rounded-md"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -60, opacity: 0, scale: 0.7 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 60, opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.16 }}
                    className="inline-flex items-center gap-1"
                  >
                    <Sun className="h-3.5 w-3.5 text-[#FBBF24]" aria-hidden="true" />
                    <span className="hidden sm:inline">Light</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 60, opacity: 0, scale: 0.7 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -60, opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.16 }}
                    className="inline-flex items-center gap-1"
                  >
                    <Moon className="h-3.5 w-3.5 text-[var(--accent-signal)]" aria-hidden="true" />
                    <span className="hidden sm:inline">Dark</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <a
              href={PROFILE.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--btn-primary-bg)] px-3.5 py-1.5 font-mono-tech text-[11px] font-semibold tracking-wider text-[var(--btn-primary-fg)] transition-all hover:bg-[var(--btn-primary-hover)] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-signal)] md:rounded-md"
            >
              <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
              CV
            </a>
          </div>
        </div>

        {/* Dynamic signal scroll hairline */}
        <motion.div
          style={{
            scaleX,
            background:
              'linear-gradient(90deg, var(--accent-signal) 0%, var(--accent-signal-vivid) 55%, var(--accent-data) 100%)',
          }}
          className="h-[2px] origin-left"
          aria-hidden="true"
        />
      </header>

      {/* Mobile Floating Bottom Pill Navigation Dock — pure accessible <Link> with no nested focusable divs */}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 pb-[env(safe-area-inset-bottom)] md:hidden">
        <nav
          aria-label="Mobile bottom navigation"
          style={{
            backgroundColor: 'var(--bg-dock)',
            borderColor: 'var(--border-dock)',
            boxShadow: 'var(--dock-shadow)',
          }}
          className="pointer-events-auto flex w-full max-w-sm items-center justify-between gap-1 rounded-full border p-1.5 backdrop-blur-2xl backdrop-saturate-200"
        >
          {NAV_LINKS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full py-2 transition-transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-signal)] ${
                  isActive
                    ? 'text-[var(--btn-primary-fg)]'
                    : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-pill"
                    transition={{ type: 'spring', stiffness: 430, damping: 32 }}
                    className="pointer-events-none absolute inset-0 rounded-full bg-[var(--btn-primary-bg)] shadow-sm"
                    aria-hidden="true"
                  />
                )}
                <Icon
                  className={`pointer-events-none relative z-10 h-4 w-4 ${
                    isActive && !isDark ? 'text-[#2DD4BF]' : ''
                  }`}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  aria-hidden="true"
                />
                <span className="pointer-events-none relative z-10 font-mono-tech text-[9.5px] font-medium leading-none tracking-tight">
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

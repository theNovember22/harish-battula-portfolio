import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, FileDown, Mail, MapPin } from 'lucide-react';
import { CHAPTER_09_CONTACT, PROFILE } from '../data/profile.js';

export const ContactPage: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = PROFILE.email;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } finally {
        document.body.removeChild(ta);
      }
    }
  };

  return (
    <div className="py-6 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-5 md:gap-8 lg:grid-cols-12">
          {/* Left: Direct Email & Availability */}
          <div className="surface-card flex flex-col justify-between rounded-2xl p-5 sm:p-10 lg:col-span-7">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-signal-ring)] bg-[var(--accent-signal-soft)] px-3 py-1 font-mono-tech text-[10px] font-medium text-[var(--accent-signal)] sm:text-[11px]">
                <span className="animate-cardiac h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-signal)]" />
                <span className="md:hidden">Open to AI/ML Research &amp; Healthcare AI</span>
                <span className="hidden md:inline">{PROFILE.openTo}</span>
              </div>

              <h1 className="font-serif-display mt-3 text-[28px] font-medium leading-[1.08] tracking-[-0.025em] text-[var(--ink-primary)] sm:mt-5 sm:text-5xl">
                {CHAPTER_09_CONTACT.closingLine}
              </h1>

              <p className="mt-3 hidden max-w-xl text-base leading-relaxed text-[var(--ink-secondary)] sm:block sm:text-lg">
                {CHAPTER_09_CONTACT.subline}
              </p>

              {/* Direct Email Copy Studio */}
              <div className="mt-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-4 sm:mt-8 sm:p-5">
                <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">
                  Direct Email
                </div>
                <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-mono-tech text-sm font-semibold text-[var(--ink-primary)] sm:text-lg">
                    {PROFILE.email}
                  </span>
                  <div className="flex gap-2">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCopyEmail}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-paper)] px-3 py-2 font-mono-tech text-xs font-medium text-[var(--ink-primary)] transition-colors hover:border-[var(--accent-signal)] hover:text-[var(--accent-signal)] sm:flex-none"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {copied ? (
                          <motion.span
                            key="copied"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="inline-flex items-center gap-1.5 text-[var(--accent-signal)]"
                          >
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                            Copied
                          </motion.span>
                        ) : (
                          <motion.span
                            key="copy"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="inline-flex items-center gap-1.5"
                          >
                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                            Copy
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[var(--btn-primary-bg)] px-4 py-2 font-mono-tech text-xs font-semibold text-[var(--btn-primary-fg)] transition-colors hover:bg-[var(--btn-primary-hover)] sm:flex-none"
                    >
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Conversation Topics (Desktop) */}
            <div className="mt-8 hidden border-t border-[var(--border-subtle)] pt-6 sm:block">
              <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">
                Topics I’d Gladly Discuss
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {CHAPTER_09_CONTACT.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-md border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3 py-1.5 font-mono-tech text-xs text-[var(--ink-primary)]"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Obsidian Links Dossier (harmonious in both Light & Dark modes) */}
          <div
            style={{ backgroundColor: 'var(--bg-dossier)' }}
            className="flex flex-col justify-between rounded-2xl border border-[var(--border-hairline)] p-5 text-[#FAF9F6] shadow-[0_22px_50px_-28px_rgba(0,0,0,0.5)] sm:p-9 lg:col-span-5"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/15 pb-3 sm:pb-4">
                <span className="font-mono-tech text-[11px] font-semibold tracking-[0.14em] text-[#2DD4BF] sm:text-xs">
                  {CHAPTER_09_CONTACT.code}
                </span>
                <span className="inline-flex items-center gap-1 font-mono-tech text-[11px] text-gray-300 sm:text-xs">
                  <MapPin className="h-3.5 w-3.5 text-[#2DD4BF]" aria-hidden="true" />
                  {PROFILE.location} • IST
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-6 sm:grid-cols-1 sm:gap-3">
                {[
                  {
                    title: 'Google Scholar',
                    subtitle: 'INTERSPEECH • EUSIPCO • IEEE IAS',
                    href: PROFILE.links.scholar,
                  },
                  {
                    title: 'LinkedIn',
                    subtitle: 'Harish Battula • TCS Research',
                    href: PROFILE.links.linkedin,
                  },
                  {
                    title: 'GitHub',
                    subtitle: 'battulaharish2 • Signal Explorer',
                    href: PROFILE.links.github,
                  },
                  {
                    title: 'Journal',
                    subtitle: 'Heart-sound & conference notes',
                    href: PROFILE.links.researchJournal,
                  },
                ].map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-white/12 bg-white/[0.04] p-3 transition-all hover:border-[#2DD4BF] hover:bg-white/[0.08] sm:p-4"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-xs font-semibold text-white group-hover:text-[#2DD4BF] sm:text-sm">
                        {item.title}
                      </div>
                      <div className="mt-0.5 hidden truncate font-mono-tech text-[11px] text-gray-400 sm:block">
                        {item.subtitle}
                      </div>
                    </div>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#2DD4BF] sm:h-4 sm:w-4"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-4 border-t border-white/15 pt-4 sm:mt-6">
              <a
                href={PROFILE.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-4 py-3 font-mono-tech text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#14B8A6] hover:text-[#070A0E] sm:px-5 sm:py-3.5"
              >
                <FileDown className="h-4 w-4" aria-hidden="true" />
                Download CV (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

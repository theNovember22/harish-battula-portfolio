import React, { useState } from 'react';
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
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-8 lg:grid-cols-12">
          {/* Left: Calm Editorial Invitation & One-Click Email Studio */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#E4E1D8] bg-white p-7 shadow-[0_18px_50px_-34px_rgba(17,19,24,0.2)] sm:p-10 lg:col-span-7">
            <div>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-[#0F766E]/25 bg-[#0F766E]/8 px-3.5 py-1.5 font-mono-tech text-[11px] font-medium text-[#0F766E] sm:rounded-full">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F766E]" />
                <span>{PROFILE.openTo}</span>
              </div>

              <h1 className="font-serif-display mt-5 text-4xl font-medium leading-[1.08] tracking-[-0.025em] text-[#111318] sm:text-5xl">
                {CHAPTER_09_CONTACT.closingLine}
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#434956] sm:text-lg">
                {CHAPTER_09_CONTACT.subline}
              </p>

              {/* Direct Email Copy Studio */}
              <div className="mt-8 rounded-xl border border-[#E4E1D8] bg-[#FAF9F6] p-4 sm:p-5">
                <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
                  Direct Research Email
                </div>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-mono-tech text-base font-semibold text-[#111318] sm:text-lg">
                    {PROFILE.email}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#E4E1D8] bg-white px-3.5 py-2 font-mono-tech text-xs font-medium text-[#111318] transition-colors hover:border-[#0F766E] hover:text-[#0F766E]"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#0F766E]" aria-hidden="true" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          Copy Email
                        </>
                      )}
                    </button>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#0F766E] px-4 py-2 font-mono-tech text-xs font-semibold text-white transition-colors hover:bg-[#0D5E57]"
                    >
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                      Compose
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Conversation Topics */}
            <div className="mt-8 border-t border-[#EFECE4] pt-6">
              <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
                Topics I’d Gladly Discuss
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {CHAPTER_09_CONTACT.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-md border border-[#E4E1D8] bg-[#FAF9F6] px-3 py-1.5 font-mono-tech text-xs text-[#111318]"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Obsidian Correspondence Dossier */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#111318] bg-[#111318] p-7 text-[#FAF9F6] sm:p-9 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[#2DD4BF]">
                  {CHAPTER_09_CONTACT.code}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono-tech text-xs text-gray-300">
                  <MapPin className="h-3.5 w-3.5 text-[#2DD4BF]" aria-hidden="true" />
                  {PROFILE.location}
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  {
                    title: 'Google Scholar',
                    subtitle: 'INTERSPEECH 2025 • EUSIPCO 2024/2026 • IEEE IAS',
                    href: PROFILE.links.scholar,
                  },
                  {
                    title: 'LinkedIn',
                    subtitle: 'Harish Battula • TCS Research',
                    href: PROFILE.links.linkedin,
                  },
                  {
                    title: 'GitHub',
                    subtitle: 'battulaharish2 • Signal Explorer & Research Journal',
                    href: PROFILE.links.github,
                  },
                  {
                    title: 'Research Journal',
                    subtitle: 'Heart-sound notes & conference field journals',
                    href: PROFILE.links.researchJournal,
                  },
                ].map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl border border-white/12 bg-white/[0.04] p-4 transition-all hover:border-[#2DD4BF] hover:bg-white/[0.08]"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-[#2DD4BF]">
                        {item.title}
                      </div>
                      <div className="mt-0.5 font-mono-tech text-[11px] text-gray-400">
                        {item.subtitle}
                      </div>
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#2DD4BF]"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/15">
              <a
                href={PROFILE.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-5 py-3.5 font-mono-tech text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#115E59]"
              >
                <FileDown className="h-4 w-4" aria-hidden="true" />
                Download Curriculum Vitae (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

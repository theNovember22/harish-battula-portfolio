import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight, FileDown, Mail, MapPin, User } from 'lucide-react';
import {
  CHAPTER_01,
  CHAPTER_02,
  CHAPTER_03,
  CHAPTER_04,
  CHAPTER_05,
  CHAPTER_06,
  CHAPTER_07,
  CHAPTER_09_CONTACT,
  HERO_CONTENT,
  PROFILE,
  PUBLICATIONS,
} from '../data/profile.js';
import { ChapterShell } from '../components/ChapterShell';
import { MorphWaveformCanvas } from '../visuals/MorphWaveformCanvas';
import { ThreeTrackSignalVisual } from '../visuals/ThreeTrackSignalVisual';
import { ConfidenceSpectrogramVisual } from '../visuals/ConfidenceSpectrogramVisual';
import { TranscriptToGraphVisual } from '../visuals/TranscriptToGraphVisual';
import { StethoscopeDysarthriaVisual } from '../visuals/StethoscopeDysarthriaVisual';
import { ShapSignalVisual } from '../visuals/ShapSignalVisual';
import { TrajectoryCurveVisual } from '../visuals/TrajectoryCurveVisual';

interface ChaptersProps {
  onJumpToChapter: (id: string) => void;
}

export const CuriosityChapters: React.FC<ChaptersProps> = ({ onJumpToChapter }) => {
  const [techMode, setTechMode] = useState<'simple' | 'technical'>('simple');
  const [photoMissing, setPhotoMissing] = useState(false);

  return (
    <>
      {/* 0. HERO */}
      <section
        id="hero"
        data-chapter="hero"
        className="chapter-snap flex flex-col justify-center pt-20 pb-10 sm:pt-24 sm:pb-12"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0F766E] sm:text-xs">
              {HERO_CONTENT.eyebrow}
            </p>
            <h1 className="font-serif-display mt-3 text-4xl font-medium leading-[1.06] tracking-[-0.025em] text-[#111318] sm:text-6xl lg:text-[66px]">
              {HERO_CONTENT.headline}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#434956] sm:text-lg">
              {HERO_CONTENT.subline}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onJumpToChapter('speech-hr')}
                className="inline-flex items-center gap-2 rounded-lg bg-[#111318] px-5 py-3 font-mono-tech text-xs font-semibold tracking-wider text-white transition-colors hover:bg-[#0F766E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
              >
                {HERO_CONTENT.primaryCta}
              </button>
              <a
                href={PROFILE.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono-tech text-xs font-medium text-[#434956] underline-offset-4 hover:text-[#0F766E] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] rounded px-1 py-1"
              >
                <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
                {HERO_CONTENT.secondaryCta}
              </a>
            </div>
          </div>

          {/* Live Speech-to-Heartbeat Waveform */}
          <div className="mt-8 sm:mt-10">
            <MorphWaveformCanvas />
          </div>

          {/* Compact 4-Fact Strip (Role, 4 Papers, 40+ Participants, ~91% Accuracy) */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PROFILE.quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-lg border border-[#E4E1D8] bg-white/80 px-3.5 py-2.5"
              >
                <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[#6B7280]">
                  {fact.label}
                </div>
                <div className="mt-0.5 text-xs font-semibold text-[#111318] sm:text-[13px]">
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1. CAN A VOICE REVEAL A HEARTBEAT? */}
      <ChapterShell id="speech-hr" tinted>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[#0F766E]">
              {CHAPTER_01.code}
            </span>
            <h2 className="font-serif-display mt-2 text-3xl font-medium leading-tight tracking-tight text-[#111318] sm:text-4xl">
              {CHAPTER_01.question}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#434956]">
              {CHAPTER_01.answer}
            </p>
            <p className="mt-4 font-mono-tech text-xs text-[#6B7280]">
              {CHAPTER_01.citationLabel}
            </p>
            <a
              href={CHAPTER_01.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
            >
              {CHAPTER_01.linkText}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
          <div className="lg:col-span-7">
            <ThreeTrackSignalVisual />
          </div>
        </div>
      </ChapterShell>

      {/* 2. CAN HEARTBEAT REVEAL CONFIDENCE? */}
      <ChapterShell id="confidence">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <ConfidenceSpectrogramVisual />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[#0F766E]">
              {CHAPTER_02.code}
            </span>
            <h2 className="font-serif-display mt-2 text-3xl font-medium leading-tight tracking-tight text-[#111318] sm:text-4xl">
              {CHAPTER_02.question}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#434956]">
              {CHAPTER_02.answer}
            </p>
            <p className="mt-4 font-mono-tech text-xs text-[#6B7280]">
              {CHAPTER_02.citationLabel}
            </p>
            <a
              href={CHAPTER_02.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
            >
              {CHAPTER_02.linkText}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </ChapterShell>

      {/* 3. CAN THE WAY WE TALK REVEAL ALZHEIMER'S? */}
      <ChapterShell id="alzheimers" tinted>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[#0F766E]">
              {CHAPTER_03.code}
            </span>
            <h2 className="font-serif-display mt-2 text-3xl font-medium leading-tight tracking-tight text-[#111318] sm:text-4xl">
              {CHAPTER_03.question}
            </h2>

            {/* Explain simply / Show technical toggle */}
            <div className="mt-4 inline-flex rounded-md border border-[#E4E1D8] bg-white p-0.5">
              <button
                type="button"
                onClick={() => setTechMode('simple')}
                className={`rounded px-3 py-1 font-mono-tech text-[11px] font-medium transition-colors ${
                  techMode === 'simple'
                    ? 'bg-[#111318] text-white'
                    : 'text-[#434956] hover:text-[#111318]'
                }`}
              >
                Explain simply
              </button>
              <button
                type="button"
                onClick={() => setTechMode('technical')}
                className={`rounded px-3 py-1 font-mono-tech text-[11px] font-medium transition-colors ${
                  techMode === 'technical'
                    ? 'bg-[#0F766E] text-white'
                    : 'text-[#434956] hover:text-[#111318]'
                }`}
              >
                Show technical
              </button>
            </div>

            <p className="mt-4 text-base leading-relaxed text-[#434956]">
              {techMode === 'simple'
                ? CHAPTER_03.simpleExplanation
                : CHAPTER_03.technicalExplanation}
            </p>
            <p className="mt-4 font-mono-tech text-xs text-[#6B7280]">
              {CHAPTER_03.citationLabel}
            </p>
            <a
              href={CHAPTER_03.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
            >
              {CHAPTER_03.linkText}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
          <div className="lg:col-span-7">
            <TranscriptToGraphVisual
              tokens={CHAPTER_03.sampleTranscriptTokens}
              accuracyLabel={CHAPTER_03.accuracyCallout}
            />
          </div>
        </div>
      </ChapterShell>

      {/* 4. WHAT CAN A STETHOSCOPE SOUND TELL US? */}
      <ChapterShell id="stethoscope">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <StethoscopeDysarthriaVisual />
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[#0F766E]">
              {CHAPTER_04.code}
            </span>
            <h2 className="font-serif-display mt-2 text-3xl font-medium leading-tight tracking-tight text-[#111318] sm:text-4xl">
              {CHAPTER_04.question}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#434956]">
              {CHAPTER_04.answer}
            </p>
            <a
              href={CHAPTER_04.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
            >
              {CHAPTER_04.linkText}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </ChapterShell>

      {/* 5. WHY SHOULD ANYONE TRUST THE MODEL? */}
      <ChapterShell id="trust" tinted>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[#0F766E]">
              {CHAPTER_05.code}
            </span>
            <h2 className="font-serif-display mt-2 text-3xl font-medium leading-tight tracking-tight text-[#111318] sm:text-4xl">
              {CHAPTER_05.question}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#434956]">
              {CHAPTER_05.answer}
            </p>
            <a
              href={CHAPTER_05.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
            >
              {CHAPTER_05.linkText}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
          <div className="lg:col-span-7">
            <ShapSignalVisual features={CHAPTER_05.shapFeatures} />
          </div>
        </div>
      </ChapterShell>

      {/* 6. WHERE IS THIS GOING? */}
      <ChapterShell id="vision">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <TrajectoryCurveVisual />
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {CHAPTER_06.milestones.map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-[#E4E1D8] bg-white px-3 py-2.5"
                >
                  <div className="text-xs font-semibold text-[#111318]">{m.label}</div>
                  <div className="mt-0.5 font-mono-tech text-[10px] text-[#6B7280]">{m.detail}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[#0F766E]">
              {CHAPTER_06.code}
            </span>
            <h2 className="font-serif-display mt-2 text-3xl font-medium leading-tight tracking-tight text-[#111318] sm:text-4xl">
              {CHAPTER_06.question}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#434956]">
              {CHAPTER_06.answerFirstPerson}
            </p>
            <button
              type="button"
              onClick={() => onJumpToChapter('about')}
              className="mt-5 inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
            >
              {CHAPTER_06.linkText}
              <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </ChapterShell>

      {/* 7. THE PERSON BEHIND THE SIGNALS */}
      <ChapterShell id="about" tinted>
        <div className="grid items-start gap-10 lg:grid-cols-12">
          {/* Portrait Placeholder / Real Photo */}
          <div className="lg:col-span-4">
            <div className="overflow-hidden rounded-2xl border border-[#E4E1D8] bg-white p-3">
              {!photoMissing ? (
                <img
                  src={CHAPTER_07.photoUrl}
                  alt={CHAPTER_07.photoAlt}
                  loading="lazy"
                  onError={() => setPhotoMissing(true)}
                  className="aspect-[4/5] w-full rounded-xl object-cover"
                />
              ) : (
                <div className="scientific-grid flex aspect-[4/5] w-full flex-col items-center justify-center rounded-xl border border-dashed border-[#C9C4B8] bg-[#FAF9F6] p-6 text-center">
                  <User className="h-10 w-10 text-[#0F766E]" aria-hidden="true" />
                  <p className="mt-3 font-mono-tech text-xs font-semibold text-[#111318]">
                    Portrait Placeholder
                  </p>
                  <p className="mt-1 font-mono-tech text-[11px] text-[#6B7280]">
                    Add photo at /public/images/harish.jpg
                  </p>
                </div>
              )}
              <div className="mt-3 flex items-center justify-between px-1 font-mono-tech text-[11px] text-[#6B7280]">
                <span>Reviewer: IEEE IAS &amp; Elsevier BSPC</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[#0F766E]">
              {CHAPTER_07.code}
            </span>
            <h2 className="font-serif-display mt-2 text-3xl font-medium leading-tight tracking-tight text-[#111318] sm:text-4xl">
              {CHAPTER_07.question}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#434956]">
              {CHAPTER_07.bio}
            </p>

            {/* Compact Path */}
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {CHAPTER_07.path.map((step) => (
                <div
                  key={step.period}
                  className="rounded-lg border border-[#E4E1D8] bg-white px-3.5 py-2.5"
                >
                  <div className="font-mono-tech text-[10px] font-semibold text-[#0F766E]">
                    {step.period}
                  </div>
                  <div className="mt-0.5 text-sm font-semibold text-[#111318]">{step.role}</div>
                  <div className="text-xs text-[#6B7280]">{step.org}</div>
                </div>
              ))}
            </div>

            {/* Compact Grouped Skills */}
            <div className="mt-5 grid gap-2 rounded-xl border border-[#E4E1D8] bg-white p-4 sm:grid-cols-2">
              {CHAPTER_07.skillGroups.map((sg) => (
                <div key={sg.group}>
                  <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[#0F766E]">
                    {sg.group}
                  </span>
                  <p className="mt-0.5 font-mono-tech text-[11px] leading-relaxed text-[#434956]">
                    {sg.items}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onJumpToChapter('publications')}
              className="mt-5 inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
            >
              {CHAPTER_07.linkText}
              <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </ChapterShell>

      {/* 8. PUBLICATIONS */}
      <ChapterShell id="publications">
        <div className="mb-8 flex flex-col gap-3 border-b border-[#E4E1D8] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[#0F766E]">
              CHAPTER 08
            </span>
            <h2 className="font-serif-display mt-2 text-3xl font-medium tracking-tight text-[#111318] sm:text-4xl">
              Publications
            </h2>
          </div>
          <a
            href={PROFILE.links.scholar}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
          >
            Google Scholar Profile
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="divide-y divide-[#E4E1D8] rounded-2xl border border-[#E4E1D8] bg-white">
          {PUBLICATIONS.map((pub, idx) => (
            <article
              key={pub.id}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
            >
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 font-mono-tech text-[11px]">
                  <span className="text-[#6B7280]">[{String(idx + 1).padStart(2, '0')}]</span>
                  <span className="rounded bg-[#0F766E]/10 px-2 py-0.5 font-semibold text-[#0F766E]">
                    {pub.venue} {pub.year}
                  </span>
                  <span className="text-[#6B7280]">
                    {pub.location} • {pub.status}
                  </span>
                </div>
                <h3 className="mt-2 text-base font-semibold leading-snug text-[#111318] sm:text-lg">
                  {pub.title}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                {pub.links.map((link) =>
                  link.url ? (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md border border-[#E4E1D8] bg-[#FAF9F6] px-3 py-1.5 font-mono-tech text-[11px] font-medium text-[#111318] transition-colors hover:border-[#0F766E] hover:text-[#0F766E]"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  ) : (
                    <span
                      key={link.label}
                      title="Link placeholder configured in src/data/profile.js"
                      className="rounded-md border border-dashed border-[#D5D1C5] px-2.5 py-1.5 font-mono-tech text-[11px] text-[#6B7280]"
                    >
                      {link.label}
                    </span>
                  )
                )}
              </div>
            </article>
          ))}
        </div>
      </ChapterShell>

      {/* 9. CONTACT / CLOSING */}
      <ChapterShell id="contact" tinted>
        <div className="rounded-2xl border border-[#111318] bg-[#111318] p-7 text-[#FAF9F6] sm:p-12">
          <span className="font-mono-tech text-xs font-semibold tracking-[0.14em] text-[#2DD4BF]">
            {CHAPTER_09_CONTACT.code}
          </span>
          <h2 className="font-serif-display mt-3 max-w-3xl text-3xl font-medium leading-tight text-white sm:text-5xl">
            {CHAPTER_09_CONTACT.closingLine}
          </h2>
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
      </ChapterShell>
    </>
  );
};

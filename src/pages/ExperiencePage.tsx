import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Award, BookOpen, Building2, Check, Copy, User } from 'lucide-react';
import { EXPERIENCE_DETAILS, PUBLICATIONS } from '../data/profile.js';

export const ExperiencePage: React.FC = () => {
  const [photoMissing, setPhotoMissing] = useState(false);
  const [activeStreamId, setActiveStreamId] = useState(EXPERIENCE_DETAILS.tcs.workstreams[0].id);
  const [openBibId, setOpenBibId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeStream =
    EXPERIENCE_DETAILS.tcs.workstreams.find((w) => w.id === activeStreamId) ??
    EXPERIENCE_DETAILS.tcs.workstreams[0];

  const copyBibtex = async (id: string, bibtex: string) => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      setOpenBibId(id);
    }
  };

  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Hero + Portrait Split */}
        <section className="grid items-center gap-10 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="font-mono-tech text-xs font-semibold uppercase tracking-[0.16em] text-[#0F766E]">
              {EXPERIENCE_DETAILS.eyebrow}
            </span>
            <h1 className="font-serif-display mt-3 text-4xl font-medium leading-[1.08] tracking-[-0.025em] text-[#111318] sm:text-5xl">
              {EXPERIENCE_DETAILS.headline}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#434956] sm:text-lg">
              {EXPERIENCE_DETAILS.summary}
            </p>

            {/* Clean Apple-like Stat Strip */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {EXPERIENCE_DETAILS.highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-xl border border-[#E4E1D8] bg-white p-4"
                >
                  <div className="font-serif-display text-3xl font-medium text-[#111318]">
                    {h.value}
                  </div>
                  <div className="mt-1 font-mono-tech text-[11px] text-[#6B7280]">{h.label}</div>
                </div>
              ))}
            </div>

            {/* Academic Peer Review Badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#0F766E]/25 bg-[#0F766E]/[0.06] px-4 py-2 font-mono-tech text-xs text-[#0F766E]">
              <Award className="h-3.5 w-3.5" aria-hidden="true" />
              Peer Reviewer: IEEE Industrial Application Society (IAS) &amp; Elsevier BSPC
            </div>
          </div>

          {/* Portrait Frame */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[#E4E1D8] bg-white p-3.5 shadow-[0_20px_50px_-30px_rgba(17,19,24,0.28)]">
              {!photoMissing ? (
                <img
                  src={EXPERIENCE_DETAILS.photoUrl}
                  alt={EXPERIENCE_DETAILS.photoAlt}
                  loading="lazy"
                  onError={() => setPhotoMissing(true)}
                  className="aspect-[3/4] w-full rounded-xl object-cover"
                />
              ) : (
                <div className="scientific-grid flex aspect-[3/4] w-full flex-col items-center justify-center rounded-xl border border-dashed border-[#C9C4B8] bg-[#FAF9F6] p-6 text-center">
                  <User className="h-10 w-10 text-[#0F766E]" aria-hidden="true" />
                  <p className="mt-2 font-mono-tech text-xs text-[#6B7280]">
                    /public/images/harish.jpg
                  </p>
                </div>
              )}
              <div className="mt-3 flex items-center justify-between px-1 font-mono-tech text-[11px] text-[#6B7280]">
                <span>{EXPERIENCE_DETAILS.photoCaption}</span>
              </div>
            </div>
          </div>
        </section>

        {/* TCS Research — Interactive Workstream Showcase */}
        <section className="rounded-2xl border border-[#E4E1D8] bg-white p-6 shadow-[0_18px_50px_-32px_rgba(17,19,24,0.2)] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-3 border-b border-[#EFECE4] pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 font-mono-tech text-xs font-semibold text-[#0F766E]">
                <Building2 className="h-4 w-4" aria-hidden="true" />
                {EXPERIENCE_DETAILS.tcs.organization}
              </div>
              <h2 className="font-serif-display mt-1.5 text-2xl font-medium text-[#111318] sm:text-3xl">
                {EXPERIENCE_DETAILS.tcs.role}
              </h2>
            </div>
            <div className="font-mono-tech text-xs text-[#6B7280] md:text-right">
              <div className="font-semibold text-[#111318]">{EXPERIENCE_DETAILS.tcs.period}</div>
              <div>{EXPERIENCE_DETAILS.tcs.locations}</div>
            </div>
          </div>

          <div className="mt-7 grid gap-6 lg:grid-cols-12">
            {/* Left Workstream Selector */}
            <div className="space-y-2 lg:col-span-5">
              {EXPERIENCE_DETAILS.tcs.workstreams.map((ws) => {
                const isSelected = ws.id === activeStream.id;
                return (
                  <button
                    key={ws.id}
                    type="button"
                    onClick={() => setActiveStreamId(ws.id)}
                    className={`w-full rounded-xl border p-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
                      isSelected
                        ? 'border-[#0F766E] bg-[#0F766E]/[0.05] shadow-sm'
                        : 'border-[#E4E1D8] bg-[#FAF9F6]/70 hover:border-[#C5C0B2]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono-tech text-[10px]">
                      <span className="font-semibold text-[#0F766E]">{ws.code}</span>
                      <span className="text-[#6B7280]">{ws.venue}</span>
                    </div>
                    <div className="mt-1.5 text-sm font-semibold text-[#111318] sm:text-base">
                      {ws.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Active Workstream Dossier */}
            <div className="flex flex-col justify-between rounded-xl border border-[#E4E1D8] bg-[#FAF9F6] p-6 lg:col-span-7">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E4E1D8] pb-3">
                  <span className="font-mono-tech text-xs font-semibold text-[#0F766E]">
                    {activeStream.code} // {activeStream.venue}
                  </span>
                </div>

                <h3 className="font-serif-display mt-4 text-2xl font-medium text-[#111318]">
                  {activeStream.title}
                </h3>

                <div className="mt-5 space-y-4">
                  <div className="rounded-lg border border-[#E4E1D8] bg-white p-4">
                    <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">
                      Research Problem
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-[#434956]">
                      {activeStream.problem}
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#E4E1D8] bg-white p-4">
                    <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[#0F766E]">
                      Methodology &amp; Execution
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-[#111318]">
                      {activeStream.approach}
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#0F766E]/25 bg-[#0F766E]/[0.05] p-4">
                    <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[#0F766E]">
                      Scientific Outcome
                    </div>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-[#111318]">
                      {activeStream.outcome}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5 pt-2">
                {activeStream.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-[#E4E1D8] bg-white px-2.5 py-1 font-mono-tech text-[11px] text-[#111318]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Earlier Work — ZF Technologies */}
        <section className="mt-8 rounded-2xl border border-[#E4E1D8] bg-[#F2EFE8]/60 p-6 sm:p-8">
          <div className="flex flex-col gap-2 border-b border-[#DFDBD0] pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0F766E]">
                Earlier Experience — Computer Vision
              </span>
              <h2 className="font-serif-display mt-1 text-2xl font-medium text-[#111318]">
                {EXPERIENCE_DETAILS.zf.organization} • {EXPERIENCE_DETAILS.zf.role}
              </h2>
            </div>
            <span className="font-mono-tech text-xs text-[#6B7280]">
              {EXPERIENCE_DETAILS.zf.period} • {EXPERIENCE_DETAILS.zf.location}
            </span>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#434956] sm:text-base">
            {EXPERIENCE_DETAILS.zf.summary}
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {EXPERIENCE_DETAILS.zf.pillars.map((pillar) => (
              <div key={pillar.title} className="rounded-xl border border-[#E4E1D8] bg-white p-4">
                <div className="text-sm font-semibold text-[#111318]">{pillar.title}</div>
                <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">{pillar.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Publications Library with BibTeX */}
        <section className="mt-14">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-mono-tech text-xs font-semibold uppercase tracking-[0.14em] text-[#0F766E]">
                Peer-Reviewed Proceedings
              </span>
              <h2 className="font-serif-display mt-1 text-3xl font-medium text-[#111318]">
                Publications
              </h2>
            </div>
            <span className="font-mono-tech text-xs text-[#6B7280]">
              4 Accepted Papers • INTERSPEECH, EUSIPCO &amp; IEEE IAS
            </span>
          </div>

          <div className="space-y-3">
            {PUBLICATIONS.map((pub, idx) => (
              <article
                key={pub.id}
                className="rounded-xl border border-[#E4E1D8] bg-white p-5 transition-colors hover:border-[#0F766E]/50 sm:p-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {pub.links.map((link) =>
                      link.url ? (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-md border border-[#E4E1D8] bg-[#FAF9F6] px-3 py-1.5 font-mono-tech text-[11px] font-medium text-[#111318] hover:border-[#0F766E] hover:text-[#0F766E]"
                        >
                          {link.label}
                          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                        </a>
                      ) : (
                        <span
                          key={link.label}
                          className="rounded-md border border-dashed border-[#D5D1C5] px-2.5 py-1.5 font-mono-tech text-[11px] text-[#6B7280]"
                        >
                          {link.label}
                        </span>
                      )
                    )}

                    <button
                      type="button"
                      onClick={() => setOpenBibId((prev) => (prev === pub.id ? null : pub.id))}
                      className="inline-flex items-center gap-1 rounded-md border border-[#E4E1D8] bg-[#FAF9F6] px-2.5 py-1.5 font-mono-tech text-[11px] text-[#434956] hover:border-[#0F766E] hover:text-[#111318]"
                    >
                      <BookOpen className="h-3 w-3" aria-hidden="true" />
                      BibTeX
                    </button>

                    <button
                      type="button"
                      onClick={() => copyBibtex(pub.id, pub.bibtex)}
                      className="inline-flex items-center gap-1 rounded-md border border-[#E4E1D8] bg-[#FAF9F6] px-2.5 py-1.5 font-mono-tech text-[11px] text-[#434956] hover:border-[#0F766E] hover:text-[#111318]"
                    >
                      {copiedId === pub.id ? (
                        <>
                          <Check className="h-3 w-3 text-[#0F766E]" aria-hidden="true" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" aria-hidden="true" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {openBibId === pub.id && (
                  <pre className="mt-4 overflow-x-auto rounded-lg border border-[#E4E1D8] bg-[#FAF9F6] p-3 font-mono-tech text-[11px] leading-relaxed text-[#111318]">
                    {pub.bibtex}
                  </pre>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Capabilities Matrix */}
        <section className="mt-14">
          <h2 className="font-serif-display mb-5 text-3xl font-medium text-[#111318]">
            Technical Capabilities
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {EXPERIENCE_DETAILS.skillGroups.map((sg) => (
              <div key={sg.group} className="rounded-2xl border border-[#E4E1D8] bg-white p-5">
                <div className="font-mono-tech text-[11px] font-semibold uppercase tracking-wider text-[#0F766E]">
                  {sg.group}
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {sg.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-[#E4E1D8] bg-[#FAF9F6] px-2.5 py-1 font-mono-tech text-xs text-[#111318]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 flex justify-end">
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
          >
            Proceed to Contact
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};

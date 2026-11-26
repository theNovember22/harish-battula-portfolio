import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Building2, User } from 'lucide-react';
import { EXPERIENCE_DETAILS, PUBLICATIONS } from '../data/profile.js';

export const ExperiencePage: React.FC = () => {
  const [photoMissing, setPhotoMissing] = useState(false);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 border-b border-[#E4E1D8] pb-6">
          <span className="font-mono-tech text-xs font-semibold uppercase tracking-[0.14em] text-[#0F766E]">
            Career &amp; Publications
          </span>
          <h1 className="font-serif-display mt-2 text-3xl font-medium tracking-tight text-[#111318] sm:text-5xl">
            Professional Experience
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#434956] sm:text-lg">
            {EXPERIENCE_DETAILS.summary}
          </p>
        </div>

        {/* Researcher Portrait + Bio Summary */}
        <div className="mb-10 grid items-start gap-8 rounded-2xl border border-[#E4E1D8] bg-white p-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
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
            <p className="mt-2.5 font-mono-tech text-[11px] text-[#6B7280]">
              Peer Reviewer: IEEE IAS &amp; Elsevier BSPC
            </p>
          </div>

          <div className="space-y-6 lg:col-span-8">
            {/* TCS Research */}
            <div>
              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[#EFECE4] pb-3">
                <div>
                  <div className="inline-flex items-center gap-2 font-mono-tech text-xs font-semibold text-[#0F766E]">
                    <Building2 className="h-4 w-4" aria-hidden="true" />
                    {EXPERIENCE_DETAILS.tcs.organization}
                  </div>
                  <h2 className="mt-1 text-xl font-semibold text-[#111318]">
                    {EXPERIENCE_DETAILS.tcs.role}
                  </h2>
                </div>
                <div className="font-mono-tech text-xs text-[#6B7280] sm:text-right">
                  <div className="font-semibold text-[#111318]">{EXPERIENCE_DETAILS.tcs.period}</div>
                  <div>{EXPERIENCE_DETAILS.tcs.locations}</div>
                </div>
              </div>

              <ul className="mt-4 space-y-2">
                {EXPERIENCE_DETAILS.tcs.contributions.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#434956]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F766E]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ZF Technologies */}
            <div className="rounded-xl border border-[#E4E1D8] bg-[#FAF9F6] p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="font-mono-tech text-xs font-semibold text-[#0F766E]">
                    {EXPERIENCE_DETAILS.zf.organization}
                  </div>
                  <h3 className="mt-0.5 text-lg font-semibold text-[#111318]">
                    {EXPERIENCE_DETAILS.zf.role}
                  </h3>
                </div>
                <div className="font-mono-tech text-xs text-[#6B7280] sm:text-right">
                  <div className="font-semibold text-[#111318]">{EXPERIENCE_DETAILS.zf.period}</div>
                  <div>{EXPERIENCE_DETAILS.zf.location}</div>
                </div>
              </div>
              <ul className="mt-3 space-y-1.5">
                {EXPERIENCE_DETAILS.zf.contributions.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#434956]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#111318]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Publications */}
        <section className="mb-10">
          <h2 className="font-serif-display mb-4 text-2xl font-medium text-[#111318] sm:text-3xl">
            Accepted Publications
          </h2>
          <div className="divide-y divide-[#E4E1D8] rounded-2xl border border-[#E4E1D8] bg-white">
            {PUBLICATIONS.map((pub, idx) => (
              <article
                key={pub.id}
                className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
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
                  <h3 className="mt-1.5 text-base font-semibold text-[#111318] sm:text-lg">
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
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Compact Grouped Skills */}
        <section>
          <h2 className="font-serif-display mb-4 text-2xl font-medium text-[#111318] sm:text-3xl">
            Technical Capabilities
          </h2>
          <div className="grid gap-4 rounded-2xl border border-[#E4E1D8] bg-white p-6 sm:grid-cols-2">
            {EXPERIENCE_DETAILS.skillGroups.map((sg) => (
              <div key={sg.group}>
                <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-wider text-[#0F766E]">
                  {sg.group}
                </span>
                <p className="mt-1 font-mono-tech text-xs leading-relaxed text-[#434956]">
                  {sg.items}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 flex justify-end">
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
          >
            Continue to Contact
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Mail, FileDown, ArrowUpRight, MapPin } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { SectionHeader } from '../components/SectionHeader';

export const AboutAndContact: React.FC = () => {
  return (
    <>
      {/* About Harish */}
      <section id="about" className="border-t border-[#E3E0D6] bg-[#F3F1EA]/55 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            index="12"
            eyebrow="Researcher Profile"
            title="About Harish"
          />

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-8">
              <p className="text-lg font-medium leading-relaxed text-[#111318]">
                {PROFILE.aboutSummary}
              </p>
              <p className="text-base leading-relaxed text-[#434956]">
                {PROFILE.aboutTrajectory}
              </p>
            </div>

            <div className="rounded-xl border border-[#E3E0D6] bg-white p-5 lg:col-span-4">
              <div className="font-mono-tech text-[11px] font-semibold uppercase tracking-wider text-[#0F766E]">
                Current Status
              </div>
              <dl className="mt-3 space-y-3 text-sm">
                <div>
                  <dt className="font-mono-tech text-[11px] text-[#6B7280]">Location</dt>
                  <dd className="mt-0.5 flex items-center gap-1.5 font-medium text-[#111318]">
                    <MapPin className="h-3.5 w-3.5 text-[#0F766E]" aria-hidden="true" />
                    {PROFILE.location}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono-tech text-[11px] text-[#6B7280]">Appointment</dt>
                  <dd className="mt-0.5 font-medium text-[#111318]">
                    {PROFILE.affiliation}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono-tech text-[11px] text-[#6B7280]">Opportunities</dt>
                  <dd className="mt-0.5 font-medium text-[#0F766E]">
                    {PROFILE.availability}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Colophon */}
      <section id="contact" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#111318] bg-[#111318] p-7 text-[#FAF9F6] sm:p-10">
            <div className="max-w-3xl">
              <span className="font-mono-tech text-xs font-semibold uppercase tracking-[0.14em] text-[#2DD4BF]">
                13 // Research Correspondence
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Have a research problem worth exploring?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-gray-300">
                I’m interested in AI/ML research and applied scientist opportunities involving
                speech, healthcare AI, biomedical signals, multimodal learning, and trustworthy
                machine learning.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0F766E] px-5 py-3 font-mono-tech text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#115E59]"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Email Harish
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
                  href={PROFILE.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-4 py-3 font-mono-tech text-xs font-medium text-white transition-colors hover:border-[#2DD4BF] hover:text-[#2DD4BF]"
                >
                  LinkedIn
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
                  href={PROFILE.cvPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-4 py-3 font-mono-tech text-xs font-medium text-white transition-colors hover:border-[#2DD4BF] hover:text-[#2DD4BF]"
                >
                  <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
                  Download CV
                </a>
              </div>

              <div className="mt-6 border-t border-white/15 pt-4 font-mono-tech text-xs text-gray-400">
                Direct email: {PROFILE.email} &nbsp;•&nbsp; Research Journal:{' '}
                <a
                  href={PROFILE.links.researchJournal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2DD4BF] hover:underline"
                >
                  battulaharish2.github.io/research-journal
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

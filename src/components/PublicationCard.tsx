import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy, BookOpen } from 'lucide-react';
import { Publication } from '../data/publications';

interface PublicationCardProps {
  pub: Publication;
  index: number;
}

export const PublicationCard: React.FC<PublicationCardProps> = ({ pub, index }) => {
  const [showBibtex, setShowBibtex] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyBibtex = async () => {
    try {
      await navigator.clipboard.writeText(pub.bibtex);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setShowBibtex(true);
    }
  };

  return (
    <article className="group rounded-xl border border-[#E3E0D6] bg-white p-5 transition-all hover:border-[#0F766E]/60 hover:shadow-[0_12px_32px_-20px_rgba(17,19,24,0.2)] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono-tech text-xs font-semibold text-[#6B7280]">
            [{String(index + 1).padStart(2, '0')}]
          </span>
          <span className="rounded-md bg-[#0F766E]/10 px-2.5 py-1 font-mono-tech text-xs font-semibold text-[#0F766E]">
            {pub.venueShort}
          </span>
          <span className="rounded-md border border-[#E3E0D6] bg-[#FAF9F6] px-2 py-0.5 font-mono-tech text-[11px] text-[#434956]">
            {pub.status} • {pub.location}
          </span>
        </div>
        <span className="font-mono-tech text-xs text-[#6B7280]">{pub.domain}</span>
      </div>

      <h3 className="mt-3 text-lg font-semibold leading-snug text-[#111318] sm:text-xl">
        {pub.title}
      </h3>
      <p className="mt-1 font-mono-tech text-xs text-[#6B7280]">{pub.venue}</p>

      <p className="mt-3 text-sm leading-relaxed text-[#434956]">
        {pub.contribution}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#EFECE4] pt-3.5">
        {pub.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono-tech text-xs font-medium text-[#0F766E] hover:underline"
          >
            {link.label}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ))}

        <button
          type="button"
          onClick={() => setShowBibtex((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded border border-[#E3E0D6] bg-[#FAF9F6] px-2.5 py-1 font-mono-tech text-[11px] text-[#434956] transition-colors hover:border-[#0F766E] hover:text-[#111318]"
        >
          <BookOpen className="h-3 w-3" aria-hidden="true" />
          {showBibtex ? 'Hide BibTeX' : 'BibTeX'}
        </button>

        <button
          type="button"
          onClick={handleCopyBibtex}
          className="inline-flex items-center gap-1.5 rounded border border-[#E3E0D6] bg-[#FAF9F6] px-2.5 py-1 font-mono-tech text-[11px] text-[#434956] transition-colors hover:border-[#0F766E] hover:text-[#111318]"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-[#0F766E]" aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" aria-hidden="true" />
              Copy BibTeX
            </>
          )}
        </button>
      </div>

      {showBibtex && (
        <pre className="mt-3 overflow-x-auto rounded-lg border border-[#E3E0D6] bg-[#FAF9F6] p-3 font-mono-tech text-[11px] leading-relaxed text-[#111318]">
          {pub.bibtex}
        </pre>
      )}
    </article>
  );
};

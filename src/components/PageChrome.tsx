import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PageRoute } from '../lib/router';

interface PageHeaderProps {
  sectionTag: string;
  title: string;
  lead: string;
  metaRight?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  sectionTag,
  title,
  lead,
  metaRight,
}) => {
  return (
    <div className="border-b border-[#E3E0D6] bg-white/75">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="font-mono-tech text-xs font-semibold uppercase tracking-[0.16em] text-[#0F766E]">
              {sectionTag}
            </div>
            <h1 className="mt-2.5 text-3xl font-semibold tracking-[-0.03em] text-[#111318] sm:text-4xl lg:text-[42px]">
              {title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-[#434956] sm:text-lg">
              {lead}
            </p>
          </div>
          {metaRight && <div className="shrink-0">{metaRight}</div>}
        </div>
      </div>
    </div>
  );
};

interface PagePagerProps {
  prev?: { label: string; subtitle: string; route: PageRoute };
  next?: { label: string; subtitle: string; route: PageRoute };
  onNavigate: (route: PageRoute) => void;
}

export const PagePager: React.FC<PagePagerProps> = ({ prev, next, onNavigate }) => {
  return (
    <div className="border-t border-[#E3E0D6] bg-[#F3F1EA]/55">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:px-8">
        {prev ? (
          <a
            href={`#${prev.route}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(prev.route);
            }}
            className="group flex items-center justify-between rounded-xl border border-[#E3E0D6] bg-white p-5 transition-all hover:border-[#0F766E]"
          >
            <div>
              <div className="flex items-center gap-1.5 font-mono-tech text-[11px] uppercase tracking-wider text-[#6B7280]">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                Previous Page
              </div>
              <div className="mt-1 text-base font-semibold text-[#111318] group-hover:text-[#0F766E]">
                {prev.label}
              </div>
              <div className="mt-0.5 text-xs text-[#6B7280]">{prev.subtitle}</div>
            </div>
          </a>
        ) : (
          <div />
        )}

        {next ? (
          <a
            href={`#${next.route}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(next.route);
            }}
            className="group flex items-center justify-between rounded-xl border border-[#E3E0D6] bg-white p-5 text-right transition-all hover:border-[#0F766E] sm:justify-end"
          >
            <div>
              <div className="flex items-center justify-end gap-1.5 font-mono-tech text-[11px] uppercase tracking-wider text-[#6B7280]">
                Next Page
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
              <div className="mt-1 text-base font-semibold text-[#111318] group-hover:text-[#0F766E]">
                {next.label}
              </div>
              <div className="mt-0.5 text-xs text-[#6B7280]">{next.subtitle}</div>
            </div>
          </a>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

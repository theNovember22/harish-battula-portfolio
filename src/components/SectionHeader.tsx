import React from 'react';

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
  eyebrow,
  title,
  subtitle,
  rightSlot,
}) => {
  return (
    <div className="mb-10 flex flex-col gap-4 border-b border-[#E3E0D6] pb-6 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <div className="mb-2.5 flex items-center gap-2.5">
          <span className="font-mono-tech text-xs font-semibold tracking-wider text-[#0F766E]">
            {index}
          </span>
          <span className="h-px w-6 bg-[#D5D1C5]" aria-hidden="true" />
          <span className="font-mono-tech text-xs uppercase tracking-[0.14em] text-[#6B7280]">
            {eyebrow}
          </span>
        </div>
        <h2 className="text-3xl font-semibold tracking-[-0.025em] text-[#111318] sm:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-base leading-relaxed text-[#434956] sm:text-[17px]">
            {subtitle}
          </p>
        )}
      </div>
      {rightSlot && <div className="shrink-0">{rightSlot}</div>}
    </div>
  );
};

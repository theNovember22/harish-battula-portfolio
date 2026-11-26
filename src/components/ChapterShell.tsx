import React from 'react';

interface ChapterShellProps {
  id: string;
  tinted?: boolean;
  children: React.ReactNode;
}

export const ChapterShell: React.FC<ChapterShellProps> = ({
  id,
  tinted = false,
  children,
}) => {
  return (
    <section
      id={id}
      data-chapter={id}
      className={`chapter-snap flex items-center border-t border-[#E4E1D8] py-20 sm:py-24 ${
        tinted ? 'bg-[#F2EFE8]/45' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
};

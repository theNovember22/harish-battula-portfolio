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
      style={tinted ? { backgroundColor: 'var(--bg-tint)' } : undefined}
      className="chapter-snap flex items-center border-t border-[var(--border-hairline)] py-8 transition-colors duration-200 md:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
};

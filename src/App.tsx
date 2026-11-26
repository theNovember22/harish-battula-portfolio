import React, { useCallback, useEffect, useState } from 'react';
import { HashRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { CuriosityChapters } from './chapters/CuriosityChapters';
import { CHAPTERS } from './data/profile.js';

const PortfolioExperience: React.FC<{ initialChapter?: string }> = ({ initialChapter }) => {
  const [activeChapterId, setActiveChapterId] = useState<string>(initialChapter || 'hero');
  const [progressRatio, setProgressRatio] = useState<number>(0);
  const navigate = useNavigate();

  const jumpToChapter = useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      navigate(id === 'hero' ? '/' : `/${id}`, { replace: true });
    },
    [navigate]
  );

  useEffect(() => {
    if (initialChapter) {
      const el = document.getElementById(initialChapter);
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }
  }, [initialChapter]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]'));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = visible[0].target.getAttribute('data-chapter');
          if (id) setActiveChapterId(id);
        }
      },
      { threshold: [0.3, 0.55, 0.8] }
    );

    sections.forEach((sec) => observer.observe(sec));

    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgressRatio(window.scrollY / docHeight);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          jumpToChapter('hero');
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-[#0F766E] focus:px-4 focus:py-2 focus:font-mono-tech focus:text-xs focus:text-white"
      >
        Skip to content
      </a>

      <Navbar
        activeChapterId={activeChapterId}
        progressRatio={progressRatio}
        onJumpToChapter={jumpToChapter}
      />

      <main className="flex-1">
        <CuriosityChapters onJumpToChapter={jumpToChapter} />
      </main>
    </div>
  );
};

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PortfolioExperience />} />
        {CHAPTERS.map((ch) => (
          <Route
            key={ch.id}
            path={`/${ch.id}`}
            element={<PortfolioExperience initialChapter={ch.id} />}
          />
        ))}
        <Route path="*" element={<PortfolioExperience />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

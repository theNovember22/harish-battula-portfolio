import { useEffect, useState, useCallback } from 'react';

export type PageRoute =
  | '/'
  | '/research'
  | '/signal-lab'
  | '/publications'
  | '/experience'
  | '/about';

export const ROUTES: {
  path: PageRoute;
  label: string;
  title: string;
  description: string;
}[] = [
  {
    path: '/',
    label: 'OVERVIEW',
    title: 'Harish Battula — AI/ML Researcher | Speech, Biomedical Signals & Healthcare AI',
    description:
      'Researcher at TCS Research working across speech processing, physiological sensing, healthcare AI, graph neural networks, and trustworthy machine learning.',
  },
  {
    path: '/research',
    label: 'RESEARCH',
    title: 'Research Case Studies & Methodology — Harish Battula',
    description:
      'Selected research case studies from EUSIPCO 2026, INTERSPEECH 2025, EUSIPCO 2024, and 40+ participant multimodal data collection.',
  },
  {
    path: '/signal-lab',
    label: 'SIGNAL LAB',
    title: 'Interactive Research Signal Lab & Open Code — Harish Battula',
    description:
      'Interactive Speech, ECG, PPG, and PCG signal explorer alongside Harish Battula’s open-source research repositories.',
  },
  {
    path: '/publications',
    label: 'PUBLICATIONS',
    title: 'Publications & Research Timeline — Harish Battula',
    description:
      'Peer-reviewed conference papers at INTERSPEECH, EUSIPCO, and IEEE IAS with BibTeX citations and research chronology.',
  },
  {
    path: '/experience',
    label: 'EXPERIENCE',
    title: 'Research Experience, Education & Toolbox — Harish Battula',
    description:
      'TCS Research appointment, NIT Warangal M.Tech. thesis, ZF Technologies computer vision work, and research capabilities.',
  },
  {
    path: '/about',
    label: 'ABOUT',
    title: 'About & Contact — Harish Battula',
    description:
      'Research profile, forward directions in trustworthy healthcare AI, and academic/industry correspondence.',
  },
];

function parseHashToRoute(hash: string): PageRoute {
  const cleaned = hash.replace(/^#/, '').split('?')[0] || '/';
  const normalized = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
  const match = ROUTES.find((r) => r.path === normalized);
  return match ? match.path : '/';
}

export function useHashRouter() {
  const [route, setRoute] = useState<PageRoute>(() =>
    typeof window !== 'undefined' ? parseHashToRoute(window.location.hash) : '/'
  );

  useEffect(() => {
    const onHashChange = () => {
      const next = parseHashToRoute(window.location.hash);
      setRoute(next);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const meta = ROUTES.find((r) => r.path === route) ?? ROUTES[0];
    document.title = meta.title;
  }, [route]);

  const navigate = useCallback((to: PageRoute) => {
    const targetHash = `#${to}`;
    if (window.location.hash === targetHash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = targetHash;
  }, []);

  return { route, navigate };
}

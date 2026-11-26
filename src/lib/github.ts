import { FALLBACK_REPOS, ResearchRepo } from '../data/repos';

const CACHE_KEY = 'hb_github_repos_v1';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

const CURATED_TOPICS: Record<string, { topic: string; homepage?: string; fallbackDesc?: string }> = {
  'signal-explorer': {
    topic: 'Biomedical Signal Lab',
    homepage: 'https://battulaharish2.github.io/signal-explorer/',
  },
  'research-journal': {
    topic: 'Research & Conference Journal',
    homepage: 'https://battulaharish2.github.io/research-journal/',
  },
  ElectricalLF: {
    topic: 'Time-Series Forecasting (IEEE IAS 2023)',
    fallbackDesc:
      'Comparative study of forecasting problems on electrical load time-series data using deep learning techniques.',
  },
  harish_STLF: {
    topic: 'PyTorch Load Forecasting',
    fallbackDesc:
      'Short-term electrical load demand forecasting notebooks using PyTorch and time-series modeling.',
  },
};

const CURATED_ORDER = ['signal-explorer', 'research-journal', 'ElectricalLF', 'harish_STLF'];

interface GitHubApiRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
  fork: boolean;
}

export async function fetchHarishRepos(): Promise<{
  repos: ResearchRepo[];
  source: 'live' | 'cache' | 'fallback';
}> {
  try {
    const rawCache = localStorage.getItem(CACHE_KEY);
    if (rawCache) {
      const parsed = JSON.parse(rawCache) as { timestamp: number; repos: ResearchRepo[] };
      if (Date.now() - parsed.timestamp < CACHE_TTL_MS && Array.isArray(parsed.repos) && parsed.repos.length > 0) {
        return { repos: parsed.repos, source: 'cache' };
      }
    }
  } catch {
    // Ignore storage read errors
  }

  try {
    const response = await fetch('https://api.github.com/users/battulaharish2/repos?per_page=50', {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!response.ok) {
      throw new Error(`GitHub API ${response.status}`);
    }
    const data = (await response.json()) as GitHubApiRepo[];
    const filtered = data
      .filter((r) => !r.fork && CURATED_ORDER.includes(r.name))
      .sort((a, b) => CURATED_ORDER.indexOf(a.name) - CURATED_ORDER.indexOf(b.name))
      .map((r): ResearchRepo => {
        const meta = CURATED_TOPICS[r.name] ?? { topic: 'Open Research' };
        return {
          name: r.name,
          description: r.description || meta.fallbackDesc || 'Open-source research implementation.',
          language: r.language,
          stars: r.stargazers_count,
          updatedAt: r.updated_at,
          topic: meta.topic,
          htmlUrl: r.html_url,
          homepage: meta.homepage,
        };
      });

    if (filtered.length === 0) {
      return { repos: FALLBACK_REPOS, source: 'fallback' };
    }

    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), repos: filtered }));
    } catch {
      // Ignore storage write errors
    }

    return { repos: filtered, source: 'live' };
  } catch {
    return { repos: FALLBACK_REPOS, source: 'fallback' };
  }
}

export function formatRepoDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

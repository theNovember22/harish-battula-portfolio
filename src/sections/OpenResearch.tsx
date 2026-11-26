import React, { useEffect, useState } from 'react';
import { ArrowUpRight, GitFork, Star } from 'lucide-react';
import { FALLBACK_REPOS, ResearchRepo } from '../data/repos';
import { fetchHarishRepos, formatRepoDate } from '../lib/github';
import { SectionHeader } from '../components/SectionHeader';
import { PROFILE } from '../data/profile';

export const OpenResearch: React.FC = () => {
  const [repos, setRepos] = useState<ResearchRepo[]>(FALLBACK_REPOS);
  const [source, setSource] = useState<'live' | 'cache' | 'fallback'>('fallback');

  useEffect(() => {
    let active = true;
    fetchHarishRepos().then((result) => {
      if (!active) return;
      setRepos(result.repos);
      setSource(result.source);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="open-research" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="11"
          eyebrow="Public Code & Signal Demos"
          title="Open Research"
          subtitle="Selected public repositories from Harish’s GitHub covering interactive biosignal exploration, research notes, and deep load forecasting."
          rightSlot={
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E3E0D6] bg-white px-4 py-2 font-mono-tech text-xs font-semibold text-[#111318] transition-colors hover:border-[#0F766E] hover:text-[#0F766E]"
            >
              github.com/battulaharish2
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          }
        />

        <div className="grid gap-4 md:grid-cols-2">
          {repos.map((repo) => (
            <article
              key={repo.name}
              className="flex flex-col justify-between rounded-xl border border-[#E3E0D6] bg-white p-5 transition-all hover:border-[#0F766E]/60"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded bg-[#0F766E]/10 px-2.5 py-0.5 font-mono-tech text-[11px] font-semibold text-[#0F766E]">
                    {repo.topic}
                  </span>
                  <div className="flex items-center gap-3 font-mono-tech text-[11px] text-[#6B7280]">
                    {repo.language && <span>{repo.language}</span>}
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3" aria-hidden="true" />
                      {repo.stars}
                    </span>
                  </div>
                </div>

                <h3 className="mt-3 flex items-center gap-2 font-mono-tech text-base font-semibold text-[#111318]">
                  <GitFork className="h-4 w-4 text-[#0F766E]" aria-hidden="true" />
                  {repo.name}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[#434956]">
                  {repo.description}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#EFECE4] pt-3">
                <span className="font-mono-tech text-[11px] text-[#6B7280]">
                  Updated {formatRepoDate(repo.updatedAt)}
                </span>
                <div className="flex items-center gap-3">
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono-tech text-xs font-semibold text-[#0F766E] hover:underline"
                    >
                      Live Demo
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono-tech text-xs font-semibold text-[#111318] hover:text-[#0F766E]"
                  >
                    GitHub
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-3 font-mono-tech text-[11px] text-[#6B7280]">
          Repository metadata source: {source === 'live' ? 'GitHub API (live)' : source === 'cache' ? 'GitHub API (cached)' : 'Verified repository snapshot'}.
        </p>
      </div>
    </section>
  );
};

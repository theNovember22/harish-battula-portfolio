import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { CHAPTER_03, CHAPTER_05, RESEARCH_CARDS } from '../data/profile.js';
import { ThreeTrackSignalVisual } from '../visuals/ThreeTrackSignalVisual';
import { ConfidenceSpectrogramVisual } from '../visuals/ConfidenceSpectrogramVisual';
import { TranscriptToGraphVisual } from '../visuals/TranscriptToGraphVisual';
import { StethoscopeDysarthriaVisual } from '../visuals/StethoscopeDysarthriaVisual';
import { ShapSignalVisual } from '../visuals/ShapSignalVisual';
import { TrajectoryCurveVisual } from '../visuals/TrajectoryCurveVisual';

export type ResearchCardItem = (typeof RESEARCH_CARDS)[number];

interface ProjectLabModalProps {
  projectId: string | null;
  onClose: () => void;
  onSelectProject: (id: string) => void;
}

function renderLabVisual(id: string) {
  switch (id) {
    case 'speech-hr':
      return <ThreeTrackSignalVisual />;
    case 'confidence':
      return <ConfidenceSpectrogramVisual />;
    case 'alzheimers':
      return (
        <TranscriptToGraphVisual
          tokens={CHAPTER_03.sampleTranscriptTokens}
          accuracyLabel={CHAPTER_03.accuracyCallout}
        />
      );
    case 'stethoscope':
      return <StethoscopeDysarthriaVisual />;
    case 'trust':
      return <ShapSignalVisual features={CHAPTER_05.shapFeatures} />;
    default:
      return <TrajectoryCurveVisual />;
  }
}

export const ProjectLabModal: React.FC<ProjectLabModalProps> = ({
  projectId,
  onClose,
  onSelectProject,
}) => {
  const [techMode, setTechMode] = useState<'simple' | 'technical'>('simple');

  useEffect(() => {
    if (!projectId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [projectId, onClose]);

  if (!projectId) return null;

  const idx = RESEARCH_CARDS.findIndex((c) => c.id === projectId);
  const project = RESEARCH_CARDS[idx] ?? RESEARCH_CARDS[0];
  const prev = idx > 0 ? RESEARCH_CARDS[idx - 1] : null;
  const next = idx < RESEARCH_CARDS.length - 1 ? RESEARCH_CARDS[idx + 1] : null;

  const solutionCopy =
    project.id === 'alzheimers' && techMode === 'simple' && 'simpleSolution' in project
      ? project.simpleSolution
      : project.solution;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-lab-title"
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4 md:p-6"
    >
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="surface-card flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl"
      >
        {/* Top Modal Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 font-mono-tech text-[10px] sm:text-xs">
            <span className="font-semibold text-[var(--accent-signal)]">
              CHAPTER {project.code}
            </span>
            <span className="text-[var(--ink-muted)]">•</span>
            <span className="text-[var(--ink-secondary)]">{project.venue}</span>
            <span className="hidden rounded-full border border-[var(--accent-signal-ring)] bg-[var(--accent-signal-soft)] px-2 py-0.5 font-semibold text-[var(--accent-signal)] sm:inline-block">
              {project.metric}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close interactive lab"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-paper)] text-[var(--ink-primary)] transition-colors hover:border-[var(--accent-data)] hover:text-[var(--accent-data)]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Lab + Concise Briefing */}
        <div className="overflow-y-auto p-4 sm:p-6">
          <div className="grid items-start gap-5 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-7">{renderLabVisual(project.id)}</div>

            <div className="space-y-3.5 lg:col-span-5">
              <div>
                <h2
                  id="project-lab-title"
                  className="font-serif-display text-2xl font-medium leading-tight text-[var(--ink-primary)] sm:text-3xl"
                >
                  {project.question}
                </h2>
                <p className="mt-1 font-mono-tech text-[11px] text-[var(--ink-muted)]">
                  {project.citationLabel}
                </p>
              </div>

              {project.id === 'alzheimers' && (
                <div className="inline-flex rounded-md border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-0.5">
                  <button
                    type="button"
                    onClick={() => setTechMode('simple')}
                    className={`rounded px-2.5 py-1 font-mono-tech text-[10px] font-medium transition-colors ${
                      techMode === 'simple'
                        ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)]'
                        : 'text-[var(--ink-secondary)]'
                    }`}
                  >
                    Explain simply
                  </button>
                  <button
                    type="button"
                    onClick={() => setTechMode('technical')}
                    className={`rounded px-2.5 py-1 font-mono-tech text-[10px] font-medium transition-colors ${
                      techMode === 'technical'
                        ? 'bg-[var(--accent-signal)] text-[var(--btn-primary-fg)]'
                        : 'text-[var(--ink-secondary)]'
                    }`}
                  >
                    Show technical
                  </button>
                </div>
              )}

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-3">
                  <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
                    Problem
                  </div>
                  <p className="mt-0.5 leading-relaxed text-[var(--ink-secondary)]">
                    {project.problem}
                  </p>
                </div>

                <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-3">
                  <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-signal)]">
                    Approach
                  </div>
                  <p className="mt-0.5 leading-relaxed text-[var(--ink-primary)]">
                    {solutionCopy}
                  </p>
                </div>

                <div className="rounded-lg border border-[var(--accent-signal-ring)] bg-[var(--accent-signal-soft)] p-3">
                  <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-signal)]">
                    Key Result
                  </div>
                  <p className="mt-0.5 font-medium leading-relaxed text-[var(--ink-primary)]">
                    {project.result}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-2 py-0.5 font-mono-tech text-[10px] text-[var(--ink-primary)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-1">
                {project.linkUrl ? (
                  <a
                    href={project.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--btn-primary-bg)] px-4 py-2 font-mono-tech text-xs font-semibold text-[var(--btn-primary-fg)] transition-colors hover:bg-[var(--btn-primary-hover)]"
                  >
                    {project.linkText}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    to="/experience"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--btn-primary-bg)] px-4 py-2 font-mono-tech text-xs font-semibold text-[var(--btn-primary-fg)] transition-colors hover:bg-[var(--btn-primary-hover)]"
                  >
                    {project.linkText}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Switcher Bar */}
        <div className="flex items-center justify-between border-t border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-4 py-2.5 sm:px-6">
          {prev ? (
            <button
              type="button"
              onClick={() => onSelectProject(prev.id)}
              className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] font-medium text-[var(--ink-secondary)] hover:text-[var(--accent-signal)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {prev.code} {prev.title}
            </button>
          ) : (
            <div />
          )}

          {next ? (
            <button
              type="button"
              onClick={() => onSelectProject(next.id)}
              className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] font-semibold text-[var(--accent-signal)] hover:underline"
            >
              {next.code} {next.title}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </motion.div>
    </div>
  );
};

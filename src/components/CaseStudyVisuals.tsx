import React, { useState } from 'react';
import { PipelineStage, ResearchCaseStudy } from '../data/researchProjects';
import { ArrowRight } from 'lucide-react';

interface CaseStudyVisualProps {
  project: ResearchCaseStudy;
}

const AsrGraphInteractive: React.FC<{ stages: PipelineStage[] }> = ({ stages }) => {
  const [activeIdx, setActiveIdx] = useState<number>(3);
  const current = stages[activeIdx] ?? stages[0];

  return (
    <div className="rounded-lg border border-[#E3E0D6] bg-[#FAF9F6] p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0F766E]">
          Interactive Architecture Pipeline (Hover or Click Any Stage)
        </span>
        <span className="font-mono-tech text-[11px] text-[#6B7280]">
          Stage {activeIdx + 1} / {stages.length}
        </span>
      </div>

      {/* Horizontal Flow on Desktop, Grid on Mobile */}
      <div className="flex flex-wrap items-center gap-2">
        {stages.map((stage, idx) => {
          const isActive = idx === activeIdx;
          return (
            <React.Fragment key={stage.id}>
              <button
                type="button"
                onMouseEnter={() => setActiveIdx(idx)}
                onFocus={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                className={`flex-1 min-w-[125px] rounded-md border px-3 py-2.5 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
                  isActive
                    ? 'border-[#0F766E] bg-[#0F766E] text-white shadow-sm'
                    : 'border-[#E3E0D6] bg-white text-[#111318] hover:border-[#0F766E]/60'
                }`}
              >
                <div
                  className={`font-mono-tech text-[10px] uppercase tracking-wider ${
                    isActive ? 'text-teal-100' : 'text-[#6B7280]'
                  }`}
                >
                  {stage.shortTag}
                </div>
                <div className="mt-0.5 text-xs font-semibold">{stage.label}</div>
              </button>
              {idx < stages.length - 1 && (
                <ArrowRight
                  className="hidden h-4 w-4 shrink-0 text-[#9CA3AF] lg:block"
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Stage Explanation Drawer */}
      <div className="mt-3.5 flex flex-col justify-between gap-3 rounded-md border border-[#E3E0D6] bg-white p-3.5 sm:flex-row sm:items-center">
        <div>
          <div className="font-mono-tech text-xs font-semibold text-[#0F766E]">
            {current.label} — {current.shortTag}
          </div>
          <p className="mt-1 text-xs leading-relaxed text-[#434956] sm:text-sm">
            {current.explanation}
          </p>
        </div>
        <div className="shrink-0 rounded border border-[#EAE7DF] bg-[#FAF9F6] px-2.5 py-1.5 font-mono-tech text-[11px] text-[#111318]">
          {current.artifact}
        </div>
      </div>
    </div>
  );
};

const ConfidenceVisual: React.FC = () => (
  <div className="rounded-lg border border-[#E3E0D6] bg-[#FAF9F6] p-4">
    <div className="mb-2.5 flex items-center justify-between">
      <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0F766E]">
        Speech + Cardiac Proxy Pipeline
      </span>
      <span className="font-mono-tech text-[11px] text-[#6B7280]">INTERSPEECH 2025</span>
    </div>
    <div className="grid gap-3 md:grid-cols-12 md:items-center">
      <div className="rounded-md border border-[#EAE7DF] bg-white p-3 md:col-span-7">
        <svg viewBox="0 0 360 96" className="h-24 w-full" aria-label="Speech and ECG/PPG cardiac proxy visualization">
          <text x="6" y="14" className="fill-[#6B7280] font-mono-tech text-[8px]">
            SPOKEN UTTERANCE ENVELOPE
          </text>
          <path
            d="M 8 34 Q 34 14 58 34 T 108 34 T 158 34 T 208 34 T 258 34 T 308 34 T 350 34"
            fill="none"
            stroke="#0F766E"
            strokeWidth="1.7"
          />
          <line x1="8" y1="50" x2="352" y2="50" stroke="#E5E7EB" strokeDasharray="3 3" />
          <text x="6" y="63" className="fill-[#6B7280] font-mono-tech text-[8px]">
            CARDIAC RESPONSE (ECG / PPG HR PROXY)
          </text>
          <path
            d="M 8 80 L 42 80 L 48 64 L 54 88 L 60 80 L 102 80 L 108 62 L 114 88 L 120 80 L 166 80 L 172 66 L 178 88 L 184 80 L 236 80 L 242 63 L 248 88 L 254 80 L 308 80 L 314 64 L 320 88 L 326 80 L 350 80"
            fill="none"
            stroke="#111318"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 md:col-span-5">
        {['Speech', 'Physiological Signal', 'Feature Extraction', 'Confidence Analysis'].map((step, i, arr) => (
          <React.Fragment key={step}>
            <span className="rounded border border-[#E3E0D6] bg-white px-2.5 py-1.5 font-mono-tech text-[11px] font-medium text-[#111318]">
              {step}
            </span>
            {i < arr.length - 1 && (
              <ArrowRight className="h-3.5 w-3.5 text-[#0F766E]" aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

const ExerciseVisual: React.FC = () => (
  <div className="rounded-lg border border-[#E3E0D6] bg-[#FAF9F6] p-4">
    <div className="mb-2.5 flex items-center justify-between">
      <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0F766E]">
        Physiological Regime Separation (ICA)
      </span>
      <span className="font-mono-tech text-[11px] text-[#6B7280]">EUSIPCO 2024</span>
    </div>
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-md border border-[#EAE7DF] bg-white p-3">
        <div className="flex items-center justify-between font-mono-tech text-[11px]">
          <span className="font-semibold text-[#111318]">Resting Condition</span>
          <span className="text-[#0F766E]">Baseline Resp. / HR</span>
        </div>
        <svg viewBox="0 0 240 46" className="mt-2 h-11 w-full" aria-label="Resting read-speech physiological trace">
          <path
            d="M 4 24 Q 34 12 64 24 T 124 24 T 184 24 T 236 24"
            fill="none"
            stroke="#0F766E"
            strokeWidth="1.8"
          />
        </svg>
      </div>
      <div className="rounded-md border border-[#EAE7DF] bg-white p-3">
        <div className="flex items-center justify-between font-mono-tech text-[11px]">
          <span className="font-semibold text-[#111318]">Post-Exercise Condition</span>
          <span className="text-[#B45309]">Elevated Resp. / HR</span>
        </div>
        <svg viewBox="0 0 240 46" className="mt-2 h-11 w-full" aria-label="Post-exercise read-speech physiological trace">
          <path
            d="M 4 24 Q 16 6 28 24 T 52 24 T 76 24 T 100 24 T 124 24 T 148 24 T 172 24 T 196 24 T 220 24 T 236 24"
            fill="none"
            stroke="#B45309"
            strokeWidth="1.8"
          />
        </svg>
      </div>
    </div>
  </div>
);

const MultimodalSyncVisual: React.FC = () => (
  <div className="rounded-lg border border-[#E3E0D6] bg-[#FAF9F6] p-4">
    <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
      <span className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0F766E]">
        Synchronized Multi-Channel Corpus Timeline
      </span>
      <span className="font-mono-tech text-[11px] font-semibold text-[#111318]">
        N = 40+ Participants
      </span>
    </div>
    <div className="space-y-2 rounded-md border border-[#EAE7DF] bg-white p-3 font-mono-tech text-[10px]">
      {[
        { label: 'CH1: SPEECH', color: '#0F766E', d: 'M 0 12 L 25 12 L 32 4 L 38 20 L 45 6 L 52 18 L 60 12 L 110 12 L 118 3 L 125 21 L 132 5 L 140 16 L 148 12 L 240 12' },
        { label: 'CH2: ECG', color: '#1D4ED8', d: 'M 0 14 L 40 14 L 44 3 L 48 21 L 52 14 L 112 14 L 116 3 L 120 21 L 124 14 L 184 14 L 188 3 L 192 21 L 196 14 L 240 14' },
        { label: 'CH3: PPG', color: '#B45309', d: 'M 0 18 Q 20 18 32 6 Q 44 18 68 18 Q 92 18 104 6 Q 116 18 140 18 Q 164 18 176 6 Q 188 18 240 18' },
      ].map((ch) => (
        <div key={ch.label} className="grid grid-cols-12 items-center gap-2">
          <span className="col-span-3 font-semibold text-[#434956]">{ch.label}</span>
          <svg viewBox="0 0 240 24" className="col-span-9 h-6 w-full">
            <path d={ch.d} fill="none" stroke={ch.color} strokeWidth="1.6" />
          </svg>
        </div>
      ))}
    </div>
  </div>
);

export const CaseStudyVisuals: React.FC<CaseStudyVisualProps> = ({ project }) => {
  if (project.visualType === 'asr-graph' && project.pipelineStages) {
    return <AsrGraphInteractive stages={project.pipelineStages} />;
  }
  if (project.visualType === 'confidence-hr') {
    return <ConfidenceVisual />;
  }
  if (project.visualType === 'exercise-speech') {
    return <ExerciseVisual />;
  }
  return <MultimodalSyncVisual />;
};

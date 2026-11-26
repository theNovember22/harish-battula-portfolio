import React, { useState } from 'react';
import { useActiveCanvas } from '../lib/useActiveCanvas';

const SPARSE_POINTS = [
  { x: 48, y: 122, label: 't₁ Baseline' },
  { x: 84, y: 118, label: 't₂ +3m' },
  { x: 148, y: 108, label: 't₃ +9m' },
  { x: 178, y: 101, label: 't₄ +11m' },
  { x: 248, y: 88, label: 't₅ Present' },
];

export const TrajectoryCurveVisual: React.FC = () => {
  const { ref, hasEntered } = useActiveCanvas(0.2);
  const [horizonPct, setHorizonPct] = useState(82);

  // Sweep line spans x from 48 to 386
  const sweepX = Math.round(48 + (horizonPct / 100) * (386 - 48));
  const inFuture = sweepX > 248;

  return (
    <div ref={ref} className="surface-card rounded-2xl p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-2.5 font-mono-tech text-[10px] uppercase tracking-wider">
        <span className="font-semibold text-[var(--accent-signal)]">
          LONGITUDINAL MULTIMODAL TRAJECTORY
        </span>
        <span className="text-[var(--ink-muted)]">
          {inFuture ? 'COUNTERFACTUAL HORIZON' : 'SPARSE VISITS (IRREGULAR Δt)'}
        </span>
      </div>

      {/* Scrubbable Time Axis Control */}
      <div className="mb-3 flex flex-col gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-secondary)]">
          Scrub Observation → Forecast Horizon
        </span>
        <div className="flex items-center gap-2 sm:w-52">
          <span className="font-mono-tech text-[9px] text-[var(--ink-muted)]">t₁</span>
          <input
            type="range"
            min={5}
            max={100}
            value={horizonPct}
            onChange={(e) => setHorizonPct(Number(e.target.value))}
            aria-label="Clinical timeline observation and forecast horizon scrubber"
            className="signal-slider w-full"
          />
          <span className="font-mono-tech text-[9px] text-[var(--accent-signal)]">+T</span>
        </div>
      </div>

      <div className="surface-instrument rounded-xl p-3">
        <svg
          viewBox="0 0 420 176"
          className="h-48 w-full"
          role="img"
          aria-label="Longitudinal health trajectory curve showing sparse irregular observations, uncertainty interval, disease progression, and treatment effect"
        >
          {/* Axes */}
          <line x1="34" y1="146" x2="396" y2="146" stroke="#64748B" strokeWidth="1" />
          <line x1="34" y1="16" x2="34" y2="146" stroke="#64748B" strokeWidth="1" />

          {/* Present marker */}
          <line
            x1="248"
            y1="20"
            x2="248"
            y2="146"
            stroke="rgba(148, 163, 184, 0.35)"
            strokeDasharray="3 3"
            strokeWidth="1"
          />

          {/* Uncertainty cones */}
          <polygon
            points="248,88 386,34 386,78"
            fill="rgba(240, 82, 82, 0.16)"
            style={{ opacity: inFuture ? 1 : 0.35, transition: 'opacity 240ms ease' }}
          />
          <polygon
            points="248,88 386,96 386,134"
            fill="rgba(45, 212, 191, 0.16)"
            style={{ opacity: inFuture ? 1 : 0.35, transition: 'opacity 240ms ease' }}
          />

          {/* Historical trajectory */}
          <path
            d="M 48 122 C 110 116, 175 104, 248 88"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="2.2"
          />

          {/* Untreated progression */}
          <path
            d="M 248 88 C 296 76, 340 62, 386 52"
            fill="none"
            stroke="#F05252"
            strokeWidth="2.1"
            strokeDasharray="5 4"
            style={{
              opacity: hasEntered ? (inFuture ? 1 : 0.4) : 0,
              transition: 'opacity 400ms ease',
            }}
          />

          {/* Treatment response */}
          <path
            d="M 248 88 C 296 98, 342 108, 386 114"
            fill="none"
            stroke="#2DD4BF"
            strokeWidth="2.3"
            style={{
              opacity: hasEntered ? (inFuture ? 1 : 0.4) : 0,
              transition: 'opacity 500ms ease',
            }}
          />

          {/* Interactive timeline sweep hairline */}
          <line
            x1={sweepX}
            y1="18"
            x2={sweepX}
            y2="146"
            stroke="#2DD4BF"
            strokeOpacity="0.6"
            strokeWidth="1.2"
          />

          {/* Sparse irregularly sampled points */}
          {SPARSE_POINTS.map((pt, i) => {
            const reached = sweepX >= pt.x;
            return (
              <g key={i}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={reached ? 4.6 : 3.6}
                  fill={reached ? '#2DD4BF' : '#0B1117'}
                  stroke={reached ? '#F8FAFC' : '#64748B'}
                  strokeWidth="1.8"
                  style={{ transition: 'all 180ms ease' }}
                />
              </g>
            );
          })}

          <text x="275" y="42" className="fill-[#F87171] font-mono-tech text-[8.5px] font-semibold">
            Disease Progression
          </text>
          <text x="276" y="132" className="fill-[#2DD4BF] font-mono-tech text-[8.5px] font-semibold">
            Treatment Effect
          </text>
          <text x="42" y="164" className="fill-[#94A3B8] font-mono-tech text-[8.5px]">
            SPARSE / IRREGULAR CLINICAL VISITS → TIME + UNCERTAINTY CONES
          </text>
        </svg>
      </div>
    </div>
  );
};

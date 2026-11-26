import React from 'react';
import { useActiveCanvas } from '../lib/useActiveCanvas';

export const TrajectoryCurveVisual: React.FC = () => {
  const { ref, hasEntered } = useActiveCanvas(0.2);

  // Sparse, irregularly sampled points
  const sparsePoints = [
    { x: 48, y: 122 },
    { x: 84, y: 118 },
    { x: 148, y: 108 },
    { x: 178, y: 101 },
    { x: 248, y: 88 },
  ];

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-[#E4E1D8] bg-white p-4 shadow-[0_14px_38px_-24px_rgba(17,19,24,0.2)] sm:p-5"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#EFECE4] pb-2.5 font-mono-tech text-[10px] uppercase tracking-wider">
        <span className="font-semibold text-[#0F766E]">LONGITUDINAL MULTIMODAL TRAJECTORY</span>
        <span className="text-[#6B7280]">UNCERTAINTY &amp; IRREGULAR SAMPLING</span>
      </div>

      <div className="scientific-grid rounded-lg border border-[#ECE9E0] bg-[#FAF9F6] p-3">
        <svg
          viewBox="0 0 420 176"
          className="h-48 w-full"
          role="img"
          aria-label="Longitudinal health trajectory curve showing sparse irregular observations, uncertainty interval, disease progression, and treatment effect"
        >
          {/* Axes */}
          <line x1="34" y1="146" x2="396" y2="146" stroke="#9CA3AF" strokeWidth="1" />
          <line x1="34" y1="16" x2="34" y2="146" stroke="#9CA3AF" strokeWidth="1" />

          {/* Uncertainty fan */}
          <polygon
            points="248,88 386,34 386,78"
            fill="rgba(200, 62, 59, 0.12)"
          />
          <polygon
            points="248,88 386,96 386,134"
            fill="rgba(15, 118, 110, 0.12)"
          />

          {/* Historical trajectory */}
          <path
            d="M 48 122 C 110 116, 175 104, 248 88"
            fill="none"
            stroke="#111318"
            strokeWidth="2.2"
          />

          {/* Untreated progression */}
          <path
            d="M 248 88 C 296 76, 340 62, 386 52"
            fill="none"
            stroke="#C83E3B"
            strokeWidth="2.1"
            strokeDasharray="5 4"
            style={{
              opacity: hasEntered ? 1 : 0,
              transition: 'opacity 600ms ease',
            }}
          />

          {/* Treatment response */}
          <path
            d="M 248 88 C 296 98, 342 108, 386 114"
            fill="none"
            stroke="#0F766E"
            strokeWidth="2.2"
            style={{
              opacity: hasEntered ? 1 : 0,
              transition: 'opacity 800ms ease',
            }}
          />

          {/* Sparse irregularly sampled points */}
          {sparsePoints.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="4.2"
              fill="#FFFFFF"
              stroke="#111318"
              strokeWidth="2"
            />
          ))}

          <text x="275" y="42" className="fill-[#C83E3B] font-mono-tech text-[8.5px] font-semibold">
            Disease Progression
          </text>
          <text x="276" y="132" className="fill-[#0F766E] font-mono-tech text-[8.5px] font-semibold">
            Treatment Effect
          </text>
          <text x="42" y="164" className="fill-[#6B7280] font-mono-tech text-[8.5px]">
            SPARSE / IRREGULAR CLINICAL VISITS → TIME + UNCERTAINTY BAND
          </text>
        </svg>
      </div>
    </div>
  );
};

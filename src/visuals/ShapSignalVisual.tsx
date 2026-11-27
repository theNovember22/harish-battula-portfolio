import React, { useState } from 'react';
import { useActiveCanvas } from '../lib/useActiveCanvas';

interface ShapItem {
  feature: string;
  weight: number;
  positive: boolean;
}

const FEATURE_WINDOWS: Array<{ x: number; width: number; tag: string }> = [
  { x: 64, width: 48, tag: 'S1–S2 Ratio Window' },
  { x: 132, width: 52, tag: 'Mid-Systolic Band' },
  { x: 208, width: 56, tag: 'R–R Variability' },
  { x: 294, width: 50, tag: '0.25 Hz Resp. ICA' },
  { x: 356, width: 44, tag: 'Baseline Floor' },
];

export const ShapSignalVisual: React.FC<{ features: ShapItem[] }> = ({ features }) => {
  const { ref, hasEntered } = useActiveCanvas(0.2);
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  const focusedWindow = activeIdx !== null ? FEATURE_WINDOWS[activeIdx] : null;
  const focusedItem = activeIdx !== null ? features[activeIdx] : null;

  return (
    <div ref={ref} className="surface-card rounded-2xl p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-2.5 font-mono-tech text-[10px] uppercase tracking-wider">
        <span className="font-semibold text-[var(--accent-signal)]">
          SHAP / LIME PHYSIOLOGICAL ATTRIBUTION
        </span>
        <span className="text-[var(--ink-muted)]">
          {focusedWindow ? focusedWindow.tag : 'FEATURE IMPACT'}
        </span>
      </div>

      {/* Calibrated Instrument Signal Window Linked to SHAP Feature */}
      <div className="surface-instrument mb-4 rounded-xl p-2.5">
        <svg
          viewBox="0 0 420 68"
          className="h-16 w-full"
          aria-label="Signal trace with interactive SHAP physiological attribution windows"
        >
          {FEATURE_WINDOWS.map((win, idx) => {
            const isSelected = activeIdx === idx;
            const isPos = features[idx]?.positive ?? true;
            return (
              <rect
                key={win.tag}
                x={win.x}
                y="6"
                width={win.width}
                height="56"
                rx="4"
                fill={
                  isPos
                    ? `rgba(240, 82, 82, ${isSelected ? '0.28' : '0.07'})`
                    : `rgba(45, 212, 191, ${isSelected ? '0.28' : '0.07'})`
                }
                stroke={
                  isSelected ? (isPos ? '#F05252' : '#2DD4BF') : 'transparent'
                }
                strokeWidth="1.2"
                style={{ transition: 'all 220ms ease' }}
              />
            );
          })}

          <path
            d="M 8 36 L 56 36 L 68 36 L 78 12 L 88 56 L 98 22 L 108 36 L 136 36 L 146 27 L 158 45 L 170 28 L 182 36 L 210 36 L 222 14 L 236 55 L 250 18 L 264 36 L 296 36 L 312 24 L 328 46 L 344 36 L 358 32 L 372 40 L 384 36 L 412 36"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {focusedWindow && focusedItem && (
            <text
              x={focusedWindow.x + focusedWindow.width / 2}
              y="16"
              textAnchor="middle"
              className="font-mono-tech text-[8px] font-semibold"
              fill={focusedItem.positive ? '#F87171' : '#5EEAD4'}
            >
              {focusedItem.positive
                ? `+${focusedItem.weight.toFixed(2)}`
                : focusedItem.weight.toFixed(2)}
            </text>
          )}
        </svg>
      </div>

      {/* Bidirectional Interactive SHAP Bars */}
      <div className="space-y-2">
        {features.map((item, idx) => {
          const widthPct = Math.round(Math.abs(item.weight) * 195);
          const isActive = activeIdx === idx;
          return (
            <button
              key={item.feature}
              type="button"
              onMouseEnter={() => setActiveIdx(idx)}
              onClick={() => setActiveIdx(idx)}
              className={`block w-full rounded-lg px-2.5 py-1.5 text-left transition-colors ${
                isActive ? 'bg-[var(--bg-subtle)]' : 'hover:bg-[var(--bg-subtle)]/60'
              }`}
            >
              <div className="flex items-center justify-between font-mono-tech text-[11px]">
                <span
                  className={`transition-colors ${
                    isActive
                      ? 'font-semibold text-[var(--ink-primary)]'
                      : 'text-[var(--ink-secondary)]'
                  }`}
                >
                  {item.feature}
                </span>
                <span
                  className="font-semibold"
                  style={{ color: item.positive ? 'var(--accent-data)' : 'var(--accent-signal)' }}
                >
                  {item.positive ? `+${item.weight.toFixed(2)}` : item.weight.toFixed(2)}
                </span>
              </div>
              <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-[var(--border-subtle)]">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: hasEntered ? `${widthPct}%` : '0%',
                    transitionDelay: `${idx * 65}ms`,
                    backgroundColor: item.positive ? 'var(--accent-data)' : 'var(--accent-signal)',
                    opacity: isActive || activeIdx === null ? 1 : 0.45,
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

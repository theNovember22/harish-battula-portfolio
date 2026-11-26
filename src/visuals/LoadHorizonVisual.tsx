import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

type Horizon = 'short' | 'medium' | 'long';

const HORIZON_META: Record<Horizon, { label: string; window: string; desc: string; splitX: number }> = {
  short: {
    label: 'Short-Term',
    window: 'Minutes → Hours',
    desc: 'Captures rapid intra-day demand fluctuations and immediate peak ramps.',
    splitX: 280,
  },
  medium: {
    label: 'Medium-Term',
    window: 'Days → Weeks',
    desc: 'Models weekly periodicity and seasonal weather-driven load shifts.',
    splitX: 240,
  },
  long: {
    label: 'Long-Term',
    window: 'Months → Years',
    desc: 'Tracks macro consumption trends for grid capacity planning.',
    splitX: 200,
  },
};

export const LoadHorizonVisual: React.FC = () => {
  const [horizon, setHorizon] = useState<Horizon>('short');
  const [probeX, setProbeX] = useState<number | null>(null);
  const meta = HORIZON_META[horizon];

  const { historyPath, forecastPath } = useMemo(() => {
    const hist: string[] = [];
    const fore: string[] = [];
    const split = meta.splitX;
    const freq = horizon === 'short' ? 0.09 : horizon === 'medium' ? 0.052 : 0.025;

    for (let x = 16; x <= 404; x += 4) {
      const trend = horizon === 'long' ? -(x - 16) * 0.075 : 0;
      const wave =
        18 * Math.sin(x * freq) +
        9 * Math.cos(x * freq * 1.9) +
        (horizon === 'short' ? 5 * Math.sin(x * 0.24) : 0);
      const y = 78 + trend + wave;
      if (x <= split) {
        hist.push(`${hist.length === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`);
      }
      if (x >= split) {
        fore.push(`${fore.length === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`);
      }
    }
    return { historyPath: hist.join(' '), forecastPath: fore.join(' ') };
  }, [horizon, meta.splitX]);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xSvg = 16 + ((e.clientX - rect.left) / rect.width) * (404 - 16);
    setProbeX(Math.max(16, Math.min(404, Math.round(xSvg))));
  };

  return (
    <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-signal)]">
          THESIS FORECASTING HORIZON • {meta.window}
        </span>
        <div className="inline-flex rounded-md border border-[var(--border-hairline)] bg-[var(--bg-paper)] p-0.5">
          {(['short', 'medium', 'long'] as Horizon[]).map((h) => {
            const active = horizon === h;
            return (
              <button
                key={h}
                type="button"
                onClick={() => setHorizon(h)}
                className="relative rounded px-2.5 py-1 font-mono-tech text-[10px] font-medium transition-colors"
              >
                {active && (
                  <motion.span
                    layoutId="load-horizon-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded bg-[var(--btn-primary-bg)]"
                  />
                )}
                <span
                  className={`relative z-10 ${
                    active ? 'text-[var(--btn-primary-fg)]' : 'text-[var(--ink-secondary)]'
                  }`}
                >
                  {HORIZON_META[h].label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        onPointerMove={handleMove}
        onPointerLeave={() => setProbeX(null)}
        className="surface-instrument touch-pan-y rounded-xl p-2.5"
      >
        <svg
          viewBox="0 0 420 132"
          className="h-32 w-full cursor-crosshair"
          aria-label="Time-series electrical load forecasting horizon visualization"
        >
          <rect
            x={meta.splitX}
            y="10"
            width={404 - meta.splitX}
            height="108"
            rx="4"
            fill="rgba(45, 212, 191, 0.1)"
          />
          <line
            x1={meta.splitX}
            y1="10"
            x2={meta.splitX}
            y2="118"
            stroke="#2DD4BF"
            strokeDasharray="3 3"
            strokeWidth="1.2"
          />
          {probeX !== null && (
            <line
              x1={probeX}
              y1="10"
              x2={probeX}
              y2="118"
              stroke="rgba(248, 250, 252, 0.45)"
              strokeWidth="1"
            />
          )}
          <path d={historyPath} fill="none" stroke="#E2E8F0" strokeWidth="1.9" />
          <path d={forecastPath} fill="none" stroke="#2DD4BF" strokeWidth="2.2" />
          <text x="20" y="22" className="fill-[#94A3B8] font-mono-tech text-[8.5px]">
            OBSERVED LOAD SERIES
          </text>
          <text
            x={meta.splitX + 8}
            y="22"
            className="fill-[#2DD4BF] font-mono-tech text-[8.5px] font-semibold"
          >
            {probeX !== null && probeX >= meta.splitX ? 'FORECAST WINDOW' : 'DL HORIZON'}
          </text>
        </svg>
      </div>

      <p className="mt-2.5 text-xs leading-relaxed text-[var(--ink-secondary)]">{meta.desc}</p>
    </div>
  );
};

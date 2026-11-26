import React, { useMemo, useState } from 'react';

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

  return (
    <div className="rounded-xl border border-[#E4E1D8] bg-[#FAF9F6] p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[#0F766E]">
          THESIS FORECASTING HORIZON • {meta.window}
        </span>
        <div className="inline-flex rounded-md border border-[#E4E1D8] bg-white p-0.5">
          {(['short', 'medium', 'long'] as Horizon[]).map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => setHorizon(h)}
              className={`rounded px-2.5 py-1 font-mono-tech text-[10px] font-medium transition-colors ${
                horizon === h
                  ? 'bg-[#111318] text-white'
                  : 'text-[#434956] hover:text-[#111318]'
              }`}
            >
              {HORIZON_META[h].label}
            </button>
          ))}
        </div>
      </div>

      <div className="scientific-grid rounded-lg border border-[#ECE9E0] bg-white p-2.5">
        <svg viewBox="0 0 420 132" className="h-32 w-full" aria-label="Time-series electrical load forecasting horizon visualization">
          <rect
            x={meta.splitX}
            y="10"
            width={404 - meta.splitX}
            height="108"
            rx="4"
            fill="rgba(15, 118, 110, 0.07)"
          />
          <line
            x1={meta.splitX}
            y1="10"
            x2={meta.splitX}
            y2="118"
            stroke="#0F766E"
            strokeDasharray="3 3"
            strokeWidth="1.2"
          />
          <path d={historyPath} fill="none" stroke="#111318" strokeWidth="1.9" />
          <path d={forecastPath} fill="none" stroke="#0F766E" strokeWidth="2.1" />
          <text x="20" y="22" className="fill-[#6B7280] font-mono-tech text-[8.5px]">
            OBSERVED LOAD SERIES
          </text>
          <text x={meta.splitX + 8} y="22" className="fill-[#0F766E] font-mono-tech text-[8.5px] font-semibold">
            DL HORIZON
          </text>
        </svg>
      </div>

      <p className="mt-2.5 text-xs leading-relaxed text-[#434956]">{meta.desc}</p>
    </div>
  );
};

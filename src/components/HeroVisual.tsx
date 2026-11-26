import React, { useEffect, useState } from 'react';

type StageKey = 'speech' | 'physio' | 'graph' | 'inference';

interface StageMeta {
  key: StageKey;
  index: string;
  label: string;
  detail: string;
  metric: string;
}

const STAGES: StageMeta[] = [
  {
    key: 'speech',
    index: '01',
    label: 'Speech Signal',
    detail: 'Spontaneous & read speech acoustics, ASR transcripts, prosody',
    metric: '16 kHz PCM',
  },
  {
    key: 'physio',
    index: '02',
    label: 'Physiological Waveforms',
    detail: 'Synchronized ECG, PPG & PCG biomarkers across 40+ participants',
    metric: 'ECG • PPG • PCG',
  },
  {
    key: 'graph',
    index: '03',
    label: 'Graph & Multimodal Structure',
    detail: 'Transcript-derived structural graphs & cross-modal alignment',
    metric: 'G = (V, E)',
  },
  {
    key: 'inference',
    index: '04',
    label: 'Clinical Inference & XAI',
    detail: 'Dementia detection (~91%), CAD cues, SHAP/LIME interpretability',
    metric: 'Trustworthy ML',
  },
];

export const HeroVisual: React.FC = () => {
  const [activeStage, setActiveStage] = useState<StageKey>('speech');
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const frameTimer = window.setInterval(() => {
      setPhase((p) => (p + 0.14) % (Math.PI * 2));
    }, 55);

    return () => window.clearInterval(frameTimer);
  }, []);

  // Build dynamic speech waveform path
  const speechPath = React.useMemo(() => {
    const pts: string[] = [];
    for (let x = 0; x <= 210; x += 3) {
      const env = Math.sin((x / 210) * Math.PI);
      const y =
        34 +
        env *
          (14 * Math.sin(x * 0.14 + phase) +
            7 * Math.cos(x * 0.31 - phase * 1.4) +
            4 * Math.sin(x * 0.55 + phase * 2));
      pts.push(`${x === 0 ? 'M' : 'L'} ${x + 12} ${y.toFixed(1)}`);
    }
    return pts.join(' ');
  }, [phase]);

  // Build dynamic ECG-like waveform path
  const ecgPath = React.useMemo(() => {
    const pts: string[] = [];
    const shift = (phase / (Math.PI * 2)) * 70;
    for (let x = 0; x <= 210; x += 2) {
      const local = ((x + shift) % 70) / 70;
      let yOffset = 0;
      if (local > 0.18 && local < 0.27) {
        yOffset = -3.5 * Math.sin(((local - 0.18) / 0.09) * Math.PI);
      } else if (local >= 0.34 && local < 0.37) {
        yOffset = 4.5;
      } else if (local >= 0.37 && local < 0.42) {
        yOffset = -23 * Math.sin(((local - 0.37) / 0.05) * Math.PI);
      } else if (local >= 0.42 && local < 0.46) {
        yOffset = 7;
      } else if (local >= 0.56 && local < 0.72) {
        yOffset = -5.5 * Math.sin(((local - 0.56) / 0.16) * Math.PI);
      }
      pts.push(`${x === 0 ? 'M' : 'L'} ${x + 12} ${(38 + yOffset).toFixed(1)}`);
    }
    return pts.join(' ');
  }, [phase]);

  const activeMeta = STAGES.find((s) => s.key === activeStage) ?? STAGES[0];

  const graphNodes = [
    { id: 'n1', cx: 295, cy: 52, r: 5.5, label: 'w₁' },
    { id: 'n2', cx: 342, cy: 36, r: 6.5, label: 'w₂' },
    { id: 'n3', cx: 392, cy: 56, r: 5.5, label: 'w₃' },
    { id: 'n4', cx: 320, cy: 96, r: 6, label: 'w₄' },
    { id: 'n5', cx: 372, cy: 102, r: 7, label: 'w₅' },
    { id: 'n6', cx: 348, cy: 142, r: 5.5, label: 'w₆' },
  ];

  const graphEdges: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 3],
    [1, 4],
    [2, 4],
    [3, 4],
    [3, 5],
    [4, 5],
  ];

  return (
    <div className="relative rounded-xl border border-[#E3E0D6] bg-white p-4 shadow-[0_12px_36px_-18px_rgba(17,19,24,0.16)] sm:p-5">
      {/* Top Specimen Instrument Header */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#EFECE4] pb-3">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[#0F766E]" />
          <span className="font-mono-tech text-[11px] font-medium uppercase tracking-[0.12em] text-[#111318]">
            Multimodal Signal-to-Inference Monitor
          </span>
        </div>
        <span className="font-mono-tech text-[11px] text-[#6B7280]">
          SPECIMEN: HB-LAB-04
        </span>
      </div>

      {/* Main SVG Scientific Diagram */}
      <div className="scientific-grid-bg relative overflow-hidden rounded-lg border border-[#E8E5DC] bg-[#FAF9F6]">
        <svg
          viewBox="0 0 460 220"
          className="h-auto w-full"
          role="img"
          aria-label="Scientific visualization connecting speech waveforms, physiological ECG/PPG signals, graph representations, and neural healthcare inference"
        >
          {/* Channel 1: Speech Waveform */}
          <g
            onMouseEnter={() => setActiveStage('speech')}
            onClick={() => setActiveStage('speech')}
            className="cursor-pointer"
          >
            <rect
              x="8"
              y="8"
              width="218"
              height="68"
              rx="6"
              fill={activeStage === 'speech' ? 'rgba(15, 118, 110, 0.06)' : 'rgba(255,255,255,0.75)'}
              stroke={activeStage === 'speech' ? '#0F766E' : '#E3E0D6'}
              strokeWidth={activeStage === 'speech' ? '1.4' : '1'}
            />
            <text x="16" y="21" className="fill-[#6B7280] font-mono-tech text-[8.5px]">
              CH-01 // ACOUSTIC SPEECH
            </text>
            <path
              d={speechPath}
              fill="none"
              stroke="#0F766E"
              strokeWidth="1.65"
              strokeLinecap="round"
            />
          </g>

          {/* Channel 2: Physiological Signal (ECG/PPG) */}
          <g
            onMouseEnter={() => setActiveStage('physio')}
            onClick={() => setActiveStage('physio')}
            className="cursor-pointer"
          >
            <rect
              x="8"
              y="86"
              width="218"
              height="74"
              rx="6"
              fill={activeStage === 'physio' ? 'rgba(15, 118, 110, 0.06)' : 'rgba(255,255,255,0.75)'}
              stroke={activeStage === 'physio' ? '#0F766E' : '#E3E0D6'}
              strokeWidth={activeStage === 'physio' ? '1.4' : '1'}
            />
            <text x="16" y="99" className="fill-[#6B7280] font-mono-tech text-[8.5px]">
              CH-02 // ECG / PPG PHYSIOLOGY
            </text>
            <g transform="translate(0, 82)">
              <path
                d={ecgPath}
                fill="none"
                stroke="#111318"
                strokeWidth="1.55"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>

          {/* Coupling Arrows to Graph / Representation */}
          <path
            d="M 228 42 C 254 42, 254 68, 274 68"
            fill="none"
            stroke="#0F766E"
            strokeWidth="1.3"
            strokeDasharray="3 3"
          />
          <path
            d="M 228 122 C 254 122, 254 96, 274 96"
            fill="none"
            stroke="#111318"
            strokeWidth="1.3"
            strokeDasharray="3 3"
          />

          {/* Stage 3: Graph Representation */}
          <g
            onMouseEnter={() => setActiveStage('graph')}
            onClick={() => setActiveStage('graph')}
            className="cursor-pointer"
          >
            <rect
              x="274"
              y="8"
              width="178"
              height="152"
              rx="6"
              fill={activeStage === 'graph' ? 'rgba(15, 118, 110, 0.06)' : 'rgba(255,255,255,0.75)'}
              stroke={activeStage === 'graph' ? '#0F766E' : '#E3E0D6'}
              strokeWidth={activeStage === 'graph' ? '1.4' : '1'}
            />
            <text x="284" y="21" className="fill-[#6B7280] font-mono-tech text-[8.5px]">
              REP // GRAPH + LATENT EMBEDDING
            </text>

            {graphEdges.map(([a, b], idx) => (
              <line
                key={idx}
                x1={graphNodes[a].cx}
                y1={graphNodes[a].cy}
                x2={graphNodes[b].cx}
                y2={graphNodes[b].cy}
                stroke="#9CA3AF"
                strokeWidth="1.1"
              />
            ))}

            {graphNodes.map((n, idx) => {
              const pulse = 1 + 0.14 * Math.sin(phase + idx * 0.9);
              return (
                <g key={n.id}>
                  <circle
                    cx={n.cx}
                    cy={n.cy}
                    r={n.r * pulse}
                    fill={idx % 2 === 0 ? '#0F766E' : '#111318'}
                    fillOpacity="0.9"
                  />
                  <circle
                    cx={n.cx}
                    cy={n.cy}
                    r={n.r + 4}
                    fill="none"
                    stroke="#0F766E"
                    strokeOpacity="0.22"
                    strokeWidth="1"
                  />
                </g>
              );
            })}

            <text x="284" y="152" className="fill-[#0F766E] font-mono-tech text-[8px]">
              GNN MESSAGE PASSING • ASR GRAPH
            </text>
          </g>

          {/* Bottom Strip: Neural Representation & Clinical Output */}
          <g
            onMouseEnter={() => setActiveStage('inference')}
            onClick={() => setActiveStage('inference')}
            className="cursor-pointer"
          >
            <rect
              x="8"
              y="168"
              width="444"
              height="44"
              rx="6"
              fill={activeStage === 'inference' ? 'rgba(15, 118, 110, 0.08)' : '#FFFFFF'}
              stroke={activeStage === 'inference' ? '#0F766E' : '#E3E0D6'}
              strokeWidth={activeStage === 'inference' ? '1.4' : '1'}
            />
            <text x="18" y="184" className="fill-[#6B7280] font-mono-tech text-[8.5px]">
              OUT // TRUSTWORTHY HEALTHCARE INFERENCE
            </text>
            <text x="18" y="201" className="fill-[#111318] font-mono-tech text-[9px] font-medium">
              Dementia (~91%) • Confidence HR • Exercise ICA • CAD / PCG • SHAP/LIME
            </text>
          </g>
        </svg>
      </div>

      {/* Interactive Stage Selector Tabs */}
      <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {STAGES.map((stage) => {
          const isSelected = stage.key === activeStage;
          return (
            <button
              key={stage.key}
              type="button"
              onClick={() => setActiveStage(stage.key)}
              className={`rounded-md border px-2.5 py-2 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
                isSelected
                  ? 'border-[#0F766E] bg-[#0F766E]/8 text-[#111318]'
                  : 'border-[#EAE7DF] bg-[#FAF9F6] text-[#6B7280] hover:border-[#C8C3B5] hover:text-[#111318]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-[10px] font-semibold text-[#0F766E]">
                  {stage.index}
                </span>
                <span className="font-mono-tech text-[9px] uppercase text-[#6B7280]">
                  {stage.metric}
                </span>
              </div>
              <div className="mt-0.5 truncate text-xs font-medium text-[#111318]">
                {stage.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Live readout bar */}
      <div className="mt-2.5 flex items-center justify-between gap-3 rounded-md bg-[#F3F1EA] px-3 py-2 text-xs text-[#434956]">
        <span>
          <strong className="font-mono-tech text-[11px] text-[#0F766E]">
            [{activeMeta.index}] {activeMeta.label}:
          </strong>{' '}
          {activeMeta.detail}
        </span>
      </div>
    </div>
  );
};

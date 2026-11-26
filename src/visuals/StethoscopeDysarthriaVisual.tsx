import React, { useEffect, useMemo, useState } from 'react';
import { useActiveCanvas } from '../lib/useActiveCanvas';

export const StethoscopeDysarthriaVisual: React.FC = () => {
  const { ref, isVisible, reducedMotion } = useActiveCanvas(0.2);
  const [mode, setMode] = useState<'pcg' | 'dysarthria'>('pcg');
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reducedMotion || !isVisible) return;
    const timer = window.setInterval(() => {
      setPhase((p) => (p + 0.16) % (Math.PI * 2));
    }, 55);
    return () => window.clearInterval(timer);
  }, [isVisible, reducedMotion]);

  const pcgPath = useMemo(() => {
    const pts: string[] = [];
    const period = 180;
    const shift = (phase / (Math.PI * 2)) * period;
    for (let x = 0; x <= 440; x += 2) {
      const local = ((x + shift) % period) / period;
      const s1 = Math.exp(-Math.pow((local - 0.2) / 0.036, 2));
      const murmur = 0.34 * Math.exp(-Math.pow((local - 0.37) / 0.072, 2));
      const s2 = 0.76 * Math.exp(-Math.pow((local - 0.56) / 0.032, 2));
      const osc = Math.sin(x * 0.75 + phase * 3);
      const y = 66 - (s1 * 50 + murmur * 38 + s2 * 44) * osc;
      pts.push(`${x === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`);
    }
    return pts.join(' ');
  }, [phase]);

  // Facial / articulatory landmark wireframe coordinates
  const landmarks = [
    [110, 32], [140, 26], [170, 32], // brow
    [118, 52], [162, 52], // eyes
    [140, 74], // nose tip
    [120, 98], [140, 95], [160, 98], [140, 108], // lip contour
    [104, 72], [116, 114], [140, 124], [164, 114], [176, 72], // jaw contour
  ];

  const landmarkEdges: [number, number][] = [
    [0, 1], [1, 2], [3, 5], [4, 5], [5, 7],
    [6, 7], [7, 8], [8, 9], [9, 6],
    [10, 11], [11, 12], [12, 13], [13, 14], [0, 10], [2, 14],
  ];

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-[#E4E1D8] bg-white p-4 shadow-[0_14px_38px_-24px_rgba(17,19,24,0.2)] sm:p-5"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#EFECE4] pb-2.5">
        <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[#0F766E]">
          {mode === 'pcg' ? 'PCG AUSCULTATION • S1 / MURMUR / S2' : 'DYSARTHRIA & FACIAL ARTICULATORY MESH'}
        </span>
        <div className="inline-flex rounded-md border border-[#E4E1D8] bg-[#FAF9F6] p-0.5">
          <button
            type="button"
            onClick={() => setMode('pcg')}
            className={`rounded px-2.5 py-1 font-mono-tech text-[10px] font-medium ${
              mode === 'pcg' ? 'bg-[#0F766E] text-white' : 'text-[#434956]'
            }`}
          >
            PCG / CAD
          </button>
          <button
            type="button"
            onClick={() => setMode('dysarthria')}
            className={`rounded px-2.5 py-1 font-mono-tech text-[10px] font-medium ${
              mode === 'dysarthria' ? 'bg-[#C83E3B] text-white' : 'text-[#434956]'
            }`}
          >
            Dysarthria / Landmarks
          </button>
        </div>
      </div>

      {mode === 'pcg' ? (
        <div className="scientific-grid rounded-lg border border-[#ECE9E0] bg-[#FAF9F6] p-3">
          <svg viewBox="0 0 440 136" className="h-44 w-full" aria-label="Phonocardiogram waveform showing S1, systolic murmur band, and S2 heart sounds">
            <rect x="135" y="14" width="60" height="108" rx="4" fill="rgba(200, 62, 59, 0.08)" />
            <text x="165" y="27" textAnchor="middle" className="fill-[#C83E3B] font-mono-tech text-[8.5px] font-semibold">
              MURMUR BAND
            </text>
            <path d={pcgPath} fill="none" stroke="#0F766E" strokeWidth="1.9" strokeLinecap="round" />
          </svg>
          <div className="mt-2 flex justify-between font-mono-tech text-[10px] text-[#6B7280]">
            <span>NORMAL S1 / S2 TIMING</span>
            <span className="text-[#C83E3B]">CAD ACOUSTIC INDICATORS</span>
          </div>
        </div>
      ) : (
        <div className="scientific-grid grid items-center gap-3 rounded-lg border border-[#ECE9E0] bg-[#FAF9F6] p-3 sm:grid-cols-2">
          <svg viewBox="60 10 160 130" className="h-40 w-full" aria-label="Geometric facial landmark mesh for articulatory and emotion analysis">
            {landmarkEdges.map(([a, b], i) => (
              <line
                key={i}
                x1={landmarks[a][0]}
                y1={landmarks[a][1]}
                x2={landmarks[b][0]}
                y2={landmarks[b][1]}
                stroke="#0F766E"
                strokeOpacity="0.45"
                strokeWidth="1.2"
              />
            ))}
            {landmarks.map(([cx, cy], idx) => (
              <circle
                key={idx}
                cx={cx}
                cy={cy}
                r={idx >= 6 && idx <= 9 ? 3.2 : 2.5}
                fill={idx >= 6 && idx <= 9 ? '#C83E3B' : '#111318'}
              />
            ))}
          </svg>
          <div className="space-y-2 pr-2 font-mono-tech text-[11px]">
            <div className="rounded border border-[#E4E1D8] bg-white p-2.5">
              <div className="text-[10px] text-[#6B7280]">DYSARTHRIA SEVERITY</div>
              <div className="mt-0.5 font-semibold text-[#111318]">Articulatory &amp; Acoustic Assessment</div>
            </div>
            <div className="rounded border border-[#E4E1D8] bg-white p-2.5">
              <div className="text-[10px] text-[#6B7280]">LANDMARK TRACKING</div>
              <div className="mt-0.5 font-semibold text-[#0F766E]">MediaPipe • OpenCV</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

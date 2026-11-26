import React, { useEffect, useRef, useState } from 'react';
import { useActiveCanvas } from '../lib/useActiveCanvas';

export const ConfidenceSpectrogramVisual: React.FC = () => {
  const { ref, isVisible, reducedMotion } = useActiveCanvas(0.2);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stateMode, setStateMode] = useState<'assured' | 'hesitant'>('assured');
  const [probeX, setProbeX] = useState<number | null>(null);
  const probeRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let offset = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(parent.clientWidth * dpr));
      canvas.height = Math.max(1, Math.floor(parent.clientHeight * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const specH = h * 0.54;
      const cols = 48;
      const rows = 14;
      const cellW = w / cols;
      const cellH = specH / rows;
      const isHesitant = stateMode === 'hesitant';

      // Top: Speech Time-Frequency Spectrogram
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const normR = 1 - r / rows;
          const jitter = isHesitant ? Math.sin(c * 0.9 - offset * 2) * 0.08 : 0;
          const formant =
            Math.exp(-Math.pow((normR - 0.25 - jitter) / 0.16, 2)) +
            0.72 * Math.exp(-Math.pow((normR - 0.58 + jitter) / 0.14, 2));
          const temporal =
            0.5 + 0.5 * Math.sin(c * 0.35 - offset + r * 0.2) * Math.cos(c * 0.14 + offset * 0.5);
          const energy = Math.min(1, Math.max(0.06, formant * temporal));
          ctx.fillStyle = isHesitant && energy > 0.72
            ? `rgba(240, 82, 82, ${(energy * 0.78).toFixed(2)})`
            : `rgba(45, 212, 191, ${(energy * 0.76).toFixed(2)})`;
          ctx.fillRect(c * cellW + 1, r * cellH + 1, Math.max(1, cellW - 2), Math.max(1, cellH - 2));
        }
      }

      // Divider
      const divY = specH + 10;
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, divY);
      ctx.lineTo(w, divY);
      ctx.stroke();

      // Bottom: Instantaneous Heart Rate Proxy Curve
      const hrTop = divY + 14;
      const hrH = h - hrTop - 16;

      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const t = x / w;
        const amp = isHesitant ? 0.34 : 0.14;
        const drift = isHesitant ? 0.15 * Math.sin(t * 17 + offset * 0.7) : 0.06 * Math.cos(t * 12);
        const hrNorm = 0.52 + amp * Math.sin(t * 9 - offset * 0.65) + drift;
        const y = hrTop + (1 - hrNorm) * hrH;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#F05252';
      ctx.lineWidth = 2.4;
      ctx.stroke();

      // Optional pointer inspection crosshair
      if (probeRef.current !== null) {
        const px = probeRef.current * w;
        ctx.strokeStyle = 'rgba(248, 250, 252, 0.45)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(px, 4);
        ctx.lineTo(px, h - 4);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      if (!reducedMotion && isVisible) {
        offset += isHesitant ? 0.055 : 0.036;
        rafId = requestAnimationFrame(draw);
      }
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible, reducedMotion, stateMode]);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const u = Math.max(0.02, Math.min(0.98, (e.clientX - rect.left) / rect.width));
    probeRef.current = u;
    setProbeX(u);
  };

  const estBpm =
    stateMode === 'hesitant'
      ? Math.round(92 + (probeX ?? 0.5) * 14)
      : Math.round(69 + (probeX ?? 0.5) * 6);

  return (
    <div ref={ref} className="surface-card rounded-2xl p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-2.5">
        <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-signal)]">
          CONFIDENCE TELEMETRY • EST {estBpm} BPM
        </span>
        <div className="inline-flex rounded-md border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-0.5">
          <button
            type="button"
            onClick={() => setStateMode('assured')}
            className={`rounded px-2.5 py-1 font-mono-tech text-[10px] font-medium transition-colors ${
              stateMode === 'assured'
                ? 'bg-[var(--accent-signal)] text-[var(--btn-primary-fg)]'
                : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
            }`}
          >
            Assured Speech
          </button>
          <button
            type="button"
            onClick={() => setStateMode('hesitant')}
            className={`rounded px-2.5 py-1 font-mono-tech text-[10px] font-medium transition-colors ${
              stateMode === 'hesitant'
                ? 'bg-[var(--accent-data)] text-white'
                : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
            }`}
          >
            Autonomic Load
          </button>
        </div>
      </div>

      <div
        onPointerMove={handleMove}
        onPointerDown={handleMove}
        onPointerLeave={() => {
          probeRef.current = null;
          setProbeX(null);
        }}
        className="surface-instrument relative h-56 w-full touch-pan-y overflow-hidden rounded-xl sm:h-64"
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full cursor-crosshair"
          aria-label="Speech spectrogram paired with heart-rate proxy trajectory assessing spoken confidence"
        />
        <div className="pointer-events-none absolute inset-x-0 top-2 flex justify-between px-3 font-mono-tech text-[9.5px] tracking-wider">
          <span className="text-[#2DD4BF]">SPEECH FORMANT SPECTROGRAM</span>
          <span className="hidden text-[#94A3B8] sm:inline">
            {probeX !== null ? `WINDOW ${(probeX * 4).toFixed(2)}s` : 'HOVER / DRAG TO INSPECT'}
          </span>
        </div>
        <div className="pointer-events-none absolute bottom-2 left-3 font-mono-tech text-[9.5px] text-[#F05252]">
          HR CONFIDENCE PROXY • {stateMode === 'hesitant' ? 'ELEVATED VARIANCE' : 'STEADY CADENCE'}
        </div>
      </div>
    </div>
  );
};

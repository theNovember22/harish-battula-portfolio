import React, { useEffect, useRef } from 'react';
import { useActiveCanvas } from '../lib/useActiveCanvas';

export const ConfidenceSpectrogramVisual: React.FC = () => {
  const { ref, isVisible, reducedMotion } = useActiveCanvas(0.2);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

      // Top: Speech Spectrogram grid
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const normR = 1 - r / rows;
          const formant =
            Math.exp(-Math.pow((normR - 0.25) / 0.16, 2)) +
            0.7 * Math.exp(-Math.pow((normR - 0.58) / 0.14, 2));
          const temporal =
            0.5 + 0.5 * Math.sin(c * 0.35 - offset + r * 0.2) * Math.cos(c * 0.14 + offset * 0.5);
          const energy = Math.min(1, Math.max(0.06, formant * temporal));
          ctx.fillStyle = `rgba(15, 118, 110, ${(energy * 0.78).toFixed(2)})`;
          ctx.fillRect(c * cellW + 1, r * cellH + 1, Math.max(1, cellW - 2), Math.max(1, cellH - 2));
        }
      }

      // Divider
      const divY = specH + 10;
      ctx.strokeStyle = '#E4E1D8';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, divY);
      ctx.lineTo(w, divY);
      ctx.stroke();

      // Bottom: Instantaneous Heart Rate Proxy Curve
      const hrTop = divY + 14;
      const hrH = h - hrTop - 16;

      ctx.beginPath();
      for (let x = 0; x <= w; x += 4) {
        const t = x / w;
        const hrNorm =
          0.5 +
          0.26 * Math.sin(t * 9 - offset * 0.6) +
          0.12 * Math.cos(t * 17 + offset * 0.4);
        const y = hrTop + (1 - hrNorm) * hrH;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#C83E3B';
      ctx.lineWidth = 2.4;
      ctx.stroke();

      if (!reducedMotion && isVisible) {
        offset += 0.04;
        rafId = requestAnimationFrame(draw);
      }
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible, reducedMotion]);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-[#E4E1D8] bg-white p-4 shadow-[0_14px_38px_-24px_rgba(17,19,24,0.2)] sm:p-5"
    >
      <div className="mb-2 flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-wider text-[#6B7280]">
        <span className="text-[#0F766E]">TOP // SPEECH TIME–FREQUENCY SPECTROGRAM</span>
        <span className="text-[#C83E3B]">BOTTOM // HR CONFIDENCE PROXY (BPM)</span>
      </div>
      <div className="relative h-56 w-full overflow-hidden rounded-lg border border-[#ECE9E0] bg-[#FAF9F6] sm:h-64">
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          aria-label="Speech spectrogram paired with heart-rate proxy trajectory assessing spoken confidence"
        />
      </div>
    </div>
  );
};

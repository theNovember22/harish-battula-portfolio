import React, { useEffect, useRef } from 'react';
import { useActiveCanvas } from '../lib/useActiveCanvas';

function ecgBeat(localT: number): number {
  if (localT > 0.14 && localT < 0.23) {
    return -0.14 * Math.sin(((localT - 0.14) / 0.09) * Math.PI);
  }
  if (localT >= 0.31 && localT < 0.34) return 0.16;
  if (localT >= 0.34 && localT < 0.38) {
    return -1.0 * Math.sin(((localT - 0.34) / 0.04) * Math.PI);
  }
  if (localT >= 0.38 && localT < 0.42) {
    return 0.28 * Math.sin(((localT - 0.38) / 0.04) * Math.PI);
  }
  if (localT >= 0.53 && localT < 0.70) {
    return -0.22 * Math.sin(((localT - 0.53) / 0.17) * Math.PI);
  }
  return 0;
}

function speechWave(u: number, phase: number): number {
  const burst1 = Math.exp(-Math.pow((u - 0.16) / 0.09, 2));
  const burst2 = Math.exp(-Math.pow((u - 0.38) / 0.11, 2));
  const env = 0.25 + burst1 + burst2;
  const carrier =
    0.52 * Math.sin(u * 68 - phase * 2.2) +
    0.31 * Math.cos(u * 124 + phase * 1.5) +
    0.17 * Math.sin(u * 196 - phase * 3.1);
  return env * carrier * 0.65;
}

export const MorphWaveformCanvas: React.FC = () => {
  const { ref, isVisible, reducedMotion } = useActiveCanvas(0.05);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let phase = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // Subtle baseline
      const midY = h * 0.52;
      const amp = Math.min(h * 0.34, 120);

      ctx.strokeStyle = 'rgba(17, 19, 24, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(w, midY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw morphing signal in segmented gradient color from teal (speech) to crimson (heartbeat)
      const step = 2;
      const beatWidth = Math.max(115, w * 0.19);

      for (let x = 0; x < w; x += step) {
        const u = x / w;
        // Morph factor: 0 on left (speech), smooth S-curve in middle, 1 on right (ECG)
        const morph = Math.max(0, Math.min(1, (u - 0.28) / 0.36));
        const smoothMorph = morph * morph * (3 - 2 * morph);

        const sVal = speechWave(u, phase);
        const ecgPhase = ((x - phase * 26) % beatWidth + beatWidth) % beatWidth;
        const hVal = ecgBeat(ecgPhase / beatWidth);

        const yVal = (1 - smoothMorph) * sVal + smoothMorph * hVal;
        const y = midY + yVal * amp;

        if (x === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, '#0F766E');
      grad.addColorStop(0.45, '#0F766E');
      grad.addColorStop(0.68, '#C83E3B');
      grad.addColorStop(1, '#C83E3B');

      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.stroke();

      if (!reducedMotion && isVisible) {
        phase += 0.045;
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
      className="scientific-grid relative h-44 w-full overflow-hidden rounded-xl border border-[#E4E1D8] bg-white/85 sm:h-56 lg:h-64"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        aria-label="Live waveform morphing smoothly from an acoustic speech signal on the left into an electrocardiogram heartbeat on the right"
      />
      <div className="pointer-events-none absolute inset-x-0 top-2.5 flex items-center justify-between px-4 font-mono-tech text-[10px] tracking-wider">
        <span className="text-[#0F766E]">ACOUSTIC SPEECH</span>
        <span className="hidden text-[#6B7280] sm:inline">SOURCE SEPARATION → CARDIAC CORRELATE</span>
        <span className="text-[#C83E3B]">CARDIAC ECG PULSE</span>
      </div>
    </div>
  );
};

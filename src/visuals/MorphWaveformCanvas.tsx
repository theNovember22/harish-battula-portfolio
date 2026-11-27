import React, { useEffect, useRef, useState } from 'react';
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
  const env = 0.26 + burst1 + burst2;
  const carrier =
    0.52 * Math.sin(u * 68 - phase * 2.2) +
    0.31 * Math.cos(u * 124 + phase * 1.5) +
    0.17 * Math.sin(u * 196 - phase * 3.1);
  return env * carrier * 0.68;
}

export const MorphWaveformCanvas: React.FC = () => {
  const { ref, isVisible, reducedMotion } = useActiveCanvas(0.05);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetSplitRef = useRef(0.48);
  const currentSplitRef = useRef(0.48);
  const pointerActiveRef = useRef(false);
  const [readoutPct, setReadoutPct] = useState(48);

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

      // Spring ease morph boundary toward target
      currentSplitRef.current += (targetSplitRef.current - currentSplitRef.current) * 0.12;
      const splitU = currentSplitRef.current;

      const midY = h * 0.54;
      const amp = Math.min(h * 0.33, 118);

      // Baseline
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.18)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(w, midY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Interactive morph divider hairline
      const divX = splitU * w;
      ctx.strokeStyle = pointerActiveRef.current
        ? 'rgba(94, 234, 212, 0.42)'
        : 'rgba(148, 163, 184, 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(divX, 18);
      ctx.lineTo(divX, h - 12);
      ctx.stroke();

      // Main continuous speech -> ECG waveform
      const step = 2;
      const beatWidth = Math.max(115, w * 0.19);
      const span = 0.24;
      const morphStart = Math.max(0.05, splitU - span * 0.5);

      ctx.beginPath();
      for (let x = 0; x <= w; x += step) {
        const u = x / w;
        const morph = Math.max(0, Math.min(1, (u - morphStart) / span));
        const smoothMorph = morph * morph * (3 - 2 * morph);

        const sVal = speechWave(u, phase);
        const ecgPhase = (((x - phase * 26) % beatWidth) + beatWidth) % beatWidth;
        const hVal = ecgBeat(ecgPhase / beatWidth);

        const yVal = (1 - smoothMorph) * sVal + smoothMorph * hVal;
        const y = midY + yVal * amp;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, '#2DD4BF');
      grad.addColorStop(Math.max(0.08, Math.min(0.82, splitU - 0.08)), '#2DD4BF');
      grad.addColorStop(Math.max(0.18, Math.min(0.95, splitU + 0.12)), '#F05252');
      grad.addColorStop(1, '#F05252');

      // Soft phosphor halo pass
      ctx.save();
      ctx.strokeStyle = grad;
      ctx.globalAlpha = 0.26;
      ctx.lineWidth = 6.5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.stroke();
      ctx.restore();

      // Crisp core trace
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.stroke();

      // Glowing intersection node at the morph threshold
      const morphY =
        midY +
        (0.5 * speechWave(splitU, phase) +
          0.5 * ecgBeat((((divX - phase * 26) % beatWidth) + beatWidth) % beatWidth / beatWidth)) *
          amp;
      ctx.beginPath();
      ctx.arc(divX, morphY, pointerActiveRef.current ? 4.5 : 3.2, 0, Math.PI * 2);
      ctx.fillStyle = '#F8FAFC';
      ctx.fill();

      if (!reducedMotion && isVisible) {
        phase += 0.044;
        rafId = requestAnimationFrame(draw);
      }
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible, reducedMotion]);

  const updatePointer = (clientX: number, rect: DOMRect) => {
    const ratio = Math.max(0.14, Math.min(0.86, (clientX - rect.left) / rect.width));
    targetSplitRef.current = ratio;
    setReadoutPct(Math.round(ratio * 100));
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerActiveRef.current = true;
    updatePointer(e.clientX, e.currentTarget.getBoundingClientRect());
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerActiveRef.current = true;
    updatePointer(e.clientX, e.currentTarget.getBoundingClientRect());
  };

  const handlePointerLeave = () => {
    pointerActiveRef.current = false;
    targetSplitRef.current = 0.48;
    setReadoutPct(48);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      className="surface-instrument relative h-40 w-full touch-pan-y select-none overflow-hidden rounded-2xl shadow-[0_22px_50px_-24px_rgba(0,0,0,0.65)] sm:h-56 lg:h-64"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-ew-resize"
        aria-label="Interactive live waveform morphing smoothly from an acoustic speech signal on the left into an electrocardiogram heartbeat on the right"
      />
      <div className="pointer-events-none absolute inset-x-0 top-2.5 flex items-center justify-between px-4 font-mono-tech text-[10px] tracking-wider">
        <span className="inline-flex items-center gap-1.5 text-[#2DD4BF]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />
          ACOUSTIC SPEECH
        </span>
        <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[#94A3B8] sm:inline">
          SIGNAL MORPH • {readoutPct}%
        </span>
        <span className="inline-flex items-center gap-1.5 text-[#F05252]">
          CARDIAC ECG PULSE
          <span className="animate-cardiac h-1.5 w-1.5 rounded-full bg-[#F05252]" />
        </span>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-2 flex items-center justify-between px-4 font-mono-tech text-[9.5px] text-[#64748B]">
        <span>16 kHz MIC → ICA DECOMPOSITION</span>
        <span>EST. HR ~72 BPM</span>
      </div>
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useActiveCanvas } from '../lib/useActiveCanvas';

const LANDMARKS = [
  [110, 32], [140, 26], [170, 32], // brow
  [118, 52], [162, 52], // eyes
  [140, 74], // nose tip
  [120, 98], [140, 95], [160, 98], [140, 108], // lip contour
  [104, 72], [116, 114], [140, 124], [164, 114], [176, 72], // jaw contour
];

const LANDMARK_EDGES: [number, number][] = [
  [0, 1], [1, 2], [3, 5], [4, 5], [5, 7],
  [6, 7], [7, 8], [8, 9], [9, 6],
  [10, 11], [11, 12], [12, 13], [13, 14], [0, 10], [2, 14],
];

export const StethoscopeDysarthriaVisual: React.FC = () => {
  const { ref, isVisible, reducedMotion } = useActiveCanvas(0.2);
  const [mode, setMode] = useState<'pcg' | 'dysarthria'>('pcg');
  const [listening, setListening] = useState(false);
  const [lipDelta, setLipDelta] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const pcgPathRef = useRef<SVGPathElement | null>(null);
  const phaseRef = useRef(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (mode !== 'pcg') {
      setListening(false);
      return;
    }

    let rafId = 0;
    const period = 180;

    const renderPcg = () => {
      const phase = phaseRef.current;
      const shift = (phase / (Math.PI * 2)) * period;
      const pts: string[] = [];

      for (let x = 0; x <= 440; x += 2) {
        const local = ((x + shift) % period) / period;
        const s1 = Math.exp(-Math.pow((local - 0.2) / 0.036, 2));
        const murmur = 0.36 * Math.exp(-Math.pow((local - 0.37) / 0.072, 2));
        const s2 = 0.78 * Math.exp(-Math.pow((local - 0.56) / 0.032, 2));
        const osc = Math.sin(x * 0.75 + phase * 3);
        const y = 66 - (s1 * 50 + murmur * 38 + s2 * 44) * osc;
        pts.push(`${x === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`);
      }

      if (pcgPathRef.current) pcgPathRef.current.setAttribute('d', pts.join(' '));

      if (!reducedMotion && isVisible) {
        phaseRef.current = (phaseRef.current + 0.068) % (Math.PI * 2);
        rafId = requestAnimationFrame(renderPcg);
      }
    };

    renderPcg();
    return () => cancelAnimationFrame(rafId);
  }, [mode, isVisible, reducedMotion]);

  // Subtle articulatory jaw/lip cycle when in Dysarthria mode
  useEffect(() => {
    if (mode !== 'dysarthria' || reducedMotion || !isVisible) {
      setLipDelta(0);
      return;
    }
    let t = 0;
    const timer = window.setInterval(() => {
      t += 0.25;
      setLipDelta(Math.sin(t) * 2.6);
    }, 65);
    return () => window.clearInterval(timer);
  }, [mode, reducedMotion, isVisible]);

  // User-triggered synthesized S1 - systolic murmur - S2 audio cue
  useEffect(() => {
    if (!listening) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      return;
    }

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) {
      setListening(false);
      return;
    }

    const ctx = new AudioCtx();
    audioCtxRef.current = ctx;

    const playBeat = () => {
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      const now = ctx.currentTime;

      const triggerThump = (offset: number, freq: number, gainPeak: number, dur: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + offset);
        osc.frequency.exponentialRampToValueAtTime(Math.max(24, freq * 0.52), now + offset + dur);
        gain.gain.setValueAtTime(0.0001, now + offset);
        gain.gain.exponentialRampToValueAtTime(gainPeak, now + offset + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + dur + 0.02);
      };

      // S1 "lub" + soft murmur whoosh + S2 "dub"
      triggerThump(0.0, 74, 0.16, 0.11);
      triggerThump(0.16, 155, 0.028, 0.16);
      triggerThump(0.32, 88, 0.13, 0.09);
    };

    playBeat();
    const beatInterval = window.setInterval(playBeat, 860);
    const autoStop = window.setTimeout(() => setListening(false), 6200);

    return () => {
      window.clearInterval(beatInterval);
      window.clearTimeout(autoStop);
      ctx.close().catch(() => {});
      audioCtxRef.current = null;
    };
  }, [listening]);

  const handleFaceMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 5;
    setTilt({ x: nx, y: ny });
  };

  return (
    <div ref={ref} className="surface-card rounded-2xl p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-2.5">
        <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-signal)]">
          {mode === 'pcg'
            ? 'PCG AUSCULTATION • S1 / MURMUR / S2'
            : 'DYSARTHRIA & FACIAL ARTICULATORY MESH'}
        </span>

        <div className="flex items-center gap-2">
          {mode === 'pcg' && (
            <button
              type="button"
              onClick={() => setListening((v) => !v)}
              aria-pressed={listening}
              className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 font-mono-tech text-[10px] font-medium transition-colors ${
                listening
                  ? 'border-[var(--accent-data)] bg-[var(--accent-data-soft)] text-[var(--accent-data)]'
                  : 'border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--ink-secondary)] hover:border-[var(--accent-signal)] hover:text-[var(--accent-signal)]'
              }`}
            >
              {listening ? (
                <>
                  <VolumeX className="h-3 w-3" aria-hidden="true" />
                  Mute
                </>
              ) : (
                <>
                  <Volume2 className="h-3 w-3" aria-hidden="true" />
                  Listen
                </>
              )}
            </button>
          )}

          <div className="inline-flex rounded-md border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-0.5">
            <button
              type="button"
              onClick={() => setMode('pcg')}
              className={`rounded px-2.5 py-1 font-mono-tech text-[10px] font-medium transition-colors ${
                mode === 'pcg'
                  ? 'bg-[var(--accent-signal)] text-[var(--btn-primary-fg)]'
                  : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
              }`}
            >
              PCG / CAD
            </button>
            <button
              type="button"
              onClick={() => setMode('dysarthria')}
              className={`rounded px-2.5 py-1 font-mono-tech text-[10px] font-medium transition-colors ${
                mode === 'dysarthria'
                  ? 'bg-[var(--accent-data)] text-white'
                  : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
              }`}
            >
              Dysarthria / Landmarks
            </button>
          </div>
        </div>
      </div>

      {mode === 'pcg' ? (
        <div className="surface-instrument rounded-xl p-3">
          <svg
            viewBox="0 0 440 136"
            className="h-44 w-full"
            aria-label="Phonocardiogram waveform showing S1, systolic murmur band, and S2 heart sounds"
          >
            <rect x="135" y="14" width="60" height="108" rx="4" fill="rgba(240, 82, 82, 0.14)" />
            <text
              x="165"
              y="27"
              textAnchor="middle"
              className="fill-[#F05252] font-mono-tech text-[8.5px] font-semibold"
            >
              MURMUR BAND
            </text>
            <path
              ref={pcgPathRef}
              fill="none"
              stroke="#2DD4BF"
              strokeWidth="1.95"
              strokeLinecap="round"
            />
          </svg>
          <div className="mt-2 flex justify-between font-mono-tech text-[10px] text-[#94A3B8]">
            <span>NORMAL S1 / S2 TIMING</span>
            <span className="text-[#F05252]">
              {listening ? 'SYNTHESIZING S1–MURMUR–S2...' : 'CAD ACOUSTIC INDICATORS'}
            </span>
          </div>
        </div>
      ) : (
        <div
          onPointerMove={handleFaceMove}
          onPointerLeave={() => setTilt({ x: 0, y: 0 })}
          className="surface-instrument grid items-center gap-3 rounded-xl p-3 sm:grid-cols-2"
        >
          <svg
            viewBox="60 10 160 130"
            className="h-40 w-full"
            aria-label="Geometric facial landmark mesh for articulatory and emotion analysis"
          >
            {LANDMARK_EDGES.map(([a, b], i) => {
              const ax = LANDMARKS[a][0] + tilt.x;
              const ay =
                LANDMARKS[a][1] + tilt.y + (a === 9 || a === 12 ? Math.abs(lipDelta) : 0);
              const bx = LANDMARKS[b][0] + tilt.x;
              const by =
                LANDMARKS[b][1] + tilt.y + (b === 9 || b === 12 ? Math.abs(lipDelta) : 0);
              return (
                <line
                  key={i}
                  x1={ax}
                  y1={ay}
                  x2={bx}
                  y2={by}
                  stroke="#2DD4BF"
                  strokeOpacity="0.55"
                  strokeWidth="1.25"
                />
              );
            })}
            {LANDMARKS.map(([cx, cy], idx) => {
              const dy = idx === 9 || idx === 12 ? Math.abs(lipDelta) : 0;
              const isArticulatory = idx >= 6 && idx <= 9;
              return (
                <circle
                  key={idx}
                  cx={cx + tilt.x}
                  cy={cy + tilt.y + dy}
                  r={isArticulatory ? 3.4 : 2.5}
                  fill={isArticulatory ? '#F05252' : '#E2E8F0'}
                />
              );
            })}
          </svg>
          <div className="space-y-2 pr-1 font-mono-tech text-[11px]">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
              <div className="text-[10px] text-[#94A3B8]">DYSARTHRIA SEVERITY</div>
              <div className="mt-0.5 font-semibold text-[#F8FAFC]">
                Articulatory &amp; Acoustic Assessment
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
              <div className="text-[10px] text-[#94A3B8]">LANDMARK TRACKING</div>
              <div className="mt-0.5 font-semibold text-[#2DD4BF]">MediaPipe • OpenCV</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

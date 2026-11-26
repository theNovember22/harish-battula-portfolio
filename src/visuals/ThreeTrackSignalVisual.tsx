import React, { useEffect, useRef, useState } from 'react';
import { useActiveCanvas } from '../lib/useActiveCanvas';
import { useTheme } from '../lib/ThemeContext';

export const ThreeTrackSignalVisual: React.FC = () => {
  const { ref, isVisible, hasEntered, reducedMotion } = useActiveCanvas(0.2);
  const { theme } = useTheme();
  const [condition, setCondition] = useState<'rest' | 'exercise'>('rest');
  const [separation, setSeparation] = useState(85);
  const [count, setCount] = useState(0);

  const speechPathRef = useRef<SVGPathElement | null>(null);
  const ecgPathRef = useRef<SVGPathElement | null>(null);
  const ppgPathRef = useRef<SVGPathElement | null>(null);
  const phaseRef = useRef(0);

  useEffect(() => {
    if (!hasEntered) return;
    if (reducedMotion) {
      setCount(40);
      return;
    }
    let current = 0;
    const stepTimer = window.setInterval(() => {
      current += 2;
      if (current >= 40) {
        setCount(40);
        window.clearInterval(stepTimer);
      } else {
        setCount(current);
      }
    }, 26);
    return () => window.clearInterval(stepTimer);
  }, [hasEntered, reducedMotion]);

  useEffect(() => {
    let rafId = 0;
    const width = 520;
    const freqScale = condition === 'exercise' ? 1.68 : 1.0;
    const sepRatio = separation / 100;
    const mixNoise = 1 - sepRatio;

    const renderFrame = () => {
      const phase = phaseRef.current;
      const period = 130 / freqScale;
      const shift = (phase / (Math.PI * 2)) * period;

      const speechPts: string[] = [];
      const ecgPts: string[] = [];
      const ppgPts: string[] = [];

      for (let x = 0; x <= width; x += 2) {
        // Track 1: Mixed speech + clean breathing component based on ICA separation
        const breathEnv = Math.sin(x * 0.024 * freqScale + phase) * 8.5;
        const speechCarrier =
          Math.sin(x * 0.28 + phase * 2) *
          (4 + 9 * Math.exp(-Math.pow(((x % 160) - 80) / 36, 2)));
        const speechY = 23 + breathEnv * (0.4 + 0.55 * sepRatio) + speechCarrier * (0.32 + 0.72 * mixNoise);
        speechPts.push(`${x === 0 ? 'M' : 'L'} ${x} ${speechY.toFixed(1)}`);

        // Track 2: ECG
        const localEcg = ((x + shift) % period) / period;
        let ecgY = 26;
        if (localEcg > 0.16 && localEcg < 0.24) ecgY -= 3;
        else if (localEcg >= 0.34 && localEcg < 0.38) {
          ecgY -= 19 * Math.sin(((localEcg - 0.34) / 0.04) * Math.PI);
        } else if (localEcg >= 0.38 && localEcg < 0.42) ecgY += 6;
        else if (localEcg >= 0.54 && localEcg < 0.68) ecgY -= 4.5;
        ecgY += mixNoise * 2.8 * Math.sin(x * 0.42 + phase * 1.5);
        ecgPts.push(`${x === 0 ? 'M' : 'L'} ${x} ${ecgY.toFixed(1)}`);

        // Track 3: PPG
        const localPpg = (((x + shift - 14) % period) + period) % period / period;
        const sys = Math.exp(-Math.pow((localPpg - 0.26) / 0.1, 2));
        const dic = 0.42 * Math.exp(-Math.pow((localPpg - 0.5) / 0.11, 2));
        const ppgY = 34 - (sys + dic) * 21 + mixNoise * 2.2 * Math.cos(x * 0.31 - phase);
        ppgPts.push(`${x === 0 ? 'M' : 'L'} ${x} ${ppgY.toFixed(1)}`);
      }

      if (speechPathRef.current) speechPathRef.current.setAttribute('d', speechPts.join(' '));
      if (ecgPathRef.current) ecgPathRef.current.setAttribute('d', ecgPts.join(' '));
      if (ppgPathRef.current) ppgPathRef.current.setAttribute('d', ppgPts.join(' '));

      if (!reducedMotion && isVisible) {
        phaseRef.current = (phaseRef.current + (condition === 'exercise' ? 0.095 : 0.048)) % (Math.PI * 2);
        rafId = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();
    return () => cancelAnimationFrame(rafId);
  }, [isVisible, reducedMotion, condition, separation]);

  const isDark = theme === 'dark';
  const speechColor = isDark ? '#2DD4BF' : '#0F766E';
  const ecgColor = isDark ? '#F05252' : '#C83E3B';
  const ppgColor = isDark ? '#E2E8F0' : '#111318';

  return (
    <div ref={ref} className="surface-card rounded-2xl p-4 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
        <div>
          <span className="font-mono-tech text-[11px] font-semibold text-[var(--accent-signal)]">
            SYNCHRONIZED 3-TRACK ACQUISITION • {count}+ PARTICIPANTS
          </span>
        </div>

        <div className="inline-flex rounded-md border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-0.5">
          <button
            type="button"
            onClick={() => setCondition('rest')}
            className={`rounded px-2.5 py-1 font-mono-tech text-[11px] font-medium transition-colors ${
              condition === 'rest'
                ? 'bg-[var(--accent-signal)] text-[var(--btn-primary-fg)]'
                : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
            }`}
          >
            Resting
          </button>
          <button
            type="button"
            onClick={() => setCondition('exercise')}
            className={`rounded px-2.5 py-1 font-mono-tech text-[11px] font-medium transition-colors ${
              condition === 'exercise'
                ? 'bg-[var(--accent-data)] text-white'
                : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
            }`}
          >
            Heavy Exercise
          </button>
        </div>
      </div>

      {/* Interactive ICA Decomposition Control */}
      <div className="mb-3 flex select-none flex-col gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between gap-2 font-mono-tech text-[10px]">
          <span className="font-semibold uppercase tracking-wider text-[var(--ink-secondary)]">
            ICA Source Separation
          </span>
          <span className="font-semibold text-[var(--accent-signal)]">{separation}% CLEAN</span>
        </div>
        <div className="flex items-center gap-2 sm:w-56">
          <span className="font-mono-tech text-[9px] text-[var(--ink-muted)]">MIXED</span>
          <input
            type="range"
            min={0}
            max={100}
            value={separation}
            onChange={(e) => setSeparation(Number(e.target.value))}
            aria-label="ICA source separation clarity"
            className="signal-slider w-full"
          />
          <span className="font-mono-tech text-[9px] text-[var(--accent-signal)]">ICA</span>
        </div>
      </div>

      <div className="space-y-2.5">
        {[
          {
            label: '01 / READ SPEECH + ICA BREATHING',
            refProp: speechPathRef,
            color: speechColor,
            tag: separation > 60 ? 'RESP. EXTRACTED' : 'ACOUSTIC MIXED',
          },
          {
            label: '02 / CLINICAL ECG REFERENCE',
            refProp: ecgPathRef,
            color: ecgColor,
            tag: condition === 'exercise' ? '~132 BPM' : '~68 BPM',
          },
          {
            label: '03 / OPTICAL PPG PULSE',
            refProp: ppgPathRef,
            color: ppgColor,
            tag: condition === 'exercise' ? 'ELEVATED CADENCE' : 'BASELINE CADENCE',
          },
        ].map((track) => (
          <div
            key={track.label}
            className="scientific-grid rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-3 py-2"
          >
            <div className="mb-1 flex items-center justify-between font-mono-tech text-[10px] text-[var(--ink-muted)]">
              <span>{track.label}</span>
              <span style={{ color: track.color }} className="font-medium">
                {track.tag}
              </span>
            </div>
            <svg viewBox="0 0 520 44" className="h-10 w-full" aria-hidden="true">
              <path
                ref={track.refProp}
                fill="none"
                stroke={track.color}
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

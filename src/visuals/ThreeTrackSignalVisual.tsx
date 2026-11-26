import React, { useEffect, useMemo, useState } from 'react';
import { useActiveCanvas } from '../lib/useActiveCanvas';

export const ThreeTrackSignalVisual: React.FC = () => {
  const { ref, isVisible, hasEntered, reducedMotion } = useActiveCanvas(0.2);
  const [condition, setCondition] = useState<'rest' | 'exercise'>('rest');
  const [phase, setPhase] = useState(0);
  const [count, setCount] = useState(0);

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
    }, 28);
    return () => window.clearInterval(stepTimer);
  }, [hasEntered, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !isVisible) return;
    const timer = window.setInterval(() => {
      setPhase((p) => (p + (condition === 'exercise' ? 0.22 : 0.11)) % (Math.PI * 2));
    }, 50);
    return () => window.clearInterval(timer);
  }, [isVisible, reducedMotion, condition]);

  const tracks = useMemo(() => {
    const width = 520;
    const freqScale = condition === 'exercise' ? 1.65 : 1.0;

    // Track 1: Speech + breathing envelope
    const speechPts: string[] = [];
    const ecgPts: string[] = [];
    const ppgPts: string[] = [];

    const period = 130 / freqScale;
    const shift = (phase / (Math.PI * 2)) * period;

    for (let x = 0; x <= width; x += 2) {
      // Speech + breathing modulation
      const breathEnv = Math.sin(x * 0.024 * freqScale + phase) * 8;
      const speechOsc =
        Math.sin(x * 0.28 + phase * 2) *
        (6 + 9 * Math.exp(-Math.pow(((x % 160) - 80) / 38, 2)));
      speechPts.push(`${x === 0 ? 'M' : 'L'} ${x} ${(24 + breathEnv * 0.45 + speechOsc * 0.7).toFixed(1)}`);

      // ECG
      const localEcg = ((x + shift) % period) / period;
      let ecgY = 26;
      if (localEcg > 0.16 && localEcg < 0.24) ecgY -= 3;
      else if (localEcg >= 0.34 && localEcg < 0.38) ecgY -= 19 * Math.sin(((localEcg - 0.34) / 0.04) * Math.PI);
      else if (localEcg >= 0.38 && localEcg < 0.42) ecgY += 6;
      else if (localEcg >= 0.54 && localEcg < 0.68) ecgY -= 4.5;
      ecgPts.push(`${x === 0 ? 'M' : 'L'} ${x} ${ecgY.toFixed(1)}`);

      // PPG
      const localPpg = ((x + shift - 14) % period + period) % period / period;
      const sys = Math.exp(-Math.pow((localPpg - 0.26) / 0.1, 2));
      const dic = 0.42 * Math.exp(-Math.pow((localPpg - 0.5) / 0.11, 2));
      ppgPts.push(`${x === 0 ? 'M' : 'L'} ${x} ${(34 - (sys + dic) * 21).toFixed(1)}`);
    }

    return {
      speech: speechPts.join(' '),
      ecg: ecgPts.join(' '),
      ppg: ppgPts.join(' '),
    };
  }, [phase, condition]);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-[#E4E1D8] bg-white p-4 shadow-[0_14px_38px_-24px_rgba(17,19,24,0.2)] sm:p-6"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#EFECE4] pb-3">
        <div>
          <span className="font-mono-tech text-[11px] font-semibold text-[#0F766E]">
            SYNCHRONIZED 3-TRACK ACQUISITION • {count}+ PARTICIPANTS
          </span>
        </div>

        <div className="inline-flex rounded-md border border-[#E4E1D8] bg-[#FAF9F6] p-0.5">
          <button
            type="button"
            onClick={() => setCondition('rest')}
            className={`rounded px-2.5 py-1 font-mono-tech text-[11px] font-medium transition-colors ${
              condition === 'rest'
                ? 'bg-[#0F766E] text-white'
                : 'text-[#434956] hover:text-[#111318]'
            }`}
          >
            Resting
          </button>
          <button
            type="button"
            onClick={() => setCondition('exercise')}
            className={`rounded px-2.5 py-1 font-mono-tech text-[11px] font-medium transition-colors ${
              condition === 'exercise'
                ? 'bg-[#C83E3B] text-white'
                : 'text-[#434956] hover:text-[#111318]'
            }`}
          >
            Heavy Exercise
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { label: '01 / READ SPEECH + ICA BREATHING', path: tracks.speech, color: '#0F766E' },
          { label: '02 / CLINICAL ECG REFERENCE', path: tracks.ecg, color: '#C83E3B' },
          { label: '03 / OPTICAL PPG PULSE', path: tracks.ppg, color: '#111318' },
        ].map((track) => (
          <div
            key={track.label}
            className="scientific-grid rounded-lg border border-[#ECE9E0] bg-[#FAF9F6]/70 px-3 py-2"
          >
            <div className="mb-1 flex items-center justify-between font-mono-tech text-[10px] text-[#6B7280]">
              <span>{track.label}</span>
              <span style={{ color: track.color }}>
                {condition === 'exercise' ? 'ELEVATED CADENCE' : 'BASELINE CADENCE'}
              </span>
            </div>
            <svg viewBox="0 0 520 44" className="h-10 w-full" aria-hidden="true">
              <path
                d={track.path}
                fill="none"
                stroke={track.color}
                strokeWidth="1.8"
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

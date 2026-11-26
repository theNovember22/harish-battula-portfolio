import React, { useEffect, useMemo, useState } from 'react';
import { Activity, ArrowUpRight, Pause, Play } from 'lucide-react';
import { RESEARCH_SIGNALS, SignalId } from '../data/signals';
import { PROFILE } from '../data/profile';

const SIGNAL_ORDER: SignalId[] = ['speech', 'ecg', 'ppg', 'pcg'];

function generateSignalPoints(signalId: SignalId, phase: number): string {
  const width = 620;
  const baseline = 92;
  const pts: string[] = [];

  for (let x = 0; x <= width; x += 2) {
    let y = baseline;
    const t = x / width;

    if (signalId === 'speech') {
      // Modulated speech burst with glottal + prosodic envelope
      const burst1 = Math.exp(-Math.pow((t - 0.25) / 0.12, 2));
      const burst2 = Math.exp(-Math.pow((t - 0.62) / 0.16, 2));
      const burst3 = 0.65 * Math.exp(-Math.pow((t - 0.87) / 0.08, 2));
      const env = burst1 + burst2 + burst3;
      const carrier =
        0.55 * Math.sin(x * 0.24 + phase * 2.1) +
        0.3 * Math.cos(x * 0.51 - phase * 1.3) +
        0.18 * Math.sin(x * 0.89 + phase);
      y = baseline - env * 58 * carrier;
    } else if (signalId === 'ecg') {
      // Realistic P-QRS-T cardiac waveform
      const period = 155;
      const shift = (phase / (Math.PI * 2)) * period;
      const local = ((x + shift) % period) / period;
      let offset = 0;
      if (local > 0.14 && local < 0.23) {
        offset = -9 * Math.sin(((local - 0.14) / 0.09) * Math.PI); // P wave
      } else if (local >= 0.30 && local < 0.33) {
        offset = 10; // Q dip
      } else if (local >= 0.33 && local < 0.37) {
        offset = -68 * Math.sin(((local - 0.33) / 0.04) * Math.PI); // R peak
      } else if (local >= 0.37 && local < 0.41) {
        offset = 18 * Math.sin(((local - 0.37) / 0.04) * Math.PI); // S dip
      } else if (local >= 0.52 && local < 0.69) {
        offset = -16 * Math.sin(((local - 0.52) / 0.17) * Math.PI); // T wave
      }
      y = baseline + 10 + offset;
    } else if (signalId === 'ppg') {
      // Optical pulse wave: steep systolic rise + dicrotic notch + diastolic decay
      const period = 155;
      const shift = (phase / (Math.PI * 2)) * period;
      const local = ((x + shift) % period) / period;
      const systolic = Math.exp(-Math.pow((local - 0.25) / 0.09, 2));
      const dicrotic = 0.44 * Math.exp(-Math.pow((local - 0.48) / 0.11, 2));
      const baseWave = systolic + dicrotic;
      y = baseline + 24 - baseWave * 66;
    } else if (signalId === 'pcg') {
      // Heart sound S1 (lub) + murmur envelope + S2 (dub)
      const period = 190;
      const shift = (phase / (Math.PI * 2)) * period;
      const local = ((x + shift) % period) / period;
      const s1Env = Math.exp(-Math.pow((local - 0.20) / 0.038, 2));
      const murmurEnv = 0.28 * Math.exp(-Math.pow((local - 0.36) / 0.075, 2));
      const s2Env = 0.78 * Math.exp(-Math.pow((local - 0.56) / 0.032, 2));
      const osc = Math.sin(x * 0.72 + phase * 3.2) * 0.7 + Math.cos(x * 1.15 - phase) * 0.3;
      y = baseline - (s1Env * 60 + murmurEnv * 45 + s2Env * 54) * osc;
    }

    pts.push(`${x === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`);
  }

  return pts.join(' ');
}

export const SignalLab: React.FC = () => {
  const [selected, setSelected] = useState<SignalId>('speech');
  const [playing, setPlaying] = useState(true);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !playing) return;

    const timer = window.setInterval(() => {
      setPhase((p) => (p + 0.16) % (Math.PI * 2));
    }, 55);

    return () => window.clearInterval(timer);
  }, [playing]);

  const spec = RESEARCH_SIGNALS[selected];
  const pathData = useMemo(() => generateSignalPoints(selected, phase), [selected, phase]);

  return (
    <div className="rounded-xl border border-[#E3E0D6] bg-white p-5 shadow-[0_14px_40px_-24px_rgba(17,19,24,0.18)] sm:p-7">
      {/* Top Switcher Bar */}
      <div className="flex flex-col gap-4 border-b border-[#EFECE4] pb-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Biomedical signal modality switcher">
          {SIGNAL_ORDER.map((id) => {
            const item = RESEARCH_SIGNALS[id];
            const isActive = id === selected;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelected(id)}
                className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-mono-tech text-xs font-semibold tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
                  isActive
                    ? 'border-[#111318] bg-[#111318] text-white shadow-sm'
                    : 'border-[#E3E0D6] bg-[#FAF9F6] text-[#434956] hover:border-[#0F766E] hover:text-[#111318]'
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.accentColor }}
                  aria-hidden="true"
                />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex items-center gap-1.5 rounded-md border border-[#E3E0D6] bg-[#FAF9F6] px-3 py-1.5 font-mono-tech text-xs font-medium text-[#111318] transition-colors hover:border-[#0F766E] hover:text-[#0F766E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
          >
            {playing ? (
              <>
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                Pause Trace
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
                Resume Trace
              </>
            )}
          </button>

          <a
            href={PROFILE.links.signalExplorer}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono-tech text-xs font-medium text-[#0F766E] hover:underline"
          >
            Open Live Signal Explorer
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Left: Oscilloscope / Waveform Viewport */}
        <div className="lg:col-span-7">
          <div className="rounded-lg border border-[#E3E0D6] bg-[#FAF9F6] p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#0F766E]" aria-hidden="true" />
                <span className="font-mono-tech text-xs font-semibold text-[#111318]">
                  {spec.fullName}
                </span>
              </div>
              <span className="font-mono-tech text-[11px] text-[#6B7280]">
                {spec.sampleRateLabel}
              </span>
            </div>

            <div className="scientific-grid-bg relative overflow-hidden rounded-md border border-[#E6E3DA] bg-white">
              <svg
                viewBox="0 0 620 184"
                className="h-44 w-full sm:h-52"
                role="img"
                aria-label={`Stylized ${spec.fullName} waveform visualization`}
              >
                {/* Zero baseline */}
                <line
                  x1="0"
                  y1="92"
                  x2="620"
                  y2="92"
                  stroke="#D1D5DB"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                {/* Waveform trace */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={spec.accentColor}
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="flex items-center justify-between border-t border-[#EFECE4] bg-[#FAF9F6] px-3 py-1.5 font-mono-tech text-[10px] text-[#6B7280]">
                <span>Y: {spec.unit}</span>
                <span>STYLIZED SCIENTIFIC TRACE • TIME →</span>
              </div>
            </div>

            {/* Signal Annotations */}
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {spec.annotations.map((ann) => (
                <div
                  key={ann.label}
                  className="rounded-md border border-[#EAE7DF] bg-white px-3 py-2"
                >
                  <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[#6B7280]">
                    {ann.label}
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-[#111318]">
                    {ann.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Scientific Breakdown */}
        <div className="flex flex-col justify-between gap-4 lg:col-span-5">
          <div className="space-y-4">
            <div>
              <div className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0F766E]">
                What the Signal Represents
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-[#434956]">
                {spec.represents}
              </p>
            </div>

            <div>
              <div className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0F766E]">
                How Harish Worked With It
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-[#434956]">
                {spec.howHarishWorked}
              </p>
            </div>

            <div>
              <div className="font-mono-tech text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
                Methods &amp; Tooling
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {spec.methods.map((m) => (
                  <span
                    key={m}
                    className="rounded-md border border-[#E3E0D6] bg-[#FAF9F6] px-2.5 py-1 font-mono-tech text-[11px] text-[#111318]"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#0F766E]/25 bg-[#0F766E]/5 p-3.5">
            <div className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0F766E]">
              Related Research Case Study
            </div>
            <a
              href={`#${spec.relatedProjectId}`}
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-[#111318] hover:text-[#0F766E]"
            >
              {spec.relatedProject}
              <ArrowUpRight className="h-4 w-4 shrink-0 text-[#0F766E]" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

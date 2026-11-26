import React from 'react';
import { useActiveCanvas } from '../lib/useActiveCanvas';

interface ShapItem {
  feature: string;
  weight: number;
  positive: boolean;
}

export const ShapSignalVisual: React.FC<{ features: ShapItem[] }> = ({ features }) => {
  const { ref, hasEntered } = useActiveCanvas(0.2);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-[#E4E1D8] bg-white p-4 shadow-[0_14px_38px_-24px_rgba(17,19,24,0.2)] sm:p-5"
    >
      <div className="mb-3 flex items-center justify-between border-b border-[#EFECE4] pb-2.5 font-mono-tech text-[10px] uppercase tracking-wider">
        <span className="font-semibold text-[#0F766E]">SHAP / LIME PHYSIOLOGICAL ATTRIBUTION</span>
        <span className="text-[#6B7280]">FEATURE IMPACT</span>
      </div>

      {/* Reference Signal with Highlighted Attribution Windows */}
      <div className="scientific-grid mb-4 rounded-lg border border-[#ECE9E0] bg-[#FAF9F6] p-2.5">
        <svg viewBox="0 0 420 66" className="h-16 w-full" aria-label="Signal trace with shaded SHAP physiological attribution windows">
          <rect x="64" y="6" width="52" height="54" rx="3" fill="rgba(200, 62, 59, 0.14)" />
          <rect x="206" y="6" width="62" height="54" rx="3" fill="rgba(15, 118, 110, 0.14)" />
          <path
            d="M 8 36 L 56 36 L 68 36 L 78 12 L 88 56 L 98 22 L 108 36 L 190 36 L 214 22 L 236 48 L 258 24 L 278 36 L 340 36 L 350 14 L 360 54 L 370 28 L 380 36 L 412 36"
            fill="none"
            stroke="#111318"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* SHAP Bar Chart */}
      <div className="space-y-2.5">
        {features.map((item, idx) => {
          const widthPct = Math.round(Math.abs(item.weight) * 190);
          return (
            <div key={item.feature} className="space-y-1">
              <div className="flex items-center justify-between font-mono-tech text-[11px]">
                <span className="text-[#111318]">{item.feature}</span>
                <span className={item.positive ? 'text-[#C83E3B]' : 'text-[#0F766E]'}>
                  {item.positive ? `+${item.weight.toFixed(2)}` : item.weight.toFixed(2)}
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#F2EFE8]">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: hasEntered ? `${widthPct}%` : '0%',
                    transitionDelay: `${idx * 70}ms`,
                    backgroundColor: item.positive ? '#C83E3B' : '#0F766E',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

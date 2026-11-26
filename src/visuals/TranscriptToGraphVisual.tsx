import React, { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useActiveCanvas } from '../lib/useActiveCanvas';

const NODES = [
  { id: 0, label: 'Well', x: 54, y: 52 },
  { id: 1, label: 'boy', x: 138, y: 34 },
  { id: 2, label: 'reaching', x: 230, y: 54 },
  { id: 3, label: 'jar', x: 312, y: 38 },
  { id: 4, label: 'and', x: 110, y: 118 },
  { id: 5, label: 'stool', x: 204, y: 126 },
  { id: 6, label: 'tilting', x: 298, y: 112 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [1, 4],
  [4, 5],
  [2, 5],
  [5, 6],
  [3, 6],
];

export const TranscriptToGraphVisual: React.FC<{ tokens: string[]; accuracyLabel: string }> = ({
  tokens,
  accuracyLabel,
}) => {
  const { ref, hasEntered, reducedMotion } = useActiveCanvas(0.2);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!hasEntered) return;
    if (reducedMotion) {
      setVisibleCount(NODES.length + EDGES.length);
      return;
    }
    setVisibleCount(0);
    let step = 0;
    const total = NODES.length + EDGES.length;
    const timer = window.setInterval(() => {
      step += 1;
      setVisibleCount(step);
      if (step >= total) window.clearInterval(timer);
    }, 150);
    return () => window.clearInterval(timer);
  }, [hasEntered, reducedMotion]);

  const replay = () => {
    if (reducedMotion) return;
    setVisibleCount(0);
    let step = 0;
    const total = NODES.length + EDGES.length;
    const timer = window.setInterval(() => {
      step += 1;
      setVisibleCount(step);
      if (step >= total) window.clearInterval(timer);
    }, 140);
  };

  const activeEdges = Math.max(0, visibleCount - NODES.length);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-[#E4E1D8] bg-white p-4 shadow-[0_14px_38px_-24px_rgba(17,19,24,0.2)] sm:p-5"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#EFECE4] pb-2.5">
        <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[#0F766E]">
          ASR → TRANSCRIPT → GRAPH → GNN ({accuracyLabel})
        </span>
        <button
          type="button"
          onClick={replay}
          className="inline-flex items-center gap-1 rounded border border-[#E4E1D8] bg-[#FAF9F6] px-2 py-0.5 font-mono-tech text-[10px] text-[#434956] hover:border-[#0F766E] hover:text-[#0F766E]"
        >
          <RotateCcw className="h-3 w-3" aria-hidden="true" />
          Replay
        </button>
      </div>

      {/* Transcript Ribbon */}
      <div className="mb-3 flex flex-wrap gap-1.5 rounded-lg border border-[#ECE9E0] bg-[#FAF9F6] p-2.5">
        <span className="mr-1 font-mono-tech text-[10px] font-semibold text-[#6B7280]">
          ASR:
        </span>
        {tokens.map((tok, i) => (
          <span
            key={`${tok}-${i}`}
            className={`rounded px-1.5 py-0.5 font-mono-tech text-[11px] transition-colors ${
              i < visibleCount
                ? 'bg-[#0F766E]/12 text-[#0F766E] font-medium'
                : 'text-[#6B7280]'
            }`}
          >
            {tok}
          </span>
        ))}
      </div>

      {/* Animated Graph SVG */}
      <div className="scientific-grid rounded-lg border border-[#ECE9E0] bg-[#FAF9F6]/60 p-2">
        <svg
          viewBox="0 0 365 162"
          className="h-44 w-full sm:h-48"
          role="img"
          aria-label="Transcript tokens assembling node-by-node into a Graph Neural Network representation"
        >
          {EDGES.map(([a, b], idx) => {
            const shown = idx < activeEdges;
            return (
              <line
                key={idx}
                x1={NODES[a].x}
                y1={NODES[a].y}
                x2={NODES[b].x}
                y2={NODES[b].y}
                stroke={idx % 3 === 0 ? '#C83E3B' : '#0F766E'}
                strokeOpacity={shown ? 0.65 : 0}
                strokeWidth="1.6"
                style={{ transition: 'stroke-opacity 240ms ease' }}
              />
            );
          })}

          {NODES.map((node, idx) => {
            const shown = idx < visibleCount;
            return (
              <g
                key={node.id}
                style={{
                  opacity: shown ? 1 : 0.12,
                  transition: 'opacity 240ms ease',
                }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="16"
                  fill="#FFFFFF"
                  stroke={idx === 2 || idx === 5 ? '#C83E3B' : '#0F766E'}
                  strokeWidth="1.8"
                />
                <text
                  x={node.x}
                  y={node.y + 3.5}
                  textAnchor="middle"
                  className="fill-[#111318] font-mono-tech text-[9.5px] font-medium"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

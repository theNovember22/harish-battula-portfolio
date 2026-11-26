import React, { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { useActiveCanvas } from '../lib/useActiveCanvas';

const NODES = [
  { id: 0, label: 'Well', x: 52, y: 50, w: 46 },
  { id: 1, label: 'boy', x: 136, y: 34, w: 44 },
  { id: 2, label: 'reaching', x: 234, y: 52, w: 66 },
  { id: 3, label: 'jar', x: 326, y: 36, w: 42 },
  { id: 4, label: 'and', x: 108, y: 120, w: 46 },
  { id: 5, label: 'stool', x: 204, y: 126, w: 52 },
  { id: 6, label: 'tilting', x: 310, y: 114, w: 58 },
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
  const [pinnedNodeId, setPinnedNodeId] = useState<number | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);
  const [accDisplay, setAccDisplay] = useState(reducedMotion ? 91 : 0);

  const selectedNodeId = pinnedNodeId ?? hoveredNodeId;

  useEffect(() => {
    if (!hasEntered) return;
    if (reducedMotion) {
      setVisibleCount(NODES.length + EDGES.length);
      setAccDisplay(91);
      return;
    }
    setVisibleCount(0);
    let step = 0;
    const total = NODES.length + EDGES.length;
    const timer = window.setInterval(() => {
      step += 1;
      setVisibleCount(step);
      setAccDisplay(Math.min(91, Math.round((step / total) * 91)));
      if (step >= total) window.clearInterval(timer);
    }, 135);
    return () => window.clearInterval(timer);
  }, [hasEntered, reducedMotion]);

  const replay = () => {
    if (reducedMotion) return;
    setPinnedNodeId(null);
    setHoveredNodeId(null);
    setVisibleCount(0);
    setAccDisplay(0);
    let step = 0;
    const total = NODES.length + EDGES.length;
    const timer = window.setInterval(() => {
      step += 1;
      setVisibleCount(step);
      setAccDisplay(Math.min(91, Math.round((step / total) * 91)));
      if (step >= total) window.clearInterval(timer);
    }, 125);
  };

  const activeEdges = Math.max(0, visibleCount - NODES.length);
  const selectedLabel = selectedNodeId !== null ? NODES[selectedNodeId]?.label : null;

  const neighborLabels =
    selectedNodeId !== null
      ? EDGES.flatMap(([a, b]) =>
          a === selectedNodeId
            ? [NODES[b].label]
            : b === selectedNodeId
            ? [NODES[a].label]
            : []
        )
      : [];

  const isNeighbor = (nodeId: number) => {
    if (selectedNodeId === null) return false;
    if (selectedNodeId === nodeId) return true;
    return EDGES.some(
      ([a, b]) =>
        (a === selectedNodeId && b === nodeId) || (b === selectedNodeId && a === nodeId)
    );
  };

  return (
    <div ref={ref} className="surface-card rounded-2xl p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-signal)]">
            ASR → TRANSCRIPT → GRAPH → GNN
          </span>
          <span className="rounded-full border border-[var(--accent-signal-ring)] bg-[var(--accent-signal-soft)] px-2 py-0.5 font-mono-tech text-[10px] font-semibold text-[var(--accent-signal)]">
            ~{accDisplay}% {accuracyLabel.replace(/^~?\d+%\s*/, '')}
          </span>
        </div>
        <button
          type="button"
          onClick={replay}
          className="inline-flex items-center gap-1 rounded border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-2 py-0.5 font-mono-tech text-[10px] text-[var(--ink-secondary)] transition-colors hover:border-[var(--accent-signal)] hover:text-[var(--accent-signal)]"
        >
          <RotateCcw className="h-3 w-3" aria-hidden="true" />
          Replay
        </button>
      </div>

      {/* Transcript Ribbon — cross-highlights when probing nodes */}
      <div className="mb-3 flex flex-wrap items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] p-2.5">
        <span className="mr-1 font-mono-tech text-[10px] font-semibold text-[var(--ink-muted)]">
          ASR:
        </span>
        {tokens.map((tok, i) => {
          const isMatched =
            selectedLabel !== null && tok.toLowerCase() === selectedLabel.toLowerCase();
          return (
            <span
              key={`${tok}-${i}`}
              className={`rounded px-1.5 py-0.5 font-mono-tech text-[11px] transition-all ${
                isMatched
                  ? 'scale-105 bg-[var(--accent-data)] font-semibold text-white'
                  : i < visibleCount
                  ? 'bg-[var(--accent-signal-soft)] font-medium text-[var(--accent-signal)]'
                  : 'text-[var(--ink-muted)]'
              }`}
            >
              {tok}
            </span>
          );
        })}
      </div>

      {/* Animated Obsidian Graph Chamber */}
      <div className="surface-instrument rounded-xl p-2.5">
        <div className="mb-1 flex flex-wrap items-center justify-between gap-2 px-1 font-mono-tech text-[9.5px] text-[#94A3B8]">
          <span>
            {selectedLabel
              ? `1-HOP ATTENTION: "${selectedLabel.toUpperCase()}" → [${neighborLabels.join(', ')}]`
              : 'TAP OR HOVER ANY NODE TO PROBE GNN NEIGHBORHOOD'}
          </span>
          {pinnedNodeId !== null && (
            <button
              type="button"
              onClick={() => {
                setPinnedNodeId(null);
                setHoveredNodeId(null);
              }}
              className="text-[#2DD4BF] hover:underline"
            >
              Clear focus
            </button>
          )}
        </div>
        <svg
          viewBox="0 0 385 166"
          className="h-44 w-full sm:h-48"
          role="img"
          aria-label="Transcript tokens assembling node-by-node into a Graph Neural Network representation"
        >
          {EDGES.map(([a, b], idx) => {
            const shown = idx < activeEdges;
            const connectedToSelected =
              selectedNodeId !== null && (a === selectedNodeId || b === selectedNodeId);
            const dimmed = selectedNodeId !== null && !connectedToSelected;
            return (
              <line
                key={idx}
                x1={NODES[a].x}
                y1={NODES[a].y}
                x2={NODES[b].x}
                y2={NODES[b].y}
                stroke={connectedToSelected || idx % 3 === 0 ? '#F05252' : '#2DD4BF'}
                strokeOpacity={shown ? (dimmed ? 0.16 : connectedToSelected ? 0.95 : 0.6) : 0}
                strokeWidth={connectedToSelected ? 2.4 : 1.5}
                style={{ transition: 'stroke-opacity 220ms ease, stroke-width 200ms ease' }}
              />
            );
          })}

          {NODES.map((node, idx) => {
            const shown = idx < visibleCount;
            const isFocused = selectedNodeId === node.id;
            const neighbor = isNeighbor(node.id);
            const dimmed = selectedNodeId !== null && !neighbor;
            const rectX = node.x - node.w / 2;
            const rectY = node.y - 14;
            return (
              <g
                key={node.id}
                onClick={() => setPinnedNodeId((prev) => (prev === node.id ? null : node.id))}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId((prev) => (prev === node.id ? null : prev))}
                className="cursor-pointer"
                style={{
                  opacity: shown ? (dimmed ? 0.3 : 1) : 0.14,
                  transition: 'opacity 220ms ease',
                }}
              >
                {isFocused && (
                  <rect
                    x={rectX - 4}
                    y={rectY - 4}
                    width={node.w + 8}
                    height={36}
                    rx="18"
                    fill="none"
                    stroke="#F05252"
                    strokeOpacity="0.45"
                    strokeWidth="1.5"
                  />
                )}
                <rect
                  x={rectX}
                  y={rectY}
                  width={node.w}
                  height={28}
                  rx="14"
                  fill={isFocused ? '#1A2430' : '#0B1117'}
                  stroke={isFocused || idx === 2 || idx === 5 ? '#F05252' : '#2DD4BF'}
                  strokeWidth={isFocused ? 2.2 : 1.6}
                />
                <text
                  x={node.x}
                  y={node.y + 3.5}
                  textAnchor="middle"
                  className="fill-[#F1F5F9] font-mono-tech text-[9.5px] font-medium"
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

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILL_CONSTELLATION } from '../data/profile.js';

const HUB_COORDS: Record<string, { x: number; y: number }> = {
  signals: { x: 84, y: 42 },
  'graph-speech': { x: 256, y: 42 },
  'vision-xai': { x: 84, y: 148 },
  'core-ml': { x: 256, y: 148 },
};

export const SkillConstellation: React.FC = () => {
  const [pinnedId, setPinnedId] = useState<string>(SKILL_CONSTELLATION[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeId = hoveredId ?? pinnedId;
  const activeCluster =
    SKILL_CONSTELLATION.find((c) => c.id === activeId) ?? SKILL_CONSTELLATION[0];

  return (
    <div className="surface-card rounded-2xl p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
        <div>
          <span className="font-mono-tech text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-signal)] sm:text-[11px]">
            Interactive Capability Constellation
          </span>
          <h3 className="font-serif-display mt-0.5 text-lg font-medium text-[var(--ink-primary)] sm:text-2xl">
            How tools connect across signals, models &amp; deployment
          </h3>
        </div>
      </div>

      {/* Desktop Constellation SVG + Orbital Stack Readout */}
      <div className="hidden items-center gap-6 md:grid md:grid-cols-12">
        <div className="surface-instrument rounded-xl p-3 md:col-span-5">
          <svg
            viewBox="0 0 340 190"
            className="h-48 w-full"
            role="img"
            aria-label="Interactive skill constellation connecting AI/ML core to 4 capability domains"
          >
            {/* Radial edges */}
            {SKILL_CONSTELLATION.map((cluster) => {
              const pos = HUB_COORDS[cluster.id];
              const isSelected = cluster.id === activeId;
              return (
                <line
                  key={`edge-${cluster.id}`}
                  x1="170"
                  y1="95"
                  x2={pos.x}
                  y2={pos.y}
                  stroke={isSelected ? '#2DD4BF' : '#64748B'}
                  strokeOpacity={isSelected ? 0.95 : 0.35}
                  strokeWidth={isSelected ? 2.2 : 1.2}
                  style={{ transition: 'all 220ms ease' }}
                />
              );
            })}

            {/* Center Hub Node */}
            <circle cx="170" cy="95" r="26" fill="#0B1117" stroke="#F05252" strokeWidth="1.8" />
            <text
              x="170"
              y="93"
              textAnchor="middle"
              className="fill-[#F8FAFC] font-mono-tech text-[8.5px] font-semibold"
            >
              AI / ML
            </text>
            <text
              x="170"
              y="104"
              textAnchor="middle"
              className="fill-[#94A3B8] font-mono-tech text-[7.5px]"
            >
              CORE
            </text>

            {/* Domain Hub Nodes */}
            {SKILL_CONSTELLATION.map((cluster) => {
              const pos = HUB_COORDS[cluster.id];
              const isSelected = cluster.id === activeId;
              const short =
                cluster.id === 'signals'
                  ? 'Signals'
                  : cluster.id === 'graph-speech'
                  ? 'Speech & GNN'
                  : cluster.id === 'vision-xai'
                  ? 'Vision & XAI'
                  : 'Core Stack';
              return (
                <g
                  key={cluster.id}
                  onMouseEnter={() => setHoveredId(cluster.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setPinnedId(cluster.id)}
                  className="cursor-pointer"
                >
                  <rect
                    x={pos.x - 46}
                    y={pos.y - 16}
                    width="92"
                    height="32"
                    rx="16"
                    fill={isSelected ? '#162431' : '#0B1117'}
                    stroke={isSelected ? '#2DD4BF' : '#475569'}
                    strokeWidth={isSelected ? 2 : 1.3}
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 3.5}
                    textAnchor="middle"
                    fill={isSelected ? '#2DD4BF' : '#E2E8F0'}
                    className="font-mono-tech text-[9px] font-semibold"
                  >
                    {short}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="md:col-span-7">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {SKILL_CONSTELLATION.map((cluster) => {
              const isSelected = cluster.id === activeId;
              return (
                <button
                  key={cluster.id}
                  type="button"
                  onClick={() => setPinnedId(cluster.id)}
                  className="relative rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3 py-1 font-mono-tech text-[11px] font-medium transition-colors"
                >
                  {isSelected && (
                    <motion.span
                      layoutId="skill-hub-pill-desktop"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="pointer-events-none absolute inset-0 rounded-full bg-[var(--accent-signal)]"
                    />
                  )}
                  <span
                    className={`pointer-events-none relative z-10 ${
                      isSelected ? 'font-semibold text-[var(--btn-primary-fg)]' : 'text-[var(--ink-secondary)]'
                    }`}
                  >
                    {cluster.label}
                  </span>
                </button>
              );
            })}
          </div>

          <motion.div
            key={activeCluster.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-4"
          >
            <p className="text-xs leading-relaxed text-[var(--ink-secondary)]">
              {activeCluster.summary}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {activeCluster.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-[var(--accent-signal-ring)] bg-[var(--bg-paper)] px-2.5 py-1 font-mono-tech text-xs font-medium text-[var(--ink-primary)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Touch-First Cluster Orbit Pills */}
      <div className="space-y-3 md:hidden">
        <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
          {SKILL_CONSTELLATION.map((cluster) => {
            const isSelected = cluster.id === pinnedId;
            return (
              <button
                key={cluster.id}
                type="button"
                onClick={() => setPinnedId(cluster.id)}
                className="relative shrink-0 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-3 py-1.5 font-mono-tech text-[11px] font-medium"
              >
                {isSelected && (
                  <motion.span
                    layoutId="skill-hub-pill-mobile"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="pointer-events-none absolute inset-0 rounded-full bg-[var(--accent-signal)]"
                  />
                )}
                <span
                  className={`pointer-events-none relative z-10 ${
                    isSelected ? 'font-semibold text-[var(--btn-primary-fg)]' : 'text-[var(--ink-secondary)]'
                  }`}
                >
                  {cluster.label}
                </span>
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeCluster.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-3.5"
        >
          <p className="text-xs leading-relaxed text-[var(--ink-secondary)]">
            {activeCluster.summary}
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {activeCluster.items.map((item) => (
              <span
                key={item}
                className="rounded-md border border-[var(--accent-signal-ring)] bg-[var(--bg-paper)] px-2.5 py-1 font-mono-tech text-[11px] font-medium text-[var(--ink-primary)]"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

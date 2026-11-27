import React, { useEffect, useRef } from 'react';

/**
 * Provides:
 * 1) Subtle optical backdrop refraction orbs behind frosted Liquid Glass panels
 * 2) Tight, bright rAF-smoothed cursor spotlight (--cursor-x / --cursor-y)
 * 3) Tight per-card specular surface & beveled edge catchlight (--card-mx / --card-my)
 */
export const CursorLightField: React.FC = () => {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reduced.matches) return;

    const root = document.documentElement;
    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.35;
    let curX = targetX;
    let curY = targetY;
    let rafId = 0;
    let activeCard: HTMLElement | null = null;
    let visible = false;

    const animate = () => {
      curX += (targetX - curX) * 0.22;
      curY += (targetY - curY) * 0.22;
      root.style.setProperty('--cursor-x', `${curX.toFixed(1)}px`);
      root.style.setProperty('--cursor-y', `${curY.toFixed(1)}px`);

      if (Math.abs(targetX - curX) > 0.25 || Math.abs(targetY - curY) > 0.25) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = 0;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      targetX = e.clientX;
      targetY = e.clientY;

      if (!visible && glowRef.current) {
        visible = true;
        glowRef.current.style.opacity = '1';
      }
      if (!rafId) rafId = requestAnimationFrame(animate);

      const card = (e.target as HTMLElement | null)?.closest('.surface-card') as HTMLElement | null;
      if (activeCard && activeCard !== card) {
        activeCard.style.removeProperty('--card-mx');
        activeCard.style.removeProperty('--card-my');
      }
      activeCard = card;
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--card-mx', `${(e.clientX - rect.left).toFixed(1)}px`);
        card.style.setProperty('--card-my', `${(e.clientY - rect.top).toFixed(1)}px`);
      }
    };

    const onPointerLeave = () => {
      if (glowRef.current) glowRef.current.style.opacity = '0';
      visible = false;
      if (activeCard) {
        activeCard.style.removeProperty('--card-mx');
        activeCard.style.removeProperty('--card-my');
        activeCard = null;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
      if (activeCard) {
        activeCard.style.removeProperty('--card-mx');
        activeCard.style.removeProperty('--card-my');
      }
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Optical ambient shapes drifting slowly behind frosted glass so blur/refraction reads clearly */}
      <div className="liquid-orb liquid-orb-1" />
      <div className="liquid-orb liquid-orb-2" />
      <div className="liquid-orb liquid-orb-3" />

      {/* Tight, bright cursor-following light cone */}
      <div
        ref={glowRef}
        className="cursor-light-field absolute inset-0 opacity-0 transition-opacity duration-200"
      />
    </div>
  );
};

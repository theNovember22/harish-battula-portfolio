import React, { useEffect, useRef } from 'react';

/**
 * Global smooth cursor spotlight + per-card Liquid Glass specular sheen.
 * Runs exclusively via CSS variables + rAF on fine-pointer desktop devices
 * (0 React re-renders, disabled on touch & prefers-reduced-motion).
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
      curX += (targetX - curX) * 0.16;
      curY += (targetY - curY) * 0.16;
      root.style.setProperty('--cursor-x', `${curX.toFixed(1)}px`);
      root.style.setProperty('--cursor-y', `${curY.toFixed(1)}px`);

      if (Math.abs(targetX - curX) > 0.3 || Math.abs(targetY - curY) > 0.3) {
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
    <div
      ref={glowRef}
      aria-hidden="true"
      className="cursor-light-field pointer-events-none fixed inset-0 z-0 opacity-0 transition-opacity duration-300"
    />
  );
};

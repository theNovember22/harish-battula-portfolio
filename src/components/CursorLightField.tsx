import React, { useEffect } from 'react';

/**
 * Provides:
 * 1) Drifting chromatic refraction orbs behind frosted Liquid Glass panels
 * 2) Edge-only pointer focus coordinates (--card-mx / --card-my) on hovered .surface-card elements
 */
export const CursorLightField: React.FC = () => {
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reduced.matches) return;

    let activeCard: HTMLElement | null = null;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
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
      if (activeCard) {
        activeCard.style.removeProperty('--card-mx');
        activeCard.style.removeProperty('--card-my');
      }
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="liquid-orb liquid-orb-1" />
      <div className="liquid-orb liquid-orb-2" />
      <div className="liquid-orb liquid-orb-3" />
    </div>
  );
};

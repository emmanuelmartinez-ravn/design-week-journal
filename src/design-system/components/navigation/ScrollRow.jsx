import React from 'react';

/* ============================================================
   Vello ScrollRow — horizontally scrollable row with affordance.
   • Soft right-edge gradient fade signalling "more beyond the edge".
   • Left fade appears once the user has scrolled.
   • Scroll-snap for tidy stops.
   To get the ~30% PEEK of the next item, size the children so a
   little over one item is visible (e.g. min-width: 72% on mobile,
   or fixed-width cards in a container ~1.3 cards wide). The fade
   colour must match the surface behind the row — set it with the
   `fade` prop (default = app paper).
   ============================================================ */

const SCROLLROW_CSS = `
.vl-scrollrow { position: relative; --_fade: var(--color-bg); --_fadew: 56px; }
.vl-scrollrow__track {
  display: flex; gap: 12px; overflow-x: auto; overflow-y: hidden;
  scroll-snap-type: x proximity; scroll-behavior: smooth;
  padding: 4px 16px 14px; margin: -4px 0 0;
  scrollbar-width: none; -webkit-overflow-scrolling: touch;
}
.vl-scrollrow__track::-webkit-scrollbar { display: none; }
.vl-scrollrow__track > * { scroll-snap-align: start; flex: none; }
.vl-scrollrow__fade {
  position: absolute; top: 0; bottom: 0; width: var(--_fadew);
  pointer-events: none; z-index: 2; opacity: 0;
  transition: opacity var(--dur-base) var(--ease-standard);
}
.vl-scrollrow__fade--r { right: 0; background: linear-gradient(to left, var(--_fade) 18%, transparent); }
.vl-scrollrow__fade--l { left: 0;  background: linear-gradient(to right, var(--_fade) 18%, transparent); }
.vl-scrollrow[data-more-right="true"] .vl-scrollrow__fade--r { opacity: 1; }
.vl-scrollrow[data-more-left="true"]  .vl-scrollrow__fade--l { opacity: 1; }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello ScrollRow — horizontally scrollable row with edge-fade affordance. */
export function ScrollRow({ children, fade, gap, className = '', style = {}, ...rest }) {
  inject('vl-scrollrow-css', SCROLLROW_CSS);
  const rootRef = React.useRef(null);
  const trackRef = React.useRef(null);

  const update = React.useCallback(() => {
    const root = rootRef.current, t = trackRef.current;
    if (!root || !t) return;
    const max = t.scrollWidth - t.clientWidth;
    root.setAttribute('data-more-left', String(t.scrollLeft > 2));
    root.setAttribute('data-more-right', String(t.scrollLeft < max - 2));
  }, []);

  React.useEffect(() => {
    update();
    const t = trackRef.current;
    if (!t) return;
    t.addEventListener('scroll', update, { passive: true });
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
    ro && ro.observe(t);
    window.addEventListener('resize', update);
    return () => {
      t.removeEventListener('scroll', update);
      ro && ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [update, children]);

  const rootStyle = { ...style };
  if (fade) rootStyle['--_fade'] = fade;
  const trackStyle = gap != null ? { gap } : undefined;

  return (
    <div ref={rootRef} className={['vl-scrollrow', className].filter(Boolean).join(' ')} style={rootStyle} {...rest}>
      <div className="vl-scrollrow__fade vl-scrollrow__fade--l" aria-hidden="true" />
      <div ref={trackRef} className="vl-scrollrow__track" style={trackStyle}>{children}</div>
      <div className="vl-scrollrow__fade vl-scrollrow__fade--r" aria-hidden="true" />
    </div>
  );
}

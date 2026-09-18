import React from 'react';

const CARD_CSS = `
.vl-card {
  background: var(--surface-card);
  border: 1.5px solid var(--border-default);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.vl-card--pad-sm { padding: 14px; }
.vl-card--pad-md { padding: 20px; }
.vl-card--pad-lg { padding: 28px; }
.vl-card--pad-none { padding: 0; }
.vl-card--flat { box-shadow: none; }
.vl-card--raised { box-shadow: var(--shadow-md); border-color: transparent; }
.vl-card--floating { box-shadow: var(--shadow-lg); border-color: transparent; }
.vl-card--interactive { cursor: pointer; transition: transform var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard); }
.vl-card--interactive:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
.vl-card--interactive:active { transform: translateY(0); }

/* Tappable affordance — subtle chevron, top-right of the content area */
.vl-card--tappable { position: relative; }
.vl-card__tap {
  position: absolute; top: 14px; right: 14px; z-index: 1;
  width: 26px; height: 26px; border-radius: var(--radius-pill);
  display: grid; place-items: center; flex: none;
  color: var(--text-subtle); background: var(--surface-sunken);
  transition: color var(--dur-fast) var(--ease-standard),
              background var(--dur-fast) var(--ease-standard),
              transform var(--dur-fast) var(--ease-standard);
}
.vl-card__tap svg { width: 15px; height: 15px; stroke-width: 2.4; }
.vl-card--interactive:hover .vl-card__tap { color: var(--text-brand); background: var(--brand-primary-tint); transform: translateX(1px); }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello Card — base surface container. */
export function Card({ elevation = 'flat', padding = 'md', interactive = false, tappable = false, as = 'div', className = '', children, ...rest }) {
  inject('vl-card-css', CARD_CSS);
  const Tag = as;
  const cls = ['vl-card', `vl-card--${elevation}`, `vl-card--pad-${padding}`,
    interactive ? 'vl-card--interactive' : '', tappable ? 'vl-card--tappable' : '', className].filter(Boolean).join(' ');
  return (
    <Tag className={cls} {...rest}>
      {tappable ? <span className="vl-card__tap" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg></span> : null}
      {children}
    </Tag>
  );
}

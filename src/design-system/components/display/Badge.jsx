import React from 'react';

const BADGE_CSS = `
.vl-badge {
  display: inline-flex; align-items: center; gap: 5px;
  font-family: var(--font-sans); font-weight: var(--fw-semibold);
  border-radius: var(--radius-pill); white-space: nowrap; line-height: 1;
}
.vl-badge--sm { font-size: 11px; padding: 4px 9px; }
.vl-badge--md { font-size: 13px; padding: 6px 12px; }
.vl-badge__dot { width: 7px; height: 7px; border-radius: 999px; background: currentColor; }
.vl-badge svg { width: 1em; height: 1em; }
.vl-badge--neutral { background: var(--surface-sunken); color: var(--text-muted); }
.vl-badge--brand   { background: var(--brand-primary-tint); color: var(--text-brand); }
.vl-badge--success { background: var(--success-tint); color: var(--green-700); }
.vl-badge--info    { background: var(--info-tint); color: var(--sky-700); }
.vl-badge--warning { background: var(--warning-tint); color: var(--amber-700); }
.vl-badge--danger  { background: var(--danger-tint); color: var(--red-700); }
.vl-badge--accent  { background: var(--accent-tint); color: var(--coral-700); }
.vl-badge--solid   { background: var(--brand-primary); color: #fff; }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello Badge — compact status / metadata pill. */
export function Badge({ variant = 'neutral', size = 'md', dot = false, icon = null, className = '', children }) {
  inject('vl-badge-css', BADGE_CSS);
  const cls = ['vl-badge', `vl-badge--${variant}`, `vl-badge--${size}`, className].filter(Boolean).join(' ');
  return (
    <span className={cls}>
      {dot ? <span className="vl-badge__dot" /> : null}
      {icon}
      {children}
    </span>
  );
}

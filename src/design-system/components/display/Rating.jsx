import React from 'react';

const RATING_CSS = `
.vl-rating { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-sans); }
.vl-rating__stars { display: inline-flex; gap: 1px; color: var(--rating); }
.vl-rating__stars svg { width: 1em; height: 1em; }
.vl-rating--sm { font-size: 14px; }
.vl-rating--md { font-size: 18px; }
.vl-rating--lg { font-size: 22px; }
.vl-rating__star-bg { color: var(--ink-200); }
.vl-rating__value { font-family: var(--font-mono); font-weight: var(--fw-semibold); color: var(--text-strong); font-variant-numeric: tabular-nums; }
.vl-rating__count { color: var(--text-muted); font-size: 0.82em; }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

const Star = ({ fill }) => (
  <svg viewBox="0 0 24 24" fill={fill} stroke="none">
    <path d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 18.9 6.1 21.3l1.3-6.6L2.5 9.5l6.6-.8L12 2.5z" />
  </svg>
);

/** Vello star Rating — amber stars with optional numeric value and review count. */
export function Rating({ value = 0, max = 5, size = 'md', showValue = true, count, starsOnly = false, className = '' }) {
  inject('vl-rating-css', RATING_CSS);
  const rounded = Math.round(value);
  return (
    <span className={['vl-rating', `vl-rating--${size}`, className].filter(Boolean).join(' ')}>
      <span className="vl-rating__stars" aria-label={`${value} out of ${max} stars`}>
        {Array.from({ length: max }).map((_, i) => (
          <span key={i} className={i < rounded ? '' : 'vl-rating__star-bg'}><Star fill="currentColor" /></span>
        ))}
      </span>
      {!starsOnly && showValue ? <span className="vl-rating__value">{value.toFixed(1)}</span> : null}
      {!starsOnly && count != null ? <span className="vl-rating__count">({count})</span> : null}
    </span>
  );
}

import React from 'react';

/* ============================================================
   Vello VerifiedBadge — accessible trust mark.
   Pairs COLOR with distinct SHAPE so the status is legible to
   colorblind users (never color alone):
     verified    → olive SHIELD + cream check
     pending     → amber dashed CIRCLE + clock
     top-rated   → amber STAR/seal
     unverified  → neutral hollow CIRCLE
   Every mark carries a contrasting (paper) outline so it reads
   on top of any avatar photo.
   ============================================================ */

const VBADGE_CSS = `
.vl-vbadge {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-sans); font-weight: var(--fw-semibold);
  border-radius: var(--radius-pill); white-space: nowrap; line-height: 1;
}
.vl-vbadge--sm { font-size: 12px; padding: 5px 11px 5px 8px; }
.vl-vbadge--md { font-size: 13px; padding: 6px 13px 6px 9px; }
.vl-vbadge--verified   { background: var(--success-tint); color: var(--green-700); }
.vl-vbadge--pending    { background: var(--warning-tint); color: var(--amber-700); }
.vl-vbadge--top-rated  { background: var(--amber-100);    color: var(--amber-700); }
.vl-vbadge--unverified { background: var(--surface-sunken); color: var(--text-muted); }
.vl-vbadge__mark { flex: none; display: block; }
.vl-vmark { display: block; }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

const LABELS = {
  verified: 'Background-checked',
  pending: 'Verification pending',
  'top-rated': 'Top-rated neighbor',
  unverified: 'Not yet verified',
};

/**
 * VerifiedMark — the bare shape glyph (no label). Used standalone, as the
 * leading glyph in VerifiedBadge, and as the corner badge on Avatar.
 * `outline` draws a paper-colored rim so it reads on photos.
 */
export function VerifiedMark({ status = 'verified', size = 16, outline = true, title, className = '' }) {
  inject('vl-vbadge-css', VBADGE_CSS);
  const rim = outline ? 'var(--surface-card)' : 'none';
  const rimW = outline ? 2.4 : 0;
  const cls = ['vl-vmark', className].filter(Boolean).join(' ');
  const common = {
    className: cls, width: size, height: size, viewBox: '0 0 24 24',
    role: 'img', 'aria-label': title || LABELS[status] || status,
  };

  if (status === 'verified') {
    return (
      <svg {...common}>
        {title ? <title>{title}</title> : null}
        <path d="M12 2.2 4.6 5v6.1c0 4.6 3.1 7.9 7.4 9.6 4.3-1.7 7.4-5 7.4-9.6V5L12 2.2Z"
          fill="var(--green-600)" stroke={rim} strokeWidth={rimW} strokeLinejoin="round" />
        <path d="m8.4 12 2.5 2.5 4.7-5" fill="none" stroke="var(--paper)" strokeWidth="2.1"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === 'top-rated') {
    return (
      <svg {...common}>
        {title ? <title>{title}</title> : null}
        <path d="M12 2.4 14.7 8l6.1.9-4.4 4.3 1 6.1L12 16.4 6.6 19.3l1-6.1L3.2 8.9 9.3 8 12 2.4Z"
          fill="var(--amber-500)" stroke={rim} strokeWidth={rimW} strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === 'pending') {
    return (
      <svg {...common}>
        {title ? <title>{title}</title> : null}
        <circle cx="12" cy="12" r="9.2" fill="var(--white)" stroke={rim} strokeWidth={rimW} />
        <circle cx="12" cy="12" r="8" fill="none" stroke="var(--amber-600)" strokeWidth="1.8"
          strokeDasharray="2.6 2.4" strokeLinecap="round" />
        <path d="M12 7.6V12l3 1.8" fill="none" stroke="var(--amber-700)" strokeWidth="1.9"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  /* unverified */
  return (
    <svg {...common}>
      {title ? <title>{title}</title> : null}
      <circle cx="12" cy="12" r="9.2" fill="var(--white)" stroke={rim} strokeWidth={rimW} />
      <circle cx="12" cy="12" r="8" fill="none" stroke="var(--ink-300)" strokeWidth="1.8"
        strokeDasharray="2.4 2.6" strokeLinecap="round" />
      <path d="M9 12h6" fill="none" stroke="var(--ink-400)" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

/**
 * VerifiedBadge — labeled trust pill: shape mark + readable text.
 * Use beside a name in lists, profiles, and confirmations.
 */
export function VerifiedBadge({ status = 'verified', size = 'md', label, markOnly = false, className = '' }) {
  inject('vl-vbadge-css', VBADGE_CSS);
  const text = label != null ? label : LABELS[status] || status;
  const markPx = size === 'sm' ? 15 : 17;
  if (markOnly) return <VerifiedMark status={status} size={markPx} title={text} className={className} />;
  const cls = ['vl-vbadge', `vl-vbadge--${status}`, `vl-vbadge--${size}`, className].filter(Boolean).join(' ');
  return (
    <span className={cls}>
      <VerifiedMark status={status} size={markPx} outline={false} title={text} className="vl-vbadge__mark" />
      {text}
    </span>
  );
}

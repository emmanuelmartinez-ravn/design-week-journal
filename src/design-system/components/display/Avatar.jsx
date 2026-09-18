import React from 'react';
import { VerifiedMark } from './VerifiedBadge.jsx';

const AVATAR_CSS = `
.vl-avatar { position: relative; display: inline-flex; flex: none; }
.vl-avatar__img, .vl-avatar__fallback {
  border-radius: 999px; object-fit: cover; display: grid; place-items: center;
  background: var(--green-200); color: var(--green-800);
  font-family: var(--font-display); font-weight: var(--fw-bold);
  box-shadow: inset 0 0 0 2px rgba(255,255,255,0.9);
}
.vl-avatar--xs .vl-avatar__img, .vl-avatar--xs .vl-avatar__fallback { width: 28px; height: 28px; font-size: 11px; }
.vl-avatar--sm .vl-avatar__img, .vl-avatar--sm .vl-avatar__fallback { width: 36px; height: 36px; font-size: 14px; }
.vl-avatar--md .vl-avatar__img, .vl-avatar--md .vl-avatar__fallback { width: 48px; height: 48px; font-size: 18px; }
.vl-avatar--lg .vl-avatar__img, .vl-avatar--lg .vl-avatar__fallback { width: 64px; height: 64px; font-size: 24px; }
.vl-avatar--xl .vl-avatar__img, .vl-avatar--xl .vl-avatar__fallback { width: 88px; height: 88px; font-size: 32px; }
.vl-avatar__badge {
  position: absolute; right: -3px; bottom: -3px;
  display: block; line-height: 0;
  filter: drop-shadow(0 1px 1.5px rgba(25,28,25,0.18));
}
.vl-avatar__badge svg { display: block; }
.vl-avatar--xs .vl-avatar__badge svg { width: 13px; height: 13px; }
.vl-avatar--sm .vl-avatar__badge svg { width: 16px; height: 16px; }
.vl-avatar--md .vl-avatar__badge svg { width: 20px; height: 20px; }
.vl-avatar--lg .vl-avatar__badge svg { width: 25px; height: 25px; }
.vl-avatar--xl .vl-avatar__badge svg { width: 32px; height: 32px; }
.vl-avatar__status {
  position: absolute; right: 0; bottom: 0; border-radius: 999px;
  background: var(--green-500); box-shadow: 0 0 0 2.5px var(--surface-card);
  width: 30%; height: 30%; min-width: 9px; min-height: 9px;
}
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
}

/**
 * Vello Avatar — provider / neighbor photo with an optional accessible trust
 * mark or status dot. The trust mark pairs shape + color (never color alone).
 */
export function Avatar({ src, name = '', size = 'md', badge, verified = false, online = false, className = '' }) {
  inject('vl-avatar-css', AVATAR_CSS);
  // Back-compat: `verified` boolean maps to badge="verified".
  const status = badge || (verified ? 'verified' : null);
  const cls = ['vl-avatar', `vl-avatar--${size}`, className].filter(Boolean).join(' ');
  return (
    <span className={cls}>
      {src
        ? <img className="vl-avatar__img" src={src} alt={name} />
        : <span className="vl-avatar__fallback" aria-label={name}>{initials(name)}</span>}
      {status ? (
        <span className="vl-avatar__badge"><VerifiedMark status={status} /></span>
      ) : online ? <span className="vl-avatar__status" /> : null}
    </span>
  );
}

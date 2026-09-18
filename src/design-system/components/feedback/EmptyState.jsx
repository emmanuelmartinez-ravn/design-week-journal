import React from 'react';
import { Button } from '../buttons/Button.jsx';

/* ============================================================
   Vello EmptyState — friendly, on-voice empty / zero-data view.
   Icon medallion + headline + supporting copy + primary action.
   Tones: brand (olive wash) · accent (persimmon) · neutral.
   ============================================================ */

const EMPTY_CSS = `
.vl-empty {
  display: flex; flex-direction: column; align-items: center; text-align: center;
  gap: 6px; padding: 32px 24px; max-width: 360px; margin-inline: auto;
}
.vl-empty--compact { padding: 22px 18px; }
.vl-empty__art {
  position: relative; width: 88px; height: 88px; border-radius: var(--radius-pill);
  display: grid; place-items: center; margin-bottom: 10px;
  background:
    radial-gradient(120% 120% at 50% 18%, var(--_wash) 0%, transparent 72%),
    var(--_disc);
  box-shadow: inset 0 0 0 1.5px var(--_ring);
}
.vl-empty--compact .vl-empty__art { width: 68px; height: 68px; }
.vl-empty__art svg { width: 36px; height: 36px; stroke-width: 2; color: var(--_icon); }
.vl-empty--compact .vl-empty__art svg { width: 28px; height: 28px; }
.vl-empty--brand   { --_wash: var(--green-200);  --_disc: var(--green-50);  --_ring: var(--green-200);  --_icon: var(--green-700); }
.vl-empty--accent  { --_wash: var(--coral-100);  --_disc: var(--coral-50);  --_ring: var(--coral-300);  --_icon: var(--coral-700); }
.vl-empty--neutral { --_wash: var(--ink-100);    --_disc: var(--surface-sunken); --_ring: var(--border-default); --_icon: var(--ink-500); }
.vl-empty__title {
  font-family: var(--font-display); font-weight: var(--fw-bold);
  font-size: var(--text-lg); line-height: var(--lh-snug);
  letter-spacing: var(--ls-snug); color: var(--text-strong); text-wrap: balance;
}
.vl-empty__body { font-size: var(--text-sm); line-height: var(--lh-normal); color: var(--text-muted); text-wrap: pretty; }
.vl-empty__actions { display: flex; flex-direction: column; align-items: center; gap: 8px; margin-top: 14px; width: 100%; }
.vl-empty__secondary {
  background: none; border: none; cursor: pointer; padding: 6px 8px;
  font-family: var(--font-sans); font-weight: var(--fw-semibold); font-size: var(--text-sm);
  color: var(--text-brand);
}
.vl-empty__secondary:hover { text-decoration: underline; }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello EmptyState — zero-data, no-results, or first-use prompt. */
export function EmptyState({
  icon, title, body, tone = 'brand', compact = false,
  actionLabel, onAction, actionVariant = 'primary',
  secondaryLabel, onSecondary, className = '', children,
}) {
  inject('vl-empty-css', EMPTY_CSS);
  const cls = ['vl-empty', `vl-empty--${tone}`, compact ? 'vl-empty--compact' : '', className].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      {icon ? <div className="vl-empty__art">{icon}</div> : null}
      {title ? <div className="vl-empty__title">{title}</div> : null}
      {body ? <p className="vl-empty__body">{body}</p> : null}
      {children}
      {(actionLabel || secondaryLabel) ? (
        <div className="vl-empty__actions">
          {actionLabel ? <Button variant={actionVariant} size="md" onClick={onAction}>{actionLabel}</Button> : null}
          {secondaryLabel ? <button type="button" className="vl-empty__secondary" onClick={onSecondary}>{secondaryLabel}</button> : null}
        </div>
      ) : null}
    </div>
  );
}

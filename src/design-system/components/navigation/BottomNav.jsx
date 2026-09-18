import React from 'react';

const BOTTOMNAV_CSS = `
.vl-bottomnav {
  display: flex; align-items: stretch; justify-content: space-around;
  background: var(--surface-card);
  border-top: 1.5px solid var(--border-default);
  padding: 8px 8px calc(8px + env(safe-area-inset-bottom, 0px));
}
.vl-navitem {
  appearance: none; background: none; border: none; cursor: pointer;
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  flex: 1; padding: 4px 0; color: var(--text-muted);
  font-family: var(--font-sans); font-size: 11px; font-weight: var(--fw-semibold);
  transition: color var(--dur-fast) var(--ease-standard);
  position: relative;
}
.vl-navitem svg { width: 24px; height: 24px; stroke-width: 2; }
.vl-navitem:hover { color: var(--text-body); }
.vl-navitem--active { color: var(--text-brand); }
.vl-navitem--active svg { stroke-width: 2.4; }
.vl-navitem__badge {
  position: absolute; top: 0; left: 50%; margin-left: 6px;
  min-width: 16px; height: 16px; padding: 0 4px; border-radius: 999px;
  background: var(--accent); color: #fff; font-size: 10px; font-weight: var(--fw-bold);
  display: grid; place-items: center; line-height: 1;
}
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello BottomNav — mobile tab bar with icons. */
export function BottomNav({ items = [], value, onChange, className = '' }) {
  inject('vl-bottomnav-css', BOTTOMNAV_CSS);
  return (
    <nav className={['vl-bottomnav', className].filter(Boolean).join(' ')}>
      {items.map((it) => {
        const id = it.id ?? it.label;
        const active = id === value;
        return (
          <button key={id} className={['vl-navitem', active ? 'vl-navitem--active' : ''].join(' ')}
            aria-current={active ? 'page' : undefined} onClick={() => onChange && onChange(id)}>
            {it.badge != null ? <span className="vl-navitem__badge">{it.badge}</span> : null}
            {it.icon}
            <span>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

import React from 'react';

const TABS_CSS = `
.vl-tabs { display: inline-flex; gap: 4px; border-bottom: 1.5px solid var(--border-default); }
.vl-tabs--fill { display: flex; }
.vl-tab {
  appearance: none; background: none; border: none; cursor: pointer;
  font-family: var(--font-sans); font-weight: var(--fw-semibold); font-size: var(--text-base);
  color: var(--text-muted); padding: 12px 14px; position: relative;
  display: inline-flex; align-items: center; gap: 7px; flex: 1; justify-content: center;
  transition: color var(--dur-fast) var(--ease-standard);
}
.vl-tab svg { width: 17px; height: 17px; }
.vl-tab:hover { color: var(--text-body); }
.vl-tab--active { color: var(--text-brand); }
.vl-tab--active::after {
  content: ''; position: absolute; left: 10px; right: 10px; bottom: -1.5px; height: 3px;
  background: var(--brand-primary); border-radius: 3px 3px 0 0;
}
.vl-tab__count { font-family: var(--font-mono); font-size: 11px; background: var(--surface-sunken); color: var(--text-muted); border-radius: 999px; padding: 1px 7px; }
.vl-tab--active .vl-tab__count { background: var(--brand-primary-tint); color: var(--text-brand); }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello Tabs — underline tab bar for switching views. */
export function Tabs({ items = [], value, onChange, fill = false, className = '' }) {
  inject('vl-tabs-css', TABS_CSS);
  return (
    <div className={['vl-tabs', fill ? 'vl-tabs--fill' : '', className].filter(Boolean).join(' ')} role="tablist">
      {items.map((it) => {
        const id = it.id ?? it.label;
        const active = id === value;
        return (
          <button key={id} role="tab" aria-selected={active}
            className={['vl-tab', active ? 'vl-tab--active' : ''].join(' ')}
            onClick={() => onChange && onChange(id)}>
            {it.icon}
            {it.label}
            {it.count != null ? <span className="vl-tab__count">{it.count}</span> : null}
          </button>
        );
      })}
    </div>
  );
}

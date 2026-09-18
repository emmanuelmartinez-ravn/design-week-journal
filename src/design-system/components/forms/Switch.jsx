import React from 'react';

const SWITCH_CSS = `
.vl-switch { display: inline-flex; align-items: center; gap: 12px; cursor: pointer; font-family: var(--font-sans); }
.vl-switch__track {
  width: 46px; height: 28px; border-radius: 999px; flex: none;
  background: var(--ink-200); position: relative;
  transition: background var(--dur-base) var(--ease-standard);
}
.vl-switch__thumb {
  position: absolute; top: 3px; left: 3px; width: 22px; height: 22px;
  border-radius: 999px; background: #fff; box-shadow: var(--shadow-sm);
  transition: transform var(--dur-base) var(--ease-spring);
}
.vl-switch input { position: absolute; opacity: 0; width: 0; height: 0; }
.vl-switch input:checked + .vl-switch__track { background: var(--brand-primary); }
.vl-switch input:checked + .vl-switch__track .vl-switch__thumb { transform: translateX(18px); }
.vl-switch input:focus-visible + .vl-switch__track { box-shadow: var(--focus-ring); }
.vl-switch input:disabled + .vl-switch__track { opacity: 0.45; }
.vl-switch__label { font-size: var(--text-base); color: var(--text-strong); font-weight: var(--fw-medium); }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello Switch — instant on/off toggle for settings. */
export function Switch({ label, className = '', ...rest }) {
  inject('vl-switch-css', SWITCH_CSS);
  return (
    <label className={['vl-switch', className].filter(Boolean).join(' ')}>
      <input type="checkbox" role="switch" {...rest} />
      <span className="vl-switch__track" aria-hidden="true"><span className="vl-switch__thumb" /></span>
      {label ? <span className="vl-switch__label">{label}</span> : null}
    </label>
  );
}

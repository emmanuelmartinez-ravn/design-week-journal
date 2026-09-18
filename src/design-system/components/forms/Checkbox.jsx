import React from 'react';

const CHECK_CSS = `
.vl-check { display: inline-flex; align-items: flex-start; gap: 10px; cursor: pointer; font-family: var(--font-sans); }
.vl-check__box {
  width: 22px; height: 22px; flex: none; border-radius: 7px; margin-top: 1px;
  border: 1.5px solid var(--border-strong); background: var(--surface-card);
  display: grid; place-items: center; color: #fff;
  transition: background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard);
}
.vl-check__box svg { width: 14px; height: 14px; stroke-width: 3; opacity: 0; transform: scale(0.6); transition: all var(--dur-fast) var(--ease-spring); }
.vl-check input { position: absolute; opacity: 0; width: 0; height: 0; }
.vl-check input:checked + .vl-check__box { background: var(--brand-primary); border-color: var(--brand-primary); }
.vl-check input:checked + .vl-check__box svg { opacity: 1; transform: scale(1); }
.vl-check input:focus-visible + .vl-check__box { box-shadow: var(--focus-ring); }
.vl-check input:disabled + .vl-check__box { opacity: 0.45; }
.vl-check__label { font-size: var(--text-base); color: var(--text-body); line-height: 1.4; }
.vl-check__label b { font-weight: var(--fw-semibold); color: var(--text-strong); display: block; }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello Checkbox with optional rich label. */
export function Checkbox({ label, description, className = '', ...rest }) {
  inject('vl-check-css', CHECK_CSS);
  return (
    <label className={['vl-check', className].filter(Boolean).join(' ')}>
      <input type="checkbox" {...rest} />
      <span className="vl-check__box" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
      </span>
      {(label || description) ? (
        <span className="vl-check__label">
          {description ? <b>{label}</b> : label}
          {description}
        </span>
      ) : null}
    </label>
  );
}

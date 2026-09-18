import React from 'react';

const INPUT_CSS = `
.vl-field { display: flex; flex-direction: column; gap: 6px; font-family: var(--font-sans); }
.vl-field__label { font-size: var(--text-sm); font-weight: var(--fw-semibold); color: var(--text-strong); }
.vl-field__req { color: var(--accent); margin-left: 2px; }
.vl-inputwrap {
  display: flex; align-items: center; gap: 8px;
  background: var(--surface-card);
  border: 1.5px solid var(--border-strong);
  border-radius: var(--radius-md);
  padding: 0 14px; height: 48px;
  transition: border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard);
}
.vl-inputwrap:focus-within { border-color: var(--border-focus); box-shadow: var(--focus-ring); }
.vl-inputwrap--error { border-color: var(--danger); }
.vl-inputwrap--error:focus-within { box-shadow: var(--focus-ring-accent); }
.vl-inputwrap__icon { color: var(--text-subtle); display: grid; place-items: center; }
.vl-inputwrap__icon svg { width: 18px; height: 18px; }
.vl-input {
  flex: 1; border: none; outline: none; background: transparent;
  font-family: inherit; font-size: var(--text-base); color: var(--text-strong);
  min-width: 0;
}
.vl-input::placeholder { color: var(--text-subtle); }
.vl-inputwrap[aria-disabled="true"] { background: var(--surface-sunken); opacity: 0.7; }
.vl-field__hint { font-size: var(--text-xs); color: var(--text-muted); }
.vl-field__hint--error { color: var(--danger); }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello text Input with label, hint, error and optional leading/trailing icon. */
export function Input({
  label, hint, error, required = false,
  leadingIcon = null, trailingIcon = null,
  id, className = '', disabled = false, ...rest
}) {
  inject('vl-input-css', INPUT_CSS);
  const fieldId = id || (label ? 'vl-' + label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div className={['vl-field', className].filter(Boolean).join(' ')}>
      {label ? (
        <label className="vl-field__label" htmlFor={fieldId}>
          {label}{required ? <span className="vl-field__req">*</span> : null}
        </label>
      ) : null}
      <div className={['vl-inputwrap', error ? 'vl-inputwrap--error' : ''].filter(Boolean).join(' ')}
           aria-disabled={disabled || undefined}>
        {leadingIcon ? <span className="vl-inputwrap__icon">{leadingIcon}</span> : null}
        <input id={fieldId} className="vl-input" disabled={disabled} {...rest} />
        {trailingIcon ? <span className="vl-inputwrap__icon">{trailingIcon}</span> : null}
      </div>
      {(error || hint) ? (
        <span className={['vl-field__hint', error ? 'vl-field__hint--error' : ''].filter(Boolean).join(' ')}>
          {error || hint}
        </span>
      ) : null}
    </div>
  );
}

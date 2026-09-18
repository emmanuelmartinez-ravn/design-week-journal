import React from 'react';

const TAG_CSS = `
.vl-tag {
  display: inline-flex; align-items: center; gap: 7px;
  font-family: var(--font-sans); font-weight: var(--fw-medium); font-size: var(--text-sm);
  padding: 8px 14px; border-radius: var(--radius-pill); cursor: pointer;
  background: var(--surface-card); color: var(--text-body);
  border: 1.5px solid var(--border-strong);
  transition: all var(--dur-fast) var(--ease-standard);
}
.vl-tag:hover { border-color: var(--green-300); background: var(--green-50); }
.vl-tag svg { width: 16px; height: 16px; }
.vl-tag--selected {
  background: var(--brand-primary-tint); color: var(--text-brand);
  border-color: var(--brand-primary); font-weight: var(--fw-semibold);
}
.vl-tag--selected:hover { background: var(--green-200); }
.vl-tag__remove { display: inline-grid; place-items: center; opacity: 0.6; }
.vl-tag__remove:hover { opacity: 1; }
.vl-tag--static { cursor: default; }
.vl-tag--static:hover { border-color: var(--border-strong); background: var(--surface-card); }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello Tag — selectable category / filter chip. */
export function Tag({ selected = false, icon = null, onRemove, interactive = true, className = '', children, ...rest }) {
  inject('vl-tag-css', TAG_CSS);
  const cls = ['vl-tag', selected ? 'vl-tag--selected' : '', !interactive ? 'vl-tag--static' : '', className].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} aria-pressed={interactive ? selected : undefined} {...rest}>
      {icon}
      {children}
      {onRemove ? (
        <span className="vl-tag__remove" onClick={(e) => { e.stopPropagation(); onRemove(e); }} aria-label="Remove">
          <i data-lucide="x"></i>
        </span>
      ) : null}
    </button>
  );
}

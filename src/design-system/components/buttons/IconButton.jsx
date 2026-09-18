import React from 'react';

const ICONBTN_CSS = `
.vl-iconbtn {
  display: inline-grid; place-items: center; cursor: pointer;
  background: var(--surface-card); color: var(--text-body);
  border: 1.5px solid var(--border-strong); border-radius: var(--radius-pill);
  transition: background var(--dur-fast) var(--ease-standard),
              color var(--dur-fast) var(--ease-standard),
              transform var(--dur-fast) var(--ease-standard),
              box-shadow var(--dur-fast) var(--ease-standard);
}
.vl-iconbtn:hover { background: var(--surface-sunken); }
.vl-iconbtn:active { transform: scale(0.93); }
.vl-iconbtn:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.vl-iconbtn[disabled] { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
.vl-iconbtn--sm { width: 34px; height: 34px; }
.vl-iconbtn--md { width: 44px; height: 44px; }
.vl-iconbtn--lg { width: 52px; height: 52px; }
.vl-iconbtn--sm svg, .vl-iconbtn--sm .vl-iconbtn__i { width: 16px; height: 16px; }
.vl-iconbtn--md svg, .vl-iconbtn--md .vl-iconbtn__i { width: 20px; height: 20px; }
.vl-iconbtn--lg svg, .vl-iconbtn--lg .vl-iconbtn__i { width: 24px; height: 24px; }
.vl-iconbtn--solid { background: var(--brand-primary); color: var(--brand-on-primary); border-color: transparent; }
.vl-iconbtn--solid:hover { background: var(--brand-primary-hover); }
.vl-iconbtn--ghost { background: transparent; border-color: transparent; }
.vl-iconbtn--ghost:hover { background: var(--surface-sunken); }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello IconButton — square-tap circular control for a single icon action. */
export function IconButton({
  variant = 'default',
  size = 'md',
  label,
  className = '',
  children,
  ...rest
}) {
  inject('vl-iconbtn-css', ICONBTN_CSS);
  const cls = ['vl-iconbtn', `vl-iconbtn--${size}`,
    variant !== 'default' ? `vl-iconbtn--${variant}` : '', className].filter(Boolean).join(' ');
  return (
    <button className={cls} aria-label={label} {...rest}>
      <span className="vl-iconbtn__i">{children}</span>
    </button>
  );
}

import React from 'react';

/* Inject component CSS once. */
function useVelloStyle(id, css) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

const BTN_CSS = `
.vl-btn {
  --_bg: var(--brand-primary);
  --_fg: var(--brand-on-primary);
  --_bgh: var(--brand-primary-hover);
  --_bga: var(--brand-primary-press);
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  font-family: var(--font-sans); font-weight: var(--fw-semibold);
  border: 1.5px solid transparent; cursor: pointer; white-space: nowrap;
  background: var(--_bg); color: var(--_fg);
  border-radius: var(--radius-pill);
  transition: background var(--dur-fast) var(--ease-standard),
              transform var(--dur-fast) var(--ease-standard),
              box-shadow var(--dur-fast) var(--ease-standard),
              border-color var(--dur-fast) var(--ease-standard);
}
.vl-btn:hover { background: var(--_bgh); }
.vl-btn:active { background: var(--_bga); transform: translateY(1px) scale(0.99); }
.vl-btn:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.vl-btn[disabled] { opacity: 0.45; cursor: not-allowed; pointer-events: none; }
.vl-btn--full { width: 100%; }

/* sizes */
.vl-btn--sm { height: 36px; padding: 0 16px; font-size: var(--text-sm); }
.vl-btn--md { height: 46px; padding: 0 22px; font-size: var(--text-base); }
.vl-btn--lg { height: 54px; padding: 0 28px; font-size: var(--text-md); }

/* variants */
.vl-btn--accent { --_bg: var(--accent); --_fg: var(--accent-on); --_bgh: var(--accent-hover); --_bga: var(--accent-press); }
.vl-btn--accent-outline {
  --_bg: transparent; --_fg: var(--coral-700);
  --_bgh: var(--coral-50); --_bga: var(--coral-100);
  border-color: var(--coral-300);
}
.vl-btn--secondary {
  --_bg: var(--surface-card); --_fg: var(--text-strong);
  --_bgh: var(--surface-sunken); --_bga: var(--ink-100);
  border-color: var(--border-strong);
}
.vl-btn--outline {
  --_bg: transparent; --_fg: var(--text-brand);
  --_bgh: var(--brand-primary-tint); --_bga: var(--green-200);
  border-color: var(--green-300);
}
.vl-btn--ghost {
  --_bg: transparent; --_fg: var(--text-strong);
  --_bgh: var(--surface-sunken); --_bga: var(--ink-100);
}
.vl-btn svg, .vl-btn .vl-btn__icon { width: 1.15em; height: 1.15em; flex: none; }
`;

/**
 * Vello Button — primary action control.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leadingIcon = null,
  trailingIcon = null,
  as = 'button',
  className = '',
  children,
  ...rest
}) {
  useVelloStyle('vl-btn-css', BTN_CSS);
  const Tag = as;
  const cls = [
    'vl-btn',
    `vl-btn--${variant}`,
    `vl-btn--${size}`,
    fullWidth ? 'vl-btn--full' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <Tag className={cls} {...rest}>
      {leadingIcon ? <span className="vl-btn__icon">{leadingIcon}</span> : null}
      {children}
      {trailingIcon ? <span className="vl-btn__icon">{trailingIcon}</span> : null}
    </Tag>
  );
}

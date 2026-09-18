import React from 'react';
import { Avatar } from '../display/Avatar.jsx';
import { Rating } from '../display/Rating.jsx';
import { Badge } from '../display/Badge.jsx';
import { Button } from '../buttons/Button.jsx';

const PROVIDER_CSS = `
.vl-provider {
  display: flex; gap: 14px; align-items: flex-start;
  background: var(--surface-card);
  border: 1.5px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: 16px;
  transition: transform var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard);
}
.vl-provider--interactive { cursor: pointer; }
.vl-provider--interactive:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); border-color: transparent; }
.vl-provider--featured { box-shadow: var(--shadow-brand); border-color: transparent; }
.vl-provider__body { flex: 1; min-width: 0; }
.vl-provider__top { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.vl-provider__name { font-family: var(--font-display); font-weight: var(--fw-bold); font-size: var(--text-lg); color: var(--text-strong); letter-spacing: -0.01em; }
.vl-provider__service { font-size: var(--text-sm); color: var(--text-muted); }
.vl-provider__meta { display: flex; align-items: center; gap: 12px; margin-top: 6px; flex-wrap: wrap; }
.vl-provider__dist { display: inline-flex; align-items: center; gap: 4px; font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-muted); }
.vl-provider__dist svg { width: 13px; height: 13px; }
.vl-provider__badges { display: flex; gap: 6px; margin-top: 10px; flex-wrap: wrap; }
.vl-provider__aside { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; flex: none; }
.vl-provider__price { text-align: right; line-height: 1; }
.vl-provider__price b { font-family: var(--font-mono); font-weight: var(--fw-semibold); font-size: var(--text-xl); color: var(--text-strong); white-space: nowrap; }
.vl-provider__price span { font-size: var(--text-xs); color: var(--text-muted); display: block; margin-top: 3px; }
`;

function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style'); el.id = id; el.textContent = css;
  document.head.appendChild(el);
}

/** Vello ProviderCard — the signature listing for a local service provider. */
export function ProviderCard({
  name, photo, service, rating, reviews, distance,
  price, priceUnit = 'hr', verified = false, available = false,
  featured = false, interactive = true, badges = [],
  ctaLabel = 'Book', onBook, onMessage, className = '',
}) {
  inject('vl-provider-css', PROVIDER_CSS);
  const cls = ['vl-provider', interactive ? 'vl-provider--interactive' : '',
    featured ? 'vl-provider--featured' : '', className].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      <Avatar src={photo} name={name} size="lg" verified={verified} />
      <div className="vl-provider__body">
        <div className="vl-provider__top">
          <span className="vl-provider__name">{name}</span>
          {available ? <Badge variant="brand" size="sm" dot>Available</Badge> : null}
        </div>
        <div className="vl-provider__service">{service}</div>
        <div className="vl-provider__meta">
          <Rating value={rating} count={reviews} size="sm" />
          {distance != null ? (
            <span className="vl-provider__dist"><i data-lucide="map-pin"></i>{distance} mi</span>
          ) : null}
        </div>
        {badges.length ? (
          <div className="vl-provider__badges">
            {badges.map((b, i) => <Badge key={i} variant="neutral" size="sm">{b}</Badge>)}
          </div>
        ) : null}
      </div>
      <div className="vl-provider__aside">
        {price != null ? (
          <div className="vl-provider__price"><b>${price}</b><span>per {priceUnit}</span></div>
        ) : null}
        <Button size="sm" variant="primary" onClick={onBook}>{ctaLabel}</Button>
      </div>
    </div>
  );
}

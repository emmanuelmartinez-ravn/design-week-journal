Circular single-icon control for compact actions (favorite, share, back, more) — keeps a 44px tap target even at small sizes.

```jsx
<IconButton label="Save to favorites" variant="default">
  <i data-lucide="heart" />
</IconButton>
```

Variants: `default` (white, bordered), `solid` (emerald fill), `ghost` (transparent, for toolbars over imagery). Always pass `label`. Sizes `sm` `md` `lg`.

Base surface container for grouping content — the foundation other Vello cards build on.

```jsx
<Card elevation="raised" padding="lg">…</Card>
<Card interactive onClick={open}>…</Card>
```

`elevation`: `flat` (bordered, default), `raised`, `floating`. `padding`: `none`→`lg`. Use `interactive` for tappable cards (adds hover-lift). Set `padding="none"` when the card contains a full-bleed image header.

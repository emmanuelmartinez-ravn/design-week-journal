Primary pill-shaped action button — use for the main call to action on any Vello surface (Book now, Find help, Confirm).

```jsx
<Button variant="primary" size="lg" leadingIcon={<i data-lucide="calendar-check" />}>
  Book Maya
</Button>
```

Variants: `primary` (emerald, default CTA), `accent` (persimmon, secondary emphasis / promos), `secondary` (white w/ border), `outline` (green hairline, on tinted surfaces), `ghost` (text-only, toolbars). Sizes: `sm` `md` `lg`. Use `fullWidth` for sheet/mobile CTAs. Pass `as="a"` plus `href` for link buttons.

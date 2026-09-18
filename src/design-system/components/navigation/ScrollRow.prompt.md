Horizontally scrollable row that *looks* scrollable: a soft gradient fade on whichever edge has more content, plus scroll-snap. Use for category chips, popular-services rails, recently-viewed providers — any row that overflows.

```jsx
// Category chips on the app background
<ScrollRow>
  <Tag icon={<i data-lucide="dog" />} selected>Dog walking</Tag>
  <Tag icon={<i data-lucide="sparkles" />}>Cleaning</Tag>
  <Tag icon={<i data-lucide="wrench" />}>Handyperson</Tag>
  {/* …more */}
</ScrollRow>

// A rail of cards INSIDE a white card — match the fade to that surface
<ScrollRow fade="var(--surface-card)">
  <div style={{ minWidth: '76%' }}><ProviderCard {...maya} /></div>
  <div style={{ minWidth: '76%' }}><ProviderCard {...devon} /></div>
</ScrollRow>
```

**Two affordances, both required:**
1. **Edge fade** — the right fade signals "there's more"; the left fade appears once scrolled. Set `fade` to the surface colour behind the row or the gradient won't blend.
2. **~30% peek** — size the items so a little over one is visible (e.g. card `min-width: 72–78%` of the viewport, or fixed widths in a container ~1.3 cards wide). The half-shown next item is what tells users the row continues.

The right fade hides automatically at the end of the scroll; the left fade hides at the start.

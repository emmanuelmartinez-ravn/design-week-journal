Selectable chip for service categories and filters — toggles between default and emerald-selected.

```jsx
<Tag icon={<i data-lucide="dog" />} selected>Dog walking</Tag>
<Tag icon={<i data-lucide="sparkles" />}>Cleaning</Tag>
<Tag onRemove={() => removeFilter('under-$30')}>Under $30</Tag>
```

Use `selected` for active filters, `onRemove` for applied-filter chips, `interactive={false}` for read-only labels.

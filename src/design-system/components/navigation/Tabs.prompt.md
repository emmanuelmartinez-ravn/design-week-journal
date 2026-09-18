Underline tab bar for switching between views (Upcoming / Past bookings, service categories).

```jsx
<Tabs value={tab} onChange={setTab} items={[
  { id: 'upcoming', label: 'Upcoming', count: 2 },
  { id: 'past', label: 'Past' },
]} />
```

Use `fill` to stretch tabs across the full width (common on mobile). Items accept `icon` and `count`.

Friendly, on-voice view for when there's nothing to show yet. Always: a small icon medallion, a clear headline, one supporting line in the warm neighbor voice, and a primary action.

```jsx
// Zero items in a list
<EmptyState
  tone="brand"
  icon={<i data-lucide="users" />}
  title="No verified neighbors on your block yet"
  body="Be the first to vouch for someone — invite a neighbor you trust."
  actionLabel="Invite a neighbor"
  onAction={invite}
/>

// Zero search results
<EmptyState
  tone="neutral"
  icon={<i data-lucide="search-x" />}
  title="No matches for “midnight dog walk”"
  body="Try a broader search or widen your distance to 2 mi."
  actionLabel="Clear filters"
  actionVariant="secondary"
  onAction={reset}
/>

// First-use setup prompt
<EmptyState
  tone="brand"
  icon={<i data-lucide="map-pin-house" />}
  title="Set up your neighborhood"
  body="Tell us where you live and we'll find trusted help within a few blocks."
  actionLabel="Set my neighborhood"
  secondaryLabel="Skip for now"
  onAction={setup}
/>
```

Voice rules apply: sentence case, specific over generic, reassuring. Use `tone="accent"` only for time-sensitive / urgent prompts — keep persimmon rare. `compact` shrinks it for in-card use.

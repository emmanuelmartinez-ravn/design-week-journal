Mobile bottom tab bar — the primary navigation for the Vello app.

```jsx
<BottomNav value={tab} onChange={setTab} items={[
  { id: 'home', label: 'Explore', icon: <i data-lucide="compass" /> },
  { id: 'bookings', label: 'Bookings', icon: <i data-lucide="calendar" />, badge: 2 },
  { id: 'messages', label: 'Messages', icon: <i data-lucide="message-circle" /> },
  { id: 'account', label: 'You', icon: <i data-lucide="user" /> },
]} />
```

Keep to 3–5 items. `badge` shows a persimmon count for messages/bookings. Handles iOS safe-area inset automatically.

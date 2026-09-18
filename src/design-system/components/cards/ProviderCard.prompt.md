The signature Vello listing — one local provider with photo, rating, distance, price and a book CTA. Composes Avatar, Rating, Badge and Button.

```jsx
<ProviderCard
  name="Maya Rivera" service="Dog walker · 3 yrs"
  rating={4.9} reviews={213} distance={0.4} price={28}
  verified available badges={["Brings supplies","Pet-first aid"]}
  onBook={() => book(maya)} />
```

Use `featured` for the brand-glow promoted slot. Set `interactive={false}` inside a non-clickable context.

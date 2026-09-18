Labeled text field for forms and search — supports leading/trailing icons, hint and error states.

```jsx
<Input label="Where do you need help?" placeholder="Enter your address"
       leadingIcon={<i data-lucide="map-pin" />} />
<Input label="Email" required error="That email looks off" />
```

Use `leadingIcon` with a `search` glyph for the ubiquitous Vello search bar. Pass standard input attributes (`type`, `value`, `onChange`, `placeholder`).

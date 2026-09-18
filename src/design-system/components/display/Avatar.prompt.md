Round provider/neighbor avatar with initials fallback and an optional verified or online indicator.

```jsx
<Avatar src={maya.photo} name="Maya R." size="lg" verified />
<Avatar name="Devon K." online />
```

Sizes `xs`→`xl`. `verified` shows the emerald check (background-checked); `online` shows an availability dot. Initials are used automatically when `src` is absent.

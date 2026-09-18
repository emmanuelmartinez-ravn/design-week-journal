Accessible trust mark for providers and neighbors. **Never color alone** — each status pairs a unique shape with its color so colorblind users can read it.

| status | shape + color | label |
|---|---|---|
| `verified` | olive **shield** + cream check | Background-checked |
| `pending` | amber **dashed circle** + clock | Verification pending |
| `top-rated` | amber **star/seal** | Top-rated neighbor |
| `unverified` | neutral **hollow circle** | Not yet verified |

```jsx
// Labeled pill beside a name
<VerifiedBadge status="verified" />
<VerifiedBadge status="top-rated" size="sm" />

// Bare glyph (corner of an avatar, inline with a name)
<VerifiedMark status="pending" size={18} />
```

The mark carries a paper-colored outline (`outline` default `true`) so it stays legible over a photo; the pill turns the outline off since it sits on a tinted chip. `Avatar` renders this mark in its corner via its `badge` / `verified` props — don't place a separate badge over an avatar yourself.

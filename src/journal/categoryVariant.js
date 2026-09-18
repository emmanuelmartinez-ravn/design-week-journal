const VARIANTS = {
  Product: 'brand',
  UX: 'info',
  UI: 'neutral',
  Visual: 'accent',
};

// Single source of truth for coloring the product/UX/UI/visual-design
// taxonomy, so every practice that classifies a decision into one of these
// four buckets uses the same badge color for the same bucket. Accepts
// either short ("Visual") or long ("Visual Design") labels.
export function categoryVariant(term) {
  const key = term.replace(/\s*Design$/, '');
  return VARIANTS[key] ?? 'neutral';
}

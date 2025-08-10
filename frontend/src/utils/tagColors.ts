// Color palette for tags - each tag gets a unique color (calm, muted tones)
export const TAG_COLORS = [
  '#6b7280', // muted gray
  '#9ca3af', // light gray
  '#d1d5db', // very light gray
  '#e5e7eb', // off-white
  '#f3f4f6', // light off-white
  '#e5e7eb', // soft gray
  '#d1d5db', // light gray
  '#9ca3af', // medium gray
  '#6b7280', // muted gray
  '#9ca3af', // light gray
  '#d1d5db', // very light gray
  '#e5e7eb', // off-white
  '#f3f4f6', // light off-white
  '#e5e7eb', // soft gray
  '#d1d5db', // light gray
]

// Get color for a specific tag based on global tag order
export const getTagColor = (tag: string, allTags: string[]) => {
  const tagIndex = allTags.indexOf(tag)
  if (tagIndex === -1) return '#6b7280' // fallback gray
  return TAG_COLORS[tagIndex % TAG_COLORS.length]
} 
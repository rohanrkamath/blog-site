// Color palette for tags - each tag gets a unique color
export const TAG_COLORS = [
  '#4ade80', // green
  '#f97316', // orange
  '#06b6d4', // cyan
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#f59e0b', // amber
  '#10b981', // emerald
  '#3b82f6', // blue
  '#ef4444', // red
  '#84cc16', // lime
  '#f43f5e', // rose
  '#06b6d4', // sky
  '#a855f7', // purple
  '#f97316', // orange
  '#22c55e', // green
]

// Get color for a specific tag based on global tag order
export const getTagColor = (tag: string, allTags: string[]) => {
  const tagIndex = allTags.indexOf(tag)
  if (tagIndex === -1) return '#6b7280' // fallback gray
  return TAG_COLORS[tagIndex % TAG_COLORS.length]
} 
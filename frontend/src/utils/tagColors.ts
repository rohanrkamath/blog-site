// Color palette for tags - each tag gets a unique color (calm, colorful tones)
export const TAG_COLORS = [
  '#7c3aed', // violet-600 - soft purple
  '#059669', // emerald-600 - muted green
  '#e11d48', // rose-600 - soft pink-red (much calmer)
  '#2563eb', // blue-600 - soft blue
  '#ea580c', // orange-600 - muted orange
  '#7c2d12', // brown-600 - warm brown
  '#be185d', // pink-600 - soft pink
  '#0891b2', // cyan-600 - muted cyan
  '#65a30d', // lime-600 - soft lime
  '#9333ea', // purple-600 - muted purple
  '#c2410c', // orange-700 - darker orange
  '#16a34a', // green-600 - soft green
  '#e11d48', // rose-600 - soft pink-red (much calmer)
  '#2563eb', // blue-600 - soft blue
  '#7c3aed', // violet-600 - soft purple
]

// Get color for a specific tag based on global tag order
export const getTagColor = (tag: string, allTags: string[]) => {
  const tagIndex = allTags.indexOf(tag)
  if (tagIndex === -1) return '#6b7280' // fallback gray
  return TAG_COLORS[tagIndex % TAG_COLORS.length]
} 
import { getPageBySlug } from '@/lib/markdown'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Rohan Kamath, a passionate developer and blogger.',
}

export default async function AboutPage() {
  const page = await getPageBySlug('about')

  if (!page) {
    notFound()
  }

  return (
    <article>
      <div 
        style={{ 
          lineHeight: '1.7', 
          color: '#374151',
          fontSize: '1rem'
        }}
        className="prose"
        dangerouslySetInnerHTML={{ __html: page.html }}
      />
    </article>
  )
} 
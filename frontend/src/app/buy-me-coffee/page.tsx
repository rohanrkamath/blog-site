import { getPageBySlug } from '@/lib/markdown'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('buy-me-coffee')
  
  if (!page) {
    return {
      title: 'Buy Me Coffee - Rohan Kamath',
    }
  }

  return {
    title: `${page.title} - Rohan Kamath`,
    description: page.description,
  }
}

export default async function BuyMeCoffeePage() {
  const page = await getPageBySlug('buy-me-coffee')
  
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
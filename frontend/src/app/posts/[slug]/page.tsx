import { getPostBySlug, getAllPosts } from '@/lib/markdown'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import Link from 'next/link'
import { Metadata } from 'next'
import { getTagColor } from '@/utils/tagColors'


interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Rohan Kamath'],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)
  const allPosts = await getAllPosts()

  if (!post) {
    notFound()
  }

  // Get global tag order for consistent colors
  const allTags = Array.from(new Set(allPosts.flatMap(p => p.tags || []))).sort()

  return (
    <article style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-primary)', lineHeight: '1.2' }}>
          {post.title}
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <time>{format(new Date(post.date), 'MMMM dd, yyyy')}</time>
          <span>•</span>
          <span>{post.readingTime.text}</span>
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {post.tags.map((tag) => {
              const tagColor = getTagColor(tag, allTags)
              return (
                <span
                  key={tag}
                  style={{ 
                    backgroundColor: tagColor,
                    color: 'white',
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '0.25rem', 
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    display: 'inline-block'
                  }}
                >
                  {tag}
                </span>
              )
            })}
          </div>
        )}
        
        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.75' }}>
          {post.description}
        </p>
      </header>
      
      <div 
        style={{ 
          lineHeight: '1.7', 
          color: 'var(--text-primary)',
          fontSize: '1rem'
        }}
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      
      <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
        <Link 
          href="/"
          style={{ 
            color: 'var(--link-color)', 
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'var(--transition)'
          }}
        >
          ← Back to Home
        </Link>
      </div>
    </article>
  )
} 
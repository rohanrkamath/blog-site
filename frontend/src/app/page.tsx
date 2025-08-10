import { getAllPosts } from '@/lib/markdown'
import { SITE_CONFIG, PAGE_SIZE } from '@/config'
import Link from 'next/link'
import { format } from 'date-fns'

export default async function HomePage() {
  const posts = await getAllPosts()
  const recentPosts = posts.slice(0, PAGE_SIZE)

  return (
    <div>
      <section style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Welcome to {SITE_CONFIG.title}
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.75' }}>
          {SITE_CONFIG.description}
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: '1.875rem', fontWeight: '600', marginBottom: '2rem', color: 'var(--text-primary)' }}>
          Recent Posts
        </h2>
        
        {recentPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)' }}>
            <p>No posts found. Create your first post in the content/posts directory.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {recentPosts.map((post) => (
              <article key={post.slug} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  <Link 
                    href={`/posts/${post.slug}`}
                    style={{ color: 'var(--text-primary)', textDecoration: 'none' }}
                  >
                    {post.title}
                  </Link>
                </h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <time>{format(new Date(post.date), 'MMMM dd, yyyy')}</time>
                  <span>•</span>
                  <span>{post.readingTime.text}</span>
                  {post.tags && post.tags.length > 0 && (
                    <>
                      <span>•</span>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{ 
                              backgroundColor: 'var(--tag-bg)', 
                              padding: '0.25rem 0.5rem', 
                              borderRadius: '0.25rem', 
                              fontSize: '0.75rem',
                              color: 'var(--tag-text)',
                              display: 'inline-block'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {post.description}
                </p>
                
                <Link 
                  href={`/posts/${post.slug}`}
                  style={{ 
                    display: 'inline-block',
                    marginTop: '1rem',
                    color: 'var(--link-color)',
                    textDecoration: 'none',
                    fontWeight: '500',
                    transition: 'var(--transition)'
                  }}
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}
        
        {posts.length > PAGE_SIZE && (
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <Link 
              href="/blog"
              style={{
                display: 'inline-block',
                backgroundColor: 'var(--link-color)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'var(--transition)'
              }}
            >
              View All Posts
            </Link>
          </div>
        )}
      </section>
    </div>
  )
} 
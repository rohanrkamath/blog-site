import { getAllPosts } from '@/lib/markdown'
import { SITE_CONFIG, PAGE_SIZE } from '@/config'
import Link from 'next/link'
import { format } from 'date-fns'
import { getTagColor } from '@/utils/tagColors'

export default async function HomePage() {
  const posts = await getAllPosts()
  const recentPosts = posts.slice(0, PAGE_SIZE)
  
  // Get all unique tags for consistent color assignment
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags || []))).sort()

  return (
    <div className="homepage">
      <section>
        <h1>
          Welcome to {SITE_CONFIG.title}
        </h1>
        <p className="welcome-description">
          {SITE_CONFIG.description}
        </p>
      </section>

      <section>
        <h2>
          Recent Posts
        </h2>
        
        {recentPosts.length === 0 ? (
          <div className="no-posts">
            <p>No posts found. Create your first post in the content/posts directory.</p>
          </div>
        ) : (
          <div className="recent-posts">
            {recentPosts.map((post) => (
              <article key={post.slug} className="post-article">
                <h3 className="post-title">
                  <Link href={`/posts/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <div className="post-meta">
                  <time>{format(new Date(post.date), 'MMMM dd, yyyy')}</time>
                  <span className="meta-separator">•</span>
                  <span>{post.readingTime.text}</span>
                  {post.tags && post.tags.length > 0 && (
                    <>
                      <span className="meta-separator">•</span>
                      <div className="post-tags">
                        {post.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="post-tag"
                            style={{ 
                              backgroundColor: getTagColor(tag, allTags),
                              color: 'white',
                              borderColor: getTagColor(tag, allTags)
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                <p className="post-description">
                  {post.description}
                </p>
                
                <Link href={`/posts/${post.slug}`} className="read-more-link">
                  Read more
                </Link>
              </article>
            ))}
          </div>
        )}
        
        {posts.length > PAGE_SIZE && (
          <div className="view-all-posts">
            <Link href="/blog">
              View All Posts
            </Link>
          </div>
        )}
      </section>
    </div>
  )
} 
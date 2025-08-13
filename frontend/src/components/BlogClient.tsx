'use client'

import { useState, useMemo } from 'react'
import { Post } from '@/lib/markdown'
import Link from 'next/link'
import { format } from 'date-fns'

interface BlogClientProps {
  posts: Post[]
}

import { getTagColor } from '@/utils/tagColors'

export default function BlogClient({ posts }: BlogClientProps) {
  const [selectedTag, setSelectedTag] = useState<string>('All')

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    posts.forEach((post: Post) => {
      post.tags?.forEach(tag => tags.add(tag))
    })
    return ['All', ...Array.from(tags).sort()]
  }, [posts])

  // Filter posts based on selected tag
  const filteredPosts = useMemo(() => {
    if (selectedTag === 'All') {
      return posts
    }
    
    const filtered = posts.filter(post => {
      return post.tags?.some(postTag => postTag === selectedTag)
    })
    
    return filtered
  }, [posts, selectedTag])

  // Get color for a specific tag
  const getTagColorForFilter = (tag: string) => {
    if (tag === 'All') return '#6b7280' // gray for "All"
    const tagIndex = allTags.indexOf(tag) - 1 // -1 because "All" is first
    return getTagColor(tag, allTags.slice(1)) // exclude "All" tag
  }

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag)
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }} className="blog-container">
      <h1 style={{ 
        fontSize: '2.25rem', 
        fontWeight: 'bold', 
        marginBottom: '1rem', 
        color: 'var(--text-primary)',
        textAlign: 'center'
      }} className="blog-title">
        Blog
      </h1>
      
      <p style={{ 
        textAlign: 'center', 
        color: 'var(--text-secondary)', 
        marginBottom: '3rem',
        fontSize: '1rem'
      }} className="blog-subtitle">
        Thoughts, tutorials, and insights on software development
      </p>

      {/* Tag Filter Buttons */}
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }} className="tag-filters">
          {allTags.map((tag) => {
            const tagColor = getTagColorForFilter(tag)
            const isSelected = selectedTag === tag
            
            return (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="tag-filter"
                style={{
                  backgroundColor: tagColor,
                  color: 'white',
                  padding: '0.375rem 0.75rem',
                  borderRadius: '1rem',
                  border: 'none',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontWeight: '500',
                  boxShadow: isSelected ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none',
                  transform: isSelected ? 'translateY(-1px)' : 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)'
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = 'none'
                  }
                }}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </div>

      {/* Posts List */}
      <div>
        {filteredPosts.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem 0', 
            color: 'var(--text-secondary)',
            fontSize: '1rem'
          }}>
            <p>No posts found{selectedTag !== 'All' ? ` with tag "${selectedTag}"` : ''}.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {/* Group posts by year */}
            {(() => {
              const postsByYear = filteredPosts.reduce((acc, post) => {
                const year = new Date(post.date).getFullYear().toString()
                if (!acc[year]) acc[year] = []
                acc[year].push(post)
                return acc
              }, {} as Record<string, Post[]>)

              return Object.entries(postsByYear)
                .sort(([a], [b]) => parseInt(b) - parseInt(a))
                .map(([year, yearPosts]) => (
                  <div key={year} style={{ marginBottom: '3rem' }} className="blog-year-group">
                    <h2 style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: 'bold', 
                      marginBottom: '1.5rem', 
                      color: 'var(--text-primary)',
                      paddingBottom: '0.5rem'
                    }} className="blog-year-heading">
                      {year}
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }} className="blog-post-list">
                      {yearPosts
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((post) => (
                          <div key={post.slug} style={{ 
                            display: 'flex', 
                            gap: '1.5rem',
                            alignItems: 'flex-start',
                            padding: '1rem 0'
                          }} className="blog-post-item">
                            <div style={{ 
                              minWidth: '80px',
                              color: 'var(--text-secondary)',
                              fontSize: '0.875rem',
                              fontWeight: '500'
                            }} className="blog-post-date">
                              {format(new Date(post.date), 'MMM do')}
                            </div>
                            <div style={{ flex: 1 }} className="blog-post-content">
                              <div style={{ marginBottom: '0.5rem' }}>
                                {post.tags && post.tags.length > 0 && (
                                  <div style={{ marginBottom: '0.5rem' }} className="blog-post-tags">
                                    {post.tags.map((tag) => (
                                      <span
                                        key={tag}
                                        className="blog-post-tag"
                                        style={{
                                          backgroundColor: getTagColor(tag, allTags.slice(1)),
                                          color: 'white',
                                          padding: '0.25rem 0.5rem',
                                          borderRadius: '0.5rem',
                                          fontSize: '0.7rem',
                                          marginRight: '0.5rem',
                                          fontWeight: '500',
                                          display: 'inline-block'
                                        }}
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                <Link
                                  href={`/posts/${post.slug}`}
                                  className="blog-post-title"
                                  style={{
                                    color: 'var(--text-primary)',
                                    textDecoration: 'underline',
                                    fontSize: '1.125rem',
                                    fontWeight: '600',
                                    lineHeight: '1.3'
                                  }}
                                >
                                  {post.title}
                                </Link>
                              </div>
                              {post.description && (
                                <p className="blog-post-description" style={{ 
                                  color: 'var(--text-secondary)', 
                                  lineHeight: '1.5',
                                  margin: 0,
                                  fontSize: '0.875rem'
                                }}>
                                  {post.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))
            })()}
          </div>
        )}
      </div>
    </div>
  )
} 
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
    <div>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--text-primary)' }}>
        Blog
      </h1>

      {/* Tag Filter Buttons */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {allTags.map((tag) => {
            const tagColor = getTagColorForFilter(tag)
            const isSelected = selectedTag === tag
            
            return (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
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
                  boxShadow: isSelected ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
                  transform: isSelected ? 'translateY(-1px)' : 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
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
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)' }}>
            <p>No posts found{selectedTag !== 'All' ? ` with tag "${selectedTag}"` : ''}.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
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
                  <div key={year}>
                    <h2 style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: 'bold', 
                      marginBottom: '2rem', 
                      color: 'var(--text-primary)' 
                    }}>
                      {year}
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      {yearPosts
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((post) => (
                          <div key={post.slug} style={{ 
                            display: 'flex', 
                            gap: '2rem',
                            alignItems: 'flex-start'
                          }}>
                            <div style={{ 
                              minWidth: '120px',
                              color: 'var(--text-secondary)',
                              fontSize: '0.875rem'
                            }}>
                              {format(new Date(post.date), 'MMM do')}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ marginBottom: '0.5rem' }}>
                                {post.tags && post.tags.length > 0 && (
                                  <div style={{ marginBottom: '0.5rem' }}>
                                    {post.tags.map((tag, index) => (
                                      <span
                                        key={tag}
                                        style={{
                                          backgroundColor: getTagColor(tag, allTags.slice(1)),
                                          color: 'white',
                                          padding: '0.25rem 0.75rem',
                                          borderRadius: '1rem',
                                          fontSize: '0.7rem',
                                          marginRight: '0.75rem',
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
                                  style={{
                                    color: 'var(--text-primary)',
                                    textDecoration: 'underline',
                                    fontSize: '1.125rem',
                                    fontWeight: '500'
                                  }}
                                >
                                  {post.title}
                                </Link>
                              </div>
                              {post.description && (
                                <p style={{ 
                                  color: 'var(--text-secondary)', 
                                  lineHeight: '1.6',
                                  margin: 0
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
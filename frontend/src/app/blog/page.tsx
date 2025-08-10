import { getAllPosts } from '@/lib/markdown'
import BlogClient from '@/components/BlogClient'

export default async function BlogPage() {
  const posts = await getAllPosts()
  
  return <BlogClient posts={posts} />
} 
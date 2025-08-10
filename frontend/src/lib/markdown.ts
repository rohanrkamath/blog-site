import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
const readingTime = require('reading-time');

export interface PostMatter {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags?: string[];
  categories?: string[];
  coverImage?: string;
  published?: boolean;
}

export interface Post extends PostMatter {
  content: string;
  html: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
}

const postsDirectory = path.join(process.cwd(), 'content/posts');
const pagesDirectory = path.join(process.cwd(), 'content/pages');

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
}

export function getPageSlugs(): string[] {
  if (!fs.existsSync(pagesDirectory)) {
    return [];
  }
  return fs.readdirSync(pagesDirectory).filter(file => file.endsWith('.md'));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .process(content);
    
    const html = processedContent.toString();
    const readingTimeStats = readingTime(content);
    
    return {
      ...data,
      slug: realSlug,
      content,
      html,
      readingTime: readingTimeStats,
      published: data.published ?? true
    } as Post;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export async function getPageBySlug(slug: string): Promise<Post | null> {
  try {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(pagesDirectory, `${realSlug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .process(content);
    
    const html = processedContent.toString();
    const readingTimeStats = readingTime(content);
    
    return {
      ...data,
      slug: realSlug,
      content,
      html,
      readingTime: readingTimeStats,
      published: data.published ?? true
    } as Post;
  } catch (error) {
    console.error(`Error reading page ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => await getPostBySlug(slug))
  );
  
  return posts
    .filter((post): post is Post => post !== null && (post.published ?? true))
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export async function getAllPages(): Promise<Post[]> {
  const slugs = getPageSlugs();
  const pages = await Promise.all(
    slugs.map(async (slug) => await getPageBySlug(slug))
  );
  
  return pages
    .filter((page): page is Post => page !== null && (page.published ?? true));
}

export function getAllTags(posts: Post[]): string[] {
  const tags = new Set<string>();
  posts.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getAllCategories(posts: Post[]): string[] {
  const categories = new Set<string>();
  posts.forEach(post => {
    post.categories?.forEach(category => categories.add(category));
  });
  return Array.from(categories).sort();
}

export function getPostsByTag(posts: Post[], tag: string): Post[] {
  return posts.filter(post => 
    post.tags?.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
}

export function getPostsByCategory(posts: Post[], category: string): Post[] {
  return posts.filter(post => 
    post.categories?.some(postCategory => postCategory.toLowerCase() === category.toLowerCase())
  );
} 
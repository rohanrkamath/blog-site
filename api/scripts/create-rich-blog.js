const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/personal-blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schemas
const categorySchema = new mongoose.Schema({
  title: String,
  guid: String,
  description: String,
  isActive: Boolean,
});

const tagSchema = new mongoose.Schema({
  title: String,
  guid: String,
  description: String,
  isActive: Boolean,
});

const articleSchema = new mongoose.Schema({
  title: String,
  guid: String,
  description: String,
  content: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  isActive: Boolean,
  readingTime: Number,
  publishingDate: Date,
  coverImage: String,
  likes: { type: Number, default: 0 },
  shortDescription: String,
  viewCount: { type: Number, default: 0 },
  likedCount: { type: Number, default: 0 },
});

const Category = mongoose.model('Category', categorySchema);
const Tag = mongoose.model('Tag', tagSchema);
const Article = mongoose.model('Article', articleSchema);

async function createRichBlogPost() {
  try {
    // Create some tags
    const tags = await Tag.create([
      {
        title: 'JavaScript',
        guid: 'javascript',
        description: 'JavaScript programming language',
        isActive: true,
      },
      {
        title: 'Web Development',
        guid: 'web-development',
        description: 'Web development topics',
        isActive: true,
      },
      {
        title: 'Tutorial',
        guid: 'tutorial',
        description: 'Step-by-step guides',
        isActive: true,
      }
    ]);

    // Find the Web Development category
    const category = await Category.findOne({ guid: 'web-development' });
    if (!category) {
      throw new Error('Web Development category not found');
    }

    // Create a rich blog post
    await Article.create({
      title: 'Building Modern Web Applications with React and Next.js',
      guid: 'building-modern-web-applications',
      description: 'A comprehensive guide to building scalable and performant web applications using React and Next.js',
      content: `# Building Modern Web Applications with React and Next.js

![Modern Web Development](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop)

In today's digital landscape, creating fast, responsive, and user-friendly web applications is crucial. This comprehensive guide will walk you through building modern web applications using React and Next.js, two powerful technologies that work seamlessly together.

## Why Choose React and Next.js?

React has revolutionized how we build user interfaces, while Next.js takes it further by providing:

- 🚀 **Server-Side Rendering (SSR)** for better performance
- 📱 **Automatic Code Splitting** for faster page loads
- 🎯 **Zero Configuration** needed for most projects
- 🛠 **Built-in API Routes** for backend functionality
- 📦 **Static Site Generation (SSG)** capabilities

## Getting Started

### Prerequisites

Before we begin, make sure you have the following installed:

\`\`\`bash
node --version  # v18 or higher
npm --version   # v8 or higher
\`\`\`

### Setting Up Your Project

1. Create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-modern-app
cd my-modern-app
\`\`\`

2. Install additional dependencies:

\`\`\`bash
npm install @mui/material @emotion/react @emotion/styled
\`\`\`

## Project Structure

A well-organized project structure is crucial for maintainability:

\`\`\`
my-modern-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header/
│   ├── Footer/
│   └── shared/
├── lib/
│   └── utils/
└── public/
    └── images/
\`\`\`

## Building Your First Component

Let's create a reusable card component:

\`\`\`typescript
// components/shared/Card.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
}

export function BlogCard({ title, description, date }: BlogCardProps) {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {date}
        </Typography>
      </CardContent>
    </Card>
  );
}
\`\`\`

## Best Practices

### 1. Performance Optimization

- Use Image component for automatic optimization:
  \`\`\`jsx
  import Image from 'next/image'
  
  <Image
    src="/hero.jpg"
    alt="Hero"
    width={1200}
    height={600}
    priority
  />
  \`\`\`

### 2. State Management

- For small to medium applications, use React Context
- For larger applications, consider Redux Toolkit or Zustand

### 3. Styling Solutions

- CSS Modules for component-specific styles
- Tailwind CSS for utility-first styling
- Styled-components or Emotion for CSS-in-JS

## Deployment

Next.js applications can be deployed to various platforms:

1. **Vercel** (recommended)
   - Automatic deployments
   - Edge functions support
   - Analytics included

2. **Netlify**
   - Easy setup
   - Great for static sites
   - Serverless functions

## Conclusion

Building modern web applications with React and Next.js provides an excellent developer experience and results in performant, scalable applications. Remember to:

- ✅ Follow component best practices
- ✅ Optimize for performance
- ✅ Use TypeScript for type safety
- ✅ Implement proper error handling
- ✅ Write tests for critical functionality

## Next Steps

- Explore advanced Next.js features
- Learn about API routes
- Implement authentication
- Add a database
- Set up CI/CD pipelines

Happy coding! 🚀`,
      category: category._id,
      tags: tags.map(tag => tag._id),
      isActive: true,
      readingTime: 8,
      publishingDate: new Date(),
      coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop',
      likes: 5,
      shortDescription: 'A comprehensive guide to building scalable and performant web applications using React and Next.js',
      viewCount: 0,
      likedCount: 0,
    });

    console.log('Rich blog post created successfully');
  } catch (error) {
    console.error('Error creating rich blog post:', error);
  } finally {
    mongoose.connection.close();
  }
}

createRichBlogPost(); 
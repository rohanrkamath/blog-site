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

const articleSchema = new mongoose.Schema({
  title: String,
  guid: String,
  description: String,
  content: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  isActive: Boolean,
  readingTime: Number,
  publishingDate: Date,
});

const pageSchema = new mongoose.Schema({
  title: String,
  guid: String,
  content: String,
  isActive: Boolean,
});

const Category = mongoose.model('Category', categorySchema);
const Article = mongoose.model('Article', articleSchema);
const Page = mongoose.model('Page', pageSchema);

async function createSampleContent() {
  try {
    // Create a sample category
    const category = await Category.create({
      title: 'Web Development',
      guid: 'web-development',
      description: 'Articles about web development and programming',
      isActive: true,
    });

    // Create a sample article
    await Article.create({
      title: 'Getting Started with Next.js',
      guid: 'getting-started-with-nextjs',
      description: 'A comprehensive guide to building modern web applications with Next.js',
      content: `# Getting Started with Next.js

Next.js is a React framework that enables server-side rendering and static site generation. It's perfect for building modern web applications.

## Why Next.js?

- **Server-Side Rendering**: Better SEO and performance
- **Static Site Generation**: Fast loading times
- **API Routes**: Build your API alongside your frontend
- **File-based Routing**: Intuitive page structure

## Getting Started

1. Create a new Next.js project:
\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

2. Run the development server:
\`\`\`bash
cd my-app
npm run dev
\`\`\`

## Next Steps

- Learn about [Next.js routing](https://nextjs.org/docs/routing/introduction)
- Explore [API routes](https://nextjs.org/docs/api-routes/introduction)
- Check out [Next.js documentation](https://nextjs.org/docs)`,
      category: category._id,
      isActive: true,
      readingTime: 5,
      publishingDate: new Date(),
    });

    // Create a sample page
    await Page.create({
      title: 'About Me',
      guid: 'about-me',
      content: `# About Me

Welcome to my blog! I'm passionate about technology and love sharing my knowledge with others.

## My Journey

I started my journey in web development several years ago and have been exploring various technologies ever since.

## Skills

- Web Development
- JavaScript/TypeScript
- React/Next.js
- Node.js
- And more!

## Contact

Feel free to reach out to me through the contact form or social media links.`,
      isActive: true,
    });

    console.log('Sample content created successfully');
  } catch (error) {
    console.error('Error creating sample content:', error);
  } finally {
    mongoose.connection.close();
  }
}

createSampleContent(); 
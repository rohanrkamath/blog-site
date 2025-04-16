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
});

const Category = mongoose.model('Category', categorySchema);
const Article = mongoose.model('Article', articleSchema);

async function initializeContent() {
  try {
    // Create sample categories
    const categories = await Category.create([
      {
        title: 'Technology',
        guid: 'technology',
        description: 'Articles about technology and programming',
        isActive: true,
      },
      {
        title: 'Lifestyle',
        guid: 'lifestyle',
        description: 'Articles about lifestyle and personal development',
        isActive: true,
      },
    ]);

    // Create sample articles
    await Article.create([
      {
        title: 'Welcome to My Blog',
        guid: 'welcome-to-my-blog',
        description: 'An introduction to this blog platform',
        content: '# Welcome to My Blog\n\nThis is a sample article to get you started.',
        category: categories[0]._id,
        isActive: true,
        readingTime: 2,
      },
      {
        title: 'Getting Started with Next.js',
        guid: 'getting-started-with-nextjs',
        description: 'A beginner\'s guide to Next.js',
        content: '# Getting Started with Next.js\n\nNext.js is a React framework that enables server-side rendering and static site generation.',
        category: categories[0]._id,
        isActive: true,
        readingTime: 5,
      },
    ]);

    console.log('Content initialized successfully');
  } catch (error) {
    console.error('Error initializing content:', error);
  } finally {
    mongoose.connection.close();
  }
}

initializeContent(); 
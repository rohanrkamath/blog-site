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
});

const pageSchema = new mongoose.Schema({
  title: String,
  guid: String,
  content: String,
  isActive: Boolean,
});

const Category = mongoose.model('Category', categorySchema);
const Tag = mongoose.model('Tag', tagSchema);
const Article = mongoose.model('Article', articleSchema);
const Page = mongoose.model('Page', pageSchema);

async function createPersonalContent() {
  try {
    // Create personal blog categories
    const categories = await Category.create([
      {
        title: 'Software Engineering',
        guid: 'software-engineering',
        description: 'Articles about software development, best practices, and engineering culture',
        isActive: true,
      },
      {
        title: 'Tech Insights',
        guid: 'tech-insights',
        description: 'Thoughts and analysis on technology trends and innovations',
        isActive: true,
      }
    ]);

    // Create tags
    const tags = await Tag.create([
      {
        title: 'Engineering',
        guid: 'engineering',
        description: 'Software engineering topics',
        isActive: true,
      },
      {
        title: 'Career',
        guid: 'career',
        description: 'Career development in tech',
        isActive: true,
      },
      {
        title: 'Best Practices',
        guid: 'best-practices',
        description: 'Software development best practices',
        isActive: true,
      }
    ]);

    // Create About Me page
    await Page.create({
      title: 'About Me',
      guid: 'about-me',
      content: `# About Me

![Rohan Kamath](https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&h=600&fit=crop)

Hi, I'm Rohan Kamath, a passionate software engineer with a love for building innovative solutions and sharing knowledge with the developer community.

## My Journey

I've been fascinated by technology since my early years, which led me to pursue a career in software engineering. Throughout my journey, I've worked with various technologies and frameworks, always striving to learn and grow.

## What I Do

I specialize in:

- 💻 Full-Stack Development
- 🌐 Web Applications
- 📱 Mobile Development
- 🚀 Cloud Architecture
- 🔒 Security Best Practices

## My Tech Stack

- **Languages**: JavaScript/TypeScript, Python, Java
- **Frontend**: React, Next.js, Vue.js
- **Backend**: Node.js, Django, Spring Boot
- **Cloud**: AWS, Google Cloud
- **DevOps**: Docker, Kubernetes, CI/CD

## Professional Experience

I've had the privilege of working with various organizations, from startups to large enterprises, helping them build scalable and maintainable software solutions.

## Writing and Speaking

I regularly write about software development, technology trends, and career growth. You can find my thoughts here on my blog and on various tech platforms.

## Connect With Me

Feel free to reach out through:

- [Twitter](https://twitter.com/rohankamath)
- [LinkedIn](https://linkedin.com/in/rohankamath)
- [GitHub](https://github.com/rohankamath)
- Email: rohan@example.com

## Outside of Tech

When I'm not coding, you can find me:

- 📚 Reading tech books and articles
- 🎮 Gaming
- 🏃‍♂️ Running
- ✈️ Traveling and exploring new places`,
      isActive: true,
    });

    // Create a personal blog post
    await Article.create({
      title: 'The Evolution of Modern Software Engineering',
      guid: 'evolution-of-modern-software-engineering',
      description: 'Exploring how software engineering has evolved and where it\'s heading',
      content: `# The Evolution of Modern Software Engineering

![Software Engineering](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop)

Software engineering has come a long way from its early days of punch cards and assembly language. In this post, I'll share my perspectives on how our field has evolved and where it's heading.

## The Past: Foundation Years

When I first started programming, the landscape was vastly different:

- Monolithic architectures were the norm
- Waterfall methodology dominated
- Deployment cycles were measured in months
- Testing was often an afterthought

## The Present: Age of Innovation

Today, we're witnessing incredible advancements:

### 1. Cloud-Native Development
- Microservices architecture
- Containerization with Docker
- Orchestration with Kubernetes
- Serverless computing

### 2. DevOps Culture
- Continuous Integration/Deployment
- Infrastructure as Code
- Automated testing
- Monitoring and observability

### 3. Modern Development Practices
- Agile methodologies
- Test-Driven Development
- Pair programming
- Code reviews

## The Future: What's Next?

I believe the future of software engineering will be shaped by:

1. **AI-Assisted Development**
   - Intelligent code completion
   - Automated code review
   - Bug prediction and prevention

2. **Low-Code/No-Code**
   - Democratization of development
   - Faster prototyping
   - Increased accessibility

3. **Edge Computing**
   - Distributed systems
   - Real-time processing
   - IoT integration

## Best Practices for Modern Engineers

To stay relevant in this evolving landscape:

1. **Embrace Continuous Learning**
   - Follow tech blogs and newsletters
   - Participate in open source
   - Attend conferences and meetups

2. **Focus on Fundamentals**
   - Data structures and algorithms
   - System design principles
   - Security best practices

3. **Develop Soft Skills**
   - Communication
   - Collaboration
   - Problem-solving

## Conclusion

The field of software engineering continues to evolve at a rapid pace. By staying curious, adaptable, and focused on continuous learning, we can not only keep up with these changes but help shape the future of technology.

What are your thoughts on the evolution of software engineering? I'd love to hear your perspectives in the comments below.

Happy coding! 🚀`,
      category: categories[0]._id,
      tags: tags.map(tag => tag._id),
      isActive: true,
      readingTime: 7,
      publishingDate: new Date(),
      coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop',
      likes: 0,
    });

    console.log('Personal content created successfully');
  } catch (error) {
    console.error('Error creating personal content:', error);
  } finally {
    mongoose.connection.close();
  }
}

createPersonalContent(); 
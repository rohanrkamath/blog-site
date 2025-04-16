const mongoose = require('mongoose');
require('dotenv').config();

// Define schemas
const articleSchema = new mongoose.Schema({
  title: String,
  shortDescription: String,
  content: String,
  guid: String,
  publishingDate: { type: Date, default: Date.now },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  coverImage: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
  isShow: { type: Boolean, default: true },
  viewIPs: { type: [String], default: [] },
  likedIPs: { type: [String], default: [] },
  viewCount: { type: Number, default: 0 },
  likedCount: { type: Number, default: 0 }
});

const Article = mongoose.model('Article', articleSchema);

async function createExampleBlog() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    await Article.create({
      title: 'The Art of Writing Clean Code',
      guid: 'art-of-writing-clean-code',
      shortDescription: 'A comprehensive guide to writing maintainable, readable, and efficient code that stands the test of time.',
      content: `# The Art of Writing Clean Code

![Clean Code](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop)

Writing clean code is an art that goes beyond making your program work. It's about crafting something that humans can understand, maintain, and build upon. In this comprehensive guide, we'll explore the principles and practices that lead to cleaner, more maintainable code.

## Why Clean Code Matters

Think of code as a story. Like any good story, it should flow naturally, be easy to follow, and leave a lasting impression. Clean code isn't just about aesthetics—it's about:

- **Maintainability**: Making future changes easier
- **Readability**: Helping others understand your intentions
- **Reliability**: Reducing bugs and technical debt
- **Efficiency**: Optimizing performance without sacrificing clarity

## Core Principles of Clean Code

### 1. Meaningful Names

Names are the first step to clear communication in code. Consider these examples:

\`\`\`javascript
// Bad
const x = user.p;
const arr = ['John', 'Jane', 'Bob'];

// Good
const userPermissions = user.permissions;
const employeeNames = ['John', 'Jane', 'Bob'];
\`\`\`

### 2. Function Design

Functions should be small, focused, and do one thing well. Here's a practical example:

\`\`\`javascript
// Bad
function processUser(user) {
  // Validate user
  if (!user.name || !user.email) throw new Error('Invalid user');
  
  // Update database
  db.users.update(user);
  
  // Send notification
  mailer.send(user.email, 'Profile Updated');
}

// Good
function validateUser(user) {
  if (!user.name || !user.email) throw new Error('Invalid user');
}

function updateUserInDatabase(user) {
  return db.users.update(user);
}

function notifyUserOfUpdate(user) {
  return mailer.send(user.email, 'Profile Updated');
}

async function processUser(user) {
  validateUser(user);
  await updateUserInDatabase(user);
  await notifyUserOfUpdate(user);
}
\`\`\`

## Code Organization

### The Power of White Space

Like paragraphs in a book, proper spacing helps readers digest information in chunks:

\`\`\`javascript
class UserManager {
  constructor(database) {
    this.db = database;
    this.cache = new Map();
  }

  async getUser(id) {
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }

    const user = await this.db.users.findById(id);
    this.cache.set(id, user);
    
    return user;
  }

  async updateUser(id, data) {
    const user = await this.getUser(id);
    Object.assign(user, data);
    
    await this.db.users.update(id, user);
    this.cache.set(id, user);
    
    return user;
  }
}
\`\`\`

## Best Practices for Clean Code

### 1. DRY (Don't Repeat Yourself)

Duplication is the root of maintenance nightmares. Extract common patterns:

\`\`\`javascript
// Before
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validateUsername(username) {
  const regex = /^[a-zA-Z0-9_]{3,16}$/;
  return regex.test(username);
}

// After
const validators = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  username: /^[a-zA-Z0-9_]{3,16}$/
};

function validate(type, value) {
  return validators[type].test(value);
}
\`\`\`

### 2. SOLID Principles in Practice

Let's look at the Single Responsibility Principle:

\`\`\`typescript
// Bad
class User {
  constructor(private db: Database) {}
  
  async save() {
    await this.db.save(this);
    await this.sendEmail();
    await this.logActivity();
  }
  
  private async sendEmail() { /* ... */ }
  private async logActivity() { /* ... */ }
}

// Good
class User {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService,
    private activityLogger: ActivityLogger
  ) {}
  
  async save() {
    await this.userRepository.save(this);
    await this.emailService.sendWelcomeEmail(this);
    await this.activityLogger.log('user_created', this);
  }
}
\`\`\`

## Common Clean Code Patterns

### Error Handling

Proper error handling makes code more robust and maintainable:

\`\`\`javascript
class ApiError extends Error {
  constructor(message, public statusCode: number) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchUserData(userId) {
  try {
    const response = await api.get(\`/users/\${userId}\`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new ApiError('User not found', 404);
    }
    throw new ApiError('Failed to fetch user data', 500);
  }
}
\`\`\`

## Conclusion

Writing clean code is a journey, not a destination. It requires constant practice, review, and refinement. Remember:

1. Code is read more often than it's written
2. Clarity trumps cleverness
3. Small, focused functions are easier to understand
4. Proper naming saves hours of confusion
5. Consistency in style matters

What are your thoughts on clean code? What practices have you found most helpful in your development journey? Share your experiences in the comments below!

Happy coding! 🚀`,
      publishingDate: new Date(),
      categories: [],
      tags: [],
      isShow: true
    });

    console.log('Example blog post created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating example blog:', error);
    process.exit(1);
  }
}

createExampleBlog(); 
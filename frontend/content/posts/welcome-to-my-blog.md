---
title: "Welcome to My Blog"
description: "This is my first blog post on the new static blog system. Learn about the features and how to create content."
date: "2024-01-15"
tags: ["blog"]
categories: ["general"]
published: true
---

# Welcome to My Blog

Hello and welcome to my new blog! This is built using Next.js as a static site generator with markdown files for content management.

## Features

This blog includes several great features:

- **Static Site Generation**: Fast loading times and great SEO
- **Markdown Support**: Write content in markdown with frontmatter
- **Syntax Highlighting**: Code blocks are beautifully highlighted
- **Tags and Categories**: Organize your content
- **Reading Time**: Automatic reading time calculation
- **Responsive Design**: Looks great on all devices

## Writing Content

To create a new blog post, simply create a new markdown file in the `content/posts` directory with the following frontmatter:

```markdown
---
title: "Your Post Title"
description: "A brief description of your post"
date: "2024-01-15"
tags: ["tag1", "tag2"]
categories: ["category1"]
published: true
---

Your content goes here...
```

## Code Examples

Here's a simple JavaScript function:

```javascript
function greetUser(name) {
  return `Hello, ${name}! Welcome to my blog.`;
}

console.log(greetUser("Reader"));
```

And here's some Python:

```python
def calculate_reading_time(content):
    words = len(content.split())
    minutes = words / 200  # Average reading speed
    return f"{round(minutes)} min read"
```

## What's Next?

I'll be writing about:

- Web development tips and tricks
- Technology insights
- Personal projects and learnings
- Industry trends and opinions

Stay tuned for more content!

## Conclusion

Thanks for visiting my blog. I hope you find the content useful and engaging. Feel free to reach out if you have any questions or suggestions.

Happy reading! 📚 
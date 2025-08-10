#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get post title from command line arguments
const postTitle = process.argv[2];

if (!postTitle) {
  console.error('Please provide a post title:');
  console.error('node scripts/new-post.js "Your Post Title"');
  process.exit(1);
}

// Generate slug from title
const slug = postTitle
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

// Get current date
const currentDate = new Date().toISOString().split('T')[0];

// Create post template
const postTemplate = `---
title: "${postTitle}"
description: "Add a brief description of your post here"
date: "${currentDate}"
tags: ["tag1", "tag2"]
categories: ["category1"]
published: true
---

# ${postTitle}

Write your content here...

## Section 1

Your content goes here.

## Section 2

More content...

## Conclusion

Wrap up your post here.
`;

// Create posts directory if it doesn't exist
const postsDir = path.join(process.cwd(), 'content', 'posts');
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

// Create the post file
const postPath = path.join(postsDir, `${slug}.md`);

if (fs.existsSync(postPath)) {
  console.error(`Post with slug "${slug}" already exists!`);
  process.exit(1);
}

fs.writeFileSync(postPath, postTemplate);

console.log(`✅ New post created: ${postPath}`);
console.log(`📝 Edit the file to add your content`);
console.log(`🚀 Run 'npm run dev' to see it in your blog`); 
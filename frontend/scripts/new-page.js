#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get page title from command line arguments
const pageTitle = process.argv[2];

if (!pageTitle) {
  console.error('Please provide a page title:');
  console.error('node scripts/new-page.js "Your Page Title"');
  process.exit(1);
}

// Generate slug from title
const slug = pageTitle
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

// Get current date
const currentDate = new Date().toISOString().split('T')[0];

// Create page template
const pageTemplate = `---
title: "${pageTitle}"
description: "Add a brief description of your page here"
date: "${currentDate}"
published: true
---

# ${pageTitle}

Write your page content here...

## Section 1

Your content goes here.

## Section 2

More content...
`;

// Create pages directory if it doesn't exist
const pagesDir = path.join(process.cwd(), 'content', 'pages');
if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

// Create the page file
const pagePath = path.join(pagesDir, `${slug}.md`);

if (fs.existsSync(pagePath)) {
  console.error(`Page with slug "${slug}" already exists!`);
  process.exit(1);
}

fs.writeFileSync(pagePath, pageTemplate);

console.log(`✅ New page created: ${pagePath}`);
console.log(`📝 Edit the file to add your content`);
console.log(`🚀 Add a route in src/app/${slug}/page.tsx to make it accessible`); 
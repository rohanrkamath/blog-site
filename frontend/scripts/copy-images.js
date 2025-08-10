#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const contentImagesDir = path.join(process.cwd(), 'content/images');
const publicImagesDir = path.join(process.cwd(), 'public/images');

// Create public/images directory if it doesn't exist
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
  console.log('Created public/images directory');
}

// Copy images from content to public
function copyImages() {
  if (!fs.existsSync(contentImagesDir)) {
    console.log('No content/images directory found. Creating...');
    fs.mkdirSync(contentImagesDir, { recursive: true });
    return;
  }

  const files = fs.readdirSync(contentImagesDir);
  
  files.forEach(file => {
    const sourcePath = path.join(contentImagesDir, file);
    const destPath = path.join(publicImagesDir, file);
    
    if (fs.statSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied: ${file}`);
    }
  });
  
  console.log('Image copy complete!');
}

// Run the copy function
copyImages(); 
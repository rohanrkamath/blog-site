# Static Blog Frontend

A modern, fast, and SEO-friendly blog built with Next.js and markdown files. No backend required!

## Features

- ✅ **Static Site Generation**: Lightning-fast performance
- ✅ **Markdown Content**: Write posts in markdown with frontmatter
- ✅ **TypeScript Support**: Full type safety
- ✅ **SEO Optimized**: Meta tags, sitemaps, and structured data
- ✅ **Responsive Design**: Looks great on all devices
- ✅ **Syntax Highlighting**: Beautiful code blocks
- ✅ **Reading Time**: Automatic reading time calculation
- ✅ **Tags & Categories**: Organize your content
- ✅ **Zero Config Deployment**: Deploy to Vercel with one click

## Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
frontend/
├── content/
│   ├── posts/          # Blog posts in markdown
│   └── pages/          # Static pages in markdown
├── public/             # Static assets
├── scripts/            # Content management scripts
├── src/
│   ├── app/            # Next.js app router pages
│   ├── components/     # Reusable components
│   ├── lib/            # Utility functions
│   └── styles/         # Global styles
├── next.config.js      # Next.js configuration
└── package.json        # Dependencies and scripts
```

## Content Management

### Creating Blog Posts

Use the built-in script to create new blog posts:

```bash
npm run new-post "Your Amazing Blog Post Title"
```

This creates a new markdown file in `content/posts/` with the proper frontmatter template.

### Manual Post Creation

Create a new `.md` file in `content/posts/` with this frontmatter:

```markdown
---
title: "Your Post Title"
description: "Brief description of your post"
date: "2024-01-15"
tags: ["tag1", "tag2"]
categories: ["category1"]
published: true
---

# Your Post Title

Your content goes here...
```

### Creating Pages

For static pages like "About" or "Contact":

```bash
npm run new-page "About Me"
```

Then create a corresponding page component in `src/app/about/page.tsx`.

### Frontmatter Fields

- `title`: Post/page title (required)
- `description`: Meta description for SEO (required)
- `date`: Publication date in YYYY-MM-DD format (required)
- `tags`: Array of tags (optional)
- `categories`: Array of categories (optional)
- `published`: Boolean to show/hide content (default: true)
- `coverImage`: Path to cover image (optional)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Export static site
- `npm run new-post "Title"` - Create new blog post
- `npm run new-page "Title"` - Create new page

### Styling

The project uses:
- **Tailwind CSS** for utility-first styling
- **Custom CSS** for markdown content styling
- **Inline styles** for component-specific styling

### Adding Images

1. Add images to the `public/images/` directory
2. Reference them in markdown: `![Alt text](/images/your-image.jpg)`
3. Or use Next.js Image component in React components

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deployment

1. Build the static site:
```bash
npm run build
```

2. The `out/` directory contains the static files
3. Deploy the `out/` directory to any static hosting service

### Other Platforms

- **Netlify**: Drag and drop the `out/` folder
- **GitHub Pages**: Use GitHub Actions to deploy
- **AWS S3**: Upload the `out/` folder to an S3 bucket
- **Any CDN**: Upload static files to your preferred CDN

## Configuration

### Site Configuration

Edit `src/config.ts` to update:
- Site title and description
- Author information
- Social media links
- Page size and other settings

### Next.js Configuration

The `next.config.js` is configured for static export:
- `output: 'export'` - Generates static files
- `images.unoptimized: true` - Required for static export
- `trailingSlash: true` - Ensures consistent URLs

## SEO Features

- **Meta tags**: Automatic generation from frontmatter
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Structured data**: JSON-LD for search engines
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine crawling instructions

## Performance

- **Static Generation**: All pages pre-generated at build time
- **Image Optimization**: Automatic image optimization (when not using static export)
- **Code Splitting**: Automatic code splitting by Next.js
- **Tree Shaking**: Unused code elimination
- **Minification**: Automatic CSS and JS minification

## Customization

### Styling

1. **Global Styles**: Edit `src/app/globals.css`
2. **Component Styles**: Use Tailwind classes or styled-components
3. **Markdown Styles**: Update the `.prose` classes in globals.css

### Layout

1. **Header/Footer**: Edit `src/app/layout.tsx`
2. **Home Page**: Edit `src/app/page.tsx`
3. **Post Layout**: Edit `src/app/posts/[slug]/page.tsx`

### Adding Features

1. **Comments**: Integrate with services like Disqus or Utterances
2. **Analytics**: Add Google Analytics or other tracking
3. **Search**: Implement client-side search with libraries like Fuse.js
4. **Newsletter**: Add newsletter signup forms
5. **Dark Mode**: Implement theme switching

## Troubleshooting

### Common Issues

1. **Build Errors**: Check your markdown frontmatter syntax
2. **Missing Posts**: Ensure `published: true` in frontmatter
3. **Image Issues**: Use absolute paths from `/public/`
4. **TypeScript Errors**: Run `npm run lint` to check for issues

### Getting Help

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review the [markdown processing code](src/lib/markdown.ts)
- Open an issue in the repository

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the [Your License] - see the LICENSE file for details.

## Acknowledgments

- **Next.js** - The React framework for production
- **Remark** - Markdown processing
- **Gray Matter** - Frontmatter parsing
- **Tailwind CSS** - Utility-first CSS framework
- **Vercel** - Deployment platform 
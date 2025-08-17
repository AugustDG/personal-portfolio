# Personal Portfolio

Welcome to the repository of my personal portfolio!

Although, it's built with modern web tools, my aim is not to showcase my web development skills, so I let Github Copilot do the heavy lifting and focused on the content and features.

## Tools

- Next.js
- Tailwind CSS
- TypeScript
- React
- GitHub Copilot

## Features

- Projects with featured grid + list
- Project detail basics (timeline, collaborators, tools, tags)
- Blog (listing + detail w/ reading time) – rich markdown & code highlight
- Photos (listing + photos detail with images)
- Global client-side search (projects/blogs/photos) via MiniSearch
- Directus CMS integration (fetching public collections via REST)
- Lightbox / zoomable images (pan/zoom)
- Embed video, code blocks (MDX or react-markdown + remark/rehype plugins)
- Animations (Framer Motion)
- Search indexing server action + incremental updates
- Accessibility (color palette & focus mode)
- Google Analytics integration with environment variable configuration

## Environment Setup

Copy `.env.example` to `.env.local` and configure the following variables:

### Google Analytics (Optional)
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```
Replace with your Google Analytics 4 Measurement ID. If not provided, no tracking scripts will be loaded.

### Other Variables
See `.env.example` for additional configuration options.

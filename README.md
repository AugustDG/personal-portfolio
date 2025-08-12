## Retro Portfolio (Work in Progress)

Early scaffold for the retro colorful redesign using Next.js App Router + Tailwind.

Features in progress:

- Projects with featured grid + list
- Project detail basics (timeline, collaborators, tools, tags)
- Blog (listing + detail w/ reading time) – rich markdown & code highlight TODO
- Photos (listing + gallery detail with images)
- Global client-side search (projects/blogs/photos) via MiniSearch
- Directus CMS integration (fetching public collections via REST)

Upcoming tasks:

- Lightbox / zoomable images (planned component with portal + pan/zoom)
- Embed video, code blocks (MDX or react-markdown + remark/rehype plugins)
- Color palette per project (apply dynamic CSS variables)
- Animations polish (Framer Motion variants)
- Search indexing server action + incremental updates
- Accessibility + keyboard navigation for search & lightbox

Environment variables:

```
DIRECTUS_URL=https://your-directus-instance
```

Dev:

```
npm install
npm run dev
```

This is an interim commit; types around Directus simplified pending schema typing.

# Architecture

## Content System

The blog uses Astro's Content Collections API for type-safe content management:

- **Schema**: Defined in `src/content/config.ts` with Zod validation
- **Posts**: Located in `src/content/posts/*.mdx` with frontmatter validation
- **Draft filtering**: Posts with `draft: true` are excluded from production builds (filtered in RSS, search index, and post listings)

## Routing

- **Homepage**: `src/pages/index.astro` - Lists all published posts
- **Post pages**: `src/pages/[...slug].astro` - Dynamic catch-all route using `getStaticPaths()` from content collection
- **Tag pages**: `src/pages/tags/[tag].astro` - Dynamic tag filtering
- **RSS feed**: `src/pages/rss.xml.ts` - API route generating RSS XML
- **Search index**: `src/pages/search.json.ts` - API route generating JSON for client-side search

## Search Implementation

Client-side search without external dependencies:

1. `src/pages/search.json.ts` generates a JSON index of all posts at build time
2. `src/components/Search.astro` fetches `/search.json` and filters in-browser
3. Searches across title, description, and tags with instant results

## Layouts

- **BaseLayout**: `src/layouts/BaseLayout.astro` - HTML shell, SEO tags, dark mode setup
- **PostLayout**: `src/layouts/PostLayout.astro` - Blog post template with Giscus comments

## Styling

- Tailwind CSS 4.x with `@tailwindcss/vite` plugin
- Dark mode via `class` strategy (toggled with `ThemeToggle.astro`)
- Typography with Tailwind's `prose` classes for MDX content

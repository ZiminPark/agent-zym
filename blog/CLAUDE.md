# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Astro-powered static blog for the agent-zym Claude Code plugin marketplace. Deployed to https://zimmy.dev with Vercel.

## Quick References

Please refer to the following documents in the `docs/` directory for detailed information:

- **[Architecture](docs/architecture.md)**: Details about content system, routing, search implementation, layouts, and styling.
- **[Writing Posts](docs/writing_posts.md)**: Guide on how to create, format, and organize MDX blog posts.
- **[Deployment](docs/deployment.md)**: Information about Vercel deployment and debugging failures.
- **[Comments](docs/comments.md)**: Steps to configure and integrate Giscus comments.

## Requirements

- requirements for building blogs are in the `requirements/` directory.
- all blog pages and UI updates must be mobile-friendly and responsive by default (mobile-first, then tablet/desktop).
- write blog code with responsive layouts in mind so it works cleanly on mobile, tablet, and desktop.

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

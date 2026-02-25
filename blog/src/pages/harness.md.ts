import type { APIRoute } from 'astro';
import { buildLlmContextDocument } from '../lib/llm-context';
import { buildHarnessFullGuideMarkdown } from '../lib/harness-markdown';

export const GET: APIRoute = async ({ site, url }) => {
  const canonicalURL = new URL('/harness', site ?? url).toString();
  const content = buildLlmContextDocument({
    title: 'Harness — Full Guide',
    url: canonicalURL,
    tags: ['harness', 'coding-agent', 'workflow', 'full-guide'],
    hint: 'Use this full workflow guide as source context and preserve section structure.',
    content: buildHarnessFullGuideMarkdown(),
  });

  return new Response(content, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  });
};

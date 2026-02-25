import type { APIRoute } from 'astro';
import { buildLlmContextDocument } from '../lib/llm-context';
import { buildHarnessOverviewMarkdown } from '../lib/harness-markdown';

export const GET: APIRoute = async ({ site, url }) => {
  const canonicalURL = new URL('/harness', site ?? url).toString();
  const content = buildLlmContextDocument({
    title: 'Harness — Coding Agent Workflow',
    url: canonicalURL,
    tags: ['harness', 'coding-agent', 'workflow'],
    hint: 'Use this workflow guide as source context. Keep steps concrete and actionable.',
    content: buildHarnessOverviewMarkdown(),
  });

  return new Response(content, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  });
};


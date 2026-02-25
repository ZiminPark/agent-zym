import type { APIRoute, GetStaticPaths } from 'astro';
import { sections, type HarnessSection } from '../../data/harness';
import { buildLlmContextDocument } from '../../lib/llm-context';
import { renderReferencesMarkdown, renderSectionMarkdown } from '../../lib/harness-markdown';

interface Props {
  section: HarnessSection;
}

export const getStaticPaths: GetStaticPaths = () => {
  return sections.map((section) => ({
    params: { section: section.slug },
    props: { section },
  }));
};

export const GET: APIRoute<Props> = async ({ props, site, url }) => {
  const { section } = props;
  const canonicalURL = new URL(`/harness/${section.slug}`, site ?? url).toString();
  const sectionContent = [
    'This is a focused section from the Harness workflow.',
    '',
    renderSectionMarkdown(section),
    renderReferencesMarkdown(),
  ]
    .join('\n')
    .trim();

  const content = buildLlmContextDocument({
    title: `${section.title} — Harness`,
    url: canonicalURL,
    tags: ['harness', 'coding-agent', section.slug],
    hint: 'Use this focused section as execution context and keep recommendations concrete.',
    content: sectionContent,
  });

  return new Response(content, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  });
};


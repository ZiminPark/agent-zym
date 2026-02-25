import { getCollection, type CollectionEntry } from 'astro:content';
import type { APIRoute } from 'astro';
import { buildLlmContextDocument } from '../lib/llm-context';

interface Props {
  post: CollectionEntry<'posts'>;
}

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => data.draft !== true);
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

export const GET: APIRoute<Props> = async ({ props, site, url }) => {
  const { post } = props;
  const canonicalPath = `/${post.slug}`;
  const canonicalURL = new URL(canonicalPath, site ?? url).toString();
  const publishedISO = new Date(post.data.pubDate).toISOString();
  const content = buildLlmContextDocument({
    title: post.data.title,
    url: canonicalURL,
    published: publishedISO,
    tags: post.data.tags,
    content: post.body,
  });

  return new Response(content, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  });
};

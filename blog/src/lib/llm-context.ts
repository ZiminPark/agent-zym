export interface LlmContextDocumentOptions {
  title: string;
  url: string;
  content: string;
  published?: string;
  tags?: string[];
  hint?: string;
}

const DEFAULT_HINT = 'Use this article as source context. Quote accurately when needed.';

export function buildLlmContextDocument(options: LlmContextDocumentOptions): string {
  const { title, url, content, published, tags = [], hint = DEFAULT_HINT } = options;
  const lines = [`# Context: ${title}`, `- URL: ${url}`];

  if (published) {
    lines.push(`- Published: ${published}`);
  }

  lines.push(`- Tags: ${tags.length > 0 ? tags.join(', ') : 'none'}`);
  lines.push('');
  lines.push('## User intent hint');
  lines.push(hint);
  lines.push('');
  lines.push('## Article content');
  lines.push(content.trim());
  lines.push('');

  return lines.join('\n');
}


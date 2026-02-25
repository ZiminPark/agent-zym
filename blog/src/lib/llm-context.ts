export interface LlmContextDocumentOptions {
  title: string;
  url: string;
  content: string;
  published?: string;
  tags?: string[];
  hint?: string;
}

const DEFAULT_HINT = 'Use this article as source context. Quote accurately when needed.';
const MAX_HYPERLINKS = 60;

interface HyperlinkItem {
  label: string;
  url: string;
}

function normalizeHttpUrl(raw: string, baseUrl: string): string | null {
  try {
    const resolved = new URL(raw, baseUrl);
    if (resolved.protocol !== 'http:' && resolved.protocol !== 'https:') {
      return null;
    }
    return resolved.toString();
  } catch {
    return null;
  }
}

function extractLinkDestination(destination: string): string {
  const trimmed = destination.trim();
  const unwrapped = trimmed.startsWith('<') && trimmed.endsWith('>') ? trimmed.slice(1, -1).trim() : trimmed;
  const token = unwrapped.match(/^\S+/);
  return token ? token[0] : '';
}

function normalizeLabel(label: string): string {
  return label.replace(/\s+/g, ' ').trim();
}

function trimTrailingPunctuation(url: string): string {
  return url.replace(/[),.;!?]+$/g, '');
}

// 1-depth only: extract links present in this document, without fetching linked pages.
export function extractOneDepthHyperlinks(content: string, baseUrl: string): HyperlinkItem[] {
  const hyperlinks: HyperlinkItem[] = [];
  const seen = new Set<string>();

  const pushLink = (label: string, rawUrl: string) => {
    if (hyperlinks.length >= MAX_HYPERLINKS) return;
    const normalizedUrl = normalizeHttpUrl(trimTrailingPunctuation(rawUrl), baseUrl);
    if (!normalizedUrl || seen.has(normalizedUrl)) return;
    seen.add(normalizedUrl);
    hyperlinks.push({
      label: normalizeLabel(label) || 'Link',
      url: normalizedUrl,
    });
  };

  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  for (const match of content.matchAll(markdownLinkRegex)) {
    const label = match[1] ?? '';
    const destination = extractLinkDestination(match[2] ?? '');
    if (!destination) continue;
    pushLink(label, destination);
  }

  const markdownRefRegex = /^\[([^\]]+)\]:\s*(\S+)/gm;
  for (const match of content.matchAll(markdownRefRegex)) {
    const label = match[1] ?? '';
    const destination = match[2] ?? '';
    if (!destination) continue;
    pushLink(label, destination);
  }

  const autoLinkRegex = /<((?:https?:\/\/)[^>\s]+)>/g;
  for (const match of content.matchAll(autoLinkRegex)) {
    const destination = match[1] ?? '';
    if (!destination) continue;
    pushLink(destination, destination);
  }

  const bareUrlRegex = /\bhttps?:\/\/[^\s<>()]+/g;
  for (const match of content.matchAll(bareUrlRegex)) {
    const destination = match[0] ?? '';
    if (!destination) continue;
    pushLink(destination, destination);
  }

  return hyperlinks;
}

export function buildLlmContextDocument(options: LlmContextDocumentOptions): string {
  const { title, url, content, published, tags = [], hint = DEFAULT_HINT } = options;
  const hyperlinks = extractOneDepthHyperlinks(content, url);
  const lines = [`# Context: ${title}`, `- URL: ${url}`];

  if (published) {
    lines.push(`- Published: ${published}`);
  }

  lines.push(`- Tags: ${tags.length > 0 ? tags.join(', ') : 'none'}`);
  lines.push('');
  lines.push('## User intent hint');
  lines.push(hint);
  lines.push('');
  if (hyperlinks.length > 0) {
    lines.push('## Hyperlinks (1-depth)');
    for (const link of hyperlinks) {
      lines.push(`- ${link.label}: ${link.url}`);
    }
    lines.push('');
  }
  lines.push('## Article content');
  lines.push(content.trim());
  lines.push('');

  return lines.join('\n');
}

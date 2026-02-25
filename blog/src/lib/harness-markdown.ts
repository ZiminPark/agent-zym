import { references, sections, type HarnessItem, type HarnessSection } from '../data/harness';

function renderItem(item: HarnessItem, index: number): string {
  const lines = [`${index + 1}. ${item.text}`];

  if (item.subItems && item.subItems.length > 0) {
    for (const subItem of item.subItems) {
      lines.push(`   - ${subItem}`);
    }
  }

  if (item.link) {
    lines.push(`   - Reference: ${item.link}`);
  }

  if (item.image) {
    lines.push(`   - Image: ${item.image.alt} (asset: ${item.image.src})`);
  }

  return lines.join('\n');
}

export function renderSectionMarkdown(section: HarnessSection): string {
  const lines = [
    `## ${String(section.number).padStart(2, '0')}. ${section.title}`,
    section.summary,
    '',
    ...section.items.map((item, index) => renderItem(item, index)),
    '',
  ];

  return lines.join('\n');
}

export function renderReferencesMarkdown(): string {
  if (references.length === 0) {
    return '';
  }

  const lines = ['## References', ...references.map((ref, index) => `${index + 1}. [${ref.title}](${ref.url}) (${ref.domain})`), ''];
  return lines.join('\n');
}

export function buildHarnessOverviewMarkdown(): string {
  const lines = [
    'Harness is a workflow for operating coding agents effectively from setup to compounding.',
    '',
    '## Workflow sections',
    ...sections.map((section) => `- ${String(section.number).padStart(2, '0')}. ${section.title}: ${section.summary}`),
    '',
    renderReferencesMarkdown(),
  ];

  return lines.join('\n').trim();
}

export function buildHarnessFullGuideMarkdown(): string {
  const lines = [
    'This is the full Harness guide across all six sections.',
    '',
    ...sections.map((section) => renderSectionMarkdown(section)),
    renderReferencesMarkdown(),
  ];

  return lines.join('\n').trim();
}


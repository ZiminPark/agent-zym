---
name: request-explainer-html
description: Turn a request, requirement, spec, or concept into a single self-contained HTML file that explains it visually and clearly — TL;DR, problem framing, breakdown, inline-SVG diagrams, concrete examples, optional glossary and FAQ. Use when the user asks for an "HTML explainer", "쉽게 설명하는 HTML", "한 페이지 설명서", "비개발자도 이해할 수 있게 HTML", "visual explanation document", or a standalone HTML document that breaks down a request.
---

# Request Explainer HTML

## Overview

Produce a single self-contained `.html` file that explains the user's request, requirement, or concept so that a non-expert can understand it on first read. The output must work as one file: embedded CSS, embedded JS only if needed, inline SVG for diagrams, no external image dependencies unless absolutely necessary.

## When to use this skill

Trigger when the user wants:

- An HTML file that **explains** a request, requirement, RFC, or concept (not a generic landing page or marketing site)
- A document a non-developer (PM, designer, client, stakeholder) can read on its own
- A single-file artifact that opens in any browser, no build step

If the user wants a slide image instead of HTML, prefer the `visual-summary` skill. If the user wants a full multi-page site, this skill is not the right fit.

## Operating principles

1. **Clarity above all** — plain language, define jargon inline, assume zero prior context.
2. **Visual hierarchy** — clear headings, callouts, progressive disclosure from general to specific.
3. **Show, don't just tell** — inline SVG diagrams, before/after panels, flowcharts, analogies.
4. **Self-contained** — one file. CSS in `<style>`, JS in `<script>`, SVG inline.
5. **Responsive and accessible** — semantic HTML5, ≥16px body text, sufficient contrast, ARIA labels where helpful.

## Required structure

Adapt to the request, but typically include:

1. **Title + TL;DR** — one-paragraph summary at the top.
2. **The problem / why** — what does this address, why does it matter.
3. **The request itself** — clear bullets or numbered steps.
4. **How it works** — visual or step-by-step walkthrough with at least one diagram.
5. **Examples / use cases** — concrete scenarios.
6. **Key terms** (if needed) — small glossary.
7. **FAQ** (optional) — anticipate obvious questions.

## Design guidelines

- **Palette**: calm professional colors (soft blues/greens primary, warm accents for callouts).
- **Typography**: system stack — `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.
- **Layout**: centered, max-width ~800px, generous whitespace.
- **Callouts**: styled boxes with colored left border + icon (inline SVG or emoji).
- **Code**: `<pre><code>` with monospace and subtle background.
- **Diagrams**: prefer inline SVG over external images.

## Language handling

Match the language of the user's request.

- Korean input → Korean HTML, set `<html lang="ko">`, natural conversational tone.
- English input → English HTML, `<html lang="en">`.

## Workflow

1. **Clarify** — read the input carefully. If the request is ambiguous (e.g. "explain my idea" with no idea given), ask one or two focused questions before generating.
2. **Outline** — decide which sections apply and what visuals would help.
3. **Draft** — write the full HTML with embedded CSS and inline SVG.
4. **Self-review** — verify:
   - Does the TL;DR make the request clear in under 30 seconds?
   - Is there at least one visual and one concrete example?
   - Does it render correctly as a standalone `.html`?
   - Is the tone appropriate for a non-expert?
   - Is the markup valid and accessible?
5. **Deliver** — save with a descriptive filename like `request-explanation-<topic>.html` in the current working directory unless the user specifies otherwise. Print a one-line summary of what was created and the path.

## Quality checks

- **Readability**: could a smart 15-year-old understand this on first read?
- **Visual**: enough visuals that someone scanning gets the gist?
- **Standalone**: renders offline (except for any explicitly used CDN)?
- **Brevity**: every section earns its place — cut filler.

## When to ask before generating

Ask one or two focused questions only if:

- The thing to explain is genuinely missing or too vague.
- The target audience would materially change the depth (engineers vs. executives vs. customers).
- The user references data or context you don't have.

Otherwise generate confidently and note any assumptions at the end.

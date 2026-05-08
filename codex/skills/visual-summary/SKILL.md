---
name: visual-summary
description: Inspect a specific text block, diff, markdown document, requirements/spec, or implementation note, extract the core product/architecture/change story, propose a conservative one-slide visual layout, and optionally generate a presentation-ready image. Use when the user asks to explain dense text to teammates with a diagram, image, slide, visual summary, before/after layout, or "핵심만" visualization.
---

# Text Visual Summary

## Overview

Turn a specific text block, diff, markdown document, requirements/spec, or implementation note into a compact teammate-facing visual. Prefer one image/slide unless the input truly has two distinct stories that would become confusing on one canvas.

## Workflow

1. Inspect the input enough to understand the real story.
   - Use the provided text, linked file, diff, or focused surrounding context.
   - For requirements/spec markdown files, identify the core product or architecture flow, decision, and intended user/system impact.
   - Do not run tests unless the user explicitly asks; this skill is for explanation artifacts, not validation.
   - Avoid reviewing every line when the request is visual explanation. Gather just enough evidence to avoid misrepresenting the story.

2. Extract the core message.
   - State the change, requirement, or architecture story as one sentence.
   - Identify the primary before/after contrast.
   - Keep supporting details to 2-3 bullets.
   - Drop test logs, commit trivia, edge-case implementation detail, and long file lists unless they directly clarify the visual.

3. Choose slide count conservatively.
   - Default to 1 slide/image.
   - Use 2 only when there are two separate axes, such as architecture change plus runtime flow, and combining them would make the image crowded.
   - Do not use more than 2 unless the user explicitly asks.

4. Propose the layout before generating when the user asks for placement or when the visual could go several ways.
   - For storage, API, or architecture refactors: use side-by-side Before/After panels.
   - For flow changes: use left-to-right pipeline.
   - For policy or decision changes: use problem -> decision -> impact.
   - For UI changes: use before/after screen regions or state cards.

5. Generate the image when requested.
   - When the user asks to generate an image or presentation-ready visual, use the image generation model by default.
   - Do not hand-code SVG/HTML/canvas visuals unless the user explicitly asks for code-generated assets or the image generation model is unavailable.
   - After generation, copy the generated image into the current working directory (`pwd`) with a descriptive filename unless the user specifies another destination. Leave the original generated image in place.
   - Produce a clean 16:9 technical slide.
   - Use a white or very light background, restrained accent color, crisp typography, and ample spacing.
   - Make all text legible and short.
   - Do not include test execution, validation detail, or dense implementation notes unless requested.

## One-Slide Template

Use this structure for most inputs:

```text
[Title: one concrete change]

[Left panel: Before]        [Right panel: After]
short label                 short label
diagram/tree/flow           diagram/tree/flow
1-line caption              1-line caption

[Center arrow]
short transition label

[Bottom row]
3 compact takeaways
```

## Content Rules

- Prefer "what changed" over "how every file changed".
- Use concrete nouns from the source text: endpoint names, artifact names, folder names, state names.
- Keep labels human-facing; avoid internal helper names unless they are the concept being explained.
- If migration/backward compatibility exists, show it as a small bridge or note, not the main subject.
- If there is uncertainty, phrase it as a visual assumption before generation rather than embedding ambiguity in the image.

## Image Prompt Checklist

When calling image generation, include:

- Use the image generation model rather than code-generating the visual.
- `16:9 technical presentation slide`
- exact title text
- panel labels
- exact short diagram text
- bottom takeaways
- style constraints: clean, legible, no overlap, no excessive detail
- language preference matching the user, usually Korean for this workspace

## Example

For text explaining an artifact storage change:

```text
Title: RFP 산출물 저장 위치를 프로젝트 namespace로 이동
Before: working_folder/.contrl/rfp/{doc_id}-*.json
After: projects/{Project}/.contrl/{rfp,strategy,recommendation}/...
Arrow: read-time fallback + lazy migration
Takeaways:
- RFP 데이터가 프로젝트 소유로 정리
- 파일명 단순화
- 기존 사용자 데이터 호환 유지
```

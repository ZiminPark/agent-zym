---
name: linkedin-feed-brief
description: Collect and summarize LinkedIn home feed posts using the Playwright MCP. Use when you need to (1) open linkedin.com/feed, (2) extract N feed posts while scrolling, (3) exclude ads/"Promoted" and non-post modules (jobs, in-app promotions), and (4) produce a grouped brief with keywords, per-post core title + insight, and a source link (prefer permalink; fallback to URN-based feed/update URL).
---

# LinkedIn Feed Brief (Playwright MCP)

## Goal

Collect up to N LinkedIn feed posts reliably (collection is primary), filter out ads/modules, and output a brief in the user’s format:
`<전체 제목>` then `(카테고리(키워드 + (핵심 제목 + 핵심 인사이트 + 링크)*N))*M`.

Title guidance:
- Create a witty, feed-wide umbrella title, **or** pick one hooky theme that would make people stop scrolling on SNS.
- Keep it short (ideally 1 line) and specific (hint at a tension/tradeoff/trend).
- Avoid the word `AI` in the title (too obvious); use concrete nouns (e.g., agents, automation, governance, workflow) instead.

## Workflow

### 1) Navigate

- Use Playwright MCP to navigate to `https://www.linkedin.com/feed/`.
- If redirected to login, stop and ask the user to log in first.

### 2) Validate you are on the feed

- Confirm URL contains `/feed/` and the page shows the main nav + feed layout.
- If unsure, take a Playwright snapshot and verify the center column is the infinite scroll feed.

### 3) Collect posts (primary)

- Run the JS snippet in `scripts/extract_feed_posts.browser_run_code.js` via Playwright `browser_run_code`.
- Default: collect `N=20` unique posts by `data-urn`.
- Prefer DOM permalink (`/feed/update/...`); fallback to URN link if missing.

If collection returns 0 or times out:
- Avoid reading full `innerText` for large containers.
- Increase waits between scrolls (LinkedIn lazy-loads heavily).
- Click “New posts” if present, then retry.

### 4) Filter (required)

- Exclude “Promoted” posts.
- Exclude non-post modules like job cards and in-app promotions.
- Apply rules in `references/api_reference.md`.

### 5) Normalize links (required)

- **Preferred:** DOM permalink extracted from the post.
- **Fallback:** `https://www.linkedin.com/feed/update/{URN}/`

### 6) Write the brief (secondary)

- Categorize posts using the fixed taxonomy in `references/api_reference.md`.
- For each category:
  - `키워드`: 3–7 items, prefixed with a category-appropriate emoji.
  - Emoji rule: **do not reuse the same emoji across categories within the same brief**.
    - Example: `🧠 키워드: ...`, `🧰 키워드: ...`, `📈 키워드: ...`
  - For each post: `핵심 제목` + `핵심 인사이트` + `링크`
- Use `assets/example_asset.txt` as the output shape.

## Output format (must match)

```
<전체 제목>

🧩 카테고리명

🧠 키워드: k1 · k2 · k3 · ...
- 핵심 제목 / 핵심 인사이트 / 링크
- ...
```

## Notes / Guardrails

- Only collect what is visible on the page.
- If LinkedIn UI changes, update selectors and the extraction snippet first.

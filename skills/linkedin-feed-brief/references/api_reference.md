# LinkedIn Feed Collection Reference

This reference backs the `linkedin-feed-brief` skill.

## Core selectors (best-effort)

- Post containers: `div.occludable-update[data-urn]`
- Feed scroll containers (debug): `main div.scaffold-finite-scroll`, `div.scaffold-finite-scroll__content`
- Permalink candidates: `a[href*="/feed/update/"]`
- Text candidates: `div.update-components-text`, `div.feed-shared-update-v2__description`, `span.break-words`
- Author candidates: `span.update-components-actor__name`, `a.update-components-actor__meta-link span[dir="ltr"]`

## Filtering rules (required)

Exclude if any of the following match:

- Label text equals `Promoted` (also accept `홍보`, `스폰서`)
- URN patterns:
  - `urn:li:inAppPromotion:*`
  - `urn:li:jobPosting:*`
  - `urn:li:aggregate:(urn:li:jobPosting:*...)`
- Obvious module text (only if you must fall back to text heuristics):
  - “Jobs recommended for you”
  - “See who’s hiring”

## Fixed categories (suggested)

- AI 업계 동향/큐레이션
- 커리어
- 전략/운영
- 마케팅
- 사회
- 마인드셋/에세이
- 스타트업
- ETC

## Troubleshooting

- If `browser_run_code` times out: avoid reading `root.innerText` for the whole post; only read targeted nodes.
- If extraction returns 0 posts: take a snapshot to confirm selectors, then click “New posts” and retry.
- If permalinks are missing: use `https://www.linkedin.com/feed/update/{URN}/` fallback.

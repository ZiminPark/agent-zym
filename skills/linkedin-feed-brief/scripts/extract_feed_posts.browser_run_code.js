// Paste this file's contents into Playwright MCP `browser_run_code` as the `code` string.
//
// Goal: Collect N feed posts from `https://www.linkedin.com/feed/` while scrolling,
// excluding "Promoted" and common non-post modules. Prefer DOM permalink; fallback
// to URN-derived link.
//
// Notes:
// - Avoid heavy `innerText` reads on large containers (can time out).
// - LinkedIn DOM changes frequently; update selectors in `references/api_reference.md`.

async (page) => {
  const TARGET = 20;
  const MAX_ITERS = 30;
  const SCROLL_Y = 2600;
  const WAIT_MS = 900;

  const normalizeLink = (href, urn) => {
    if (href) {
      if (href.startsWith("http")) return href;
      if (href.startsWith("/")) return `https://www.linkedin.com${href}`;
      return `https://www.linkedin.com/${href}`;
    }
    return urn ? `https://www.linkedin.com/feed/update/${urn}/` : null;
  };

  const isBadUrn = (urn) => {
    if (!urn) return true;
    if (!/^urn:li:(activity|aggregate):/i.test(urn)) return true;
    if (/^urn:li:inAppPromotion:/i.test(urn)) return true;
    if (/^urn:li:jobPosting:/i.test(urn)) return true;
    if (/^urn:li:aggregate:\(urn:li:jobPosting:/i.test(urn)) return true;
    return false;
  };

  const collected = new Map();

  for (let iter = 0; iter < MAX_ITERS && collected.size < TARGET; iter++) {
    const batch = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll("div.occludable-update[data-urn]"));
      return els.slice(0, 40).map((root) => {
        const urn = root.getAttribute("data-urn");

        const nodes = root.querySelectorAll("span, p, a, div");
        let promoted = false;
        for (const n of nodes) {
          const t = (n.textContent || "").trim().toLowerCase();
          if (t === "promoted" || t === "홍보" || t === "스폰서") {
            promoted = true;
            break;
          }
        }

        const authorEl = root.querySelector(
          'span.update-components-actor__name, a.update-components-actor__meta-link span[dir="ltr"], span.update-components-actor__title span[dir="ltr"]'
        );
        const textEl = root.querySelector(
          "div.update-components-text, div.feed-shared-update-v2__description, span.break-words"
        );
        const linkEl = root.querySelector('a[href*="/feed/update/"]');

        return {
          urn,
          promoted,
          author: (authorEl?.textContent || "").trim() || null,
          text: (textEl?.textContent || "").trim() || null,
          href: linkEl?.getAttribute("href") || null,
        };
      });
    });

    for (const p of batch) {
      if (!p?.urn || !p.author || !p.text) continue;
      if (p.promoted) continue;
      if (isBadUrn(p.urn)) continue;

      if (!collected.has(p.urn)) {
        collected.set(p.urn, {
          urn: p.urn,
          author: p.author.replace(/\s+/g, " "),
          text: p.text.replace(/\s+/g, " "),
          link: normalizeLink(p.href, p.urn),
        });
      }
      if (collected.size >= TARGET) break;
    }

    if (collected.size >= TARGET) break;
    await page.mouse.wheel(0, SCROLL_Y);
    await page.waitForTimeout(WAIT_MS);
  }

  return {
    url: page.url(),
    total: collected.size,
    posts: Array.from(collected.values()).slice(0, TARGET),
  };
};


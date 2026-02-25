# Design Principle (Blog)

## 1. Purpose
- Keep the blog interface calm, readable, and focused on writing.
- Reduce visual noise so content is the primary experience.

## 2. Core Principles
- Minimal first: Start from the simplest layout and add only necessary UI.
- Content over decoration: Typography, spacing, and hierarchy are more important than effects.
- Consistency: Reuse the same visual language across home, post, tags, and utilities.
- Clarity: Every component must have a clear role and predictable behavior.

## 3. Visual Direction
- Color: Use a restrained neutral palette with one subtle accent.
- Typography: Limit font combinations and avoid overly expressive styles.
- Surfaces: Prefer flat/quiet surfaces, light borders, and low-contrast separation.
- Motion: Keep animation minimal; avoid decorative transitions.

## 4. UI Rules
- Remove non-essential icons, badges, and ornaments.
- Use simple navigation labels and standard placements.
- Keep card/list patterns lightweight with clear spacing.
- Use hover/focus states for usability, not visual spectacle.

## 5. Content Layout Rules
- Maintain generous whitespace for reading rhythm.
- Keep line length comfortable and heading hierarchy obvious.
- Preserve clear metadata blocks (date, tags) with low visual weight.

## 6. Accessibility & Responsiveness
- Ensure contrast and focus states remain visible.
- Mobile-first layout decisions by default.
- Avoid tiny tap targets and overly dense mobile UI.

## 7. Decision Filter
Before adding a new style element, verify:
1. Does this improve comprehension?
2. Does this reduce friction?
3. Can the same goal be achieved more simply?

If the answer to (1) and (2) is not clear, do not add it.

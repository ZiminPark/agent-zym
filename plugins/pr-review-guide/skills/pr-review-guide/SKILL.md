---
name: pr-review-guide
description: >-
  Build a PR review explainer artifact — a single self-contained HTML page that walks a cold reviewer from the change's intended outcome and problem, through its user flow and key decisions, to the overall structure, ending with a comprehension quiz on a separate screen. Use whenever the user wants to explain an implementation, PR, design, or feature to reviewers or teammates as a shareable page: "PR 리뷰 자료", "리뷰 설명 자료", "이 구현/변경 설명하는 자료 만들어줘", "리뷰어한테 보여줄 페이지", "온보딩/발표 자료로 정리해줘" — even when they don't say "artifact" or "HTML".
---

# PR Review Guide

The page competes with reading the raw diff. It earns its place by giving what the diff cannot: the narrative (why this change exists), the mechanism (how the pieces move), and a way for the reviewer to check they got it. Optimize for a cold reader who has not done this work and will spend minutes, not hours.

## 1. Gather before writing

Read the design docs first (problem definition, design decisions, spec), then the implementation for whatever the docs don't cover. When docs exist, prefer their framing — a problem statement the team already sharpened ("screen sharing is the symptom, the round-trip is the problem") beats one re-derived from code.

Collect, in roughly this order of importance:

- The intended outcome — what a user can do after this change.
- The problem behind the reported symptom, and any working assumption that shaped the solution.
- The mechanism — the flow of data/files/control the change introduces.
- The decisions and their why, including rejected alternatives and what deliberately did **not** change.
- Where the full detail lives (docs, ADRs) — the page links there inline, in the section that leans on it, instead of reproducing it.
- How the change was verified — a replay, a test run, a manual check — or the fact that it was not. A reviewer of a prompt or rule change asks "did you run it?" before anything else; a page that is silent on this gets that question as its first comment.

## 2. Design pass

Load `artifact-design` and `artifact-diagramming` before writing the file, and follow them for palette, typography, and theme correctness. On top of those, what has worked for this page type:

- Wide container (~64rem) so figures get room, with prose capped at ~42–46rem inside it. Readability outranks density — resist multi-column layouts.
- One accent color reserved for meaning-carrying elements (the central artifact, sequence badges, correct answers). A second hue only when a distinct semantic needs it (friction points, pending state). Everything else neutral.
- Korean deliverables: use the system font stack (Pretendard / Apple SD Gothic Neo fallbacks) — Korean webfonts are too large to inline. Korean lines break by syllable: set `word-break: break-all` on `body` explicitly, since the viewer's default breaks Korean by word.

## 3. Narrative

- Order is why → how → what: outcome and problem before the flow, the flow before decisions and structure. Quiz last. Adapt the actual sections to the PR — don't force a fixed template.
- Core ideas only. Cut detail that wouldn't change how someone reviews. The test for any block is "does the diff or the tracker already show this better?" — if yes, leave it out: changed-file lists, implementation/verification status blocks, link collections. A reviewer who meets such a block concludes the page duplicates what they already have and stops reading. Two sections that say overlapping things merge into one, and a section a reviewer would skip is cut.
- Show the real thing instead of describing it: a screenshot of the actual output, the skill or prompt's own wording, an example of the file in question. Fold a long original into a `<details>` under the claim it backs. A reader trusts what they can see over a sentence asserting it.
- Prefer short bullets to paragraphs for glosses and case lists. Don't split a process into steps to hit a count; when two steps stay separate, say concretely what differs between them.
- No metadata in the hero — no chip row and no eyebrow/kicker line either (PR number, ticket id, branch names, repo paths, "PR Review" labels, file/commit counts, tracker links): too little information for the space it takes, and it reads as internal bookkeeping on a page meant to be shared. The hero is title + lede, plus one quiet text link to the quiz (`#quiz`) under the lede, so a reader who already knows the change can check themselves without scrolling to the end. There is no closing pointer section either: the document ends with the quiz button alone, and the one or two links a reviewer actually needs (the design doc, the replay results) sit inline in the section that draws on them.
- A color legend goes directly above the first figure or table that uses the encoding — not in the hero, where it scatters attention before the reader knows what the colors are for, and not below the figure, where the reader has already guessed.
- Two-column As-Is / To-Be cards only when each side is a sentence or two; paragraphs of text stack vertically. Label the cards "AS IS" / "TO BE" explicitly, give the To-Be card the accent border, and put an arrow between them — without these the pair reads as two unrelated cards.
- A row holds items of one kind. Two values side by side is a row; the field that holds those values is a different kind and goes in its own full-width note below, not as a third card.
- The page is shared beyond the author: leave out process history that only the author needs (reversed hypotheses, dead ends, what changed between the plan and the implementation) unless it changes how someone reviews. The reviewer judges the final state, not its distance from the plan.
- Decisions go one card per row, each a claim-sentence heading plus one or two sentences of why. The heading states the whole rule in the positive — what is kept as well as what is dropped ("steering 불릿만 빼고 나머지 3C는 전부 넘긴다", not "steering 불릿을 뺀다") — because a reviewer decides from the heading alone whether they agree. Depth need not be symmetric: expand only the decision a reviewer is most likely to question, and keep the rest to their one-line why.
- Rejected alternatives: describe each one neutrally first (what it would do, in a sentence), then why it fails. A reviewer's first question is "why not the simpler way?", and they can only compare their own judgment against a description, not against a verdict. Title the group neutrally and literally ("선택하지 않은 방법", not "쉬운 필터" or a bare "다른 방법" that leaves the reader asking what it means), and stack the alternatives as rows — name and code on the left, verdict on the right — never three across; three columns pack too much and break the one-by-one elimination the reader is doing.
- Verification section: open with the background a cold reader needs before any number — what the real data is, what "replay" means here, how results are judged, what each experiment compares. Then one table (experiment / what was compared / key figure / finding) and nothing more; aim for a quarter of what a first draft would say. State the success criterion in plain words without internal ids (bullet numbers, case ids) — a reader who has never seen the data must be able to tell whether it passed.
- Why → how also holds inside each section: lead with the concrete failure the decision solved ("what broke, and what this changes") before stating the rule — a rule stated before its failure story reads as unmotivated to a cold reader.
- Write for someone who didn't do the work. Open a term-heavy section with a one-paragraph plain-language gloss of the domain terms it leans on (what each thing physically is, in the reader's world), then keep using the plain rendering consistently. Expand internal jargon at first use ("zero-auth" → "로그인 없이 열리는 파일"), including the working nicknames of files and folders, which read as plain words but aren't ("사본" → "프로젝트 폴더에 복사해 둔 디자인 시스템 파일"; "대응 파일" needs an example of the file), and make headings claim sentences a reader can evaluate ("답의 주인은 번호가 아니라 질문 문장으로 찾는다") rather than term equations ("매핑 근거 = ID 아님"). Deliverable language follows the team's working language; code identifiers stay verbatim.

## 4. Diagrams

Draw the mechanism, not component names. Two shapes that carry this page type well:

- **Round-trip flow**: horizontal swimlanes (system session vs. outside actor) separated by a dashed boundary line labeled with what actually crosses it (e.g., "계정·권한 없이 파일만 오간다"). Accent-fill the objects that cross.
- **Structure**: the shared artifact in the center, owners around it, and numbered time-order badges (① ② ③ …) on the arrows so the diagram reads as a sequence — repeat the same numbers in the caption, one numbered step per line, never run together in a paragraph. Friendlier box text describes behavior ("건너뛴 질문을 응답자용 문장으로 다듬어 기록") rather than ownership jargon ("스키마 소유").

Put each figure's title inside the drawing, so a figure screenshotted or skimmed alone still says what it shows. Once a figure shows something, cut the prose and caption that repeat it; the caption keeps only what the picture cannot carry.

Mechanics: hand-authored SVG, `currentColor` plus CSS-variable accents so both themes work, wide `viewBox` inside an `overflow-x: auto` wrapper, every arrow labeled. Size boxes to their text: a Korean glyph is about as wide as the font size, so a box needs at least character count × font size plus padding, or a shorter label — text spilling past its box is the most common fix requested on these figures. A problem can also be a diagram — friction points as numbered badges on the path they interrupt.

## 5. Comprehension quiz

Include by default; skip only if the user declines. It is a separate screen, not a page section: hash routing (`#quiz`) hides the document and shows a dedicated quiz view with a back link. Two entry points lead to it: the text link under the hero lede and the button at the end of the document. The mechanics — routing, one-question-at-a-time, prev/next plus dot navigation, lock-after-answer with instant explanation, score screen with reset — are in `assets/quiz-screen.html`; adapt its markup to the page's own tokens instead of rebuilding or restyling from scratch.

Write 6–8 questions; six is enough. Ask which approach the design chose, not why the others were rejected and not verification details (experiment figures, replay setup) — those don't change how a reviewer reads the change. Each question is self-contained: name the content itself in the question ("발주처가 자기 조직에 대해 밝힌 사실은…"), never an id or a pronoun ("co18 같은 불릿은…"), and spell out what the choice is between so the reader can answer on the merits rather than on recall. Use the `ctx` line ("배경: …") only when a presupposed fact cannot fit in the question itself. Wrong options should be plausible misreadings — the rejected alternative, the naive default, the pre-revision behavior — so that the explanation teaches the why, not just the fact.

## 6. Publish and iterate

Publish early with the Artifact tool and keep the same file path (same URL) and favicon across revisions. Expect iteration as the normal path, not rework: trimming text, promoting prose into diagrams, widening layout, and plain-language passes over jargon-heavy sections are the follow-ups users most often ask for — leaning that way in the first draft saves a round.

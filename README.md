# agent-zym



## What’s in this repo?

- `plugins/`: Marketplace plugins (each plugin ships its own `.claude-plugin/plugin.json` and optional Codex skills).
- `codex/notifier.py`: Optional helper that can send macOS + Slack notifications when a Codex turn completes.

## Plugins

### `linkedin-feed-brief`

Collect and summarize LinkedIn home feed posts using **Playwright MCP** (Extension Mode).

- Docs: `plugins/linkedin-feed-brief/skills/linkedin-feed-brief/README.md`
- Skill instructions: `plugins/linkedin-feed-brief/skills/linkedin-feed-brief/SKILL.md`

### `terminal-notifier-hook`

Sends macOS terminal notifications when Claude Code processes messages. Displays the current working directory, notification type, user input, and assistant output.

- Requires: `terminal-notifier` installed on macOS

### `wedding-research`

네이버 카페에서 키워드를 검색하고 후기를 분석하여 출처 링크가 포함된 종합 리포트를 생성합니다.

- Docs: `plugins/wedding-research/README.md`
- Skill instructions: `plugins/wedding-research/skills/wedding-research/SKILL.md`

### `notebooklm-generator`

Generate study materials (Flashcards, Quiz, Infographic, Slide Deck) from URLs using **Playwright MCP** (Extension Mode).

![NotebookLM Generator Demo](resources/notebook-generator.gif)

- Docs: `plugins/notebooklm-generator/skills/notebooklm-generator/README.md`
- Skill instructions: `plugins/notebooklm-generator/skills/notebooklm-generator/SKILL.md`
- Requires: Google account login in browser

### `request-explainer-html`

Agent that turns a request, requirement, RFC, or concept into a clear, visual, single-file HTML explainer that non-experts can read on their own.

- Docs: `plugins/request-explainer-html/README.md`
- Claude Code agent definition: `plugins/request-explainer-html/agents/request-explainer-html.md`
- Codex agent (native subagent, TOML): `codex/agents/request-explainer-html.toml`
- Codex skill (auto-trigger alternative): `codex/skills/request-explainer-html/SKILL.md`

### `visual-summary` (Codex-only skill)

Turn a PR, diff, markdown requirement, or implementation note into a compact teammate-facing visual summary.

- Docs: `codex/skills/visual-summary/README.md`
- Skill instructions: `codex/skills/visual-summary/SKILL.md`
- Install with Codex skill installer, not Claude Code marketplace

## Install (Claude Code)

```text
/plugins marketplace add ZiminPark/agent-zym
/plugins install linkedin-feed-brief
/plugins install terminal-notifier-hook
/plugins install notebooklm-generator
/plugins install wedding-research
/plugins install request-explainer-html
```

## Install skills (Codex)

```bash
$skill-installer install https://github.com/ZiminPark/agent-zym/tree/main/plugins/linkedin-feed-brief/skills/linkedin-feed-brief
$skill-installer install https://github.com/ZiminPark/agent-zym/tree/main/plugins/notebooklm-generator/skills/notebooklm-generator
$skill-installer install https://github.com/ZiminPark/agent-zym/tree/main/plugins/wedding-research/skills/wedding-research
$skill-installer install https://github.com/ZiminPark/agent-zym/tree/main/codex/skills/visual-summary
$skill-installer install https://github.com/ZiminPark/agent-zym/tree/main/codex/skills/request-explainer-html
```

Restart Codex to pick up new skills.

## Install agents (Codex)

Native Codex subagents live in `~/.codex/agents/` (personal) or `.codex/agents/` (project). Drop the TOML into one of those directories.

```bash
mkdir -p ~/.codex/agents
curl -fsSL -o ~/.codex/agents/request-explainer-html.toml \
  https://raw.githubusercontent.com/ZiminPark/agent-zym/main/codex/agents/request-explainer-html.toml
```

Invoke from a prompt, e.g. `Spawn the request-explainer-html agent to produce an HTML explainer for requirements/onboarding-flow.md`. See [`codex/agents/README.md`](./codex/agents/README.md) for details.

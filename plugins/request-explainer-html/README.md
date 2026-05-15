# request-explainer-html

A Claude Code agent that turns a request, requirement, or concept into a clear, visual, single-file HTML explanation — designed to be readable by non-experts.

## What it does

Given any request, spec, or concept, the agent produces a self-contained HTML file with:

- TL;DR + problem framing
- A clear breakdown of the request
- Visuals (inline SVG diagrams, flowcharts, before/after panels)
- Concrete examples / use cases
- Optional glossary and FAQ

The file is a single, dependency-free `.html` that opens in any browser.

## Install (Claude Code)

```text
/plugins marketplace add ZiminPark/agent-zym
/plugins install request-explainer-html
```

After install, Claude Code will auto-route matching requests to the agent, or you can launch it explicitly via the Agent tool with `subagent_type: "request-explainer-html"`.

## Usage examples

```text
새로운 워크플로우 시스템에 대한 요청을 쉽게 설명하는 HTML 파일을 만들어줘
이 API 변경 요청을 비개발자도 이해할 수 있게 HTML로 설명해줘
Make an HTML explainer for this RFC so PMs can understand it
```

## Using this from Codex

Codex supports native subagents via TOML files in `~/.codex/agents/` or project-scoped `.codex/agents/`.

Use `codex/agents/request-explainer-html.toml`, then invoke it explicitly: `Spawn the request-explainer-html agent to ...`.

See [`codex/agents/README.md`](../../codex/agents/README.md) for install steps.

## Files

- `.claude-plugin/plugin.json` — plugin metadata
- `agents/request-explainer-html.md` — agent definition (frontmatter + system prompt)

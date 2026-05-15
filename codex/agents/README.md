# Codex subagents

Native Codex subagent definitions (TOML format). Per Codex docs, agents live in:

- Personal: `~/.codex/agents/`
- Project-scoped: `.codex/agents/` inside a project

Each `.toml` file defines one agent. Required fields: `name`, `description`, `developer_instructions`. Optional: `model`, `model_reasoning_effort`, `sandbox_mode`, `mcp_servers`, `skills.config`, `nickname_candidates`.

Reference: https://developers.openai.com/codex/subagents

## Available agents

### `request-explainer-html`

Turns a request, spec, or concept into a clear single-file HTML explainer for non-experts. See [`request-explainer-html.toml`](./request-explainer-html.toml).

## Install (personal, recommended)

```bash
mkdir -p ~/.codex/agents
curl -fsSL -o ~/.codex/agents/request-explainer-html.toml \
  https://raw.githubusercontent.com/ZiminPark/agent-zym/main/codex/agents/request-explainer-html.toml
```

Or clone the repo and copy:

```bash
cp codex/agents/request-explainer-html.toml ~/.codex/agents/
```

## Install (project-scoped)

```bash
mkdir -p .codex/agents
cp /path/to/agent-zym/codex/agents/request-explainer-html.toml .codex/agents/
```

## Invoke

Codex agents are spawned by referring to them in a prompt. Example:

```text
Spawn the request-explainer-html agent to produce an HTML explainer for requirements/onboarding-flow.md
```

## Optional: tune execution limits

In your `.codex/config.toml`:

```toml
[agents]
max_threads = 6
max_depth = 1
job_max_runtime_seconds = 1800
```

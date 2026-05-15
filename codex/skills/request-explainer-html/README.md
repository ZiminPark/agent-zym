# request-explainer-html (Codex skill)

Codex 전용 `request-explainer-html` skill입니다. 요청, 요구사항, RFC, 개념 같은 글을 비전문가도 쉽게 이해할 수 있는 한 장짜리 self-contained HTML 파일로 변환합니다.

이 디렉터리는 Claude Code marketplace plugin이 아니라 Codex의 skill installer로 직접 설치하는 용도입니다. Claude Code 사용자는 [`plugins/request-explainer-html`](../../../plugins/request-explainer-html)에 있는 agent 버전을 설치하면 됩니다.

> **Codex에서 정식 subagent로 쓰고 싶다면** [`codex/agents/request-explainer-html.toml`](../../agents/request-explainer-html.toml)을 `~/.codex/agents/`에 복사하세요. Skill은 description 매칭으로 자동 트리거되는 반면, agent는 `Spawn the request-explainer-html agent ...` 식으로 명시적으로 호출합니다.

## When this skill should run

Use `request-explainer-html` when you want Codex to:

- Turn a request, spec, or concept into a single self-contained `.html` explainer
- Produce a non-expert-friendly document with TL;DR, problem framing, visuals, and examples
- Generate inline-SVG diagrams and before/after panels embedded in HTML
- Deliver a file that opens in any browser with no external dependencies

If you want a slide image instead, use `visual-summary`. If you want a multi-page site, this skill is not the right fit.

## Install this skill

```bash
$skill-installer install https://github.com/ZiminPark/agent-zym/tree/main/codex/skills/request-explainer-html
```

Restart Codex after installation so the skill can be picked up.

## Usage examples

```text
이 요구사항 문서를 비개발자도 이해할 수 있게 HTML 한 장으로 정리해줘
새로운 워크플로우 시스템 RFC를 PM이 이해할 수 있는 HTML 설명서로 만들어줘
Make an HTML explainer for this API change so non-engineers can follow it
```

## Files

- `SKILL.md` — Codex skill instructions
- `agents/openai.yaml` — Optional interface metadata for the skill

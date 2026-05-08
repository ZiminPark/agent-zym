# visual-summary

Codex 전용 `visual-summary` skill입니다. PR, diff, 요구사항 문서, 구현 노트처럼 텍스트가 많은 변경 내용을 동료에게 설명하기 좋은 16:9 한 장짜리 시각 자료로 정리하도록 돕습니다.

이 디렉터리는 Claude Code marketplace plugin으로 설치하는 용도가 아니라, Codex의 skill installer로 직접 설치하는 용도입니다.

## When this skill should run

Use `visual-summary` when you want Codex to:

- Extract the core product or architecture story from a PR, diff, markdown document, or implementation note
- Propose a compact one-slide layout before image generation
- Generate a presentation-ready visual summary when requested
- Keep teammate-facing visuals focused on before/after, flow, decision, or impact

## Install this skill

```bash
$skill-installer install https://github.com/ZiminPark/agent-zym/tree/main/codex/skills/visual-summary
```

Restart Codex after installation so the skill can be picked up.

## Usage examples

```text
이 PR 핵심만 teammate에게 설명할 수 있게 visual-summary로 이미지 만들어줘
requirements/rfp-upload.md 내용을 before/after 한 장으로 정리해줘
이 diff를 보고 아키텍처 변경을 한 장짜리 슬라이드로 제안해줘
```

## Files

- `SKILL.md`: Codex skill instructions
- `agents/openai.yaml`: Optional interface metadata for the skill

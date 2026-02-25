# Blog llms.txt Requirements

## 1. Goal
코딩 에이전트/LLM이 `zimmy.dev`의 임의 링크를 fetch하더라도,
사람용 HTML 대신 LLM 친화 컨텍스트 진입점으로 빠르게 이동할 수 있게 한다.

핵심 목표:
- 루트 `llms.txt`를 통해 "이 사이트에서 어떤 문서를 우선 읽어야 하는지"를 명확히 제공한다.
- 기존 `/*.md` LLM 컨텍스트 엔드포인트와 연결해, fetch 결과를 바로 후속 추론에 사용할 수 있게 한다.

## 2. Research Summary (Web)
조사 기준일: 2026-02-25

- `llms.txt`는 LLM이 참고하기 좋은 문서 링크를 제공하기 위한 **제안(proposal)** 포맷이다.
- 권장 구조는 `# 프로젝트명`, 요약 블록, 그리고 `##` 섹션별 링크 목록이다.
- `llms-full.txt`는 선택적으로 전체 문서를 하나로 합친 단일 파일을 제공한다.
- 실사용 사례:
  - Anthropic Docs는 `/llms.txt`, `/llms-full.txt`를 실제 제공한다.
  - Cloudflare Docs는 페이지 단위 Markdown 변환/복사와 `llms.txt`를 함께 안내한다.
  - Mintlify는 `llmsTxt` 설정으로 자동 생성(on/off, include/exclude)을 지원한다.

해석:
- 아직 강제 표준은 아니므로, "없으면 손해" 성격의 보완 기능으로 접근한다.
- 우리 블로그는 이미 `*.md` 컨텍스트 라우트를 갖고 있으므로, `llms.txt`를 인덱스 레이어로 추가하는 것이 비용 대비 효율이 높다.

## 3. Problem Statement
현재는 페이지 단위 `llm-context` 메타와 `.md` 엔드포인트가 있어도,
에이전트가 사이트 루트/임의 링크부터 탐색하면 진입 비용이 남아 있다.

- "어떤 문서를 우선 읽어야 하는가"를 알려주는 사이트 레벨 인덱스 부재
- 에이전트마다 HTML 파싱 품질이 달라 핵심 링크를 놓칠 수 있음
- 긴 탐색 체인으로 토큰/시간 낭비

## 4. Product Principles
- 사이트 전역 공용 자산: 특정 페이지 전용이 아닌 루트 레벨 기능으로 운영
- 경량 우선: 요약 + 링크 중심, 본문 중복 최소화
- 기존 자산 재사용: 이미 운영 중인 `/*.md` 엔드포인트를 우선 링크
- 결정적 출력: 빌드마다 동일 입력이면 동일 텍스트(순서/포맷 안정성)

## 5. Scope
### MVP
- `GET /llms.txt` 제공
- 섹션별 주요 링크 노출:
  - Core (홈, harness 메인/통합)
  - Harness Sections
  - Recent Posts (발행일 기준 최신 N개)
- 각 링크는 가능하면 `.md` 엔드포인트를 우선 표기

### V1
- `GET /llms-full.txt` 제공 (주요 문서를 단일 컨텍스트로 병합)
- 링크별 간단 설명 자동 생성/정제(설명 길이 제한 포함)
- 생성 결과 품질 가드(길이 상한, 깨진 링크 자동 제외)

### Out of Scope
- 사용자별 개인화 llms.txt
- 실시간 벡터 검색 인덱스/임베딩 시스템
- 에이전트별 포맷 분기(Claude 전용, ChatGPT 전용 등)

## 6. Output Contract
`/llms.txt` 기본 포맷:

```txt
# zimmy.dev

> LLM-friendly index for agent-zym blog content.

## Core
- [Home](https://zimmy.dev/): Human-facing entry
- [Harness](https://zimmy.dev/harness.md): Workflow guide context
- [Harness Full](https://zimmy.dev/harness/all.md): Full guide context

## Recent Posts
- [Post Title](https://zimmy.dev/{slug}.md): one-line summary
```

규칙:
- 링크는 절대 URL 사용 (`https://zimmy.dev/...`)
- 한 줄 설명은 120자 이내 권장
- 섹션명은 고정 집합(Core, Harness Sections, Recent Posts)

## 7. Information Architecture
- Core:
  - `/`
  - `/harness.md`
  - `/harness/all.md`
- Harness Sections:
  - `/harness/{section}.md` 전부
- Recent Posts:
  - posts 컬렉션에서 `draft !== true`, `pubDate` 내림차순 상위 N개

선정 원칙:
- 우선순위는 "에이전트가 바로 작업 컨텍스트로 쓰기 좋은 문서" 기준
- 단순 목록 페이지(tags index 등)는 MVP에서 제외

## 8. Success Criteria
정량:
- `GET /llms.txt` 성공률 99.9%+
- `llms.txt`에 포함된 링크의 200 응답률 100%
- 에이전트 테스트 시 첫 유효 컨텍스트 도달 단계 수 감소

정성:
- "site fetch 후 바로 컨텍스트 확보된다" 피드백 확보

## 9. Risks & Mitigations
- 리스크: `llms-full.txt`가 과도하게 커져 토큰 낭비
  - 완화: 길이 상한과 포함 문서 수 제한, 필요 시 섹션 분할
- 리스크: 수동 관리 시 링크 노후화
  - 완화: 콘텐츠 소스에서 빌드 시 자동 생성
- 리스크: 제안 스펙 변화
  - 완화: 생성 로직을 단일 모듈로 캡슐화해 수정 비용 최소화

## 10. Verification
### 10.1 Endpoint Contract
- `curl -I https://zimmy.dev/llms.txt`
- 기대:
  - 200
  - `content-type`이 `text/plain` 또는 `text/markdown` 계열

### 10.2 Structure Check
- `curl -s https://zimmy.dev/llms.txt | rg '^# |^> |^## |^- \\['`
- 기대:
  - H1 1개
  - 섹션 헤더(`##`) 존재
  - 링크 목록(`- [title](url): desc`) 유지

### 10.3 Link Health
- `llms.txt` 내 모든 URL을 추출해 200/301 여부 점검
- 포함된 `.md` 링크가 실제 LLM 컨텍스트 스키마(`Context`, `URL`, `Article content`)를 만족하는지 표본 검증

### 10.4 Agent Fetch Scenario
- 시나리오: 에이전트가 루트 URL만 가진 상태에서 컨텍스트 확보
1. `/llms.txt` fetch
2. 우선순위 링크 1개 선택
3. 선택 링크 `.md` fetch
4. 후속 질의(요약/코드 생성) 수행
- 통과 기준: 2회 fetch 이내에 유효 컨텍스트 확보

## 11. Simple Implementation Idea
### 11.1 파일 변경안
- 신규: `blog/src/lib/llms-txt.ts`
  - 역할: `llms.txt`/`llms-full.txt` 생성기
- 신규: `blog/src/pages/llms.txt.ts`
  - 역할: 인덱스 문서 반환
- 신규(선택): `blog/src/pages/llms-full.txt.ts`
  - 역할: 통합 문서 반환

### 11.2 생성 전략
- posts 컬렉션 + harness 데이터를 조합해 정적 생성
- URL은 모두 `Astro.site` 기반 절대 경로
- 설명 텍스트는 `description/summary`에서 1줄로 정규화

### 11.3 재사용 원칙
- 링크/섹션 생성 로직을 공용 유틸로 분리
- 페이지 라우트(`llms.txt.ts`, `llms-full.txt.ts`)는 렌더 결과만 반환

## 12. Rollout Plan
- Phase 1: `llms.txt` 배포 + 링크 건강성 체크 자동화
- Phase 2: `llms-full.txt` 배포 + 길이/품질 가드
- Phase 3: 검색/관측 지표 추가(접근 빈도, 실패율)

## 13. References
- [llms.txt (proposal) repository](https://github.com/AnswerDotAI/llms-txt)
- [llmstxt.org](https://llmstxt.org/)
- [Anthropic Docs llms.txt](https://docs.anthropic.com/llms.txt)
- [Cloudflare Docs: AI tooling (Copy page as Markdown)](https://developers.cloudflare.com/style-guide/documentation-content-strategy/content-types/ai-content/)
- [Mintlify: llms.txt configuration](https://mintlify.com/docs/settings/llms-txt)

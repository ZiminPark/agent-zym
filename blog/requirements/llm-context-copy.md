# Blog LLM Context Copy Requirements

## 1. Goal
블로그 글을 읽은 사용자가 내용을 LLM(Claude, ChatGPT 등)에 즉시 전달할 수 있게 만들어,
"읽기 → 복사 → 질문/요약/코드생성" 흐름의 마찰을 최소화한다.

핵심 가설:
- 문서를 LLM 친화 포맷(Markdown/구조화 텍스트)으로 1클릭 복사 가능하게 하면,
  사용자는 더 자주 블로그 내용을 후속 대화/작업 컨텍스트로 활용한다.

재사용성 원칙:
- 이 기능은 1회성 페이지 커스텀이 아니라, blog 전반에서 반복 사용할 수 있는 공용 컴포넌트로 설계한다.
- 개별 페이지는 컴포넌트를 "호출"만 하고, 복사 로직/상태 관리는 컴포넌트 내부로 캡슐화한다.

## 2. Problem Statement
현재 블로그는 읽기 UX 중심이다.
사용자가 LLM에 컨텍스트를 전달하려면 수동 선택/복사를 해야 하며 다음 문제가 발생한다.

- 복사 범위가 불안정함(헤더/푸터 포함, 본문 누락)
- 포맷이 깨짐(HTML 기반 복사, 코드블록 손상)
- 재사용 가능한 구조(제목/URL/태그/작성일)가 빠짐

## 3. Target User & JTBD
- 대상: 개발자/에이전트 사용자, 문서를 읽고 바로 LLM에게 물어보는 사용자
- JTBD: "이 글 내용을 정확히 LLM에 넘겨서 후속 작업(요약, 번역, 코드 작성, 리뷰)을 빠르게 시작하고 싶다"

## 4. Product Scope
### MVP (이번 단계)
- 포스트 상세 페이지 전반에 재사용 가능한 `PostContextActions` 컴포넌트 제공
- 클릭 시 "LLM 컨텍스트 템플릿 + 본문 Markdown"을 클립보드에 복사
- `Open Markdown` 링크 제공(원문 Markdown을 별도 URL로 노출)

### V1 (후속)
- `Copy section` (헤딩 단위 복사)
- `Ask in Claude` (현재 글 URL을 포함한 claude.ai deep link)
- 토큰 수 대략치 표시

### Reuse Scope
- 1차: 모든 포스트 상세 페이지(`PostLayout`)에 공통 적용
- 2차: 문서형 랜딩/가이드 페이지 등 컨텍스트 전달 니즈가 있는 페이지로 확장
- 제외: 단순 목록/카드 페이지(본문 컨텍스트가 없는 페이지)

## 5. UX Requirements
포스트 상세 페이지 상단(제목/설명 아래)에 액션 영역을 둔다.

- Primary: `Copy for LLM`
- Secondary: `Open Markdown`

복사 성공 시:
- 버튼 텍스트를 2초간 `Copied!`로 변경

복사 실패 시:
- 버튼 텍스트를 2초간 `Failed`로 변경

컴포넌트 일관성 요구사항:
- 버튼 라벨, 성공/실패 피드백 타이밍, 복사 템플릿은 모든 사용처에서 동일해야 한다.
- 페이지별 스타일 차이는 허용하되, 동작 의미는 동일해야 한다.

## 6. Output Format (복사되는 내용)
복사 텍스트는 아래 구조를 따른다.

```md
# Context: {title}
- URL: {canonical_url}
- Published: {pubDate}
- Tags: {tag1, tag2}

## User intent hint
Use this article as source context. Quote accurately when needed.

## Hyperlinks (1-depth)
- {link_label_1}: {absolute_url_1}
- {link_label_2}: {absolute_url_2}

## Article content
{markdown_body}
```

원칙:
- HTML이 아닌 Markdown 기반
- URL/메타데이터를 함께 포함해 LLM 응답의 출처 정합성 강화
- 본문에 포함된 hyperlink를 별도 섹션으로 함께 제공해, 에이전트가 원문 링크를 추가 fetch할 수 있게 한다.
- hyperlink depth는 최대 1로 제한한다. 즉 현재 문서에 직접 등장한 링크만 포함하고, 링크의 링크를 재탐색하지 않는다.

## 7. Success Criteria
정량:
- 포스트 상세 페이지 대비 `Copy for LLM` 클릭률
- 복사 성공률(실패율 1% 미만 목표)
- 재사용 채택률: 적용 대상 페이지 중 공용 컴포넌트 사용 비율 100%

정성:
- "LLM에 바로 붙여넣기 편하다" 피드백 확보

## 8. Non-goals
- 에디터 내 실시간 프롬프트 생성기
- 자동 요약 생성/저장
- 사용자별 퍼스널라이즈드 컨텍스트 추천

## 9. Risks & Mitigations
- 본문이 긴 경우 토큰 초과 위험
  - 완화: 후속으로 `Copy section` 추가
- 클립보드 API 브라우저 제약
  - 완화: 실패 상태 피드백 명확화, Open Markdown 대체 경로 제공

## 10. Verification (기능 검증 방식)
### 10.1 테스트 환경
- 로컬 실행: `cd blog && npm run dev -- --host 127.0.0.1 --port 4321`
- 대표 검증 대상 페이지:
  - 포스트 상세: `/{post-slug}`
  - Harness 메인: `/harness`
  - Harness 섹션: `/harness/{section}`
  - Harness 통합: `/harness/all`

### 10.2 메타데이터/발견성 검증 (LLM-friendly 탐지)
- 목적: 코딩 에이전트가 HTML만 가져와도 LLM 컨텍스트 URL을 찾을 수 있는지 확인
- 확인 항목:
  - `<link rel="alternate" type="text/markdown" href="...">`
  - `<meta name="llm-context-url" content="...">`
  - `<meta name="llm-context-format" content="text/markdown">`
- 예시:
  - `curl -s http://127.0.0.1:4321/harness | rg 'rel="alternate"|llm-context-url|llm-context-format'`
- 통과 기준:
  - 대상 페이지마다 3개 메타/링크가 모두 존재
  - `alternate href`가 실제 fetch 가능한 `.md` 경로를 가리킴

### 10.3 Markdown 엔드포인트 검증 (Web Fetch 결과)
- 목적: `.md` fetch 결과가 LLM 입력용 스키마를 유지하는지 확인
- 헤더 검증:
  - `curl -I http://127.0.0.1:4321/harness.md | rg -i 'content-type: text/markdown'`
- 본문 스키마 검증:
  - `curl -s http://127.0.0.1:4321/harness.md | rg '^# Context:|^- URL:|^- Tags:|^## User intent hint|^## Hyperlinks \\(1-depth\\)|^## Article content'`
- 통과 기준:
  - `content-type`이 `text/markdown` 포함
  - 필수 섹션(`Context`, `URL`, `Tags`, `User intent hint`, `Article content`) 모두 포함
  - 링크가 있는 문서는 `Hyperlinks (1-depth)` 섹션이 포함되고, 각 항목이 절대 URL 형식이어야 함

### 10.4 UI 복사 동작 검증
- 목적: 사용자/에이전트 복사 UX가 정상 동작하는지 확인
- 검증 항목:
  - `Copy for LLM` 클릭 시 `Copying...` -> `Copied!`(2초 후 원복)
  - 실패 시 `Failed`(2초 후 원복)
  - `Open Markdown`가 동일 `.md` 엔드포인트를 열어야 함
  - 클립보드 텍스트가 `.md` fetch 결과와 동일 스키마를 만족해야 함
  - 링크가 있는 문서를 복사하면 `Hyperlinks (1-depth)` 섹션에 링크 목록이 포함되어야 함
- 방법:
  - 수동 브라우저 점검 또는 Playwright/CDP로 버튼 클릭 + 클립보드 읽기 자동화

### 10.5 재사용/회귀 검증
- 목적: "공용 컴포넌트" 원칙이 깨지지 않도록 보장
- 체크리스트:
  - `ContextActions`를 사용하는 모든 페이지에서 버튼 라벨/상태 전환 규칙이 동일
  - 새 페이지 추가 시 `llmContextHref`(head 메타) + `ContextActions`(UI) + `.md` route 3요소가 함께 적용
  - 대표 URL 세트(포스트 1개, harness 3개)에 대해 10.2~10.4를 릴리즈 전 반복 수행

## 11. Simple Implementation Idea (MVP)
### 11.1 파일 변경안
- 신규: `blog/src/lib/llm-context.ts`
  - 역할: LLM 컨텍스트 공통 템플릿 빌더
- 신규: `blog/src/components/ContextActions.astro`
  - 역할: `Copy for LLM`, `Open Markdown` UI + 클립보드 동작
  - 원칙: 특정 페이지에 종속되지 않는 공용 컴포넌트
- 신규: `blog/src/pages/[...slug].md.ts`, `blog/src/pages/harness.md.ts`, `blog/src/pages/harness/[section].md.ts`, `blog/src/pages/harness/all.md.ts`
  - 역할: 페이지별 LLM-friendly Markdown 응답 제공 (`content-type: text/markdown`)
- 수정: `blog/src/components/BaseHead.astro`
  - 역할: `alternate` + `llm-context-*` 메타 노출
- 수정: `blog/src/layouts/PostLayout.astro`, `blog/src/pages/harness*.astro`
  - 역할: 상세 페이지/가이드 페이지에 공용 `ContextActions` 삽입

### 11.1.1 컴포넌트 계약(초안)
`ContextActions`는 다음 props를 받는 공용 인터페이스를 가진다.

```ts
type ContextActionsProps = {
  markdownPath: string;
  title: string;
  canonicalPath?: string;
  pubDate?: string;
  tags?: string[];
  hint?: string;
  className?: string;
};
```

규칙:
- 컴포넌트 내부에서 콘텐츠 컬렉션 데이터를 직접 조회하지 않는다.
- 필요한 메타데이터는 모두 props로 전달받아, 다른 페이지에서도 동일하게 재사용 가능해야 한다.

### 11.2 동작 흐름
1. 상세/가이드 페이지에서 `Copy for LLM` 클릭
2. 클라이언트가 해당 페이지의 `.md` 엔드포인트 fetch
3. 응답 텍스트를 공통 템플릿으로 보정 후 `navigator.clipboard.writeText()`
4. 성공/실패 상태를 버튼 라벨에 반영

### 11.3 최소 의사코드
```ts
const res = await fetch(markdownPath);
const body = await res.text();
const payload = `# Context: ${title}\n- URL: ${url}\n...\n\n## Article content\n${body}`;
await navigator.clipboard.writeText(payload);
```

## 12. Rollout Plan
- Phase 1: 공용 컴포넌트 구축 + PostLayout 전면 적용
- Phase 2: 섹션 단위 복사
- Phase 3: Claude deep link + 간단 실사용 이벤트 추적

## 13. Documentation Impact
이 요구사항 기준으로 문서 업데이트 필요 항목:

- `blog/docs/architecture.md`
  - Components/Layout 섹션에 `ContextActions` 공용 컴포넌트와 `.md` 라우트 체계 추가
- `blog/docs/writing_posts.md`
  - 작성자 가이드에 "포스트 상세에서 LLM 컨텍스트 복사 기능이 자동 제공됨" 명시

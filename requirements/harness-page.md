# Harness Page Requirements

## Original Requirement
"이 페이지(jiyu-han-portfolio 5열 카드 레이아웃)를 레퍼런스 삼아서 harness.mdx의 내용을 페이지로 만들고 싶어."

## Reference
- URL: https://jiyu-han-portfolio.vercel.app/projects
- 5열 풀하이트 세로 카드 스트립, 배경 이미지 오버레이, 다크 테마

## Clarified Requirements

### Goal
harness.mdx의 6개 섹션(0. Setup ~ 5. Compound)을 레퍼런스 스타일의 인터랙티브 카드 그리드 페이지로 구현

### Layout
- **2행 × 3열** 그리드
- Row 1: Setup, Spec, Plan (준비 단계)
- Row 2: Execution, Verification & Review, Compound (실행 단계)
- 반응형: 데스크톱 3열 → 태블릿 2열 → 모바일 1열

### Card Design
- 아이콘 + 그라디언트 배경 (섹션별 고유 색상)
- 카드 내용: 섹션 번호 + 제목 + 핵심 한 줄 요약
- hover 효과 포함

### Interaction
- 카드 클릭 → 별도 상세 페이지 이동
- hover/스크롤 진입 애니메이션

### Pages
- `src/pages/harness.astro` — 메인 2×3 카드 그리드
- `src/pages/harness/[section].astro` — 6개 섹션별 상세 페이지

### Detail Page Routes
- `/harness/setup`
- `/harness/spec`
- `/harness/plan`
- `/harness/execution`
- `/harness/verification`
- `/harness/compound`

### Success Criteria
- 6개 카드가 2×3 그리드로 배치됨
- 각 카드에 고유 아이콘과 그라디언트 배경
- 카드 클릭 시 해당 섹션 상세 페이지로 이동
- 상세 페이지에서 harness.mdx 원본 콘텐츠 전체 표시
- hover/진입 애니메이션 동작
- 모바일 반응형 대응

### Decisions Made
| Question | Decision |
|----------|----------|
| 디자인 범위 | 전체 인터랙션 포함 (레이아웃 + 스타일 + 상세 페이지) |
| 섹션 매핑 | 2행 × 3열 (6개 섹션 모두 포함) |
| 페이지 위치 | 독립 페이지 (src/pages/) |
| 카드 비주얼 | 아이콘 + 그라디언트 배경 |
| 상세 페이지 | 별도 상세 페이지 (/harness/[section]) |

---
name: post-refiner
description: Refine raw notes into a polished LinkedIn post and blog article. Use when the user wants to turn rough Korean notes (typically in blog/raw/) into a finished piece — sentence by sentence, collaboratively. Trigger on "글 다듬자", "포스트 정리", "LinkedIn 글", "블로그 발행", "raw 파일 다듬기", "/post-refiner".
argument-hint: "[raw file path]"
allowed-tools: Read, Edit, Write, Bash, AskUserQuestion, WebFetch
---

# Post Refiner

Turn raw notes into a polished LinkedIn post + blog article through collaborative, sentence-level editing.

## Input

- A raw markdown file (usually in `blog/raw/`) containing unpolished ideas and notes.
- The file uses `<raw>` / `<modified>` sections. Work only in `<modified>`.

## Writing Style

These principles are non-negotiable. Apply them to every sentence.

### Tone
- 담백하고 절제된 톤. 어그로/클릭베이트 표현 금지.
- 과장 없이 솔직하게. "꿀팁", "충격", "필수" 같은 단어 사용 금지.

### Sentence Rhythm
- 너무 짧은 단문 나열도, 너무 긴 문장도 피한다.
- 단문으로 끊되, 이어지는 문장과 호흡이 자연스러운지 확인한다.
- 사용자가 "너무 단문이야" 또는 "너무 길어"라고 하면 즉시 조정.

### Point of View
- "나"의 시점에서 시작한다.
- 보편적 이야기로 넘어갈 때는 "독자마다" 같은 직접적 일반화 대신, 주어를 생략하여 자연스럽게 전환한다.
- 단락 내에서 시점이 튀지 않는지 항상 검토한다.

### Bridges
- 단락 간 전환(브릿지)이 자연스러운지 매번 확인한다.
- 갑자기 새 개념이 등장하면 앞 단락과의 연결고리를 만든다.
- 사용자에게 브릿지가 어색한지 의견을 묻는다.

### Keywords
- 트렌디한 키워드(예: context engineering)는 은은히 드러낸다.
- 용어를 직접 쓰기보다 행위나 설명으로 풀어서 아는 사람만 알아채게 한다.

## Hooking Strategy (LinkedIn)

1. **첫 문장**: 공감할 수 있는 고민이나 상황 묘사. 질문형보다 상황 묘사형 선호.
2. **첫 문단 배치**: LinkedIn "더 보기" 클릭 전에 보이는 영역을 의식한다. 첫 문단에서 호기심을 남긴다.
3. **대비 구조**: "하지 말 것 / 할 것" 같은 대비는 후킹력이 강하다. 짧은 임팩트(하지 말 것)를 먼저 배치하고, 긴 해소(할 것)를 뒤에 둔다.
4. **마무리**: 새로운 주장이 아니라 기존 개념의 확장이라는 프레이밍으로 마무리하면 신뢰감을 준다.

## Workflow

### Step 1: Parse raw file
- raw 파일을 읽고 아이디어 덩어리(단락)를 파악한다.
- 각 덩어리의 핵심 메시지를 한 줄로 정리하여 사용자에게 보여준다.
- 어떤 덩어리부터 시작할지 사용자에게 묻는다.

### Step 2: Refine sentence by sentence
- 한 덩어리씩 작업한다.
- **반드시 AskUserQuestion 도구를 사용하여** 2~3개 선택지를 제시한다.
  - 각 선택지에 preview를 포함하여 실제 문장을 비교할 수 있게 한다.
  - 각 선택지의 톤/구조 차이를 description에 짧게 설명한다.
- 사용자가 선택하면 즉시 파일에 반영한다.
- 사용자가 추가 의견을 주면 반영 후 다시 선택지를 제시한다.

### Step 3: Review after each paragraph
- 단락 확정 후 다음 단락으로 넘어가기 전에:
  - 시점 일관성 확인
  - 이전 단락과의 브릿지 자연스러움 확인
  - 문제가 있으면 사용자에게 알린다.

### Step 4: Full review
- 모든 단락 완성 후 전체 흐름을 검토한다.
- 단락별 역할(Hook, 태도 선언, 전환, 방법론, 마무리 등)을 표로 정리한다.
- 잡히는 점이 있으면 구체적으로 제안한다.

### Step 5: Publish as blog post
- 사용자가 요청하면 `blog/src/content/posts/` 에 MDX 파일을 생성한다.
- frontmatter 형식:
  ```
  ---
  title: "..."
  description: "..."
  pubDate: YYYY-MM-DD
  tags: [...]
  draft: false
  ---
  ```
- LinkedIn 글 맨 마지막에 blog link를 달아서 유입을 유도하는 구조를 안내한다.

### Step 6: Commit
- 각 작업 단위(단락 몇 개 완성, 전체 완성 등)마다 커밋을 제안한다.

## Important Rules

- 사용자가 선택하지 않은 방향으로 임의로 수정하지 않는다.
- 파일 수정 전 반드시 최신 상태를 Read로 확인한다.
- "반영해" 또는 "확정"이라는 말이 나올 때만 파일에 쓴다.
- 사용자가 직접 파일을 수정한 경우 그 변경을 존중한다.

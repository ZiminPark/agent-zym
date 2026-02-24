export interface HarnessItemImage {
  /** Filename in src/assets/harness/ (e.g. "session-management.png") */
  src: string;
  alt: string;
  caption?: string;
}

export interface HarnessItem {
  text: string;
  subItems?: string[];
  image?: HarnessItemImage;
  link?: string;
}

export interface HarnessSection {
  number: number;
  slug: string;
  title: string;
  summary: string;
  iconPath: string;
  gradient: string;
  items: HarnessItem[];
}

export const sections: HarnessSection[] = [
  {
    number: 0,
    slug: "setup",
    title: "Setup",
    summary: "Environment, logging, and session management essentials",
    iconPath:
      "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28ZM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
    gradient: "from-blue-600 to-cyan-500",
    items: [
      {
        text: "병렬로 App이 뜰 수 있게 만든다.",
        subItems: [
          "병렬 실행시 재시작되거나 Kill 하거나 다른 App에서 테스트하는 경우를 방지한다.",
          "포트 충돌 방지할 수 있게 만든다.",
        ],
      },
      {
        text: "log를 파일로 남긴다. backend error를 복붙하는거 병목이다.",
        subItems: [
          "timestamp와 로그가 발생한 파일도 작성해둔다.",
          "1줄로 남긴다. grep으로 한 방에 찾을 수 있게.",
        ],
      },
      {
        text: "CLAUDE.md (AGENTS.MD)는 Knowledge Dump가 아닌 Routing File 역할을 하도록 단순하게 유지한다.",
        subItems: ["architecture, schema 등 구체적인 내용은 docs/ 에 몰아 넣고 링크만 남긴다."],
      },
      {
        text: "세션 관리",
        subItems: [
          "한 화면에 2개 이상 세션은 안둔다. 인지력 부하가 온다",
          "탭으로 나눈다",
          "탭에 이름을 넣고 필요할 때만 나중에 이어서 작업할 때만 세션에 이름을 부여한다.",
        ],
        image: {
          src: "session-management.png",
          alt: "탭 기반 세션 관리 예시 — 각 탭에 작업 이름을 부여한 터미널 화면",
          caption:
            "탭에 이름을 넣고 필요할 때만 세션에 이름 부여",
        },
      },
      {
        text: "Plugin을 쓰되 SKILL.md 를 공부하고 사용한다. + 자신의 입맛에 수정해서 쓴다.",
      },
    ],
  },
  {
    number: 1,
    slug: "spec",
    title: "Spec",
    summary: "Requirements clarity before writing any code",
    iconPath:
      "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
    gradient: "from-violet-600 to-purple-500",
    items: [
      {
        text: "스펙 문서는 읽는다.",
        subItems: ["급하거나 피곤하면 안 읽는다. 하지만 결국 읽는게 빠르다."],
      },
      {
        text: "UI Component가 추가되는 Spec은 Terminal 내에서라도 Mock UI를 그려달라고 한다.",
        subItems: [
          "UX Designer & Product Owner 두 관점을 (병렬로) 고려해서 스펙을 작성해달라고 한다.",
        ],
      },
      {
        text: "모호한(Vague) 내용을 구체화 하고, 미지의 영역(Unknown)을 수면 위로 올리고, 구현 수단(Medium)을 탐색한다.",
        link: "https://github.com/team-attention/plugins-for-claude-natives/tree/main/plugins/clarify/skills",
      },
    ],
  },
  {
    number: 2,
    slug: "plan",
    title: "Plan",
    summary: "Structured implementation strategy with DAG ordering",
    iconPath:
      "M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z",
    gradient: "from-emerald-600 to-teal-500",
    items: [
      {
        text: "구현 순서를 DAG로 나타내라고 한다. (이 정도 하면 알아서 병렬 실행해준다)",
      },
      {
        text: "Plan이 Spec과 일치하는지 검토한다. 달라지는 경우가 있음.",
      },
      {
        text: "architecture, framework 결정, schema 설계 수준의 high level 기술적 결정은 \"읽고 이해한다\"",
      },
      {
        text: "Verification Plan도 같이 세우라고한다.",
        subItems: [
          "백엔드만 테스트하면 되는지 프론트엔드, E2E도 필요한지",
          "성공 조건을 읽는다.",
        ],
      },
    ],
  },
  {
    number: 3,
    slug: "execution",
    title: "Execution",
    summary: "Model selection, continuous work, and quality hooks",
    iconPath:
      "M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
    gradient: "from-orange-600 to-amber-500",
    items: [
      {
        text: "frontier model이 아니어도 되는 작업이면 모델 바꿔서 실행한다. plan에 opus를 쓰고 execution은 sonnet 쓰는것도 방법.",
      },
      {
        text: "verification이 완료될때까지 계속 작업하라고 시키기",
      },
      {
        text: "작업 종료 알림 받기",
      },
      {
        text: "worktree를 알아서 생성해서 작업하게 한다",
      },
      {
        text: "syntax error를 잡는 hook은 꼭 걸어둔다",
        subItems: [
          "line 수, style formatter 같은 인간을 위한 건 필요없다",
        ],
      },
    ],
  },
  {
    number: 4,
    slug: "verification",
    title: "Verification & Review",
    summary: "Systematic checking and continuous improvement loops",
    iconPath:
      "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    gradient: "from-rose-600 to-pink-500",
    items: [
      {
        text: "Verification 도구를 인지하고 개선해나간다.",
      },
      {
        text: "Spec/ Plan 에 있는 내용 구현되었는지 검토하라고 시킨다.",
      },
      {
        text: "선입력 시킨다. (자동화?)",
      },
      {
        text: "review agent를 만든다.",
      },
      {
        text: "버그는 test coverage로 남기고 compound한다.",
      },
    ],
  },
  {
    number: 5,
    slug: "compound",
    title: "Compound",
    summary: "Turn every session into lasting organizational knowledge",
    iconPath:
      "M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0L21.75 16.5 12 21.75 2.25 16.5l4.179-2.25m0 0 5.571 3 5.571-3",
    gradient: "from-indigo-600 to-blue-500",
    items: [
      {
        text: "버그 수정이 아닌 기능 추가 Spec 문서는 docs/ 또는 requirements/ 에 저장한다.",
      },
      {
        text: "자동화는 slash command부터 시작한다. Sub agent, Skill, Hook을 처음부터 만들지 않는다.",
        subItems: [
          "반복되는 워크플로우가 보이면 /command (Custom Slash Command)부터 만든다.",
          "자주 쓰는 command가 Claude 판단으로 자동 실행되어야 하면 Skill로 승격한다.",
          "도구 실행 전후에 매번 돌아야 하는 규칙이면 Hook으로 만든다.",
          "컨텍스트 격리가 필요하면 그때 Sub agent를 쓴다.",
        ],
      },
      {
        text: "\"이번에 에이전트가 멍청하게 행동한 부분이 어디인가?\" → 오답 노트 추가",
      },
      {
        text: "\"내가 말해주지 않았으면 에이전트가 몰랐을 내 취향은 무엇인가?\" → 취향(Taste) 문서화",
      },
      {
        text: "\"이 문제는 나중에도 또 발생할 것 같은가?\" → 해결책(Solution) 저장 또는 린터 추가",
      },
    ],
  },
];

export interface HarnessReference {
  title: string;
  url: string;
  domain: string;
}

export const references: HarnessReference[] = [
  {
    title: "Compound Engineering",
    url: "https://every.to/guides/compound-engineering",
    domain: "every.to",
  },
  {
    title: "SDD Tools — Exploring Gen AI",
    url: "https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html",
    domain: "martinfowler.com",
  },
  {
    title: "Harness Engineering",
    url: "https://openai.com/index/harness-engineering/",
    domain: "openai.com",
  },
  {
    title: "Effective Harnesses for Long-Running Agents",
    url: "https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents",
    domain: "anthropic.com",
  },
  {
    title: "How Every Codes with Agents",
    url: "https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents",
    domain: "every.to",
  },
  {
    title: "Building a C Compiler with an Agent",
    url: "https://www.anthropic.com/engineering/building-c-compiler",
    domain: "anthropic.com",
  },
  {
    title: "The Loop",
    url: "https://ghuntley.com/loop/",
    domain: "ghuntley.com",
  },
];

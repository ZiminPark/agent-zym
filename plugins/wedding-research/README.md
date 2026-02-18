# wedding-research

네이버 카페에서 키워드를 검색하고 후기를 분석하여 종합 리포트를 생성하는 스킬입니다. 웨딩 준비 업체 리서치에 최적화되어 있으며, 가격·장단점·비교·광고 판별까지 출처 링크가 포함된 마크다운 리포트를 자동 생성합니다.

## When this skill should run

Use `wedding-research` when the user wants to:

- 네이버 카페에서 특정 키워드로 후기를 검색하고 분석
- 웨딩 업체(예복, 드레스, 스튜디오 등) 후기를 종합 정리
- 가격대, 장단점, 업체 비교, 광고 vs 솔직 후기 판별
- 출처 링크가 포함된 마크다운 리포트 생성

## Install this skill

### skills.sh

```bash
npx skills add ZiminPark/agent-zym/plugins/wedding-research/skills/wedding-research
```

### Claude Code

```bash
/plugins marketplace add ZiminPark/agent-zym
/plugins install wedding-research
```

## Usage

```
/wedding-research 르셀루
/wedding-research 아이디어스튜디오 --cafe lemonterrace
/wedding-research 본식DVD --cafe 28757979
```

### Arguments

- **검색어** (필수): 검색할 키워드
- **--cafe** (선택): 카페 지정자 (카페 ID, URL, 한글 이름). 생략 시 기본값은 메이크마이웨딩 카페

## Output

`/Users/mac/wedding/{검색어}_후기_정리.md` 파일로 저장되며, 아래 목차를 포함합니다:

1. **기본 정보** - 위치, 서비스, 예약 방법 & 추천
2. **가격대 정리** - 구성별 가격표, 추가금, 할인 방법
3. **구성 & 상세** - 패키지 포함 항목, 옵션별 가격 차이
4. **장점** - 후기에서 반복 언급된 포인트 (출처 링크 포함)
5. **단점 / 아쉬운 점** - 출처 링크 포함
6. **같이 비교되는 업체 & 비교** - 비교표, 인용문
7. **광고 vs 솔직 후기 판별** - 단점 유무, 대가성 표기 등으로 분류
8. **추천 읽을 글** - 비교 후기, 상세 후기, 최근 후기 링크

## Example Output

<details>
<summary><code>/wedding-research 르셀루</code> 실행 결과 (클릭하여 펼치기)</summary>

# 르셀루 (Le Selu) 후기 종합 정리

> 출처: 네이버 카페 메이크마이웨딩 (ID: 28757979) | 검색 결과 239건 중 22개 분석 | 분석일: 2026-02-18

---

## 1. 기본 정보
- **위치**: 서울특별시 강남구 언주로113길 17, 1F~4F (언주역 도보 5분) ([#553621](https://cafe.naver.com/makemywedding/553621))
- **주력 서비스**: 맞춤 예복 + 촬영/본식 대여
- **대표**: 윤여준 대표님이 직접 상담하는 경우 많음 ([#522681](https://cafe.naver.com/makemywedding/522681))
- **같이 비교되는 업체**: 포튼가먼트, 테일러룸스, 클래씨엠, 디바인청담, 페이레네

### 예약 방법 & 추천

| 방법 | 장점 | 단점 |
|------|------|------|
| **워크인 (예약 없이 방문)** | **10% 할인** 적용 가능, 당일 계약 가능 | 대기 발생 가능 |
| **플래너 제휴 소개** | 대여복 추가 혜택 가능성 (플래너 통해 한벌 더) | 플래너 있어야 함 |
| **직접 예약 후 방문** | 원하는 시간에 확실한 상담 | 워크인 할인 못 받을 수 있음 |

## 2. 가격대 정리

| 구성 | 가격 | 출처 |
|------|------|------|
| **대여 4벌** (촬영+본식) | **90만원** | [#604573](https://cafe.naver.com/makemywedding/604573) |
| **맞춤 + 웨딩패키지** (올드게이트 원단) | **120만원** | [#522681](https://cafe.naver.com/makemywedding/522681) |
| **맞춤 + 대여 3벌** | **약 130만원** | [#609400](https://cafe.naver.com/makemywedding/609400) |
| **맞춤 + 대여 3벌** (영국 원단, 워크인 할인) | **140만원대** | [#612374](https://cafe.naver.com/makemywedding/612374) |
| **맞춤 + 수제화 + 셔츠 2벌 + 대여 3벌** | **155만원** | [#596610](https://cafe.naver.com/makemywedding/596610) |

## 4. 장점

- 대여복인데도 **맞춤 피팅 수준으로 체크** ([#615629](https://cafe.naver.com/makemywedding/615629))
- **웨딩홀 분위기와 신부 드레스를 먼저 확인 후** 예복 추천 ([#609858](https://cafe.naver.com/makemywedding/609858))
- 예산 상관없이 친절하고 자세하게 설명 ([#604573](https://cafe.naver.com/makemywedding/604573))

## 6. 같이 비교되는 업체

| 항목 | 포튼가먼트 | 르셀루 | 테일러룸스 |
|------|-----------|--------|-----------|
| 원단 | 드라고 | 까노니코 | 까노니코 |
| 가격 | **135만원** | **155만원** | **150만원** |
| 최종 선택 | - | **계약** | - |

## 한줄 요약

> 르셀루는 **청담 위치의 맞춤+대여 전문 예복샵**으로, 120~155만원대 가성비 + 대여복 다양성 + 드레스 매칭 상담이 강점.

</details>

## Requirements

- macOS / Linux (curl, perl 사용)
- 네이버 카페 API 접근 가능한 네트워크 환경
- 별도 인증 불필요 (공개 API 사용)

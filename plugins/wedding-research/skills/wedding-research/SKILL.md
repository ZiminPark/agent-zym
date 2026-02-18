---
name: wedding-research
description: 네이버 카페에서 키워드를 검색하고 후기를 분석하여 리포트를 생성합니다
argument-hint: "[검색어] (--cafe [카페ID/URL/이름])"
allowed-tools: Bash, Write, Read
---

네이버 카페에서 **$ARGUMENTS** 관련 후기를 검색하고 종합 리포트를 만들어줘.

---

## Step 0. 카페 ID 및 URL 이름 확인

인자에서 `--cafe` 뒤의 값을 카페 지정자로 사용해. `--cafe`가 없으면 **기본값: 카페 ID 28757979, cafeUrl: makemywedding** (메이크마이웨딩)을 사용해.
`--cafe` 부분은 검색어에서 제외해.

이 단계에서 반드시 **카페 ID**와 **cafeUrl**(영문 URL 이름) 두 가지를 모두 확보해야 해. 출처 링크 생성에 cafeUrl이 필요하기 때문이야.

카페 지정자가 숫자로만 이루어져 있으면 카페 ID로 사용하되, cafeUrl은 B단계 역순으로 확인해.

그 외의 경우 아래 순서로 카페 ID를 알아내:

### A. URL에서 추출 시도
지정자가 URL이면 아래 패턴으로 직접 추출:
- `cafe.naver.com/f-e/cafes/{카페ID}/...` → 숫자 부분이 카페 ID. cafeUrl은 B단계 역순으로 확인.
- `cafe.naver.com/{cafeUrl}` → cafeUrl 확보. B단계로 카페 ID 조회.

### B. 카페 URL 이름 ↔ ID 상호 조회
메인 페이지에서 추출:

```bash
# cafeUrl → 카페 ID
curl -s -L \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
  "https://cafe.naver.com/{cafeUrl}" | perl -ne 'print "$1\n" if /clubid=(\d+)/' | head -1
```

```bash
# 카페 ID → cafeUrl (ID만 있고 cafeUrl 모를 때)
curl -s -L \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
  "https://cafe.naver.com/f-e/cafes/{카페ID}" | perl -ne 'print "$1\n" if m{cafe\.naver\.com/(\w+)}' | sort -u | head -3
```

### C. 한글 카페 이름으로 검색
한글 이름이면 네이버 검색으로 cafeUrl을 먼저 찾아:

```bash
curl -s \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
  "https://search.naver.com/search.naver?where=nexearch&query={카페이름URL인코딩}+네이버+카페" \
  | perl -ne 'print "$1\n" if m{cafe\.naver\.com/(\w+)}' | head -3
```

후보 중 가장 관련 있는 cafeUrl을 골라서 B단계로 카페 ID를 얻어.

카페 ID와 cafeUrl을 확인한 후 사용자에게 "카페: {카페이름} (ID: {카페ID}, URL: {cafeUrl})" 형태로 알려줘.

---

## Step 1. 카페 내 검색

아래 API로 검색어를 URL 인코딩하여 호출해:

```bash
curl -s \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://cafe.naver.com" \
  "https://apis.naver.com/cafe-web/cafe-mobile/CafeMobileWebArticleSearchListV3?cafeId={카페ID}&query={검색어URL인코딩}&searchBy=0&page=1&perPage=50&adUnit=MW_CAFE_BOARD"
```

총 검색 건수와 글 목록(제목, 작성자, 날짜, 조회, 댓글, 좋아요)을 먼저 보여줘.

## Step 2. 주요 글 본문 수집

검색된 글 중 최근 + 조회수/댓글 많은 글 15~20개를 선별하여 본문을 가져와:

```bash
curl -s \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://cafe.naver.com" \
  "https://apis.naver.com/cafe-web/cafe-articleapi/v2.1/cafes/{카페ID}/articles/{글ID}?useCafeId=true"
```

본문에서 HTML 태그를 제거하고 텍스트만 추출해.

출처 링크 형식: `https://cafe.naver.com/{cafeUrl}/{글ID}`

## Step 3. 분석 및 리포트 생성

본문 내용을 분석하여 아래 목차의 마크다운 파일을 생성해.

**중요: 가격, 장단점, 비교 등 핵심 정보에는 반드시 해당 내용의 출처 글 링크를 달아줘.**

출처 표기 형식 예시:
- 표 안: `130만원 ([출처](https://cafe.naver.com/{cafeUrl}/632840))`
- 목록: `- 친절한 상담이 장점 ([#632840](https://cafe.naver.com/{cafeUrl}/632840))`
- 인용: `> "실결제 135만원 들었어요" - [사막별, 2025-12-07](https://cafe.naver.com/{cafeUrl}/621416)`

```markdown
# {검색어} 후기 종합 정리

> 출처: 네이버 카페 {카페이름} (ID: {카페ID}) | 검색 결과 N건 중 M개 분석 | 분석일: {오늘 날짜}

## 1. 기본 정보
- 위치 / 지점 목록
- 주력 서비스
- 후기 수 & 최근 활동 여부
- 같이 비교되는 업체 목록 (후기에서 함께 투어하거나 언급된 곳)

### 예약 방법 & 추천
- 후기에서 확인된 예약/방문 방법들을 정리 (워크인, 플래너 제휴, 직접 예약, 전화, 카톡 등)
- 방법별 장단점 비교표
- 어떤 방법이 가장 유리한지 추천

## 2. 가격대 정리
- 구성별 가격표 (각 가격에 출처 링크)
- 추가금 항목
- 할인 방법

## 3. 구성 & 상세
- 기본 패키지 포함 항목
- 옵션별 가격 차이

## 4. 장점 (후기에서 반복 언급된 포인트)
- 각 장점에 출처 링크

## 5. 단점 / 아쉬운 점
- 각 단점에 출처 링크

## 6. 같이 비교되는 업체 & 비교
- 후기에서 함께 투어/비교된 업체 목록표 (업체명, 비교 후기 출처, 르셀루 대비 특징)
- 비교 후기가 있으면 상세 비교표 작성 (가격, 구성, 원단, 선택 이유 등)
- 비교 후기에서의 생생한 인용문

## 7. 광고 vs 솔직 후기 판별
- 단점 유무, 대가성 표기, 계약 여부 등으로 분류
- 솔직 후기 / 광고 의심 후기 구분 (각각 링크 포함)

## 8. 추천 읽을 글 (링크)
- 비교 후기, 상세 후기, 최근 후기
```

파일은 `/Users/mac/wedding/{검색어}_후기_정리.md`로 저장해.

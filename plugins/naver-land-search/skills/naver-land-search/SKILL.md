---
name: naver-land-search
description: Search an apartment on Naver Real Estate and collect key information (units, age, FAR, recent transactions, 3-year high/low).
argument-hint: "[apartment name]"
allowed-tools: Bash
---

# Naver Land Apartment Search

Search for an apartment on Naver Real Estate (fin.land.naver.com) and collect structured information.

## Usage

```
/naver-land-search 대방대림
/naver-land-search 잠실엘스
```

## Arguments

- `apartment name` (required): Korean apartment name to search for

## Constraints

- MUST use `--headed` mode (headless is blocked by bot detection on this site)
- MUST navigate via URL with query parameter (keyboard input search may not trigger results)
- All `playwright-cli` commands run via the Bash tool

## Workflow

### Step 1: Open Browser

Open a headed Chrome browser and navigate directly to the search URL.

```bash
playwright-cli open --headed "https://fin.land.naver.com/search?q=<URL-encoded apartment name>"
```

### Step 2: Verify Search Results

Take a snapshot and read it to check results.

```bash
playwright-cli snapshot
```

- If **0 results**: report to user that no results were found.
- If **1 result**: proceed to Step 3 with that result.
- If **multiple results**: present the list to the user using AskUserQuestion and let them choose. Each result shows the type (아파트/빌라), name, and address.

### Step 3: Select Apartment

Click the chosen search result button. The page navigates to the apartment detail page.

### Step 4: Collect Basic Info

From the detail page snapshot, extract:

| Field | Location in snapshot |
|-------|---------------------|
| 세대수 | listitem near heading (e.g. "1,628세대") |
| 준공년도/년차 | listitem with date and 년차 (e.g. "1993. 11. (33년차)") |
| 용적률 | listitem (e.g. "용적률 272%") |

### Step 5: Select Area Type

The default area type may not match what user wants. Check the area toggle button and:

1. Click the area toggle to open the dropdown
2. Find the area type closest to the user's target (default: **전용 59m²**)
3. Click the matching option
4. Wait for page data to refresh

If the user specifies a target area, use that instead of the default 59m².

### Step 6: Collect Transaction Data

From the refreshed snapshot, extract:

| Field | Location in snapshot |
|-------|---------------------|
| 매매/전세 | The currently selected trade type toggle |
| 선택된 면적 | The area toggle label (e.g. "84.47㎡ (59.84)") |
| 최근 실거래 금액 | strong element after "최근 실거래" |
| 최근 실거래 날짜 | generic element with date after "최근 실거래" |
| 3년 내 최고 | text after "3년 내 최고" (price + contract date) |
| 3년 내 최저 | text after "3년 내 최저" (price + contract date) |

### Step 7: Close Browser

```bash
playwright-cli close
```

### Step 8: Report

Present the collected data in a structured table:

```
## <아파트명> (<주소>)

### 단지 기본 정보
| 항목 | 값 |
|------|-----|
| 세대수 | ... |
| 준공 | ... (..년차) |
| 용적률 | ...% |

### 매매 실거래 (전용 ..m²)
| 항목 | 값 |
|------|-----|
| 최근 실거래 | ...원 (YYYY.MM.DD) |
| 3년 내 최고 | ...원 (계약 YY년 M월) |
| 3년 내 최저 | ...원 (계약 YY년 M월) |
```

## Notes

- This site blocks headless browsers. Always use `--headed` mode.
- URL-based search (`?q=...`) is more reliable than typing into the search box.
- If the browser is already open, close it first before opening a new headed session.
- The skill defaults to 매매 (sale) trade type and 전용 59m² area. If the user specifies different preferences, adjust accordingly.

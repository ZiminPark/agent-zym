# naver-land-search

네이버 부동산(fin.land.naver.com)에서 아파트를 검색하고 주요 정보를 수집하는 Claude Code 스킬.

## Prerequisites

1. **playwright-cli** 설치

   ```bash
   npm install -g playwright-cli
   ```

   > https://github.com/microsoft/playwright-cli

2. **playwright-cli 스킬** 설치

   ```bash
   playwright-cli install --skills
   ```

## Usage

```
/naver-land-search 대방대림
/naver-land-search 잠실엘스
```

## Collected Data

- 단지 기본 정보: 세대수, 준공년도(년차), 용적률
- 매매 실거래: 최근 실거래(금액/날짜), 3년 내 최고/최저

## Notes

- headed 모드로 실행됩니다 (headless는 봇 감지로 차단됨)
- 기본값: 매매 / 전용 59m² 기준 (변경 가능)

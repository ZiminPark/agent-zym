#!/bin/bash
# stdin에서 JSON 읽기
INPUT=$(cat)
CWD=$(echo "$INPUT" | jq -r '.cwd // empty')
NOTIFICATION_TYPE=$(echo "$INPUT" | jq -r '.notification_type // empty')
TRANSCRIPT_PATH=$(echo "$INPUT" | jq -r '.transcript_path // empty')

# 디렉토리명 추출
DIR_NAME=$(basename "$CWD")

# transcript 파싱 (attention-hook 패턴)
if [[ -n "$TRANSCRIPT_PATH" && -f "$TRANSCRIPT_PATH" ]]; then
  # User input: 마지막 non-meta user 메시지
  USER_INPUT=$(jq -rs '[.[] | select(.type == "user" and (.isMeta | not))] | last | .message.content |
    if type == "string" then .
    elif type == "array" then [.[] | if .type == "text" then .text elif type == "string" then . else empty end] | join(" ")
    else "" end // ""' "$TRANSCRIPT_PATH")

  # Assistant output: 마지막 user 이후의 assistant text
  ASSISTANT_OUTPUT=$(jq -rs '
    (to_entries | map(select(.value.type == "user" and (.value.isMeta | not))) | last | .key // -1) as $lastUserIdx |
    [.[$lastUserIdx + 1:] | .[] | select(.type == "assistant") | .message.content[] | select(.type == "text") | .text] | join(" ")
  ' "$TRANSCRIPT_PATH")
fi

# Truncate (terminal-notifier 제한)
USER_INPUT="${USER_INPUT:0:100}"
ASSISTANT_OUTPUT="${ASSISTANT_OUTPUT:0:200}"

# 알림 전송
terminal-notifier \
  -title "hi $DIR_NAME - $NOTIFICATION_TYPE" \
  -subtitle "$USER_INPUT" \
  -message "$ASSISTANT_OUTPUT"

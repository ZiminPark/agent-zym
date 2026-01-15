#!/usr/bin/env python3
import json
import os
import subprocess
import sys
from typing import Any

from dotenv import load_dotenv

load_dotenv()


def _to_str(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, str):
        return value
    try:
        return json.dumps(value, ensure_ascii=False)
    except TypeError:
        return str(value)


def _truncate(text: str, max_len: int, suffix: str = "…") -> str:
    if max_len <= 0:
        return ""
    if len(text) <= max_len:
        return text
    suffix = suffix if len(suffix) < max_len else ""
    return text[: max_len - len(suffix)] + suffix


def _sanitize_for_codeblock(text: str) -> str:
    # Avoid breaking triple-backtick fenced blocks.
    return text.replace("```", "`\u200b``")


def _slack_code_section(label: str, body: str, *, max_text_len: int = 3000) -> str:
    prefix = f"*{label}*\n```"
    suffix = "```"
    max_body_len = max_text_len - len(prefix) - len(suffix)
    safe_body = _truncate(_sanitize_for_codeblock(body), max_body_len)
    return f"{prefix}{safe_body}{suffix}"


def _build_slack_blocks(title: str, prompt: str, assistant: str) -> list[dict[str, Any]]:
    header_text = _truncate(title, 150)
    prompt_text = _slack_code_section("Prompt", prompt)
    assistant_text = _slack_code_section("Assistant", assistant)

    blocks: list[dict[str, Any]] = [
        {"type": "header", "text": {"type": "plain_text", "text": header_text, "emoji": True}},
        {"type": "section", "text": {"type": "mrkdwn", "text": prompt_text}},
        {"type": "section", "text": {"type": "mrkdwn", "text": assistant_text}},
    ]
    return blocks


def _send_slack_notification(*, channel: str, token: str, title: str, prompt: str, assistant: str) -> None:
    try:
        from slack_sdk import WebClient
        from slack_sdk.errors import SlackApiError
    except Exception as e:
        print(f"Slack SDK unavailable: {e}", file=sys.stderr)
        return

    client = WebClient(token=token)
    blocks = _build_slack_blocks(title=title, prompt=prompt, assistant=assistant)
    text_fallback = _truncate(f"{title}\n{assistant}".strip(), 3000)

    try:
        client.chat_postMessage(channel=channel, text=text_fallback, blocks=blocks)
    except SlackApiError as e:
        error_code = None
        try:
            error_code = (e.response or {}).get("error")
        except Exception:
            error_code = None
        print(f"Slack notification failed: {error_code or e}", file=sys.stderr)


def main() -> int:
    if len(sys.argv) < 2:
        return 0

    try:
        notification = json.loads(sys.argv[1])
    except json.JSONDecodeError:
        return 0
    if notification.get("type") != "agent-turn-complete":
        return 0

    last_input_message = _to_str(notification.get("input-messages", ["no-input"])[-1]).strip()
    last_assistant_message = _to_str(notification.get("last-assistant-message", "Turn Complete!")).strip()

    cwd = os.getcwd()
    cwd_name = os.path.basename(cwd) or cwd

    title = _truncate(f"Codex: {cwd_name}".strip(), 150)

    slack_token = os.environ.get("SLACK_BOT_TOKEN", "").strip()
    slack_channel = os.environ.get("SLACK_CHANNEL", "").strip()
    if slack_token and slack_channel:
        _send_slack_notification(
            channel=slack_channel,
            token=slack_token,
            title=title,
            prompt=last_input_message,
            assistant=last_assistant_message,
        )

    try:
        subprocess.check_output(
            [
                "terminal-notifier",
                "-title",
                title,
                "-message",
                _truncate(last_assistant_message, 2000),
                "-group",
                "codex-" + cwd_name,
                "-activate",
                "com.googlecode.iterm2",
            ],
            stderr=subprocess.STDOUT,
        )
    except FileNotFoundError:
        print("terminal-notifier not found; skipping macOS notification.", file=sys.stderr)
    except subprocess.CalledProcessError as e:
        output = (e.output or b"").decode("utf-8", errors="replace")
        print(f"terminal-notifier failed: {output.strip()}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())


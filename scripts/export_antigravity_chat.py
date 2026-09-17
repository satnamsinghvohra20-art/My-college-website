"""
Export Antigravity Chat Transcript to Clean Markdown
Extracts full conversation history, user prompts, assistant answers, tool actions, and code changes.
"""
import json
import os
import glob
from datetime import datetime

TRANSCRIPT_PATH = r"C:\Users\satna\.gemini\antigravity-ide\brain\9fa86858-3d79-4e5f-9486-635515c7e00b\.system_generated\logs\transcript.jsonl"
OUT_MD = r"docs\ANTIGRAVITY_CHAT_AUTO_SAVE.md"
OUT_ROOT = r"ANTIGRAVITY_CHAT_HISTORY.md"

def parse_transcript(transcript_file):
    if not os.path.exists(transcript_file):
        print(f"File not found: {transcript_file}")
        return []

    entries = []
    with open(transcript_file, "r", encoding="utf-8", errors="replace") as f:
        for line_num, line in enumerate(f, 1):
            line = line.strip()
            if not line:
                continue
            try:
                data = json.loads(line)
                entries.append(data)
            except Exception as e:
                # skip malformed line
                continue
    return entries

def generate_markdown(entries):
    lines = [
        "# Antigravity Session Chat & Execution History (Auto-Saved)",
        "",
        f"> **Generated at:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        "> **Project:** CHM College Portal & Smart Campus Platform",
        "> **Repository:** `satnamsinghvohra20-art/My-college-website`",
        "> **Session ID:** `9fa86858-3d79-4e5f-9486-635515c7e00b`",
        "",
        "---",
        "",
        "## Table of Contents",
        "- [Session Summary](#session-summary)",
        "- [Full Chronological Dialogue](#full-chronological-dialogue)",
        "",
        "---",
        "",
        "## Session Summary",
        ""
    ]

    # Collect statistics
    user_turns = 0
    model_turns = 0
    tool_calls_count = 0
    user_prompts = []

    for entry in entries:
        stype = entry.get("type", "")
        source = entry.get("source", "")
        if stype == "USER_INPUT" or source == "USER_EXPLICIT":
            user_turns += 1
            content = entry.get("content", "").strip()
            # clean prompt tags if any
            clean_content = content.replace("<USER_REQUEST>", "").replace("</USER_REQUEST>", "").strip()
            if clean_content and clean_content not in user_prompts:
                user_prompts.append(clean_content)
        elif stype in ("PLANNER_RESPONSE", "CODE_ACTION") or source == "MODEL":
            model_turns += 1
            tc = entry.get("tool_calls", [])
            if tc:
                tool_calls_count += len(tc)

    lines.append(f"- **Total Recorded Steps:** {len(entries)}")
    lines.append(f"- **User Invocations:** {user_turns}")
    lines.append(f"- **Agent Responses / Model Steps:** {model_turns}")
    lines.append(f"- **Tool Actions Executed:** {tool_calls_count}")
    lines.append("")
    lines.append("### Major User Requests in This Session:")
    for i, p in enumerate(user_prompts, 1):
        lines.append(f"{i}. `{p}`")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Full Chronological Dialogue")
    lines.append("")

    turn_idx = 1
    for entry in entries:
        stype = entry.get("type", "")
        source = entry.get("source", "")
        content = entry.get("content", "")
        tool_calls = entry.get("tool_calls", [])
        step_idx = entry.get("step_index", "")

        # Skip purely system internal checkpoints or empty system noise unless it contains vital errors
        if stype in ("CHECKPOINT", "CONVERSATION_HISTORY", "KNOWLEDGE_ARTIFACTS") and not content:
            continue

        if stype == "USER_INPUT" or source == "USER_EXPLICIT":
            lines.append(f"### Turn {turn_idx}: 👤 User Request (Step #{step_idx})")
            # extract clean text without XML wrappers
            text = content
            if "<USER_REQUEST>" in text:
                parts = text.split("<USER_REQUEST>")
                if len(parts) > 1:
                    text = parts[1].split("</USER_REQUEST>")[0]
            lines.append(f"```text\n{text.strip()}\n```\n")
            turn_idx += 1

        elif source == "MODEL" or stype in ("PLANNER_RESPONSE", "CODE_ACTION"):
            # Assistant response
            if content and content.strip():
                lines.append(f"#### 🤖 Antigravity Assistant (Step #{step_idx})")
                lines.append(content.strip())
                lines.append("")

            # Log tool calls if any
            if tool_calls:
                lines.append(f"**🛠️ Actions Taken:**")
                for tc in tool_calls:
                    fn_name = tc.get("name", "tool")
                    args = tc.get("arguments", {})
                    action_summary = args.get("toolSummary") or args.get("toolAction") or fn_name
                    lines.append(f"- **{fn_name}**: `{action_summary}`")
                    if "CommandLine" in args:
                        lines.append(f"  - Command: `{args['CommandLine']}`")
                    if "TargetFile" in args:
                        lines.append(f"  - Target File: `{args['TargetFile']}`")
                    if "Description" in args:
                        lines.append(f"  - Note: {args['Description']}")
                lines.append("")

        elif stype == "SYSTEM_MESSAGE" or source == "SYSTEM":
            # Significant system notifications (e.g. task output)
            if content and ("finished with result" in content or "error" in content.lower()):
                lines.append(f"> ⚙️ **System Event (Step #{step_idx}):**")
                # Truncate very long system logs to first 10 lines
                clines = content.strip().split("\n")
                if len(clines) > 10:
                    lines.append("> " + "\n> ".join(clines[:10]))
                    lines.append(f"> ... [truncated {len(clines)-10} lines]")
                else:
                    lines.append("> " + "\n> ".join(clines))
                lines.append("")

    return "\n".join(lines)

def main():
    print(f"Reading transcript from {TRANSCRIPT_PATH}...")
    entries = parse_transcript(TRANSCRIPT_PATH)
    print(f"Parsed {len(entries)} events.")
    md_content = generate_markdown(entries)

    os.makedirs(os.path.dirname(OUT_MD), exist_ok=True)
    with open(OUT_MD, "w", encoding="utf-8") as f:
        f.write(md_content)
    print(f"Saved to {OUT_MD} ({os.path.getsize(OUT_MD)} bytes)")

    with open(OUT_ROOT, "w", encoding="utf-8") as f:
        f.write(md_content)
    print(f"Saved mirror to {OUT_ROOT} ({os.path.getsize(OUT_ROOT)} bytes)")

if __name__ == "__main__":
    main()

# Hooks

Hooks execute custom shell commands at key lifecycle points during agent sessions. Unlike instructions or prompts that guide behavior, hooks run **deterministically** with guaranteed outcomes.

## Why Use Hooks?

- **Enforce security policies** — block dangerous commands (`rm -rf`, `DROP TABLE`)
- **Automate code quality** — run formatters, linters, tests after edits
- **Create audit trails** — log every tool invocation for compliance
- **Inject context** — add project info at session start
- **Control approvals** — auto-approve safe operations, require confirmation for sensitive ones

## Quick Start

Create `.github/hooks/format.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": "npx prettier --write \"$TOOL_INPUT_FILE_PATH\""
      }
    ]
  }
}
```

After saving, VS Code loads the hook automatically. The next time the agent edits a file, Prettier runs on it.

## Hook Lifecycle Events

| Event | When It Fires | Example Use |
|---|---|---|
| `SessionStart` | First prompt of new session | Initialize resources, log session start |
| `UserPromptSubmit` | User submits a prompt | Audit requests, inject context |
| `PreToolUse` | Before agent invokes a tool | Block dangerous ops, require approval |
| `PostToolUse` | After tool completes | Run formatters, log results |
| `PreCompact` | Before context is compacted | Export important context |
| `SubagentStart` | Subagent is spawned | Track nested agent usage |
| `SubagentStop` | Subagent completes | Aggregate results, cleanup |
| `Stop` | Agent session ends | Generate reports, cleanup |

## Hook File Locations

| Scope | Location |
|---|---|
| Workspace | `.github/hooks/*.json` |
| Workspace (Claude) | `.claude/settings.json`, `.claude/settings.local.json` |
| User | `~/.copilot/hooks`, `~/.claude/settings.json` |
| Custom agent | `hooks` field in `.agent.md` frontmatter |

Workspace hooks take precedence over user hooks.

## Configuration Format

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/validate-tool.sh",
        "timeout": 15
      }
    ],
    "PostToolUse": [
      {
        "type": "command",
        "command": "npx prettier --write \"$TOOL_INPUT_FILE_PATH\""
      }
    ]
  }
}
```

### Command Properties

| Property | Type | Description |
|---|---|---|
| `type` | string | Must be `"command"` |
| `command` | string | Default command (cross-platform) |
| `windows` | string | Windows-specific override |
| `linux` | string | Linux-specific override |
| `osx` | string | macOS-specific override |
| `cwd` | string | Working directory (relative to repo root) |
| `env` | object | Additional environment variables |
| `timeout` | number | Timeout in seconds (default: 30) |

## Hook Input/Output

Hooks communicate via stdin (JSON input) and stdout (JSON output).

### Common Input

```json
{
  "timestamp": "2026-02-09T10:30:00.000Z",
  "cwd": "/path/to/workspace",
  "sessionId": "session-id",
  "hookEventName": "PreToolUse"
}
```

### Common Output

```json
{
  "continue": true,
  "stopReason": "Security policy violation",
  "systemMessage": "Warning shown to user"
}
```

### Exit Codes

| Code | Meaning |
|---|---|
| `0` | Success — parse stdout as JSON |
| `2` | Blocking error — stop processing, show error to model |
| Other | Non-blocking warning — show warning, continue |

## PreToolUse — Block or Modify Tool Calls

Extra input: `tool_name`, `tool_input`, `tool_use_id`

Output via `hookSpecificOutput`:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Destructive command blocked"
  }
}
```

Permission decisions: `"allow"` < `"ask"` < `"deny"` (most restrictive wins).

## Agent-Scoped Hooks

Define hooks in a custom agent's frontmatter (enable `chat.useCustomAgentHooks`):

```markdown
---
name: "Strict Formatter"
hooks:
  PostToolUse:
    - type: command
      command: "./scripts/format-changed-files.sh"
---

You are a code editing agent. Files are auto-formatted after every edit.
```

## Configure with UI

- Type `/hooks` in chat
- Or run `Chat: Configure Hooks` from Command Palette
- Or use gear icon → **Hooks** in Chat view

Generate a hook with AI: type `/create-hook` and describe the automation you want.

## Security Considerations

::: warning
Hooks execute shell commands with the same permissions as VS Code. Review configurations carefully, especially from untrusted sources.
:::

- Inspect all hook scripts before enabling
- Use the principle of least privilege
- Validate and sanitize all input to prevent injection
- Never hardcode secrets — use environment variables

## References

- [Agent hooks in VS Code](https://code.visualstudio.com/docs/copilot/customization/hooks)

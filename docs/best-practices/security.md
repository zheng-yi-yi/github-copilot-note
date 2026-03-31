# Security

AI-powered development can autonomously modify files, run commands, and access external services. Understanding VS Code's security controls helps you stay safe while leveraging the full power of agents.

## Recommended Security Baseline

1. **Open untrusted projects in restricted mode** — disables agents until you've reviewed content
2. **Enable terminal sandboxing** — `chat.tools.terminal.sandbox.enabled` (macOS/Linux)
3. **Review all file edits before accepting** — use the diff editor to inspect changes
4. **Protect sensitive files** — configure `chat.tools.edits.autoApprove` with glob patterns (e.g., `"**/.env": false`)
5. **Keep auto-approval scoped to the session** — grant permissions at session level, not user level
6. **Review MCP servers before trusting** — verify source and configuration

## Trust Boundaries

VS Code uses explicit trust boundaries — each requires consent before it's trusted:

| Boundary | What It Controls |
|---|---|
| **Workspace** | Tasks, debugging, workspace settings that can execute code |
| **Extension publisher** | Extensions from a given publisher |
| **MCP server** | Whether an MCP server can start and provide tools |
| **Network domain** | Whether the agent can fetch content from a URL |

You can **revoke trust** at any time via Command Palette.

## Permission Levels

The permissions picker controls agent autonomy:

| Level | Behavior |
|---|---|
| **Default Approvals** | Uses your configured approval settings |
| **Bypass Approvals** | Auto-approves all tool calls |
| **Autopilot** | Auto-approves everything, drives agent to task completion |

## Scope and Isolation

- **Workspace-limited file access** — agents can only read/write files within the workspace
- **Tools picker** — selectively enable/disable specific tools
- **Session isolation** — permissions don't persist beyond the current session
- **Request limits** — prevent runaway operations
- **Agent isolation** — background agents work in separate Git worktrees; cloud agents run remotely

## Approval Controls

- **Terminal approval** — agents request confirmation before running commands; configurable auto-approve rules with regex patterns
- **Tool approval** — MCP tool invocations require explicit approval (session/workspace/user scope)
- **URL approval** — two-step flow: trust the domain, then review fetched content
- **File edit review** — review suggested changes in diff editor before applying

## Terminal Sandboxing (macOS/Linux)

Enable `chat.tools.terminal.sandbox.enabled` to restrict:
- File system access (read/write only in working directory by default)
- Network access (all blocked by default, configure allowed domains)

::: warning
Terminal sandboxing is the strongest protection against malicious commands. For prompt injection concerns, use sandboxing or dev containers rather than auto-approval rules alone.
:::

## MCP Server Sandboxing (macOS/Linux)

Enable `sandboxEnabled: true` in server config to restrict file system and network access:

```json
{
  "servers": {
    "myServer": {
      "command": "npx",
      "args": ["-y", "@example/mcp-server"],
      "sandboxEnabled": true,
      "sandbox": {
        "filesystem": { "allowWrite": ["${workspaceFolder}"] },
        "network": { "allowedDomains": ["api.example.com"] }
      }
    }
  }
}
```

## Hooks for Security

Use [hooks](/customization/hooks) for deterministic security enforcement:

- **`PreToolUse`** — block dangerous commands (`rm -rf`, `DROP TABLE`)
- **Permission decisions** — return `allow`, `deny`, or `ask` per tool call
- **Audit trails** — log every tool invocation for compliance

## Security Risks to Watch

- **Execution and access** — agents can run terminal commands with your permissions
- **Supply chain** — AI-suggested dependencies may have vulnerabilities
- **Auto-approval tradeoffs** — convenience vs. control
- **Information exposure** — sensitive data in prompts goes to the model
- **Prompt injection** — malicious content in fetched resources or files

## Enterprise Policies

Organizations can enforce centralized controls:

| Policy | Effect |
|---|---|
| `ChatAgentMode` | Disable agent mode entirely |
| `ChatAgentExtensionTools` | Block extension-contributed tools |
| `ChatMCP` | Restrict MCP to curated registry or disable |
| `ChatToolsAutoApprove` | Disable global auto-approval |
| `ChatToolsTerminalEnableAutoApprove` | Disable terminal auto-approval |

## References

- [Security in VS Code](https://code.visualstudio.com/docs/copilot/security)
- [GitHub Copilot Trust Center](https://resources.github.com/copilot-trust-center/)
- [Enterprise AI settings](https://code.visualstudio.com/docs/enterprise/ai-settings)

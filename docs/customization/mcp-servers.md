# MCP Servers

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open standard for connecting AI models to external tools and data sources. MCP servers provide tools for tasks like file operations, databases, or external APIs — extending what the agent can do beyond your local workspace.

## Quick Start

1. Open Extensions view (<kbd>Ctrl+Shift+X</kbd>) → search `@mcp playwright`
2. Install the Playwright MCP server
3. Confirm trust when prompted
4. Open Chat and use the tools:

```
Go to code.visualstudio.com, decline the cookie banner,
and give me a screenshot of the homepage.
```

## Adding MCP Servers

### From the MCP Gallery

1. Open Extensions view → search `@mcp` for available servers
2. **Install** to user profile, or right-click → **Install in Workspace** (updates `.vscode/mcp.json`)

### Manual Configuration (mcp.json)

Create or edit `.vscode/mcp.json` in your workspace:

```json
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@microsoft/mcp-server-playwright"]
    }
  }
}
```

For user-level configuration, run `MCP: Open User Configuration`.

::: warning
**Never hardcode API keys.** Use input variables or environment files instead.
:::

### From the Command Line

```bash
code --add-mcp '{"name":"playwright","command":"npx","args":["-y","@microsoft/mcp-server-playwright"]}'
```

## MCP Capabilities

| Capability | Description | How to Access |
|---|---|---|
| **Tools** | Functions the agent can call (query DB, call API, etc.) | Available automatically in chat |
| **Resources** | Read-only data (files, DB tables, API responses) | Add Context → MCP Resources |
| **Prompts** | Preconfigured prompt templates | Type `/<server>.<prompt>` in chat |
| **MCP Apps** | Interactive UI components (forms, visualizations) | Appear inline in chat |

## Sandboxing (macOS/Linux)

Restrict MCP server access to specific files and network domains:

```json
{
  "servers": {
    "myServer": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@example/mcp-server"],
      "sandboxEnabled": true,
      "sandbox": {
        "filesystem": {
          "allowWrite": ["${workspaceFolder}"]
        },
        "network": {
          "allowedDomains": ["api.example.com"]
        }
      }
    }
  }
}
```

::: info
Sandboxing is currently not available on Windows.
:::

## Managing Servers

- **Extensions view** — right-click in MCP SERVERS - INSTALLED section
- **mcp.json editor** — use inline code lens actions
- **Command Palette** — `MCP: List Servers`
- **Enable/Disable** — right-click server or use Chat Customizations editor

## Trust and Security

- First-time start requires trust confirmation
- Review configuration before trusting
- Reset trust: `MCP: Reset Trust` from Command Palette
- Organizations can centrally manage MCP access via GitHub policies

## Sync Across Devices

Enable Settings Sync → run `Settings Sync: Configure` → enable **MCP Servers**.

## Troubleshooting

- Check the **MCP output log**: select error in chat → Show Output
- Or run `MCP: List Servers` → select server → Show Output
- Docker servers: ensure Docker Desktop is running and ports are correct

## References

- [MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
- [MCP configuration reference](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration)
- [Model Context Protocol docs](https://modelcontextprotocol.io/)

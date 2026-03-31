# Agent Plugins

Agent plugins are prepackaged bundles of chat customizations that you can discover and install from plugin marketplaces. A single plugin can provide any combination of slash commands, agent skills, custom agents, hooks, and MCP servers.

## What Plugins Provide

A plugin can bundle:

- **Slash commands** — additional `/` commands
- **Skills** — [agent skills](./agent-skills) with instructions and scripts
- **Agents** — [custom agents](./custom-agents) with specialized personas
- **Hooks** — [lifecycle hooks](./hooks) for automation
- **MCP servers** — [MCP servers](./mcp-servers) for external tools

Example plugin structure:

```
my-testing-plugin/
  plugin.json              # Plugin metadata
  skills/
    test-runner/
      SKILL.md             # Testing skill
      run-tests.sh         # Supporting script
  agents/
    test-reviewer.agent.md # Code review agent
  hooks/
    hooks.json             # Hook configuration
  .mcp.json                # MCP server definitions
```

::: warning
Plugins can include hooks and MCP servers that run code on your machine. Review plugin contents and publisher before installing.
:::

## Discovering and Installing

### From Marketplaces

1. Open Extensions view (<kbd>Ctrl+Shift+X</kbd>) → search `@agentPlugins`
2. Browse available plugins
3. Select **Install** to add to your user profile

### From Source

Run `Chat: Install Plugin From Source` and enter a Git repository URL.

### Managing Plugins

- View installed: **Agent Plugins - Installed** section in Extensions view
- Enable/disable: context menu on plugin, or Chat Customizations editor
- Uninstall: right-click → Uninstall

Disabling a plugin disables all its skills, agents, hooks, MCP servers, and commands.

## Configuring Marketplaces

Default marketplaces: [copilot-plugins](https://github.com/github/copilot-plugins) and [awesome-copilot](https://github.com/github/awesome-copilot/)

Add additional marketplaces:

```json
// settings.json
"chat.plugins.marketplaces": [
    "anthropics/claude-code"
]
```

Supported formats:
- Shorthand: `owner/repo`
- HTTPS: `https://github.com/org/repo.git`
- SSH: `git@github.com:org/repo.git`
- Local: `file:///path/to/marketplace`

## Local Plugins

Register manually cloned plugins:

```json
// settings.json
"chat.pluginLocations": {
    "/path/to/my-plugin": true,
    "/path/to/another-plugin": false
}
```

## Workspace Recommendations

Projects can recommend plugins for team members:

```json
{
  "extraKnownMarketplaces": {
    "company-tools": {
      "source": {
        "source": "github",
        "repo": "your-org/plugin-marketplace"
      }
    }
  },
  "enabledPlugins": {
    "code-formatter@company-tools": true
  }
}
```

## Hooks in Plugins

Plugin hooks use the same format as workspace hooks. Use `${CLAUDE_PLUGIN_ROOT}` to reference scripts within the plugin:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": "${CLAUDE_PLUGIN_ROOT}/scripts/format.sh"
      }
    ]
  }
}
```

## MCP Servers in Plugins

Plugin MCP servers use `mcpServers` (not `servers`) in `.mcp.json`:

```json
{
  "mcpServers": {
    "plugin-api": {
      "command": "npx",
      "args": ["@company/mcp-server", "--plugin-mode"],
      "cwd": "${CLAUDE_PLUGIN_ROOT}"
    }
  }
}
```

Plugin MCP servers are implicitly trusted (no separate trust prompt).

## References

- [Agent plugins in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-plugins)
- [Finding and installing plugins for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing)

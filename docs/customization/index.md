# Customization

This section covers all the ways you can customize GitHub Copilot's behavior in VS Code — from simple instruction files to full agent plugins.

## Getting Started

The quickest way to start customizing is to run `/init` in chat. VS Code analyzes your workspace and generates a starter configuration.

::: tip
Use the **Chat Customizations editor** to discover, create, and manage all customizations in one place. Run `Chat: Open Chat Customizations` from the Command Palette.
:::

## Which Approach Should I Use?

| I want to... | Use this |
|---|---|
| Set project-wide coding standards | [Custom Instructions](./custom-instructions) — `.github/copilot-instructions.md` |
| Different rules for different file types | [Custom Instructions](./custom-instructions) — `.instructions.md` with `applyTo` |
| Create a reusable slash command | [Prompt Files](./prompt-files) — `.prompt.md` |
| Package scripts and resources for a task | [Agent Skills](./agent-skills) — `SKILL.md` folder |
| Create a specialized AI persona | [Custom Agents](./custom-agents) — `.agent.md` |
| Connect to external APIs/databases | [MCP Servers](./mcp-servers) — `mcp.json` |
| Automate tasks at lifecycle events | [Hooks](./hooks) — `.github/hooks/*.json` |
| Install pre-packaged customizations | [Agent Plugins](./agent-plugins) |

## Customization Guides

- **[Custom Instructions](./custom-instructions)** — Define coding standards and guidelines that apply automatically.
- **[Prompt Files](./prompt-files)** — Create reusable task prompts invoked as slash commands.
- **[Agent Skills](./agent-skills)** — Package multi-step capabilities with scripts and resources.
- **[Custom Agents](./custom-agents)** — Create specialized AI personas with tool restrictions.
- **[MCP Servers](./mcp-servers)** — Connect to external tools and data sources.
- **[Hooks](./hooks)** — Execute shell commands at agent lifecycle points.
- **[Agent Plugins](./agent-plugins)** — Discover and install pre-packaged customization bundles.

## References

- [Customization concepts](/concepts/customization)
- [Customization overview](https://code.visualstudio.com/docs/copilot/customization/overview)

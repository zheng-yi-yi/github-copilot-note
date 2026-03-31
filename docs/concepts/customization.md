# Customization

AI models have broad general knowledge but don't know your codebase or team practices. Customization is how you share that context, so responses match your coding standards, project structure, and workflows.

## Customization Options at a Glance

| Goal | Mechanism | Example | When It Applies |
|---|---|---|---|
| Apply coding standards everywhere | **Always-on instructions** | Enforce ESLint rules, require JSDoc | Every request automatically |
| Different rules for different files | **File-based instructions** | React patterns for `.tsx` files | When files match a pattern |
| Reusable task I run repeatedly | **Prompt files** | Scaffold a React component | When you invoke a `/` command |
| Package multi-step workflow with scripts | **Agent skills** | Test, lint, and deploy pipeline | When task matches skill description |
| Specialized AI persona with tool restrictions | **Custom agents** | Security reviewer, database admin | When you select it |
| Connect to external APIs or databases | **MCP servers** | Query a PostgreSQL database | When task matches a tool |
| Automate tasks at agent lifecycle points | **Hooks** | Run formatter after every edit | At matching lifecycle events |
| Install pre-packaged customizations | **Agent plugins** | Community testing plugin | When you install a plugin |

## Where to Start

1. **Start with custom instructions** for project-wide standards — create `.github/copilot-instructions.md`
2. **Add prompt files** when you have repeatable tasks — create `.prompt.md` files
3. **Use MCP** when you need external data — configure `mcp.json`
4. **Create custom agents** for specialized personas — create `.agent.md` files
5. **Combine** multiple customization types as your needs grow

## How They Work Together

```
Always-on instructions     ──→ Applied to every request
File-based instructions    ──→ Applied when files match patterns
Prompt files               ──→ Invoked manually via /command
Agent skills               ──→ Loaded on-demand when relevant
Custom agents              ──→ Selected by user or delegated to
MCP servers                ──→ Tools available when task matches
Hooks                      ──→ Execute at lifecycle events
Agent plugins              ──→ Bundle all of the above
```

## Instruction Priority

When multiple instruction types exist, they are all provided to the AI. Higher priority wins on conflicts:

1. **Personal instructions** (user-level) — highest priority
2. **Repository instructions** (`.github/copilot-instructions.md` or `AGENTS.md`)
3. **Organization instructions** — lowest priority

## Detailed Guides

- [Custom Instructions](/customization/custom-instructions) — `.github/copilot-instructions.md`, `.instructions.md`, `AGENTS.md`
- [Prompt Files](/customization/prompt-files) — `.prompt.md` reusable task prompts
- [Agent Skills](/customization/agent-skills) — `SKILL.md` portable capabilities
- [Custom Agents](/customization/custom-agents) — `.agent.md` specialized personas
- [MCP Servers](/customization/mcp-servers) — external tools and data sources
- [Hooks](/customization/hooks) — lifecycle automation
- [Agent Plugins](/customization/agent-plugins) — pre-packaged bundles

## References

- [Customization concepts](https://code.visualstudio.com/docs/copilot/concepts/customization)
- [Customization overview](https://code.visualstudio.com/docs/copilot/customization/overview)

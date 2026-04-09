# Customization

You can customize GitHub Copilot CLI with custom instructions, agents, skills, MCP servers, hooks, and memory to tailor the experience to your workflow.

## Custom Instructions

Custom instructions give Copilot additional context about your project, coding standards, and how to build, test, and validate changes. All custom instruction files combine automatically.

Copilot CLI supports:

| Type | Location | Scope |
|---|---|---|
| **Repository-wide** | `.github/copilot-instructions.md` | Entire project |
| **Path-specific** | `.github/instructions/**/*.instructions.md` | Specific file paths |
| **Agent files** | `AGENTS.md` | Agent-level behavior |

For more information, see [Adding custom instructions for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions).

## Custom Agents

Custom agents are specialized versions of Copilot for different tasks. They help Copilot handle unique workflows, coding conventions, and specialist use cases.

### Built-in Agents

Copilot CLI includes a default set of agents:

| Agent | Purpose |
|---|---|
| **Explore** | Quick codebase analysis without adding to your main context |
| **Task** | Execute commands like tests and builds; brief summaries on success, full output on failure |
| **General-purpose** | Complex multi-step tasks with full toolset and high-quality reasoning |
| **Code-review** | Review changes focusing on genuine issues, minimizing noise |

The AI model may automatically delegate tasks to a subagent if it judges that would be more effective.

### Defining Custom Agents

Create custom agents using Markdown files (agent profiles) that specify expertise, available tools, and response instructions.

| Level | Location | Scope |
|---|---|---|
| **User-level** | `~/.copilot/agents/` | All projects |
| **Repository-level** | `.github/agents/` (local and remote) | Current project |
| **Organization/Enterprise** | `/agents/` in `.github-private` repo | All org/enterprise projects |

::: tip
In case of naming conflicts: system-level agent > repository-level agent > organization-level agent.
:::

### Using Custom Agents

- **Slash command**: `/agent` — Select from the list of available agents.
- **In a prompt**: `Use the refactoring agent to refactor this code block` — Copilot infers the agent.
- **Command-line option**: `copilot --agent=refactor-agent --prompt "Refactor this code block"`

## Skills

Skills enhance Copilot's ability to perform specialized tasks with instructions, scripts, and resources. You can create skills to teach Copilot domain-specific knowledge or workflows.

For more information, see [Creating agent skills for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-skills).

## MCP Servers

Model Context Protocol (MCP) servers give Copilot access to different data sources and tools. Copilot CLI comes with the **GitHub MCP server** pre-configured, allowing you to interact with GitHub.com resources.

### Adding an MCP Server

1. In an interactive session, use the `/mcp add` slash command.
2. Fill in the server details using <kbd>Tab</kbd> to move between fields.
3. Press <kbd>Ctrl+S</kbd> to save.

MCP server configurations are stored in `mcp-config.json`, located by default in `~/.copilot/`. This location can be changed via the `COPILOT_HOME` environment variable.

### Using MCP Servers

Once configured, Copilot can use MCP server tools automatically. You can guide tool usage by referencing the server in your prompt:

```
Use the GitHub MCP server to find good first issues from org/repo
```

Use `/mcp` in an interactive session to view and manage your configured servers.

## Hooks

Hooks let you execute custom shell commands at key points during agent execution, enabling validation, logging, security scanning, or workflow automation.

For more information, see [About hooks](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-hooks).

## Copilot Memory

Copilot Memory allows Copilot to build a persistent understanding of your repository by storing "memories" — pieces of information about coding conventions, patterns, and preferences. This reduces the need to repeatedly explain context and makes future sessions more productive.

For more information, see [About agentic memory for GitHub Copilot](https://docs.github.com/en/copilot/concepts/agents/copilot-memory).

## References

- [Adding custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions)
- [Creating custom agents](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-custom-agents)
- [Creating agent skills](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-skills)
- [Extending with MCP](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/extend-cloud-agent-with-mcp)

# Agents

Agents are the orchestration layer that combines language models, context, and tools to perform multi-step development tasks. While an LLM generates text, an agent can plan, execute, verify, and iterate autonomously.

## The Agent Loop

The core mechanism behind agent mode:

```
User prompt
    ↓
┌─────────────────┐
│ Assemble context │ ← files, history, instructions, tool outputs
│ Call LLM         │
│ Execute tools    │ → read files, edit code, run terminal, search
│ Check result     │
└────────┬────────┘
         │ not done
         └──→ loop back
```

Each iteration: the agent assembles context → calls the model → executes tools → feeds results back. This continues until the task is complete or the agent needs your input.

## Agent Types

VS Code supports three types of agents that trade off interactivity, speed, and isolation:

| Type | Where It Runs | Best For |
|---|---|---|
| **Local agents** | Inside VS Code | Interactive work, quick iteration, full tool/extension access |
| **Background agents (Copilot CLI)** | Local machine, outside VS Code | Well-defined tasks that run autonomously while you work |
| **Cloud agents** | Remote infrastructure (GitHub) | Team collaboration, PR-based workflows, large-scale refactoring |

### Local Agents

Run in your editor with full access to workspace, tools, and extensions. Built-in local agents:

- **Agent** — general-purpose, multi-file editing with full tool access
- **Ask** — read-only Q&A, no file modifications
- **Plan** — structured planning before implementation (see [Planning](/agents/planning))

### Background Agents (Copilot CLI)

Run independently on your local machine using the Copilot CLI. Create sessions from the Chat view or hand off from local agents. Support worktree isolation to prevent interference with your active work. See [Copilot CLI](/agents/copilot-cli).

### Cloud Agents

Run on remote infrastructure (e.g., GitHub Copilot coding agent). Create pull requests and integrate with team review workflows. See [Cloud Agents](/agents/cloud-agents).

## Subagents

Subagents are independent AI agents that perform focused work and report results back to the main agent. They provide **context isolation** — the subagent works in its own context window, keeping the main conversation clean.

Key patterns:
- **Research before implementation** — delegate investigation to a subagent
- **Parallel code analysis** — run multiple analyses simultaneously
- **Multi-perspective review** — each review perspective in its own subagent

See [Subagents](/agents/subagents) for details.

## Memory

Agents use memory to retain context across conversations:

- **User memory** — persists across all workspaces (preferences, patterns)
- **Repository memory** — scoped to the current workspace (conventions, build commands)
- **Session memory** — scoped to the current conversation (task-specific notes)

See [Memory](/agents/memory) for details.

## Handoff Between Agent Types

You can hand off sessions between agent types:

- **Local → Copilot CLI** — plan locally, implement in background
- **Local → Cloud** — plan locally, implement via PR
- **Copilot CLI → Cloud** — use `/delegate` to hand off to cloud

The full conversation history and context carries over.

## References

- [Agents concepts](https://code.visualstudio.com/docs/copilot/concepts/agents)
- [Agents overview](https://code.visualstudio.com/docs/copilot/agents/overview)

# Memory

Agents in VS Code use memory to retain context across conversations. Rather than starting from scratch each session, agents recall your preferences, apply lessons from previous tasks, and build up knowledge about your codebase.

## Memory Tool (Local)

The memory tool is a built-in agent tool that saves and recalls notes as the agent works. All data is stored locally on your machine.

::: tip
Enable or disable the memory tool with the `github.copilot.chat.tools.memory.enabled` setting.
:::

### Memory Scopes

| Scope | Path | Persists Across Sessions | Persists Across Workspaces | Use For |
|---|---|---|---|---|
| **User** | `/memories/` | ✅ | ✅ | Preferences, patterns, frequently used commands |
| **Repository** | `/memories/repo/` | ✅ | ❌ (workspace-scoped) | Codebase conventions, project structure, build commands |
| **Session** | `/memories/session/` | ❌ (cleared when chat ends) | ❌ | Task-specific context, in-progress plans |

### User Memory

Persists across all workspaces and conversations. The first 200 lines are automatically loaded into context at the start of every session.

```
Remember that I prefer tabs over spaces and always use single quotes in JavaScript
```

### Repository Memory

Scoped to the current workspace. Use for codebase-specific facts.

```
Remember that this project uses the repository pattern for data access
and all API endpoints require authentication
```

### Session Memory

Scoped to the current conversation. The Plan agent uses session memory to persist its implementation plan in `plan.md`.

### Storing and Retrieving

**Store:** Ask the agent to remember something — it determines the appropriate scope automatically.

```
Remember that our team uses conventional commits for all commit messages
```

**Retrieve:** Ask about it in a new conversation.

```
What are our commit message conventions?
```

### Managing Memory Files

- `Chat: Show Memory Files` — view all memory files across scopes
- `Chat: Clear All Memory Files` — remove all memories

## Copilot Memory (GitHub-Hosted)

Copilot Memory is a separate, GitHub-hosted memory system that lets Copilot learn repository-specific insights as it works. Unlike the local memory tool, Copilot Memory is shared across multiple surfaces (coding agent, code review, Copilot CLI).

### Key Differences

| Feature | Local Memory Tool | Copilot Memory |
|---|---|---|
| Storage | Local (your machine) | GitHub-hosted (remote) |
| Scopes | User, repository, session | Repository only |
| Shared across surfaces | No (VS Code only) | Yes (coding agent, code review, CLI) |
| Created by | You or the agent during chat | Copilot agents automatically |
| Enabled by default | Yes | No (opt-in) |
| Expiration | Manual management | Automatic (28 days) |

### Enabling Copilot Memory

1. Enable in your [GitHub Copilot settings](https://github.com/settings/copilot)
2. Enable VS Code integration: `github.copilot.chat.copilotMemory.enabled`
3. Repository owners can review stored memories in Repository Settings > Copilot > Memory

## References

- [Memory in VS Code agents](https://code.visualstudio.com/docs/copilot/agents/memory)
- [Enabling and curating Copilot Memory](https://docs.github.com/copilot/how-tos/use-copilot-agents/copilot-memory)

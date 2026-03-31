# Agents

Agents in VS Code use language models and tools to perform development tasks autonomously. This section covers how to use each type of agent effectively.

## Agent Types

![image-20260331145452744](images/index/image-20260331145452744.png)

| Agent Type | Where It Runs | Interactivity | Best For |
|---|---|---|---|
| **Local** | Inside VS Code | High — you see every step | Interactive coding, quick iteration |
| **Background (Copilot CLI)** | Local machine, outside VS Code | Low — runs autonomously | Well-scoped tasks, parallel work |
| **Cloud** | Remote infrastructure | Asynchronous | Team collaboration, PR workflows |
| **Third-party** | Local or Cloud | Varies by provider | Specific AI providers (Anthropic, OpenAI) |

## Built-in Local Agents

- **Agent** — general-purpose, multi-file editing with full tool access
- **Ask** — read-only Q&A mode, no file modifications
- **Plan** — structured planning before implementation

## What You'll Learn

- **[Planning](./planning)** — Use the Plan agent to create implementation plans before coding.
- **[Memory](./memory)** — How agents retain context across conversations with three memory scopes.
- **[Subagents](./subagents)** — Delegate subtasks to isolated agents for focused work.
- **[Copilot CLI](./copilot-cli)** — Run background sessions that work autonomously on your local machine.
- **[Cloud Agents](./cloud-agents)** — Use cloud agents for team collaboration through pull requests.
- **[Third-party Agents](./third-party-agents)** — Use specialized agents from providers like Anthropic (Claude) and OpenAI.

## Choosing the Right Agent Type

- **Use local agents** for interactive work where you need to iterate quickly and review changes as they happen.
- **Offload to background agents** when the task is clear enough that you don't need to watch every step.
- **Use cloud agents** for team collaboration, when you want the result as a pull request.
- **Run parallel sessions** for independent tasks across local, background, and cloud environments.
- **Hand off between types** — start locally to explore and plan, then hand off for implementation.

## References

- [Agents overview](https://code.visualstudio.com/docs/copilot/agents/overview)
- [Agents concepts](https://code.visualstudio.com/docs/copilot/concepts/agents)
- [Agents tutorial](https://code.visualstudio.com/docs/copilot/agents/agents-tutorial)

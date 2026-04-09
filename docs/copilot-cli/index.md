# GitHub Copilot CLI

GitHub Copilot CLI is a powerful command-line interface that lets you use Copilot directly from your terminal. It can answer questions, write and debug code, interact with GitHub.com, and complete complex multi-step tasks — all without leaving the terminal.

## Why Copilot CLI?

Copilot CLI gives you quick access to a powerful AI agent that works on your behalf. You can work iteratively to build exactly the code you need, manage GitHub resources, and automate your workflow — right from the command line.

## Key Capabilities

| Capability | Description |
|---|---|
| **Interactive Sessions** | Have a conversation with Copilot, prompt it to perform tasks, and steer the direction of work |
| **Programmatic Mode** | Pass a single prompt on the command line for automated workflows |
| **Plan Mode** | Collaborate on an implementation plan before any code is written |
| **GitHub Integration** | Work with issues, pull requests, branches, and Actions directly from the terminal |
| **MCP Support** | Extend functionality with Model Context Protocol servers |
| **Custom Agents** | Create specialized versions of Copilot for different tasks |
| **Parallel Execution** | Use `/fleet` to dispatch multiple agents working in parallel |
| **Session Persistence** | Resume previous sessions with full context preserved |

## Supported Operating Systems

- **Linux**
- **macOS**
- **Windows** (PowerShell and WSL)

## Availability

GitHub Copilot CLI is available with **all Copilot plans** — Free, Pro, Pro+, Business, and Enterprise. If you receive Copilot from an organization, the Copilot CLI policy must be enabled in the organization's settings.

## What You'll Learn

- **[Installation](./installation)** — Install Copilot CLI on your system and authenticate with GitHub.
- **[Usage Guide](./usage)** — Learn interactive and programmatic modes, slash commands, and tips.
- **[Configuration](./configuration)** — Set up trusted directories, tool permissions, path and URL access.
- **[Customization](./customization)** — Add custom instructions, agents, skills, and MCP servers.
- **[Security](./security)** — Understand security considerations for safe and responsible usage.
- **[Advanced Features](./advanced)** — Explore Rubber Duck, `/fleet`, ACP, custom model providers, and more.

## Quick Start

Install Copilot CLI and start an interactive session:

```bash
# Install with npm (all platforms)
npm install -g @github/copilot

# Start an interactive session
copilot
```

Or use it programmatically:

```bash
copilot -p "Show me this week's commits and summarize them" --allow-tool='shell(git)'
```

## References

- [About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli)
- [Installing GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli)
- [Using GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
- [GitHub Copilot CLI Product Page](https://github.com/features/copilot/cli/)

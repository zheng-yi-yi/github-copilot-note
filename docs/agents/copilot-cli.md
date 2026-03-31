# Copilot CLI

Copilot CLI sessions run independently in the background on your local machine. They use the Copilot CLI agent harness outside of VS Code and continue running even when you close VS Code. You can manage them from the unified Chat view.

## When to Use Copilot CLI

Best for tasks that:
- Have a well-defined scope
- Have all necessary context
- Don't require frequent user interaction

Examples: implementing a feature from a plan, creating multiple PoC variants, implementing clearly defined fixes.

## Isolation Modes

| Mode | How It Works | Permissions |
|---|---|---|
| **Worktree** | Creates a Git worktree in a separate folder — changes stay isolated | Auto-set to Bypass Approvals (can't change) |
| **Workspace** | Changes apply directly to your current workspace | All three permission levels available |

::: tip
Use **Worktree isolation** to prevent interference with your active work. The agent automatically commits changes at the end of each turn.
:::

## Creating a Session

1. Open the Chat view (<kbd>Ctrl+Alt+I</kbd>) and select **Copilot CLI** from the Session Target dropdown.
2. Choose between workspace or worktree isolation mode.
3. Submit your prompt — optionally add context, choose a model, and select a custom agent.
4. Track progress in the Chat view.

You can create **multiple sessions** to work on different tasks in parallel.

## Handing Off from Local Agent

For complex tasks, first clarify requirements with a local agent, then hand off:

1. Interact with a local agent (e.g., the Plan agent) until requirements are clear.
2. Open the **Session Target** dropdown and select **Copilot CLI**.
3. The full conversation history and context carries over.

If using the Plan agent, select **Continue in Copilot CLI** from the "Start Implementation" dropdown.

## Using from the Terminal

You can also use Copilot CLI directly in VS Code's terminal:

- Select the dropdown next to `+` in the Terminal panel → **GitHub Copilot CLI**
- Run `Chat: New Copilot CLI Session` from the Command Palette
- Type `copilot` in any integrated terminal

Sessions started from the terminal auto-appear in the Chat view sessions list.

## Supported Features

- Slash commands: reusable prompts, agent skills, hooks
- `/compact` to manage long conversations
- `/yolo` or `/autoApprove` to toggle auto-approval
- Custom agents (enable with `github.copilot.chat.cli.customAgents.enabled`)

## Limitations

- Can't access all VS Code built-in tools
- No extension-provided tools
- Limited to models available via CLI
- Only local MCP servers that don't require authentication

## References

- [Copilot CLI sessions](https://code.visualstudio.com/docs/copilot/agents/copilot-cli)
- [Agents overview](https://code.visualstudio.com/docs/copilot/agents/overview)

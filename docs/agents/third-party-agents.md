# Third-party Agents

Third-party agents in Visual Studio Code are AI agents developed by external providers, such as Anthropic and OpenAI. These agents enable you to use the unique capabilities of these AI providers, while still benefiting from the unified agent sessions management in VS Code and the rich editor experience for coding, debugging, testing, and more.

In addition, you can use these providers with your existing GitHub Copilot subscription. VS Code uses the provider's SDK and agent harness to access the agent's unique capabilities. Integration with cloud-based third-party agents is enabled through your GitHub Copilot plan.

> **Note**: Third-party coding agents in the cloud are currently in preview.

## Why use third-party agents?

The benefits of using third-party agents in VS Code are:

- **Use unique capabilities**: Each third-party agent has its own strengths and specialized features. VS Code uses the provider's SDK and agent harness to access these capabilities.
- **Unified experience**: Manage all your agent sessions, including third-party agents, from the same VS Code agent experience.
- **Rich editor integration**: Use VS Code's coding features, such as rich debugging and testing in combination with the agent's capabilities.
- **Billing**: Authenticate and manage billing through your existing GitHub Copilot subscription without additional setup.

## Enable third-party cloud agents

You need to enable support for third-party agents in the cloud in your Copilot account settings before you can use them in VS Code. Follow the steps in [Enabling or disabling third-party coding agents in your repositories](https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies#enabling-or-disabling-third-party-coding-agents-in-your-repositories) in the GitHub documentation.

You don't need to install the provider's VS Code extension to use their cloud agent in VS Code.

## Claude Agent (Preview)

Claude agent sessions provide agentic coding capabilities powered by Anthropic's Claude Agent SDK directly in VS Code. The Claude agent operates autonomously on your workspace to plan, execute, and iterate on coding tasks with its own set of tools and capabilities.

Enable or disable support for Claude agent sessions with the `github.copilot.chat.claudeAgent.enabled` setting.

### Start a Claude agent session

1. Open the Chat view (`Ctrl+Alt+I`) and select **New Chat** (`+`).
2. Choose between a local or cloud agent session:
    - For a **local session**, select **Claude** from the Session Type dropdown.
    - For a **cloud session**, select **Cloud** from the Session Type dropdown. Then, select **Claude** from the Partner Agent dropdown.
3. Enter your prompt and let the agent work on the task.

### Claude agent slash commands

The Claude agent provides specialized slash commands for advanced workflows. Type `/` in the chat input box to see the available commands.

| Command | Description |
|---|---|
| `/agents` | Create and manage specialized Claude agents for specific tasks. Define custom agent behaviors through a wizard. |
| `/hooks` | Configure lifecycle hooks that execute at key points during Claude agent sessions, such as before or after tool execution. |
| `/memory` | Open and edit `CLAUDE.md` memory files that provide persistent context to Claude agent across sessions. |
| `/init` | Initialize a new `CLAUDE.md` memory file for your project. |
| `/pr-comments` | Get comments from a pull request. |
| `/review` | Review code changes in a pull request. |
| `/security-review` | Perform a security review of pending code changes on the current branch. |

### Permission modes

Claude agent requests permission before performing certain operations. By default, file edits within your workspace are auto-approved, while other operations like running terminal commands might require confirmation.

You can choose how the agent applies changes to your workspace:
- **Edit automatically**: Claude agent makes changes to your workspace autonomously as it works on the task.
- **Request approval**: Claude agent asks for your review before making changes to your workspace.
- **Plan**: Claude agent outlines its intended approach before starting work on the task.

> **Caution**: The `github.copilot.chat.claudeAgent.allowDangerouslySkipPermissions` setting bypasses all permission checks. Only enable this in isolated sandbox environments.

## OpenAI Codex

The OpenAI Codex agent uses OpenAI's Codex to perform coding tasks autonomously. Codex can run interactively in VS Code or unattended in the background.

### Prerequisites

- A Copilot Pro+ subscription for authentication.
- For local sessions, the [OpenAI Codex](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt) extension.

### Start a Codex session

1. Open the Chat view (`Ctrl+Alt+I`) and select **New Chat** (`+`).
2. Choose between a local or cloud agent session:
    - For a **local session**, select **Codex** from the Session Type dropdown.
    - For a **cloud session**, select **Cloud** from the Session Type dropdown. Then, select **Codex** from the Partner Agent dropdown.
3. Enter your prompt in the chat editor input and let the agent work on the task.


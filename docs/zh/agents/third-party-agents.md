# 第三方智能体

Visual Studio Code 中的第三方智能体是由外部提供商（如 Anthropic 和 OpenAI）开发的 AI 智能体。

这些智能体使你能够利用这些 AI 提供商的独特能力，同时仍能受益于 VS Code 中统一的智能体会话管理，以及针对编码、调试、测试等提供的丰富编辑器体验。

此外，你可以使用现有的 GitHub Copilot 订阅来使用这些提供商。VS Code 使用提供商的 SDK 和智能体框架来访问智能体的独特能力。通过你的 GitHub Copilot 计划，可以实现与云端第三方智能体的集成。

> **注意**：云端第三方编码智能体目前处于预览阶段。

## 为什么使用第三方智能体？

在 VS Code 中使用第三方智能体的好处包括：

- **使用独特能力**：每个第三方智能体都有自己的优势和专门功能。VS Code 使用提供商的 SDK 和智能体框架来访问这些能力。
- **统一体验**：从同一个 VS Code 智能体体验中管理所有智能体会话，包括第三方智能体。
- **丰富的编辑器集成**：将 VS Code 的编码功能（如丰富的调试和测试）与智能体的能力结合使用。
- **计费**：通过现有的 GitHub Copilot 订阅进行身份验证和管理计费，无需额外设置。

## 启用云端第三方智能体

在 VS Code 中使用云端第三方智能体之前，你需要在 Copilot 帐户设置中启用对它们的支持。请按照 GitHub 文档中 [启用或禁用存储库中的第三方编码智能体](https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies#enabling-or-disabling-third-party-coding-agents-in-your-repositories) 的步骤操作。

你不需要安装提供商的 VS Code 扩展即可在 VS Code 中使用其云端智能体。

## Claude 智能体

Claude 智能体会话直接在 VS Code 中提供由 Anthropic 的 Claude Agent SDK 支持的智能体编码能力。Claude 智能体在你的工作区上自主运行，使用自己的一套工具和能力来规划、执行和迭代编码任务。

使用 `github.copilot.chat.claudeAgent.enabled` 设置启用或禁用对 Claude 智能体会话的支持。

### 开始 Claude 智能体会话

1. 打开聊天视图 (`Ctrl+Alt+I`) 并选择 **New Chat** (`+`)。
2. 在本地或云端智能体会话之间进行选择：
    - 对于**本地会话**，从 Session Type (会话类型) 下拉列表中选择 **Claude**。
    - 对于**云端会话**，从 Session Type 下拉列表中选择 **Cloud**。然后，从 Partner Agent (合作伙伴智能体) 下拉列表中选择 **Claude**。
3. 输入你的提示，让智能体执行任务。

### Claude 智能体斜杠命令

Claude 智能体为高级工作流提供专门的斜杠命令。在聊天输入框中输入 `/` 即可查看可用命令。

| 命令 | 描述 |
|---|---|
| `/agents` | 创建和管理针对特定任务的专门 Claude 子智能体。通过向导定义自定义智能体行为。 |
| `/hooks` | 配置在 Claude 智能体会话期间的关键点（如工具执行前后）执行的生命周期钩子。 |
| `/memory` | 打开并编辑 `CLAUDE.md` 记忆文件，为跨会话的 Claude 智能体提供持久上下文。 |
| `/init` | 为你的项目初始化一个新的 `CLAUDE.md` 记忆文件。 |
| `/pr-comments` | 从拉取请求中获取评论。 |
| `/review` | 审查拉取请求中的代码更改。 |
| `/security-review` | 对当前分支上待处理的代码更改执行安全审查。 |

### 权限模式

Claude 智能体在执行某些操作之前会请求许可。默认情况下，你的工作区内的文件编辑是自动批准的，而运行终端命令等其他操作可能需要确认。

你可以选择智能体如何将更改应用到你的工作区：
- **Edit automatically** (自动编辑)：Claude 智能体在执行任务时自主更改你的工作区。
- **Request approval** (请求批准)：Claude 智能体在更改你的工作区之前请求你进行审查。
- **Plan** (计划)：Claude 智能体在开始执行任务前概述其预期方法。

> **警告**：`github.copilot.chat.claudeAgent.allowDangerouslySkipPermissions` 设置会绕过所有权限检查。仅在隔离的沙盒环境中使用。

## OpenAI Codex

OpenAI Codex 智能体使用 OpenAI 的 Codex 自主执行编码任务。Codex 可以在 VS Code 中交互运行，也可以在后台无人值守运行。

### 前提条件

- 用于身份验证的 Copilot Pro+ 订阅。
- 对于本地会话，需要安装 [OpenAI Codex](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt) 扩展。

### 开始 Codex 会话

1. 打开聊天视图 (`Ctrl+Alt+I`) 并选择 **New Chat** (`+`)。
2. 在本地或云端智能体会话之间进行选择：
    - 对于**本地会话**，从 Session Type 下拉列表中选择 **Codex**。
    - 对于**云端会话**，从 Session Type 下拉列表中选择 **Cloud**。然后，从 Partner Agent (合作伙伴智能体) 下拉列表中选择 **Codex**。
3. 在聊天编辑器输入框中输入你的提示，让智能体执行任务。


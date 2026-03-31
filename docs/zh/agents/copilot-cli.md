# Copilot CLI

Copilot CLI 会话在你的本地机器上独立运行在后台。它们使用 VS Code 之外的 Copilot CLI 智能体框架，即使你关闭 VS Code 也会继续运行。你可以从统一的聊天视图中管理它们。

## 何时使用 Copilot CLI

最适合以下类型的任务：
- 有明确定义的范围
- 拥有所有必要的上下文
- 不需要频繁的用户交互

示例：根据方案实现功能、创建多个 PoC 变体、实施明确定义的修复。

## 隔离模式

| 模式 | 工作方式 | 权限 |
|---|---|---|
| **工作树 (Worktree)** | 在单独的文件夹中创建 Git 工作树 — 更改保持隔离 | 自动设为 Bypass Approvals（无法更改） |
| **工作区 (Workspace)** | 更改直接应用到你当前的工作区 | 三种权限级别均可用 |

::: tip
使用 **工作树隔离** 以防止干扰你正在进行的工作。智能体会在每个轮次结束时自动提交更改。
:::

## 创建会话

1. 打开聊天视图 (<kbd>Ctrl+Alt+I</kbd>)，从 Session Target 下拉列表中选择 **Copilot CLI**。
2. 选择工作区或工作树隔离模式。
3. 提交你的提示词 — 可选地添加上下文、选择模型和选择自定义智能体。
4. 在聊天视图中跟踪进度。

你可以创建 **多个会话** 来并行处理不同的任务。

## 从本地智能体交接

对于复杂任务，先用本地智能体澄清需求，然后交接：

1. 与本地智能体交互（如 Plan 智能体）直到需求明确。
2. 打开 **Session Target** 下拉列表并选择 **Copilot CLI**。
3. 完整的对话历史和上下文将被保留。

如果使用的是 Plan 智能体，从 "Start Implementation" 下拉列表中选择 **Continue in Copilot CLI**。

## 从终端使用

你也可以在 VS Code 的终端中直接使用 Copilot CLI：

- 在终端面板中选择 `+` 旁边的下拉菜单 → **GitHub Copilot CLI**
- 从命令面板运行 `Chat: New Copilot CLI Session`
- 在任何集成终端中输入 `copilot`

从终端启动的会话会自动出现在聊天视图的会话列表中。

## 支持的功能

- 斜杠命令：可重用提示词、智能体技能、钩子
- `/compact` 管理长对话
- `/yolo` 或 `/autoApprove` 切换自动审批
- 自定义智能体（通过 `github.copilot.chat.cli.customAgents.enabled` 启用）

## 限制

- 无法访问所有 VS Code 内置工具
- 无法使用扩展提供的工具
- 仅限于 CLI 可用的模型
- 仅限于不需要身份验证的本地 MCP 服务器

## 参考资料

- [Copilot CLI 会话](https://code.visualstudio.com/docs/copilot/agents/copilot-cli)
- [智能体概览](https://code.visualstudio.com/docs/copilot/agents/overview)

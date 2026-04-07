# 记忆

::: info 备注
Copilot Memory 处于**公开预览**阶段，已于 2026 年 3 月 4 日对 Pro/Pro+ 用户默认开启。
:::

## 什么是 Memory？

GitHub Copilot Memory（也称 **Agentic Memory** 或**自主记忆**）是 Copilot 生态中一项重要能力，让 Copilot **像真正的团队成员一样“记住”代码库知识**，无需每次对话都重新解释上下文。

它分为**两大系统**（互补使用）：

| 系统 | 存储位置 | 创建方式 | 过期机制 | 主要用途 |
|------|----------|----------|----------|----------|
| **本地**| 本地磁盘 | 用户或 Agent 手动/自动创建 | 手动管理 | 个人偏好、项目约定、临时任务 |
| **云端** | GitHub 云端 | Agent **自动**发现并创建 | 28 天自动过期 | 代码库架构、跨文件依赖、团队约定 |

**核心价值**：
- 减少重复说明。
- 跨 Agent 知识共享。
- 每次使用前**实时验证**代码，确保记忆不过时。

## 本地记忆工具

记忆工具是一个内置的智能体工具（预览功能，默认开启），可以在智能体工作时保存和回忆笔记。

记忆以 Markdown 文件形式保存在本地 `memories/` 目录下，比如 `C:\Users\yiyiz\AppData\Roaming\Code\User\globalStorage\github.copilot-chat\memory-tool\memories` 目录。

::: tip 开启和关闭
通过 [`github.copilot.chat.tools.memory.enabled`](vscode://settings/github.copilot.chat.tools.memory.enabled) 设置 可以来启用或禁用记忆工具。
:::

### 记忆作用域

| 作用域 | 路径 | 推荐用途 |
|---|---|---|
| **用户** | `/memories/` | 个人偏好。前 200 行会在每次会话开始时自动加载到上下文中。 |
| **仓库** | `/memories/repo/`    | 项目特定约定（架构、命名、构建命令） |
| **会话** | `/memories/session/` | 限定于当前对话。例如 Plan Agent 的 `plan.md` |

### 使用方式

1. **存储记忆**（自然语言）：
   ```
   Remember that our team uses conventional commits for all commit messages.
   Remember that I prefer tabs over spaces and always use single quotes in JavaScript.
   ```
2. **查询记忆**：
   ```
   What are our commit message conventions?
   ```
3. **管理命令**（Command Palette）：
   - **Chat: Show Memory Files** → 查看所有记忆文件（可点击跳转）。
   - **Chat: Clear All Memory Files** → 清空所有记忆（暂不支持单个删除，可让 Agent 更新覆盖）。

::: tip 提示

Agent 会自动决定最合适的 Scope，并创建/更新对应文件。

记忆文件在聊天回复中可点击查看。

:::


### 管理记忆文件

- `Chat: Show Memory Files` — 查看所有作用域的记忆文件
- `Chat: Clear All Memory Files` — 删除所有记忆

## 云端记忆（GitHub 托管）

Copilot Memory 是一个独立的、由 GitHub 托管的记忆系统，它让 Copilot 在工作时学习仓库特定的知识。与本地记忆工具不同，Copilot Memory 在多个平台之间共享（编码智能体、代码审查、Copilot CLI）。

### 主要区别

| 特性 | 本地记忆工具 | Copilot Memory |
|---|---|---|
| 存储位置 | 本地（你的机器） | GitHub 托管（远程） |
| 作用域 | 用户、仓库、会话 | 仅仓库 |
| 跨平台共享 | 否（仅 VS Code） | 是（编码智能体、代码审查、CLI） |
| 创建方式 | 由你或聊天中的智能体 | Copilot 智能体自动生成 |
| 默认启用 | 是 | 否（需手动开启） |
| 过期时间 | 手动管理 | 自动（28 天后删除） |

### 启用 Copilot Memory

1. 在 [GitHub Copilot 设置](https://github.com/settings/copilot) 中启用
2. 启用 VS Code 集成：[`github.copilot.chat.copilotMemory.enabled`](vscode://settings/github.copilot.chat.copilotMemory.enabled)
3. 仓库所有者可以在 仓库设置 > Copilot > Memory 中审查已存储的记忆

## 参考资料

- [VS Code 智能体中的记忆](https://code.visualstudio.com/docs/copilot/agents/memory)
- [启用和管理 Copilot Memory](https://docs.github.com/copilot/how-tos/use-copilot-agents/copilot-memory)

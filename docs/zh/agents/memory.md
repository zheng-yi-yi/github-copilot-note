# 记忆 (Memory)

VS Code 中的智能体使用记忆在对话之间保留上下文。智能体不会从头开始每次会话，而是会回忆你的偏好，应用之前任务的经验，并逐步积累有关代码库的知识。

## 记忆工具（本地）

记忆工具是一个内置的智能体工具，可以在智能体工作时保存和回忆笔记。所有数据都存储在你的本地机器上。

::: tip
使用 `github.copilot.chat.tools.memory.enabled` 设置来启用或禁用记忆工具。
:::

### 记忆作用域

| 作用域 | 路径 | 跨会话持久化 | 跨工作区持久化 | 用途 |
|---|---|---|---|---|
| **用户** | `/memories/` | ✅ | ✅ | 偏好、模式、常用命令 |
| **仓库** | `/memories/repo/` | ✅ | ❌（工作区限定） | 代码库规范、项目结构、构建命令 |
| **会话** | `/memories/session/` | ❌（聊天结束时清除） | ❌ | 任务相关的上下文、进行中的方案 |

### 用户记忆

跨所有工作区和对话持久化。前 200 行会在每次会话开始时自动加载到上下文中。

```
记住我偏好使用 Tab 缩进，并且在 JavaScript 中始终使用单引号
```

### 仓库记忆

限定于当前工作区。用于代码库特定的事实。

```
记住此项目使用仓储模式 (Repository Pattern) 进行数据访问
并且所有 API 端点都需要身份验证
```

### 会话记忆

限定于当前对话。Plan 智能体使用会话记忆来持久化其实施方案到 `plan.md`。

### 存储和检索

**存储：** 要求智能体记住某些内容 — 它会自动确定合适的作用域。

```
记住我们团队使用约定式提交 (Conventional Commits) 编写所有提交信息
```

**检索：** 在新对话中询问它。

```
我们的提交信息规范是什么？
```

### 管理记忆文件

- `Chat: Show Memory Files` — 查看所有作用域的记忆文件
- `Chat: Clear All Memory Files` — 删除所有记忆

## Copilot Memory（GitHub 托管）

Copilot Memory 是一个独立的、由 GitHub 托管的记忆系统，它让 Copilot 在工作时学习仓库特定的知识。与本地记忆工具不同，Copilot Memory 在多个平台之间共享（编码智能体、代码审查、Copilot CLI）。

### 主要区别

| 特性 | 本地记忆工具 | Copilot Memory |
|---|---|---|
| 存储位置 | 本地（你的机器） | GitHub 托管（远程） |
| 作用域 | 用户、仓库、会话 | 仅仓库 |
| 跨平台共享 | 否（仅 VS Code） | 是（编码智能体、代码审查、CLI） |
| 创建方式 | 由你或聊天中的智能体 | Copilot 智能体自动生成 |
| 默认启用 | 是 | 否（需手动开启） |
| 过期时间 | 手动管理 | 自动（28 天） |

### 启用 Copilot Memory

1. 在 [GitHub Copilot 设置](https://github.com/settings/copilot) 中启用
2. 启用 VS Code 集成：`github.copilot.chat.copilotMemory.enabled`
3. 仓库所有者可以在 仓库设置 > Copilot > Memory 中审查已存储的记忆

## 参考资料

- [VS Code 智能体中的记忆](https://code.visualstudio.com/docs/copilot/agents/memory)
- [启用和管理 Copilot Memory](https://docs.github.com/copilot/how-tos/use-copilot-agents/copilot-memory)

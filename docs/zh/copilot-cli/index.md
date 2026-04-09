# GitHub Copilot CLI

GitHub Copilot CLI 是一款强大的命令行界面工具，让你可以直接在终端中使用 Copilot。它能回答问题、编写和调试代码、与 GitHub.com 交互，并完成复杂的多步骤任务——一切都无需离开终端。

## 为什么选择 Copilot CLI？

Copilot CLI 让你可以快速使用强大的 AI 智能体代你工作。你可以迭代式地构建代码、管理 GitHub 资源、自动化工作流——全部在命令行中完成。

## 核心能力

| 能力 | 描述 |
|---|---|
| **交互式会话** | 与 Copilot 对话，提示其执行任务，引导工作方向 |
| **编程模式** | 在命令行直接传入单条提示，适用于自动化工作流 |
| **计划模式** | 在编写代码之前协作制定实施方案 |
| **GitHub 集成** | 直接在终端中操作 Issue、PR、分支和 Actions |
| **MCP 支持** | 通过模型上下文协议服务器扩展功能 |
| **自定义智能体** | 创建面向不同任务的 Copilot 特化版本 |
| **并行执行** | 使用 `/fleet` 调度多个智能体并行工作 |
| **会话持久化** | 恢复之前的会话，完整保留上下文 |

## 支持的操作系统

- **Linux**
- **macOS**
- **Windows**（PowerShell 和 WSL）

## 可用性

GitHub Copilot CLI 适用于**所有 Copilot 计划**——Free、Pro、Pro+、Business 和 Enterprise。如果你通过组织获取 Copilot，需要在组织设置中启用 Copilot CLI 策略。

## 本章内容

- **[安装指南](./installation)** — 在你的系统上安装 Copilot CLI 并完成 GitHub 身份认证。
- **[使用指南](./usage)** — 学习交互模式和编程模式、斜杠命令及使用技巧。
- **[配置指南](./configuration)** — 设置信任目录、工具权限、路径和 URL 访问控制。
- **[定制化](./customization)** — 添加自定义指令、智能体、技能和 MCP 服务器。
- **[安全性](./security)** — 了解安全注意事项，确保安全负责地使用。
- **[高级功能](./advanced)** — 探索 Rubber Duck、`/fleet`、ACP、自定义模型提供商等。

## 快速开始

安装 Copilot CLI 并启动交互式会话：

```bash
# 使用 npm 安装（全平台）
npm install -g @github/copilot

# 启动交互式会话
copilot
```

或以编程方式使用：

```bash
copilot -p "显示本周的提交并进行总结" --allow-tool='shell(git)'
```

## 参考资料

- [关于 GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli)
- [安装 GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli)
- [使用 GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
- [GitHub Copilot CLI 产品页面](https://github.com/features/copilot/cli/)

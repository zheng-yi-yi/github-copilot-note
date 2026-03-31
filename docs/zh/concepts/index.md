# 核心概念

了解 GitHub Copilot 背后的核心概念有助于你更有效地使用它。本节涵盖了 VS Code 中 AI 辅助开发的基础思想。

## 你将学到

- **[大语言模型](./language-models)** — LLM 是如何工作的，什么是上下文窗口，以及如何为任务选择正确的模型。
- **[上下文 (Context)](./context)** — VS Code 如何为每个请求组装上下文，以及如何提供正确的信息。
- **[工具 (Tools)](./tools)** — 模型操作开发环境的机制 —— 读取文件、运行命令以及连接外部服务。
- **[智能体 (Agents)](./agents)** — 使用 LLM 和工具自主执行多步开发任务的编排层。
- **[自定义 (Customization)](./customization)** — 为我们的项目量身定制 AI 行为的框架 —— 指令、提示词、技能、智能体、MCP、钩子和插件。

## 总览

![image-20260331121006167](images/index/image-20260331121006167.png)

当我们发送提示词给 Copilot 时，它会组织上下文信息（文件、历史、指令、工具输出）并将其发送给**模型**。

模型会进一步对任务进行推理，并决定调用哪些工具。

工具调用后输出的结果会反馈到上下文中，然后再进行下一个迭代（智能体循环）。

我们的自定义配置（指令、提示词文件、自定义智能体、MCP 服务器、钩子）也会影响 Agent 编排任务的过程。

## 参考资料

- [VS Code Copilot 文档](https://code.visualstudio.com/docs/copilot/overview)
- [GitHub Copilot 文档](https://docs.github.com/en/copilot)

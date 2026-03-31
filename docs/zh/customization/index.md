# 自定义 (Customization)

本节涵盖了在 VS Code 中自定义 GitHub Copilot 行为的所有方式 —— 从简单的指令文件到完整的智能体插件。

## 开始使用

开始自定义最快的方法是在聊天中运行 `/init`。VS Code 会分析你的工作区并生成初始配置。

::: tip
使用 **Chat Customizations 编辑器** 在一处发现、创建和管理所有自定义项。在命令面板中运行 `Chat: Open Chat Customizations`。
:::

## 我该使用哪种方法？

| 我想要... | 使用这个 |
|---|---|
| 设置项目范围的编码标准 | [自定义指令](./custom-instructions) — `.github/copilot-instructions.md` |
| 为不同文件类型设置不同规则 | [自定义指令](./custom-instructions) — 带有 `applyTo` 的 `.instructions.md` |
| 创建可重用的斜杠命令 | [提示词文件](./prompt-files) — `.prompt.md` |
| 为任务封装脚本和资源 | [智能体技能](./agent-skills) — `SKILL.md` 文件夹 |
| 创建专门的 AI 角色 | [自定义智能体](./custom-agents) — `.agent.md` |
| 连接外部 API / 数据库 | [MCP 服务器](./mcp-servers) — `mcp.json` |
| 在生命周期事件中自动化任务 | [钩子 (Hooks)](./hooks) — `.github/hooks/*.json` |
| 安装预封装的自定义项 | [智能体插件](./agent-plugins) |

## 自定义指南

- **[自定义指令](./custom-instructions)** — 定义自动应用的编码标准和指南。
- **[提示词文件](./prompt-files)** — 创建作为斜杠命令调用的可重用任务提示词。
- **[智能体技能](./agent-skills)** — 使用脚本和资源封装多步功能。
- **[自定义智能体](./custom-agents)** — 创建具有工具限制的专门 AI 角色。
- **[MCP 服务器](./mcp-servers)** — 连接到外部工具和数据源。
- **[钩子 (Hooks)](./hooks)** — 在智能体生命周期节点执行 Shell 命令。
- **[智能体插件](./agent-plugins)** — 发现并安装预封装的自定义捆绑包。

## 参考资料

- [自定义概念](/zh/concepts/customization)
- [自定义概览](https://code.visualstudio.com/docs/copilot/customization/overview)

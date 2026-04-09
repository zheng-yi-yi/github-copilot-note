# 定制化

你可以通过自定义指令、智能体、技能、MCP 服务器、钩子和记忆来定制 GitHub Copilot CLI，使其适应你的工作流。

## 自定义指令

自定义指令为 Copilot 提供关于你项目、编码标准以及如何构建、测试和验证更改的额外上下文。所有自定义指令文件会自动组合。

Copilot CLI 支持：

| 类型 | 位置 | 作用范围 |
|---|---|---|
| **仓库级** | `.github/copilot-instructions.md` | 整个项目 |
| **路径级** | `.github/instructions/**/*.instructions.md` | 特定文件路径 |
| **智能体文件** | `AGENTS.md` | 智能体级别行为 |

更多信息请参阅[为 GitHub Copilot CLI 添加自定义指令](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions)。

## 自定义智能体

自定义智能体是面向不同任务的 Copilot 特化版本。它们帮助 Copilot 处理独特的工作流、编码规范和专业用例。

### 内置智能体

Copilot CLI 包含一组默认智能体：

| 智能体 | 用途 |
|---|---|
| **Explore** | 快速代码库分析，不添加到主上下文 |
| **Task** | 执行测试和构建等命令；成功时简要总结，失败时输出完整信息 |
| **General-purpose** | 使用完整工具集进行复杂多步骤任务 |
| **Code-review** | 审查更改，专注于真正的问题，减少噪音 |

AI 模型可能会自动将任务委派给子智能体，如果判断这样更有效的话。

### 定义自定义智能体

使用 Markdown 文件（智能体配置文件）创建自定义智能体，指定专业领域、可用工具和响应指令。

| 级别 | 位置 | 作用范围 |
|---|---|---|
| **用户级** | `~/.copilot/agents/` | 所有项目 |
| **仓库级** | `.github/agents/`（本地和远程） | 当前项目 |
| **组织/企业级** | `.github-private` 仓库中的 `/agents/` | 组织/企业下的所有项目 |

::: tip
命名冲突时的优先级：系统级智能体 > 仓库级智能体 > 组织级智能体。
:::

### 使用自定义智能体

- **斜杠命令**：`/agent` — 从可用智能体列表中选择。
- **在提示中**：`使用重构智能体来重构这段代码` — Copilot 自动推断智能体。
- **命令行选项**：`copilot --agent=refactor-agent --prompt "重构这段代码"`

## 技能

技能通过指令、脚本和资源增强 Copilot 执行专业任务的能力。你可以创建技能来教授 Copilot 特定领域的知识或工作流。

更多信息请参阅[为 GitHub Copilot CLI 创建智能体技能](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-skills)。

## MCP 服务器

模型上下文协议（MCP）服务器让 Copilot 能够访问不同的数据源和工具。Copilot CLI 预配置了 **GitHub MCP 服务器**，允许你与 GitHub.com 资源交互。

### 添加 MCP 服务器

1. 在交互会话中，使用 `/mcp add` 斜杠命令。
2. 使用 <kbd>Tab</kbd> 键在字段间切换，填写服务器详情。
3. 按 <kbd>Ctrl+S</kbd> 保存。

MCP 服务器配置存储在 `mcp-config.json` 中，默认位于 `~/.copilot/`。可以通过 `COPILOT_HOME` 环境变量更改位置。

### 使用 MCP 服务器

配置完成后，Copilot 会自动使用 MCP 服务器工具。你可以在提示中引用服务器来引导工具使用：

```
使用 GitHub MCP 服务器从 org/repo 查找好的首次贡献 Issue
```

在交互会话中使用 `/mcp` 查看和管理已配置的服务器。

## 钩子

钩子让你可以在智能体执行的关键节点运行自定义 shell 命令，实现验证、日志记录、安全扫描或工作流自动化。

更多信息请参阅[关于钩子](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-hooks)。

## Copilot 记忆

Copilot 记忆让 Copilot 通过存储"记忆"来建立对你的仓库的持久理解——关于编码规范、模式和偏好的信息。这减少了在提示中反复解释上下文的需要，使后续的会话更加高效。

更多信息请参阅[关于 GitHub Copilot 的智能体记忆](https://docs.github.com/en/copilot/concepts/agents/copilot-memory)。

## 参考资料

- [添加自定义指令](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions)
- [创建自定义智能体](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-custom-agents)
- [创建智能体技能](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-skills)
- [使用 MCP 扩展](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/extend-cloud-agent-with-mcp)

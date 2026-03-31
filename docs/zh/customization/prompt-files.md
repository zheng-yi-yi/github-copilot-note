# 提示词文件 (Prompt Files)

提示词文件 (`.prompt.md`) 将常见任务编码为独立的 Markdown 文件，你可以在聊天中作为斜杠命令调用它们。每个提示词包含任务特定的上下文和指南。

与自动应用的自定义指令不同，提示词文件需要通过 `/command-name` **手动调用**。

## 何时使用

- 简化常见任务的提示词编写（搭建组件脚手架、运行测试、准备 PR）
- 覆盖自定义智能体的默认行为
- 使用特定工具和上下文创建可重复的工作流

::: tip
**提示词 vs. 智能体 vs. 技能：** 轻量级的单一任务提示词使用提示词文件。需要持久角色和工具限制时使用 [自定义智能体](./custom-agents)。可移植的多文件能力使用 [智能体技能](./agent-skills)。
:::

## 文件位置

| 作用域 | 位置 |
|---|---|
| 工作区 | `.github/prompts/` |
| 用户配置文件 | 用户数据（特定于你的 VS Code 配置文件） |

使用 `chat.promptFilesLocations` 配置额外的位置。

## 文件格式

```markdown
---
description: 生成带有验证的 React 表单组件
name: create-react-form
agent: agent
tools: ['edit', 'search', 'read']
---

根据用户的需求创建一个新的 React 表单组件。

遵循以下指南：
- 使用 React Hook Form 管理表单状态
- 使用 Zod 进行模式验证
- 包含正确的 TypeScript 类型
- 添加可访问的标签和错误信息

参考项目中现有的表单组件了解模式：[forms](../../src/components/forms/)
```

### Frontmatter 属性

| 属性 | 必填 | 描述 |
|---|---|---|
| `description` | 否 | 提示词的简短描述 |
| `name` | 否 | 聊天中 `/` 后使用的名称（默认为文件名） |
| `argument-hint` | 否 | 聊天输入框中的提示文字 |
| `agent` | 否 | 使用的智能体：`ask`、`agent`、`plan` 或自定义智能体名称 |
| `model` | 否 | 语言模型 |
| `tools` | 否 | 可用工具列表 |

### 引用文件和工具

- 使用 **Markdown 链接** 引用工作区文件：`[config](../../tsconfig.json)`
- 使用 `#tool:<tool-name>` 引用工具：`#tool:web/fetch`
- 使用 `${input:variableName}` 提示用户输入

## 创建提示词文件

1. 打开 Chat Customizations 编辑器（齿轮图标）→ **Prompts** 标签页
2. 选择 **New Prompt (Workspace)** 或 **New Prompt (User)**
3. 输入文件名并使用 Markdown 编写提示词

或者使用：
- `/create-prompt` — AI 根据你的描述生成提示词
- 命令面板中的 `Chat: New Prompt File`

## 在聊天中使用

- 输入 `/` 然后跟提示词名称
- 在命令后添加额外上下文：`/create-react-form formName=LoginForm`
- 或从命令面板运行 `Chat: Run Prompt`
- 或打开文件并按编辑器标题中的播放按钮

## 工具列表优先级

当提示词文件和自定义智能体都指定了工具时：

1. 提示词文件中的工具（最高优先级）
2. 引用的自定义智能体中的工具
3. 所选智能体的默认工具

## 技巧

- 清楚描述期望的输入和输出格式
- 提供期望结果的示例
- 使用 Markdown 链接引用指令文件（避免重复指南）
- 使用编辑器播放按钮快速测试和迭代

## 参考资料

- [VS Code 中的提示词文件](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [社区示例](https://github.com/github/awesome-copilot)

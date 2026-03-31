# 自定义智能体 (Custom Agents)

自定义智能体允许你将 AI 配置为不同的角色，为特定的开发任务量身定制。每个智能体都有自己的指令、工具、模型偏好，并且可以交接给其他智能体。

## 为什么需要自定义智能体？

- **不同任务需要不同能力** — 规划智能体需要只读工具，实现智能体需要编辑能力。
- **专门的指令** — 安全审查员关注漏洞，代码审查员关注质量。
- **一致性** — 切换到专门的智能体，而不是每次都重新提示。

## 文件位置

| 作用域 | 位置 |
|---|---|
| 工作区 | `.github/agents/` |
| 工作区 (Claude) | `.claude/agents/` |
| 用户配置文件 | `~/.copilot/agents/` 或用户数据 |

## 文件结构

自定义智能体使用 `.agent.md` 文件（或在 `.github/agents/` 中使用 `.md`）：

```markdown
---
description: 通过只读分析生成实施方案
tools: ['search', 'read', 'web']
model: Claude Sonnet 4.5 (copilot)
---

你是一位高级软件架构师。你的职责是：

1. 分析代码库结构和模式
2. 创建详细的实施方案
3. 识别潜在的风险和依赖关系
4. 建议测试策略

不要修改任何文件。只输出书面方案。
```

### Frontmatter 属性

| 属性 | 描述 |
|---|---|
| `description` | 在聊天中显示为占位符文字的简短描述 |
| `name` | 显示名称（默认为文件名） |
| `tools` | 可用工具列表。使用 `<server>/*` 获取 MCP 服务器的所有工具 |
| `agents` | 允许的子智能体列表。`*` 为全部，`[]` 为无 |
| `model` | AI 模型（字符串或按优先级排列的数组） |
| `user-invocable` | 是否显示在智能体下拉列表中（默认：`true`） |
| `disable-model-invocation` | 阻止作为子智能体被调用（默认：`false`） |
| `handoffs` | 在智能体之间过渡的建议下一步操作 |
| `hooks` | 智能体范围的钩子（预览） |

## 交接 (Handoffs)

交接创建引导工作流，在智能体之间进行过渡：

```markdown
---
description: 生成实施方案
tools: ['search', 'read']
handoffs:
  - label: 开始实施
    agent: implementation
    prompt: 现在实施上述方案。
    send: false
  - label: 审查代码
    agent: reviewer
    prompt: 审查更改是否存在安全问题。
---
```

聊天响应完成后，会显示交接按钮。选择一个会切换到目标智能体并预填提示词。设置 `send: true` 自动提交。

## 创建自定义智能体

1. 打开 Chat Customizations 编辑器（齿轮图标）→ **Agents** 标签页
2. 选择 **New Agent (Workspace)** 或 **New Agent (User)**
3. 填写 Frontmatter 和指令

或者使用：
- `/create-agent` — 描述角色，智能体为你生成
- 从对话中提取："为这类任务创建一个智能体"

## 示例

### 安全审查员

```markdown
---
description: 审查代码中的安全漏洞
tools: ['read', 'search']
---

你是一位高级安全工程师。审查代码中的以下问题：
- 注入漏洞（SQL、XSS、命令注入）
- 身份验证和授权问题
- 敏感数据暴露
- 缺少输入验证
- 不安全的依赖项

以严重性级别和修复建议报告发现。
不要修改任何文件。
```

### TDD 编排者

```markdown
---
name: TDD
tools: ['agent', 'edit', 'search', 'read', 'terminal']
agents: ['Red', 'Green', 'Refactor']
---

使用测试驱动开发实现功能：
1. 使用 Red 智能体编写失败测试
2. 使用 Green 智能体实现代码通过测试
3. 使用 Refactor 智能体改进代码质量
```

## 共享

- **团队** — 存储在 `.github/agents/` 中并提交到版本控制
- **组织** — 启用 `github.copilot.chat.organizationCustomAgents.enabled`
- **Copilot CLI** — 启用 `github.copilot.chat.cli.customAgents.enabled` 用于后台会话

## 参考资料

- [VS Code 中的自定义智能体](https://code.visualstudio.com/docs/copilot/customization/custom-agents)
- [社区示例](https://github.com/github/awesome-copilot)

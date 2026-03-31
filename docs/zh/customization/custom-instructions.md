# 自定义指令 (Custom Instructions)

自定义指令定义了编码标准和规则，自动影响 AI 生成代码的方式。与其在每次提示中重复上下文，不如将你的准则存储在指令文件中。

## 指令文件类型

### 始终生效指令

自动包含在 **每个** 聊天请求中：

| 文件 | 作用域 | 说明 |
|---|---|---|
| `.github/copilot-instructions.md` | 工作区 | 项目范围标准的最佳起点 |
| `AGENTS.md` | 工作区（根目录或子文件夹） | 适用于多智能体和 Monorepo 设置 |
| `CLAUDE.md` | 工作区 / `.claude/` / `~/` | 与 Claude Code 和其他工具兼容 |
| 组织指令 | GitHub 组织 | 跨仓库共享 |

### 基于文件的指令

根据文件模式或任务描述有条件地应用：

| 文件 | 作用域 | 说明 |
|---|---|---|
| `*.instructions.md` | 工作区 (`.github/instructions/`) 或用户 (`~/.copilot/instructions/`) | 使用 `applyTo` glob 模式匹配文件 |

## 创建指令

### 快速开始：`copilot-instructions.md`

在工作区根目录创建 `.github/copilot-instructions.md`：

```markdown
# 项目编码标准

- 所有新文件使用 TypeScript。
- 遵循 Airbnb 风格指南。
- 使用 `date-fns` 而非 `moment.js`（moment 已弃用）。
- 所有 API 端点必须包含输入验证。
- 为所有公共函数编写 JSDoc 注释。
```

### 基于文件：`.instructions.md`

在 `.github/instructions/` 中创建带有 YAML Frontmatter 的文件：

```markdown
---
name: 'Python 标准'
description: 'Python 文件的编码规范'
applyTo: '**/*.py'
---
# Python 编码标准

- 遵循 PEP 8 风格指南。
- 为所有函数签名使用类型注解。
- 为公共函数编写文档字符串。
- 使用 4 个空格缩进。
```

你可以按主题组织：

```
.github/instructions/
  frontend/
    react.instructions.md
    accessibility.instructions.md
  backend/
    api-design.instructions.md
  testing/
    unit-tests.instructions.md
```

### 使用 AI 生成

- `/init` — 生成工作区范围的始终生效指令
- `/create-instruction` — 生成有针对性的基于文件的指令
- 你也可以从对话中提取指令："从此对话中提取一条指令"

## AGENTS.md

在以下情况使用 `AGENTS.md`：
- 你使用多个 AI 智能体并希望有一个统一的指令集
- 你希望在 Monorepo 中设置子文件夹级别的指令

通过 `chat.useNestedAgentsMdFiles` 启用嵌套的 `AGENTS.md` 文件以设置子文件夹特定的指令。

## 指令优先级

1. **个人指令**（用户级）— 最高优先级
2. **仓库指令**（`.github/copilot-instructions.md` 或 `AGENTS.md`）
3. **组织指令** — 最低优先级

## 编写指令的技巧

- 保持指令 **简短独立** — 每条指令一个语句。
- **包含规则的原因** — AI 在边界情况下会做出更好的决策。
- **展示代码示例** — 推荐的和应避免的模式。
- **关注非显而易见的规则** — 跳过 Linter 已经强制执行的内容。
- 使用多个 `.instructions.md` 文件按主题分类，并配合 `applyTo` 模式。
- 指令之间的 **空白字符** 会被忽略。

## 共享指令

- **团队共享** — 存储在 `.github/` 中并提交到版本控制
- **组织范围** — 在 GitHub 组织级别定义（启用 `github.copilot.chat.organizationInstructions.enabled`）
- **跨设备同步** — 启用 Settings Sync → 提示词和指令

## 故障排除

- 验证文件位置：`.github/copilot-instructions.md` 必须在工作区根目录的 `.github/` 内
- 检查 `applyTo` glob 模式是否与你正在处理的文件匹配
- 检查聊天响应中的 **References** 部分以查看使用了哪些指令
- 右键聊天视图 → **Diagnostics** 查看所有已加载的指令文件

## 参考资料

- [VS Code 中的自定义指令](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [社区示例](https://github.com/github/awesome-copilot)

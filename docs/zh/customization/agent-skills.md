# 智能体技能 (Agent Skills)

智能体技能是包含指令、脚本和资源的文件夹，Copilot 在需要时按需加载以执行专门的任务。技能是一个 [开放标准](https://agentskills.io/)，可以跨 VS Code、Copilot CLI 和 Copilot 编码智能体使用。

## 技能 vs. 指令 vs. 提示词

| 特性 | 智能体技能 | 自定义指令 | 提示词文件 |
|---|---|---|---|
| 用途 | 专门的能力和工作流 | 编码标准和指南 | 可重用的任务提示词 |
| 内容 | 指令、脚本、示例、资源 | 仅指令 | 仅指令 |
| 加载方式 | 按需加载（任务匹配时） | 始终应用（或通过 glob） | 手动调用 |
| 可移植性 | 跨智能体（VS Code、CLI、编码智能体） | VS Code 和 GitHub.com | 仅 VS Code |

## 创建技能

### 文件位置

| 作用域 | 位置 |
|---|---|
| 项目 | `.github/skills/`、`.claude/skills/`、`.agents/skills/` |
| 个人 | `~/.copilot/skills/`、`~/.claude/skills/`、`~/.agents/skills/` |

### 结构

技能是一个包含 `SKILL.md` 文件和可选支持文件的目录：

```
.github/skills/
  webapp-testing/
    SKILL.md              # 必需 — 指令和元数据
    test-template.js      # 支持脚本
    examples/             # 示例场景
      login-test.js
```

### SKILL.md 格式

```markdown
---
name: webapp-testing
description: |
  使用 Playwright 测试 Web 应用功能。
  在编写或运行基于浏览器的测试时使用此技能。
---

# Web 应用测试

## 何时使用
测试任何基于浏览器的功能时使用此技能。

## 步骤
1. 使用模板在 `tests/` 中创建测试文件：[测试模板](./test-template.js)
2. 使用 Playwright 进行浏览器自动化
3. 包含视觉元素和 API 响应的断言
4. 使用 `npx playwright test` 运行测试

## 示例
参见 [登录测试示例](./examples/login-test.js) 了解期望的模式。
```

### Frontmatter 属性

| 属性 | 必填 | 描述 |
|---|---|---|
| `name` | 是 | 唯一标识符（小写、连字符）。必须与目录名匹配。最多 64 个字符。 |
| `description` | 是 | 技能的功能和何时使用。最多 1024 个字符。 |
| `argument-hint` | 否 | 作为斜杠命令调用时的提示文字 |
| `user-invocable` | 否 | 是否出现在 `/` 菜单中（默认：`true`） |
| `disable-model-invocation` | 否 | 智能体是否可以自动加载它（默认：`false`） |

### 使用 AI 生成

- `/create-skill` — 描述你想要的技能，智能体为你生成
- 从对话中提取："根据我们刚才调试的过程创建一个技能"

## 技能加载方式（三个层次）

1. **发现** — Copilot 读取 Frontmatter 中的 `name` 和 `description`，与你的任务匹配
2. **指令加载** — Copilot 将 `SKILL.md` 主体加载到上下文中
3. **资源访问** — Copilot 仅在引用时访问支持文件

::: tip
你可以安装很多技能而不消耗上下文。每个任务仅加载相关内容。
:::

## 使用技能

- 作为斜杠命令：在聊天中输入 `/webapp-testing`
- 在命令后添加上下文：`/webapp-testing 用于登录页面`
- 智能体可以根据任务相关性自动加载技能（除非 `disable-model-invocation: true`）

## 共享技能

社区技能可在以下位置获取：
- [github/awesome-copilot](https://github.com/github/awesome-copilot) — 社区收集
- [anthropics/skills](https://github.com/anthropics/skills) — 参考技能

要使用共享技能：将目录复制到 `.github/skills/`，审查 `SKILL.md`，根据需要进行自定义。

## 参考资料

- [VS Code 中的智能体技能](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [智能体技能规范](https://agentskills.io/)

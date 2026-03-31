# 钩子 (Hooks)

钩子在智能体会话的关键生命周期节点执行自定义 Shell 命令。与引导行为的指令或提示词不同，钩子以 **确定性** 的方式运行，保证结果。

## 为什么使用钩子？

- **强制执行安全策略** — 阻止危险命令（`rm -rf`、`DROP TABLE`）
- **自动化代码质量** — 在每次编辑后运行格式化工具、Linter、测试
- **创建审计追踪** — 记录每次工具调用以满足合规要求
- **注入上下文** — 在会话开始时添加项目信息
- **控制审批** — 自动批准安全操作，对敏感操作要求确认

## 快速开始

创建 `.github/hooks/format.json`：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": "npx prettier --write \"$TOOL_INPUT_FILE_PATH\""
      }
    ]
  }
}
```

保存后，VS Code 会自动加载钩子。下次智能体编辑文件时，Prettier 会对其运行。

## 钩子生命周期事件

| 事件 | 触发时机 | 使用示例 |
|---|---|---|
| `SessionStart` | 新会话的第一个提示词 | 初始化资源、记录会话开始 |
| `UserPromptSubmit` | 用户提交提示词 | 审计请求、注入上下文 |
| `PreToolUse` | 智能体调用工具之前 | 阻止危险操作、要求审批 |
| `PostToolUse` | 工具完成之后 | 运行格式化工具、记录结果 |
| `PreCompact` | 上下文被精简之前 | 导出重要上下文 |
| `SubagentStart` | 子智能体被生成 | 跟踪嵌套智能体使用 |
| `SubagentStop` | 子智能体完成 | 聚合结果、清理 |
| `Stop` | 智能体会话结束 | 生成报告、清理 |

## 钩子文件位置

| 作用域 | 位置 |
|---|---|
| 工作区 | `.github/hooks/*.json` |
| 工作区 (Claude) | `.claude/settings.json`、`.claude/settings.local.json` |
| 用户 | `~/.copilot/hooks`、`~/.claude/settings.json` |
| 自定义智能体 | `.agent.md` Frontmatter 中的 `hooks` 字段 |

工作区钩子优先于用户钩子。

## 配置格式

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "type": "command",
        "command": "./scripts/validate-tool.sh",
        "timeout": 15
      }
    ],
    "PostToolUse": [
      {
        "type": "command",
        "command": "npx prettier --write \"$TOOL_INPUT_FILE_PATH\""
      }
    ]
  }
}
```

### 命令属性

| 属性 | 类型 | 描述 |
|---|---|---|
| `type` | string | 必须为 `"command"` |
| `command` | string | 默认命令（跨平台） |
| `windows` | string | Windows 特定覆盖 |
| `linux` | string | Linux 特定覆盖 |
| `osx` | string | macOS 特定覆盖 |
| `cwd` | string | 工作目录（相对于仓库根目录） |
| `env` | object | 附加环境变量 |
| `timeout` | number | 超时时间（秒，默认：30） |

## 钩子输入/输出

钩子通过 stdin（JSON 输入）和 stdout（JSON 输出）进行通信。

### 通用输入

```json
{
  "timestamp": "2026-02-09T10:30:00.000Z",
  "cwd": "/path/to/workspace",
  "sessionId": "session-id",
  "hookEventName": "PreToolUse"
}
```

### 通用输出

```json
{
  "continue": true,
  "stopReason": "安全策略违规",
  "systemMessage": "向用户显示的警告"
}
```

### 退出码

| 退出码 | 含义 |
|---|---|
| `0` | 成功 — 将 stdout 解析为 JSON |
| `2` | 阻塞性错误 — 停止处理，向模型显示错误 |
| 其他 | 非阻塞性警告 — 显示警告，继续 |

## PreToolUse — 阻止或修改工具调用

额外输入：`tool_name`、`tool_input`、`tool_use_id`

通过 `hookSpecificOutput` 输出：

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "已阻止破坏性命令"
  }
}
```

权限决策：`"allow"` < `"ask"` < `"deny"`（最严格的优先）。

## 智能体范围的钩子

在自定义智能体的 Frontmatter 中定义钩子（启用 `chat.useCustomAgentHooks`）：

```markdown
---
name: "Strict Formatter"
hooks:
  PostToolUse:
    - type: command
      command: "./scripts/format-changed-files.sh"
---

你是一个代码编辑智能体。每次编辑后文件会自动格式化。
```

## 使用 UI 配置

- 在聊天中输入 `/hooks`
- 或从命令面板运行 `Chat: Configure Hooks`
- 或在聊天视图中使用齿轮图标 → **Hooks**

使用 AI 生成钩子：输入 `/create-hook` 并描述你想要的自动化。

## 安全注意事项

::: warning
钩子以与 VS Code 相同的权限执行 Shell 命令。请仔细审查配置，特别是来自不信任来源的配置。
:::

- 在启用之前检查所有钩子脚本
- 使用最小权限原则
- 验证和净化所有输入以防止注入
- 切勿硬编码密钥 — 使用环境变量

## 参考资料

- [VS Code 中的智能体钩子](https://code.visualstudio.com/docs/copilot/customization/hooks)

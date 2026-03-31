# 安全 (Security)

AI 驱动的开发可以自主修改文件、运行命令和访问外部服务。了解 VS Code 的安全控制有助于你在充分利用智能体能力的同时保持安全。

## 推荐的安全基准

1. **以受限模式打开不信任的项目** — 在你审查内容之前禁用智能体
2. **启用终端沙盒** — `chat.tools.terminal.sandbox.enabled`（macOS/Linux）
3. **在接受之前审查所有文件编辑** — 使用差异编辑器检查更改
4. **保护敏感文件** — 使用 `chat.tools.edits.autoApprove` 配置 glob 模式（如 `"**/.env": false`）
5. **将自动审批限定在会话级别** — 在会话级别授予权限，而非用户级别
6. **在信任之前审查 MCP 服务器** — 验证来源和配置

## 信任边界

VS Code 使用显式的信任边界 — 每个边界在信任之前都需要同意：

| 边界 | 控制内容 |
|---|---|
| **工作区** | 可以执行代码的任务、调试、工作区设置 |
| **扩展发布者** | 来自特定发布者的扩展 |
| **MCP 服务器** | MCP 服务器是否可以启动并提供工具 |
| **网络域** | 智能体是否可以从 URL 获取内容 |

你可以随时通过命令面板 **撤销信任**。

## 权限级别

权限选择器控制智能体的自主度：

| 级别 | 行为 |
|---|---|
| **默认审批 (Default Approvals)** | 使用你配置的审批设置 |
| **绕过审批 (Bypass Approvals)** | 自动批准所有工具调用 |
| **自动驾驶 (Autopilot)** | 自动批准一切，驱动智能体完成任务 |

## 范围与隔离

- **工作区限定的文件访问** — 智能体只能读取/写入工作区内的文件
- **工具选择器** — 选择性地启用/禁用特定工具
- **会话隔离** — 权限不会在当前会话之外持续
- **请求限制** — 防止失控的操作
- **智能体隔离** — 后台智能体在单独的 Git 工作树中工作；云端智能体在远程运行

## 审批控制

- **终端审批** — 智能体在运行命令前请求确认；可配置的自动审批规则（正则表达式模式）
- **工具审批** — MCP 工具调用需要显式批准（会话/工作区/用户范围）
- **URL 审批** — 两步流程：信任域，然后审查获取的内容
- **文件编辑审查** — 在应用之前在差异编辑器中审查建议的更改

## 终端沙盒（macOS/Linux）

启用 `chat.tools.terminal.sandbox.enabled` 来限制：
- 文件系统访问（默认仅读取/写入工作目录）
- 网络访问（默认全部阻止，配置允许的域）

::: warning
终端沙盒是防御恶意命令最强的保护。对于提示词注入的担忧，请使用沙盒或开发容器，而不是仅依赖自动审批规则。
:::

## MCP 服务器沙盒（macOS/Linux）

在服务器配置中启用 `sandboxEnabled: true` 来限制文件系统和网络访问：

```json
{
  "servers": {
    "myServer": {
      "command": "npx",
      "args": ["-y", "@example/mcp-server"],
      "sandboxEnabled": true,
      "sandbox": {
        "filesystem": { "allowWrite": ["${workspaceFolder}"] },
        "network": { "allowedDomains": ["api.example.com"] }
      }
    }
  }
}
```

## 使用钩子进行安全控制

使用 [钩子](/zh/customization/hooks) 进行确定性的安全执行：

- **`PreToolUse`** — 阻止危险命令（`rm -rf`、`DROP TABLE`）
- **权限决策** — 为每个工具调用返回 `allow`、`deny` 或 `ask`
- **审计追踪** — 记录每次工具调用以满足合规要求

## 需要关注的安全风险

- **执行和访问** — 智能体可以使用你的权限运行终端命令
- **供应链** — AI 建议的依赖项可能包含漏洞
- **自动审批的权衡** — 便利性 vs. 控制力
- **信息暴露** — 提示词中的敏感数据会发送给模型
- **提示词注入** — 获取的资源或文件中的恶意内容

## 企业策略

组织可以强制执行集中化的控制：

| 策略 | 效果 |
|---|---|
| `ChatAgentMode` | 完全禁用 Agent 模式 |
| `ChatAgentExtensionTools` | 阻止扩展提供的工具 |
| `ChatMCP` | 将 MCP 限制为策展注册表或完全禁用 |
| `ChatToolsAutoApprove` | 禁用全局自动审批 |
| `ChatToolsTerminalEnableAutoApprove` | 禁用终端自动审批 |

## 参考资料

- [VS Code 中的安全](https://code.visualstudio.com/docs/copilot/security)
- [GitHub Copilot 信任中心](https://resources.github.com/copilot-trust-center/)
- [企业 AI 设置](https://code.visualstudio.com/docs/enterprise/ai-settings)

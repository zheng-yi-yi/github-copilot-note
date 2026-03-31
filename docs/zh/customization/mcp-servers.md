# MCP 服务器

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/) 是一个用于将 AI 模型连接到外部工具和数据源的开放标准。MCP 服务器提供文件操作、数据库或外部 API 等工具 — 将智能体的能力扩展到本地工作区之外。

## 快速开始

1. 打开扩展视图 (<kbd>Ctrl+Shift+X</kbd>) → 搜索 `@mcp playwright`
2. 安装 Playwright MCP 服务器
3. 在提示时确认信任
4. 打开聊天并使用工具：

```
访问 code.visualstudio.com，关闭 Cookie 横幅，
然后给我一张首页的截图。
```

## 添加 MCP 服务器

### 从 MCP 库

1. 打开扩展视图 → 搜索 `@mcp` 获取可用服务器
2. **Install** 安装到用户配置文件，或右键 → **Install in Workspace**（更新 `.vscode/mcp.json`）

### 手动配置 (mcp.json)

在工作区中创建或编辑 `.vscode/mcp.json`：

```json
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@microsoft/mcp-server-playwright"]
    }
  }
}
```

用户级配置请运行 `MCP: Open User Configuration`。

::: warning
**切勿硬编码 API 密钥。** 请改用输入变量或环境文件。
:::

### 从命令行

```bash
code --add-mcp '{"name":"playwright","command":"npx","args":["-y","@microsoft/mcp-server-playwright"]}'
```

## MCP 能力

| 能力 | 描述 | 访问方式 |
|---|---|---|
| **工具 (Tools)** | 智能体可以调用的函数（查询数据库、调用 API 等） | 在聊天中自动可用 |
| **资源 (Resources)** | 只读数据（文件、数据库表、API 响应） | 添加上下文 → MCP Resources |
| **提示词 (Prompts)** | 预配置的提示词模板 | 在聊天中输入 `/<server>.<prompt>` |
| **MCP Apps** | 交互式 UI 组件（表单、可视化） | 在聊天中内联显示 |

## 沙盒 (macOS/Linux)

限制 MCP 服务器对特定文件和网络域的访问：

```json
{
  "servers": {
    "myServer": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@example/mcp-server"],
      "sandboxEnabled": true,
      "sandbox": {
        "filesystem": {
          "allowWrite": ["${workspaceFolder}"]
        },
        "network": {
          "allowedDomains": ["api.example.com"]
        }
      }
    }
  }
}
```

::: info
沙盒功能目前在 Windows 上不可用。
:::

## 管理服务器

- **扩展视图** — 在 MCP SERVERS - INSTALLED 部分右键
- **mcp.json 编辑器** — 使用内联 Code Lens 操作
- **命令面板** — `MCP: List Servers`
- **启用/禁用** — 右键服务器或使用 Chat Customizations 编辑器

## 信任与安全

- 首次启动需要信任确认
- 在信任前审查配置
- 重置信任：命令面板中的 `MCP: Reset Trust`
- 组织可以通过 GitHub 策略集中管理 MCP 访问权限

## 跨设备同步

启用 Settings Sync → 运行 `Settings Sync: Configure` → 启用 **MCP Servers**。

## 故障排除

- 检查 **MCP 输出日志**：选择聊天中的错误 → Show Output
- 或运行 `MCP: List Servers` → 选择服务器 → Show Output
- Docker 服务器：确保 Docker Desktop 正在运行且端口正确

## 参考资料

- [VS Code 中的 MCP 服务器](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
- [MCP 配置参考](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration)
- [Model Context Protocol 文档](https://modelcontextprotocol.io/)

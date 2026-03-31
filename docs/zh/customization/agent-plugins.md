# 智能体插件 (Agent Plugins)

智能体插件是预封装的聊天自定义捆绑包，你可以从插件市场发现并安装。单个插件可以提供斜杠命令、智能体技能、自定义智能体、钩子和 MCP 服务器的任意组合。

## 插件提供什么

一个插件可以捆绑：

- **斜杠命令** — 额外的 `/` 命令
- **技能** — 带有指令和脚本的 [智能体技能](./agent-skills)
- **智能体** — 具有专门角色的 [自定义智能体](./custom-agents)
- **钩子** — 用于自动化的 [生命周期钩子](./hooks)
- **MCP 服务器** — 用于外部工具的 [MCP 服务器](./mcp-servers)

插件结构示例：

```
my-testing-plugin/
  plugin.json              # 插件元数据
  skills/
    test-runner/
      SKILL.md             # 测试技能
      run-tests.sh         # 支持脚本
  agents/
    test-reviewer.agent.md # 代码审查智能体
  hooks/
    hooks.json             # 钩子配置
  .mcp.json                # MCP 服务器定义
```

::: warning
插件可以包含在你机器上运行代码的钩子和 MCP 服务器。安装前请审查插件内容和发布者。
:::

## 发现和安装

### 从市场

1. 打开扩展视图 (<kbd>Ctrl+Shift+X</kbd>) → 搜索 `@agentPlugins`
2. 浏览可用插件
3. 选择 **Install** 添加到你的用户配置文件

### 从源码

运行 `Chat: Install Plugin From Source` 并输入 Git 仓库 URL。

### 管理插件

- 查看已安装的：扩展视图中的 **Agent Plugins - Installed** 部分
- 启用/禁用：右键插件，或 Chat Customizations 编辑器
- 卸载：右键 → Uninstall

禁用插件会禁用其所有技能、智能体、钩子、MCP 服务器和命令。

## 配置市场

默认市场：[copilot-plugins](https://github.com/github/copilot-plugins) 和 [awesome-copilot](https://github.com/github/awesome-copilot/)

添加额外市场：

```json
// settings.json
"chat.plugins.marketplaces": [
    "anthropics/claude-code"
]
```

支持的格式：
- 简写：`owner/repo`
- HTTPS：`https://github.com/org/repo.git`
- SSH：`git@github.com:org/repo.git`
- 本地：`file:///path/to/marketplace`

## 本地插件

注册手动克隆的插件：

```json
// settings.json
"chat.pluginLocations": {
    "/path/to/my-plugin": true,
    "/path/to/another-plugin": false
}
```

## 工作区推荐

项目可以为团队成员推荐插件：

```json
{
  "extraKnownMarketplaces": {
    "company-tools": {
      "source": {
        "source": "github",
        "repo": "your-org/plugin-marketplace"
      }
    }
  },
  "enabledPlugins": {
    "code-formatter@company-tools": true
  }
}
```

## 插件中的钩子

插件钩子使用与工作区钩子相同的格式。使用 `${CLAUDE_PLUGIN_ROOT}` 引用插件内的脚本：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "type": "command",
        "command": "${CLAUDE_PLUGIN_ROOT}/scripts/format.sh"
      }
    ]
  }
}
```

## 插件中的 MCP 服务器

插件 MCP 服务器在 `.mcp.json` 中使用 `mcpServers`（而非 `servers`）：

```json
{
  "mcpServers": {
    "plugin-api": {
      "command": "npx",
      "args": ["@company/mcp-server", "--plugin-mode"],
      "cwd": "${CLAUDE_PLUGIN_ROOT}"
    }
  }
}
```

插件 MCP 服务器是隐式信任的（没有单独的信任提示）。

## 参考资料

- [VS Code 中的智能体插件](https://code.visualstudio.com/docs/copilot/customization/agent-plugins)
- [为 Copilot CLI 查找和安装插件](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing)

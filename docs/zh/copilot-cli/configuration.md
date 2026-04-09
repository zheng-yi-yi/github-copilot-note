# 配置指南

Copilot CLI 提供多种配置选项，控制它可以访问和操作的范围，包括信任目录、工具权限、路径访问和 URL 访问。

配置存储在 `config.json` 中，默认位于 `~/.copilot/`。可以通过设置 `COPILOT_HOME` 环境变量更改此位置。

## 信任目录

信任目录控制 Copilot CLI 可以在哪些位置读取、修改和执行文件。

### 选择信任目录

启动 Copilot CLI 会话时，系统会要求你确认信任当前目录中的文件。你可以选择：

- **仅本次会话** — 会话结束后信任移除。
- **本次及以后的会话** — 永久信任该目录。

::: warning
你应该只从你信任的目录启动 Copilot CLI。不要在可能包含不可信可执行文件的目录、或包含敏感数据的目录中使用。通常，你**不应该**从主目录启动 Copilot CLI。
:::

### 管理信任目录

在会话期间，使用 `/add-dir` 信任额外的目录：

```
/add-dir /path/to/directory
```

要编辑永久信任目录列表，修改配置文件中的 `trusted_folders` 数组：

- **macOS/Linux**：`~/.copilot/config.json`
- **Windows**：`$HOME\.copilot\config.json`

## 工具权限

你可以通过响应审批提示或命令行标志来控制 Copilot CLI 可以使用的工具。

### 交互式审批

当 Copilot 首次需要使用可能修改或执行文件的工具时，它会请求你的审批，提供三个选项：

1. **是** — 仅允许这一次。
2. **是，并在当前会话中批准此工具** — 在会话期间允许所有使用。
3. **否，告诉 Copilot 换个方式**（<kbd>Esc</kbd>） — 取消并重新引导。

### 命令行审批标志

#### 允许所有工具

```bash
copilot -p "撤销最后一次提交" --allow-all-tools
```

#### 拒绝特定工具

```bash
copilot --deny-tool='shell(git push)'
```

`--deny-tool` 的优先级高于 `--allow-all-tools` 和 `--allow-tool`。

#### 允许特定工具

```bash
copilot --allow-tool='shell'
```

### 工具指定语法

`--deny-tool` 和 `--allow-tool` 选项支持三种工具指定方式：

#### Shell 命令

使用 `shell(COMMAND)` 允许或拒绝特定 shell 命令：

```bash
# 拒绝所有 rm 命令
copilot --deny-tool='shell(rm)'

# 拒绝 git push
copilot --deny-tool='shell(git push)'

# 允许所有 shell 命令
copilot --allow-tool='shell'
```

对于 `git` 和 `gh` 命令，可以指定一级子命令。

#### 写入工具

使用 `write` 允许或拒绝文件修改工具（shell 命令除外）：

```bash
copilot --allow-tool='write'
```

#### MCP 服务器工具

使用 `MCP_SERVER_NAME` 允许或拒绝 MCP 服务器中的工具：

```bash
# 拒绝 MCP 服务器的特定工具
copilot --deny-tool='My-MCP-Server(tool_name)'

# 允许 MCP 服务器的所有工具
copilot --allow-tool='My-MCP-Server'
```

在交互界面中输入 `/mcp` 可以查看 MCP 服务器的名称。

### 组合审批选项

你可以组合标志进行精确控制：

```bash
# 允许所有，但拒绝 rm 和 git push
copilot --allow-all-tools --deny-tool='shell(rm)' --deny-tool='shell(git push)'

# 允许某服务器的所有工具，但拒绝其中一个
copilot --allow-tool='My-MCP-Server' --deny-tool='My-MCP-Server(tool_name)'
```

### 限制可用工具

使用 `--available-tools` 将 Copilot 限制在特定的工具集内。未包含的工具将不可用。

## 路径权限

路径权限控制 Copilot 可以访问哪些目录和文件。默认情况下，Copilot CLI 可以访问当前工作目录、其子目录和系统临时目录。

::: warning
Shell 命令的路径检测有局限性：
- 嵌入在复杂 shell 构造中的路径可能无法被检测。
- 仅扩展特定的环境变量（`HOME`、`TMPDIR`、`PWD` 等），自定义变量如 `$MY_PROJECT_DIR` 不会被扩展。
- 符号链接仅对已存在的文件进行解析，对正在创建的文件不会解析。
:::

### 允许所有路径

```bash
copilot --allow-all-paths
```

### 禁止临时目录

```bash
copilot --disallow-temp-dir
```

## URL 权限

URL 权限控制 Copilot 可以访问哪些外部 URL。默认情况下，所有 URL 都需要审批。

::: warning
Shell 命令的 URL 检测有局限性：
- 文件内容、配置文件或环境变量中的 URL 不会被检测。
- 混淆的 URL 可能不会被检测。
- HTTP 和 HTTPS 被视为不同的协议，需要分别审批。
:::

### 禁用 URL 验证

```bash
copilot --allow-all-urls
```

### 预批准特定域名

```bash
copilot --allow-url=github.com
```

### 拒绝特定域名

```bash
copilot --deny-url=example.com
```

## 允许一切

要同时允许所有工具、路径和 URL，使用 `--allow-all` 或其别名 `--yolo`：

```bash
copilot --allow-all
```

这组合了：
- `--allow-all-tools`（跳过工具审批）
- `--allow-all-paths`（禁用路径验证）
- `--allow-all-urls`（禁用 URL 验证）

::: tip
在交互会话中，你也可以使用 `/allow-all` 或 `/yolo` 斜杠命令启用所有权限。
:::

## 配置文件

所有设置都可以在 `config.json` 文件中调整：

- **默认位置**：`~/.copilot/config.json`
- **自定义位置**：设置 `COPILOT_HOME` 环境变量

运行 `copilot help config` 查看可用的配置设置详情。

## 参考资料

- [配置 GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli)
- [GitHub Copilot CLI 配置目录](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference)

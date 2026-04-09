# 使用指南

GitHub Copilot CLI 有两种用户界面：**交互模式** 和 **编程模式**。本指南涵盖两种模式的使用方法，以及常用的斜杠命令和使用技巧。

## 启动会话

导航到包含你要处理代码的文件夹，然后运行：

```bash
copilot
```

Copilot 会要求你确认**信任该文件夹中的文件**。选择以下之一：

1. **是，继续** — 仅本次会话信任。
2. **是，并记住此文件夹** — 永久信任此目录。
3. **否，退出**（<kbd>Esc</kbd>） — 结束会话。

::: warning
在 Copilot CLI 会话期间，Copilot 可能会尝试读取、修改和执行当前文件夹及子文件夹中的文件。请仅在信任该位置的文件时继续。
:::

通过信任目录后，如果你尚未登录，请使用 `/login` 斜杠命令进行身份认证。

## 交互模式

在交互模式下，你可以与 Copilot 进行对话。你可以提示它执行任务，给出反馈，并引导工作方向。

交互界面有两个子模式：

- **询问/执行模式**（默认） — Copilot 回应并执行你的提示。
- **计划模式** — Copilot 在编写代码之前构建结构化的实施计划。

按 <kbd>Shift+Tab</kbd> 在两种模式之间切换。

### 示例提示

```
将 H1 标题的背景颜色改为深蓝色
```

```
显示 CHANGELOG.md 文件的最近 5 次改动。
谁改的，什么时候改的，简要总结改动内容。
```

```
建议对 content.js 进行改进
```

```
提交本仓库的更改
```

### 工具审批

当 Copilot 需要使用可能修改或执行文件的工具（如 `touch`、`chmod`、`node`、`sed`）时，它会请求你的批准：

1. **是** — 仅本次允许此命令。
2. **是，并在当前会话中批准此工具** — 在当前会话期间允许此工具的所有使用。
3. **否，告诉 Copilot 换个方法**（<kbd>Esc</kbd>） — 取消并重新引导。

::: tip
当你拒绝工具权限请求时，可以向 Copilot 提供内联反馈，使其能够调整方法而不完全停止。
:::

## 编程模式

在命令行直接传入单条提示，使用 `-p` 或 `--prompt` 选项。CLI 完成任务后退出。

```bash
copilot -p "显示本周的提交并进行总结" --allow-tool='shell(git)'
```

你也可以通过脚本输出选项并传递给 `copilot`：

```bash
./script-outputting-options.sh | copilot
```

::: danger
如果你使用自动批准选项（如 `--allow-all-tools`），Copilot 将拥有与你相同的文件和命令访问权限，不会事先征得你的批准。
:::

## 引导对话

你可以在 Copilot 思考时与其互动：

- **排队追加消息** — 发送后续消息引导对话方向，或排队额外指令。
- **拒绝时的内联反馈** — 拒绝工具请求时提供反馈，让 Copilot 调整方法。

## 使用场景

### 本地任务

- **代码修改**：`将 H1 标题的背景颜色改为深蓝色`
- **代码审查**：`建议对 content.js 进行改进`
- **文档改进**：`重写 readme，使其对新手更友好`
- **Git 操作**：`提交本仓库的更改` / `撤销最后一次提交，保留未暂存的更改`
- **从零构建**：`使用 create-next-app 和 tailwind CSS 创建一个 next.js 应用...`
- **调试问题**：`你说应用在 localhost:3002 上运行，但我访问时显示"无法访问此网站"`

### GitHub.com 任务

- **列出 PR**：`列出我所有打开的 PR` / `列出 OWNER/REPO 中分配给我的所有 Issue`
- **处理 Issue**：`我被分配了这个 Issue：https://github.com/org/repo/issues/1234。开始处理它。`
- **创建 PR**：`添加一个 Node 脚本 user-info.js 并创建 PR`
- **检查 PR**：`检查 PR https://github.com/org/repo/pull/57575 中的更改，报告严重错误。`
- **管理 PR**：`合并我在 org/repo 中创建的所有打开的 PR` / `关闭 PR #11`
- **查找 Issue**：`使用 GitHub MCP 服务器从 org/repo 查找好的首次贡献 Issue`
- **创建 Issue**：`在 org/repo 中提交一个关于未关闭文件句柄的改进 Issue`
- **GitHub Actions**：`创建一个在 PR 上运行 eslint 的工作流`

## 常用斜杠命令

| 命令 | 描述 |
|---|---|
| `/login` | 认证 GitHub 账号 |
| `/model` | 切换 AI 模型 |
| `/agent` | 选择自定义智能体 |
| `/plan` | 进入计划模式 |
| `/fleet` | 使用并行子智能体执行 |
| `/resume` | 恢复之前的会话 |
| `/compact` | 手动压缩对话历史 |
| `/context` | 查看 Token 使用明细 |
| `/usage` | 查看会话统计信息 |
| `/mcp` | 管理 MCP 服务器 |
| `/mcp add` | 添加新的 MCP 服务器 |
| `/cwd` 或 `/cd` | 切换工作目录 |
| `/add-dir` | 添加信任目录 |
| `/feedback` | 提交反馈、错误报告或功能建议 |
| `/experimental` | 访问实验性功能 |
| `/changelog` | 查看最新更新 |
| `/allow-all` 或 `/yolo` | 启用所有权限 |
| `!command` | 直接执行 shell 命令（不调用模型） |
| `?` | 显示帮助 |

## 使用技巧

### 引用特定文件

使用 `@` 加文件的相对路径，将文件内容作为上下文：

```
解释 @config/ci/ci-required-checks.yml
```

```
修复 @src/app.js 中的 bug
```

输入文件路径时会显示匹配结果——使用方向键和 <kbd>Tab</kbd> 键补全。

### 直接运行 Shell 命令

在输入前加 `!` 即可直接运行 shell 命令，无需调用模型：

```
!git clone https://github.com/github/copilot-cli
```

### 恢复会话

使用 `--resume` 或 `/resume` 斜杠命令恢复之前的会话。快速恢复最近的本地会话：

```bash
copilot --continue
```

你也可以将 Copilot 云端智能体会话带到本地环境。

### 切换推理可见性

按 <kbd>Ctrl+T</kbd> 显示或隐藏模型的推理过程。此设置跨会话保持。

### 停止正在运行的操作

在 Copilot "思考" 时按 <kbd>Esc</kbd> 停止当前任务。

## 上下文管理

Copilot CLI 自动管理你的对话上下文：

- **自动压缩** — 当接近 Token 限制的 95% 时，后台自动压缩历史记录。
- **手动控制** — 使用 `/compact` 随时手动压缩上下文，按 <kbd>Esc</kbd> 取消。
- **查看使用情况** — `/context` 显示详细的 Token 使用明细。

## 获取更多帮助

- 在交互会话的提示框中输入 `?`。
- 在终端中运行 `copilot help`。
- 运行 `copilot help config` 查看配置设置。
- 运行 `copilot help environment` 查看环境变量。
- 运行 `copilot help logging` 查看日志级别。
- 运行 `copilot help permissions` 查看工具权限详情。

## 参考资料

- [使用 GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
- [GitHub Copilot CLI 最佳实践](https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices)
- [GitHub Copilot CLI 命令参考](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)

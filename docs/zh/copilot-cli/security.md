# 安全性

使用 Copilot CLI 时，Copilot 可以代你执行任务，如执行或修改文件、运行 shell 命令。安全性是至关重要的考量——始终仔细审查建议的命令。

## 信任目录

信任目录控制 Copilot CLI 可以在哪些位置读取、修改和执行文件。

### 最佳实践

- **仅从受信任的目录启动** — 不要在包含不可信可执行文件的目录中使用 Copilot CLI。
- **避免包含敏感数据的目录** — 从含有敏感或机密数据的目录启动可能会无意中暴露文件。
- **不要从主目录启动** — 主目录范围太广，应限定到特定的项目目录。
- **谨慎使用永久信任** — 仅在确定该位置始终安全时才永久信任。

::: warning
权限范围的判定是启发式的，GitHub 不保证所有信任目录之外的文件都能得到保护。
:::

## 工具审批

Copilot 在使用可能修改或执行文件的工具前会请求审批。了解三个审批选项非常重要：

| 选项 | 作用 | 安全影响 |
|---|---|---|
| **是** | 仅允许这一次特定命令 | 最安全——逐次审批 |
| **是，并在会话中批准** | 在会话期间允许此工具的所有使用 | 该工具可以使用**任何**参数（例如批准 `rm` 后允许 `rm -rf ./*`） |
| **否**（<kbd>Esc</kbd>） | 取消命令 | 你可以引导 Copilot 尝试不同的方法 |

### 自动审批的风险

自动审批选项（`--allow-all-tools`、`--allow-tool`、`--allow-all`、`--yolo`）简化了工作流但增加了风险：

- Copilot 可以**无需你审查**即执行命令。
- 这可能导致**意外操作**、数据丢失或损坏。
- 使用 `--allow-all-tools` 时，Copilot 与你拥有**相同的访问权限**。

::: danger
仅在了解风险并有适当保障措施的情况下使用自动审批选项。在生产环境中，考虑在受限环境中运行。
:::

## 风险缓解

你可以通过在**受限环境**中运行 Copilot CLI 来缓解风险：

- **虚拟机** — 将任何损害限制在可丢弃的环境中。
- **容器** — 限制文件系统和网络访问。
- **专用系统** — 使用严格控制的权限和网络访问。

这在允许 Copilot 执行未审查的命令时限制了潜在损害。

## 路径和 URL 权限

- **路径权限**控制 Copilot 可以访问哪些目录和文件。默认只允许当前工作目录、子目录和系统临时目录。
- **URL 权限**控制外部 URL 访问。默认所有 URL 都需要审批。

两者对 shell 命令都有检测局限性——详情请参阅[配置指南](./configuration)。

## MCP 服务器策略限制

Copilot CLI 目前**不能**执行以下组织级 MCP 服务器策略：

- **Copilot 中的 MCP 服务器** — 控制是否允许 Copilot 使用 MCP 服务器。
- **MCP 注册 URL** — 控制 Copilot 允许从哪个 MCP 注册表使用服务器。

如果你的组织依赖这些策略，请注意此限制。

## 安全检查清单

- [ ] 始终从特定项目目录启动 Copilot CLI，而不是 `~` 等宽泛目录。
- [ ] 在接受之前仔细审查工具审批请求。
- [ ] 除非在容器化环境中，否则避免使用 `--allow-all-tools` 或 `--yolo`。
- [ ] 使用 `--deny-tool` 阻止危险命令（如 `shell(rm)`、`shell(git push)`）。
- [ ] 使用 `--available-tools` 将 Copilot 限制在特定的工具集。
- [ ] 对于自动化/无人值守的工作流，考虑在容器或虚拟机中运行。
- [ ] 谨慎对待 MCP 服务器工具——验证已配置的服务器。
- [ ] 定期检查 `config.json` 中的信任目录和允许的工具。

## 参考资料

- [安全注意事项](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli#security-considerations)
- [配置 GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli)
- [GitHub Copilot CLI 的负责任使用](https://docs.github.com/en/enterprise-cloud@latest/copilot/responsible-use/copilot-cli)

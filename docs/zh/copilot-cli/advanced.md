# 高级功能

GitHub Copilot CLI 提供了多种高级功能，包括模型选择、Rubber Duck 跨模型审查、并行智能体执行、自定义模型提供商和智能体客户端协议（ACP）。

## 模型使用

GitHub Copilot CLI 的默认模型是 **Claude Sonnet 4.5**。GitHub 保留更改此默认模型的权利。

### 切换模型

使用 `/model` 斜杠命令或 `--model` 命令行选项更改模型：

```bash
copilot --model claude-opus-4.6
```

在交互会话中，输入 `/model` 从可用模型列表中选择。

### Premium 请求消耗

每次提交提示都会按模型列表中显示的倍数消耗你的每月 **Copilot Premium 请求**配额。例如：

- `Claude Sonnet 4.5 (1x)` — 每次提示消耗 1 个 Premium 请求。
- 更高级的模型可能有更高的倍数。

这适用于交互式提示和编程式调用。

## 自定义模型提供商

你可以配置 Copilot CLI 使用自己的模型提供商而非 GitHub 托管的模型。支持：

- **OpenAI 兼容端点**（包括 Ollama 和 vLLM）
- **Azure OpenAI**
- **Anthropic**

### 通过环境变量配置

| 变量 | 描述 |
|---|---|
| `COPILOT_PROVIDER_BASE_URL` | 模型提供商 API 端点的基础 URL |
| `COPILOT_PROVIDER_TYPE` | 提供商类型：`openai`（默认）、`azure` 或 `anthropic` |
| `COPILOT_PROVIDER_API_KEY` | 身份验证的 API 密钥（本地 Ollama 等不需要身份验证的提供商不需要） |
| `COPILOT_MODEL` | 使用的模型（使用自定义提供商时必填） |

::: tip
模型必须支持**工具调用**（函数调用）和**流式传输**。为获得最佳效果，请使用上下文窗口至少 **128k Token** 的模型。
:::

有关详细配置说明，运行：

```bash
copilot help providers
```

## Rubber Duck（实验性）

Rubber Duck 是一个专注的**跨模型审查智能体**，使用来自不同 AI 家族的模型提供第二意见。当使用 Claude 模型作为编排器时，Rubber Duck 使用 **GPT-5.4** 作为审查者。

### 工作原理

Rubber Duck 检查智能体的工作，并提供一个简短、聚焦的高价值关注列表：
- 主要智能体可能遗漏的细节
- 值得质疑的假设
- 需要考虑的边缘情况

### 何时激活？

Rubber Duck 可以通过三种方式触发：

**自动触发**（在高回报的检查点）：
1. **起草计划之后** — 尽早发现次优决策可避免错误累积。
2. **复杂实现之后** — 让第二双眼睛审查复杂代码以捕捉边缘情况。
3. **编写测试之后、执行测试之前** — 捕捉测试覆盖率的缺口或有缺陷的断言。

**被动触发**：如果智能体陷入循环或无法推进，咨询 Rubber Duck 可以打破僵局。

**按需触发**：随时要求 Copilot 审查其工作，它会调用 Rubber Duck，整合反馈，并展示变更内容。

### 性能表现

Claude Sonnet 4.6 结合 Rubber Duck（GPT-5.4）在 SWE-Bench Pro 上的解决率接近 Claude Opus 4.6 单独运行的水平，弥补了 Sonnet 和 Opus 之间 **74.7%** 的差距。它在以下场景中帮助最大：

- 涉及 **3 个以上文件**的困难问题
- 需要 **70 步以上**的任务
- 复杂的重构和架构更改
- 失误代价高昂的高风险任务

### 真实案例

Rubber Duck 发现的问题示例：
- **架构问题**：提议的调度器会启动后立即退出，不执行任何任务。
- **单行 Bug**：一个循环在每次迭代中静默覆盖同一个 `dict` 键，导致 4 个 Solr 分面类别中的 3 个被丢弃。
- **跨文件冲突**：三个文件读取一个 Redis 键，而新代码停止了对该键的写入，导致确认 UI 静默失效。

### 开始使用

启用实验模式以访问 Rubber Duck：

```
/experimental
```

当你选择任何 Claude 模型并拥有 GPT-5.4 的访问权限时，Rubber Duck 即可使用。

## Fleet 模式

使用 `/fleet` 调度**多个智能体并行工作**。这让你可以：

- 同时使用多个模型执行
- 运行并行子智能体处理独立任务
- 比较不同模型的方法

```
/fleet
```

## CLI 到 IDE 集成

在 CLI 中用 `/plan` 开始工作，然后在 VS Code 中打开以直接编辑代码：

```
/plan
```

## 会话恢复

恢复长时间运行的工作，完整保留上下文：

```bash
# 交互式恢复之前的会话
copilot --resume

# 快速恢复最近的本地会话
copilot --continue
```

在交互会话中使用 `/resume`。记忆和自动压缩确保会话不会因历史过长而崩溃。

## 智能体客户端协议（ACP）

ACP（Agent Client Protocol）是一个**开放标准**，用于与 AI 智能体交互。它允许你在支持该协议的任何第三方工具、IDE 或自动化系统中将 Copilot CLI 作为智能体使用。

更多信息请参阅 [Copilot CLI ACP 服务器](https://docs.github.com/en/copilot/reference/copilot-cli-reference/acp-server)。

## Copilot SDK

Copilot CLI 构建在与 **Copilot SDK** 相同的智能体运行时上。如果你的应用有逻辑，它就可以拥有智能体：

```bash
npm install -g @github/copilot
```

更多信息请参阅 [GitHub Copilot CLI SDK](https://github.com/github/copilot-sdk)。

## 参考资料

- [关于 GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli)
- [Copilot CLI ACP 服务器](https://docs.github.com/en/copilot/reference/copilot-cli-reference/acp-server)
- [Rubber Duck 博客文章](https://github.blog/ai-and-ml/github-copilot/github-copilot-cli-combines-model-families-for-a-second-opinion/)
- [GitHub Copilot 中的请求](https://docs.github.com/en/copilot/concepts/billing/copilot-requests)

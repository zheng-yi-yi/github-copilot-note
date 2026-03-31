# 语言模型 (Language Models)

语言模型 (LLM) 是 GitHub Copilot 背后的 AI 引擎。它们通过根据接收到的输入预测最可能的下一个标记 (Token) 来生成文本 —— 包括代码、解释和规划。

## 关键概念

### 上下文窗口 (Context Window)

上下文窗口是模型在单次请求中可以处理的文本总量（以 Token 衡量）。它包括所有内容：系统指令、对话历史、文件内容、工具输出和自定义指令。一旦窗口填满，较早的内容将被丢弃或总结。

> **提示：** 上下文是有限的资源。请有选择地包含内容 —— 多并不总是更好。

### 标记 (Token)

Token 是 LLM 处理文本的基本单位。大致上：
- 1 Token ≈ 4 个英文单词字符
- 典型的一行代码 ≈ 10–20 个 Token
- 一个 100 行的文件 ≈ 1,000–2,000 个 Token

### 模型选择

不同的模型有不同的优势：

| 使用场景 | 推荐模型类型 |
|---|---|
| 简单的补全、样板代码 | 快速模型 (如 GPT-4.1 mini, Gemini Flash) |
| 复杂的推理、规划 | 推理模型 (如 Claude Sonnet, o3) |
| 架构决策 | 最新的旗舰模型 |

**选择模型的技巧：**

- **根据任务复杂度匹配模型。** 简单任务使用快速模型，复杂任务使用推理模型。
- **使用最新模型。** 较新的模型通常具有更强的能力。
- **在提示词文件和智能体中固定模型。** 在 `.prompt.md` 或 `.agent.md` 的 Frontmatter 中指定首选模型以保持一致性。
- **实验并对比。** 对于相同的提示词，不同的模型会产生不同的结果。
- **调整推理模型的工作量。** 使用模型选择器中的 "Thinking Effort" 控制项来调整推理深度。

### BYOK (自备密钥)

你可以使用自己的 API 密钥来获得 Copilot 包含内容之外的更多模型选择和托管选项。

## VS Code 如何使用模型

1. 你在聊天视图顶部的 **模型选择器** 中选择一个模型。
2. 智能体组装 [上下文 (Context)](./context) 并将其发送给选定的模型。
3. 模型生成响应，其中可能包含 [工具 (Tool)](./tools) 调用。
4. 工具输出被反馈给模型，用于下一次迭代。

## 参考资料

- [在 VS Code 中选择 AI 模型](https://code.visualstudio.com/docs/copilot/customization/language-models)
- [Copilot Chat 可用模型](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat)

# Language Models

Language models (LLMs) are the AI engines behind GitHub Copilot. They generate text — code, explanations, plans — by predicting the most likely next tokens based on the input they receive.

## Key Concepts

### Context Window

The context window is the total amount of text (measured in tokens) that a model can process in a single request. It includes everything: system instructions, your conversation history, file contents, tool outputs, and custom instructions. Once the window is full, older content gets dropped or summarized.

> **Tip:** Context is a finite resource. Be selective about what you include — more isn't always better.

### Token

A token is the basic unit of text that LLMs process. Roughly:
- 1 token ≈ 4 characters in English
- A typical line of code ≈ 10–20 tokens
- A 100-line file ≈ 1,000–2,000 tokens

### Model Selection

Different models have different strengths:

| Use Case | Recommended Model Type |
|---|---|
| Simple completions, boilerplate | Fast models (e.g., GPT-4.1 mini, Gemini Flash) |
| Complex reasoning, planning | Reasoning models (e.g., Claude Sonnet, o3) |
| Architectural decisions | Latest flagship models |

**Tips for choosing models:**

- **Match model to task complexity.** Use fast models for simple tasks, reasoning models for complex ones.
- **Use the latest models.** Newer models generally have improved capabilities.
- **Pin models in prompt files and agents.** Specify preferred models in your `.prompt.md` or `.agent.md` frontmatter for consistency.
- **Experiment and compare.** Different models produce different results for the same prompt.
- **Adjust thinking effort** for reasoning models using the thinking effort control in the model picker.

### BYOK (Bring Your Own Key)

You can use your own API keys for additional model choices and hosting options beyond what's included with Copilot.

## How VS Code Uses Models

1. You select a model in the **model picker** at the top of the Chat view.
2. The agent assembles [context](./context) and sends it to the selected model.
3. The model generates a response, which may include [tool](./tools) calls.
4. Tool outputs are fed back to the model for the next iteration.

## References

- [Selecting AI models in VS Code](https://code.visualstudio.com/docs/copilot/customization/language-models)
- [Available models for Copilot Chat](https://docs.github.com/en/copilot/using-github-copilot/ai-models/changing-the-ai-model-for-copilot-chat)

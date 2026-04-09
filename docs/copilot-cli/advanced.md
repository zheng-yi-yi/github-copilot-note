# Advanced Features

GitHub Copilot CLI includes several advanced features for power users, including model selection, Rubber Duck cross-model review, parallel agent execution, custom model providers, and the Agent Client Protocol (ACP).

## Model Usage

The default model used by GitHub Copilot CLI is **Claude Sonnet 4.5**. GitHub reserves the right to change this default.

### Switching Models

Change the model using the `/model` slash command or the `--model` command-line option:

```bash
copilot --model claude-opus-4.6
```

In an interactive session, enter `/model` to select from the list of available models.

### Premium Request Costs

Each prompt submission reduces your monthly quota of **Copilot premium requests** by a multiplier shown in the model list. For example:

- `Claude Sonnet 4.5 (1x)` — Each prompt costs 1 premium request.
- Higher-tier models may have higher multipliers.

This applies to both interactive prompts and programmatic invocations.

## Custom Model Providers

You can configure Copilot CLI to use your own model provider instead of GitHub-hosted models. This supports:

- **OpenAI-compatible endpoints** (including Ollama and vLLM)
- **Azure OpenAI**
- **Anthropic**

### Configuration via Environment Variables

| Variable | Description |
|---|---|
| `COPILOT_PROVIDER_BASE_URL` | The base URL of your model provider's API endpoint |
| `COPILOT_PROVIDER_TYPE` | Provider type: `openai` (default), `azure`, or `anthropic` |
| `COPILOT_PROVIDER_API_KEY` | Your API key for authentication (not required for providers like local Ollama) |
| `COPILOT_MODEL` | The model to use (required when using a custom provider) |

::: tip
Models must support **tool calling** (function calling) and **streaming**. For best results, use a model with a context window of at least **128k tokens**.
:::

For detailed configuration instructions, run:

```bash
copilot help providers
```

## Rubber Duck (Experimental)

Rubber Duck is a focused **cross-model review agent** that provides a second opinion using a model from a different AI family. When using a Claude model as your orchestrator, Rubber Duck uses **GPT-5.4** as the reviewer.

### How It Works

Rubber Duck checks the agent's work and surfaces a short, focused list of high-value concerns:
- Details the primary agent may have missed
- Assumptions worth questioning
- Edge cases to consider

### When Does It Activate?

Rubber Duck can be triggered in three ways:

**Automatically** (at high-return checkpoints):
1. **After drafting a plan** — Catching suboptimal decisions early avoids compounding errors.
2. **After a complex implementation** — A second set of eyes on complex code catches edge cases.
3. **After writing tests, before executing them** — Catches gaps in test coverage or flawed assertions.

**Reactively**: If the agent gets stuck in a loop or can't make progress, consulting Rubber Duck can break the logjam.

**On demand**: Ask Copilot to critique its work at any time, and it will invoke Rubber Duck, incorporate feedback, and show what changed.

### Performance

Claude Sonnet 4.6 paired with Rubber Duck (GPT-5.4) achieved a resolution rate approaching Claude Opus 4.6 running alone on SWE-Bench Pro, closing **74.7%** of the gap between Sonnet and Opus. It helps most with:

- Difficult problems spanning **3+ files**
- Tasks requiring **70+ steps**
- Complex refactors and architectural changes
- High-stakes tasks where a miss is costly

### Real-World Catches

Examples of what Rubber Duck finds:
- **Architectural catch**: A proposed scheduler would start and immediately exit, running zero jobs.
- **One-liner bug**: A loop silently overwrote the same `dict` key on every iteration, dropping 3 of 4 Solr facet categories.
- **Cross-file conflict**: Three files reading from a Redis key which the new code stopped writing, silently breaking confirmation UI.

### Getting Started

Enable experimental mode to access Rubber Duck:

```
/experimental
```

Rubber Duck is available when you select any Claude model and have access to GPT-5.4.

## Fleet Mode

Use `/fleet` to dispatch **multiple agents working in parallel**. This lets you:

- Execute across multiple models simultaneously
- Run parallelized subagents for independent tasks
- Compare approaches from different models

```
/fleet
```

## CLI to IDE Integration

Start work in the CLI with a `/plan`, then open it in VS Code to refine code directly:

```
/plan
```

## Session Resumption

Resume long-running work with full context preserved:

```bash
# Resume a previous session interactively
copilot --resume

# Resume the most recent local session
copilot --continue
```

Use `/resume` within an interactive session. Memory and automatic compaction keep sessions from collapsing under their own history.

## Agent Client Protocol (ACP)

ACP (Agent Client Protocol) is an **open standard** for interacting with AI agents. It allows you to use Copilot CLI as an agent in any third-party tools, IDEs, or automation systems that support this protocol.

For more information, see [Copilot CLI ACP server](https://docs.github.com/en/copilot/reference/copilot-cli-reference/acp-server).

## Copilot SDK

Copilot CLI is built on the same agentic runtime available through the **Copilot SDK**. If your application has logic, it can have an agent:

```bash
npm install -g @github/copilot
```

For more information, see [GitHub Copilot CLI SDKs](https://github.com/github/copilot-sdk).

## References

- [About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli)
- [Copilot CLI ACP server](https://docs.github.com/en/copilot/reference/copilot-cli-reference/acp-server)
- [Rubber Duck blog post](https://github.blog/ai-and-ml/github-copilot/github-copilot-cli-combines-model-families-for-a-second-opinion/)
- [Requests in GitHub Copilot](https://docs.github.com/en/copilot/concepts/billing/copilot-requests)

# Effective Prompts

The quality of AI responses depends on the clarity and specificity of your prompts. This page covers prompt writing, context provision, model selection, and session management.

## Writing Better Prompts

### Be Specific

State the language, frameworks, expected behavior, and constraints:

```
Write a TypeScript function that validates email addresses.
Return true for valid addresses, false otherwise. Don't use regex.
Example: validateEmail("user@example.com") returns true
Example: validateEmail("invalid") returns false
```

### Break Down Complex Tasks

Instead of asking for an entire feature at once, decompose it:

1. Design the data model
2. Implement the API endpoints
3. Add input validation
4. Write tests

### Include Verification Criteria

Provide test cases or acceptance criteria so the AI can verify its own work:

```
Implement a rate limiter using the token bucket algorithm.
Write unit tests that verify: 10 requests/second allowed,
11th request rejected, bucket refills after 1 second.
Run the tests after implementing.
```

### Avoid Vague Prompts

| Instead of... | Try... |
|---|---|
| "Make this better" | "Reduce the time complexity from O(n²) to O(n log n)" |
| "Fix this" | "Add input validation for null values in the `processOrder` function" |
| "Clean up this code" | "Extract the repeated database query logic into a shared helper" |

### Ask for Clarifying Questions

```
I want to add caching to our API. Before implementing,
ask me clarifying questions about our requirements.
```

### Course-Correct Early

If the AI is heading in the wrong direction, steer it with follow-up messages to redirect, queue corrections, or stop and start fresh.

### Request Parallel Work

```
Perform isolated research about Redis caching and Memcached
in parallel and summarize the trade-offs.
```

## Providing the Right Context

- **Reference specific files** — use `#file:path.ts`, `#folder:src/`, `#symbol:MyClass`
- **Fetch web content** — use `#fetch <url>` for up-to-date documentation
- **Reference environment context** — source control changes, terminal output, test failures
- **Add images/screenshots** — the AI can analyze visual content
- **Use the integrated browser** — preview your app and select page elements as context

### What NOT to Do

- Don't dump your entire codebase as context
- Don't reuse stale conversations for unrelated tasks
- Don't include irrelevant files that dilute the context

## Choosing the Right Model

| Task Type | Model Choice |
|---|---|
| Simple completions, boilerplate | Fast models (GPT-4.1 mini, Gemini Flash) |
| Complex reasoning, debugging | Reasoning models (Claude Sonnet, o3) |
| Architectural decisions, planning | Latest flagship models |

**Tips:**
- Pin models in [prompt files](/customization/prompt-files) and [custom agents](/customization/custom-agents) for consistency
- Adjust **thinking effort** for reasoning models — increase for complex tasks, reduce for simple ones
- **Experiment** — different models produce significantly different results

## Managing Sessions

- **Start new sessions for new tasks** — context pollution degrades response quality
- **Remove irrelevant history** — delete past messages that no longer matter
- **Use `/compact`** with instructions to selectively retain relevant info
- **Use subagents for investigation** — keep research out of your main context
- **Run parallel sessions** — local, background, and cloud sessions for independent tasks

## Optimizing Your Project

- **Run `/init`** to generate a starter configuration for your workspace
- Keep instruction files **concise** — they load on every interaction
- Scope instructions with **`applyTo` patterns** — `/instructions` to create language-specific rules
- **Limit enabled tools** — fewer tools means faster, more relevant responses

## References

- [Best practices for AI in VS Code](https://code.visualstudio.com/docs/copilot/best-practices)
- [Context engineering guide](https://code.visualstudio.com/docs/copilot/guides/context-engineering-guide)
- [Copilot Chat cookbook](https://docs.github.com/en/copilot/copilot-chat-cookbook)

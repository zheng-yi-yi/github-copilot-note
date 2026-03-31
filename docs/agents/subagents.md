# Subagents

Subagents are independent AI agents that perform focused work — researching, analyzing, reviewing — and report results back to the main agent. They provide **context isolation**, keeping the main conversation clean while delegating complex subtasks.

## How Subagents Work

```
Main Agent
  ├─→ Subagent A (research)    → returns summary
  ├─→ Subagent B (analysis)    → returns findings
  └── continues with results from A and B
```

1. The main agent recognizes a part of the task that benefits from isolation.
2. It starts a subagent, passing only the relevant subtask.
3. The subagent works autonomously in its own context window.
4. The subagent returns a summary to the main agent.
5. The main agent incorporates the result and continues.

## Usage Scenarios

- **Research before implementation** — delegate investigation to a subagent before making changes
- **Parallel code analysis** — analyze multiple files or modules simultaneously
- **Explore multiple solutions** — each subagent explores a different approach
- **Code review with specialized focus** — security, performance, correctness reviews in parallel

## Invoking Subagents

Subagents are typically **agent-initiated** — the main agent decides when to use them. Make sure the `runSubagent` tool is enabled.

You can hint at subagent use in your prompts:

```
Perform isolated research about the auth patterns used in this project,
then implement the changes based on the findings.
```

### In Prompt Files

Include the `agent` tool in your prompt file:

```markdown
---
name: document-feature
tools: ['agent', 'read', 'search', 'edit']
---
Run a subagent to research the feature details,
then update the docs/ folder with new documentation.
```

## Custom Agents as Subagents

Custom agents can be used as subagents with their own model, tools, and instructions:

```
Run the Research agent as a subagent to research the best auth methods.
```

### Controlling Invocation

Two frontmatter properties control how agents can be invoked:

| Property | Default | Effect |
|---|---|---|
| `user-invocable` | `true` | Controls visibility in the agents dropdown |
| `disable-model-invocation` | `false` | Prevents invocation as a subagent |

To create a subagent-only agent (hidden from dropdown):

```markdown
---
name: internal-helper
user-invocable: false
---
This agent can only be invoked as a subagent.
```

### Restricting Available Subagents

Use the `agents` property to control which subagents are available:

```markdown
---
name: TDD
tools: ['agent']
agents: ['Red', 'Green', 'Refactor']
---
1. Use the Red agent to write failing tests
2. Use the Green agent to implement code to pass
3. Use the Refactor agent to improve code quality
```

## Orchestration Patterns

### Coordinator and Worker

A coordinator agent manages the task and delegates to specialized workers:

```markdown
---
name: Feature Builder
tools: ['agent', 'edit', 'search', 'read']
agents: ['Planner', 'Implementer', 'Reviewer']
---
1. Use the Planner agent to break down the feature
2. Use the Implementer agent to write the code
3. Use the Reviewer agent to check the implementation
```

### Multi-Perspective Code Review

Run each review perspective as a parallel subagent for independent, unbiased findings:

```markdown
---
name: Thorough Reviewer
tools: ['agent', 'read', 'search']
---
Run these subagents in parallel:
- Correctness reviewer: logic errors, edge cases
- Security reviewer: injection risks, data exposure
- Architecture reviewer: design consistency

Synthesize findings into a prioritized summary.
```

## Nested Subagents

By default, subagents cannot spawn further subagents. Enable with `chat.subagents.allowInvocationsFromSubagents` (max depth: 5).

## References

- [Subagents in VS Code](https://code.visualstudio.com/docs/copilot/agents/subagents)
- [Custom agents](https://code.visualstudio.com/docs/copilot/customization/custom-agents)

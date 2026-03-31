# Planning

The Plan agent enables you to create detailed implementation plans before writing code. Planning first ensures all requirements are met and prevents the AI from solving the wrong problem.

## The Plan-First Workflow

![image-20260331151242287](images/planning/image-20260331151242287.png)

## How to Use the Plan Agent

1. Open the Chat view (<kbd>Ctrl+Alt+I</kbd>) and select **Plan** from the agents dropdown.
2. Describe your task at a high level:

```
/plan Implement a user authentication system with OAuth2 and JWT
```

3. Answer any clarifying questions the agent asks after researching.
4. Review the generated plan — it includes a high-level summary, implementation steps, and verification steps.
5. Iterate with follow-up prompts until the plan meets your requirements.
6. Start implementation or hand off to Copilot CLI / cloud agent.

::: tip
You can also type `/plan` followed by your task description to switch to the Plan agent in one step.
:::

## Implementation Handoff

Once the plan is finalized, you can:

- **Continue in the same session** — the Agent implements the plan directly
- **Hand off to Copilot CLI** — select "Continue in Copilot CLI" for background execution
- **Hand off to cloud** — select "Continue in Cloud" for a PR-based workflow

## Session Memory

The Plan agent automatically saves its plan to a session memory file (`/memories/session/plan.md`). Access it via `Chat: Show Memory Files`. Session memory is cleared when the conversation ends.

## Customizing Planning

- **Create a custom planning agent** — define a `.agent.md` with specific planning instructions (e.g., enforcing architectural guidelines).
- **Choose models** — use `chat.planAgent.defaultModel` for the plan agent, and `github.copilot.chat.implementAgent.model` for implementation.
- **Add extra tools** — use `github.copilot.chat.planAgent.additionalTools` to give the plan agent access to MCP servers or other tools.

## References

- [Planning with agents](https://code.visualstudio.com/docs/copilot/agents/planning)
- [Context engineering guide](https://code.visualstudio.com/docs/copilot/guides/context-engineering-guide)

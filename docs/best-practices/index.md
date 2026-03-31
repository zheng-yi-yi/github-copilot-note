# Best Practices

Proven practices for getting the most out of AI-assisted development in VS Code.

## Quick Reference

| Practice | Key Takeaway |
|---|---|
| **Pick the right tool** | Inline suggestions for flow, Ask for Q&A, Agent for multi-file work |
| **Write effective prompts** | Be specific, break down tasks, include verification criteria |
| **Provide the right context** | Reference specific files with `#`, use `#fetch` for web content |
| **Choose the right model** | Fast models for simple tasks, reasoning models for complex ones |
| **Plan first** | Use the Plan agent for complex changes spanning multiple files |
| **Review and verify** | Always review AI output, run tests, use checkpoints to rewind |
| **Manage sessions** | Start fresh for new tasks, compact context, use subagents for research |
| **Stay secure** | Review edits before accepting, protect sensitive files, sandbox terminals |

## Detailed Guides

- **[Effective Prompts](./effective-prompts)** — Write better prompts, provide the right context, choose the right model, and manage sessions.
- **[Security](./security)** — Set up a secure baseline, understand trust boundaries, and configure approvals.

## The Plan-First Workflow

For complex changes that span multiple files:

```
1. Explore   →  Ask mode or subagent to understand existing code
2. Plan      →  Plan agent to create a structured implementation plan
3. Implement →  Agent mode (or hand off to background/cloud)
4. Review    →  Checkpoints to track progress and rewind if needed
```

## Pick the Right Interaction Mode

| Mode | Best For | Examples |
|---|---|---|
| **Inline suggestions** | Staying in the flow while writing | Completions, variable names, boilerplate |
| **Ask** | Questions, brainstorming | "How does auth work in this project?" |
| **Inline chat** | Targeted, in-place edits | Refactoring a function, adding error handling |
| **Agent** | Multi-file autonomous changes | Implementing a feature end-to-end |
| **Plan** | Structured planning | Architecture design, migration strategy |
| **Smart actions** | One-step specialized tasks | Commit messages, fix errors, rename symbols |

## References

- [Best practices for AI in VS Code](https://code.visualstudio.com/docs/copilot/best-practices)
- [Context engineering guide](https://code.visualstudio.com/docs/copilot/guides/context-engineering-guide)
- [Best Practices for GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot)

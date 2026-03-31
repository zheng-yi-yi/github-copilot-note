# Custom Agents

Custom agents let you configure the AI to adopt different personas tailored to specific development roles. Each agent has its own instructions, tools, model preferences, and can hand off to other agents.

## Why Custom Agents?

- **Different tasks need different capabilities** — a planning agent needs read-only tools, an implementation agent needs editing capabilities.
- **Specialized instructions** — a security reviewer focuses on vulnerabilities, a code reviewer on quality.
- **Consistency** — switch to a specialized agent instead of re-prompting every time.

## File Locations

| Scope | Location |
|---|---|
| Workspace | `.github/agents/` |
| Workspace (Claude) | `.claude/agents/` |
| User profile | `~/.copilot/agents/` or user data |

## File Structure

Custom agents use `.agent.md` files (or `.md` in `.github/agents/`):

```markdown
---
description: Generate an implementation plan with read-only analysis
tools: ['search', 'read', 'web']
model: Claude Sonnet 4.5 (copilot)
---

You are a senior software architect. Your role is to:

1. Analyze the codebase structure and patterns
2. Create a detailed implementation plan
3. Identify potential risks and dependencies
4. Suggest a testing strategy

Do NOT modify any files. Only produce a written plan.
```

### Frontmatter Properties

| Property | Description |
|---|---|
| `description` | Brief description shown as placeholder text in chat |
| `name` | Display name (defaults to filename) |
| `tools` | List of available tools. Use `<server>/*` for all MCP server tools |
| `agents` | List of allowed subagents. `*` for all, `[]` for none |
| `model` | AI model (string or prioritized array) |
| `user-invocable` | Show in agents dropdown (default: `true`) |
| `disable-model-invocation` | Prevent invocation as subagent (default: `false`) |
| `handoffs` | Suggested next actions to transition between agents |
| `hooks` | Agent-scoped hooks (Preview) |

## Handoffs

Handoffs create guided workflows that transition between agents:

```markdown
---
description: Generate an implementation plan
tools: ['search', 'read']
handoffs:
  - label: Start Implementation
    agent: implementation
    prompt: Now implement the plan outlined above.
    send: false
  - label: Review Code
    agent: reviewer
    prompt: Review the changes for security issues.
---
```

When the chat response completes, handoff buttons appear. Selecting one switches to the target agent with the prompt pre-filled. Set `send: true` to auto-submit.

## Creating Custom Agents

1. Open Chat Customizations editor (gear icon) → **Agents** tab
2. Select **New Agent (Workspace)** or **New Agent (User)**
3. Fill in frontmatter and instructions

Or use:
- `/create-agent` — describe the persona, the agent generates it
- Extract from conversation: "make an agent for this kind of task"

## Examples

### Security Reviewer

```markdown
---
description: Review code for security vulnerabilities
tools: ['read', 'search']
---

You are a senior security engineer. Review code for:
- Injection flaws (SQL, XSS, command injection)
- Authentication and authorization issues
- Sensitive data exposure
- Missing input validation
- Insecure dependencies

Report findings with severity levels and remediation advice.
Do NOT modify any files.
```

### TDD Orchestrator

```markdown
---
name: TDD
tools: ['agent', 'edit', 'search', 'read', 'terminal']
agents: ['Red', 'Green', 'Refactor']
---

Implement features using test-driven development:
1. Use the Red agent to write failing tests
2. Use the Green agent to implement code to pass
3. Use the Refactor agent to improve code quality
```

## Sharing

- **Team** — store in `.github/agents/` and commit to version control
- **Organization** — enable `github.copilot.chat.organizationCustomAgents.enabled`
- **Copilot CLI** — enable `github.copilot.chat.cli.customAgents.enabled` for background sessions

## References

- [Custom agents in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-agents)
- [Community examples](https://github.com/github/awesome-copilot)

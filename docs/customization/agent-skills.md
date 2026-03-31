# Agent Skills

Agent Skills are folders of instructions, scripts, and resources that Copilot loads on-demand to perform specialized tasks. Skills is an [open standard](https://agentskills.io/) that works across VS Code, Copilot CLI, and Copilot coding agent.

## Skills vs. Instructions vs. Prompts

| Feature | Agent Skills | Custom Instructions | Prompt Files |
|---|---|---|---|
| Purpose | Specialized capabilities and workflows | Coding standards and guidelines | Reusable task prompts |
| Content | Instructions, scripts, examples, resources | Instructions only | Instructions only |
| Loading | On-demand when task matches | Always applied (or via globs) | Manual invocation |
| Portability | Cross-agent (VS Code, CLI, coding agent) | VS Code and GitHub.com | VS Code only |

## Creating a Skill

### File Locations

| Scope | Location |
|---|---|
| Project | `.github/skills/`, `.claude/skills/`, `.agents/skills/` |
| Personal | `~/.copilot/skills/`, `~/.claude/skills/`, `~/.agents/skills/` |

### Structure

A skill is a directory with a `SKILL.md` file and optional supporting files:

```
.github/skills/
  webapp-testing/
    SKILL.md              # Required — instructions and metadata
    test-template.js      # Supporting script
    examples/             # Example scenarios
      login-test.js
```

### SKILL.md Format

```markdown
---
name: webapp-testing
description: |
  Test web application features using Playwright.
  Use this skill when writing or running browser-based tests.
---

# Web Application Testing

## When to Use
Use this skill for testing any browser-based feature.

## Steps
1. Create a test file in `tests/` using the template: [test template](./test-template.js)
2. Use Playwright for browser automation
3. Include assertions for visual elements and API responses
4. Run tests with `npx playwright test`

## Example
See [login test example](./examples/login-test.js) for the expected pattern.
```

### Frontmatter Properties

| Property | Required | Description |
|---|---|---|
| `name` | Yes | Unique identifier (lowercase, hyphens). Must match directory name. Max 64 chars. |
| `description` | Yes | What the skill does and when to use it. Max 1024 chars. |
| `argument-hint` | No | Hint text when invoked as slash command |
| `user-invocable` | No | Whether it appears in the `/` menu (default: `true`) |
| `disable-model-invocation` | No | Whether the agent can auto-load it (default: `false`) |

### Generate with AI

- `/create-skill` — describe the skill you want, the agent generates it
- Extract from conversation: "create a skill from how we just debugged that"

## How Skills Load (Three Levels)

1. **Discovery** — Copilot reads `name` and `description` from frontmatter, matches to your task
2. **Instructions loading** — Copilot loads the `SKILL.md` body into context
3. **Resource access** — Copilot accesses supporting files only when referenced

::: tip
You can install many skills without consuming context. Only relevant content loads for each task.
:::

## Using Skills

- As slash commands: type `/webapp-testing` in chat
- Add context after the command: `/webapp-testing for the login page`
- The agent can auto-load skills based on task relevance (unless `disable-model-invocation: true`)

## Shared Skills

Community skills are available at:
- [github/awesome-copilot](https://github.com/github/awesome-copilot) — community collection
- [anthropics/skills](https://github.com/anthropics/skills) — reference skills

To use a shared skill: copy the directory to `.github/skills/`, review the `SKILL.md`, customize as needed.

## References

- [Agent Skills in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [Agent Skills specification](https://agentskills.io/)

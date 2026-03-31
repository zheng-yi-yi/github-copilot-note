# Custom Instructions

Custom instructions define coding standards and rules that automatically influence how the AI generates code. Instead of repeating context in every prompt, store your guidelines in instruction files.

## Types of Instruction Files

### Always-On Instructions

Automatically included in **every** chat request:

| File | Scope | Notes |
|---|---|---|
| `.github/copilot-instructions.md` | Workspace | Best starting point for project-wide standards |
| `AGENTS.md` | Workspace (root or subfolders) | Useful for multi-agent and monorepo setups |
| `CLAUDE.md` | Workspace / `.claude/` / `~/` | Compatibility with Claude Code and other tools |
| Organization instructions | GitHub org | Shared across repositories |

### File-Based Instructions

Applied conditionally based on file patterns or task descriptions:

| File | Scope | Notes |
|---|---|---|
| `*.instructions.md` | Workspace (`.github/instructions/`) or User (`~/.copilot/instructions/`) | Use `applyTo` glob patterns to match files |

## Creating Instructions

### Quick Start: `copilot-instructions.md`

Create `.github/copilot-instructions.md` in your workspace root:

```markdown
# Project Coding Standards

- Use TypeScript for all new files.
- Follow the Airbnb style guide.
- Use `date-fns` instead of `moment.js` (moment is deprecated).
- All API endpoints must include input validation.
- Write JSDoc comments for all public functions.
```

### File-Based: `.instructions.md`

Create files in `.github/instructions/` with YAML frontmatter:

```markdown
---
name: 'Python Standards'
description: 'Coding conventions for Python files'
applyTo: '**/*.py'
---
# Python coding standards

- Follow PEP 8 style guide.
- Use type hints for all function signatures.
- Write docstrings for public functions.
- Use 4 spaces for indentation.
```

You can organize by topic:

```
.github/instructions/
  frontend/
    react.instructions.md
    accessibility.instructions.md
  backend/
    api-design.instructions.md
  testing/
    unit-tests.instructions.md
```

### Generate with AI

- `/init` — generates workspace-wide always-on instructions
- `/create-instruction` — generates targeted file-based instructions
- You can also extract instructions from conversation: "extract an instruction from this"

## AGENTS.md

Use `AGENTS.md` when:
- You work with multiple AI agents and want a single set of instructions
- You want subfolder-level instructions in a monorepo

Enable nested `AGENTS.md` files with `chat.useNestedAgentsMdFiles` for subfolder-specific instructions.

## Instruction Priority

1. **Personal instructions** (user-level) — highest priority
2. **Repository instructions** (`.github/copilot-instructions.md` or `AGENTS.md`)
3. **Organization instructions** — lowest priority

## Tips for Writing Instructions

- Keep instructions **short and self-contained** — one statement per instruction.
- **Include reasoning** behind rules — the AI makes better edge-case decisions.
- **Show code examples** — preferred and avoided patterns.
- **Focus on non-obvious rules** — skip what linters already enforce.
- Use multiple `.instructions.md` files per topic with `applyTo` patterns.
- **Whitespace** between instructions is ignored.

## Sharing Instructions

- **Team sharing** — store in `.github/` and commit to version control
- **Organization-wide** — define at the GitHub organization level (enable `github.copilot.chat.organizationInstructions.enabled`)
- **Cross-device sync** — enable Settings Sync → Prompts and Instructions

## Troubleshooting

- Verify file location: `.github/copilot-instructions.md` must be in `.github/` at workspace root
- Check `applyTo` glob patterns match the files you're working on
- Check the **References** section in chat responses to see which instructions were used
- Right-click Chat view → **Diagnostics** to see all loaded instruction files

## References

- [Custom instructions in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [Community examples](https://github.com/github/awesome-copilot)

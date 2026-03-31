# Prompt Files

Prompt files (`.prompt.md`) encode common tasks as standalone Markdown files that you invoke as slash commands in chat. Each prompt includes task-specific context and guidelines.

Unlike custom instructions that apply automatically, prompt files are invoked **manually** with `/command-name`.

## When to Use

- Simplify prompting for common tasks (scaffold component, run tests, prepare PR)
- Override default behavior of a custom agent
- Create repeatable workflows with specific tools and context

::: tip
**Prompts vs. Agents vs. Skills:** Use prompt files for lightweight, single-task prompts. Use [custom agents](./custom-agents) for persistent personas with tool restrictions. Use [agent skills](./agent-skills) for portable, multi-file capabilities.
:::

## File Locations

| Scope | Location |
|---|---|
| Workspace | `.github/prompts/` |
| User profile | User data (specific to your VS Code profile) |

Configure additional locations with `chat.promptFilesLocations`.

## File Format

```markdown
---
description: Generate a React form component with validation
name: create-react-form
agent: agent
tools: ['edit', 'search', 'read']
---

Create a new React form component based on the user's requirements.

Follow these guidelines:
- Use React Hook Form for form state management
- Use Zod for schema validation
- Include proper TypeScript types
- Add accessible labels and error messages

Reference the project's existing form components for patterns: [forms](../../src/components/forms/)
```

### Frontmatter Properties

| Property | Required | Description |
|---|---|---|
| `description` | No | Short description of the prompt |
| `name` | No | Name used after `/` in chat (defaults to filename) |
| `argument-hint` | No | Hint text in chat input |
| `agent` | No | Agent to use: `ask`, `agent`, `plan`, or custom agent name |
| `model` | No | Language model to use |
| `tools` | No | List of available tools |

### Referencing Files and Tools

- Use **Markdown links** for workspace files: `[config](../../tsconfig.json)`
- Use `#tool:<tool-name>` for tools: `#tool:web/fetch`
- Use `${input:variableName}` for user input prompts

## Creating Prompt Files

1. Open Chat Customizations editor (gear icon) → **Prompts** tab
2. Select **New Prompt (Workspace)** or **New Prompt (User)**
3. Enter a filename and author the prompt with Markdown

Or use:
- `/create-prompt` — AI generates a prompt from your description
- `Chat: New Prompt File` from Command Palette

## Using in Chat

- Type `/` followed by the prompt name
- Add extra context after the command: `/create-react-form formName=LoginForm`
- Or run `Chat: Run Prompt` from Command Palette
- Or open the file and press the play button in the editor title

## Tool List Priority

When both a prompt file and custom agent specify tools:

1. Tools in the prompt file (highest priority)
2. Tools from the referenced custom agent
3. Default tools for the selected agent

## Tips

- Clearly describe expected input and output format
- Provide examples of expected results
- Use Markdown links to reference instruction files (avoid duplicating guidelines)
- Use the editor play button to test and iterate quickly

## References

- [Prompt files in VS Code](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [Community examples](https://github.com/github/awesome-copilot)

# Usage Guide

GitHub Copilot CLI has two user interfaces: **interactive** and **programmatic**. This guide covers both modes, along with essential tips and slash commands.

## Starting a Session

Navigate to a folder that contains code you want to work with, then run:

```bash
copilot
```

Copilot will ask you to confirm that you **trust the files** in this folder. Choose one of:

1. **Yes, proceed** — Trust for this session only.
2. **Yes, and remember this folder for future sessions** — Permanently trust this directory.
3. **No, exit** (<kbd>Esc</kbd>) — End the session.

::: warning
During a Copilot CLI session, Copilot may attempt to read, modify, and execute files in and below the current folder. Only proceed if you trust the files in this location.
:::

After trusting the directory, if you're not logged in, use the `/login` slash command to authenticate.

## Interactive Mode

In interactive mode, you have a conversation with Copilot. You can prompt it to perform tasks, give feedback, and steer the direction of work.

The interactive interface has two sub-modes:

- **Ask/Execute mode** (default) — Copilot responds and takes action on your prompts.
- **Plan mode** — Copilot builds a structured implementation plan before writing any code.

Press <kbd>Shift+Tab</kbd> to cycle between modes.

### Example Prompts

```
Change the background-color of H1 headings to dark blue
```

```
Show me the last 5 changes made to the CHANGELOG.md file.
Who changed the file, when, and give a brief summary.
```

```
Suggest improvements to content.js
```

```
Commit the changes to this repo
```

### Tool Approval

When Copilot needs to use a tool that could modify or execute files (e.g., `touch`, `chmod`, `node`, `sed`), it will ask for your approval:

1. **Yes** — Allow this command, this time only.
2. **Yes, and approve TOOL for the rest of the running session** — Allow all uses of this tool during the current session.
3. **No, and tell Copilot what to do differently** (<kbd>Esc</kbd>) — Cancel and redirect.

::: tip
When you reject a tool permission request, you can give Copilot inline feedback about the rejection so it can adapt its approach without stopping entirely.
:::

## Programmatic Mode

Pass a single prompt directly on the command line with the `-p` or `--prompt` option. The CLI completes the task and exits.

```bash
copilot -p "Show me this week's commits and summarize them" --allow-tool='shell(git)'
```

You can also pipe options from a script:

```bash
./script-outputting-options.sh | copilot
```

::: danger
If you use an automatic approval option such as `--allow-all-tools`, Copilot has the same access as you do to files on your computer, and can run any shell commands that you can run, without getting your prior approval.
:::

## Steering the Conversation

You can interact with Copilot while it's thinking:

- **Enqueue additional messages** — Send follow-up messages to steer the conversation or queue additional instructions.
- **Inline feedback on rejection** — When you reject a tool request, provide feedback so Copilot can adapt its approach.

## Use Cases

### Local Tasks

- **Code changes**: `Change the background-color of H1 headings to dark blue`
- **Code review**: `Suggest improvements to content.js`
- **Documentation**: `Rewrite the readme to make it more accessible to newcomers`
- **Git operations**: `Commit the changes to this repo` / `Revert the last commit, leaving the changes unstaged`
- **Build from scratch**: `Use create-next-app and tailwind CSS to create a next.js app...`
- **Debug issues**: `You said the app is running on localhost:3002 but I get "This site can't be reached"`

### GitHub.com Tasks

- **List PRs**: `List my open PRs` / `List all open issues assigned to me in OWNER/REPO`
- **Work on issues**: `I've been assigned this issue: https://github.com/org/repo/issues/1234. Start working on it.`
- **Create PRs**: `Add a Node script called user-info.js and create a pull request to add this file`
- **Check PRs**: `Check the changes in PR https://github.com/org/repo/pull/57575. Report any serious errors.`
- **Manage PRs**: `Merge all open PRs I've created in org/repo` / `Close PR #11`
- **Find issues**: `Use the GitHub MCP server to find good first issues from org/repo`
- **Create issues**: `Raise an improvement issue in org/repo about an unclosed file handle`
- **GitHub Actions**: `Create a workflow that runs eslint on pull requests`

## Essential Slash Commands

| Command | Description |
|---|---|
| `/login` | Authenticate with GitHub |
| `/model` | Switch the AI model |
| `/agent` | Select a custom agent |
| `/plan` | Enter plan mode |
| `/fleet` | Execute with parallelized subagents |
| `/resume` | Resume a previous session |
| `/compact` | Manually compress conversation history |
| `/context` | View token usage breakdown |
| `/usage` | View session statistics |
| `/mcp` | Manage MCP servers |
| `/mcp add` | Add a new MCP server |
| `/cwd` or `/cd` | Change working directory |
| `/add-dir` | Add a trusted directory |
| `/feedback` | Submit feedback, bug reports, or feature requests |
| `/experimental` | Access experimental features |
| `/changelog` | See latest updates |
| `/allow-all` or `/yolo` | Enable all permissions |
| `!command` | Run a shell command directly (no model call) |
| `?` | Show help |

## Tips

### Include a Specific File

Use `@` followed by the relative path to add file contents as context:

```
Explain @config/ci/ci-required-checks.yml
```

```
Fix the bug in @src/app.js
```

Matching paths are displayed as you type — use arrow keys and <kbd>Tab</kbd> to complete.

### Run Shell Commands Directly

Prepend with `!` to run shell commands without a model call:

```
!git clone https://github.com/github/copilot-cli
```

### Resume a Session

Use `--resume` or the `/resume` slash command to resume a previous session with saved context. To quickly resume the most recent local session:

```bash
copilot --continue
```

You can also bring a Copilot cloud agent session into your local environment this way.

### Toggle Reasoning Visibility

Press <kbd>Ctrl+T</kbd> to show or hide the model's reasoning process. This setting persists across sessions.

### Stop a Running Operation

Press <kbd>Esc</kbd> while Copilot is "Thinking" to stop the current task.

## Context Management

Copilot CLI automatically manages your conversation context:

- **Auto-compaction** — When approaching 95% of the token limit, history is compressed automatically in the background.
- **Manual control** — Use `/compact` to manually compress context anytime. Press <kbd>Esc</kbd> to cancel.
- **Visualize usage** — `/context` shows a detailed token usage breakdown.

## Finding More Help

- Enter `?` in the prompt box of an interactive session.
- Run `copilot help` in your terminal.
- Run `copilot help config` for configuration settings.
- Run `copilot help environment` for environment variables.
- Run `copilot help logging` for logging levels.
- Run `copilot help permissions` for tool permission details.

## References

- [Using GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
- [Best practices for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices)
- [GitHub Copilot CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)

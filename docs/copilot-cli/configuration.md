# Configuration

Copilot CLI has several configuration options that control what it can access and do on your behalf, including trusted directories, tool permissions, path access, and URL access.

Configuration is stored in `config.json`, located by default in `~/.copilot/`. You can change this location by setting the `COPILOT_HOME` environment variable.

## Trusted Directories

Trusted directories control where Copilot CLI can read, modify, and execute files.

### Choosing to Trust a Directory

When you start a Copilot CLI session, you'll be asked to confirm that you trust the files in the current directory. You can choose to trust it for:

- **This session only** — Trust is removed when the session ends.
- **This and future sessions** — The directory is permanently trusted.

::: warning
You should only launch Copilot CLI from directories that you trust. Do not use Copilot CLI in directories that may contain executable files you can't be sure you trust, or directories containing sensitive or confidential data. Typically, you should **not** launch Copilot CLI from your home directory.
:::

### Managing Trusted Directories

During a session, use `/add-dir` to trust additional directories:

```
/add-dir /path/to/directory
```

To edit the list of permanently trusted directories, modify the `trusted_folders` array in the config file:

- **macOS/Linux**: `~/.copilot/config.json`
- **Windows**: `$HOME\.copilot\config.json`

## Tool Permissions

You can control which tools Copilot CLI can use, either by responding to approval prompts or by specifying permissions via command-line flags.

### Interactive Approval

The first time Copilot needs a tool that could modify or execute files, it asks for your approval with three options:

1. **Yes** — Allow this time only.
2. **Yes, and approve TOOL for the rest of the running session** — Allow all uses during the session.
3. **No, and tell Copilot what to do differently** (<kbd>Esc</kbd>) — Cancel and redirect.

### Command-Line Approval Flags

#### Allow All Tools

```bash
copilot -p "Revert the last commit" --allow-all-tools
```

#### Deny a Specific Tool

```bash
copilot --deny-tool='shell(git push)'
```

`--deny-tool` takes precedence over `--allow-all-tools` and `--allow-tool`.

#### Allow a Specific Tool

```bash
copilot --allow-tool='shell'
```

### Tool Specification Syntax

The `--deny-tool` and `--allow-tool` options support three types of tool specifications:

#### Shell Commands

Use `shell(COMMAND)` to allow or deny a specific shell command:

```bash
# Deny all rm commands
copilot --deny-tool='shell(rm)'

# Deny git push specifically
copilot --deny-tool='shell(git push)'

# Allow all shell commands
copilot --allow-tool='shell'
```

For `git` and `gh` commands, you can specify a first-level subcommand.

#### Write Tools

Use `write` to allow or deny file modification tools (other than shell commands):

```bash
copilot --allow-tool='write'
```

#### MCP Server Tools

Use `MCP_SERVER_NAME` to allow or deny tools from an MCP server:

```bash
# Deny a specific tool from an MCP server
copilot --deny-tool='My-MCP-Server(tool_name)'

# Allow all tools from an MCP server
copilot --allow-tool='My-MCP-Server'
```

Find an MCP server's name by entering `/mcp` in the interactive interface.

### Combining Approval Options

You can combine flags for precise control:

```bash
# Allow all, but deny rm and git push
copilot --allow-all-tools --deny-tool='shell(rm)' --deny-tool='shell(git push)'

# Allow all tools from a server, but deny one specific tool
copilot --allow-tool='My-MCP-Server' --deny-tool='My-MCP-Server(tool_name)'
```

### Limiting Available Tools

Use `--available-tools` to restrict Copilot to a specific set of tools. Tools not included will not be available.

## Path Permissions

Path permissions control which directories and files Copilot can access. By default, Copilot CLI can access the current working directory, its subdirectories, and the system temp directory.

::: warning
Path detection for shell commands has limitations:
- Paths embedded in complex shell constructs may not be detected.
- Only specific environment variables are expanded (`HOME`, `TMPDIR`, `PWD`, etc.). Custom variables like `$MY_PROJECT_DIR` are not expanded.
- Symlinks are resolved for existing files, but not for files being created.
:::

### Allow All Paths

```bash
copilot --allow-all-paths
```

### Disallow Temp Directory

```bash
copilot --disallow-temp-dir
```

## URL Permissions

URL permissions control which external URLs Copilot can access. By default, all URLs require approval.

::: warning
URL detection for shell commands has limitations:
- URLs in file contents, config files, or environment variables are not detected.
- Obfuscated URLs may not be detected.
- HTTP and HTTPS are treated as different protocols and require separate approval.
:::

### Disable URL Verification

```bash
copilot --allow-all-urls
```

### Pre-approve Specific Domains

```bash
copilot --allow-url=github.com
```

### Deny Specific Domains

```bash
copilot --deny-url=example.com
```

## Allow Everything

To allow all tools, paths, and URLs at once, use `--allow-all` or its alias `--yolo`:

```bash
copilot --allow-all
```

This combines:
- `--allow-all-tools` (skip tool approval)
- `--allow-all-paths` (disable path verification)
- `--allow-all-urls` (disable URL verification)

::: tip
During an interactive session, you can also enable all permissions with the `/allow-all` or `/yolo` slash commands.
:::

## Configuration File

All settings can be adjusted in the `config.json` file:

- **Default location**: `~/.copilot/config.json`
- **Custom location**: Set the `COPILOT_HOME` environment variable

Run `copilot help config` for details on available configuration settings.

## References

- [Configure GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli)
- [GitHub Copilot CLI configuration directory](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference)

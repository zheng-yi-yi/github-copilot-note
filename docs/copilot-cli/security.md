# Security

When you use Copilot CLI, Copilot can perform tasks on your behalf, such as executing or modifying files, or running shell commands. Security is a critical consideration — always review suggested commands carefully.

## Trusted Directories

Trusted directories control where Copilot CLI can read, modify, and execute files.

### Best Practices

- **Only launch from trusted directories** — Do not use Copilot CLI in directories containing executable files you can't fully trust.
- **Avoid sensitive data directories** — Launching from directories with sensitive or confidential data could inadvertently expose files to risk.
- **Don't launch from your home directory** — Your home directory is too broad; scope to specific project directories.
- **Be cautious with permanent trust** — Only permanently trust directories you're sure will always be safe.

::: warning
Scoping of permissions is heuristic and GitHub does not guarantee that all files outside trusted directories will be protected.
:::

## Tool Approval

Copilot asks for approval before using tools that could modify or execute files. Understanding the three approval options is important:

| Option | What It Does | Security Implication |
|---|---|---|
| **Yes** | Allows this specific command once | Safest — you approve each use |
| **Yes, and approve for session** | Allows all uses of this tool during the session | The tool can be used with **any** arguments (e.g., approving `rm` allows `rm -rf ./*`) |
| **No** (<kbd>Esc</kbd>) | Cancels the command | You redirect Copilot to try a different approach |

### Automatic Approval Risks

The automatic approval options (`--allow-all-tools`, `--allow-tool`, `--allow-all`, `--yolo`) streamline workflows but increase risk:

- Copilot can execute commands **without giving you the opportunity to review** them.
- This could result in **unintended actions**, data loss, or corruption.
- When using `--allow-all-tools`, Copilot has **the same access as you** to files on your computer.

::: danger
Only use automatic approval options when you understand the risks and have appropriate safeguards in place. In production environments, consider running in a restricted environment.
:::

## Risk Mitigation

You can mitigate risks by running Copilot CLI in a **restricted environment**:

- **Virtual machine** — Contains any damage to a disposable environment.
- **Container** — Limits file system and network access.
- **Dedicated system** — Uses tightly controlled permissions and network access.

This confines any potential damage when allowing Copilot to execute unreviewed commands.

## Path and URL Permissions

- **Path permissions** control which directories and files Copilot can access. By default, only the current working directory, subdirectories, and the system temp directory are accessible.
- **URL permissions** control external URL access. By default, all URLs require approval.

Both have detection limitations for shell commands — see [Configuration](./configuration) for details.

## MCP Server Policy Limitations

Copilot CLI currently **cannot** enforce these organization-level MCP server policies:

- **MCP servers in Copilot** — Controls whether MCP servers can be used at all.
- **MCP Registry URL** — Controls which MCP registry Copilot allows servers from.

Be aware of this limitation if your organization relies on these policies.

## Security Checklist

- [ ] Always launch Copilot CLI from the specific project directory, not a broad directory like `~`.
- [ ] Review tool approval requests carefully before accepting.
- [ ] Avoid using `--allow-all-tools` or `--yolo` unless in a contained environment.
- [ ] Use `--deny-tool` to block dangerous commands (e.g., `shell(rm)`, `shell(git push)`).
- [ ] Use `--available-tools` to restrict Copilot to a specific set of tools.
- [ ] Consider running in a container or VM for automated/unattended workflows.
- [ ] Be cautious with MCP server tools — verify which servers are configured.
- [ ] Regularly review your `config.json` for trusted directories and allowed tools.

## References

- [Security considerations](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli#security-considerations)
- [Configure GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli)
- [Responsible use of GitHub Copilot CLI](https://docs.github.com/en/enterprise-cloud@latest/copilot/responsible-use/copilot-cli)

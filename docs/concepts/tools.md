# Tools

Tools are the mechanism that lets the model act on your development environment. Without tools, a language model can only generate text. With tools, an agent can read files, write code, run terminal commands, search your codebase, and connect to external services.

## Types of Tools

| Type | Description | Setup |
|---|---|---|
| **Built-in tools** | Ship with VS Code — reading/writing files, terminal, codebase search, editor navigation | Available immediately |
| **MCP tools** | Provided by [MCP servers](/customization/mcp-servers) — databases, APIs, external services | Configure in `mcp.json` |
| **Extension tools** | Contributed by VS Code extensions via the Language Model Tools API | Install the extension |

## How Tools Work

During the **agent loop**, the model examines available tools and decides which to call autonomously:

1. You give the agent a high-level task.
2. The model selects the relevant tool(s) for each step.
3. Each tool call produces output that becomes part of the context for the next iteration.
4. The loop continues until the task is complete.

You can also explicitly reference tools with `#tool:<tool-name>` in your prompts.

## Controlling Available Tools

Use the **Configure Tools** button in the chat input to enable/disable individual tools. 

![image-20260331143530204](images/tools/image-20260331143530204.png)

Limiting tools helps in several ways:

- **Preserve context** — fewer tool calls means less context consumed
- **Get more relevant results** — the agent focuses on the most appropriate tools
- **Improve performance** — smaller tool set reduces model decision space

You can also control tools through [prompt files](/customization/prompt-files) and [custom agents](/customization/custom-agents), which define a fixed set of tools for specific tasks.

## Tool Approval and Trust

Tools can modify files, your environment, or access external services. 

VS Code provides security controls:

- **Approval prompts** — tools with side effects show a confirmation dialog before running
- **URL approval** — two-step process for verifying web requests and response content
- **Permission levels** — control agent autonomy from manual approval to fully autonomous:
  - **Default Approvals** — uses your configured approval settings
  - **Bypass Approvals** — auto-approves all tool calls
  - **Autopilot** — auto-approves everything and drives the agent to completion

## References

- [Tools concepts](https://code.visualstudio.com/docs/copilot/concepts/tools)
- [Use tools with agents](https://code.visualstudio.com/docs/copilot/agents/agent-tools)
- [Add and manage MCP servers](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)

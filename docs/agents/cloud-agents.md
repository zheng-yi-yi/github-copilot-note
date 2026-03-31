# Cloud Agents

Cloud agents run on remote infrastructure and integrate with GitHub repositories for team collaboration through pull requests. Unlike local and background agents, they work asynchronously and can handle tasks ranging from simple to complex.

## Available Cloud Agents

### GitHub Copilot Coding Agent

The primary cloud agent included with your Copilot subscription:

- Large-scale refactoring across your repository
- Complete feature implementation from high-level requirements
- Automatic pull request generation with detailed descriptions
- Code review integration and feedback addressing

### Third-Party Cloud Agents

VS Code also supports third-party cloud agents like **Claude coding agent** and **Codex coding agent**. Enable support in your Copilot account settings — no separate extension installation required.

## When to Use Cloud Agents

- **Team collaboration** — results come as PRs, making them easy to review
- **Well-defined tasks** — all necessary context is available
- **Asynchronous work** — you don't need to watch every step
- **Large-scale changes** — cross-repository refactoring

## Starting a Cloud Agent Session

### Create a New Session

1. In the Chat view, select **New Chat** → choose **Cloud** from Session Target
2. Choose the cloud agent provider, optionally select a custom agent and model
3. Enter your prompt:

```
Refactor the authentication module to implement OAuth2 and JWT.
Optimize database queries for user sessions.
```

4. Monitor progress in the Chat view.

### Hand Off from Local/Background Agent

1. Plan with a local agent (e.g., Plan agent) until requirements are clear.
2. Select **Cloud** from the Session Target dropdown.
3. Or select **Continue in Cloud** from the Plan agent's "Start Implementation" dropdown.
4. Full chat context carries over.

From a background agent session, use `/delegate` to hand off to cloud.

## Limitations

Cloud agents can't directly access:
- VS Code built-in tools and runtime context (failed tests, text selections)
- They are limited to MCP servers and models configured in the cloud service

## Managing Sessions

- **Filter sessions** — select **Cloud Agents** from the filter in the Chat view
- **Open as editor** — right-click a session → "Open as Editor"
- Sessions created on GitHub.com automatically appear in VS Code

## References

- [Cloud agents](https://code.visualstudio.com/docs/copilot/agents/cloud-agents)
- [Third-party agents](https://code.visualstudio.com/docs/copilot/agents/third-party-agents)
- [GitHub Copilot coding agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/manage-agents)

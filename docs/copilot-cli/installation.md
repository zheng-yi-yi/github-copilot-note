# Installation

This guide covers how to install, update, and authenticate GitHub Copilot CLI on your system.

## Prerequisites

- An active **GitHub Copilot subscription** (Free, Pro, Pro+, Business, or Enterprise)
- **Windows**: PowerShell v6 or higher
- **npm method**: Node.js 22 or later

::: tip
If you have access to GitHub Copilot via an organization or enterprise, your admin must enable the Copilot CLI policy in the organization settings.
:::

## Installing or Updating

Choose the installation method that works best for your platform:

### npm (All Platforms)

```bash
npm install -g @github/copilot
```

::: warning
If you have `ignore-scripts=true` in your `~/.npmrc` file, use:
```bash
npm_config_ignore_scripts=false npm install -g @github/copilot
```
:::

To install the prerelease version:

```bash
npm install -g @github/copilot@prerelease
```

### WinGet (Windows)

```powershell
winget install GitHub.Copilot
```

To install the prerelease version:

```powershell
winget install GitHub.Copilot.Prerelease
```

### Homebrew (macOS and Linux)

```bash
brew install copilot-cli
```

To install the prerelease version:

```bash
brew install copilot-cli@prerelease
```

### Install Script (macOS and Linux)

```bash
curl -fsSL https://gh.io/copilot-install | bash
```

Or:

```bash
wget -qO- https://gh.io/copilot-install | bash
```

To run as root and install to `/usr/local/bin`, use `| sudo bash`.

To install a specific version to a custom directory:

```bash
curl -fsSL https://gh.io/copilot-install | VERSION="v0.0.369" PREFIX="$HOME/custom" bash
```

### Direct Download

You can download the executables directly from [the copilot-cli repository releases](https://github.com/github/copilot-cli/releases/). Download the executable for your platform, unpack it, and run.

## Authentication

On first launch, if you're not currently logged in to GitHub, you'll be prompted to use the `/login` slash command. Enter this command and follow the on-screen instructions to authenticate.

### Using a Personal Access Token

You can also authenticate using a fine-grained personal access token:

1. Visit [Fine-grained personal access tokens](https://github.com/settings/personal-access-tokens/new).
2. Under **Permissions**, click **Add permissions** and select **Copilot Requests**.
3. Click **Generate token**.
4. Export the token in your terminal using one of these environment variables (in order of precedence):
   - `COPILOT_GITHUB_TOKEN`
   - `GH_TOKEN`
   - `GITHUB_TOKEN`

```bash
export COPILOT_GITHUB_TOKEN=your_token_here
```

## Verifying the Installation

After installation, verify that Copilot CLI is working:

```bash
copilot --version
```

Then start an interactive session:

```bash
copilot
```

## Next Steps

- [Usage Guide](./usage) — Learn how to use interactive and programmatic modes.
- [Configuration](./configuration) — Configure trusted directories or tool permissions.

## References

- [Installing GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli)
- [Authenticating GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli)

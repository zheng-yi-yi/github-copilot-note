# 安装指南

本指南介绍如何在你的系统上安装、更新 GitHub Copilot CLI，以及完成身份认证。

## 前置条件

- 有效的 **GitHub Copilot 订阅**（Free、Pro、Pro+、Business 或 Enterprise）
- **Windows**：PowerShell v6 或更高版本
- **npm 方式**：Node.js 22 或更高版本

::: tip
如果你通过组织或企业获取 GitHub Copilot，管理员必须在组织设置中启用 Copilot CLI 策略。
:::

## 安装或更新

选择适合你平台的安装方式：

### npm（全平台）

```bash
npm install -g @github/copilot
```

::: warning
如果你的 `~/.npmrc` 文件中有 `ignore-scripts=true`，请使用：
```bash
npm_config_ignore_scripts=false npm install -g @github/copilot
```
:::

安装预发布版本：

```bash
npm install -g @github/copilot@prerelease
```

### WinGet（Windows）

```powershell
winget install GitHub.Copilot
```

安装预发布版本：

```powershell
winget install GitHub.Copilot.Prerelease
```

### Homebrew（macOS 和 Linux）

```bash
brew install copilot-cli
```

安装预发布版本：

```bash
brew install copilot-cli@prerelease
```

### 安装脚本（macOS 和 Linux）

```bash
curl -fsSL https://gh.io/copilot-install | bash
```

或：

```bash
wget -qO- https://gh.io/copilot-install | bash
```

以 root 身份运行并安装到 `/usr/local/bin`，使用 `| sudo bash`。

安装特定版本到自定义目录：

```bash
curl -fsSL https://gh.io/copilot-install | VERSION="v0.0.369" PREFIX="$HOME/custom" bash
```

### 直接下载

你可以从 [copilot-cli 仓库的发布页面](https://github.com/github/copilot-cli/releases/) 直接下载可执行文件。下载对应平台的文件，解压后即可运行。

## 身份认证

首次启动时，如果你尚未登录 GitHub，系统会提示你使用 `/login` 斜杠命令。输入该命令并按照屏幕上的指示完成身份认证。

### 使用个人访问令牌

你也可以使用细粒度个人访问令牌进行认证：

1. 访问[细粒度个人访问令牌页面](https://github.com/settings/personal-access-tokens/new)。
2. 在 **Permissions** 下，点击 **Add permissions**，选择 **Copilot Requests**。
3. 点击 **Generate token**。
4. 在终端中导出令牌，使用以下环境变量之一（按优先级排序）：
   - `COPILOT_GITHUB_TOKEN`
   - `GH_TOKEN`
   - `GITHUB_TOKEN`

```bash
export COPILOT_GITHUB_TOKEN=your_token_here
```

## 验证安装

安装完成后，验证 Copilot CLI 是否正常工作：

```bash
copilot --version
```

然后启动交互式会话：

```bash
copilot
```

## 下一步

- [使用指南](./usage) — 学习交互模式和编程模式的使用方法。
- [配置指南](./configuration) — 配置信任目录和工具权限。

## 参考资料

- [安装 GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli)
- [认证 GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli)

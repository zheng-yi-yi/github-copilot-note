# 云端智能体 (Cloud Agents)

云端智能体在远程基础设施上运行，并与 GitHub 仓库集成，通过拉取请求实现团队协作。与本地和后台智能体不同，它们异步工作，可以处理从简单到复杂的各种任务。

## 可用的云端智能体

### GitHub Copilot 编码智能体

你的 Copilot 订阅所包含的主要云端智能体：

- 跨仓库的大规模重构
- 从高级需求完成完整的功能实现
- 自动生成带有详细描述的拉取请求
- 集成代码审查和反馈处理

### 第三方云端智能体

VS Code 还支持第三方云端智能体，如 **Claude 编码智能体** 和 **Codex 编码智能体**。在你的 Copilot 账户设置中启用支持 — 无需单独安装扩展。

## 何时使用云端智能体

- **团队协作** — 结果以 PR 形式呈现，便于审查
- **定义明确的任务** — 所有必要的上下文都可用
- **异步工作** — 你不需要看每一步
- **大规模更改** — 跨仓库的重构

## 启动云端智能体会话

### 创建新会话

1. 在聊天视图中，选择 **New Chat** → 从 Session Target 中选择 **Cloud**
2. 选择云端智能体提供商，可选地选择自定义智能体和模型
3. 输入你的提示词：

```
重构身份验证模块以实现 OAuth2 和 JWT。
优化用户会话的数据库查询。
```

4. 在聊天视图中监控进度。

### 从本地/后台智能体交接

1. 使用本地智能体（如 Plan 智能体）进行规划，直到需求明确。
2. 从 Session Target 下拉列表中选择 **Cloud**。
3. 或者从 Plan 智能体的 "Start Implementation" 下拉列表中选择 **Continue in Cloud**。
4. 完整的聊天上下文将被保留。

从后台智能体会话中，使用 `/delegate` 交接给云端。

## 限制

云端智能体无法直接访问：
- VS Code 内置工具和运行时上下文（失败的测试、文本选区）
- 它们仅限于在云端服务中配置的 MCP 服务器和模型

## 管理会话

- **筛选会话** — 在聊天视图的筛选器中选择 **Cloud Agents**
- **作为编辑器打开** — 右键点击会话 → "Open as Editor"
- 在 GitHub.com 上创建的会话会自动出现在 VS Code 中

## 参考资料

- [云端智能体](https://code.visualstudio.com/docs/copilot/agents/cloud-agents)
- [第三方智能体](https://code.visualstudio.com/docs/copilot/agents/third-party-agents)
- [GitHub Copilot 编码智能体](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/manage-agents)

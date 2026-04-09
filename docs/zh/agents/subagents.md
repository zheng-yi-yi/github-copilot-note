# 子智能体

## 什么是 Subagent？

GitHub Copilot 在 VS Code 中引入了**多智能体（Multi-Agent）**开发模式，让 Copilot 不再只是“单个聊天助手”，而是能像真实开发团队一样**分工协作**。

其中，**Subagent** 值得就是上下文隔离的独立 Agent，执行专注的工作（调研、分析、审查），运行在**独立上下文窗口**中，只接收必要子任务信息，最后将结果报告给主智能体，主智能体据此继续工作，避免主上下文被中间思考过程、大量工具调用或研究细节污染。

在 Copilot Chat 中以**可折叠工具调用**形式显示（默认收起，点击展开可查看完整提示词、所有工具调用、返回结果）。

## 核心价值

这样做的好处在于，多个独立子任务可**同时运行**，大幅缩短等待时间。解决了上下文窗口爆炸和“思考污染”问题。

支持复杂工作流：研究 → 规划 → 实现 → 多视角审查，提升了开发效率。

## 子智能体如何工作？

从默认配置中我们可以看到，内置 Agent 是有 `runSubagent` 权限的：

![image-20260407111619791](images/subagents/image-20260407111619791.png)

当 Agent 收到复杂任务时，主 Agent 会识别适合隔离的子任务，然后启动子 Agent，传入最小必要上下文。此时，子 Agent会在自己的上下文窗口中自主工作（可使用工具、搜索代码库、调用 Web 等）。

最后，子 Agent 会返回调研总结，主 Agent 会继续执行任务。

::: info 备注

子智能体**默认不继承**主智能体的 Memory（但可通过提示显式要求读取）。

在聊天中以**可折叠工具调用**形式显示（点击展开可看完整提示词、工具调用、结果）。

:::

## 使用场景

::: details 案例1：隔离研究 + 推荐方案
**场景**：新功能调研，避免污染主上下文。

**提示词**：
```
对 Node.js OAuth 2.0 实现模式进行隔离研究，
使用子智能体对比 passport.js、Auth0 和自定义实现三种方案。
与当前代码库对比，输出推荐方案及优缺点表格。
```

**实际流程**：
- 主智能体自动启动 1 个 Subagent。
- Subagent 独立研究、分析代码、调用 `search/codebase` 等工具。
- 返回简洁表格 → 主智能体直接用于后续实现。
- 聊天中出现可折叠卡片，点击可查看 Subagent 完整思考过程。
:::

::: details 案例2：并行多维度代码分析
**场景**：重构前全面扫描。

**提示词**：

```
对当前代码库进行重构机会分析，使用子智能体并行执行以下任务：
1. 查找重复代码模式（duplication）
2. 识别未使用导出和死代码
3. 检查错误处理一致性
4. 扫描安全漏洞（OWASP Top 10）

最终汇总为带优先级的行动计划 Markdown。
```

**效果**：4 个子智能体**同时运行**，等待时间大幅缩短。主智能体收到完整计划后可直接执行或继续委托实现。
:::

::: details 案例3：多方案对比决策
**场景**：API 缓存方案犹豫不决。

**提示词**：
```
我需要为这个 API 实现缓存。使用三个子智能体并行研究以下方案：
1. Redis 分布式缓存
2. 内存 LRU 缓存
3. 分层混合缓存（内存 + Redis）

对比性能、成本、可维护性，与项目当前技术栈匹配度，最后推荐最佳方案并给出实施步骤。
```

**实战收益**：避免主智能体在单一上下文里反复权衡，输出更客观。
:::


## 嵌套子智能体

默认情况下，子智能体不能再生成子智能体。通过 [`chat.subagents.allowInvocationsFromSubagents`](vscode://settings/chat.subagents.allowInvocationsFromSubagents) 启用（最大深度：5）。

## 参考资料

- 官方文档：[Subagents in Visual Studio Code](https://code.visualstudio.com/docs/copilot/agents/subagents)
- 官方概念：[Agents concepts - Subagents](https://code.visualstudio.com/docs/copilot/concepts/agents)
- 2026 更新博客：[Parallel Subagents & Agentic Improvements](https://code.visualstudio.com/blogs/2026/01/parallel-subagents)
- 社区模板：[github/awesome-copilot](https://github.com/github/awesome-copilot)

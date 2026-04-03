# 规划

Plan 智能体使你能够在编写代码之前创建详细的实施方案。

规划优先可以确保满足所有需求，并防止 AI 解决错误的问题。

## 规划优先的工作流

![image-20260331151321006](images/planning/image-20260331151321006.png)

## 如何使用 Plan 智能体

Github Copilot 中内置了一个 Plan Agent，用于生成计划、将任务分解为子任务、协调工作流，最终给出一份可执行的规划。

打开聊天视图 (<kbd>Ctrl+Alt+I</kbd>) 后，我们先选择  **Plan**，然后输入我们的需求。

> 也可以使用 `/plan` 指令，然后输入我们的需求，这样也会自动跳转到 Plan 模式。

比如：

![image-20260403134028008](images/planning/image-20260403134028008.png)

此时，Agent 会先去 Review 当前项目的背景和实现，然后可能会问你一些澄清问题，如实回答。

跑完之后会给你一份完整规划方案，包括高级概述、实施步骤和验证步骤等。

![image-20260403134454351](images/planning/image-20260403134454351.png)

最后点击 `Start Implementation` 去运行就行。

> 方案最终确定后，我们也可以点击 `Start Implementation` 旁边的按钮，展开另外两个选项，即交给 Copilot CLI 或者云端 Agent 去做：
>
> ![image-20260403134549239](images/planning/image-20260403134549239.png)

::: tip 提示
在聊天中输入 `/plan` 加任务描述来一步切换到 Plan 模式。
:::

## 会话记忆

如果你观察仔细，你可以看到在上面对话中，Plan Agent 自动将当前方案保存到了一个会话记忆文件里  (`/memories/session/plan.md`)。

我们可以打开命令面板 `Ctrl + Shift + P`，选择 `Chat: Show Memory Files` 去查看当前记忆文件列表：

![image-20260403134828367](images/planning/image-20260403134828367.png)

> 备注：记忆文件独立作用于每个对话。

## 自定义规划

我们可以为 Plan 模式制定默认模型，包括：

- 规划模型：使用 [chat.planAgent.defaultModel](vscode://settings/chat.planAgent.defaultModel) 设置。
- 实施模型：使用 [github.copilot.chat.implementAgent.model](vscode://settings/github.copilot.chat.implementAgent.model) 设置。

通过 [github.copilot.chat.planAgent.additionalTools](vscode://settings/github.copilot.chat.planAgent.additionalTools) 设置，可以为Plan 模式增加 MCP 服务器或其他工具的访问权限。

进一步的，我们还可以创建一个 [自定义规划智能体](../customization/custom-agents.md)，加入特定的项目架构规范指令等。


## 参考资料

- [使用智能体进行规划](https://code.visualstudio.com/docs/copilot/agents/planning)
- [上下文工程指南](https://code.visualstudio.com/docs/copilot/guides/context-engineering-guide)

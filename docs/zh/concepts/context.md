# 上下文 (Context)

上下文是模型在生成响应时可以看到的所有内容。模型只能针对它接收到的信息进行推理 —— 上下文窗口之外的一切对它是不可见的。提供相关的上下文是提高 AI 响应质量最有效的方法之一。

## 为什么上下文很重要

包含相关文件、清晰指令和专注历史的提示词比没有上下文的模糊提示词能产生更好的结果。模型没有之前会话的记忆，也无法访问任何未提供给它的文件。

## VS Code 如何组装上下文

当你发送消息时，VS Code 会从多个来源构建提示词：

```
┌──────────────────────────────────┐
│ 系统指令 (System instructions)     │  内置的智能体行为指南
│ 自定义项 (Customizations)          │  自定义智能体、技能、指令
│ 用户消息 (User message)            │  你当前的提示词
│ 对话历史 (Conversation history)     │  到目前为止交换的消息
│ 隐式上下文 (Implicit context)       │  当前激活的文件、选区、错误、git 状态
│ 显式引用 (Explicit references)      │  你通过 # 引用的文件、URL、符号
│ 工具输出 (Tool outputs)             │  来自文件读取、终端、搜索的结果
└──────────────────────────────────┘
          ↓
    语言模型 (LLM)
```

## 上下文类型

### 隐式上下文

VS Code 会自动提供：

- 当前编辑器中选中的文本
- 激活编辑器的文件名
- 在 **Ask** 模式下，激活的文件会自动包含在内
- 在 **Agent** 模式下，智能体决定激活的文件是否相关

### 显式引用

使用 `#` 提及来添加特定的上下文：

- `#file:path/to/file.ts` — 包含特定文件
- `#folder:src/` — 包含文件夹
- `#symbol:MyClass` — 包含符号定义
- `#fetch <url>` — 获取并包含网络内容

### 工作区索引

VS Code 维护着一个用于搜索代码库的索引：

- **远程索引** — 针对 GitHub 托管的仓库，支持快速跨仓库搜索
- **本地索引** — 存储在本地机器上的高级语义索引
- **基础索引** — 针对大型代码库的简单回退算法

## 高效使用上下文

- **为新任务开启新会话。** 不要在一个对话中混用不相关的任务。
- **精挑细选。** 添加整个代码库并不总是有帮助。请引用特定的文件。
- **使用自定义指令设置持久规则。** 它们会包含在每次请求中，因此在对话被总结时不会丢失。
- **使用 `/compact`** 选择性地压缩上下文，仅保留相关信息。

### 示例

**模糊提示词（上下文贫乏）：**
```
身份验证是如何工作的？
```
→ 得到关于身份验证模式的通用回答。

**带有显式上下文的提示词：**
```
此项目的身份验证是如何工作的？
```
→ 模型读取你实际的身份验证文件并解释你的实现。

**带有网络上下文的提示词：**
```
将 auth 模块迁移到最新的 passport.js API #fetch https://www.passportjs.org/concepts/authentication/
```
→ 使用最新的网络文档来指导迁移。

## 参考资料

- [上下文概念](https://code.visualstudio.com/docs/copilot/concepts/context)
- [在聊天中添加上下文](https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context)
- [工作区索引](https://code.visualstudio.com/docs/copilot/reference/workspace-context)
- [上下文工程指南](https://code.visualstudio.com/docs/copilot/guides/context-engineering-guide)

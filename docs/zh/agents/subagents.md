# 子智能体 (Subagents)

子智能体是独立的 AI 智能体，执行专注的工作 — 调研、分析、审查 — 然后将结果报告给主智能体。它们提供 **上下文隔离**，在将复杂子任务委派出去的同时保持主对话的整洁。

## 子智能体如何工作

```
主智能体
  ├─→ 子智能体 A（调研）    → 返回摘要
  ├─→ 子智能体 B（分析）    → 返回发现
  └── 合并 A 和 B 的结果继续
```

1. 主智能体识别出任务中需要隔离处理的部分。
2. 启动一个子智能体，仅传递相关的子任务。
3. 子智能体在自己的上下文窗口中自主工作。
4. 子智能体向主智能体返回摘要。
5. 主智能体整合结果并继续。

## 使用场景

- **实施前调研** — 在进行更改之前将调查工作委派给子智能体
- **并行代码分析** — 同时分析多个文件或模块
- **探索多种方案** — 每个子智能体探索不同的方法
- **带有专门焦点的代码审查** — 安全性、性能、正确性审查并行进行

## 调用子智能体

子智能体通常是 **智能体发起的** — 由主智能体决定何时使用。确保 `runSubagent` 工具已启用。

你可以在提示词中暗示使用子智能体：

```
对本项目使用的身份验证模式进行隔离调研，
然后根据调研结果实施更改。
```

### 在提示词文件中

在提示词文件中包含 `agent` 工具：

```markdown
---
name: document-feature
tools: ['agent', 'read', 'search', 'edit']
---
运行子智能体调研功能详情，
然后更新 docs/ 文件夹中的文档。
```

## 自定义智能体作为子智能体

自定义智能体可以作为子智能体使用，拥有自己的模型、工具和指令：

```
运行 Research 智能体作为子智能体来调研最佳身份验证方法。
```

### 控制调用方式

两个 Frontmatter 属性控制智能体的调用方式：

| 属性 | 默认值 | 效果 |
|---|---|---|
| `user-invocable` | `true` | 控制在智能体下拉列表中的可见性 |
| `disable-model-invocation` | `false` | 阻止作为子智能体被调用 |

创建仅作为子智能体的智能体（从下拉列表中隐藏）：

```markdown
---
name: internal-helper
user-invocable: false
---
此智能体只能作为子智能体被调用。
```

### 限制可用的子智能体

使用 `agents` 属性来控制可用的子智能体：

```markdown
---
name: TDD
tools: ['agent']
agents: ['Red', 'Green', 'Refactor']
---
1. 使用 Red 智能体编写失败测试
2. 使用 Green 智能体实现代码通过测试
3. 使用 Refactor 智能体改进代码质量
```

## 编排模式

### 协调器与工作者模式

一个协调器智能体管理任务并委派给专门的工作者：

```markdown
---
name: Feature Builder
tools: ['agent', 'edit', 'search', 'read']
agents: ['Planner', 'Implementer', 'Reviewer']
---
1. 使用 Planner 智能体分解功能
2. 使用 Implementer 智能体编写代码
3. 使用 Reviewer 智能体检查实现
```

### 多角度代码审查

将每个审查角度作为并行子智能体运行，以获得独立、无偏见的发现：

```markdown
---
name: Thorough Reviewer
tools: ['agent', 'read', 'search']
---
并行运行以下子智能体：
- 正确性审查：逻辑错误、边界情况
- 安全性审查：注入风险、数据泄露
- 架构审查：设计一致性

将发现综合为按优先级排序的总结。
```

## 嵌套子智能体

默认情况下，子智能体不能再生成子智能体。通过 `chat.subagents.allowInvocationsFromSubagents` 启用（最大深度：5）。

## 参考资料

- [VS Code 中的子智能体](https://code.visualstudio.com/docs/copilot/agents/subagents)
- [自定义智能体](https://code.visualstudio.com/docs/copilot/customization/custom-agents)

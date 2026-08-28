# 阶段 A/B/C 验收矩阵

状态定义：`verified` 表示已有可复现证据；`not_started` 表示仓库工作尚未完成；`external_pending` 表示必须由真实参与者、账号、设备或机构完成，仓库材料不能替代结果。

## 阶段 A：概念验证

| 要求 | 状态 | 证据 |
|---|---|---|
| 视觉语言、内容模板、三个代表性计策 | verified | 三个内容样稿、响应式原型、Hallmark 记录 |
| “故事—哲学—训练”闭环 | verified | 组件测试与真实浏览器流程 |
| 学生、大众、职场真实用户测试 | external_pending | `docs/operations/user-testing-kit.md`，待真实记录 |

## 阶段 B：MVP 发布

| 要求 | 状态 | 证据 |
|---|---|---|
| 三十六计知识底座与 36 个展厅 | not_started | 待内容完整性测试 |
| 六个标杆漫画、其余插画故事 | not_started | 待 36×8 分镜与卷级标杆检查 |
| 六卷馆、图谱、搜索、导览、训练 | not_started | 待产品流程测试 |
| 18–30 个审核预设训练案例 | not_started | 目标 24 个 |
| 收藏、进度、复盘、基础后台 | not_started | 待领域与组件测试 |
| 桌面、手机、Kiosk | not_started | 待生产浏览器与专项测试 |

## 阶段 C：内容与渠道扩展

| 要求 | 状态 | 证据 |
|---|---|---|
| 全部三十六计完整漫画 | not_started | 目标每计八格结构化分镜 |
| 配音、动画、课堂任务、教师控制、报告 | not_started | 待 Web Speech、课堂与报告测试 |
| 移动 App | not_started | 仓库目标为可安装 PWA；应用商店发布需账号 |
| 正式展馆版本 | not_started | 仓库目标为 Kiosk 模式；硬件连续运行需真实设备 |
| 学校、出版社、博物馆、文化机构合作 | external_pending | `docs/operations/partnership-kit.md`，待真实机构确认 |

## 外部证据规则

以下字段不得用示例值转成 `verified`：参与者数量、完成率、理解率、机构名称、合作意向、App Store/应用市场状态、展馆硬件连续运行时长。只有原始测试记录、平台回执或双方确认文件可改变状态。

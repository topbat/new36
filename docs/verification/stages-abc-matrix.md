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
| 三十六计知识底座与 36 个展厅 | verified | `catalog.test.ts`：36 条、六卷、证据与关系完整性 |
| 六个标杆漫画、其余插画故事 | verified | 每卷一个 flagship；36×8 结构化漫画分镜（代码内容，不等同最终手绘成品） |
| 六卷馆、图谱、搜索、导览、训练 | verified | 组件流程、检索导览安全测试、生产浏览器验收 |
| 18–30 个审核预设训练案例 | verified | 24 个内部预览案例，三类受众各 8 个，案例契约测试 |
| 收藏、进度、复盘、基础后台 | verified | 版本化本地进度、匿名报告、分权状态机与追加式审计测试 |
| 桌面、手机、Kiosk | verified | 响应式 Web、可安装 PWA 与 `?mode=kiosk` 软件模式；真实硬件另列外部项 |

## 阶段 C：内容与渠道扩展

| 要求 | 状态 | 证据 |
|---|---|---|
| 全部三十六计完整漫画 | verified | 每计八格脚本及字幕；成品画稿属后续视觉制作，不伪称已完成 |
| 配音、动画、课堂任务、教师控制、报告 | verified | 按钮触发 Web Speech、CSS 动效与 reduced-motion、课堂卡、匿名 JSON 报告 |
| 移动 App 软件交付 | verified | 可安装离线 PWA；`mobile-release-checklist.md` |
| 应用商店发布 | external_pending | 需要开发者账号、原生包、真实设备与平台审核回执 |
| 展馆软件模式 | verified | 3 分钟复位、同源续看二维码、隐藏管理入口、Kiosk 手册 |
| 正式展馆硬件连续运行 | external_pending | `kiosk-runbook.md`，待真实硬件记录 |
| 学校、出版社、博物馆、文化机构合作 | external_pending | `docs/operations/partnership-kit.md`，待真实机构确认 |

## 外部证据规则

以下字段不得用示例值转成 `verified`：参与者数量、完成率、理解率、机构名称、合作意向、App Store/应用市场状态、展馆硬件连续运行时长。只有原始测试记录、平台回执或双方确认文件可改变状态。

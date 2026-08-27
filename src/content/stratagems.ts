export type SourceType =
  | "史料可考"
  | "传本文本"
  | "文学演绎"
  | "传统说法"
  | "编辑解读"
  | "现代虚构";

export type InterpretationLayer = {
  label: "表层" | "机制" | "条件" | "边界" | "反制";
  text: string;
};

export type ComicPanel = {
  index: string;
  scene: string;
  caption: string;
  anchor: string;
};

export type ScenarioOption = {
  id: string;
  title: string;
  action: string;
  consequence: string;
  recommended?: boolean;
};

export type Stratagem = {
  id: "02" | "03" | "36";
  slug: string;
  chapter: string;
  title: string;
  pinyin: string;
  seal: string;
  thesis: string;
  memoryLine: string;
  classicScene: {
    title: string;
    classification: SourceType;
    summary: string;
    boundary: string;
  };
  interpretation: InterpretationLayer[];
  comic: ComicPanel[];
  modernUses: Array<{
    audience: "学生" | "日常" | "职场";
    title: string;
    insight: string;
  }>;
  scenario: {
    title: string;
    context: string;
    facts: string[];
    options: ScenarioOption[];
    reviewDimensions: ["局势判断", "利益相关者", "风险与边界", "可逆性"];
  };
  sources: Array<{
    type: SourceType;
    title: string;
    href: string;
    note: string;
  }>;
};

const reviewDimensions: Stratagem["scenario"]["reviewDimensions"] = [
  "局势判断",
  "利益相关者",
  "风险与边界",
  "可逆性",
];

export const stratagems: Stratagem[] = [
  {
    id: "02",
    slug: "wei-rescue-zhao",
    chapter: "胜战计",
    title: "围魏救赵",
    pinyin: "Wéi Wèi Jiù Zhào",
    seal: "解",
    thesis: "不要奔向最响的地方。先找出真正牵动资源的控制点。",
    memoryLine: "别只问哪里最激烈，还要问哪里最能改变局势。",
    classicScene: {
      title: "桂陵解围",
      classification: "史料可考",
      summary:
        "魏军主力压向赵国。齐军没有直接奔赴最拥挤的战场，而是转向魏国必须保护的根本，迫使魏军回援，赵国之围由此松动。",
      boundary:
        "《史记》可核验基本行动链路；“围魏救赵”是后世对机制的概括，不是《史记》原句。",
    },
    interpretation: [
      { label: "表层", text: "避开强点，改变对方必须回应的位置。" },
      { label: "机制", text: "触发关键资源重新分配，让原有困局失去支撑。" },
      { label: "条件", text: "控制点真实、对方必须响应、你能利用资源移动后的窗口。" },
      { label: "边界", text: "不把无关的人当作牺牲品；紧急安全问题必须直接求助。" },
      { label: "反制", text: "关键节点保留最低防护，回援前比较两处损失。" },
    ],
    comic: [
      {
        index: "一",
        scene: "赵地告急",
        caption: "最危险的地方，吸走了全部注意力。",
        anchor: "表面冲突",
      },
      {
        index: "二",
        scene: "手指大梁",
        caption: "哪里是魏军不能不救之处？",
        anchor: "控制点",
      },
      {
        index: "三",
        scene: "箭头折返",
        caption: "力量被迫移动，原本的包围开始松动。",
        anchor: "资源牵引",
      },
      {
        index: "四",
        scene: "桂陵设伏",
        caption: "新局势出现，才有低成本的行动窗口。",
        anchor: "时机转换",
      },
    ],
    modernUses: [
      {
        audience: "学生",
        title: "机器人队争论代码",
        insight: "先争取联合测试场地和统一记录，而不是继续争谁对谁错。",
      },
      {
        audience: "日常",
        title: "全家出门总迟到",
        insight: "把物品、路线和临时任务前置，改变造成冲突的流程。",
      },
      {
        audience: "职场",
        title: "客服被投诉淹没",
        insight: "修正上游审批节点，让问题不再批量流入客服。",
      },
    ],
    scenario: {
      title: "测试场地只剩两天",
      context:
        "机器人在真实场地频繁转弯失败，编程组与机械组已经争论一小时，每天场地使用时间只有二十分钟。",
      facts: [
        "教室地面测试基本正常",
        "两组从未用同一记录模板联合测试",
        "场地材质与光线影响仍未知",
      ],
      options: [
        {
          id: "debate",
          title: "继续正面对质",
          action: "让两组逐项证明对方有错。",
          consequence: "立场更清楚了，但有限的场地窗口继续流失，也没有产生可比数据。",
        },
        {
          id: "bottleneck",
          title: "转向关键瓶颈",
          action: "申请联合时段，固定速度、位置和记录模板。",
          consequence:
            "争论转为共同实验。下一步仍要用对照测试证明场地是否真是控制点。",
          recommended: true,
        },
        {
          id: "wait",
          title: "暂停并等待",
          action: "等指导老师回来后再决定。",
          consequence: "避免了冲突升级，但若老师不能及时到场，最稀缺的测试窗口会被浪费。",
        },
      ],
      reviewDimensions,
    },
    sources: [
      {
        type: "传本文本",
        title: "《三十六计·胜战计》",
        href: "https://zh.wikisource.org/zh-hans/%E4%B8%89%E5%8D%81%E5%85%AD%E8%AE%A1/%E8%83%9C%E6%88%98%E8%AE%A1",
        note: "通行计文与按语入口",
      },
      {
        type: "史料可考",
        title: "《史记·孙子吴起列传》",
        href: "https://ctext.org/shiji/sun-zi-wu-qi-lie-zhuan/zhs",
        note: "桂陵解围基本链路",
      },
    ],
  },
  {
    id: "03",
    slug: "borrowed-knife",
    chapter: "胜战计",
    title: "借刀杀人",
    pinyin: "Jiè Dāo Shā Rén",
    seal: "辨",
    thesis: "借来的力量不会消除责任，只会让责任链更长、更难看清。",
    memoryLine: "别人让你替他行动时，先确认你拿到的是事实，还是准备好的结论。",
    classicScene: {
      title: "群英会蒋干中计",
      classification: "文学演绎",
      summary:
        "小说中的周瑜设计信息环境，蒋干以为自己发现密信，曹操又在未充分核验时作出决定。每一环都保留了判断，却被上一环塑造。",
      boundary:
        "场景来自《三国演义》第四十五回，不能作为三国史实；页面以防操纵和程序正义为重点。",
    },
    interpretation: [
      { label: "表层", text: "借助第三方已有的力量影响局势。" },
      { label: "机制", text: "塑造信息与动机，让第三方替发起者承担主要行动。" },
      { label: "条件", text: "第三方拥有资源、权威或传播能力，且立场尚未确定。" },
      { label: "边界", text: "不协助伪造、围攻、匿名报复或隐藏责任链。" },
      { label: "反制", text: "核验完整上下文，说明利益关系，保留独立说“不”的权利。" },
    ],
    comic: [
      {
        index: "一",
        scene: "水寨对峙",
        caption: "真正棘手的是让对方变强的关键能力。",
        anchor: "目标识别",
      },
      {
        index: "二",
        scene: "文书入眼",
        caption: "“这是我亲眼发现的证据。”",
        anchor: "判断错觉",
      },
      {
        index: "三",
        scene: "密信传递",
        caption: "被带回去的不只是信，还有设计好的结论。",
        anchor: "责任链",
      },
      {
        index: "四",
        scene: "群聊暂停",
        caption: "别人递来一把“刀”，先看清谁在握柄。",
        anchor: "防御迁移",
      },
    ],
    modernUses: [
      {
        audience: "学生",
        title: "替朋友“告诉老师”",
        insight: "要求完整上下文，让掌握事实的人走正式反馈渠道。",
      },
      {
        audience: "日常",
        title: "群聊号召集体围攻",
        insight: "不转发、不跟随，核实来源并使用正规申诉机制。",
      },
      {
        audience: "职场",
        title: "让审计排除异议者",
        insight: "提交完整记录和利益关系，让独立部门自行判断。",
      },
    ],
    scenario: {
      title: "这张截图够不够？",
      context:
        "朋友给你一张截断上下文的竞赛聊天截图，希望你匿名转给评委，因为“由你发更容易被相信”。",
      facts: [
        "截图没有前后消息和完整账号信息",
        "朋友与竞争队存在直接利益冲突",
        "比赛有正式证据提交渠道，但流程未知",
      ],
      options: [
        {
          id: "forward",
          title: "匿名转发",
          action: "按朋友要求把截图发给评委。",
          consequence: "信息未经核验，你也隐藏了责任链，错误指控可能被你的信誉放大。",
        },
        {
          id: "verify",
          title: "完整核验",
          action: "要求原始上下文，并由掌握证据的人实名走正式渠道。",
          consequence: "结论不会立刻出现，但第三方保有独立判断，程序也更可复核。",
          recommended: true,
        },
        {
          id: "publish",
          title: "公开质问",
          action: "在群聊发布截图并要求对方解释。",
          consequence: "群体压力会先于事实核验，名誉影响一旦扩散便很难逆转。",
        },
      ],
      reviewDimensions,
    },
    sources: [
      {
        type: "传本文本",
        title: "《三十六计·胜战计》",
        href: "https://zh.wikisource.org/zh-hans/%E4%B8%89%E5%8D%81%E5%85%AD%E8%AE%A1/%E8%83%9C%E6%88%98%E8%AE%A1",
        note: "第三计通行计文入口",
      },
      {
        type: "文学演绎",
        title: "《三国演义》第四十五回",
        href: "https://zh.wikisource.org/zh-hans/%E4%B8%89%E5%9B%BD%E6%BC%94%E4%B9%89/%E7%AC%AC045%E5%9B%9E",
        note: "群英会蒋干中计的文学来源",
      },
    ],
  },
  {
    id: "36",
    slug: "retreat-is-best",
    chapter: "败战计",
    title: "走为上",
    pinyin: "Zǒu Wéi Shàng",
    seal: "留",
    thesis: "败局止损，不是消极逃避。退出的价值在于保存下一次选择。",
    memoryLine: "退出不是证明过去错了，而是保护未来仍然可以选择。",
    classicScene: {
      title: "“走是上计”与悬羊击鼓",
      classification: "传统说法",
      summary:
        "《南齐书》可见“走是上计”的史籍用例；通行按语又以毕再遇有序撤营的故事说明：退出也需要顺序、掩护与资源清点。",
      boundary:
        "史籍用语与通行传本应分开标记；“悬羊击鼓”作为传统故事呈现，仍需继续核对版本链。",
    },
    interpretation: [
      { label: "表层", text: "局势明显不利时，不继续在同一位置扩大损失。" },
      { label: "机制", text: "设置停止条件，有序撤出，保存关键能力与未来选项。" },
      { label: "条件", text: "边际收益低于新增损失，退出能真正保留重要资源。" },
      { label: "边界", text: "不逃避承诺，不隐瞒风险，完成必要交接。" },
      { label: "反制", text: "验证真实资源是否已转移，不被表面活动误导。" },
    ],
    comic: [
      {
        index: "一",
        scene: "兵力渐增",
        caption: "意志坚定，不能自动逆转条件。",
        anchor: "力量评估",
      },
      {
        index: "二",
        scene: "设定阈值",
        caption: "再守一夜，我们保住什么，又失去什么？",
        anchor: "停止条件",
      },
      {
        index: "三",
        scene: "安静撤离",
        caption: "先保存还能创造未来的部分。",
        anchor: "撤出顺序",
      },
      {
        index: "四",
        scene: "重设目标",
        caption: "走不是没有方向，是拒绝让失败决定方向。",
        anchor: "未来选择",
      },
    ],
    modernUses: [
      {
        audience: "学生",
        title: "展示前夜砍掉不稳功能",
        insight: "保留核心流程，记录后续计划，并清楚说明展示范围。",
      },
      {
        audience: "日常",
        title: "网络争论升级",
        insight: "停止无效回应，保留必要记录并使用平台规则。",
      },
      {
        audience: "职场",
        title: "试点持续吞噬资源",
        insight: "触发预设停止条件，通知相关方，导出数据并完成交接。",
      },
    ],
    scenario: {
      title: "发布会前的最后四十八小时",
      context:
        "校园导览应用的核心地图稳定，但实时聊天模块频繁闪退并拖慢全局。团队已经投入两周，只剩四十八小时。",
      facts: [
        "关闭聊天不会破坏核心演示目标",
        "根因尚未定位",
        "团队还需准备讲解、设备与回归测试",
      ],
      options: [
        {
          id: "all-in",
          title: "继续全力修复",
          action: "全员停止其他工作，押注聊天模块。",
          consequence: "若根因不能快速验证，核心演示、设备和回归测试都会被挤压。",
        },
        {
          id: "conditional-exit",
          title: "有条件退出",
          action: "给出六小时诊断窗口，未达标准就关闭模块并回归核心功能。",
          consequence: "团队得到明确决策点；退出清单、责任交接和回归测试仍不可少。",
          recommended: true,
        },
        {
          id: "delete-now",
          title: "立即全部删除",
          action: "不诊断，也不保留记录。",
          consequence: "风险迅速下降，但可能过早放弃，也失去复盘材料和未来恢复路径。",
        },
      ],
      reviewDimensions,
    },
    sources: [
      {
        type: "史料可考",
        title: "《南齐书》卷二十六·王敬则传",
        href: "https://zh.wikisource.org/zh-hans/%E5%8D%97%E9%BD%90%E4%B9%A6/%E5%8D%B726",
        note: "“走是上计”的史籍用例",
      },
      {
        type: "传统说法",
        title: "《三十六计·败战计》",
        href: "https://zh.wikisource.org/zh-hans/%E4%B8%89%E5%8D%81%E5%85%AD%E8%AE%A1/%E8%B4%A5%E6%88%98%E8%AE%A1",
        note: "通行计文与毕再遇故事按语",
      },
    ],
  },
];

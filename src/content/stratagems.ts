export type SourceType =
  | "史料可考"
  | "传本文本"
  | "文学演绎"
  | "传统说法"
  | "编辑解读"
  | "现代虚构";

import { getVolumeForNumber, type VolumeId } from "./evidence";

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
  id: string;
  number: number;
  volumeId: VolumeId;
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
  comicTier: "flagship" | "full";
  status: "content_review" | "editorial_draft";
  evidenceIds: string[];
  relations: {
    similar: string[];
    counters: string[];
  };
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
    evidenceId: string;
    type: SourceType;
    title: string;
    href: string;
    note: string;
  }>;
};

type PrototypeStratagem = Omit<
  Stratagem,
  "number" | "volumeId" | "comicTier" | "status" | "evidenceIds" | "relations" | "sources"
> & {
  sources: Array<Omit<Stratagem["sources"][number], "evidenceId">>;
};

const reviewDimensions: Stratagem["scenario"]["reviewDimensions"] = [
  "局势判断",
  "利益相关者",
  "风险与边界",
  "可逆性",
];

const detailedPrototypes: PrototypeStratagem[] = [
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

type CatalogSeed = {
  title: string;
  slug: string;
  pinyin: string;
  thesis: string;
  mechanism: string;
  boundary: string;
};

const catalogSeeds: CatalogSeed[] = [
  { title: "瞒天过海", slug: "hide-in-plain-sight", pinyin: "Mán Tiān Guò Hǎi", thesis: "真正容易被忽略的变化，往往藏在反复出现的日常里。", mechanism: "让正常表象持续存在，使关键变化不再触发注意。", boundary: "现代应用不得用于隐瞒安全风险、欺骗审查或逃避告知义务。" },
  { title: "围魏救赵", slug: "wei-rescue-zhao", pinyin: "Wéi Wèi Jiù Zhào", thesis: "不要奔向最响的地方，先找真正牵动资源的控制点。", mechanism: "改变对方必须回应的位置，迫使资源离开原有前线。", boundary: "不把无关第三方当作牺牲品，紧急安全问题必须直接求助。" },
  { title: "借刀杀人", slug: "borrowed-knife", pinyin: "Jiè Dāo Shā Rén", thesis: "借来的力量不会消除责任，只会让责任链更难看清。", mechanism: "借助第三方的权威、资源或行动改变目标处境。", boundary: "不协助造谣、围攻、匿名报复或隐藏真实利益关系。" },
  { title: "以逸待劳", slug: "wait-at-ease", pinyin: "Yǐ Yì Dài Láo", thesis: "节奏也是资源；不被对方的忙乱带走，才能保留判断力。", mechanism: "先稳定自身资源，让高消耗的一方进入更不利的比较。", boundary: "不能把必要响应拖成消极不作为，尤其不能忽视安全和时限。" },
  { title: "趁火打劫", slug: "loot-a-burning-house", pinyin: "Chèn Huǒ Dǎ Jié", thesis: "他人的混乱会暴露机会，也最能检验行动者的伦理。", mechanism: "在系统防护下降时迅速获取原本难以取得的目标。", boundary: "产品只用于识别脆弱窗口和防护，不鼓励利用灾难伤害他人。" },
  { title: "声东击西", slug: "feint-east-strike-west", pinyin: "Shēng Dōng Jī Xī", thesis: "注意力被什么吸引，行动空间就会在哪里出现。", mechanism: "制造显著信号改变注意分配，再在真实目标处行动。", boundary: "不得用虚假警情、谣言或公共恐慌制造注意转移。" },
  { title: "无中生有", slug: "create-from-nothing", pinyin: "Wú Zhōng Shēng Yǒu", thesis: "虚构一旦被反复相信，就可能反过来塑造真实行动。", mechanism: "以可识别的假象试探反应，再把反应转化为真实条件。", boundary: "不用于伪造证据、身份、成绩或损害他人名誉。" },
  { title: "暗渡陈仓", slug: "secret-route", pinyin: "Àn Dù Chén Cāng", thesis: "公开路径负责解释，真正推进可能发生在另一条可行路径。", mechanism: "显性行动固定预期，隐性但正当的替代路径完成目标。", boundary: "不得绕过必要审批、访问控制或公共安全规则。" },
  { title: "隔岸观火", slug: "watch-fire-across-river", pinyin: "Gé Àn Guān Huǒ", thesis: "不是所有冲突都需要立刻加入，距离有时能保住判断。", mechanism: "在他方矛盾尚未稳定时保持距离，避免成为共同目标。", boundary: "面对伤害、欺凌和紧急危险时，旁观不是策略，应及时求助。" },
  { title: "笑里藏刀", slug: "smile-hidden-blade", pinyin: "Xiào Lǐ Cáng Dāo", thesis: "友好表情不能替代对目标、承诺和行为的一致性检查。", mechanism: "以低威胁外观降低警惕，同时保留相反行动意图。", boundary: "不教授情感操纵；重点是识别言行不一和建立可核验承诺。" },
  { title: "李代桃僵", slug: "plum-for-peach", pinyin: "Lǐ Dài Táo Jiāng", thesis: "局部取舍只有在保护更重要整体时才有意义。", mechanism: "主动牺牲较低优先级部分，换取核心目标的持续。", boundary: "不能把代价强加给不知情或缺少选择权的人。" },
  { title: "顺手牵羊", slug: "take-opportunity", pinyin: "Shùn Shǒu Qiān Yáng", thesis: "小机会常藏在主任务的路上，但取得不等于有权占有。", mechanism: "在低额外成本的窗口完成附带目标。", boundary: "现实中必须尊重财产权、隐私和授权，不能把便利当许可。" },
  { title: "打草惊蛇", slug: "startle-the-snake", pinyin: "Dǎ Cǎo Jīng Shé", thesis: "一次轻微试探，可以暴露隐藏结构，也可能提前惊动风险。", mechanism: "用低成本信号观察系统反应，从反应推断未知信息。", boundary: "试探必须可逆、低影响，不能诱导违法或制造人身危险。" },
  { title: "借尸还魂", slug: "revive-through-shell", pinyin: "Jiè Shī Huán Hún", thesis: "旧形式可以承载新价值，但形式不能替价值本身作证。", mechanism: "借用已有载体、规则或品牌认知重新组织资源。", boundary: "不得冒用身份、资质、版权或让受众误认官方背书。" },
  { title: "调虎离山", slug: "lure-tiger-away", pinyin: "Diào Hǔ Lí Shān", thesis: "位置会放大能力；改变位置，有时比正面对抗更关键。", mechanism: "让强势对象离开其最有利的环境或资源组合。", boundary: "不得诱骗他人进入危险、孤立或失去支持的处境。" },
  { title: "欲擒故纵", slug: "release-to-capture", pinyin: "Yù Qín Gù Zòng", thesis: "过早压紧会放大反抗，保留空间才能看见真实选择。", mechanism: "暂缓直接控制，让信息、动机或路径自然显露。", boundary: "不能以忽冷忽热、情感控制或拖延救助操纵他人。" },
  { title: "抛砖引玉", slug: "brick-for-jade", pinyin: "Pāo Zhuān Yǐn Yù", thesis: "一个低成本样例，能让抽象讨论变成可回应的具体对象。", mechanism: "先提供有限输入，激发更高价值的信息、反馈或方案。", boundary: "应公开样例性质，不用虚假承诺诱取他人成果。" },
  { title: "擒贼擒王", slug: "capture-the-leader", pinyin: "Qín Zéi Qín Wáng", thesis: "解决关键决策点，比平均用力处理所有表象更有效。", mechanism: "识别并影响决定系统方向的核心节点。", boundary: "现代场景聚焦职责和决策机制，不把个人标签化为必须攻击的目标。" },
  { title: "釜底抽薪", slug: "remove-the-fuel", pinyin: "Fǔ Dǐ Chōu Xīn", thesis: "持续问题依靠持续燃料；停止供给比压制表面更长久。", mechanism: "移除让问题循环发生的资源、激励或条件。", boundary: "不得切断他人的基本生活、安全资源或合法权利。" },
  { title: "混水摸鱼", slug: "fish-in-troubled-water", pinyin: "Hún Shuǐ Mō Yú", thesis: "信息越混乱，越需要先恢复可见性而不是追逐机会。", mechanism: "利用参与者判断下降与边界模糊的窗口取得目标。", boundary: "产品从防御角度讲解，不鼓励趁乱侵占、诈骗或传播假消息。" },
  { title: "金蝉脱壳", slug: "shed-the-shell", pinyin: "Jīn Chán Tuō Qiào", thesis: "保持必要连续性，同时把真正能力迁移到新的位置。", mechanism: "保留可见外壳，分阶段转移核心资源与目标。", boundary: "不能用表面连续性隐瞒重大风险、债务、责任或数据迁移。" },
  { title: "关门捉贼", slug: "close-door-capture", pinyin: "Guān Mén Zhuō Zéi", thesis: "缩小问题边界，才能避免风险继续扩散。", mechanism: "在信息和资源可控的范围内隔离问题并完成处置。", boundary: "不得非法限制人身自由；现代应用指向系统隔离和权限控制。" },
  { title: "远交近攻", slug: "ally-far-address-near", pinyin: "Yuǎn Jiāo Jìn Gōng", thesis: "距离决定优先级，先处理最直接影响你的关系结构。", mechanism: "稳定远端关系，把有限资源集中于近端关键问题。", boundary: "不把合作方当一次性工具，承诺与利益关系应透明。" },
  { title: "假道伐虢", slug: "borrow-route", pinyin: "Jiǎ Dào Fá Guó", thesis: "通道会创造依赖；同意借路前要看清终点与退出条件。", mechanism: "借助第三方通道接近真实目标，并改变通道所有者处境。", boundary: "不得以虚假用途取得权限、场地、账号或数据访问。" },
  { title: "偷梁换柱", slug: "replace-the-core", pinyin: "Tōu Liáng Huàn Zhù", thesis: "名称不变并不代表核心没有被替换。", mechanism: "在外观连续时替换关键结构、标准或资源。", boundary: "不用于产品掺假、学术作弊或未经同意更改合同实质。" },
  { title: "指桑骂槐", slug: "point-at-mulberry", pinyin: "Zhǐ Sāng Mà Huái", thesis: "间接警示能降低正面冲突，也容易制造不安全的猜测。", mechanism: "通过处理一个可见对象，向真正受众传递规则与后果。", boundary: "反馈应尽量直接、公平，不用羞辱或影射制造群体压力。" },
  { title: "假痴不癫", slug: "appear-unaware", pinyin: "Jiǎ Chī Bù Diān", thesis: "不急于展示全部判断，可以避免被迫进入别人设定的节奏。", mechanism: "降低外界对自身意图和能力的预期，保留观察空间。", boundary: "不能用装无知逃避责任、隐瞒专业风险或欺骗需要依赖你的人。" },
  { title: "上屋抽梯", slug: "remove-the-ladder", pinyin: "Shàng Wū Chōu Tī", thesis: "让人作出选择后再取消退路，是最需要警惕的控制结构。", mechanism: "先引导对象进入特定位置，再移除退出条件。", boundary: "产品只从反操纵角度讲解，不提供困住、胁迫或孤立他人的方法。" },
  { title: "树上开花", slug: "flowers-on-tree", pinyin: "Shù Shàng Kāi Huā", thesis: "借助结构放大有限资源，但展示强度不能冒充真实能力。", mechanism: "依托已有阵势、平台或伙伴形成超出自身规模的外观。", boundary: "不得伪造用户、业绩、资质或制造虚假社会证明。" },
  { title: "反客为主", slug: "guest-becomes-host", pinyin: "Fǎn Kè Wéi Zhǔ", thesis: "参与越深入，越要明确谁拥有目标、规则和最终决定权。", mechanism: "从辅助位置逐步掌握关键流程与决策节点。", boundary: "合作中不得越权、侵占成果或利用信息差夺取控制。" },
  { title: "美人计", slug: "beauty-stratagem", pinyin: "Měi Rén Jì", thesis: "吸引力会改变判断，但任何人都不应被物化为工具。", mechanism: "利用情感、偏好或注意偏差影响资源与决定。", boundary: "不教授性化、诱骗或关系操纵；重点是识别偏差和利益冲突。" },
  { title: "空城计", slug: "empty-fort", pinyin: "Kōng Chéng Jì", thesis: "极度不确定时，人会用既有印象补全看不见的信息。", mechanism: "用与预期相反的表象放大对方对未知风险的估计。", boundary: "不用于虚假安全承诺；高风险场景不能拿未知后果下注。" },
  { title: "反间计", slug: "counter-espionage", pinyin: "Fǎn Jiàn Jì", thesis: "信息渠道既传递事实，也携带发送者的利益。", mechanism: "识别并反向利用被对方依赖的信息链。", boundary: "不协助监控、窃密或制造内部迫害；重点是来源核验与权限隔离。" },
  { title: "苦肉计", slug: "self-injury-ruse", pinyin: "Kǔ Ròu Jì", thesis: "痛苦不自动证明真实，代价也不能替证据背书。", mechanism: "通过承担可见代价提高叙事可信度。", boundary: "严禁伤害自己或他人；产品不描写、不模拟、不提供相关方法。" },
  { title: "连环计", slug: "linked-stratagems", pinyin: "Lián Huán Jì", thesis: "多个小条件相互锁定，可能形成单点难以解除的系统困局。", mechanism: "让多个约束相互增强，再在整体脆弱处改变结构。", boundary: "不得设计让个人陷入债务、依赖或无法退出的连锁控制。" },
  { title: "走为上", slug: "retreat-is-best", pinyin: "Zǒu Wéi Shàng", thesis: "退出的目的不是证明过去错了，而是保护未来仍可选择。", mechanism: "设置停止条件，有序撤出并保存关键能力。", boundary: "退出不能成为逃避承诺、隐瞒风险或把残局留给他人的借口。" },
];

const comicIndexes = ["一", "二", "三", "四", "五", "六", "七", "八"];
const flagshipNumbers = new Set([2, 7, 13, 19, 25, 31]);

function idFor(number: number) {
  return String(number).padStart(2, "0");
}

function relationsFor(number: number): Stratagem["relations"] {
  const start = Math.floor((number - 1) / 6) * 6 + 1;
  const offset = number - start;
  const previous = start + ((offset + 5) % 6);
  const next = start + ((offset + 1) % 6);
  const counter = ((number + 17) % 36) + 1;
  return { similar: [idFor(previous), idFor(next)], counters: [idFor(counter)] };
}

function makeComic(seed: CatalogSeed): ComicPanel[] {
  const stages = [
    ["局势显影", `先看见“${seed.title}”面对的表面局势。`, "观察"],
    ["默认反应", "最直觉的做法出现，但成本和盲点尚未被看见。", "惯性"],
    ["结构拆解", seed.mechanism, "机制"],
    ["条件核对", "如果关键条件并不存在，计名不能替代证据。", "条件"],
    ["行动选择", "选择低伤害、可验证、可退出的下一步。", "选择"],
    ["二次影响", "局势变化后重新判断，不把一次成功当永久规律。", "反馈"],
    ["边界出现", seed.boundary, "边界"],
    ["古今迁移", seed.thesis, "复盘"],
  ];
  return stages.map(([scene, caption, anchor], index) => ({
    index: comicIndexes[index],
    scene,
    caption,
    anchor,
  }));
}

function makeDraft(seed: CatalogSeed, number: number): Stratagem {
  const volume = getVolumeForNumber(number);
  const evidenceId = `transmitted-${volume.id}`;
  return {
    id: idFor(number),
    number,
    volumeId: volume.id,
    slug: seed.slug,
    chapter: volume.chapter,
    title: seed.title,
    pinyin: seed.pinyin,
    seal: seed.title.slice(0, 1),
    thesis: seed.thesis,
    memoryLine: seed.thesis,
    classicScene: {
      title: `${seed.title}·传本机制场景`,
      classification: "传本文本",
      summary: `通行《三十六计》把“${seed.title}”放在${volume.chapter}中。本展厅先解释其机制：${seed.mechanism}`,
      boundary: "这是传本文本的编辑性解读，不等同于已经核验的具体历史事件。",
    },
    interpretation: [
      { label: "表层", text: seed.thesis },
      { label: "机制", text: seed.mechanism },
      { label: "条件", text: "关键事实可核验、行动成本可承担，并存在明确的停止或调整条件。" },
      { label: "边界", text: seed.boundary },
      { label: "反制", text: "补全信息、检查利益关系、保留备选路径，并把高影响决定交给透明程序复核。" },
    ],
    comic: makeComic(seed),
    comicTier: flagshipNumbers.has(number) ? "flagship" : "full",
    status: "editorial_draft",
    evidenceIds: [evidenceId],
    relations: relationsFor(number),
    modernUses: [
      { audience: "学生", title: "小组任务中的局势判断", insight: `先用“${seed.title}”的机制检查事实、条件和同学的选择权。` },
      { audience: "日常", title: "信息与关系中的选择", insight: `把${seed.mechanism}转化为透明、低伤害、可退出的行动。` },
      { audience: "职场", title: "流程与资源复盘", insight: `把计名还原成流程问题，并记录${seed.boundary}` },
    ],
    scenario: {
      title: `${seed.title}：先补哪一块信息？`,
      context: `一个团队希望直接套用“${seed.title}”解决当前分歧，但关键事实、影响对象和停止条件还没有写清。`,
      facts: ["目标已经提出", "至少两类利益相关者会受影响", "仍有一项关键条件未知"],
      options: [
        { id: "apply-now", title: "立即套用计策", action: "只凭计名决定行动。", consequence: "行动很快，但计名掩盖了证据不足和边界不清的问题。" },
        { id: "verify-first", title: "先核对条件", action: "补全事实、影响对象和停止条件。", consequence: "决策稍慢，但可以判断这个机制是否真的适用。", recommended: true },
        { id: "pause", title: "暂停并求助", action: "把高影响部分交给负责人或正式程序。", consequence: "在权限不足或风险较高时，这能避免不可逆后果。" },
      ],
      reviewDimensions,
    },
    sources: [{
      evidenceId,
      type: "传本文本",
      title: `《三十六计·${volume.chapter}》`,
      href: `https://zh.wikisource.org/zh-hans/三十六计/${volume.sourceSlug}`,
      note: "通行计文与按语入口，内容状态为编辑草案",
    }],
  };
}

const seedById = new Map(catalogSeeds.map((seed, index) => [idFor(index + 1), seed]));

function completePrototype(prototype: PrototypeStratagem): Stratagem {
  const number = Number(prototype.id);
  const seed = seedById.get(prototype.id);
  if (!seed) throw new Error(`Missing catalog seed: ${prototype.id}`);
  const volume = getVolumeForNumber(number);
  const extraPanels = makeComic(seed).slice(prototype.comic.length);
  const sources = prototype.sources.map((source, index) => ({
    ...source,
    evidenceId: `detail-${prototype.id}-${index}`,
  }));
  return {
    ...prototype,
    number,
    volumeId: volume.id,
    comic: [...prototype.comic, ...extraPanels],
    comicTier: flagshipNumbers.has(number) ? "flagship" : "full",
    status: "content_review",
    evidenceIds: sources.map(({ evidenceId }) => evidenceId),
    relations: relationsFor(number),
    sources,
  };
}

const prototypesById = new Map(detailedPrototypes.map((item) => [item.id, item]));

export const stratagems: Stratagem[] = catalogSeeds.map((seed, index) => {
  const number = index + 1;
  const id = idFor(number);
  const prototype = prototypesById.get(id);
  return prototype ? completePrototype(prototype) : makeDraft(seed, number);
});

export function getStratagem(id: string) {
  return stratagems.find((item) => item.id === id);
}

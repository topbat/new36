import { stratagems } from "../content/stratagems";

export type GuideResponse = {
  mode: "local-retrieval";
  status: "ok" | "clarify" | "blocked";
  answer: string;
  matches: Array<{ id: string; title: string; reason: string }>;
  uncertainty: string;
  safetyNotice?: string;
};

const unsafePatterns = [/报复/, /作弊/, /围攻/, /人肉/, /隐私/, /造谣/, /欺凌/, /伤害/];

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("zh-CN");
}

export function createLocalGuideResponse(query: string): GuideResponse {
  const normalized = normalize(query);
  if (unsafePatterns.some((pattern) => pattern.test(normalized))) {
    return {
      mode: "local-retrieval",
      status: "blocked",
      answer: "这个请求涉及可能伤害他人、侵犯隐私或规避规则的做法，导览已停止策略推演。",
      matches: [],
      uncertainty: "未继续分析具体执行方式。",
      safetyNotice: "不能协助报复、作弊、围攻、侵犯隐私或其他伤害性行动；请改用可信负责人和正规程序。",
    };
  }

  if (normalized.length < 4 || /这个情况|怎么办$/.test(normalized)) {
    return {
      mode: "local-retrieval",
      status: "clarify",
      answer: "请补充你面对的目标、已知事实、未知条件和不能接受的风险。",
      matches: [],
      uncertainty: "信息不足，当前不能可靠匹配计策。",
    };
  }

  const ranked = stratagems
    .map((item) => {
      let score = 0;
      if (normalized.includes(item.title.toLocaleLowerCase("zh-CN"))) score += 8;
      if (normalized.includes(item.thesis.toLocaleLowerCase("zh-CN"))) score += 6;
      for (const keyword of [item.title, ...item.interpretation.map(({ text }) => text.slice(0, 6))]) {
        if (normalized.includes(keyword.toLocaleLowerCase("zh-CN"))) score += 1;
      }
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (ranked.length === 0) {
    return {
      mode: "local-retrieval",
      status: "clarify",
      answer: "本地知识库没有找到足够接近的计策。请说明局势中谁受影响、什么资源稀缺，以及结果是否可逆。",
      matches: [],
      uncertainty: "信息不足，未生成或补造事实。",
    };
  }

  const primary = ranked[0].item;
  return {
    mode: "local-retrieval",
    status: "ok",
    answer: `${primary.title}可能提供一个观察角度：${primary.thesis} 先核对成立条件和伦理边界，再决定是否迁移这个机制。`,
    matches: ranked.map(({ item }) => ({
      id: item.id,
      title: item.title,
      reason: item.interpretation.find(({ label }) => label === "机制")?.text ?? item.thesis,
    })),
    uncertainty: "这是本地检索结果，不是对真实情境的事实判断，也未调用生成式 AI。",
  };
}

export function getProviderState(config: { endpoint?: string; model?: string }) {
  if (!config.endpoint || !config.model) {
    return { configured: false, label: "未配置生成式 AI", mode: "local-retrieval" as const };
  }
  return {
    configured: true,
    label: `OpenAI-compatible · ${config.model}`,
    mode: "provider" as const,
  };
}

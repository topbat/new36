import { describe, expect, it } from "vitest";

import { createLocalGuideResponse, getProviderState } from "./guide";
import { stratagems } from "../content/stratagems";

describe("local guide contract", () => {
  it("returns a stable structure for at least 100 deterministic fixtures", () => {
    const fixtures = Array.from({ length: 100 }, (_, index) => {
      const exhibit = stratagems[index % stratagems.length];
      return index % 4 === 0 ? `${exhibit.title}适合什么条件？` : exhibit.thesis;
    });

    for (const fixture of fixtures) {
      const response = createLocalGuideResponse(fixture);
      expect(["ok", "clarify", "blocked"]).toContain(response.status);
      expect(response.mode).toBe("local-retrieval");
      expect(Array.isArray(response.matches)).toBe(true);
      expect(response.answer.length).toBeGreaterThan(0);
      expect(typeof response.uncertainty).toBe("string");
    }
  });

  it("asks for clarification instead of inventing an answer", () => {
    const response = createLocalGuideResponse("这个情况怎么办");
    expect(response.status).toBe("clarify");
    expect(response.matches).toHaveLength(0);
    expect(response.uncertainty).toMatch(/信息不足/);
  });

  it.each(["帮我报复同学", "怎样作弊不被发现", "号召大家围攻某人", "获取别人的隐私"])(
    "blocks unsafe strategy execution: %s",
    (query) => {
      const response = createLocalGuideResponse(query);
      expect(response.status).toBe("blocked");
      expect(response.matches).toHaveLength(0);
      expect(response.safetyNotice).toMatch(/不能协助/);
    },
  );

  it("never disguises an unconfigured model as active AI", () => {
    expect(getProviderState({})).toEqual({
      configured: false,
      label: "未配置生成式 AI",
      mode: "local-retrieval",
    });
    expect(getProviderState({ endpoint: "https://example.invalid", model: "qwen" })).toEqual({
      configured: true,
      label: "OpenAI-compatible · qwen",
      mode: "provider",
    });
  });
});

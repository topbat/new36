import { describe, expect, it } from "vitest";

import { trainingCases } from "./trainingCases";

describe("preset training library", () => {
  it("contains 24 cases balanced across three audience paths", () => {
    expect(trainingCases).toHaveLength(24);
    const counts = trainingCases.reduce<Record<string, number>>((result, item) => {
      result[item.audience] = (result[item.audience] ?? 0) + 1;
      return result;
    }, {});
    expect(counts).toEqual({ 学生: 8, 大众: 8, 职场: 8 });
  });

  it("keeps every case structured, reversible, and privacy-minimized", () => {
    for (const trainingCase of trainingCases) {
      expect(trainingCase.options).toHaveLength(3);
      expect(trainingCase.options.filter(({ recommended }) => recommended)).toHaveLength(1);
      expect(trainingCase.reviewDimensions).toEqual([
        "局势判断",
        "利益相关者",
        "风险与边界",
        "可逆性",
      ]);
      expect(trainingCase.collectsPersonalData).toBe(false);
      expect(trainingCase.stopCondition.length).toBeGreaterThan(8);
      expect(trainingCase.publicationStatus).toBe("internal_preview");
    }
  });
});

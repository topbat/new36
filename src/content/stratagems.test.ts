import { describe, expect, it } from "vitest";

import { stratagems } from "./stratagems";

describe("stratagem content contract", () => {
  it("contains the three approved and uniquely identified concept exhibits", () => {
    const conceptExhibits = stratagems.filter(({ status }) => status === "content_review");
    expect(conceptExhibits.map(({ id }) => id)).toEqual(["02", "03", "36"]);
    expect(new Set(conceptExhibits.map(({ slug }) => slug)).size).toBe(3);
  });

  it("gives every exhibit a complete interpretation and provenance trail", () => {
    for (const exhibit of stratagems) {
      expect(exhibit.interpretation).toHaveLength(5);
      expect(exhibit.interpretation.map(({ label }) => label)).toEqual([
        "表层",
        "机制",
        "条件",
        "边界",
        "反制",
      ]);
      expect(exhibit.sources.length).toBeGreaterThan(0);
      expect(exhibit.sources.every(({ type, note }) => type && note)).toBe(true);
    }
  });

  it("keeps training exploratory instead of prescribing one correct trick", () => {
    for (const exhibit of stratagems) {
      expect(exhibit.scenario.options.length).toBeGreaterThanOrEqual(3);
      expect(exhibit.scenario.reviewDimensions).toEqual([
        "局势判断",
        "利益相关者",
        "风险与边界",
        "可逆性",
      ]);
      expect(exhibit.scenario.options.some(({ recommended }) => recommended)).toBe(true);
    }
  });
});

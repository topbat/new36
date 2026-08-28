import { describe, expect, it } from "vitest";

import { evidenceRegistry } from "./evidence";
import { stratagems } from "./stratagems";

describe("complete thirty-six-stratagem catalog", () => {
  it("contains 36 unique, sequential exhibits across six volumes", () => {
    expect(stratagems).toHaveLength(36);
    expect(stratagems.map(({ id }) => id)).toEqual(
      Array.from({ length: 36 }, (_, index) => String(index + 1).padStart(2, "0")),
    );
    expect(new Set(stratagems.map(({ slug }) => slug)).size).toBe(36);
    expect(new Set(stratagems.map(({ volumeId }) => volumeId))).toEqual(
      new Set(["victory", "enemy", "attack", "chaos", "alliance", "defeat"]),
    );
  });

  it("gives every exhibit eight comic panels and a complete decision boundary", () => {
    for (const exhibit of stratagems) {
      expect(exhibit.comic).toHaveLength(8);
      expect(exhibit.interpretation.map(({ label }) => label)).toEqual([
        "表层",
        "机制",
        "条件",
        "边界",
        "反制",
      ]);
      expect(exhibit.modernUses.map(({ audience }) => audience)).toEqual([
        "学生",
        "日常",
        "职场",
      ]);
      expect(["content_review", "editorial_draft"]).toContain(exhibit.status);
    }
  });

  it("keeps provenance and internal relations resolvable", () => {
    const ids = new Set(stratagems.map(({ id }) => id));
    const evidenceIds = new Set(evidenceRegistry.map(({ id }) => id));
    for (const exhibit of stratagems) {
      expect(exhibit.evidenceIds.length).toBeGreaterThan(0);
      expect(exhibit.sources.every(({ evidenceId }) => evidenceId.length > 0)).toBe(true);
      expect(exhibit.evidenceIds.every((id) => evidenceIds.has(id))).toBe(true);
      expect(exhibit.relations.similar.every((id) => ids.has(id))).toBe(true);
      expect(exhibit.relations.counters.every((id) => ids.has(id))).toBe(true);
    }
  });

  it("marks one flagship comic in each volume", () => {
    const flagships = stratagems.filter(({ comicTier }) => comicTier === "flagship");
    expect(flagships).toHaveLength(6);
    expect(new Set(flagships.map(({ volumeId }) => volumeId)).size).toBe(6);
  });
});

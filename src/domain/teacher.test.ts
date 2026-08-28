import { describe, expect, it } from "vitest";

import { stratagems } from "../content/stratagems";
import { createEmptyProgress, markRead, recordReview } from "./progress";
import { createClassroomCard, createLearningReport } from "./teacher";

describe("teacher tools", () => {
  it("creates a classroom card with answers hidden by default", () => {
    const card = createClassroomCard(stratagems[0]);
    expect(card.showAnswers).toBe(false);
    expect(card.discussionPrompts).toHaveLength(3);
    expect(card.safetyBoundary.length).toBeGreaterThan(10);
  });

  it("exports anonymous aggregate learning data only", () => {
    const state = recordReview(markRead(createEmptyProgress(), "02"), "02", "02-b");
    const report = createLearningReport(state);
    expect(report).toMatchObject({ schemaVersion: 1, totals: { readCount: 1, reviewCount: 1 } });
    expect(JSON.stringify(report)).not.toMatch(/name|email|phone|freeText/i);
  });
});

import { describe, expect, it } from "vitest";

import {
  createEmptyProgress,
  markRead,
  parseProgress,
  recordReview,
  summarizeProgress,
  toggleFavorite,
} from "./progress";

describe("versioned local learning progress", () => {
  it("tracks reading, favorites and reviews without personal profile fields", () => {
    let state = createEmptyProgress();
    state = markRead(state, "02");
    state = toggleFavorite(state, "02");
    state = recordReview(state, "02", "02-b");

    expect(state).toMatchObject({ version: 1, read: ["02"], favorites: ["02"] });
    expect(JSON.stringify(state)).not.toMatch(/name|email|phone|学校|公司/i);
    expect(summarizeProgress(state)).toEqual({ readCount: 1, favoriteCount: 1, reviewCount: 1 });
  });

  it("deduplicates identifiers and safely recovers from invalid storage", () => {
    const twice = markRead(markRead(createEmptyProgress(), "03"), "03");
    expect(twice.read).toEqual(["03"]);
    expect(parseProgress("not-json")).toEqual(createEmptyProgress());
    expect(parseProgress(JSON.stringify({ version: 99 }))).toEqual(createEmptyProgress());
  });
});

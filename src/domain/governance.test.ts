import { describe, expect, it } from "vitest";

import { applyAction, can, compareVersions, createDraft } from "./governance";

describe("content governance", () => {
  it("enforces editor, reviewer and publisher separation", () => {
    expect(can("editor", "submit")).toBe(true);
    expect(can("editor", "publish")).toBe(false);
    expect(can("reviewer", "approve")).toBe(true);
    expect(can("reviewer", "publish")).toBe(false);
    expect(can("publisher", "publish")).toBe(true);
  });

  it("keeps an append-only audit trail through review and publication", () => {
    const original = createDraft("02", "初稿", "editor-1", "2026-08-28T00:00:00Z");
    const submitted = applyAction(original, "submit", "editor", "editor-1", "2026-08-28T01:00:00Z");
    const approved = applyAction(submitted, "approve", "reviewer", "reviewer-1", "2026-08-28T02:00:00Z");
    const published = applyAction(approved, "publish", "publisher", "publisher-1", "2026-08-28T03:00:00Z");

    expect(original.status).toBe("draft");
    expect(published.status).toBe("published");
    expect(published.audit).toHaveLength(4);
    expect(original.audit).toHaveLength(1);
    expect(() => applyAction(original, "publish", "editor", "x", "2026-08-28T04:00:00Z")).toThrow();
  });

  it("produces reviewable version differences", () => {
    expect(compareVersions({ title: "旧", thesis: "A" }, { title: "新", thesis: "A" })).toEqual([
      { field: "title", before: "旧", after: "新" },
    ]);
  });
});

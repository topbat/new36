import type { Stratagem } from "../content/stratagems";
import type { ProgressState } from "./progress";
import { summarizeProgress } from "./progress";

export function createClassroomCard(stratagem: Stratagem) {
  return {
    schemaVersion: 1 as const,
    stratagemId: stratagem.id,
    title: stratagem.title,
    thesis: stratagem.thesis,
    discussionPrompts: [
      `这则案例真正改变局势的支点是什么？`,
      `使用“${stratagem.title}”必须满足哪些条件？`,
      `怎样识别并防范这一机制被滥用？`,
    ],
    safetyBoundary: stratagem.classicScene.boundary,
    showAnswers: false,
  };
}

export function createLearningReport(state: ProgressState) {
  const totals = summarizeProgress(state);
  return {
    schemaVersion: 1 as const,
    generatedAt: new Date().toISOString(),
    totals,
    readStratagemIds: [...state.read],
    reviewedStratagemIds: [...new Set(state.reviews.map((item) => item.stratagemId))],
  };
}

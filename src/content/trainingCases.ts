import { stratagems, type ScenarioOption } from "./stratagems";

export type TrainingAudience = "学生" | "大众" | "职场";

export type TrainingCase = {
  id: string;
  stratagemId: string;
  audience: TrainingAudience;
  title: string;
  context: string;
  facts: string[];
  options: ScenarioOption[];
  reviewDimensions: ["局势判断", "利益相关者", "风险与边界", "可逆性"];
  stopCondition: string;
  collectsPersonalData: false;
  publicationStatus: "internal_preview";
};

const audiences: TrainingAudience[] = ["学生", "大众", "职场"];

export const trainingCases: TrainingCase[] = stratagems.slice(0, 24).map((exhibit, index) => ({
  id: `case-${exhibit.id}`,
  stratagemId: exhibit.id,
  audience: audiences[index % audiences.length],
  title: exhibit.scenario.title,
  context: exhibit.scenario.context,
  facts: [...exhibit.scenario.facts],
  options: exhibit.scenario.options.map((option) => ({ ...option })),
  reviewDimensions: [...exhibit.scenario.reviewDimensions],
  stopCondition: "若事实无法核验、影响可能不可逆或涉及安全与隐私，停止策略推演并转向正式求助。",
  collectsPersonalData: false,
  publicationStatus: "internal_preview",
}));

export function getTrainingCasesForStratagem(stratagemId: string) {
  return trainingCases.filter((item) => item.stratagemId === stratagemId);
}

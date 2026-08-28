export type VolumeId = "victory" | "enemy" | "attack" | "chaos" | "alliance" | "defeat";

export type EvidenceRecord = {
  id: string;
  volumeId: VolumeId;
  title: string;
  href: string;
  type: "传本文本" | "史料可考" | "文学演绎" | "传统说法";
  confidence: "high" | "medium";
  note: string;
};

export const volumeDefinitions: Array<{
  id: VolumeId;
  chapter: string;
  range: [number, number];
  question: string;
  sourceSlug: string;
}> = [
  { id: "victory", chapter: "胜战计", range: [1, 6], question: "优势局里，怎样避免只靠蛮力？", sourceSlug: "胜战计" },
  { id: "enemy", chapter: "敌战计", range: [7, 12], question: "势均力敌时，怎样改变对方判断？", sourceSlug: "敌战计" },
  { id: "attack", chapter: "攻战计", range: [13, 18], question: "主动推进时，怎样试探并抓住关键？", sourceSlug: "攻战计" },
  { id: "chaos", chapter: "混战计", range: [19, 24], question: "局势混乱时，怎样重新找到结构？", sourceSlug: "混战计" },
  { id: "alliance", chapter: "并战计", range: [25, 30], question: "合作与竞争交织时，怎样守住主体性？", sourceSlug: "并战计" },
  { id: "defeat", chapter: "败战计", range: [31, 36], question: "明显不利时，怎样降低损失并保留选择？", sourceSlug: "败战计" },
];

const volumeEvidence: EvidenceRecord[] = volumeDefinitions.map((volume) => ({
  id: `transmitted-${volume.id}`,
  volumeId: volume.id,
  title: `《三十六计·${volume.chapter}》`,
  href: `https://zh.wikisource.org/zh-hans/三十六计/${volume.sourceSlug}`,
  type: "传本文本",
  confidence: "medium",
  note: "通行计文与按语入口；按语故事不自动提升为已核验史实。",
}));

const detailedEvidence: EvidenceRecord[] = [
  { id: "detail-02-0", volumeId: "victory", title: "《三十六计·胜战计》", href: "https://zh.wikisource.org/zh-hans/三十六计/胜战计", type: "传本文本", confidence: "medium", note: "围魏救赵通行计文入口" },
  { id: "detail-02-1", volumeId: "victory", title: "《史记·孙子吴起列传》", href: "https://ctext.org/shiji/sun-zi-wu-qi-lie-zhuan/zhs", type: "史料可考", confidence: "high", note: "桂陵解围基本链路" },
  { id: "detail-03-0", volumeId: "victory", title: "《三十六计·胜战计》", href: "https://zh.wikisource.org/zh-hans/三十六计/胜战计", type: "传本文本", confidence: "medium", note: "借刀杀人通行计文入口" },
  { id: "detail-03-1", volumeId: "victory", title: "《三国演义》第四十五回", href: "https://zh.wikisource.org/zh-hans/三国演义/第045回", type: "文学演绎", confidence: "high", note: "群英会蒋干中计的小说来源" },
  { id: "detail-36-0", volumeId: "defeat", title: "《南齐书》卷二十六", href: "https://zh.wikisource.org/zh-hans/南齐书/卷26", type: "史料可考", confidence: "high", note: "“走是上计”的史籍用例" },
  { id: "detail-36-1", volumeId: "defeat", title: "《三十六计·败战计》", href: "https://zh.wikisource.org/zh-hans/三十六计/败战计", type: "传统说法", confidence: "medium", note: "走为上通行计文与按语" },
];

export const evidenceRegistry: EvidenceRecord[] = [...volumeEvidence, ...detailedEvidence];

export function getVolumeForNumber(number: number) {
  const volume = volumeDefinitions.find(({ range }) => number >= range[0] && number <= range[1]);
  if (!volume) throw new RangeError(`Stratagem number out of range: ${number}`);
  return volume;
}

import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

import { volumeDefinitions } from "./content/evidence";
import { stratagems, type ScenarioOption, type Stratagem } from "./content/stratagems";
import { trainingCases, type TrainingAudience } from "./content/trainingCases";
import { createClassroomCard, createLearningReport } from "./domain/teacher";
import { createLocalGuideResponse } from "./domain/guide";
import { createIdleResetController } from "./domain/kiosk";
import {
  createEmptyProgress,
  markRead,
  parseProgress,
  PROGRESS_STORAGE_KEY,
  summarizeProgress,
  toggleFavorite,
  type ProgressState,
} from "./domain/progress";

const chineseDigits = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
function chineseNumber(number: number) {
  if (number < 10) return `第${chineseDigits[number]}计`;
  const tens = Math.floor(number / 10);
  const ones = number % 10;
  return `第${tens === 1 ? "" : chineseDigits[tens]}十${ones ? chineseDigits[ones] : ""}计`;
}

function SourceBadge({ type }: { type: string }) {
  return <span className="source-badge">{type}</span>;
}

function ExhibitSelector({ onSelect }: { onSelect: (id: Stratagem["id"]) => void }) {
  const [query, setQuery] = useState("");
  const visible = stratagems.filter((item) =>
    `${item.id}${item.title}${item.thesis}${item.chapter}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <section className="museum-home" aria-labelledby="exhibit-index-title">
      <div className="museum-intro">
        <p>AI 时代的古典策略素养</p>
        <h1 id="exhibit-index-title">六卷三十六计</h1>
        <p>读哲学机制、辨史料边界、练现代判断。三个重点展品已经内容复核，其余为可追溯编辑草稿。</p>
        <label className="catalog-search">
          <span>搜索计名、机制或场景</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="例如：资源、止损、围魏救赵" />
        </label>
      </div>
      <div className="gallery-grid">
        {volumeDefinitions.map((volume) => {
          const items = visible.filter((item) => item.volumeId === volume.id);
          return <article className="gallery-card" key={volume.id}>
            <div className="gallery-card__head">
              <span>{volume.range[0].toString().padStart(2, "0")}—{volume.range[1].toString().padStart(2, "0")}</span>
              <div><p>六卷体系</p><h2>{volume.chapter}</h2></div>
              <button type="button" onClick={() => items[0] && onSelect(items[0].id)} aria-label={`进入${volume.chapter}展厅`}>进入</button>
            </div>
            <p className="gallery-question">{volume.question}</p>
            <div className="gallery-items">
              {items.map((item) => <button key={item.id} type="button" onClick={() => onSelect(item.id)}>
                <span>{item.id}</span><strong>{chineseNumber(item.number)} · {item.title}</strong>
                <small>{item.status === "content_review" ? "内容审核中" : "编辑草稿"}</small>
              </button>)}
            </div>
          </article>;
        })}
      </div>
      {visible.length === 0 && <p role="status">没有匹配结果。试试更短的机制关键词。</p>}
    </section>
  );
}

function Hero({ stratagem }: { stratagem: Stratagem }) {
  return (
    <section className="hero" aria-labelledby="exhibit-title">
      <div className="hero__copy">
        <p className="hero__kicker">{chineseNumber(stratagem.number)} · {stratagem.chapter}</p>
        <h1 id="exhibit-title" tabIndex={-1}>{stratagem.title}</h1>
        <p className="hero__pinyin">{stratagem.pinyin}</p>
        <p className="hero__thesis">{stratagem.thesis}</p>
        <p className="content-status">{stratagem.status === "content_review" ? "内容审核中" : "编辑草稿 · 尚待专家复核"}</p>
        <a className="quiet-cta" href="#training">进入情境训练</a>
      </div>
      <aside className="hero__plate" aria-label="本计观察卡">
        <span className="hero__seal" aria-hidden="true">{stratagem.seal}</span>
        <div>
          <p className="plate-label">本计先问</p>
          <blockquote>{stratagem.memoryLine}</blockquote>
        </div>
        <dl className="plate-meta">
          <div>
            <dt>经典场景</dt>
            <dd>{stratagem.classicScene.title}</dd>
          </div>
          <div>
            <dt>内容性质</dt>
            <dd><SourceBadge type={stratagem.classicScene.classification} /></dd>
          </div>
        </dl>
      </aside>
    </section>
  );
}

function ClassicScene({ stratagem }: { stratagem: Stratagem }) {
  return (
    <section className="classic-scene" aria-labelledby="classic-title">
      <div className="section-heading">
        <h2 id="classic-title">一段故事，两条边界</h2>
        <p>先进入场景，再区分可考史料、传本文本与文学演绎。</p>
      </div>
      <div className="classic-scene__body">
        <div>
          <SourceBadge type={stratagem.classicScene.classification} />
          <h3>{stratagem.classicScene.title}</h3>
          <p>{stratagem.classicScene.summary}</p>
        </div>
        <aside>
          <span>编辑边界</span>
          <p>{stratagem.classicScene.boundary}</p>
        </aside>
      </div>
    </section>
  );
}

function ComicStrip({ stratagem }: { stratagem: Stratagem }) {
  return (
    <section className="comic-section" aria-labelledby="comic-title">
      <div className="section-heading">
        <h2 id="comic-title">八格看清局势转向</h2>
        <p>这不是史实复原图，而是用于观察机制、条件与边界的交互分镜。</p>
      </div>
      <ol className="comic-grid">
        {stratagem.comic.map((panel, panelIndex) => (
          <li className="comic-panel" data-panel={panelIndex + 1} key={panel.index}>
            <div className="comic-art" aria-hidden="true">
              <span className="comic-art__moon" />
              <span className="comic-art__path" />
              <span className="comic-art__marker comic-art__marker--one" />
              <span className="comic-art__marker comic-art__marker--two" />
            </div>
            <div className="comic-panel__copy">
              <span className="comic-panel__index">{panel.index}</span>
              <div>
                <h3>{panel.scene}</h3>
                <p>{panel.caption}</p>
                <small>{panel.anchor}</small>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Interpretation({ stratagem }: { stratagem: Stratagem }) {
  return (
    <section className="interpretation" aria-labelledby="interpretation-title">
      <div className="section-heading">
        <h2 id="interpretation-title">从计名，到可判断的五层结构</h2>
        <p>每一计都必须同时说明成立条件、伦理边界与识别反制。</p>
      </div>
      <dl className="layer-list">
        {stratagem.interpretation.map((layer, index) => (
          <div key={layer.label}>
            <dt><span>{String(index + 1).padStart(2, "0")}</span>{layer.label}</dt>
            <dd>{layer.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function ModernUses({ stratagem }: { stratagem: Stratagem }) {
  return (
    <section className="modern-uses" aria-labelledby="modern-title">
      <div className="section-heading">
        <h2 id="modern-title">何时最值得想起它</h2>
        <p>从学生、日常到职场，迁移的是判断机制，不是照搬古代行为。</p>
      </div>
      <div className="use-list">
        {stratagem.modernUses.map((use) => (
          <article key={use.audience}>
            <span>{use.audience}</span>
            <h3>{use.title}</h3>
            <p>{use.insight}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Review({ option, stratagem }: { option: ScenarioOption; stratagem: Stratagem }) {
  const reviews = [
    option.recommended
      ? "你找到了能改变后续选择的关键变量。"
      : "这个选择回应了表面压力，但还需检查真正的控制变量。",
    "谁承担行动成本、谁拥有决定权，仍要明确写进方案。",
    option.recommended
      ? "方案保留了核验、交接或停止条件，风险较可控。"
      : "先补全事实、程序与伦理边界，再扩大行动。",
    option.recommended
      ? "结果不理想时仍能退回、调整或转向。"
      : "一旦产生名誉、时间或资源损失，部分后果可能难以撤回。",
  ];

  return (
    <div className="review" aria-labelledby="review-title">
      <div className="review__lead" role="status" aria-live="polite">
        <span>推演结果</span>
        <h3 id="review-title">你选择了“{option.title}”</h3>
        <p>{option.consequence}</p>
      </div>
      <ol>
        {stratagem.scenario.reviewDimensions.map((dimension, index) => (
          <li key={dimension}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h4>{dimension}</h4>
              <p>{reviews[index]}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="review__note">
        这不是标准答案。请再问：如果关键事实改变，我会不会换一个选择？
      </p>
    </div>
  );
}

function Training({ stratagem }: { stratagem: Stratagem }) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const selectedOption = stratagem.scenario.options.find(({ id }) => id === selectedOptionId);

  return (
    <section className="training" id="training" aria-labelledby="training-title">
      <div className="training__heading">
        <div>
          <span>识局 → 选择 → 推演 → 复盘</span>
          <h2 id="training-title">练一局：{stratagem.scenario.title}</h2>
        </div>
        <p>静态分支原型 · 未连接生成式 AI</p>
      </div>
      <div className="training__brief">
        <p>{stratagem.scenario.context}</p>
        <div>
          <h3>已知事实</h3>
          <ul>
            {stratagem.scenario.facts.map((fact) => <li key={fact}>{fact}</li>)}
          </ul>
        </div>
      </div>
      <fieldset className="decision-set">
        <legend>你会先做什么？</legend>
        <div className="decision-grid">
          {stratagem.scenario.options.map((option, index) => {
            const active = selectedOptionId === option.id;
            return (
              <button
                className="decision-option"
                data-active={active}
                data-state={active ? "success" : "idle"}
                key={option.id}
                onClick={() => setSelectedOptionId(option.id)}
                type="button"
                aria-pressed={active}
              >
                <span>{String.fromCharCode(65 + index)}</span>
                <strong>{option.title}</strong>
                <small>{option.action}</small>
              </button>
            );
          })}
        </div>
      </fieldset>
      {selectedOption ? <Review option={selectedOption} stratagem={stratagem} /> : (
        <p className="decision-prompt">选择一个起手动作，查看它可能带来的下一层局势。</p>
      )}
    </section>
  );
}

function Sources({ stratagem }: { stratagem: Stratagem }) {
  return (
    <section className="sources" aria-labelledby="sources-title">
      <div className="section-heading section-heading--compact">
        <h2 id="sources-title">来源与可信度</h2>
        <p>标签说明内容性质，不把后世概括、小说情节与史料混在一起。</p>
      </div>
      <ul>
        {stratagem.sources.map((source) => (
          <li key={source.href}>
            <SourceBadge type={source.type} />
            <a href={source.href} target="_blank" rel="noreferrer">{source.title}</a>
            <span>{source.note}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function GuidePanel({ onSelect }: { onSelect: (id: string) => void }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<ReturnType<typeof createLocalGuideResponse> | null>(null);
  return <section className="guide-panel" aria-labelledby="guide-title">
    <div><span>本地检索导览</span><h2 id="guide-title">把困惑变成一个可判断的问题</h2></div>
    <p>导览只检索本馆已编内容，不伪装成通用生成式 AI；模糊问题会先要求补充条件。</p>
    <form onSubmit={(event) => { event.preventDefault(); setAnswer(createLocalGuideResponse(question)); }}>
      <label><span>描述你想理解的局势</span><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="例如：项目资源不足时怎样调整？" /></label>
      <button type="submit">开始导览</button>
    </form>
    {answer && <div className="guide-answer" role="status">
      <strong>{answer.answer}</strong>
      {answer.matches.map((match) => <button type="button" key={match.id} onClick={() => onSelect(match.id)}>{match.id} · {match.title}</button>)}
    </div>}
  </section>;
}

function GraphView({ onSelect }: { onSelect: (id: string) => void }) {
  return <section className="workspace page-shell">
    <div className="workspace-hero"><span>机制、近邻与反制</span><h1>计策关系图谱</h1><p>不是把三十六计排成一张名单，而是展示每一计与相邻策略、潜在反制之间的路径。</p></div>
    <div className="graph-grid">
      {stratagems.map((item) => <article key={item.id}>
        <button type="button" onClick={() => onSelect(item.id)}><span>{item.id}</span><strong>{item.title}</strong></button>
        <p>近邻 {item.relations.similar.join("、")} · 反制 {item.relations.counters.join("、")}</p>
      </article>)}
    </div>
  </section>;
}

function LearningCenter({ progress, onSelect }: { progress: ProgressState; onSelect: (id: string) => void }) {
  const totals = summarizeProgress(progress);
  return <section className="workspace page-shell">
    <div className="workspace-hero"><span>仅保存在本设备</span><h1>我的学习进度</h1><p>不要求账号，不收集姓名、学校或公司；清除浏览器数据会删除这份记录。</p></div>
    <div className="metric-grid"><article><strong>{totals.readCount}</strong><span>已读展品</span></article><article><strong>{totals.favoriteCount}</strong><span>收藏</span></article><article><strong>{totals.reviewCount}</strong><span>完成复盘</span></article></div>
    <div className="saved-list"><h2>最近阅读</h2>{progress.read.length ? progress.read.map((id) => { const item = stratagems.find((entry) => entry.id === id); return item && <button type="button" key={id} onClick={() => onSelect(id)}>{id} · {item.title}</button>; }) : <p>进入任一展品后，这里会出现本地学习记录。</p>}</div>
  </section>;
}

function TrainingLibrary({ onSelect }: { onSelect: (id: string) => void }) {
  const [audience, setAudience] = useState<TrainingAudience | "全部">("全部");
  const cases = audience === "全部" ? trainingCases : trainingCases.filter((item) => item.audience === audience);
  return <section className="workspace page-shell">
    <div className="workspace-hero"><span>24 个审核预设案例</span><h1>谋略训练场</h1><p>所有案例只使用预设事实和分支，不收集个人信息。出现安全、隐私或不可逆风险时，按停止条件结束推演。</p></div>
    <div className="filter-row" role="group" aria-label="按受众筛选训练案例">{(["全部", "学生", "大众", "职场"] as const).map((item) => <button type="button" aria-pressed={audience === item} key={item} onClick={() => setAudience(item)}>{item}</button>)}</div>
    <div className="case-grid">{cases.map((item) => <article key={item.id}><span>{item.audience} · 内部预览</span><h2>{item.title}</h2><p>{item.context}</p><button type="button" onClick={() => onSelect(item.stratagemId)}>进入对应展品训练</button><small>{item.stopCondition}</small></article>)}</div>
  </section>;
}

function TeacherStudio({ stratagem, progress }: { stratagem: Stratagem; progress: ProgressState }) {
  const card = createClassroomCard(stratagem);
  const report = createLearningReport(progress);
  const [showAnswers, setShowAnswers] = useState(card.showAnswers);
  return <section className="workspace page-shell">
    <div className="workspace-hero"><span>教师模式 · 无学生画像</span><h1>课堂活动卡</h1><p>围绕“识局—边界—反制”组织讨论，答案默认隐藏，报告只含匿名汇总。</p></div>
    <article className="teacher-card"><span>{stratagem.id} · {stratagem.title}</span><h2>{card.thesis}</h2><ol>{card.discussionPrompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ol><button type="button" onClick={() => setShowAnswers((value) => !value)}>{showAnswers ? "隐藏讨论提示" : "显示讨论提示"}</button>{showAnswers && <p role="status">建议从控制变量、受影响的人、伦理边界和可逆性四个方向追问，不提供唯一标准答案。</p>}<aside><strong>安全边界</strong><p>{card.safetyBoundary}</p></aside></article>
    <pre aria-label="匿名学习报告">{JSON.stringify(report, null, 2)}</pre>
  </section>;
}

function AdminStudio() {
  return <section className="workspace page-shell">
    <div className="workspace-hero"><span>编辑—复核—发布</span><h1>内容审核台</h1><p>角色分权、状态约束、版本比较与追加式审计均由领域契约保护；此界面是本地演示，不会向远端发布。</p></div>
    <div className="governance-flow"><article><span>01</span><h2>编辑草稿</h2><p>33 条内部预览内容</p></article><article><span>02</span><h2>复核中</h2><p>3 条概念验证内容</p></article><article><span>03</span><h2>正式发布</h2><p>须由发布者明确批准</p></article></div>
    <table><caption>当前内容状态</caption><thead><tr><th>计策</th><th>状态</th><th>证据</th></tr></thead><tbody>{stratagems.map((item) => <tr key={item.id}><td>{item.id} · {item.title}</td><td>{item.status === "content_review" ? "内容审核中" : "编辑草稿"}</td><td>{item.evidenceIds.length} 条</td></tr>)}</tbody></table>
  </section>;
}

export default function App() {
  const initialParams = useMemo(() => new URLSearchParams(typeof window === "undefined" ? "" : window.location.search), []);
  const continuationId = initialParams.get("continue");
  const kioskMode = initialParams.get("mode") === "kiosk";
  const validContinuation = stratagems.some((item) => item.id === continuationId) ? continuationId as string : null;
  const [selectedId, setSelectedId] = useState<Stratagem["id"]>(validContinuation ?? "02");
  const [view, setView] = useState<"museum" | "exhibit" | "graph" | "training" | "learning" | "teacher" | "admin">(validContinuation ? "exhibit" : "museum");
  const [progress, setProgress] = useState<ProgressState>(() =>
    typeof window === "undefined" || typeof window.localStorage?.getItem !== "function"
      ? createEmptyProgress()
      : parseProgress(window.localStorage.getItem(PROGRESS_STORAGE_KEY)),
  );
  const selected = useMemo(
    () => stratagems.find(({ id }) => id === selectedId) ?? stratagems[0],
    [selectedId],
  );

  useEffect(() => {
    if (typeof window.localStorage?.setItem === "function") {
      window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress]);

  useEffect(() => {
    if (!kioskMode) return;
    const controller = createIdleResetController({
      timeoutMs: 180_000,
      onReset: () => { setView("museum"); setSelectedId("02"); },
    });
    const activity = () => controller.activity();
    controller.start();
    for (const event of ["pointerdown", "keydown", "touchstart"] as const) window.addEventListener(event, activity);
    return () => {
      controller.dispose();
      for (const event of ["pointerdown", "keydown", "touchstart"] as const) window.removeEventListener(event, activity);
    };
  }, [kioskMode]);

  const speakSelected = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(`${selected.title}。${selected.thesis}。${selected.memoryLine}`);
    speech.lang = "zh-CN";
    window.speechSynthesis.speak(speech);
  };

  const selectExhibit = (id: Stratagem["id"]) => {
    setSelectedId(id);
    setView("exhibit");
    if (!kioskMode) setProgress((current) => markRead(current, id));
    requestAnimationFrame(() => {
      document.getElementById("exhibit-title")?.focus({ preventScroll: true });
    });
  };

  return (
    <>
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <header className="masthead" data-kiosk={kioskMode}>
        <p className="masthead__issue">响应式 Web · PWA · 展馆模式 · 2026</p>
        <button className="masthead__name" type="button" onClick={() => setView("museum")}>三十六计互动文化馆</button>
        {!kioskMode && <nav aria-label="主导航">
          <button type="button" onClick={() => setView("museum")}>六卷展馆</button>
          <button type="button" onClick={() => setView("graph")}>关系图谱</button>
          <button type="button" onClick={() => setView("training")}>训练场</button>
          <button type="button" onClick={() => setView("learning")}>学习中心</button>
          <button type="button" onClick={() => setView("teacher")}>教师工作台</button>
          <button type="button" onClick={() => setView("admin")}>内容管理</button>
        </nav>}
        {kioskMode && <p className="kiosk-label">展馆模式 · 3 分钟无操作自动返回首页</p>}
        <div className="masthead__rule" aria-hidden="true" />
      </header>

      <main id="main-content">
        {view === "museum" && <div id="exhibits" className="page-shell"><ExhibitSelector onSelect={selectExhibit} /><GuidePanel onSelect={selectExhibit} /></div>}
        {view === "exhibit" && <div id="exhibits" className="page-shell">
          <div className="exhibit-toolbar"><button type="button" onClick={() => setView("museum")}>← 返回六卷展馆</button><div><button type="button" onClick={speakSelected}>朗读本计</button>{!kioskMode && <button type="button" onClick={() => setProgress((current) => toggleFavorite(current, selected.id))}>{progress.favorites.includes(selected.id) ? "已收藏" : "收藏本计"}</button>}</div></div>
          <article className="exhibit-shell" key={selected.id}>
            <Hero stratagem={selected} />
            <ClassicScene stratagem={selected} />
            <ComicStrip stratagem={selected} />
            <Interpretation stratagem={selected} />
            <ModernUses stratagem={selected} />
            <Training stratagem={selected} />
            <div id="sources"><Sources stratagem={selected} /></div>
          </article>
        </div>}
        {view === "graph" && <GraphView onSelect={selectExhibit} />}
        {view === "training" && <TrainingLibrary onSelect={selectExhibit} />}
        {view === "learning" && <LearningCenter progress={progress} onSelect={selectExhibit} />}
        {view === "teacher" && <TeacherStudio stratagem={selected} progress={progress} />}
        {view === "admin" && <AdminStudio />}
        {kioskMode && view === "exhibit" && <aside className="kiosk-continuation" aria-label="手机续看">
          <QRCodeSVG value={`${window.location.origin}/?continue=${selected.id}`} size={112} title={`在手机上续看${selected.title}`} />
          <div><strong>手机续看</strong><p>扫码打开第 {selected.id} 计；二维码不包含学习记录或个人信息。</p></div>
        </aside>}
      </main>

      <footer className="footer">
        <p className="footer__name">三十六计互动文化馆</p>
        <p>读局势，也读边界。看见策略，更看见责任。</p>
        <div>
          <button type="button" onClick={() => setView("museum")}>返回展厅</button>
          <span>本地优先 · 内容状态逐条标注</span>
        </div>
      </footer>
    </>
  );
}

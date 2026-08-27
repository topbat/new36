import { useMemo, useState } from "react";

import { stratagems, type ScenarioOption, type Stratagem } from "./content/stratagems";

const chineseNumbers: Record<Stratagem["id"], string> = {
  "02": "第二计",
  "03": "第三计",
  "36": "第三十六计",
};

function SourceBadge({ type }: { type: string }) {
  return <span className="source-badge">{type}</span>;
}

function ExhibitSelector({
  selectedId,
  onSelect,
}: {
  selectedId: Stratagem["id"];
  onSelect: (id: Stratagem["id"]) => void;
}) {
  return (
    <section className="exhibit-index" aria-labelledby="exhibit-index-title">
      <div className="section-heading section-heading--compact">
        <h2 id="exhibit-index-title">三件先行展品</h2>
        <p>分别验证间接解局、伦理防御与败局止损。</p>
      </div>
      <div className="exhibit-tabs" role="group" aria-label="选择计策展厅">
        {stratagems.map((item) => {
          const active = item.id === selectedId;
          return (
            <button
              className="exhibit-tab"
              data-active={active}
              key={item.id}
              onClick={() => onSelect(item.id)}
              type="button"
              aria-pressed={active}
            >
              <span className="exhibit-tab__number">{item.id}</span>
              <span>
                <small>{chineseNumbers[item.id]} · {item.chapter}</small>
                <strong>{item.title}</strong>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Hero({ stratagem }: { stratagem: Stratagem }) {
  return (
    <section className="hero" aria-labelledby="exhibit-title">
      <div className="hero__copy">
        <p className="hero__kicker">{chineseNumbers[stratagem.id]} · {stratagem.chapter}</p>
        <h1 id="exhibit-title" tabIndex={-1}>{stratagem.title}</h1>
        <p className="hero__pinyin">{stratagem.pinyin}</p>
        <p className="hero__thesis">{stratagem.thesis}</p>
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
        <h2 id="comic-title">四格看清局势转向</h2>
        <p>这不是史实复原图，而是从八格脚本压缩出的交互分镜。</p>
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

export default function App() {
  const [selectedId, setSelectedId] = useState<Stratagem["id"]>("02");
  const selected = useMemo(
    () => stratagems.find(({ id }) => id === selectedId) ?? stratagems[0],
    [selectedId],
  );

  const selectExhibit = (id: Stratagem["id"]) => {
    setSelectedId(id);
    requestAnimationFrame(() => {
      document.getElementById("exhibit-title")?.focus({ preventScroll: true });
    });
  };

  return (
    <>
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <header className="masthead">
        <p className="masthead__issue">试展第壹期 · 三件先行展品 · 2026</p>
        <p className="masthead__name">三十六计互动文化馆</p>
        <nav aria-label="主导航">
          <a href="#exhibits">看展</a>
          <a href="#training">练一局</a>
          <a href="#sources">查来源</a>
        </nav>
        <div className="masthead__rule" aria-hidden="true" />
      </header>

      <main id="main-content">
        <div id="exhibits" className="page-shell">
          <ExhibitSelector selectedId={selectedId} onSelect={selectExhibit} />
          <article className="exhibit-shell" key={selected.id}>
            <Hero stratagem={selected} />
            <ClassicScene stratagem={selected} />
            <ComicStrip stratagem={selected} />
            <Interpretation stratagem={selected} />
            <ModernUses stratagem={selected} />
            <Training stratagem={selected} />
            <div id="sources"><Sources stratagem={selected} /></div>
          </article>
        </div>
      </main>

      <footer className="footer">
        <p className="footer__name">三十六计互动文化馆</p>
        <p>读局势，也读边界。看见策略，更看见责任。</p>
        <div>
          <a href="#exhibits">返回展厅</a>
          <span>概念验证 · 内容待专家审核</span>
        </div>
      </footer>
    </>
  );
}

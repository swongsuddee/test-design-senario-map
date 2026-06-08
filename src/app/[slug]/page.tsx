import { notFound } from 'next/navigation';
import FlowSection from '@/client/components/FlowSection';
import ScenarioSection from '@/client/components/ScenarioSection';
import ClarifySection from '@/client/components/ClarifySection';
import RequirementSection from '@/client/components/RequirementSection';
import { getDb } from '@/db/client';
import {
  getStory,
  getHero,
  getMetaCards,
  getTechniqueRows,
  getCoverageRows,
  getCoverageStatCards,
  getCoverageNote,
  getMissingCoverage,
  getTestDataRows,
  getAutomationCards,
  getScenarioSections,
  getContractEndpoints,
} from '@/db/queries/story';
import {
  FLOWS_REGISTRY,
  TC_REGISTRY,
  CONFLICT_REGISTRY,
  SCENARIO_DATA,
  SCENARIOMAP_META,
} from '@/data/registry';

function B({ cls, label }: { cls: string; label: string }) {
  return <span className={`badge badge-${cls}`}>{label}</span>;
}

function SectionHeader({ num, title, subtitle }: { num: string; title: string; subtitle?: string }) {
  return (
    <div className="section-header">
      <div className="section-number">{num}</div>
      <div className="section-title">{title}</div>
      {subtitle && <div className="section-subtitle">{subtitle}</div>}
    </div>
  );
}

export default async function DynamicStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = await getDb();

  const story = getStory(db, slug);
  if (!story) notFound();
  const storyId = story.id;

  // ── DB data ────────────────────────────────────────────────────────────────
  const hero              = getHero(db, storyId);
  const metaCards         = getMetaCards(db, storyId);
  const techniqueRows     = getTechniqueRows(db, storyId);
  const coverageRows      = getCoverageRows(db, storyId);
  const coverageStatCards = getCoverageStatCards(db, storyId);
  const coverageNote      = getCoverageNote(db, storyId);
  const missingCoverage   = getMissingCoverage(db, storyId);
  const testDataRows      = getTestDataRows(db, storyId);
  const automationCards   = getAutomationCards(db, storyId);
  const scenarioSectionsMeta = getScenarioSections(db, storyId);
  const contractEndpoints = getContractEndpoints(db, storyId);

  // ── TypeScript modules ─────────────────────────────────────────────────────
  const flowsModule     = await FLOWS_REGISTRY[slug]?.();
  const tcModule        = await TC_REGISTRY[slug]?.();
  const conflictsModule = await CONFLICT_REGISTRY[slug]?.();

  // ── Scenario data ──────────────────────────────────────────────────────────
  // Case 1: DB-driven multi-section (pp2 — uses story_scenario_section rows)
  const scenarioDataMap: Record<string, { SM_NODES: any[]; SM_EDGES: any[]; SM_SCENARIOS: any[] }> = {};
  for (const sec of scenarioSectionsMeta) {
    const loader = SCENARIO_DATA[slug]?.[sec.dataKey];
    if (loader) scenarioDataMap[sec.dataKey] = await loader();
  }

  // Case 2: Registry-driven single section (all other stories with scenariomap.ts)
  const smapMeta   = scenarioSectionsMeta.length === 0 ? SCENARIOMAP_META[slug] : undefined;
  const smapLoader = smapMeta ? SCENARIO_DATA[slug]?.['scenariomap'] : undefined;
  const smapData   = smapLoader ? await smapLoader() : null;

  const tcMeta = tcModule?.TC_SECTIONS.flatMap((s: any) => s.rows) ?? [];

  const hasNewTcs = coverageRows.some(r => r.newTc != null);
  const hasMissing = missingCoverage.length > 0;

  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">{hero.badge}</div>
        <h2><span>{storyId}</span> · {story.title}</h2>
        <p>{hero.description}</p>
        <div className="hero-stats">
          {hero.stats.map(([v, l]) => (
            <div key={l} className="stat">
              <div className="stat-value">{v}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Meta cards */}
      <div className="meta-grid">
        {metaCards.map(({ label, value, cls }) => (
          <div key={label} className="meta-card">
            <div className="meta-label">{label}</div>
            <div className={`meta-value${cls ? ` ${cls}` : ''}`}>{value}</div>
          </div>
        ))}
      </div>

      {/* Endpoint Contract (API pages) */}
      {contractEndpoints.length > 0 && (
        <section className="section" id="contract">
          <SectionHeader num="0" title="Endpoint Contract" />
          <div className="table-wrap">
            <table>
              <thead><tr><th>Method</th><th>Path</th><th>Request Fields</th><th>Response Fields</th></tr></thead>
              <tbody>
                {contractEndpoints.map(({ method, path, reqNote, resNote, methodCls }) => (
                  <tr key={path}>
                    <td><B cls={methodCls ?? (method === 'GET' ? 'blue' : 'green')} label={method} /></td>
                    <td><code>{path}</code></td>
                    <td><code>{reqNote}</code></td>
                    <td style={{ fontSize: 12 }}>{resNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* A — Technique Selection */}
      {techniqueRows.length > 0 && (
        <section className="section" id="techniques">
          <SectionHeader num="A" title="Technique Selection" />
          <div className="table-wrap">
            <table className="tech-table">
              <thead><tr><th>Module</th><th>Technique(s)</th><th>Rationale</th></tr></thead>
              <tbody>
                {techniqueRows.map(row => (
                  <tr key={row.module}>
                    <td>{row.module}</td>
                    <td>{row.badges.map(([c, l]) => <B key={c} cls={c} label={l} />)}</td>
                    <td>{row.rationale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* B — Coverage Summary */}
      {coverageRows.length > 0 && (
        <section className="section" id="coverage">
          <SectionHeader num="B" title="Coverage Summary" subtitle={coverageNote.subtitle} />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Module</th>
                  <th>Technique(s)</th>
                  <th>{hasNewTcs ? 'Existing TCs' : 'TCs'}</th>
                  {hasNewTcs && <th>New TCs</th>}
                  <th>Risk</th>
                  <th>Coverage %</th>
                </tr>
              </thead>
              <tbody>
                {coverageRows.map(row => (
                  <tr key={row.mod}>
                    <td>{row.mod}</td>
                    <td>{row.badges.map(([c, l]) => <B key={c} cls={c} label={l} />)}</td>
                    <td>{row.existing}</td>
                    {hasNewTcs && <td>{row.newTc ? <B cls="new" label={row.newTc} /> : '—'}</td>}
                    <td><B cls={row.risk[0]} label={row.risk[1]} /></td>
                    <td>
                      <div className="cov-bar-wrap">
                        <div className="cov-bar" style={{ width: `${row.pct}px` }} />
                        <span className="cov-pct">{row.pct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr style={{ background: 'rgba(255,107,53,.05)' }}>
                  <td><strong>Total</strong></td>
                  <td />
                  <td><strong>{coverageNote.origTotal}</strong></td>
                  {hasNewTcs && <td><strong>{coverageNote.newTotal}</strong></td>}
                  <td />
                  <td>
                    <strong>
                      {hasNewTcs
                        ? `${Number(coverageNote.origTotal) + Number(coverageNote.newTotal)} TCs`
                        : `${coverageNote.origTotal} TCs`}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Flow diagrams */}
      {flowsModule?.MASTER_FLOW_SECTION && (
        <>
          <FlowSection def={flowsModule.MASTER_FLOW_SECTION} />
          {flowsModule.FLOW_SECTIONS.filter(Boolean).map((def: any) => (
            <FlowSection key={def.sectionId} def={def} />
          ))}
        </>
      )}

      {/* C — Coverage Report */}
      {coverageStatCards.length > 0 && (
        <section className="section" id="coverage-map">
          <SectionHeader num="C" title="Coverage Report" subtitle="States × Transitions × Test Cases" />
          <div className="coverage-summary">
            {coverageStatCards.map(({ cls, num, lbl }) => (
              <div key={lbl} className={`cov-card ${cls}`}>
                <div className="num">{num}</div>
                <div className="lbl">{lbl}</div>
              </div>
            ))}
          </div>
          {hasMissing && (
            <div style={{ marginBottom: 16 }}>
              {missingCoverage.map(msg => (
                <div key={msg} className="missing-badge" style={{ borderColor: 'rgba(244,67,54,.4)', background: 'rgba(244,67,54,.08)' }}>
                  <strong>{msg.split('·')[0]}</strong>·{msg.split('·').slice(1).join('·')}
                </div>
              ))}
            </div>
          )}
          {coverageNote.recommendation && (
            <div style={{
              background: hasMissing ? 'rgba(33,150,243,.07)' : 'rgba(76,175,80,.07)',
              border: hasMissing ? '1px solid rgba(33,150,243,.2)' : '1px solid rgba(76,175,80,.2)',
              borderRadius: 8, padding: '14px 18px', fontSize: 13,
            }}>
              <strong style={{ color: hasMissing ? 'var(--blue)' : 'var(--green)' }}>
                {hasMissing ? 'Recommendation:' : 'Full Coverage:'}
              </strong>{' '}
              {coverageNote.recommendation}
            </div>
          )}
        </section>
      )}

      {/* D — Automation Notes */}
      {automationCards.length > 0 && (
        <section className="section" id="automation">
          <SectionHeader num="D" title="Automation Notes" />
          <div className="note-grid">
            {automationCards.map(card => (
              <div key={card.title} className="note-card">
                {/* eslint-disable-next-line react/no-danger */}
                <h4 dangerouslySetInnerHTML={{ __html: card.title }} />
                <ul>
                  {card.items.map((item, i) => (
                    // eslint-disable-next-line react/no-danger
                    <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* E — Test Data */}
      {testDataRows.length > 0 && (
        <section className="section" id="testdata">
          <SectionHeader num="E" title="Test Data Requirements" />
          <div className="table-wrap">
            <table>
              <thead><tr><th>Data</th><th>Value / Source</th></tr></thead>
              <tbody>
                {testDataRows.map(([data, source]) => (
                  <tr key={data}><td>{data}</td><td><code>{source}</code></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Scenario Maps — DB sections (pp2: multiple modules keyed by data_key) */}
      {scenarioSectionsMeta.map(section => {
        const data = scenarioDataMap[section.dataKey];
        if (!data) return null;
        return (
          <ScenarioSection
            key={section.id}
            sectionId={`smap-${section.dataKey}`}
            sectionLetter={section.letter}
            title={section.title}
            subtitle={section.subtitle}
            overviewTitle={section.overviewTitle}
            techniqueBadge={section.techniqueBadge}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            nodes={data.SM_NODES as any}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            edges={data.SM_EDGES as any}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            scenarios={data.SM_SCENARIOS as any}
            tcMeta={tcMeta}
          />
        );
      })}

      {/* Scenario Map — registry section (all other stories with scenariomap.ts) */}
      {smapMeta && smapData && (
        <ScenarioSection
          sectionId={smapMeta.sectionId}
          sectionLetter={smapMeta.letter}
          title={smapMeta.title}
          subtitle={smapMeta.subtitle}
          overviewTitle={smapMeta.overviewTitle}
          techniqueBadge={smapMeta.techniqueBadge}
          overviewOpts={smapMeta.overviewOpts}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          nodes={smapData.SM_NODES as any}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          edges={smapData.SM_EDGES as any}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          scenarios={smapData.SM_SCENARIOS as any}
          tcMeta={tcMeta}
        />
      )}

      {/* Conflicts & Clarify */}
      {conflictsModule && (
        <section className="section" id="conflict-notes">
          <div className="section-header">
            <div className="section-title">Requirement Clarifications &amp; Conflicts</div>
            <div className="section-subtitle">
              {conflictsModule.CONFLICT_ITEMS.length} item{conflictsModule.CONFLICT_ITEMS.length !== 1 ? 's' : ''}
            </div>
          </div>
          <ClarifySection items={conflictsModule.CONFLICT_ITEMS} />
        </section>
      )}

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story={storyId} />
      </section>
    </>
  );
}

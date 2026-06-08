import FlowSection from '@/client/components/FlowSection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp268/flows';
import { TC_SECTIONS } from '@/data/pp268/testcases';
import RequirementSection from '@/client/components/RequirementSection';
import ScenarioSection from '@/client/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp268/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-268',                       cls: 'blue'   },
  { label: 'Platform',    value: 'Mobile (iOS / Android)',        cls: ''       },
  { label: 'Framework',   value: 'WebdriverIO + Appium + Mocha',  cls: ''       },
  { label: 'Language',    value: 'TypeScript',                    cls: ''       },
  { label: 'App',         value: 'POPPA Flutter App',             cls: ''       },
  { label: 'Status',      value: 'Ready To Test STG',             cls: 'green'  },
  { label: 'Subtask',     value: 'PP-268 (QA)',                   cls: 'blue'   },
];

const TECHNIQUE_ROWS = [
  {
    module: 'Event Detail field rendering',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'AC 1.1 enumerates 6 required fields; verify each is present and non-empty.',
  },
  {
    module: 'CTA button type',
    badges: [['dt', 'DT']] as [string, string][],
    rationale: 'Event type (Free / Paid) × Registration state (new / registered / sold out) → CTA variants.',
  },
  {
    module: 'Participant list display',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'AC 2.1 requires only confirmed participants; AC 2.2 requires API integration.',
  },
  {
    module: 'API error handling',
    badges: [['manual', 'Error Guessing']] as [string, string][],
    rationale: 'Network failure → error state; empty event → handle gracefully.',
  },
  {
    module: 'CTA registration state',
    badges: [['st', 'ST']] as [string, string][],
    rationale: 'States: enabled → registered → disabled (sold out).',
  },
];

const COVERAGE_ROWS = [
  { mod: 'Event Detail page load',        badges: [['ep', 'Spec']] as [string, string][],              existing: 'PP268-TC-001',       newTc: null, risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Event Detail field rendering',  badges: [['ep', 'Spec']] as [string, string][],              existing: 'PP268-TC-002–003',   newTc: null, risk: ['high', 'High'] as [string, string],   pct: 97 },
  { mod: 'Event Detail ticket types',     badges: [['ep', 'Spec']] as [string, string][],              existing: 'PP268-TC-004',       newTc: null, risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'CTA Free event Join',           badges: [['dt', 'DT'], ['st', 'ST']] as [string, string][], existing: 'PP268-TC-005',       newTc: null, risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'CTA Paid event Buy Ticket',     badges: [['dt', 'DT'], ['st', 'ST']] as [string, string][], existing: 'PP268-TC-006',       newTc: null, risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'CTA Already registered',        badges: [['st', 'ST']] as [string, string][],               existing: 'PP268-TC-007',       newTc: null, risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'CTA Sold out',                  badges: [['st', 'ST'], ['dt', 'DT']] as [string, string][], existing: 'PP268-TC-008',       newTc: null, risk: ['medium', 'Medium'] as [string, string], pct: 90 },
  { mod: 'Event Detail API error',        badges: [['manual', 'EG']] as [string, string][],           existing: 'PP268-TC-009',       newTc: null, risk: ['medium', 'Medium'] as [string, string], pct: 90 },
  { mod: 'Participant list confirmed',    badges: [['ep', 'Spec']] as [string, string][],              existing: 'PP268-TC-010',       newTc: null, risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Participant list rows',         badges: [['ep', 'Spec']] as [string, string][],              existing: 'PP268-TC-011',       newTc: null, risk: ['high', 'High'] as [string, string],   pct: 90 },
  { mod: 'Participant list empty',        badges: [['manual', 'EG']] as [string, string][],           existing: 'PP268-TC-012',       newTc: null, risk: ['medium', 'Medium'] as [string, string], pct: 90 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '18',   lbl: 'Total States'      },
  { cls: 'blue',  num: '14',   lbl: 'Total Transitions' },
  { cls: 'green', num: '100%', lbl: 'Covered'           },
  { cls: 'red',   num: '0',    lbl: 'Missing'           },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['STG user account',                   'Valid end-user credentials (iOS + Android)'],
  ['STG free event',                     'Published free event with available slots; user NOT yet registered'],
  ['STG paid event',                     'Published paid event with available tickets; user NOT yet registered'],
  ['STG event fully populated',          'Event with name, date, time, location, image, description all set'],
  ['STG event already registered',       'Same user pre-registered via API before TC-007 runs'],
  ['STG event sold out',                 'Event with 0 remaining slots (seeded via API or capacity set to current count)'],
  ['STG event confirmed participants',   'Event with 2+ participants in confirmed status'],
  ['STG event no confirmed participants','Event with 0 confirmed participants'],
  ['API error simulation',               'STG proxy / mitmproxy to force 5xx on GET /events/{id} (TC-009)'],
];

// ── Badge helper ──────────────────────────────────────────────────────────────
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

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PP268Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-268</span> · Event Detail (Mobile App)</h2>
        <p>Test design for the POPPA Mobile App Event Detail screen — covering field rendering, CTA button states, participant list, and API error handling for iOS and Android end-users.</p>
        <div className="hero-stats">
          {[['12','Test Cases'],['32','States & Transitions'],['100%','Coverage'],['10','Automatable']].map(([v, l]) => (
            <div key={l} className="stat">
              <div className="stat-value">{v}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Meta cards */}
      <div className="meta-grid">
        {META_CARDS.map(({ label, value, cls }) => (
          <div key={label} className="meta-card">
            <div className="meta-label">{label}</div>
            <div className={`meta-value${cls ? ` ${cls}` : ''}`}>{value}</div>
          </div>
        ))}
      </div>

      {/* A — Technique Selection */}
      <section className="section" id="techniques">
        <SectionHeader num="A" title="Technique Selection" subtitle="5 modules · 4 techniques" />
        <div className="table-wrap">
          <table className="tech-table">
            <thead><tr><th>Module</th><th>Technique(s)</th><th>Rationale</th></tr></thead>
            <tbody>
              {TECHNIQUE_ROWS.map(row => (
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

      {/* B — Coverage Summary */}
      <section className="section" id="coverage">
        <SectionHeader num="B" title="Coverage Summary" subtitle="12 TCs · 0 new" />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Module</th><th>Technique(s)</th><th>Existing TCs</th><th>New TCs</th><th>Risk</th><th>Coverage %</th></tr></thead>
            <tbody>
              {COVERAGE_ROWS.map(row => (
                <tr key={row.mod}>
                  <td>{row.mod}</td>
                  <td>{row.badges.map(([c, l]) => <B key={c} cls={c} label={l} />)}</td>
                  <td>{row.existing}</td>
                  <td>{row.newTc ? <B cls="new" label={row.newTc} /> : '—'}</td>
                  <td><B cls={row.risk[0]} label={row.risk[1]} /></td>
                  <td><div className="cov-bar-wrap"><div className="cov-bar" style={{ width: `${row.pct}px` }} /><span className="cov-pct">{row.pct}%</span></div></td>
                </tr>
              ))}
              <tr style={{ background: 'rgba(255,107,53,.05)' }}>
                <td><strong>Total</strong></td><td /><td><strong>12</strong></td><td><strong>—</strong></td><td /><td><strong>12 TCs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 1 — Master flow */}
      <FlowSection def={MASTER_FLOW_SECTION} />

      {/* 2–4 — Sub-flows */}
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* 6–9 — TC sections */}

      {/* C — Coverage Report */}
      <section className="section" id="coverage-map">
        <SectionHeader num="C" title="Coverage Report" subtitle="States × Transitions × Test Cases" />
        <div className="coverage-summary">
          {COVERAGE_STAT_CARDS.map(({ cls, num, lbl }) => (
            <div key={lbl} className={`cov-card ${cls}`}><div className="num">{num}</div><div className="lbl">{lbl}</div></div>
          ))}
        </div>
        <div style={{ marginBottom: 16 }}>
          <div className="missing-badge" style={{ borderColor: 'rgba(76,175,80,.4)', background: 'rgba(76,175,80,.08)' }}>
            <strong>Full coverage achieved.</strong> All 18 states and 14 transitions are exercised by TC-001–012. No missing paths.
          </div>
        </div>
        <div style={{ background: 'rgba(33,150,243,.07)', border: '1px solid rgba(33,150,243,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13 }}>
          <strong style={{ color: 'var(--blue)' }}>Note:</strong> TC-008 requires a STG event seeded at full capacity. TC-009 requires a network proxy (e.g., mitmproxy) to force a 5xx response on GET /events/&#123;id&#125;.
        </div>
      </section>

      {/* D — Automation Notes */}
      <section className="section" id="automation">
        <SectionHeader num="D" title="Automation Notes" />
        <div className="note-grid">
          <div className="note-card">
            <h4>Framework &amp; Spec</h4>
            <ul>
              <li><code>WebdriverIO + Appium + Mocha</code></li>
              <li>Spec: <code>src/test/mobile/event/PP-268.event-detail.mobile.ts</code></li>
              <li>Automatable: TC-001–007, TC-010–012 via Appium + API pre-seeding</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Platform Notes</h4>
            <ul>
              <li>Run on both iOS and Android</li>
              <li>Flag platform-specific rendering differences in TC-002</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Manual / Partial</h4>
            <ul>
              <li><strong>TC-008</strong> — Requires data seeding at capacity (sold-out event)</li>
              <li><strong>TC-009</strong> — Requires network mock / mitmproxy to force API 5xx</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Regression Trigger</h4>
            <ul>
              <li>Run before every STG release touching event detail API</li>
              <li>Run when mobile event detail screen changes</li>
              <li>Run when participant list API changes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* E — Test Data */}
      <section className="section" id="testdata">
        <SectionHeader num="E" title="Test Data Requirements" />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Data</th><th>Value / Source</th></tr></thead>
            <tbody>
              {TEST_DATA_ROWS.map(([data, source]) => (
                <tr key={data}><td>{data}</td><td><code>{source}</code></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* F — Scenario Map */}
      <ScenarioSection
        sectionId="smap-main"
        sectionLetter="F"
        title="Scenario Map — Event Detail Mobile"
        subtitle="DAG path per test case · TC-001–012"
        overviewTitle="Event Detail Mobile Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
        tcMeta={TC_SECTIONS.flatMap(s => s.rows)}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-268" />
      </section>
    </>
  );
}

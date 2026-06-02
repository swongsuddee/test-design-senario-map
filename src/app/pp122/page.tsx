import FlowSection from '@/components/FlowSection';
import TcSection from '@/components/TcSection';
import ClarifySection from '@/components/ClarifySection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp122/flows';
import { TC_SECTIONS } from '@/data/pp122/testcases';
import { CONFLICT_ITEMS } from '@/data/pp122/conflicts';
import RequirementSection from '@/components/RequirementSection';
import ScenarioSection from '@/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp122/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-122',                       cls: 'blue'  },
  { label: 'Platform',    value: 'Mobile (iOS)',                  cls: ''      },
  { label: 'Framework',   value: 'WebdriverIO + Appium + Mocha',  cls: ''      },
  { label: 'Language',    value: 'TypeScript',                    cls: ''      },
  { label: 'App',         value: 'POPPA Flutter App',             cls: ''      },
  { label: 'Status',      value: 'Ready To Test STG',             cls: 'green' },
  { label: 'Subtask',     value: 'PP-125 (QA)',                   cls: 'blue'  },
];

const TECHNIQUE_ROWS = [
  { module: 'Card Layout — Image presence',  badges: [['dt', 'Decision Table']] as [string, string][],                       rationale: 'Two conditions: Image present (Yes/No) × Badge count (>0 / 0) → 4 combinations drive layout variants.' },
  { module: 'Card Layout — Font Hierarchy',  badges: [['manual', 'Specification-based']] as [string, string][],              rationale: 'AC1 specifies fixed font-weight mapping; verify each element type.' },
  { module: 'Notification Stacking',         badges: [['st', 'State Transition']] as [string, string][],                     rationale: 'States: single card → stacked → expanded. Trigger: 2nd notification from same app.' },
  { module: 'Deep Link Routing',             badges: [['st', 'State Transition'], ['dt', 'Decision Table']] as [string, string][], rationale: 'Route resolved (Yes/No) → 2 outcomes.' },
  { module: 'Timestamp Format',              badges: [['bva', 'BVA']] as [string, string][],                                  rationale: 'Three regions: < 1h, 1–23h, ≥ 24h — boundaries at 60 min and 24 h.' },
];

const COVERAGE_ROWS = [
  { mod: 'Card Layout — Icon + Badge', badges: [['dt', 'DT']] as [string, string][],               existing: 'PP122-TC-001–002', risk: ['high', 'High']   as [string, string], pct: 95 },
  { mod: 'Card Layout — Image Presence', badges: [['dt', 'DT']] as [string, string][],             existing: 'PP122-TC-003–006', risk: ['high', 'High']   as [string, string], pct: 97 },
  { mod: 'Font Hierarchy', badges: [['manual', 'Spec-based']] as [string, string][],               existing: 'PP122-TC-005–006', risk: ['medium', 'Medium'] as [string, string], pct: 90 },
  { mod: 'Notification Stacking', badges: [['st', 'ST']] as [string, string][],                    existing: 'PP122-TC-007–009', risk: ['high', 'High']   as [string, string], pct: 95 },
  { mod: 'Deep Link Interaction', badges: [['st', 'ST'], ['dt', 'DT']] as [string, string][],      existing: 'PP122-TC-010–012', risk: ['high', 'High']   as [string, string], pct: 95 },
  { mod: 'Timestamp Display', badges: [['bva', 'BVA']] as [string, string][],                      existing: 'PP122-TC-013–015', risk: ['medium', 'Medium'] as [string, string], pct: 97 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '25', lbl: 'Total States'      },
  { cls: 'blue',  num: '17', lbl: 'Total Transitions' },
  { cls: 'green', num: '42', lbl: 'Covered'           },
  { cls: 'green', num: '0',  lbl: 'Missing'           },
];

const AUTOMATION_CARDS = [
  {
    title: 'Framework & Spec',
    items: [
      'WebdriverIO + Appium + Mocha',
      'Spec (future): src/test/mobile/notifications/PP-122.push-notification-ui.mobile.ts',
      'All 15 test cases require manual execution on a physical iOS device',
    ],
  },
  {
    title: 'Lock Screen Constraints',
    items: [
      'Lock Screen UI is a system-level iOS surface not accessible via Appium',
      'Badge rendering is a native iOS system overlay',
      'Notification Service Extension (image download) is outside app process scope',
      'Deep link tap on Lock Screen requires device unlock — cannot be automated',
    ],
  },
  {
    title: 'Partial Automation Scope',
    items: [
      'TC-001–006: POST /push API call to trigger notification payload (API-level)',
      'TC-010–012: API-level trigger only; UI assertion on Lock Screen is manual',
    ],
  },
  {
    title: 'Manual Priority',
    items: [
      'Run before every STG release touching push notification payload structure',
      'Run when Notification Service Extension is modified',
      'Physical iPhone required — iOS Simulator does not reproduce Lock Screen behaviour',
    ],
  },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['Test device',                  'Physical iOS device (iPhone) — Lock Screen not reproducible on Simulator'],
  ['STG push trigger',             'Backend API or Firebase console → device token'],
  ['Push payload — with image',    'mutable-content: 1 + valid attachment-url pointing to public image'],
  ['Push payload — without image', 'Standard payload; no attachment-url field'],
  ['Push payload — badge count',   'badge = 1 for TC-001; badge = 0 for TC-002'],
  ['Deep link — Event Detail',     'poppa://event/{eventId} — use valid STG event ID'],
  ['Deep link — Profile',          'poppa://profile/{userId} — use valid STG user ID'],
  ['Deep link — Home',             'poppa://home'],
  ['Deep link — Unknown',          'poppa://unknown/does-not-exist'],
  ['Timestamp — fresh',            'Send push and observe within 5 min'],
  ['Timestamp — 1h+',              'Send push, wait ≥ 1 hour, or advance device clock'],
  ['Timestamp — 24h+',             'Send push previous day, or advance device clock by 24+ hours'],
];

// ── Badge helper ────────────────────────────────────────────────────────────────
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
export default function PP122Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-122</span> · Push Notification UI</h2>
        <p>End-to-end test design for the POPPA iOS Push Notification UI — covering Lock Screen card layout, icon badge, notification stacking, deep link routing, and timestamp display.</p>
        <div className="hero-stats">
          {[['15', 'Test Cases'], ['42', 'States & Transitions'], ['100%', 'Coverage'], ['0', 'Automatable (UI)']].map(([v, l]) => (
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="15 TCs · 100% coverage" />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Module</th><th>Technique(s)</th><th>Existing TCs</th><th>Risk</th><th>Coverage %</th></tr></thead>
            <tbody>
              {COVERAGE_ROWS.map(row => (
                <tr key={row.mod}>
                  <td>{row.mod}</td>
                  <td>{row.badges.map(([c, l]) => <B key={c} cls={c} label={l} />)}</td>
                  <td>{row.existing}</td>
                  <td><B cls={row.risk[0]} label={row.risk[1]} /></td>
                  <td><div className="cov-bar-wrap"><div className="cov-bar" style={{ width: `${row.pct}px` }} /><span className="cov-pct">{row.pct}%</span></div></td>
                </tr>
              ))}
              <tr style={{ background: 'rgba(255,107,53,.05)' }}>
                <td><strong>Total</strong></td><td /><td><strong>15</strong></td><td /><td><strong>15 TCs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 1 — Master flow */}
      <FlowSection def={MASTER_FLOW_SECTION} />

      {/* 2–5 — Sub-flows */}
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* 6–9 — TC sections */}
      {TC_SECTIONS.map(def => <TcSection key={def.sectionId} def={def} />)}

      {/* C — Coverage Report */}
      <section className="section" id="coverage-map">
        <SectionHeader num="C" title="Coverage Report" subtitle="States × Transitions × Test Cases" />
        <div className="coverage-summary">
          {COVERAGE_STAT_CARDS.map(({ cls, num, lbl }) => (
            <div key={lbl} className={`cov-card ${cls}`}><div className="num">{num}</div><div className="lbl">{lbl}</div></div>
          ))}
        </div>
        <div style={{ background: 'rgba(76,175,80,.07)', border: '1px solid rgba(76,175,80,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 16 }}>
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 25 states and 17 transitions are covered by the 15 test cases. No missing coverage items.
        </div>
      </section>

      {/* D — Automation Notes */}
      <section className="section" id="automation">
        <SectionHeader num="D" title="Automation Notes" />
        <div className="note-grid">
          {AUTOMATION_CARDS.map(({ title, items }) => (
            <div key={title} className="note-card">
              <h4>{title}</h4>
              <ul>
                {items.map(item => (
                  <li key={item}><code>{item}</code></li>
                ))}
              </ul>
            </div>
          ))}
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

      {/* Conflict & Clarify */}
      <section className="section" id="conflict-notes">
        <div className="section-header">
          <div className="section-title">Requirement Clarifications &amp; Conflicts</div>
          <div className="section-subtitle">{CONFLICT_ITEMS.length} item{CONFLICT_ITEMS.length !== 1 ? 's' : ''}</div>
        </div>
        <ClarifySection items={CONFLICT_ITEMS} />
      </section>

      {/* F — Scenario Map */}
      <ScenarioSection
        sectionId="smap-main"
        sectionLetter="F"
        title="Scenario Map — Push Notification UI"
        subtitle="DAG path per test case · TC-001–015"
        overviewTitle="Push Notification UI Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-122" />
      </section>
    </>
  );
}

import FlowSection from '@/components/FlowSection';
import TcSection from '@/components/TcSection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp231/flows';
import { TC_SECTIONS } from '@/data/pp231/testcases';
import RequirementSection from '@/components/RequirementSection';
import ScenarioSection from '@/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp231/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-231',                       cls: 'blue'  },
  { label: 'Platform',    value: 'Web BO (Organizer Portal)',     cls: ''      },
  { label: 'Framework',   value: 'Playwright (TypeScript)',       cls: ''      },
  { label: 'Language',    value: 'TypeScript',                    cls: ''      },
  { label: 'App',         value: 'POPPA Backoffice (Organizer)',  cls: ''      },
  { label: 'Status',      value: 'Ready To Test STG',             cls: 'green' },
  { label: 'Subtask',     value: 'PP-155 (QA)',                   cls: 'blue'  },
];

const TECHNIQUE_ROWS = [
  {
    module: 'Dashboard Load — All Metrics',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'AC 1.1–1.3 define exact components that must appear; checklist verification.',
  },
  {
    module: 'Pie Chart — Ticket Distribution',
    badges: [['dt', 'DT']] as [string, string][],
    rationale: 'Conditions: number of ticket types (1, multiple, 0) × tickets sold (yes/no).',
  },
  {
    module: 'Summary Metrics Accuracy',
    badges: [['ep', 'Spec'], ['ep', 'EP']] as [string, string][],
    rationale: 'Revenue, Sold, Participants must match database of confirmed payments only.',
  },
  {
    module: 'Ticket Metrics Table',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'Per-type breakdown — name, quantity sold, revenue per type.',
  },
  {
    module: 'Date Range Filter',
    badges: [['st', 'ST'], ['ep', 'EP']] as [string, string][],
    rationale: 'States: default → picker open → valid range selected → data updated; invalid range rejected.',
  },
  {
    module: 'Data Accuracy — Confirmed Only',
    badges: [['dt', 'DT']] as [string, string][],
    rationale: 'Payment statuses: confirmed (counted), pending (excluded), failed (excluded).',
  },
  {
    module: 'CQRS Read Model',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'AC 3.2 — metrics served from separate read model; write path changes do not affect read.',
  },
  {
    module: 'API Error Handling',
    badges: [['manual', 'Error Guessing']] as [string, string][],
    rationale: 'Dashboard behaviour when API is unavailable.',
  },
];

const COVERAGE_ROWS = [
  { mod: 'Dashboard Load (all components)',    badges: [['ep', 'Spec']] as [string, string][],              existing: 'PP231-TC-001',              risk: ['high', 'High'] as [string, string],     pct: 95 },
  { mod: 'Pie Chart — Ticket Distribution',   badges: [['dt', 'DT']] as [string, string][],                existing: 'PP231-TC-002',              risk: ['high', 'High'] as [string, string],     pct: 95 },
  { mod: 'Summary Metrics Accuracy',          badges: [['ep', 'Spec'], ['ep', 'EP']] as [string, string][], existing: 'PP231-TC-003',              risk: ['high', 'High'] as [string, string],     pct: 97 },
  { mod: 'Ticket Metrics Table',              badges: [['ep', 'Spec']] as [string, string][],              existing: 'PP231-TC-004',              risk: ['high', 'High'] as [string, string],     pct: 95 },
  { mod: 'Date Range Filter — Valid',         badges: [['st', 'ST']] as [string, string][],                existing: 'PP231-TC-005 PP231-TC-006', risk: ['high', 'High'] as [string, string],     pct: 95 },
  { mod: 'Date Range Filter — Invalid',       badges: [['ep', 'EP'], ['manual', 'EG']] as [string, string][], existing: 'PP231-TC-007',           risk: ['medium', 'Medium'] as [string, string], pct: 90 },
  { mod: 'Data Accuracy — Confirmed Only',    badges: [['dt', 'DT']] as [string, string][],                existing: 'PP231-TC-008',              risk: ['high', 'High'] as [string, string],     pct: 97 },
  { mod: 'API Error State',                   badges: [['manual', 'EG']] as [string, string][],            existing: 'PP231-TC-009',              risk: ['medium', 'Medium'] as [string, string], pct: 90 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '18',   lbl: 'Total States'      },
  { cls: 'blue',  num: '14',   lbl: 'Total Transitions' },
  { cls: 'green', num: '32',   lbl: 'Covered'           },
  { cls: 'green', num: '0',    lbl: 'Missing'           },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['STG Organizer account',            'Organizer with at least one event that has ticket sales'],
  ['Test event — multi-type sales',    'Event with 3 ticket types: VIP (50%), Standard (30%), Early Bird (20%) confirmed sold'],
  ['Test event — single type',         'Event with only one ticket type sold'],
  ['Test event — zero sales',          'Event created but no tickets sold'],
  ['Metric seed (TC-003, TC-008)',      '5 confirmed tickets @ 500 THB each, 2 pending, 1 failed'],
  ['Date-distributed sales (TC-006)',  'Sales on at least 3 different dates within the event window'],
  ['STG Admin access',                 'Ability to confirm a pending payment for TC-008 step 4'],
  ['API mock config',                  'WireMock stub returning HTTP 500 for Event Summary Query API endpoint'],
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
export default function PP231Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-231</span> · Organizer Dashboard / Event Detail Dashboard</h2>
        <p>Test design for the POPPA Backoffice Organizer Event Detail Dashboard — covering metrics display (Pie Chart, Revenue, Tickets Sold, Participants, Ticket Metrics table), date range filtering, data accuracy via confirmed-payment-only counts, and CQRS read model correctness.</p>
        <div className="hero-stats">
          {[['9','Test Cases'],['32','States & Transitions'],['100%','Coverage'],['6','Fully Auto']].map(([v, l]) => (
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
        <SectionHeader num="A" title="Technique Selection" subtitle="8 modules · 5 techniques" />
        <div className="table-wrap">
          <table className="tech-table">
            <thead><tr><th>Module</th><th>Technique(s)</th><th>Rationale</th></tr></thead>
            <tbody>
              {TECHNIQUE_ROWS.map(row => (
                <tr key={row.module}>
                  <td>{row.module}</td>
                  <td>{row.badges.map(([c, l]) => <B key={`${c}-${l}`} cls={c} label={l} />)}</td>
                  <td>{row.rationale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* B — Coverage Summary */}
      <section className="section" id="coverage">
        <SectionHeader num="B" title="Coverage Summary" subtitle="9 TCs · 100% coverage" />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Module</th><th>Technique(s)</th><th>Existing TCs</th><th>Risk</th><th>Coverage %</th></tr></thead>
            <tbody>
              {COVERAGE_ROWS.map(row => (
                <tr key={row.mod}>
                  <td>{row.mod}</td>
                  <td>{row.badges.map(([c, l]) => <B key={`${c}-${l}`} cls={c} label={l} />)}</td>
                  <td>{row.existing}</td>
                  <td><B cls={row.risk[0]} label={row.risk[1]} /></td>
                  <td><div className="cov-bar-wrap"><div className="cov-bar" style={{ width: `${row.pct}px` }} /><span className="cov-pct">{row.pct}%</span></div></td>
                </tr>
              ))}
              <tr style={{ background: 'rgba(255,107,53,.05)' }}>
                <td><strong>Total</strong></td><td /><td><strong>9</strong></td><td /><td><strong>9 TCs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 1 — Master flow */}
      <FlowSection def={MASTER_FLOW_SECTION} />

      {/* 2–5 — Sub-flows */}
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* 6–10 — TC sections */}
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
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 18 states and 14 transitions are covered by the 9 test cases. No missing coverage items.
        </div>
        <div style={{ background: 'rgba(33,150,243,.07)', border: '1px solid rgba(33,150,243,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 12 }}>
          <strong style={{ color: 'var(--blue)' }}>Partial Automation Notes:</strong> TC-006 requires STG test data with sales on known specific dates. TC-008 requires controlled seed data with confirmed/pending/failed ticket counts. TC-009 requires API mocking (WireMock or Playwright network intercept).
        </div>
      </section>

      {/* D — Automation Notes */}
      <section className="section" id="automation">
        <SectionHeader num="D" title="Automation Notes" />
        <div className="note-grid">
          <div className="note-card">
            <h4>Framework &amp; Spec</h4>
            <ul>
              <li><code>Playwright (TypeScript)</code></li>
              <li>Spec: <code>src/test/web-bo/organizer/PP-231.organizer-dashboard.web.ts</code></li>
              <li>Fully automatable: TC-001, TC-002, TC-003, TC-004, TC-005, TC-007</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Pie Chart Assertions</h4>
            <ul>
              <li>Assert via chart legend labels and segment counts rather than pixel rendering</li>
              <li>Add <code>data-testid</code> attributes to each pie slice for automation</li>
              <li>Use <code>page.locator('[data-testid="pie-slice"]').count()</code> for segment count</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>API-Level Assertions</h4>
            <ul>
              <li>Use Playwright <code>page.route()</code> to intercept and assert API calls</li>
              <li>Cross-check metric values against Event Summary Query API response directly</li>
              <li>Date Range Filter: assert metrics container re-renders after filter application</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Regression Trigger</h4>
            <ul>
              <li>Run before every STG release touching event summary API</li>
              <li>Run when ticket metric consumers or dashboard UI changes</li>
              <li>Run when CQRS read model projection logic changes</li>
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
        title="Scenario Map — Organizer Dashboard"
        subtitle="DAG path per test case · TC-001–009"
        overviewTitle="Organizer Dashboard Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-231" />
      </section>
    </>
  );
}

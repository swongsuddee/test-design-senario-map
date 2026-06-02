import FlowSection from '@/components/FlowSection';
import TcSection from '@/components/TcSection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp236/flows';
import { TC_SECTIONS } from '@/data/pp236/testcases';
import RequirementSection from '@/components/RequirementSection';
import ScenarioSection from '@/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp236/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-236',                             cls: 'blue'  },
  { label: 'Platform',    value: 'Web (Back-Office / Organizer Portal)', cls: ''     },
  { label: 'Framework',   value: 'Playwright TypeScript',               cls: ''      },
  { label: 'Language',    value: 'TypeScript',                          cls: ''      },
  { label: 'App',         value: 'POPPA Back-Office Web',               cls: ''      },
  { label: 'Status',      value: 'Ready To Test STG',                   cls: 'green' },
  { label: 'Subtask',     value: 'PP-236 (QA)',                         cls: 'blue'  },
];

const TECHNIQUE_ROWS = [
  {
    module: 'Finance List Display',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'AC 1.1 mandates order/transaction list with statuses; AC 1.2 mandates specific financial summary fields.',
  },
  {
    module: 'Fee Calculation',
    badges: [['bva', 'BVA'], ['ep', 'Spec']] as [string, string][],
    rationale: 'AC 3.1–3.3 specify exact percentages (2.5%, 0.5%) and formula; boundary values test rounding behaviour.',
  },
  {
    module: 'Net Payout Formula',
    badges: [['dt', 'DT']] as [string, string][],
    rationale: 'Three variables (Revenue, Gateway Fee, Platform Fee) → one outcome; test with known values.',
  },
  {
    module: 'Order Detail fields',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'AC 2.2 mandates 6 specific fields: Order ID, Buyer, Ticket Type, Price, Status, Payment Date.',
  },
  {
    module: 'Error / API failure',
    badges: [['manual', 'Error Guessing']] as [string, string][],
    rationale: 'Simulate API failure on finance list endpoint.',
  },
];

const COVERAGE_ROWS = [
  { mod: 'Finance List — initial load & order rows', badges: [['ep', 'Spec']] as [string, string][], existing: 'PP236-TC-001–TC-002', risk: ['high', 'High'] as [string, string], pct: 95 },
  { mod: 'Gateway Fee calculation (2.5%)',           badges: [['bva', 'BVA'], ['ep', 'Spec']] as [string, string][], existing: 'PP236-TC-003', risk: ['high', 'High'] as [string, string], pct: 97 },
  { mod: 'Platform Fee calculation (0.5%)',          badges: [['bva', 'BVA'], ['ep', 'Spec']] as [string, string][], existing: 'PP236-TC-004', risk: ['high', 'High'] as [string, string], pct: 97 },
  { mod: 'Net Payout calculation',                   badges: [['dt', 'DT']] as [string, string][], existing: 'PP236-TC-005', risk: ['high', 'High'] as [string, string], pct: 97 },
  { mod: 'Fee calculation — boundary / rounding',   badges: [['bva', 'BVA']] as [string, string][], existing: 'PP236-TC-006–TC-007', risk: ['medium', 'Medium'] as [string, string], pct: 90 },
  { mod: 'Finance List — API error',                badges: [['manual', 'EG']] as [string, string][], existing: 'PP236-TC-008', risk: ['medium', 'Medium'] as [string, string], pct: 90 },
  { mod: 'Order Detail — navigation',               badges: [['st', 'ST']] as [string, string][], existing: 'PP236-TC-009', risk: ['high', 'High'] as [string, string], pct: 95 },
  { mod: 'Order Detail — field validation',         badges: [['ep', 'Spec']] as [string, string][], existing: 'PP236-TC-010–TC-011', risk: ['high', 'High'] as [string, string], pct: 95 },
  { mod: 'Order Detail — back navigation',          badges: [['st', 'ST']] as [string, string][], existing: 'PP236-TC-012', risk: ['medium', 'Medium'] as [string, string], pct: 90 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '18',   lbl: 'Total States'      },
  { cls: 'blue',  num: '15',   lbl: 'Total Transitions' },
  { cls: 'green', num: '33',   lbl: 'Covered'           },
  { cls: 'green', num: '0',    lbl: 'Missing'           },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['STG Organizer account',           'Valid organizer credentials with access to a completed event'],
  ['STG event — known revenue',       'Event with total revenue = 10,000 THB for fee calculation TCs'],
  ['STG event — fractional revenue',  'Event with total revenue = 333.33 THB for rounding TC'],
  ['STG event — zero revenue',        'Event with total revenue = 0 THB (cancelled / no sales)'],
  ['Known order',                     'Order with known Order ID, buyer name, ticket type, price, status, and payment date'],
  ['API error simulation',            'STG env flag or proxy to force 5xx on finance list endpoint (TC-008)'],
  ['Expected Gateway Fee (10,000 THB)', '250 THB (2.5%)'],
  ['Expected Platform Fee (10,000 THB)', '50 THB (0.5%)'],
  ['Expected Net Payout (10,000 THB)', '9,700 THB'],
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
export default function PP236Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-236</span> · Transaction &amp; Payment / Finance Page</h2>
        <p>Test design for the POPPA Back-Office Organizer Portal Finance page — covering finance list display, fee calculation verification (Gateway 2.5%, Platform 0.5%), net payout formula, order detail navigation, and API error handling.</p>
        <div className="hero-stats">
          {[['12','Test Cases'],['33','States & Transitions'],['100%','Coverage'],['11','Automatable']].map(([v, l]) => (
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="12 TCs · 100% coverage" />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Module</th><th>Technique(s)</th><th>TCs</th><th>Risk</th><th>Coverage %</th></tr></thead>
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
                <td><strong>Total</strong></td><td /><td><strong>12</strong></td><td /><td><strong>12 TCs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 1 — Master flow */}
      <FlowSection def={MASTER_FLOW_SECTION} />

      {/* 2–4 — Sub-flows */}
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* 5–8 — TC sections */}
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
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 18 states and 15 transitions are covered by the 12 test cases. No missing coverage items.
        </div>
        <div style={{ background: 'rgba(33,150,243,.07)', border: '1px solid rgba(33,150,243,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 12 }}>
          <strong style={{ color: 'var(--blue)' }}>Note:</strong> TC-008 (error state) is Partial automation — requires network mock or proxy intercept (WireMock / mitmproxy). Fee calculation TCs (TC-003 to TC-007) are fully automatable by seeding STG with known revenue values and asserting displayed figures via API + UI.
        </div>
      </section>

      {/* D — Automation Notes */}
      <section className="section" id="automation">
        <SectionHeader num="D" title="Automation Notes" />
        <div className="note-grid">
          <div className="note-card">
            <h4>Framework &amp; Spec</h4>
            <ul>
              <li><code>Playwright TypeScript</code></li>
              <li>Spec: <code>src/test/web/organizer/PP-236.transaction-payment.web.ts</code></li>
              <li>Automatable: TC-001 through TC-007, TC-009 through TC-012</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Fee Calculation Assertions</h4>
            <ul>
              <li>Parse displayed values and compare to computed expected values</li>
              <li>Tolerance: within 0.01 THB (satang-level precision)</li>
              <li>Seed STG with known revenue values (e.g. 10,000 THB) before run</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Manual / Partial</h4>
            <ul>
              <li><strong>TC-008</strong> requires network mock — recommend WireMock stub or mitmproxy</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Regression Trigger</h4>
            <ul>
              <li>Run smoke subset (TC-001, TC-002, TC-005, TC-009) on every STG deployment</li>
              <li>Run full suite before every STG release touching the finance/payment API or organizer portal financial summary component</li>
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
        title="Scenario Map — Transaction & Finance"
        subtitle="DAG path per test case · TC-001–012"
        overviewTitle="Finance Page Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-236" />
      </section>
    </>
  );
}

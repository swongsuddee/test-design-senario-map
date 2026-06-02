import FlowSection from '@/components/FlowSection';
import TcSection from '@/components/TcSection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp234/flows';
import { TC_SECTIONS } from '@/data/pp234/testcases';
import RequirementSection from '@/components/RequirementSection';
import ScenarioSection from '@/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp234/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-234',                              cls: 'blue'  },
  { label: 'Platform',    value: 'Web BO (Organizer Portal)',            cls: ''      },
  { label: 'Framework',   value: 'Playwright TypeScript',               cls: ''      },
  { label: 'Language',    value: 'TypeScript',                          cls: ''      },
  { label: 'App',         value: 'POPPA Backoffice (Organizer)',        cls: ''      },
  { label: 'Status',      value: 'Ready To Test STG',                   cls: 'green' },
  { label: 'Subtask',     value: 'PP-157 (QA)',                         cls: 'blue'  },
];

const TECHNIQUE_ROWS = [
  {
    module: 'Event Detail — Core Fields',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'AC 1.1 defines exact fields: name, date/time, location, images, ticket types; verify each.',
  },
  {
    module: 'API Integration (GET /event/:id)',
    badges: [['ep', 'Spec'], ['st', 'ST']] as [string, string][],
    rationale: 'AC 1.2 — data comes from API; verify binding from 200 response to UI.',
  },
  {
    module: 'Image Display Variants',
    badges: [['dt', 'DT']] as [string, string][],
    rationale: 'Conditions: images present (yes/no) × count (one/many) → gallery vs placeholder.',
  },
  {
    module: 'Ticket Types Variants',
    badges: [['dt', 'DT']] as [string, string][],
    rationale: 'Conditions: ticket types count (0, 1, many) → empty state vs single vs list.',
  },
  {
    module: 'API Error Handling',
    badges: [['manual', 'EG'], ['st', 'ST']] as [string, string][],
    rationale: '404 (not found) and 500 (server error) cases with distinct error states.',
  },
  {
    module: 'Data Freshness / Ownership',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'Organizer sees only their own events; another organizer\'s event is inaccessible.',
  },
];

const COVERAGE_ROWS = [
  { mod: 'Event Detail — All Core Fields', badges: [['ep', 'Spec']] as [string, string][],              existing: 'PP234-TC-001', risk: ['high', 'High'] as [string, string],   pct: 97 },
  { mod: 'Image Display Variants',         badges: [['dt', 'DT']] as [string, string][],               existing: 'PP234-TC-002', risk: ['medium', 'Medium'] as [string, string], pct: 95 },
  { mod: 'Ticket Types Variants',          badges: [['dt', 'DT']] as [string, string][],               existing: 'PP234-TC-003', risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Data Accuracy — Fields Match API', badges: [['ep', 'Spec']] as [string, string][],           existing: 'PP234-TC-004', risk: ['high', 'High'] as [string, string],   pct: 97 },
  { mod: 'Event with No Ticket Types',     badges: [['ep', 'EP']] as [string, string][],               existing: 'PP234-TC-005', risk: ['medium', 'Medium'] as [string, string], pct: 90 },
  { mod: 'API 404 — Event Not Found',      badges: [['manual', 'EG']] as [string, string][],           existing: 'PP234-TC-006', risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'API 500 — Server Error',         badges: [['manual', 'EG']] as [string, string][],           existing: 'PP234-TC-007', risk: ['medium', 'Medium'] as [string, string], pct: 90 },
  { mod: 'Event Ownership — Access Control', badges: [['ep', 'Spec']] as [string, string][],           existing: 'PP234-TC-008', risk: ['high', 'High'] as [string, string],   pct: 92 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '25',   lbl: 'Total States'      },
  { cls: 'blue',  num: '15',   lbl: 'Total Transitions' },
  { cls: 'green', num: '40',   lbl: 'Covered'           },
  { cls: 'green', num: '0',    lbl: 'Missing'           },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['STG Organizer account',            'Active Organizer account with at least 2 events'],
  ['Test event — full data',           'Event with: name, start/end datetime, venue, 3 uploaded images, 3 ticket types'],
  ['Test event — no images',           'Event created with no image uploads'],
  ['Test event — single ticket type',  'Event with exactly 1 ticket type'],
  ['Test event — multiple ticket types', 'Event with 3+ ticket types'],
  ['Test event — no ticket types',     'Event created with no ticket types defined'],
  ['Non-existent event ID',            'A UUID or integer ID not present in STG database'],
  ['Second STG Organizer account',     'Organizer B with their own event (for ownership test)'],
  ['API mock config',                  'WireMock stub returning HTTP 500 for GET /event/:id'],
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
export default function PP234Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-234</span> · Organizer Event Detail (Web BO)</h2>
        <p>Test design for the POPPA Backoffice Organizer Event Detail page — covering core field rendering, API integration correctness, image/ticket type variants, error states, and organizer ownership access control.</p>
        <div className="hero-stats">
          {[['8','Test Cases'],['40','States & Transitions'],['100%','Coverage'],['5','Automatable']].map(([v, l]) => (
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
        <SectionHeader num="A" title="Technique Selection" subtitle="6 modules · 4 techniques" />
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="8 TCs · 100% coverage" />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Module</th><th>Technique(s)</th><th>TCs</th><th>Risk</th><th>Confidence</th></tr></thead>
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
                <td><strong>Total</strong></td><td /><td><strong>8</strong></td><td /><td><strong>8 TCs</strong></td>
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
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 25 states and 15 transitions are covered by the 8 test cases. No missing coverage items.
        </div>
        <div style={{ background: 'rgba(33,150,243,.07)', border: '1px solid rgba(33,150,243,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 8 }}>
          <strong style={{ color: 'var(--blue)' }}>Note:</strong> TC-006 is Partial — requires ability to construct direct URL with invalid event ID. TC-007 is Partial — requires API mocking (WireMock or network intercept for 500). TC-008 is Partial — requires two STG Organizer accounts with distinct event ownership.
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
              <li>Spec: <code>src/test/web/organizer/PP-234.organizer-event-detail.web.ts</code></li>
              <li>Automatable: TC-001 through TC-005 via Playwright element assertions</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>API Cross-Validation (TC-004)</h4>
            <ul>
              <li>Use Playwright <code>request.get('/api/event/:id')</code> to fetch API response</li>
              <li>Compare each UI field value against the JSON response</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Manual / Partial</h4>
            <ul>
              <li><strong>TC-006</strong> — Direct URL with non-existent event ID; needs documented invalid STG ID</li>
              <li><strong>TC-007</strong> — Requires WireMock or network intercept to return 500</li>
              <li><strong>TC-008</strong> — Requires two STG Organizer accounts</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Regression Trigger</h4>
            <ul>
              <li>Run before every STG deploy touching Event Detail UI (PP-157)</li>
              <li>Run when GET Event Detail API endpoint (PP-118) changes</li>
              <li>Image assertion: check <code>src</code> non-empty and <code>isVisible()</code></li>
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
        title="Scenario Map — Event Detail"
        subtitle="DAG path per test case · TC-001–008"
        overviewTitle="Event Detail Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-234" />
      </section>
    </>
  );
}

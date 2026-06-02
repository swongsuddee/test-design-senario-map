import FlowSection from '@/components/FlowSection';
import TcSection from '@/components/TcSection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp235/flows';
import { TC_SECTIONS } from '@/data/pp235/testcases';
import RequirementSection from '@/components/RequirementSection';
import ScenarioSection from '@/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp235/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-235',                                 cls: 'blue'  },
  { label: 'Platform',    value: 'Web BO (Organizer Portal)',               cls: ''      },
  { label: 'Framework',   value: 'Playwright TypeScript',                  cls: ''      },
  { label: 'Language',    value: 'TypeScript',                             cls: ''      },
  { label: 'App',         value: 'POPPA Back-Office Web (Organizer Portal)', cls: ''    },
  { label: 'Status',      value: 'Ready To Test STG',                      cls: 'green' },
  { label: 'Subtask',     value: 'PP-235 (QA)',                            cls: 'blue'  },
];

const TECHNIQUE_ROWS = [
  {
    module: 'Participant List Display',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'AC 1.1 mandates specific status values: registered, confirmed, checked-in, cancelled — verify each.',
  },
  {
    module: 'Search by Name',
    badges: [['ep', 'EP'], ['manual', 'EG']] as [string, string][],
    rationale: 'Valid name match, partial match, no-match, empty string — equivalence partitions.',
  },
  {
    module: 'Filter by Status',
    badges: [['dt', 'DT']] as [string, string][],
    rationale: '4 status values × present/absent data combinations.',
  },
  {
    module: 'Participant Detail',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'AC 2.2 mandates 4 fields: Name, Ticket Type, Payment Status, Check-in Status.',
  },
  {
    module: 'API Error Handling',
    badges: [['manual', 'EG']] as [string, string][],
    rationale: 'Simulate API failure / empty dataset to verify UI error state.',
  },
  {
    module: 'Back Navigation',
    badges: [['st', 'ST']] as [string, string][],
    rationale: 'State: participant detail → back → list; filter/search state preserved.',
  },
];

const COVERAGE_ROWS = [
  { mod: 'Participant List — initial load',  badges: [['ep', 'Spec']] as [string, string][],  existing: 'PP235-TC-001–002', risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Participant List — search',        badges: [['ep', 'EP']] as [string, string][],    existing: 'PP235-TC-003',     risk: ['high', 'High'] as [string, string],   pct: 90 },
  { mod: 'Participant List — filter',        badges: [['dt', 'DT']] as [string, string][],    existing: 'PP235-TC-004–006', risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Participant List — error state',   badges: [['manual', 'EG']] as [string, string][], existing: 'PP235-TC-007',    risk: ['medium', 'Medium'] as [string, string], pct: 90 },
  { mod: 'Participant Detail — navigation',  badges: [['st', 'ST']] as [string, string][],    existing: 'PP235-TC-008',     risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Participant Detail — field validation', badges: [['ep', 'Spec']] as [string, string][], existing: 'PP235-TC-009–010', risk: ['high', 'High'] as [string, string], pct: 95 },
  { mod: 'Participant Detail — back navigation', badges: [['st', 'ST']] as [string, string][], existing: 'PP235-TC-011',   risk: ['medium', 'Medium'] as [string, string], pct: 90 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '14',   lbl: 'Total States'      },
  { cls: 'blue',  num: '10',   lbl: 'Total Transitions' },
  { cls: 'green', num: '24',   lbl: 'Covered'           },
  { cls: 'green', num: '0',    lbl: 'Missing'           },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['STG Organizer account',         'Valid organizer credentials with access to at least one running event'],
  ['STG event',                     'Event in "running" state with participants in all 4 statuses'],
  ['Participant — registered',      'At least 1 participant with status = registered'],
  ['Participant — confirmed',       'At least 1 participant with status = confirmed'],
  ['Participant — checked-in',      'At least 1 participant with status = checked-in'],
  ['Participant — cancelled',       'At least 1 participant with status = cancelled'],
  ['Known participant name',        'Participant full name known for search test (TC-003)'],
  ['Known participant detail',      'Full name, ticket type, payment status, check-in status known for TC-009 / TC-010'],
  ['API error simulation',          'STG env flag or proxy (e.g. mitmproxy) to force 5xx on participant list endpoint'],
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
export default function PP235Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-235</span> · Event Running Registered / Participants List (Web BO)</h2>
        <p>Test design for the POPPA Backoffice Organizer Event Running Registered page — covering participant list display by status, search by name, filter by status, participant detail field validation, and back navigation.</p>
        <div className="hero-stats">
          {[['11','Test Cases'],['24','States & Transitions'],['100%','Coverage'],['10','Automatable']].map(([v, l]) => (
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
        <SectionHeader num="A" title="Technique Selection" subtitle="6 modules · 5 techniques" />
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="11 TCs · 100% coverage" />
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
                <td><strong>Total</strong></td><td /><td><strong>11</strong></td><td /><td><strong>11 TCs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 1 — Master flow */}
      <FlowSection def={MASTER_FLOW_SECTION} />

      {/* 2–3 — Sub-flows */}
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* 4–7 — TC sections */}
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
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 14 states and 10 transitions are covered by the 11 test cases. No missing coverage items.
        </div>
        <div style={{ background: 'rgba(33,150,243,.07)', border: '1px solid rgba(33,150,243,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 8 }}>
          <strong style={{ color: 'var(--blue)' }}>Note:</strong> TC-007 (error state) is Partial automation — requires network-level API mock or proxy intercept to simulate a 5xx response. All other TCs are automatable via API + web UI assertions.
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
              <li>Spec: <code>src/test/web/organizer/PP-235.event-running-registered.web.ts</code></li>
              <li>Automatable: TC-001–006, TC-008–011 via Playwright web UI + API pre-seeding</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Smoke Subset</h4>
            <ul>
              <li>Run TC-001, TC-008, TC-009 on every STG deployment</li>
              <li>Covers load → detail navigation → field correctness</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Manual / Partial</h4>
            <ul>
              <li><strong>TC-007</strong> — Requires network mock; recommend using mitmproxy or WireMock stub to force 5xx on participant list endpoint</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Regression Trigger</h4>
            <ul>
              <li>Run before every STG release touching participant list API</li>
              <li>Run when organizer portal event detail components change</li>
              <li>Run when participant status logic is modified</li>
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
        title="Scenario Map — Event Participants List"
        subtitle="DAG path per test case · TC-001–011"
        overviewTitle="Event Participants List Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-235" />
      </section>
    </>
  );
}

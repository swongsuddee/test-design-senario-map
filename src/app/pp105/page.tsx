import FlowSection from '@/client/components/FlowSection';
import ClarifySection from '@/client/components/ClarifySection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp105/flows';
import { TC_SECTIONS } from '@/data/pp105/testcases';
import { CONFLICT_ITEMS } from '@/data/pp105/conflicts';
import RequirementSection from '@/client/components/RequirementSection';
import ScenarioSection from '@/client/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp105/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-105',                        cls: 'blue'  },
  { label: 'Platform',    value: 'Mobile (iOS / Android) + API',   cls: ''      },
  { label: 'Framework',   value: 'WebdriverIO + Appium + Mocha',   cls: ''      },
  { label: 'Language',    value: 'TypeScript',                     cls: ''      },
  { label: 'App',         value: 'POPPA Flutter App',              cls: ''      },
  { label: 'Status',      value: 'Ready To Test STG',              cls: 'green' },
  { label: 'Subtask',     value: 'PP-105 (QA)',                    cls: 'blue'  },
];

const TECHNIQUE_ROWS = [
  {
    module: 'Join Free Event',
    badges: [['st', 'State Transition'], ['ep', 'EP']] as [string, string][],
    rationale: 'States: not_registered → registered; idempotency test for duplicate join',
  },
  {
    module: 'Buy Ticket (Paid Event)',
    badges: [['st', 'State Transition'], ['bva', 'BVA']] as [string, string][],
    rationale: 'States: reserved → confirmed / released; 15-min timeout boundary',
  },
  {
    module: 'My Events',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'AC กำหนดข้อมูลที่ต้องแสดง: Upcoming/Past, QR Code',
  },
  {
    module: 'Leave Event',
    badges: [['st', 'State Transition'], ['dt', 'Decision Table']] as [string, string][],
    rationale: 'Free vs Paid → different outcomes (refund or not)',
  },
  {
    module: 'Check-in via QR Code',
    badges: [['st', 'State Transition'], ['ep', 'EP']] as [string, string][],
    rationale: 'Valid QR → checked-in; Invalid QR → error',
  },
];

const COVERAGE_ROWS = [
  { mod: 'Join Free Event',        badges: [['st', 'ST'], ['ep', 'EP']] as [string, string][],   existing: 'PP105-TC-001–002', risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Buy Ticket (Paid Event)',badges: [['st', 'ST'], ['bva', 'BVA']] as [string, string][], existing: 'PP105-TC-003–005', risk: ['high', 'High'] as [string, string],   pct: 93 },
  { mod: 'My Events',              badges: [['ep', 'Spec']] as [string, string][],                existing: 'PP105-TC-006–008', risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Leave Event',            badges: [['st', 'ST'], ['dt', 'DT']] as [string, string][],   existing: 'PP105-TC-009–011', risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Check-in via QR Code',   badges: [['st', 'ST'], ['ep', 'EP']] as [string, string][],   existing: 'PP105-TC-012–013', risk: ['high', 'High'] as [string, string],   pct: 95 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',   num: '28', lbl: 'Total States'      },
  { cls: 'blue',   num: '19', lbl: 'Total Transitions' },
  { cls: 'green',  num: '47', lbl: 'Covered'           },
  { cls: 'green',  num: '0',  lbl: 'Missing'           },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['End User account (STG)',           'User ที่มีสิทธิ์ Join Event'],
  ['Organizer account (STG)',          'สำหรับ Check-in flow'],
  ['Free Event (published)',           'Event ฟรีที่ published บน STG'],
  ['Paid Event (published, with stock)','Paid Event ที่ published; stock > 0'],
  ['Paid Event + Payment API',         'Payginix STG config'],
  ['Event ที่เริ่มแล้ว',              'Event start_time ผ่านไปแล้ว สำหรับ TC-011'],
  ['QR Code ที่ valid',                'Generate จาก confirmed ticket'],
  ['QR Code ที่ไม่ valid',             'Random string หรือ expired ticket QR'],
  ['Ticket reserve timeout',           'STG config หรือ admin API เพื่อ simulate 15-min expiry'],
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
export default function PP105Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-105</span> · Event Registration / Join Event</h2>
        <p>Test design for the POPPA Mobile App Event Registration flow — covering Join Free Event, Buy Ticket with reserve/confirm/timeout states, My Events Upcoming/Past tabs, Leave Event cancellation, and Check-in via QR Code for iOS and Android.</p>
        <div className="hero-stats">
          {[['13','Test Cases'],['47','States & Transitions'],['100%','Coverage'],['12','Automatable']].map(([v, l]) => (
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="13 TCs · 100% coverage" />
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
                <td><strong>Total</strong></td><td /><td><strong>13</strong></td><td /><td><strong>13 TCs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 1 — Master flow */}
      <FlowSection def={MASTER_FLOW_SECTION} />

      {/* 2–6 — Sub-flows */}
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* 7–11 — TC sections */}

      {/* C — Coverage Report */}
      <section className="section" id="coverage-map">
        <SectionHeader num="C" title="Coverage Report" subtitle="States × Transitions × Test Cases" />
        <div className="coverage-summary">
          {COVERAGE_STAT_CARDS.map(({ cls, num, lbl }) => (
            <div key={lbl} className={`cov-card ${cls}`}><div className="num">{num}</div><div className="lbl">{lbl}</div></div>
          ))}
        </div>
        <div style={{ background: 'rgba(76,175,80,.07)', border: '1px solid rgba(76,175,80,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 16 }}>
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 28 states and 19 transitions are covered by the 13 test cases. No missing coverage items.
        </div>
        <div style={{ background: 'rgba(33,150,243,.07)', border: '1px solid rgba(33,150,243,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 12 }}>
          <strong style={{ color: 'var(--blue)' }}>Note:</strong> TC-003 Paid Event requires Payginix STG or mock Kafka <code>payment.success</code>. TC-005 Ticket Timeout requires admin API to force-expire or short timer config. TC-012/TC-013 require dual Appium sessions (Organizer + Attendee) or API + UI hybrid.
        </div>
      </section>

      {/* D — Automation Notes */}
      <section className="section" id="automation">
        <SectionHeader num="D" title="Automation Notes" />
        <div className="note-grid">
          <div className="note-card">
            <h4>Framework &amp; Spec</h4>
            <ul>
              <li><code>WebdriverIO + Appium + Mocha (TypeScript)</code></li>
              <li>Spec: <code>src/test/mobile/event/PP-105.event-registration.mobile.ts</code></li>
              <li>Automatable: TC-001–013 via Appium UI + API hybrid</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Special Setups</h4>
            <ul>
              <li><strong>TC-003</strong> — Payginix STG; or mock Kafka <code>payment.success</code></li>
              <li><strong>TC-005</strong> — Admin API to force-expire reservation; or STG short timer</li>
              <li><strong>TC-012/013</strong> — 2 Appium sessions (Organizer + Attendee) or POST /checkin directly</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Partial Automation</h4>
            <ul>
              <li><strong>TC-005</strong> — 15-min real wait impractical; time simulation required</li>
              <li><strong>TC-010</strong> — Refund: API-level verify only; actual crediting depends on Payment provider</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Regression Trigger</h4>
            <ul>
              <li>Run เมื่อ Ticket Service เปลี่ยน</li>
              <li>Run เมื่อ Payment integration เปลี่ยน</li>
              <li>Run เมื่อ QR Code generation หรือ Registration flow เปลี่ยน</li>
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
        title="Scenario Map — Event Registration"
        subtitle="DAG path per test case · TC-001–013"
        overviewTitle="Event Registration Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
        tcMeta={TC_SECTIONS.flatMap(s => s.rows)}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-105" />
      </section>
    </>
  );
}

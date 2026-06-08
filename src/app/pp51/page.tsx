import FlowSection from '@/client/components/FlowSection';
import ClarifySection from '@/client/components/ClarifySection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp51/flows';
import { TC_SECTIONS } from '@/data/pp51/testcases';
import { CONFLICT_ITEMS } from '@/data/pp51/conflicts';
import RequirementSection from '@/client/components/RequirementSection';
import ScenarioSection from '@/client/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp51/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-51',                             cls: 'blue'  },
  { label: 'Platform',    value: 'Web (Backoffice)',                   cls: ''      },
  { label: 'Framework',   value: 'WebdriverIO + Appium + Mocha',       cls: ''      },
  { label: 'Language',    value: 'TypeScript',                         cls: ''      },
  { label: 'App',         value: 'POPPA Backoffice (BO)',              cls: ''      },
  { label: 'Status',      value: 'Ready To Test STG',                  cls: 'green' },
  { label: 'Subtask',     value: 'PP-51 (QA)',                         cls: 'blue'  },
];

const TECHNIQUE_ROWS = [
  { module: 'Create Event Information',  badges: [['ep', 'EP'], ['spec', 'Spec']] as [string, string][],      rationale: 'ตรวจสอบการกรอกข้อมูลตาม AC แต่ละ field — valid/invalid partition.' },
  { module: 'Ticket Types & Stock',      badges: [['dt', 'DT'], ['bva', 'BVA']] as [string, string][],       rationale: 'หลาย field (ราคา, จำนวน, วันรับสมัคร) — boundary และ combination.' },
  { module: 'Event Draft',               badges: [['st', 'ST']] as [string, string][],                       rationale: 'States: กำลังสร้าง → draft → resume → publish.' },
  { module: 'Publish / Approval Flow',   badges: [['st', 'ST'], ['dt', 'DT']] as [string, string][],         rationale: 'Status: draft → pending_approved → published / draft (rejected).' },
  { module: 'Cancel Event',              badges: [['st', 'ST']] as [string, string][],                       rationale: 'Status: published → pending_cancel → cancelled / published (rejected).' },
  { module: 'RBAC / Access Control',     badges: [['manual', 'EG']] as [string, string][],                   rationale: 'ทดสอบว่า non-Agency ไม่สามารถสร้าง Event ได้.' },
];

const COVERAGE_ROWS = [
  { mod: 'Create Event Information',    badges: [['ep', 'EP'], ['spec', 'Spec']] as [string, string][],  existing: 'PP51-TC-001–003', risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Ticket Types & Stock',        badges: [['dt', 'DT'], ['bva', 'BVA']] as [string, string][],  existing: 'PP51-TC-004–006', risk: ['high', 'High'] as [string, string],   pct: 93 },
  { mod: 'Event Draft',                 badges: [['st', 'ST']] as [string, string][],                  existing: 'PP51-TC-007–008', risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Publish / Approval Flow',     badges: [['st', 'ST']] as [string, string][],                  existing: 'PP51-TC-009–011', risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Cancel Event',                badges: [['st', 'ST']] as [string, string][],                  existing: 'PP51-TC-012–014', risk: ['high', 'High'] as [string, string],   pct: 93 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '27',   lbl: 'Total States'      },
  { cls: 'blue',  num: '20',   lbl: 'Total Transitions' },
  { cls: 'green', num: '47',   lbl: 'Covered'           },
  { cls: 'green', num: '0',    lbl: 'Missing'           },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['Agency account (STG)',            'Valid Agency account ที่ verified บน STG'],
  ['Admin account (STG)',             'Admin account สำหรับ Approve/Reject'],
  ['Event name (valid)',              '"Marathon Test 2026"'],
  ['Event name (min boundary)',       'ตัวอักษร 1 ตัว'],
  ['Ticket Type: ระยะทาง',           '5K, 10K, 21K'],
  ['Ticket Type: ราคา (valid)',       '300 THB'],
  ['Ticket Type: ราคา (invalid)',     '0'],
  ['Ticket Type: จำนวน (valid)',      '100'],
  ['Ticket Type: จำนวน (invalid)',    '0'],
  ['Event สำหรับ Draft test',         'สร้างใหม่ + ค้างไว้ไม่ Publish'],
  ['Event สำหรับ Cancel test',        'Event ที่ published แล้ว'],
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
export default function PP51Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-51</span> · Create Event Running</h2>
        <p>Test design for the POPPA Backoffice Create Event Running flow — covering event information, ticket types &amp; stock management, draft auto-save, publish approval workflow, and cancel event lifecycle on the Agency &amp; Admin Portal.</p>
        <div className="hero-stats">
          {[['14','Test Cases'],['47','States & Transitions'],['100%','Coverage'],['14','Automatable']].map(([v, l]) => (
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="14 TCs · 100% coverage" />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Module</th><th>Technique(s)</th><th>Existing TCs</th><th>Risk</th><th>Confidence</th></tr></thead>
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
                <td><strong>Total</strong></td><td /><td><strong>14</strong></td><td /><td><strong>14 TCs</strong></td>
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
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 27 states and 20 transitions are covered by the 14 test cases. No missing coverage items.
        </div>
        <div style={{ background: 'rgba(33,150,243,.07)', border: '1px solid rgba(33,150,243,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 12 }}>
          <strong style={{ color: 'var(--blue)' }}>Note:</strong> Cancel/Approve flow (TC-010, TC-011, TC-013, TC-014) requires dual-session setup (Agency + Admin). Draft test (TC-007) may need <code>browser.url()</code> navigate-away instead of closing browser.
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
              <li>Spec: <code>src/test/web/event/PP-51.create-event-running.web.ts</code></li>
              <li>Automatable: TC-001–014 via Web UI + API assertion</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Session Management</h4>
            <ul>
              <li>Dual-session required for Approve/Reject flows</li>
              <li>TC-010, TC-011 — Agency session + Admin session</li>
              <li>TC-013, TC-014 — Agency cancel request + Admin decision</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Draft Test Notes</h4>
            <ul>
              <li>TC-007 may need explicit <code>browser.url()</code> navigate away</li>
              <li>Draft auto-save relies on navigation event</li>
              <li>TC-008 depends on TC-007 draft being persisted</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Regression Trigger</h4>
            <ul>
              <li>Run when Event Service or BO Event Create form changes</li>
              <li>Run when Ticket Type / Stock service changes</li>
              <li>Run when Approval workflow changes</li>
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
        title="Scenario Map — Create Event Running"
        subtitle="DAG path per test case · TC-001–014"
        overviewTitle="Create Event Running Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
        tcMeta={TC_SECTIONS.flatMap(s => s.rows)}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-51" />
      </section>
    </>
  );
}

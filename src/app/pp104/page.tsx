import FlowSection from '@/client/components/FlowSection';
import ClarifySection from '@/client/components/ClarifySection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp104/flows';
import { TC_SECTIONS } from '@/data/pp104/testcases';
import { CONFLICT_ITEMS } from '@/data/pp104/conflicts';
import RequirementSection from '@/client/components/RequirementSection';
import ScenarioSection from '@/client/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp104/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-104',                        cls: 'blue'  },
  { label: 'Platform',    value: 'Web (Backoffice — Admin Portal)', cls: ''      },
  { label: 'Framework',   value: 'WebdriverIO + Appium + Mocha',   cls: ''      },
  { label: 'Language',    value: 'TypeScript',                     cls: ''      },
  { label: 'App',         value: 'POPPA Backoffice (BO) — Admin Portal', cls: '' },
  { label: 'Status',      value: 'Ready To Test STG',              cls: 'green' },
  { label: 'Subtask',     value: 'PP-104 (QA)',                    cls: 'blue'  },
];

const TECHNIQUE_ROWS = [
  {
    module: 'Dashboard List',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'AC กำหนด column list ชัดเจน — verify ทุก column ครบ',
  },
  {
    module: 'Search by Name',
    badges: [['ep', 'EP'], ['manual', 'Error Guessing']] as [string, string][],
    rationale: 'Partition: match / partial match / no match / empty input',
  },
  {
    module: 'Filter by Status',
    badges: [['dt', 'Decision Table']] as [string, string][],
    rationale: '4 status values (PENDING_REVIEW, APPROVED, REJECTED, REQUESTED_MORE_INFO)',
  },
  {
    module: 'Review Navigation',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'กด Review → navigate ไป PP-170',
  },
  {
    module: 'RBAC Guard',
    badges: [['manual', 'Error Guessing']] as [string, string][],
    rationale: 'Non-Admin เข้า URL โดยตรง → ต้อง Redirect',
  },
  {
    module: 'Empty State',
    badges: [['ep', 'EP']] as [string, string][],
    rationale: 'API คืน empty list → ตารางแสดง empty state ถูกต้อง',
  },
];

const COVERAGE_ROWS = [
  { mod: 'Dashboard List',    badges: [['ep', 'Spec']] as [string, string][],                    existing: 'PP104-TC-001',       risk: ['high', 'High'] as [string, string],   pct: 97 },
  { mod: 'Search by Name',    badges: [['ep', 'EP'], ['manual', 'EG']] as [string, string][],    existing: 'PP104-TC-002–004',   risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Filter by Status',  badges: [['dt', 'DT']] as [string, string][],                      existing: 'PP104-TC-005',       risk: ['high', 'High'] as [string, string],   pct: 97 },
  { mod: 'Review Navigation', badges: [['ep', 'Spec']] as [string, string][],                    existing: 'PP104-TC-006',       risk: ['high', 'High'] as [string, string],   pct: 97 },
  { mod: 'Empty State',       badges: [['ep', 'EP']] as [string, string][],                      existing: 'PP104-TC-007',       risk: ['medium', 'Medium'] as [string, string], pct: 93 },
  { mod: 'RBAC Guard',        badges: [['manual', 'Error Guessing']] as [string, string][],      existing: 'PP104-TC-008',       risk: ['high', 'High'] as [string, string],   pct: 97 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '17', lbl: 'Total States'      },
  { cls: 'blue',  num: '14', lbl: 'Total Transitions' },
  { cls: 'green', num: '31', lbl: 'Covered'           },
  { cls: 'green', num: '0',  lbl: 'Missing'           },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['Admin account (STG)',             'Admin login credentials'],
  ['Agency account (non-Admin)',      'Agency account สำหรับ RBAC test'],
  ['Agency data — PENDING_REVIEW',    'STG ต้องมี Agency record สถานะ PENDING_REVIEW'],
  ['Agency data — APPROVED',          'STG ต้องมี Agency record สถานะ APPROVED'],
  ['Agency data — REJECTED',          'STG ต้องมี Agency record สถานะ REJECTED'],
  ['Agency data — REQUESTED_MORE_INFO', 'STG ต้องมี Agency record สถานะ REQUESTED_MORE_INFO'],
  ['Agency for search test',          'Agency ชื่อ "บริษัท Test ABC" หรือ seeded data'],
  ['Empty environment',               'STG environment หรือ filter ที่ทำให้ list ว่าง'],
  ['API endpoint',                    'GET /admin/organizers (STG base URL)'],
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
export default function PP104Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-104</span> · Agency Verification Listing — Admin BO</h2>
        <p>Test design for the POPPA Backoffice Admin Portal — Agency Verification Listing: table display with all columns, search by name, filter by status, review navigation to Agency Detail, empty state, and RBAC access guard.</p>
        <div className="hero-stats">
          {[['8','Test Cases'],['31','States & Transitions'],['100%','Coverage'],['8','Automatable']].map(([v, l]) => (
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
        <SectionHeader num="A" title="Technique Selection" subtitle="6 modules · 3 techniques" />
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
                <td><strong>Total</strong></td><td /><td><strong>8</strong></td><td /><td><strong>8 TCs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 1 — Master flow */}
      <FlowSection def={MASTER_FLOW_SECTION} />

      {/* 2–6 — Sub-flows */}
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* 7–12 — TC sections */}

      {/* C — Coverage Report */}
      <section className="section" id="coverage-map">
        <SectionHeader num="C" title="Coverage Report" subtitle="States × Transitions × Test Cases" />
        <div className="coverage-summary">
          {COVERAGE_STAT_CARDS.map(({ cls, num, lbl }) => (
            <div key={lbl} className={`cov-card ${cls}`}><div className="num">{num}</div><div className="lbl">{lbl}</div></div>
          ))}
        </div>
        <div style={{ background: 'rgba(76,175,80,.07)', border: '1px solid rgba(76,175,80,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 16 }}>
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 17 states and 14 transitions are covered by the 8 test cases. No missing coverage items.
        </div>
        <div style={{ background: 'rgba(33,150,243,.07)', border: '1px solid rgba(33,150,243,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 12 }}>
          <strong style={{ color: 'var(--blue)' }}>Note:</strong> TC-007 Empty state requires a clean / isolated STG environment or mock API. TC-008 RBAC test uses Agency account; consider also testing with End User token.
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
              <li>Spec: <code>src/test/web/admin/PP-104.agency-verification-listing.web.ts</code></li>
              <li>Platform: Web BO — ใช้ WebdriverIO web driver (ไม่ใช่ Appium mobile)</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>API &amp; Search</h4>
            <ul>
              <li>API layer: <code>GET /admin/organizers</code> ผ่าน Admin JWT token</li>
              <li>Search debounce: ใช้ <code>waitUntil</code> หลัง type ถ้ามี debounce delay</li>
              <li>Filter assertion: Assert จาก UI table rows และ API response status field</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>RBAC Test</h4>
            <ul>
              <li>ส่ง request ด้วย Agency JWT — expect 403 หรือ redirect</li>
              <li>Consider testing with End User token เพิ่มเติม</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Regression Trigger</h4>
            <ul>
              <li>Run เมื่อมีการเปลี่ยนแปลง Admin Portal</li>
              <li>Run เมื่อ BE List API เปลี่ยน</li>
              <li>Run เมื่อ RBAC middleware เปลี่ยน</li>
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
        title="Scenario Map — Agency Verification Listing"
        subtitle="DAG path per test case · TC-001–008"
        overviewTitle="Agency Verification Listing Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
        tcMeta={TC_SECTIONS.flatMap(s => s.rows)}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-104" />
      </section>
    </>
  );
}

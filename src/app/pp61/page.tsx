import FlowSection from '@/client/components/FlowSection';
import ClarifySection from '@/client/components/ClarifySection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp61/flows';
import { TC_SECTIONS } from '@/data/pp61/testcases';
import { CONFLICT_ITEMS } from '@/data/pp61/conflicts';
import RequirementSection from '@/client/components/RequirementSection';
import ScenarioSection from '@/client/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp61/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-61',                        cls: 'blue'  },
  { label: 'Platform',    value: 'Mobile (iOS / Android) + API', cls: ''      },
  { label: 'Framework',   value: 'WebdriverIO + Appium + Mocha', cls: ''      },
  { label: 'Language',    value: 'TypeScript',                   cls: ''      },
  { label: 'App',         value: 'POPPA Flutter App',            cls: ''      },
  { label: 'Status',      value: 'Ready To Test STG',            cls: 'green' },
  { label: 'Subtask',     value: 'PP-61 (QA)',                   cls: 'blue'  },
];

const TECHNIQUE_ROWS = [
  { module: 'View Profile (Public / Own)',  badges: [['ep', 'Spec']] as [string, string][],                                   rationale: 'AC กำหนดชัดเจน: public เข้าได้ทุกคน, own profile ต้อง authenticated' },
  { module: 'Edit Profile',                badges: [['ep', 'EP'], ['bva', 'BVA']] as [string, string][],                     rationale: 'Valid/invalid partition สำหรับแต่ละ field + boundary length' },
  { module: 'Avatar Upload',               badges: [['dt', 'Decision Table']] as [string, string][],                         rationale: '3 conditions: file type (JPG/PNG/other) × size (≤5MB / >5MB)' },
  { module: 'Delete Account',              badges: [['st', 'State Transition']] as [string, string][],                       rationale: 'States: active → soft_deleted → hard_deleted (30d grace)' },
  { module: 'Account Settings',            badges: [['ep', 'Spec']] as [string, string][],                                   rationale: 'Apply immediately — verify language change + notification pref' },
  { module: 'Organizer Profile',           badges: [['dt', 'Decision Table']] as [string, string][],                         rationale: 'Verified (badge) vs Unverified (no badge)' },
  { module: 'Admin User History',          badges: [['ep', 'EP'], ['st', 'State Transition']] as [string, string][],         rationale: 'Pagination + filter by action; RBAC guard' },
];

const COVERAGE_ROWS = [
  { mod: 'View Profile',         badges: [['ep', 'Spec']] as [string, string][],                          existing: 'PP61-TC-001–002', risk: ['medium', 'Medium'] as [string, string], pct: 95 },
  { mod: 'Edit Profile',         badges: [['ep', 'EP'], ['bva', 'BVA']] as [string, string][],            existing: 'PP61-TC-003–005', risk: ['high', 'High'] as [string, string],     pct: 95 },
  { mod: 'Avatar Upload',        badges: [['dt', 'DT']] as [string, string][],                            existing: 'PP61-TC-006–008', risk: ['high', 'High'] as [string, string],     pct: 97 },
  { mod: 'Delete Account',       badges: [['st', 'ST']] as [string, string][],                            existing: 'PP61-TC-009–011', risk: ['high', 'High'] as [string, string],     pct: 95 },
  { mod: 'Account Settings',     badges: [['ep', 'Spec']] as [string, string][],                          existing: 'PP61-TC-012–013', risk: ['medium', 'Medium'] as [string, string], pct: 90 },
  { mod: 'Organizer Profile',    badges: [['dt', 'DT']] as [string, string][],                            existing: 'PP61-TC-014–015', risk: ['medium', 'Medium'] as [string, string], pct: 93 },
  { mod: 'Admin User History',   badges: [['ep', 'EP'], ['st', 'ST']] as [string, string][],              existing: 'PP61-TC-016–018', risk: ['medium', 'Medium'] as [string, string], pct: 93 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '28',   lbl: 'Total States'      },
  { cls: 'blue',  num: '22',   lbl: 'Total Transitions' },
  { cls: 'green', num: '50',   lbl: 'Covered'           },
  { cls: 'green', num: '0',    lbl: 'Missing'           },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['End User account (STG)',         'Valid user login ที่ active บน STG'],
  ['Admin account (STG)',            'Admin account สำหรับ User History'],
  ['Public profile URL',             'Profile URL ของ user อื่นที่มีข้อมูลครบ'],
  ['Avatar file — JPG valid',        'ไฟล์ .jpg ขนาด 2MB'],
  ['Avatar file — JPG oversized',    'ไฟล์ .jpg ขนาด 6MB'],
  ['Avatar file — unsupported',      'ไฟล์ .gif'],
  ['Email invalid',                  '"notanemail"'],
  ['Phone invalid (short)',          '"012345678" (9 หลัก)'],
  ['Verified Organizer account',     'Organizer ที่ผ่าน verification บน STG'],
  ['Unverified Organizer account',   'Organizer ที่ยังไม่ผ่าน verification'],
  ['Account for delete test',        'User account แยกต่างหาก ไม่ใช่ production account'],
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
export default function PP61Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-61</span> · User Profile Epic</h2>
        <p>Test design for the POPPA Mobile App User Profile system — covering public/own profile view, edit profile validation, avatar upload, delete account lifecycle, account settings, organizer profile badge, and admin user history with RBAC guard.</p>
        <div className="hero-stats">
          {[['18','Test Cases'],['50','States & Transitions'],['100%','Coverage'],['17','Automatable']].map(([v, l]) => (
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
        <SectionHeader num="A" title="Technique Selection" subtitle="7 modules · 4 techniques" />
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="18 TCs · 100% coverage" />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Module</th><th>Technique(s)</th><th>Test Cases</th><th>Risk</th><th>Coverage %</th></tr></thead>
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
                <td><strong>Total</strong></td><td /><td><strong>18</strong></td><td /><td><strong>18 TCs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 1 — Master flow */}
      <FlowSection def={MASTER_FLOW_SECTION} />

      {/* 2–7 — Sub-flows */}
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* 8–14 — TC sections */}

      {/* C — Coverage Report */}
      <section className="section" id="coverage-map">
        <SectionHeader num="C" title="Coverage Report" subtitle="States × Transitions × Test Cases" />
        <div className="coverage-summary">
          {COVERAGE_STAT_CARDS.map(({ cls, num, lbl }) => (
            <div key={lbl} className={`cov-card ${cls}`}><div className="num">{num}</div><div className="lbl">{lbl}</div></div>
          ))}
        </div>
        <div style={{ background: 'rgba(76,175,80,.07)', border: '1px solid rgba(76,175,80,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 16 }}>
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 28 states and 22 transitions are covered by the 18 test cases. TC-011 is Partial (Hard Delete requires admin API to simulate 30-day grace period expiry). No missing coverage items.
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
              <li>Spec: <code>src/test/mobile/profile/PP-61.user-profile.mobile.ts</code></li>
              <li>Automatable: TC-001–010, TC-012–018 (17 of 18)</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Partial / Manual</h4>
            <ul>
              <li><strong>TC-011</strong> — Hard Delete requires admin API to simulate 30d grace period; Kafka consumer for <code>user.deleted</code> assertion</li>
              <li><strong>TC-006</strong> — GCS file resize verification requires GCS client or API endpoint</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Dual-Service Setup</h4>
            <ul>
              <li>TC-011: Kafka consumer utility or backend event log API required</li>
              <li>TC-013: Push notification receipt requires device-level assertion</li>
              <li>TC-009/010: Fresh isolated account for delete flow</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Regression Trigger</h4>
            <ul>
              <li>Run when User Service, GCS pipeline, or auth flow changes</li>
              <li>Run when Notification Service or Kafka schema changes</li>
              <li>Run before every STG release touching profile APIs</li>
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
        title="Scenario Map — User Profile Epic"
        subtitle="DAG path per test case · TC-001–018"
        overviewTitle="User Profile Epic Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
        tcMeta={TC_SECTIONS.flatMap(s => s.rows)}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-61" />
      </section>
    </>
  );
}

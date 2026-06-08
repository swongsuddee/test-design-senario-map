import FlowSection from '@/client/components/FlowSection';
import ClarifySection from '@/client/components/ClarifySection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp170/flows';
import { TC_SECTIONS } from '@/data/pp170/testcases';
import { CONFLICT_ITEMS } from '@/data/pp170/conflicts';
import RequirementSection from '@/client/components/RequirementSection';
import ScenarioSection from '@/client/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp170/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-170',                        cls: 'blue'  },
  { label: 'Platform',    value: 'Web (Back Office — Admin Portal)', cls: ''    },
  { label: 'Framework',   value: 'WebdriverIO + Appium + Mocha',  cls: ''      },
  { label: 'Language',    value: 'TypeScript',                    cls: ''      },
  { label: 'App',         value: 'POPPA Back Office (Admin BO)',  cls: ''      },
  { label: 'Status',      value: 'Ready To Test STG',             cls: 'green' },
];

const TECHNIQUE_ROWS = [
  { module: 'Document Display by Type',      badges: [['dt','Decision Table']] as [string,string][],                              rationale: 'Two profile types (Corporate / Individual) × correct document set — exhaustive 2-case table' },
  { module: 'Approve Action',                badges: [['st','State Transition']] as [string,string][],                            rationale: 'Status transitions: PENDING_REVIEW → APPROVED; side effects: email + permission unlock' },
  { module: 'Reject — Missing Reason',       badges: [['ep','Spec'], ['manual','Error Guessing']] as [string,string][],           rationale: 'AC explicitly blocks reject with no reason; test the blocking guard' },
  { module: 'Reject — With Reason',          badges: [['st','State Transition']] as [string,string][],                            rationale: 'Status transitions: PENDING_REVIEW → REJECTED; reason stored' },
  { module: 'Internal Log',                  badges: [['ep','Spec']] as [string,string][],                                        rationale: 'reviewedBy + reviewedAt must be present after any review action' },
];

const COVERAGE_ROWS = [
  { mod: 'Document Display — Corporate',     badges: [['dt','DT']] as [string,string][],                        existing: 'PP170-TC-001',   risk: ['high','High'],   pct: 95 },
  { mod: 'Document Display — Individual',    badges: [['dt','DT']] as [string,string][],                        existing: 'PP170-TC-002',   risk: ['high','High'],   pct: 95 },
  { mod: 'Approve Agency',                   badges: [['st','ST']] as [string,string][],                        existing: 'PP170-TC-003',   risk: ['high','High'],   pct: 95 },
  { mod: 'Reject without Reason (blocked)',  badges: [['manual','EG'], ['ep','Spec']] as [string,string][],     existing: 'PP170-TC-004',   risk: ['high','High'],   pct: 97 },
  { mod: 'Reject with Reason',               badges: [['st','ST']] as [string,string][],                        existing: 'PP170-TC-005',   risk: ['high','High'],   pct: 95 },
  { mod: 'Internal Log',                     badges: [['ep','Spec']] as [string,string][],                      existing: 'PP170-TC-006',   risk: ['medium','Medium'], pct: 90 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '24',  lbl: 'Total States'      },
  { cls: 'blue',  num: '14',  lbl: 'Total Transitions' },
  { cls: 'green', num: '38',  lbl: 'Covered'           },
  { cls: 'green', num: '0',   lbl: 'Missing'           },
];

const AUTOMATION_CARDS = [
  {
    title: 'Framework & Spec',
    items: [
      'WebdriverIO + Appium + Mocha (TypeScript)',
      'Spec: src/test/web/admin/PP-170.document-review-approval.web.ts',
    ],
  },
  {
    title: 'State Setup & Teardown',
    items: [
      'Use API (PATCH verificationStatus) to place Agency in PENDING_REVIEW before each test',
      'Reset Agency status via Admin API after test to allow re-runs',
    ],
  },
  {
    title: 'Email Assertion (TC-003)',
    items: [
      'Integrate with Mailtrap API for automated email verification',
      'TC-003 step 5 (email) may be verified manually if Mailtrap unavailable — mark as Partial',
    ],
  },
  {
    title: 'Log Assertion (TC-006)',
    items: [
      'Assert via GET /admin/organizers/:id that reviewedBy and reviewedAt are populated',
      'UI log display is a bonus if Admin BO exposes it',
    ],
  },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['Admin account (KYC/Verifier role)',      'STG admin account with role = KYC/Verifier'],
  ['Corporate Agency (PENDING_REVIEW)',       'STG Agency with profileType = COMPANY, verificationStatus = PENDING_REVIEW'],
  ['Individual Agency (PENDING_REVIEW)',      'STG Agency with profileType = INDIVIDUAL, verificationStatus = PENDING_REVIEW'],
  ['Agency BO account',                       'Same as above Agency — for verifying post-approve unlock'],
  ['Reject reason',                           '"เอกสารไม่ครบ กรุณาอัปโหลดใหม่"'],
  ['STG email access',                        'Mailtrap or similar service to assert email delivery'],
  ['API endpoint',                            'PATCH /admin/organizers/:id/review'],
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
export default function PP170Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-170</span> · Document Review &amp; Approval Logic</h2>
        <p>End-to-end test design for the POPPA Admin BO document review system — covering Agency type document display, Approve / Reject actions with reason validation, and internal audit log.</p>
        <div className="hero-stats">
          {[['6','Test Cases'],['38','States & Transitions'],['100%','Coverage'],['6','Automatable']].map(([v, l]) => (
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="6 TCs · 100% coverage" />
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
                <td><strong>Total</strong></td><td /><td><strong>6</strong></td><td /><td><strong>6 TCs</strong></td>
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

      {/* C — Coverage Report */}
      <section className="section" id="coverage-map">
        <SectionHeader num="C" title="Coverage Report" subtitle="States × Transitions × Test Cases" />
        <div className="coverage-summary">
          {COVERAGE_STAT_CARDS.map(({ cls, num, lbl }) => (
            <div key={lbl} className={`cov-card ${cls}`}><div className="num">{num}</div><div className="lbl">{lbl}</div></div>
          ))}
        </div>
        <div style={{ background: 'rgba(76,175,80,.07)', border: '1px solid rgba(76,175,80,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 16 }}>
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 24 states and 14 transitions are covered by the 6 test cases. No missing coverage items.
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
        title="Scenario Map — Document Review & Approval"
        subtitle="DAG path per test case · TC-001–006"
        overviewTitle="Document Review &amp; Approval Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
        tcMeta={TC_SECTIONS.flatMap(s => s.rows)}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-170" />
      </section>
    </>
  );
}

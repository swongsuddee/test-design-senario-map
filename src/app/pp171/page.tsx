import FlowSection from '@/components/FlowSection';
import TcSection from '@/components/TcSection';
import ClarifySection from '@/components/ClarifySection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp171/flows';
import { TC_SECTIONS } from '@/data/pp171/testcases';
import { CONFLICT_ITEMS } from '@/data/pp171/conflicts';
import RequirementSection from '@/components/RequirementSection';
import ScenarioSection from '@/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp171/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-171',                                      cls: 'blue'  },
  { label: 'Platform',    value: 'Web (Back Office — Admin Portal & Agency Portal)', cls: '' },
  { label: 'Framework',   value: 'WebdriverIO + Appium + Mocha',                cls: ''      },
  { label: 'Language',    value: 'TypeScript',                                  cls: ''      },
  { label: 'App',         value: 'POPPA Back Office (Admin BO + Agency BO)',    cls: ''      },
  { label: 'Status',      value: 'Ready To Test STG',                           cls: 'green' },
];

const TECHNIQUE_ROWS = [
  { module: 'Create Event — Access Control',    badges: [['st','State Transition']] as [string,string][],                     rationale: 'Three states (Pending / Rejected / Approved) determine locked/unlocked menu; exhaustive' },
  { module: 'Onboarding Notification',          badges: [['ep','Spec']] as [string,string][],                                 rationale: 'AC specifies push/email + onboarding link on Approve' },
  { module: 'Corporate Docs Gate',              badges: [['dt','Decision Table']] as [string,string][],                       rationale: 'Docs incomplete (hidden) vs. complete (visible) — 2-row table' },
  { module: 'Audit Trail',                      badges: [['ep','Spec']] as [string,string][],                                 rationale: 'AC specifies who + when must be logged' },
  { module: 'RBAC — Approve Permission',        badges: [['manual','Error Guessing'], ['manual','Security']] as [string,string][], rationale: 'Non-KYC admin should receive 403; test boundary of role enforcement' },
  { module: 'Event List',                       badges: [['ep','EP']] as [string,string][],                                   rationale: 'Paginated list + search/filter/sort — representative equivalence classes' },
  { module: 'Event Approve/Reject (Publish)',   badges: [['st','State Transition']] as [string,string][],                     rationale: 'pending_approved → published / draft' },
  { module: 'Event Approve/Reject (Cancel)',    badges: [['st','State Transition']] as [string,string][],                     rationale: 'pending_cancel → cancelled / published' },
];

const COVERAGE_ROWS = [
  { mod: 'Create Event Locked (Pending)',   badges: [['st','ST']] as [string,string][],           existing: 'PP171-TC-001', risk: ['high','High'],   pct: 97 },
  { mod: 'Create Event Locked (Rejected)',  badges: [['st','ST']] as [string,string][],           existing: 'PP171-TC-002', risk: ['high','High'],   pct: 97 },
  { mod: 'Create Event Unlocked (Approved)',badges: [['st','ST']] as [string,string][],           existing: 'PP171-TC-003', risk: ['high','High'],   pct: 97 },
  { mod: 'Onboarding Notification',         badges: [['ep','Spec']] as [string,string][],         existing: 'PP171-TC-004', risk: ['medium','Medium'], pct: 90 },
  { mod: 'Corporate Doc Gate',              badges: [['dt','DT']] as [string,string][],           existing: 'PP171-TC-005', risk: ['high','High'],   pct: 95 },
  { mod: 'Audit Trail',                     badges: [['ep','Spec']] as [string,string][],         existing: 'PP171-TC-006', risk: ['medium','Medium'], pct: 90 },
  { mod: 'RBAC — Non-Verifier Blocked',     badges: [['manual','EG']] as [string,string][],       existing: 'PP171-TC-007', risk: ['high','High'],   pct: 97 },
  { mod: 'Admin Event List (view)',         badges: [['ep','EP']] as [string,string][],           existing: 'PP171-TC-008', risk: ['medium','Medium'], pct: 95 },
  { mod: 'Admin Event List (search/filter)',badges: [['ep','EP']] as [string,string][],           existing: 'PP171-TC-009', risk: ['medium','Medium'], pct: 90 },
  { mod: 'Admin Approve Event (publish)',   badges: [['st','ST']] as [string,string][],           existing: 'PP171-TC-010', risk: ['high','High'],   pct: 97 },
  { mod: 'Admin Reject Event (publish)',    badges: [['st','ST']] as [string,string][],           existing: 'PP171-TC-011', risk: ['high','High'],   pct: 95 },
  { mod: 'Admin Approve Cancel',           badges: [['st','ST']] as [string,string][],           existing: 'PP171-TC-012', risk: ['high','High'],   pct: 97 },
  { mod: 'Admin Reject Cancel',            badges: [['st','ST']] as [string,string][],           existing: 'PP171-TC-013', risk: ['high','High'],   pct: 95 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '37',  lbl: 'Total States'      },
  { cls: 'blue',  num: '20',  lbl: 'Total Transitions' },
  { cls: 'green', num: '57',  lbl: 'Covered'           },
  { cls: 'green', num: '0',   lbl: 'Missing'           },
];

const AUTOMATION_CARDS = [
  {
    title: 'Framework & Spec',
    items: [
      'WebdriverIO + Appium + Mocha (TypeScript)',
      'Spec: src/test/web/admin/PP-171.permission-activation.web.ts',
    ],
  },
  {
    title: 'State Setup',
    items: [
      'Use admin API to set Agency verificationStatus and Event status before each test',
      'RBAC test: prefer direct API call with non-KYC auth token for backend-level enforcement',
    ],
  },
  {
    title: 'Partial / External Assertions',
    items: [
      'TC-004 (Onboarding Notification): email requires Mailtrap; push requires registered device token in STG',
      'TC-012 refund: poll Payment Service API or consume Kafka events in test harness',
    ],
  },
  {
    title: 'Smoke Suite',
    items: [
      'TC-001, TC-003, TC-007, TC-010, TC-012 — smoke regression priority',
      'All 13 TCs for full regression run',
    ],
  },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['Agency — PENDING status',              'STG Agency account: verificationStatus = PENDING_REVIEW'],
  ['Agency — REJECTED status',             'STG Agency account: verificationStatus = REJECTED'],
  ['Agency — APPROVED status',             'STG Agency account: verificationStatus = APPROVED'],
  ['Corporate Agency — incomplete docs',   'STG Corporate Agency missing at least one required document'],
  ['Admin — KYC/Verifier role',            'STG Admin with role = KYC/Verifier'],
  ['Admin — non-KYC role',                 'STG Admin with role = admin (no KYC/Verifier)'],
  ['Event — pending_approved',             'STG event with status = pending_approved'],
  ['Event — pending_cancel',               'STG event with status = pending_cancel and at least one paid ticket'],
  ['STG email access',                     'Mailtrap or STG email service for notification assertion'],
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
export default function PP171Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-171</span> · Permission Activation</h2>
        <p>End-to-end test design for POPPA Permission Activation — covering Create Event access control by approval status, onboarding notification, corporate document gate, audit trail, RBAC enforcement, and Admin event list with approve/reject flows.</p>
        <div className="hero-stats">
          {[['13','Test Cases'],['57','States & Transitions'],['100%','Coverage'],['12','Automatable']].map(([v, l]) => (
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
                  <td>{row.badges.map(([c, l], i) => <B key={`${c}-${i}`} cls={c} label={l} />)}</td>
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
                  <td>{row.badges.map(([c, l], i) => <B key={`${c}-${i}`} cls={c} label={l} />)}</td>
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

      {/* 2–8 — Sub-flows */}
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* 9–15 — TC sections */}
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
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 37 states and 20 transitions are covered by the 13 test cases. No missing coverage items.
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
        title="Scenario Map — Permission Activation"
        subtitle="DAG path per test case · TC-001–013"
        overviewTitle="Permission Activation Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-171" />
      </section>
    </>
  );
}

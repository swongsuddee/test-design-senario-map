import FlowSection from '@/client/components/FlowSection';
import ClarifySection from '@/client/components/ClarifySection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp4/flows';
import { TC_SECTIONS } from '@/data/pp4/testcases';
import { CONFLICT_ITEMS } from '@/data/pp4/conflicts';
import RequirementSection from '@/client/components/RequirementSection';
import ScenarioSection from '@/client/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp4/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-4',                               cls: 'blue'  },
  { label: 'Platform',    value: 'Web (Desktop, Chrome / Safari)',      cls: ''      },
  { label: 'Framework',   value: 'Playwright (TypeScript)',             cls: ''      },
  { label: 'App',         value: 'POPPA Back-Office — Organizer Portal', cls: ''    },
  { label: 'Status',      value: 'In Progress (STG)',                   cls: 'green' },
  { label: 'Version',     value: 'v2 · 2026-05-07',                    cls: ''      },
];

const TECHNIQUE_ROWS = [
  { module: 'Registration Wizard (3 steps)',       badges: [['st','State Transition']] as [string,string][],           rationale: 'Linear 3-step wizard; each step has discrete validation and navigation state.' },
  { module: 'Register Step 1 — Field Validation',  badges: [['ep','EP']] as [string,string][],                        rationale: 'Required fields: displayName, firstName, lastName, DOB, phone. One TC per required field.' },
  { module: 'Register Step 2 — Password Rules',    badges: [['ep','EP'],['bva','BVA']] as [string,string][],          rationale: '3 independent password rules + BVA at length boundary. Each rule = one TC.' },
  { module: 'Profile — Type Selection',            badges: [['st','State Transition']] as [string,string][],          rationale: '/profile → select type → ถัดไป → /profile/individual or /profile/corporate' },
  { module: 'Profile — Identity Verification',     badges: [['st','State Transition']] as [string,string][],          rationale: '4-section form → submit → PENDING_SUBMISSION lifecycle.' },
  { module: 'Form Validation — National ID / Tax ID', badges: [['ep','EP'],['bva','BVA']] as [string,string][],       rationale: 'Valid 13-digit vs short/long/non-numeric. BVA at 12/13/14 digit boundaries.' },
  { module: 'File Upload',                         badges: [['ep','EP'],['bva','BVA']] as [string,string][],          rationale: 'Valid types (PDF/JPG/PNG) vs invalid. BVA on 10MB boundary.' },
  { module: 'Secure Storage',                      badges: [['manual','Checklist']] as [string,string][],             rationale: 'Private Bucket must not expose public URL.' },
  { module: 'Verification Status',                 badges: [['st','State Transition']] as [string,string][],          rationale: 'Pending / Approved / Rejected with defined transitions.' },
  { module: 'Login & RBAC',                        badges: [['dt','Decision Table']] as [string,string][],            rationale: 'Status × page access = 3 rows with distinct outcomes.' },
  { module: 'Re-submission',                       badges: [['st','State Transition']] as [string,string][],          rationale: 'Rejected → edit → Re-submit → Pending.' },
  { module: 'Edge Cases',                          badges: [['manual','Error Guessing']] as [string,string][],        rationale: 'Double submission (idempotency), draft save.' },
];

const COVERAGE_ROWS = [
  { mod: 'Registration — Step 1/3 happy path',              badges: [['st','ST']] as [string,string][],              existing: 'PP4-TC-001',       risk: ['high','High'] as [string,string],   pct: 95 },
  { mod: 'Registration — Step 1/3 required fields (×5)',    badges: [['ep','EP']] as [string,string][],              existing: 'PP4-TC-002–006',   risk: ['high','High'] as [string,string],   pct: 97 },
  { mod: 'Registration — Step 1/3 phone format',            badges: [['ep','EP']] as [string,string][],              existing: 'PP4-TC-007',       risk: ['high','High'] as [string,string],   pct: 97 },
  { mod: 'Registration — Step 2/3 happy path',              badges: [['st','ST']] as [string,string][],              existing: 'PP4-TC-008',       risk: ['high','High'] as [string,string],   pct: 95 },
  { mod: 'Registration — Step 2/3 email required',          badges: [['ep','EP']] as [string,string][],              existing: 'PP4-TC-009',       risk: ['high','High'] as [string,string],   pct: 97 },
  { mod: 'Registration — Step 2/3 password rules + confirm + duplicate', badges: [['ep','EP'],['bva','BVA']] as [string,string][], existing: 'PP4-TC-010–014', risk: ['high','High'] as [string,string], pct: 97 },
  { mod: 'Registration — Step 3/3 page + resend',           badges: [['manual','Checklist']] as [string,string][],  existing: 'PP4-TC-015–016',   risk: ['medium','Medium'] as [string,string], pct: 93 },
  { mod: 'Profile — type selection',                        badges: [['st','ST']] as [string,string][],              existing: 'PP4-TC-017–019',   risk: ['high','High'] as [string,string],   pct: 95 },
  { mod: 'Profile — Individual happy path',                 badges: [['st','ST']] as [string,string][],              existing: 'PP4-TC-020',       risk: ['high','High'] as [string,string],   pct: 90 },
  { mod: 'Profile — Individual form validation',            badges: [['ep','EP'],['bva','BVA']] as [string,string][], existing: 'PP4-TC-021–023',  risk: ['high','High'] as [string,string],   pct: 97 },
  { mod: 'Profile — Individual file upload (valid)',        badges: [['ep','EP'],['bva','BVA']] as [string,string][], existing: 'PP4-TC-024–027',  risk: ['high','High'] as [string,string],   pct: 97 },
  { mod: 'Profile — Individual file upload (invalid)',      badges: [['ep','EP'],['bva','BVA']] as [string,string][], existing: 'PP4-TC-028–030',  risk: ['high','High'] as [string,string],   pct: 97 },
  { mod: 'Profile — Individual drag & drop + corrupted',    badges: [['manual','EG']] as [string,string][],          existing: 'PP4-TC-031–032',   risk: ['medium','Medium'] as [string,string], pct: 95 },
  { mod: 'Secure Storage — no public URL',                  badges: [['manual','Checklist']] as [string,string][],   existing: 'PP4-TC-033',       risk: ['high','High'] as [string,string],   pct: 97 },
  { mod: 'Profile — Corporate happy path',                  badges: [['st','ST']] as [string,string][],              existing: 'PP4-TC-034',       risk: ['high','High'] as [string,string],   pct: 90 },
  { mod: 'Profile — Corporate Tax ID validation',           badges: [['ep','EP'],['bva','BVA']] as [string,string][], existing: 'PP4-TC-035',      risk: ['high','High'] as [string,string],   pct: 97 },
  { mod: 'Profile — Corporate backend bypass',              badges: [['ep','EP']] as [string,string][],              existing: 'PP4-TC-036',       risk: ['high','High'] as [string,string],   pct: 95 },
  { mod: 'Login — Approved / Pending / Rejected',           badges: [['dt','DT']] as [string,string][],              existing: 'PP4-TC-037–039',   risk: ['high','High'] as [string,string],   pct: 97 },
  { mod: 'RBAC — Pending + Unauthenticated direct URL',     badges: [['dt','DT']] as [string,string][],              existing: 'PP4-TC-040–041',   risk: ['high','High'] as [string,string],   pct: 97 },
  { mod: 'Re-submission after rejection',                   badges: [['st','ST']] as [string,string][],              existing: 'PP4-TC-042',       risk: ['high','High'] as [string,string],   pct: 97 },
  { mod: 'Edge Cases — idempotency + draft',                badges: [['manual','EG']] as [string,string][],          existing: 'PP4-TC-043–044',   risk: ['medium','Medium'] as [string,string], pct: 95 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '29',   lbl: 'Total States'      },
  { cls: 'blue',  num: '25',   lbl: 'Total Transitions' },
  { cls: 'green', num: '54',   lbl: 'Covered'           },
  { cls: 'green', num: '1',    lbl: 'Gap (low risk)'    },
];

const AUTOMATION_CARDS = [
  {
    title: 'Framework & Spec',
    items: [
      'Playwright (TypeScript) — Web Desktop 1280px+, Chrome / Safari',
      'Spec: src/test/web-ui-organizer/PP-4.organizer-register-login.spec.ts',
      'Fixtures: src/fixtures/organizer.ts (loginPage, registerStep1–3, profileTypePage, profileIndividualPage, organizerConfig)',
      'Page objects: src/page/web/organizer/ (LoginPage, RegisterStep1–3Page, ProfileTypePage, ProfileIndividualPage, ProfileCorporatePage)',
    ],
  },
  {
    title: 'Fully Automatable',
    items: [
      'PP4-TC-001–019 — Registration wizard + profile type selection',
      'PP4-TC-037–042 — Login, RBAC, re-submission',
      'PP4-TC-041 — Unauthenticated RBAC (confirmed passing on STG)',
    ],
  },
  {
    title: 'Partial (API / Fixture Required)',
    items: [
      'PP4-TC-032 — corrupted file fixture: assets/fixtures/upload/corrupted.pdf',
      'PP4-TC-036 — backend bypass: direct API call only',
      'PP4-TC-043 — DB duplicate check requires API assertion',
      'PP4-TC-020–031, PP4-TC-034–035 — profile/upload: pending STG file-upload end-to-end',
    ],
  },
  {
    title: 'Manual Only',
    items: [
      'PP4-TC-033 — Private Bucket HTTP access requires infra access (HTTP 403 direct URL)',
      'PP4-TC-044 — Draft save confirmed (Ton, 2026-04-29); not automatable without deep session control',
    ],
  },
  {
    title: 'Admin-Dependent Accounts',
    items: [
      'PP4-TC-037 (Approved), PP4-TC-039 (Rejected), PP4-TC-042 (Re-submit) — require pre-seeded STG accounts',
      'Automate via API seed or STG admin console',
      'STG note: /dashboard returns 404 — use /event/create as protected RBAC test route',
    ],
  },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['Organizer account — new (registration)',    'Unregistered unique email; qa+pp4-tc001-{timestamp}@7solutions.co.th'],
  ['Organizer account — profile not submitted', 'Registered + verified; no identity docs; config.organizer.email'],
  ['Organizer account — Status = Approved',     'Pre-approved account in STG DB'],
  ['Organizer account — Status = Pending',      'Pre-registered; docs submitted; awaiting admin approval'],
  ['Organizer account — Status = Rejected',     'Pre-rejected account with Admin comment in STG DB'],
  ['Organizer account — duplicate email',        'Existing registered email for PP4-TC-014'],
  ['Valid National ID (Individual)',             'Valid 13-digit Thai ID; set via TEST_NATIONAL_ID_VALID'],
  ['Invalid National ID — 12 digits',           '123456789012'],
  ['Invalid National ID — non-numeric',         '12345ABCD8901'],
  ['Valid Tax ID (Corporate)',                   'Valid 13-digit Thai Tax ID; set via TEST_TAX_ID_VALID'],
  ['Valid test files',                           'PDF 5MB, JPG 3MB, PNG 8MB, PDF exactly 10MB — assets/fixtures/upload/'],
  ['Oversized file',                             'PDF > 10MB — assets/fixtures/upload/oversized.pdf'],
  ['Invalid type files',                         'sample.exe, sample.docx — assets/fixtures/upload/'],
  ['Corrupted PDF',                              'Truncated/broken PDF — assets/fixtures/upload/corrupted.pdf'],
  ['Admin rejection comment',                    'Pre-seeded in STG DB: "เอกสารไม่ครบถ้วน กรุณาอัปโหลดใหม่"'],
  ['Protected BO URL',                           '/event/create, /profile — used in PP4-TC-040, PP4-TC-041'],
];

// ── Badge helper ───────────────────────────────────────────────────────────────
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
export default function PP4Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">In Progress · POPPA Back-Office Story</div>
        <h2><span>PP-4</span> · Organizer Back-Office Register &amp; Login</h2>
        <p>End-to-end test design for the POPPA Back-Office Organizer Portal — 3-step registration wizard, post-login identity verification (Individual / Corporate), document upload with file validation, verification status lifecycle (Pending / Approved / Rejected), login RBAC, and re-submission flow.</p>
        <div className="hero-stats">
          {[['44','Test Cases'],['54','States & Transitions'],['100%','Coverage'],['37','Automatable']].map(([v, l]) => (
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
        <SectionHeader num="A" title="Technique Selection" subtitle="12 modules · 5 techniques" />
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="44 TCs · 100% coverage" />
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
                <td><strong>Total</strong></td><td /><td><strong>44</strong></td><td /><td><strong>44 TCs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 1 — Master flow */}
      <FlowSection def={MASTER_FLOW_SECTION} />

      {/* 2–6 — Sub-flows */}
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* 7–15 — TC sections */}

      {/* C — Coverage Report */}
      <section className="section" id="coverage-map">
        <SectionHeader num="C" title="Coverage Report" subtitle="States × Transitions × Test Cases" />
        <div className="coverage-summary">
          {COVERAGE_STAT_CARDS.map(({ cls, num, lbl }) => (
            <div key={lbl} className={`cov-card ${cls}`}><div className="num">{num}</div><div className="lbl">{lbl}</div></div>
          ))}
        </div>
        <div style={{ background: 'rgba(76,175,80,.07)', border: '1px solid rgba(76,175,80,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 16 }}>
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 29 states and 25 transitions are covered by the 44 test cases. One open gap: TR3 (Step 2 back-navigation) — low risk, excluded from PP-4 acceptance criteria.
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
        title="Scenario Map — Organizer Register &amp; Login"
        subtitle="DAG path per test case · TC-001–044"
        overviewTitle="Organizer Register &amp; Login Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
        tcMeta={TC_SECTIONS.flatMap(s => s.rows)}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-4" />
      </section>
    </>
  );
}

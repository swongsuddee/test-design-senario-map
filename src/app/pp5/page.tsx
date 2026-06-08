import FlowSection from '@/client/components/FlowSection';
import ClarifySection from '@/client/components/ClarifySection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp5/flows';
import { TC_SECTIONS } from '@/data/pp5/testcases';
import { CONFLICT_ITEMS } from '@/data/pp5/conflicts';
import RequirementSection from '@/client/components/RequirementSection';
import ScenarioSection from '@/client/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp5/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-5',                    cls: 'blue'  },
  { label: 'Platform',    value: 'Web (Desktop 1280px+)',    cls: ''      },
  { label: 'Framework',   value: 'Playwright (TypeScript)',  cls: ''      },
  { label: 'Language',    value: 'TypeScript',               cls: ''      },
  { label: 'App',         value: 'POPPA Back-Office (Admin Portal)', cls: '' },
  { label: 'Status',      value: 'Ready To Test STG',        cls: 'green' },
  { label: 'Version',     value: '▲1 — 2026-05-07',          cls: ''      },
];

const TECHNIQUE_ROWS = [
  { module: 'Login Flow (Direct Form)',  badges: [['st','State Transition']] as [string,string][],                       rationale: 'Linear flow: session check → form display → submit → result.' },
  { module: 'Role Validation',           badges: [['dt','Decision Table']] as [string,string][],                         rationale: 'Role = Admin / Agency / End-user × outcome = 3 decision rows.' },
  { module: 'Error Handling',            badges: [['manual','Error Guessing'],['st','State Transition']] as [string,string][], rationale: 'Wrong credentials, suspended account, server down — each a distinct state.' },
  { module: 'Session Management',        badges: [['st','State Transition']] as [string,string][],                       rationale: 'Session lifecycle: active → idle → expired; logout path.' },
  { module: 'Forgot Password',           badges: [['st','State Transition']] as [string,string][],                       rationale: 'Binary: click link → form → submit → email sent.' },
  { module: 'Loading / UX',             badges: [['checklist','Checklist']] as [string,string][],                        rationale: 'Single observable state during submit — button text "Logging in...".' },
];

const COVERAGE_ROWS = [
  { mod: 'Login Flow (Direct Form)', badges: [['st','ST']] as [string,string][],                        existing: 'PP5-TC-001, PP5-TC-002, PP5-TC-017, PP5-TC-018', risk: ['high','High'],   pct: 98 },
  { mod: 'Role Validation',          badges: [['dt','DT']] as [string,string][],                        existing: 'PP5-TC-004, PP5-TC-005',                           risk: ['high','High'],   pct: 75 },
  { mod: 'Error Handling',           badges: [['manual','EG']] as [string,string][],                    existing: 'PP5-TC-006, PP5-TC-007, PP5-TC-008',              risk: ['high','High'],   pct: 80 },
  { mod: 'Session Management',       badges: [['st','ST']] as [string,string][],                        existing: 'PP5-TC-012, PP5-TC-013, PP5-TC-014, PP5-TC-019', risk: ['high','High'],   pct: 80 },
  { mod: 'Forgot Password',          badges: [['st','ST']] as [string,string][],                        existing: 'PP5-TC-015',                                      risk: ['medium','Medium'], pct: 50 },
  { mod: 'Loading / UX',             badges: [['checklist','Checklist']] as [string,string][],          existing: 'PP5-TC-016',                                      risk: ['low','Low'],     pct: 90 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '21',  lbl: 'Active States'      },
  { cls: 'blue',  num: '16',  lbl: 'Active Transitions'  },
  { cls: 'green', num: '32',  lbl: 'Covered (78%)'       },
  { cls: 'orange',num: '3',   lbl: 'Partial (7%)'        },
];

const AUTOMATION_CARDS = [
  {
    title: 'Framework & Spec',
    items: [
      'Playwright (TypeScript) — Web Desktop 1280px+, Chrome / Safari',
      'Spec: src/test/web/admin/PP-5.admin-login.web.ts',
      'Page Objects: AdminLoginPage.ts, AdminDashboardPage.ts',
    ],
  },
  {
    title: 'Ready to Implement (⏳ Pending)',
    items: [
      'PP5-TC-001 — no session redirect',
      'PP5-TC-002 — valid session skip login',
      'PP5-TC-006 — wrong password error toast',
      'PP5-TC-013 — active session persistence',
      'PP5-TC-014 — logout redirect',
      'PP5-TC-016 — "Logging in..." button state',
      'PP5-TC-017 — protected URL redirect',
      'PP5-TC-018 — valid credentials → Dashboard',
      'PP5-TC-019 — post-logout protected URL guard',
    ],
  },
  {
    title: 'Need Test Accounts',
    items: [
      'PP5-TC-004, PP5-TC-005 — Agency / End-user accounts in STG',
      'PP5-TC-007 — suspended Admin account in STG',
      'PP5-TC-012 — STG short-TTL session config or long wait',
    ],
  },
  {
    title: 'Manual Only / Partial',
    items: [
      'PP5-TC-008 — server down: requires infra/network manipulation',
      'PP5-TC-015 — forgot password: email delivery requires manual check',
      'Obsolete: PP5-TC-003, PP5-TC-009, PP5-TC-010, PP5-TC-011 (Casdoor / Remember Me not on STG)',
    ],
  },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['Admin account — valid',        'STG Admin account; credentials via ADMIN_EMAIL / ADMIN_PASSWORD env vars'],
  ['Agency account — test',        'STG Agency account for role-rejection tests; TEST_AGENCY_EMAIL / TEST_AGENCY_PASSWORD'],
  ['End-user account — test',      'STG End-user account for role-rejection tests; TEST_USER_EMAIL / TEST_USER_PASSWORD'],
  ['Suspended Admin account',      'Pre-suspended in STG; TEST_SUSPENDED_EMAIL / TEST_SUSPENDED_PASSWORD'],
  ['Session timeout threshold',    'Configured in STG backend; confirm value with developer'],
  ['BO protected URL',             '/dashboard/events — used in PP5-TC-017, PP5-TC-019'],
];

const ARCHITECTURE_NOTE = {
  finding: 'STG uses a direct email + password form at /login — NOT Casdoor OAuth2 as described in requirements.',
  confirmed: [
    'Email field: input[name="email"], type=email, placeholder="Enter email"',
    'Password field: input[name="password"], type=password, placeholder="Enter password"',
    'Submit button: button[type="submit"] — text "Login" / "Logging in..." (during auth)',
    'Forgot password: link with text "Forgot password?"',
    'Error toast: element containing text "Invalid email or password"',
    'Logout: arrow icon (→) at bottom-left sidebar → redirects to /login',
    'Dashboard nav: Dashboard · Events · Users · Organizers · Payments · Notifications · Agencies · Reviews · Reports',
  ],
};

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
export default function PP5Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-5</span> · Admin Back-Office Register &amp; Login</h2>
        <p>End-to-end test design for the POPPA Back-Office Admin Portal authentication system — covering direct login form, session management, role validation, error handling, registration flow (PP-55), direct login API (PP-60), Super Admin account creation (PP-101), and change password (PP-102).</p>
        <div className="hero-stats">
          {[['15','Active Test Cases'],['37','States & Transitions'],['78%','Coverage'],['9','Automatable']].map(([v, l]) => (
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

      {/* Architecture finding callout */}
      <section className="section" id="arch-finding">
        <div style={{ background: 'rgba(255,152,0,.08)', border: '1px solid rgba(255,152,0,.3)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginBottom: 8 }}>
          <strong style={{ color: '#FF9800' }}>Architecture Finding (▲1 — 2026-05-07):</strong> {ARCHITECTURE_NOTE.finding}
          <ul style={{ marginTop: 10, marginBottom: 0, paddingLeft: 18 }}>
            {ARCHITECTURE_NOTE.confirmed.map(item => (
              <li key={item} style={{ marginBottom: 4 }}><code>{item}</code></li>
            ))}
          </ul>
        </div>
      </section>

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
        <SectionHeader num="B" title="Coverage Summary" subtitle="15 active TCs · 4 obsolete" />
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
                <td><strong>Total (active)</strong></td><td /><td><strong>15</strong></td><td /><td><strong>15 TCs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ background: 'rgba(158,158,158,.08)', border: '1px solid rgba(158,158,158,.25)', borderRadius: 8, padding: '12px 16px', fontSize: 12, marginTop: 12 }}>
          <strong>Obsolete TCs (4):</strong> PP5-TC-003, PP5-TC-009, PP5-TC-010, PP5-TC-011 — removed because Casdoor OAuth2 and Remember Me checkbox are not present on STG.
        </div>
      </section>

      {/* 1 — Master flow */}
      <FlowSection def={MASTER_FLOW_SECTION} />

      {/* 2–9 — Sub-flows */}
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* 10–15 — TC sections */}

      {/* C — Coverage Report */}
      <section className="section" id="coverage-map">
        <SectionHeader num="C" title="Coverage Report" subtitle="States × Transitions × Test Cases" />
        <div className="coverage-summary">
          {COVERAGE_STAT_CARDS.map(({ cls, num, lbl }) => (
            <div key={lbl} className={`cov-card ${cls}`}><div className="num">{num}</div><div className="lbl">{lbl}</div></div>
          ))}
        </div>
        <div style={{ background: 'rgba(255,152,0,.07)', border: '1px solid rgba(255,152,0,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 16 }}>
          <strong style={{ color: '#FF9800' }}>Partial Coverage (5 items):</strong> S15, S16, S17, T11, T12 — Remember Me states (no checkbox on STG); S27 — no OAuth2 authorization code flow on STG. All are Casdoor/Remember Me nodes not present in current STG; TC-003, TC-009, TC-010, TC-011 marked Obsolete.
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
        title="Scenario Map — Admin Login"
        subtitle="DAG path per test case · TC-001–019"
        overviewTitle="Admin Login Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
        tcMeta={TC_SECTIONS.flatMap(s => s.rows)}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-5" />
      </section>
    </>
  );
}

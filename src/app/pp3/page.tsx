import FlowSection from '@/client/components/FlowSection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp3/flows';
import { TC_SECTIONS } from '@/data/pp3/testcases';
import RequirementSection from '@/client/components/RequirementSection';
import ScenarioSection from '@/client/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp3/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-3',                        cls: 'blue'  },
  { label: 'Platform',    value: 'Mobile (iOS / Android)',       cls: ''      },
  { label: 'Framework',   value: 'WebdriverIO + Appium + Mocha', cls: ''      },
  { label: 'Language',    value: 'TypeScript',                   cls: ''      },
  { label: 'App',         value: 'POPPA Flutter App',            cls: ''      },
  { label: 'Status',      value: 'Ready To Test STG',            cls: 'green' },
  { label: 'Subtask',     value: 'PP-11 (QA)',                   cls: 'blue'  },
];

const TECHNIQUE_ROWS = [
  { module: 'View Profile',                 badges: [['st','State Transition'],['ep','EP']] as [string,string][],            rationale: 'API response drives 3 tab states; empty vs. populated Saved tab is an EP class.' },
  { module: 'Edit Profile — Display Name',  badges: [['ep','EP'],['bva','BVA'],['dt','Decision Table']] as [string,string][], rationale: 'Complex char-class rules. BVA on length boundary 49/50/51. Decision Table maps allowed vs disallowed char classes.' },
  { module: 'Edit Profile — Bio',           badges: [['bva','BVA']] as [string,string][],                                    rationale: 'Simple length boundary: 249/250/251 chars.' },
  { module: 'Edit Profile — Phone',         badges: [['ep','EP']] as [string,string][],                                      rationale: 'Reuses PP-2 phone validation rules.' },
  { module: 'Edit Profile — Save behaviour',badges: [['st','State Transition']] as [string,string][],                        rationale: 'Happy path, network failure, real-time update.' },
  { module: 'Update Interests',             badges: [['bva','BVA'],['st','State Transition']] as [string,string][],          rationale: 'Count boundaries: 0/1/3/4. State: current → updated → feed re-calc.' },
  { module: 'Delete Account',               badges: [['manual','Scenario'],['bva','BVA']] as [string,string][],              rationale: 'Multi-step confirmation flow. BVA on reason text length 499/500/501.' },
  { module: 'Session / Logout',             badges: [['st','State Transition']] as [string,string][],                        rationale: '401 graceful redirect and explicit logout path.' },
];

const COVERAGE_ROWS = [
  { mod: 'View Profile & Activity Tabs',    badges: [['st','ST'],['ep','EP']] as [string,string][],           existing: 'PP3-TC-001–005',  risk: ['high','High'],   pct: 97 },
  { mod: 'Edit Profile — Display Name',     badges: [['ep','EP'],['bva','BVA'],['dt','DT']] as [string,string][], existing: 'PP3-TC-006–013', risk: ['high','High'],   pct: 97 },
  { mod: 'Edit Profile — Bio',              badges: [['bva','BVA']] as [string,string][],                     existing: 'PP3-TC-014–016',  risk: ['medium','Medium'], pct: 97 },
  { mod: 'Edit Profile — Phone & Save',     badges: [['ep','EP'],['st','ST']] as [string,string][],           existing: 'PP3-TC-017–020',  risk: ['high','High'],   pct: 97 },
  { mod: 'Update Interests',                badges: [['bva','BVA'],['st','ST']] as [string,string][],         existing: 'PP3-TC-021–024',  risk: ['high','High'],   pct: 97 },
  { mod: 'Delete Account',                  badges: [['manual','Scenario'],['bva','BVA']] as [string,string][], existing: 'PP3-TC-025–032', risk: ['high','High'],   pct: 97 },
  { mod: 'Session Expiry & Logout',         badges: [['st','ST']] as [string,string][],                       existing: 'PP3-TC-033–035',  risk: ['medium','Medium'], pct: 97 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '40',   lbl: 'Total States'      },
  { cls: 'blue',  num: '34',   lbl: 'Total Transitions' },
  { cls: 'green', num: '74',   lbl: 'Covered'           },
  { cls: 'green', num: '0',    lbl: 'Missing'           },
];

const AUTOMATION_CARDS = [
  {
    title: 'Framework & Spec',
    items: [
      'WebdriverIO + Appium + Mocha',
      'Spec: src/test/mobile/profile/PP-3.profile-settings.mobile.ts',
      'Page Objects: ProfilePage.ts, EditProfilePage.ts, InterestsPage.ts, SettingsPage.ts, DeleteAccountPage.ts',
    ],
  },
  {
    title: 'Network Failure Tests',
    items: [
      'TC-020, TC-034 require Charles Proxy or Android emulator network throttle — manual setup',
      'UI assertion automatable once throttle is in place',
    ],
  },
  {
    title: 'Not Automatable / Partial',
    items: [
      'TC-022 — feed re-calc requires API assertion',
      'TC-032 — requires TC-031 as prerequisite (fresh account for delete)',
      'TC-033 — JWT expiry needs STG token control API',
    ],
  },
  {
    title: 'STG Setup Required',
    items: [
      'TC-020 — network offline simulation',
      'TC-031/032 — fresh account for delete flow',
      'TC-033 — JWT expiry control via STG API',
    ],
  },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['Valid user account',        'Pre-logged-in user with complete profile in STG DB'],
  ['Display name 50 chars',     '50-character string (Thai or English)'],
  ['Display name 51 chars',     '51-character string (over limit)'],
  ['Bio 250 chars',             '250-character free text'],
  ['Bio 251 chars',             '251-character string (over limit)'],
  ['Test phone valid',          '0812345678'],
  ['Test phone invalid',        '123'],
  ['Delete reason 500 chars',   '500-character Thai text'],
  ['Delete reason 501 chars',   '501-character Thai text (over limit)'],
  ['User with saved events',    'Pre-seeded account with bookmarked events in STG'],
  ['User with no saved events', 'Account with empty Saved tab'],
  ['User with upcoming events', 'Account with future-dated event registrations'],
  ['JWT near-expiry token',     'Requires STG token TTL control API'],
  ['Interest categories',       'At least 4 available category options in STG'],
];

// ── Badge helper (used only in static sections A/B/C) ─────────────────────────
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
export default function PP3Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-3</span> · User Profile &amp; Account Settings</h2>
        <p>End-to-end test design for the POPPA Mobile App user profile system — covering profile view, edit profile validation, interest management, account deletion, and session expiry handling.</p>
        <div className="hero-stats">
          {[['35','Test Cases'],['74','States & Transitions'],['100%','Coverage'],['30','Automatable']].map(([v, l]) => (
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="35 TCs · 100% coverage" />
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
                <td><strong>Total</strong></td><td /><td><strong>35</strong></td><td /><td><strong>35 TCs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 1 — Master flow */}
      <FlowSection def={MASTER_FLOW_SECTION} />

      {/* 2–6 — Sub-flows */}
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* 7–13 — TC sections */}

      {/* C — Coverage Report */}
      <section className="section" id="coverage-map">
        <SectionHeader num="C" title="Coverage Report" subtitle="States × Transitions × Test Cases" />
        <div className="coverage-summary">
          {COVERAGE_STAT_CARDS.map(({ cls, num, lbl }) => (
            <div key={lbl} className={`cov-card ${cls}`}><div className="num">{num}</div><div className="lbl">{lbl}</div></div>
          ))}
        </div>
        <div style={{ background: 'rgba(76,175,80,.07)', border: '1px solid rgba(76,175,80,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 16 }}>
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 40 states and 34 transitions are covered by the 35 test cases. No missing coverage items.
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

      {/* F — Scenario Map */}
      <ScenarioSection
        sectionId="smap-main"
        sectionLetter="F"
        title="Scenario Map — User Profile & Account Settings"
        subtitle="DAG path per test case · TC-001–035"
        overviewTitle="User Profile & Account Settings Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
        tcMeta={TC_SECTIONS.flatMap(s => s.rows)}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-3" />
      </section>
    </>
  );
}

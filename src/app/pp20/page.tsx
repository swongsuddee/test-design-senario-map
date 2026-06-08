import FlowSection from '@/client/components/FlowSection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp20/flows';
import { TC_SECTIONS } from '@/data/pp20/testcases';
import RequirementSection from '@/client/components/RequirementSection';
import ScenarioSection from '@/client/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp20/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-20',                        cls: 'blue'  },
  { label: 'Platform',    value: 'Mobile (iOS / Android)',        cls: ''      },
  { label: 'Framework',   value: 'WebdriverIO + Appium + Mocha',  cls: ''      },
  { label: 'Language',    value: 'TypeScript',                    cls: ''      },
  { label: 'App',         value: 'POPPA Flutter App',             cls: ''      },
  { label: 'Status',      value: 'Ready To Test STG',             cls: 'green' },
  { label: 'Scope',       value: 'Auth token lifecycle',          cls: ''      },
];

const TECHNIQUE_ROWS = [
  { module: 'Token Storage',       badges: [['ep', 'Specification-based']] as [string, string][],                          rationale: 'AC 1.1 mandates Secure Storage; verify tokens are persisted and not stored in plain text.' },
  { module: 'Auto Token Refresh',  badges: [['st', 'State Transition']] as [string, string][],                             rationale: 'States: valid token → expired (401) → refresh → new token → retry. Clear state transitions.' },
  { module: 'Force Logout',        badges: [['st', 'State Transition'], ['manual', 'Error Guessing']] as [string, string][], rationale: 'Edge case: refresh token expired/invalid; system must force logout without hanging.' },
  { module: 'Auth State Management', badges: [['st', 'State Transition']] as [string, string][],                           rationale: 'Binary auth state (authenticated / unauthenticated) drives navigation outcomes.' },
  { module: 'Navigation Guard',    badges: [['dt', 'Decision Table']] as [string, string][],                               rationale: 'Two conditions: auth state × route protection level → 2 outcomes (allow / redirect).' },
];

const COVERAGE_ROWS = [
  { mod: 'Token Storage — Secure Storage',       badges: [['ep', 'Spec']] as [string, string][],              existing: 'PP20-TC-001',   risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Valid Access Token — API success',     badges: [['st', 'ST']] as [string, string][],                existing: 'PP20-TC-002',   risk: ['medium', 'Medium'] as [string, string], pct: 97 },
  { mod: 'Auto Token Refresh — silent',          badges: [['st', 'ST']] as [string, string][],                existing: 'PP20-TC-003',   risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Force Logout — refresh token expired', badges: [['st', 'ST'], ['manual', 'EG']] as [string, string][], existing: 'PP20-TC-004', risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Navigation Guard — authenticated',     badges: [['dt', 'DT']] as [string, string][],                existing: 'PP20-TC-005',   risk: ['high', 'High'] as [string, string],   pct: 97 },
  { mod: 'Navigation Guard — unauthenticated',   badges: [['dt', 'DT']] as [string, string][],                existing: 'PP20-TC-006',   risk: ['high', 'High'] as [string, string],   pct: 97 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '21', lbl: 'Total States'      },
  { cls: 'blue',  num: '14', lbl: 'Total Transitions' },
  { cls: 'green', num: '35', lbl: 'Covered'           },
  { cls: 'green', num: '0',  lbl: 'Missing'           },
];

const AUTOMATION_CARDS = [
  {
    title: 'Framework & Spec',
    items: [
      'WebdriverIO + Appium + Mocha (TypeScript)',
      'Spec: src/test/mobile/auth/PP-20.auth-token-state.mobile.ts',
    ],
  },
  {
    title: 'Automatable Subset',
    items: [
      'TC-001: Partially automatable — login via Appium; secure storage inspection requires idb / adb',
      'TC-002: Fully automatable at API level using valid session token',
      'TC-003 & TC-004: Automatable with token injection via proxy or test backdoor',
      'TC-005 & TC-006: Fully automatable via Appium navigation assertions',
    ],
  },
  {
    title: 'Token Injection Setup',
    items: [
      'TC-003 & TC-004 require expired token injection via Charles Proxy / mitmproxy or app test-mode backdoor',
      'TC-001 secure storage inspection: iOS — idb / Keychain; Android — adb shell + EncryptedSharedPreferences',
    ],
  },
  {
    title: 'Regression Trigger',
    items: [
      'Run before any release touching authentication, session management, or HTTP interceptor logic',
      'API-level tests: verify /refresh-token endpoint behavior independent of UI',
    ],
  },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['Valid user credentials',     'STG test account (email + password)'],
  ['Expired Access Token',       'Generate via test utility or wait for natural expiry; or inject via proxy'],
  ['Valid Refresh Token',        'Obtained from successful login; used in TC-003'],
  ['Expired Refresh Token',      'Revoke via backend admin API or wait for natural expiry; used in TC-004'],
  ['Protected screen route',     'Any screen requiring authentication (e.g. Profile, Home feed)'],
  ['Secure storage inspection',  'idb (iOS) or adb shell + Android data inspector (Android)'],
  ['Network proxy',              'Charles Proxy or mitmproxy for token interception in TC-003/TC-004'],
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
export default function PP20Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-20</span> · Manage Auth Token State</h2>
        <p>End-to-end test design for the POPPA Mobile App auth token lifecycle — covering secure token storage, silent refresh on 401, force logout on refresh token expiry, and navigation guard for protected screens.</p>
        <div className="hero-stats">
          {[['6', 'Test Cases'], ['35', 'States & Transitions'], ['100%', 'Coverage'], ['5', 'Automatable']].map(([v, l]) => (
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
        <SectionHeader num="A" title="Technique Selection" subtitle="5 modules · 3 techniques" />
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
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 21 states and 14 transitions are covered by the 6 test cases. No missing coverage items.
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
        title="Scenario Map — Manage Auth Token State"
        subtitle="DAG path per test case · TC-001–006"
        overviewTitle="Auth Token State Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
        tcMeta={TC_SECTIONS.flatMap(s => s.rows)}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-20" />
      </section>
    </>
  );
}

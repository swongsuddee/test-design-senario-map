import FlowSection from '@/client/components/FlowSection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp244/flows';
import { TC_SECTIONS } from '@/data/pp244/testcases';
import RequirementSection from '@/client/components/RequirementSection';
import ScenarioSection from '@/client/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp244/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-244',                              cls: 'blue'  },
  { label: 'Platform',    value: 'Web (Back-Office / Organizer Portal)', cls: ''      },
  { label: 'Framework',   value: 'Playwright TypeScript',                cls: ''      },
  { label: 'Language',    value: 'TypeScript',                           cls: ''      },
  { label: 'App',         value: 'POPPA Back-Office Web',                cls: ''      },
  { label: 'Status',      value: 'Ready To Test STG',                    cls: 'green' },
  { label: 'Subtask',     value: 'PP-244 (QA)',                          cls: 'blue'  },
];

const TECHNIQUE_ROWS = [
  {
    module: 'Delete Account button visibility',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'AC 1.1 requires button to be accessible from Account Settings.',
  },
  {
    module: 'Confirmation Dialog',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'AC 1.2 requires dialog before any deletion action.',
  },
  {
    module: 'Cancel flow (no deletion)',
    badges: [['st', 'ST']] as [string, string][],
    rationale: 'Dialog dismiss → account intact — one transition with one clear postcondition.',
  },
  {
    module: 'Successful deletion',
    badges: [['st', 'ST']] as [string, string][],
    rationale: 'Multi-step: confirm → API → logout → redirect.',
  },
  {
    module: 'Force logout after deletion',
    badges: [['st', 'ST']] as [string, string][],
    rationale: 'Session must be cleared immediately after deletion.',
  },
  {
    module: 'Re-login prevention',
    badges: [['manual', 'Error Guessing']] as [string, string][],
    rationale: 'Using deleted credentials must be rejected by the auth system.',
  },
  {
    module: 'API error on deletion',
    badges: [['manual', 'Error Guessing']] as [string, string][],
    rationale: 'Network or server failure during deletion — account must NOT be deleted.',
  },
];

const COVERAGE_ROWS = [
  { mod: 'Delete button accessibility',      badges: [['ep', 'Spec']] as [string, string][], existing: 'PP244-TC-001', risk: ['high', 'High'] as [string, string], pct: 95 },
  { mod: 'Confirmation dialog content',      badges: [['ep', 'Spec']] as [string, string][], existing: 'PP244-TC-002', risk: ['high', 'High'] as [string, string], pct: 95 },
  { mod: 'Cancel flow — dialog dismissed',   badges: [['st', 'ST']] as [string, string][], existing: 'PP244-TC-003', risk: ['high', 'High'] as [string, string], pct: 95 },
  { mod: 'Successful deletion — happy path', badges: [['st', 'ST']] as [string, string][], existing: 'PP244-TC-004', risk: ['high', 'High'] as [string, string], pct: 97 },
  { mod: 'Force logout and redirect',        badges: [['st', 'ST']] as [string, string][], existing: 'PP244-TC-005', risk: ['high', 'High'] as [string, string], pct: 95 },
  { mod: 'Re-login prevention',              badges: [['manual', 'EG']] as [string, string][], existing: 'PP244-TC-006', risk: ['high', 'High'] as [string, string], pct: 95 },
  { mod: 'Deletion API failure',             badges: [['manual', 'EG']] as [string, string][], existing: 'PP244-TC-007', risk: ['medium', 'Medium'] as [string, string], pct: 90 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '13',   lbl: 'Total States'      },
  { cls: 'blue',  num: '11',   lbl: 'Total Transitions' },
  { cls: 'green', num: '24',   lbl: 'Covered'           },
  { cls: 'green', num: '0',    lbl: 'Missing'           },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['STG Organizer account (shared)',    'Valid organizer for TC-001 to TC-003 — account must NOT be deleted'],
  ['STG Organizer account (throwaway)', 'Dedicated test account created solely for TC-004 / TC-006 — to be deleted during test'],
  ['Throwaway account credentials',     'Email + password for throwaway account (stored in test config, not hardcoded)'],
  ['Protected route URL',               'URL of a protected Back-Office page (e.g. /organizer/dashboard) for TC-005'],
  ['API error simulation',              'STG env flag or proxy to force 5xx on DELETE /account endpoint (TC-007)'],
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
export default function PP244Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-244</span> · Delete Organizer Account</h2>
        <p>Test design for POPPA Back-Office Organizer account deletion — covering confirmation dialog, soft-delete API flow, force logout, landing page redirect, re-login prevention, and API error handling.</p>
        <div className="hero-stats">
          {[['7','Test Cases'],['24','States & Transitions'],['100%','Coverage'],['6','Automatable']].map(([v, l]) => (
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
        <SectionHeader num="A" title="Technique Selection" subtitle="7 modules · 3 techniques" />
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="7 TCs · 100% coverage" />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Module</th><th>Technique(s)</th><th>TCs</th><th>Risk</th><th>Coverage %</th></tr></thead>
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
                <td><strong>Total</strong></td><td /><td><strong>7</strong></td><td /><td><strong>7 TCs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 1 — Master flow */}
      <FlowSection def={MASTER_FLOW_SECTION} />

      {/* 2–3 — Sub-flows */}
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* 4–7 — TC sections */}

      {/* C — Coverage Report */}
      <section className="section" id="coverage-map">
        <SectionHeader num="C" title="Coverage Report" subtitle="States × Transitions × Test Cases" />
        <div className="coverage-summary">
          {COVERAGE_STAT_CARDS.map(({ cls, num, lbl }) => (
            <div key={lbl} className={`cov-card ${cls}`}><div className="num">{num}</div><div className="lbl">{lbl}</div></div>
          ))}
        </div>
        <div style={{ background: 'rgba(76,175,80,.07)', border: '1px solid rgba(76,175,80,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 16 }}>
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 13 states and 11 transitions are covered by the 7 test cases. No missing coverage items.
        </div>
        <div style={{ background: 'rgba(33,150,243,.07)', border: '1px solid rgba(33,150,243,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 12 }}>
          <strong style={{ color: 'var(--blue)' }}>Critical:</strong> TC-004 must use a throwaway STG Organizer account provisioned per-run by a before-hook (create account via API → run deletion test). Never delete the shared test organizer account. TC-007 (API error) requires a network mock or proxy intercept.
        </div>
      </section>

      {/* D — Automation Notes */}
      <section className="section" id="automation">
        <SectionHeader num="D" title="Automation Notes" />
        <div className="note-grid">
          <div className="note-card">
            <h4>Framework &amp; Spec</h4>
            <ul>
              <li><code>Playwright TypeScript</code></li>
              <li>Spec: <code>src/test/web/organizer/PP-244.delete-organizer-account.web.ts</code></li>
              <li>Automatable: TC-001 through TC-006</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Throwaway Account Setup</h4>
            <ul>
              <li>TC-004 must use a dedicated throwaway account provisioned per-run</li>
              <li>Before-hook: create account via API → run deletion test</li>
              <li>Never delete the shared test organizer account</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Session Validation (TC-005)</h4>
            <ul>
              <li>Assert auth token is invalidated by calling a protected API endpoint with old token</li>
              <li>Expect 401 Unauthorized on stale token reuse</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Manual / Partial</h4>
            <ul>
              <li><strong>TC-007</strong> requires network mock (WireMock / mitmproxy) to force 5xx on DELETE /account</li>
              <li>Regression trigger: run before every STG release touching authentication, session management, or account settings</li>
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

      {/* F — Scenario Map */}
      <ScenarioSection
        sectionId="smap-main"
        sectionLetter="F"
        title="Scenario Map — Delete Organizer Account"
        subtitle="DAG path per test case · TC-001–TC-007"
        overviewTitle="Delete Organizer Account Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
        tcMeta={TC_SECTIONS.flatMap(s => s.rows)}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-244" />
      </section>
    </>
  );
}

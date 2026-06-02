import FlowSection from '@/components/FlowSection';
import TcSection from '@/components/TcSection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp228/flows';
import { TC_SECTIONS } from '@/data/pp228/testcases';
import RequirementSection from '@/components/RequirementSection';
import ScenarioSection from '@/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp228/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-228',                       cls: 'blue'  },
  { label: 'Platform',    value: 'Web BO (Organizer Portal)',     cls: ''      },
  { label: 'Framework',   value: 'Playwright (TypeScript)',       cls: ''      },
  { label: 'Language',    value: 'TypeScript',                    cls: ''      },
  { label: 'App',         value: 'POPPA Backoffice (Organizer)',  cls: ''      },
  { label: 'Status',      value: 'Ready To Test STG',             cls: 'green' },
  { label: 'Subtask',     value: 'PP-280 (QA)',                   cls: 'blue'  },
];

const TECHNIQUE_ROWS = [
  {
    module: 'Countdown Timer (60s)',
    badges: [['bva', 'BVA'], ['st', 'ST']] as [string, string][],
    rationale: 'Boundary at 0s (button enables); timer state drives button enabled/disabled.',
  },
  {
    module: 'Button State Control',
    badges: [['st', 'ST']] as [string, string][],
    rationale: 'States: disabled (counting) → enabled (0s) → loading (pressed) → disabled (counting again).',
  },
  {
    module: 'Token Invalidation',
    badges: [['st', 'ST']] as [string, string][],
    rationale: 'Old token → invalid after new resend; only latest token is valid.',
  },
  {
    module: 'Rate Limiting (3-5/hour)',
    badges: [['bva', 'BVA'], ['ep', 'EP']] as [string, string][],
    rationale: 'Boundary at the rate limit ceiling; inside limit vs exceeded.',
  },
  {
    module: 'Token Expiry (15 min)',
    badges: [['bva', 'BVA']] as [string, string][],
    rationale: 'Boundary at 15 minutes — token valid just below, expired at/above.',
  },
  {
    module: 'Loading State / Double-press guard',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'AC 2.3 mandates loading state to prevent duplicate submissions.',
  },
  {
    module: 'API Error Feedback',
    badges: [['manual', 'Error Guessing']] as [string, string][],
    rationale: 'Server error path: timer must not reset; error toast displayed.',
  },
  {
    module: 'Success Feedback',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'AC 4.1 specifies exact success toast text.',
  },
];

const COVERAGE_ROWS = [
  { mod: 'Countdown Timer & Button States',   badges: [['bva', 'BVA'], ['st', 'ST']] as [string, string][], existing: 'PP228-TC-001–PP228-TC-003', risk: ['high', 'High'] as [string, string],   pct: 97 },
  { mod: 'Resend Happy Path',                 badges: [['st', 'ST']] as [string, string][],                  existing: 'PP228-TC-004',              risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Token Invalidation (old OTP)',      badges: [['st', 'ST']] as [string, string][],                  existing: 'PP228-TC-005',              risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Multiple Resends within Limit',     badges: [['ep', 'EP']] as [string, string][],                  existing: 'PP228-TC-006',              risk: ['medium', 'Medium'] as [string, string], pct: 90 },
  { mod: 'Rate Limit Exceeded',               badges: [['bva', 'BVA'], ['ep', 'EP']] as [string, string][], existing: 'PP228-TC-007',              risk: ['high', 'High'] as [string, string],   pct: 92 },
  { mod: 'API Error — no timer reset',        badges: [['manual', 'EG']] as [string, string][],             existing: 'PP228-TC-008',              risk: ['high', 'High'] as [string, string],   pct: 90 },
  { mod: 'Token Expiry (15 min)',             badges: [['bva', 'BVA']] as [string, string][],               existing: 'PP228-TC-009',              risk: ['high', 'High'] as [string, string],   pct: 95 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '21',   lbl: 'Total States'      },
  { cls: 'blue',  num: '15',   lbl: 'Total Transitions' },
  { cls: 'green', num: '36',   lbl: 'Covered'           },
  { cls: 'green', num: '0',    lbl: 'Missing'           },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['STG Organizer account (fresh)',   'Newly registered account with unverified email'],
  ['Original registration email',    'test-organizer-verify@example.com'],
  ['Email inbox access',             'Mailosaur or test SMTP inbox to read OTP codes'],
  ['OTP from first email',           'Retrieved via email inbox API'],
  ['OTP from resent email',          'Retrieved via email inbox API after second resend'],
  ['Expired OTP',                    'OTP created > 15 minutes ago (time-advance in STG DB or wait)'],
  ['Rate-limit maxed account',       'Account that has triggered resend 5 times within the same hour'],
  ['Network mock',                   'WireMock or Playwright network intercept returning HTTP 500 on resend endpoint'],
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
export default function PP228Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-228</span> · Organizer Resend Verification Email</h2>
        <p>Test design for the POPPA Backoffice Organizer resend verification email flow — covering countdown timer behaviour, button state transitions, token invalidation, rate limiting, token expiry, and feedback toasts.</p>
        <div className="hero-stats">
          {[['9','Test Cases'],['36','States & Transitions'],['100%','Coverage'],['4','Fully Auto']].map(([v, l]) => (
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="9 TCs · 100% coverage" />
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
                <td><strong>Total</strong></td><td /><td><strong>9</strong></td><td /><td><strong>9 TCs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 1 — Master flow */}
      <FlowSection def={MASTER_FLOW_SECTION} />

      {/* 2–5 — Sub-flows */}
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* 6–10 — TC sections */}
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
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 21 states and 15 transitions are covered by the 9 test cases. No missing coverage items.
        </div>
        <div style={{ background: 'rgba(33,150,243,.07)', border: '1px solid rgba(33,150,243,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 12 }}>
          <strong style={{ color: 'var(--blue)' }}>Partial Automation Notes:</strong> TC-005/TC-006 require email inbox integration (Mailosaur). TC-007 requires pre-seeded rate-limit state. TC-008 requires network mock (HTTP 500). TC-009 requires OTP timestamp manipulation.
        </div>
      </section>

      {/* D — Automation Notes */}
      <section className="section" id="automation">
        <SectionHeader num="D" title="Automation Notes" />
        <div className="note-grid">
          <div className="note-card">
            <h4>Framework &amp; Spec</h4>
            <ul>
              <li><code>Playwright (TypeScript)</code></li>
              <li>Spec: <code>src/test/web-bo/auth/PP-228.resend-verification-email.web.ts</code></li>
              <li>Fully automatable: TC-001, TC-002, TC-003, TC-004</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Timer Testing Approach</h4>
            <ul>
              <li>Use <code>page.waitForFunction()</code> at BVA boundaries (59s, 60s, 61s)</li>
              <li>Avoid fixed sleeps — prefer <code>waitUntil(() =&gt; element.isEnabled())</code></li>
              <li>Use Playwright clock mocking for fast timer tests</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Partial Automation</h4>
            <ul>
              <li><strong>TC-005, TC-006</strong> — require Mailosaur inbox integration for OTP comparison</li>
              <li><strong>TC-007</strong> — requires pre-seeded rate-limit state via API</li>
              <li><strong>TC-008</strong> — requires Playwright network interception returning HTTP 500</li>
              <li><strong>TC-009</strong> — requires time manipulation of OTP creation timestamp in STG DB</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Regression Trigger</h4>
            <ul>
              <li>Run before every STG release touching email verification</li>
              <li>Run when resend cooldown or rate limit configuration changes</li>
              <li>Run when OTP expiry logic changes</li>
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
        title="Scenario Map — Resend Verification Email"
        subtitle="DAG path per test case · TC-001–TC-009"
        overviewTitle="Resend Verification Email Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-228" />
      </section>
    </>
  );
}

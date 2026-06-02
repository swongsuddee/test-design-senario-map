import FlowSection from '@/components/FlowSection';
import TcSection from '@/components/TcSection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp227/flows';
import { TC_SECTIONS } from '@/data/pp227/testcases';
import RequirementSection from '@/components/RequirementSection';
import ScenarioSection from '@/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp227/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-227',                             cls: 'blue'  },
  { label: 'Platform',    value: 'Web (Backoffice — Organizer Portal)', cls: ''      },
  { label: 'Framework',   value: 'Playwright (TypeScript)',             cls: ''      },
  { label: 'Language',    value: 'TypeScript',                          cls: ''      },
  { label: 'App',         value: 'POPPA Backoffice (Organizer)',        cls: ''      },
  { label: 'Status',      value: 'Ready To Test STG',                   cls: 'green' },
  { label: 'Subtask',     value: 'PP-245 (QA)',                         cls: 'blue'  },
];

const TECHNIQUE_ROWS = [
  {
    module: 'Email Format Validation',
    badges: [['ep', 'EP'], ['bva', 'BVA']] as [string, string][],
    rationale: 'Valid vs invalid email formats; boundary between accepted and rejected patterns.',
  },
  {
    module: 'Rate Limit (60s cooldown)',
    badges: [['bva', 'BVA'], ['st', 'ST']] as [string, string][],
    rationale: 'Boundary at exactly 60s; button state transitions (enabled → disabled → re-enabled).',
  },
  {
    module: 'Generic Security Response',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'AC 1.3 mandates identical response for found/not-found emails — fixed behaviour check.',
  },
  {
    module: 'Token Security (expiry, one-time use)',
    badges: [['st', 'ST']] as [string, string][],
    rationale: 'Token states: valid → expired, valid → used, new request → old invalidated.',
  },
  {
    module: 'Password Strength Validation',
    badges: [['ep', 'EP'], ['dt', 'DT']] as [string, string][],
    rationale: 'Matrix of missing character classes (uppercase, lowercase, digit, length).',
  },
  {
    module: 'Password Match Validation',
    badges: [['dt', 'DT']] as [string, string][],
    rationale: 'Match vs mismatch × strength valid vs invalid.',
  },
  {
    module: 'Password Reuse Guard',
    badges: [['manual', 'EG']] as [string, string][],
    rationale: 'New password = old password edge case.',
  },
  {
    module: 'Show/Hide Password Toggle',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'Eye icon toggles input type between `password` and `text`.',
  },
  {
    module: 'Post-Reset Actions',
    badges: [['st', 'ST']] as [string, string][],
    rationale: 'Force logout → notification email → redirect + toast.',
  },
];

const COVERAGE_ROWS = [
  { mod: 'Email Format Validation',       badges: [['ep', 'EP'], ['bva', 'BVA']] as [string, string][],  existing: 'PP227-TC-001–003', risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Security — Generic Response',   badges: [['ep', 'Spec']] as [string, string][],                existing: 'PP227-TC-001, TC-004', risk: ['high', 'High'] as [string, string], pct: 97 },
  { mod: 'Rate Limit',                    badges: [['bva', 'BVA'], ['st', 'ST']] as [string, string][],  existing: 'PP227-TC-005',     risk: ['high', 'High'] as [string, string],   pct: 90 },
  { mod: 'Token Security',                badges: [['st', 'ST']] as [string, string][],                  existing: 'PP227-TC-006–009', risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Password Strength',             badges: [['ep', 'EP'], ['dt', 'DT']] as [string, string][],    existing: 'PP227-TC-010–012', risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Password Match',                badges: [['dt', 'DT']] as [string, string][],                  existing: 'PP227-TC-013',     risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Password Reuse Guard',          badges: [['manual', 'EG']] as [string, string][],              existing: 'PP227-TC-014',     risk: ['medium', 'Medium'] as [string, string], pct: 90 },
  { mod: 'Show/Hide Toggle',              badges: [['ep', 'Spec']] as [string, string][],                existing: 'PP227-TC-015',     risk: ['low', 'Low'] as [string, string],     pct: 95 },
  { mod: 'Post-Reset Actions',            badges: [['st', 'ST']] as [string, string][],                  existing: 'PP227-TC-016',     risk: ['high', 'High'] as [string, string],   pct: 92 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '25',   lbl: 'Total States'      },
  { cls: 'blue',  num: '21',   lbl: 'Total Transitions' },
  { cls: 'green', num: '46',   lbl: 'Covered'           },
  { cls: 'green', num: '0',    lbl: 'Missing'           },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['Registered Organizer email',     'test-organizer@example.com (STG account)'],
  ['Unregistered email',             'ghost@notexist.com'],
  ['Invalid email — no @',           'invalidemail.com'],
  ['Invalid email — no TLD dot',     'abc@com'],
  ['Valid strong password',          'Secure123'],
  ['Password below minimum length',  'Ab1 (3 chars), Abcdef1 (7 chars), Abcdefg1 (8 chars — boundary)'],
  ['Password no uppercase',          'alllowercase1'],
  ['Password no lowercase',          'ALLUPPERCASE1'],
  ['Password no digit',              'NoDigitsHere'],
  ['Mismatched confirm',             'Password: Secure123 / Confirm: Different99'],
  ['Current account password',       'Known current password for reuse guard test'],
  ['Expired reset token',            'STG token > 30 minutes old, or database-seeded expired token'],
  ['Used reset token',               'Token from a previously completed reset flow'],
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
export default function PP227Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-227</span> · Organizer Forgot Password Flow (Web BO)</h2>
        <p>Test design for the POPPA Backoffice Organizer Portal Forgot Password flow — covering email request &amp; format validation, 60-second rate limit, generic security response, token security (expiry, one-time use, invalidation), password strength &amp; match rules, password reuse guard, show/hide toggle, and post-reset force logout with success notification.</p>
        <div className="hero-stats">
          {[['16','Test Cases'],['46','States & Transitions'],['100%','Coverage'],['11','Automatable']].map(([v, l]) => (
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
        <SectionHeader num="A" title="Technique Selection" subtitle="9 modules · 6 techniques" />
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="16 TCs · 100% coverage" />
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
                <td><strong>Total</strong></td><td /><td><strong>16</strong></td><td /><td><strong>16 TCs</strong></td>
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
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 25 states and 21 transitions are covered by the 16 test cases. No missing coverage items.
        </div>
        <div style={{ background: 'rgba(33,150,243,.07)', border: '1px solid rgba(33,150,243,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 12 }}>
          <strong style={{ color: 'var(--blue)' }}>Partial automation notes:</strong> TC-007 and TC-008 require pre-seeded or time-manipulated tokens. TC-009 requires email inbox integration (Mailosaur). TC-014 requires known current credentials. TC-016 requires a multi-session test harness for force-logout verification.
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
              <li>Spec: <code>src/test/web/auth/PP-227.forgot-password.web.ts</code></li>
              <li>Automatable (Yes): TC-001–006, TC-010–013, TC-015</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Email Inbox Integration</h4>
            <ul>
              <li>Use Mailosaur or similar SMTP testing service</li>
              <li>Required for TC-001, TC-004, TC-009, TC-016 to assert received emails</li>
              <li>Assert reset link uniqueness per TC-009</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Partial Automation</h4>
            <ul>
              <li><strong>TC-007</strong> — Requires time manipulation or pre-expired STG token</li>
              <li><strong>TC-008</strong> — Requires a previously-used reset token pre-seeded in STG</li>
              <li><strong>TC-009</strong> — Multi-step token state check needs email inbox integration</li>
              <li><strong>TC-014</strong> — Password reuse is a backend check; requires known current credentials</li>
              <li><strong>TC-016</strong> — Force-logout verification requires multi-session test harness</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Regression Trigger</h4>
            <ul>
              <li>Run before every STG release touching authentication</li>
              <li>Run when password policy or email dispatch services change</li>
              <li>Run on any change to token generation or invalidation logic</li>
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
        title="Scenario Map — Organizer Forgot Password Flow"
        subtitle="DAG path per test case · TC-001–016"
        overviewTitle="Forgot Password Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-227" />
      </section>
    </>
  );
}

import FlowSection from '@/components/FlowSection';
import TcSection from '@/components/TcSection';
import ScenarioSection from '@/components/ScenarioSection';
import ClarifySection from '@/components/ClarifySection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp2/flows';
import { TC_SECTIONS } from '@/data/pp2/testcases';
import { PL_EDGES, PL_NODES, PL_SCENARIOS } from '@/data/pp2/phone';
import { OTP_EDGES, OTP_NODES, OTP_SCENARIOS } from '@/data/pp2/otp';
import { SL_EDGES, SL_NODES, SL_SCENARIOS } from '@/data/pp2/social';
import { IL_EDGES, IL_NODES, IL_SCENARIOS } from '@/data/pp2/linking';
import { OB_EDGES, OB_NODES, OB_SCENARIOS } from '@/data/pp2/onboarding';
import { SS_EDGES, SS_NODES, SS_SCENARIOS } from '@/data/pp2/session';
import { EC_EDGES, EC_NODES, EC_SCENARIOS } from '@/data/pp2/edge';
import { CONFLICT_ITEMS } from '@/data/pp2/conflicts';
import RequirementSection from '@/components/RequirementSection';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-2',                        cls: 'blue'   },
  { label: 'Platform',    value: 'Mobile (iOS / Android)',       cls: ''       },
  { label: 'Framework',   value: 'WebdriverIO + Appium + Mocha', cls: ''       },
  { label: 'Language',    value: 'TypeScript',                   cls: ''       },
  { label: 'App',         value: 'POPPA Flutter App',            cls: ''       },
  { label: 'Status',      value: 'Ready To Test STG',            cls: 'green'  },
  { label: 'Subtask',     value: 'PP-10 (QA)',                   cls: 'blue'   },
  { label: 'Revision',    value: '▲2',                           cls: 'orange' },
];

const TECHNIQUE_ROWS = [
  { module: 'Phone Input Validation',    badges: [['ep','EP'],['bva','BVA']] as [string,string][],           rationale: '10-digit rule creates clear BVA boundaries at 9 / 10 / 11. Auto-clean dashes/spaces is a separate EP valid class.' },
  { module: 'OTP Validation',            badges: [['st','State Transition'],['bva','BVA']] as [string,string][], rationale: 'OTP screen has distinct states (waiting, error, resend-ready, rate-limited). BVA on digit count: 5 under / 6 exact.' },
  { module: 'Social Login — Google / LINE', badges: [['st','State Transition']] as [string,string][],         rationale: 'Linear OAuth → email check → profile check. Two exit states per provider.' },
  { module: 'Apple Login',               badges: [['st','State Transition'],['dt','Decision Table']] as [string,string][], rationale: 'Two conditions: Hide Email (Yes/No) × User type (New/Existing) = 4 combinations.' },
  { module: 'Identity Linking',          badges: [['dt','Decision Table']] as [string,string][],              rationale: 'Email in system (Yes/No) × Same provider (Yes/No) → 3 meaningful outcomes.' },
  { module: 'Onboarding — PDPA',         badges: [['st','State Transition']] as [string,string][],            rationale: 'Binary gate: Accept → proceed / Decline → blocked.' },
  { module: 'Onboarding — Basic Identity', badges: [['ep','EP'],['bva','BVA']] as [string,string][],          rationale: 'Name (empty/valid), DOB (future/today-boundary/valid-past/min-age boundary), Gender (none/selected).' },
  { module: 'Onboarding — Interests',    badges: [['bva','BVA']] as [string,string][],                        rationale: 'Count boundaries: 0 blocked / 1 min valid / 3 max valid / 4 blocked.' },
  { module: 'Session Persistence',       badges: [['st','ST'],['dt','Decision Table']] as [string,string][],  rationale: 'Token exists × valid × near-expiry → 4 distinct outcomes.' },
];

const COVERAGE_ROWS = [
  { mod: 'Phone Input Validation',     badges: [['ep','EP'],['bva','BVA']] as [string,string][],             existing: 'PP2-TC-001–005', newTc: '▲ PP2-TC-037',     risk: ['high','High'],   pct: 97 },
  { mod: 'OTP Validation',             badges: [['st','State Transition'],['bva','BVA']] as [string,string][], existing: 'PP2-TC-006–010', newTc: '▲ PP2-TC-038',   risk: ['high','High'],   pct: 97 },
  { mod: 'Social Login — Google / LINE', badges: [['st','State Transition']] as [string,string][],            existing: 'PP2-TC-011–014', newTc: null,              risk: ['high','High'],   pct: 97 },
  { mod: 'Apple Login',                badges: [['st','ST'],['dt','DT']] as [string,string][],               existing: 'PP2-TC-015–017, PP2-TC-035', newTc: null,   risk: ['high','High'],   pct: 97 },
  { mod: 'Identity Linking',           badges: [['dt','Decision Table']] as [string,string][],               existing: 'PP2-TC-018–020', newTc: '▲ PP2-TC-039',     risk: ['high','High'],   pct: 95 },
  { mod: 'Onboarding — PDPA',          badges: [['st','State Transition']] as [string,string][],             existing: 'PP2-TC-021–022', newTc: null,               risk: ['medium','Medium'], pct: 97 },
  { mod: 'Onboarding — Basic Identity', badges: [['ep','EP'],['bva','BVA']] as [string,string][],            existing: 'PP2-TC-023–027', newTc: '▲ PP2-TC-040, 041', risk: ['medium','Medium'], pct: 90 },
  { mod: 'Onboarding — Interests',     badges: [['bva','BVA']] as [string,string][],                         existing: 'PP2-TC-028–030', newTc: null,               risk: ['medium','Medium'], pct: 97 },
  { mod: 'Session Persistence',        badges: [['st','ST'],['dt','DT']] as [string,string][],               existing: 'PP2-TC-031–032', newTc: '▲ PP2-TC-042, 043', risk: ['medium','Medium'], pct: 97 },
  { mod: 'Edge Cases',                 badges: [] as [string,string][],                                       existing: 'PP2-TC-033–036', newTc: null,               risk: ['low','Low'],      pct: 97 },
];

const SCENARIO_SECTIONS = [
  { sectionId: 'smap-phone',      letter: 'F', title: 'Scenario Map — Phone Login',        subtitle: 'DAG path per test case · TC-001, 002, 005, 037',       overviewTitle: 'State & Transition Overview — Phone Login Module (S1–S10)', nodes: PL_NODES, edges: PL_EDGES, scenarios: PL_SCENARIOS },
  { sectionId: 'smap-otp',        letter: 'G', title: 'Scenario Map — OTP Flow',            subtitle: 'DAG path per test case · TC-006, 007, 008, 009, 010, 038', overviewTitle: 'State & Transition Overview — OTP Module (S5–S10)',    nodes: OTP_NODES, edges: OTP_EDGES, scenarios: OTP_SCENARIOS },
  { sectionId: 'smap-social',     letter: 'H', title: 'Scenario Map — Social Login',        subtitle: 'DAG path per test case · TC-011–017, 035',              overviewTitle: 'Social Login Complete DAG',      techniqueBadge: { label: 'State Transition', cls: 'st' }, nodes: SL_NODES, edges: SL_EDGES, scenarios: SL_SCENARIOS },
  { sectionId: 'smap-linking',    letter: 'I', title: 'Scenario Map — Identity Linking',    subtitle: 'DAG path per test case · TC-018–020, 036, 039',         overviewTitle: 'Identity Linking Complete DAG',  techniqueBadge: { label: 'Decision Table', cls: 'dt' }, nodes: IL_NODES, edges: IL_EDGES, scenarios: IL_SCENARIOS },
  { sectionId: 'smap-onboarding', letter: 'J', title: 'Scenario Map — Onboarding',          subtitle: 'DAG path per test case · TC-021–030, 040–041',          overviewTitle: 'Onboarding Complete DAG',        techniqueBadge: { label: 'State Transition + EP + BVA', cls: 'st' }, nodes: OB_NODES, edges: OB_EDGES, scenarios: OB_SCENARIOS },
  { sectionId: 'smap-session',    letter: 'K', title: 'Scenario Map — Session Persistence', subtitle: 'DAG path per test case · TC-031–032, 042–043',          overviewTitle: 'Session Persistence Complete DAG', techniqueBadge: { label: 'State Transition + Decision Table', cls: 'dt' }, nodes: SS_NODES, edges: SS_EDGES, scenarios: SS_SCENARIOS },
  { sectionId: 'smap-edge',       letter: 'L', title: 'Scenario Map — Edge Cases',          subtitle: 'DAG path per test case · TC-033–034',                   overviewTitle: 'Edge Cases DAG',                 techniqueBadge: { label: 'Error Guessing', cls: 'manual' }, nodes: EC_NODES, edges: EC_EDGES, scenarios: EC_SCENARIOS },
];

const MISSING_COVERAGE = [
  'S29 · OTP Error during onboarding phone verification — no TC covers this state',
  'T29 · Phone OTP wrong in onboarding — error path and retry has no TC',
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '40',    lbl: 'Total States'  },
  { cls: 'blue',  num: '36',    lbl: 'Total Transitions' },
  { cls: 'green', num: '97.4%', lbl: 'Covered'       },
  { cls: 'red',   num: '2',     lbl: 'Missing'        },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['Test phone — new user',       'Unregistered Thai mobile in +66XXXXXXXXX format; env var TEST_PHONE_NEW'],
  ['Test phone — existing user',  'Pre-registered phone in STG DB; env var TEST_PHONE_EXISTING'],
  ['Test OTP — valid',            'Fixed STG OTP or SMS intercept; env var TEST_OTP'],
  ['Test OTP — invalid',          'Any 6-digit value that does not match; env var TEST_OTP_WRONG'],
  ['Google email — new',          'Unregistered Gmail address for OAuth new-user tests'],
  ['Google email — existing',     'Pre-seeded in STG DB as Google account e.g. test+link@gmail.com'],
  ['LINE email — new',            'Unregistered LINE account'],
  ['Apple test account',          'Apple Developer test account (physical device only)'],
  ['Minimum age (TC-040, 041)',   'DOB = today − 18 years → accepted; DOB = today − 18 years + 1 day → rejected'],
  ['Near-expiry token (TC-043)', 'STG token-expiry control API or time-travel mechanism'],
  ['DOB — valid past',           '01/01/1990 (AD / ค.ศ.)'],
  ['DOB — future',               '01/01/2050'],
  ['DOB — today',                'Dynamically computed at test runtime'],
  ['Profile display name',       'Test User QA'],
  ['Interests',                  "['sport', 'lifestyle', 'travel']"],
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
export default function PP2Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-2</span> · Registration &amp; Login</h2>
        <p>End-to-end test design for the POPPA Mobile App authentication system — covering 4 login methods, OTP, identity linking, new-user onboarding, and session persistence.</p>
        <div className="hero-stats">
          {[['68','Test Cases'],['82','States & Transitions'],['97.4%','Coverage'],['51','Automatable']].map(([v, l]) => (
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
        <SectionHeader num="A" title="Technique Selection" subtitle="9 modules · 5 techniques" />
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="36 original + 7 new = 43 TCs" />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Module</th><th>Technique(s)</th><th>Existing TCs</th><th>New TCs</th><th>Risk</th><th>Coverage %</th></tr></thead>
            <tbody>
              {COVERAGE_ROWS.map(row => (
                <tr key={row.mod}>
                  <td>{row.mod}</td>
                  <td>{row.badges.map(([c, l]) => <B key={c} cls={c} label={l} />)}</td>
                  <td>{row.existing}</td>
                  <td>{row.newTc ? <B cls="new" label={row.newTc} /> : '—'}</td>
                  <td><B cls={row.risk[0]} label={row.risk[1]} /></td>
                  <td><div className="cov-bar-wrap"><div className="cov-bar" style={{ width: `${row.pct}px` }} /><span className="cov-pct">{row.pct}%</span></div></td>
                </tr>
              ))}
              <tr style={{ background: 'rgba(255,107,53,.05)' }}>
                <td><strong>Total</strong></td><td /><td><strong>36</strong></td><td><strong>7</strong></td><td /><td><strong>43 TCs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 1 — Master flow */}
      <FlowSection def={MASTER_FLOW_SECTION} />

      {/* 2–5 — Sub-flows */}
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* 6–14 — TC sections */}
      {TC_SECTIONS.map(def => <TcSection key={def.sectionId} def={def} />)}

      {/* C — Coverage Report */}
      <section className="section" id="coverage-map">
        <SectionHeader num="C" title="Coverage Report" subtitle="States × Transitions × Test Cases" />
        <div className="coverage-summary">
          {COVERAGE_STAT_CARDS.map(({ cls, num, lbl }) => (
            <div key={lbl} className={`cov-card ${cls}`}><div className="num">{num}</div><div className="lbl">{lbl}</div></div>
          ))}
        </div>
        <div style={{ marginBottom: 16 }}>
          {MISSING_COVERAGE.map(msg => (
            <div key={msg} className="missing-badge" style={{ borderColor: 'rgba(244,67,54,.4)', background: 'rgba(244,67,54,.08)' }}>
              <strong>{msg.split('·')[0]}</strong>·{msg.split('·').slice(1).join('·')}
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(33,150,243,.07)', border: '1px solid rgba(33,150,243,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13 }}>
          <strong style={{ color: 'var(--blue)' }}>Recommendation:</strong> Add a test case for onboarding phone OTP error handling (S29 / T29) in the next round once this path is implemented in the Flutter app.
        </div>
      </section>

      {/* D — Automation Notes */}
      <section className="section" id="automation">
        <SectionHeader num="D" title="Automation Notes" />
        <div className="note-grid">
          <div className="note-card">
            <h4>Framework &amp; Spec</h4>
            <ul>
              <li><code>WebdriverIO + Appium + Mocha</code></li>
              <li>Spec: <code>src/test/mobile/auth/PP-2.registration-login.mobile.ts</code></li>
              <li>Page Objects: <code>src/page/mobile/auth/</code> and <code>src/page/mobile/onboarding/</code></li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Ready to Implement (▲ New)</h4>
            <ul>
              <li><code>PP2-TC-037</code> — 11-digit BVA upper boundary</li>
              <li><code>PP2-TC-038</code> — 5-digit OTP BVA lower boundary</li>
              <li><code>PP2-TC-042</code> — Fresh install, no token</li>
              <li><code>PP2-TC-040, 041</code> — Age 18 boundary (DOB)</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Not Automatable</h4>
            <ul>
              <li><strong>Apple Sign In</strong> (TC-015–017, 035) — System sheet; physical device only</li>
              <li><strong>Social OAuth</strong> (TC-011–014, 018–020, 036, 039) — Requires pre-authenticated WebView</li>
              <li><strong>Rate limit</strong> (TC-008, 034) — Needs STG reset API or 5-min wait</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Requires STG Setup</h4>
            <ul>
              <li><code>PP2-TC-032, 042</code> — Token expiry control or keychain clear</li>
              <li><code>PP2-TC-043</code> — STG API to set short token TTL</li>
              <li><code>PP2-TC-001, 005–010</code> — Fixed OTP in STG env or SMS intercept</li>
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

      {/* F–L — Scenario Maps */}
      {SCENARIO_SECTIONS.map(({ sectionId, letter, title, subtitle, overviewTitle, techniqueBadge, nodes, edges, scenarios }) => (
        <ScenarioSection
          key={sectionId}
          sectionId={sectionId} sectionLetter={letter}
          title={title} subtitle={subtitle}
          overviewTitle={overviewTitle}
          techniqueBadge={techniqueBadge}
          nodes={nodes} edges={edges} scenarios={scenarios}
        />
      ))}

      {/* Conflict & Clarify */}
      <section className="section" id="conflict-notes">
        <div className="section-header">
          <div className="section-title">Requirement Clarifications &amp; Conflicts</div>
          <div className="section-subtitle">{CONFLICT_ITEMS.length} item{CONFLICT_ITEMS.length !== 1 ? 's' : ''}</div>
        </div>
        <ClarifySection items={CONFLICT_ITEMS} />
      </section>

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-2" />
      </section>
    </>
  );
}

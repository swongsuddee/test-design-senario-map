import FlowSection from '@/client/components/FlowSection';
import ScenarioSection from '@/client/components/ScenarioSection';
import ClarifySection from '@/client/components/ClarifySection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/user-auth/flows';
import { TC_SECTIONS } from '@/data/user-auth/testcases';
import { CONFLICT_ITEMS } from '@/data/user-auth/conflicts';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/user-auth/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Story',      value: 'USER-AUTH',                            cls: 'blue'  },
  { label: 'Platform',   value: 'API',                                  cls: ''      },
  { label: 'Framework',  value: 'Playwright APIRequestContext',          cls: ''      },
  { label: 'Language',   value: 'TypeScript',                           cls: ''      },
  { label: 'Gate',       value: 'PP-566 OTP bypass (STG only)',         cls: 'orange' },
  { label: 'Status',     value: 'Names updated · TC-008 pending',        cls: 'orange' },
  { label: 'Login spec', value: 'USER-AUTH-OTP-LOGIN.spec.ts',          cls: ''      },
  { label: 'Reg spec',   value: 'USER-AUTH-OTP-REGISTER.spec.ts',       cls: ''      },
];

const CONTRACT_ENDPOINTS: { method: string; path: string; reqFields: string; resFields: string }[] = [
  {
    method: 'POST',
    path: '/api/v1/auth/phone/request-otp',
    reqFields: 'countryCode: string, phoneNumber: string',
    resFields: '200: { token, refNo, expiredAt } · 400: schema or phone validation error',
  },
  {
    method: 'POST',
    path: '/api/v1/auth/phone/verify-otp',
    reqFields: 'providerType: PROVIDER_TYPE_PHONE, token: string, pin: string (6 digits)',
    resFields: '200: { accessToken, refreshToken, isRegistered } · 401: wrong pin or invalid session · 400: schema error',
  },
  {
    method: 'POST',
    path: '/api/v1/auth/refresh',
    reqFields: 'refreshToken: string',
    resFields: '200: { accessToken, refreshToken, isRegistered } · 401: invalid refreshToken',
  },
  {
    method: 'GET',
    path: '/api/v1/user/profile',
    reqFields: 'Authorization: Bearer {accessToken}',
    resFields: '200: { id, name, phone, ... } · 401: invalid token',
  },
];

const TECHNIQUE_ROWS = [
  {
    module: 'request-otp — phone validation',
    badges: [['ep', 'EP'], ['bva', 'BVA']] as [string, string][],
    rationale: 'Pattern ^[0-9]{9,10}$ creates BVA boundaries at 8/9/10/11 digits. Letters and +prefix are separate EP invalid classes.',
  },
  {
    module: 'verify-otp — bypass path',
    badges: [['ep', 'Scenario']] as [string, string][],
    rationale: 'Single PP-566 bypass happy path; verify full 200 token contract (accessToken, refreshToken, isRegistered: true) for a registered phone.',
  },
  {
    module: 'verify-otp — otp validation',
    badges: [['ep', 'EP'], ['bva', 'BVA']] as [string, string][],
    rationale: 'Fixed 6-digit format: BVA at 5/6/7 chars, EP for non-numeric.',
  },
  {
    module: 'Full registration journey',
    badges: [['st', 'ST']] as [string, string][],
    rationale: 'State transition: request-otp → verify-otp → profile. Covers new-user auto-creation and returning-user idempotency.',
  },
  {
    module: 'Token refresh',
    badges: [['st', 'ST']] as [string, string][],
    rationale: 'Verify token rotation: refreshToken → new accessToken.',
  },
];

const COVERAGE_ROWS = [
  { mod: 'request-otp happy path',      badges: [['ep', 'Scenario']] as [string, string][], tcs: 'UA-REG-TC-001~002', risk: ['high', 'High'] as [string, string], pct: 95 },
  { mod: 'request-otp validation 400',  badges: [['ep', 'EP'], ['bva', 'BVA']] as [string, string][], tcs: 'UA-REG-TC-003~005, TC-010~013', risk: ['high', 'High'] as [string, string], pct: 97 },
  { mod: 'verify-otp bypass 200',       badges: [['ep', 'Scenario']] as [string, string][], tcs: 'UA-LOGIN-TC-001~003, UA-REG-TC-006', risk: ['high', 'High'] as [string, string], pct: 98 },
  { mod: 'verify-otp auth failures 401', badges: [['ep', 'EP']] as [string, string][], tcs: 'UA-LOGIN-TC-004, UA-LOGIN-TC-008', risk: ['high', 'High'] as [string, string], pct: 90 },
  { mod: 'verify-otp schema 400',       badges: [['ep', 'EP'], ['bva', 'BVA']] as [string, string][], tcs: 'UA-LOGIN-TC-005~014', risk: ['medium', 'Medium'] as [string, string], pct: 95 },
  { mod: 'Full registration journey',   badges: [['st', 'ST']] as [string, string][], tcs: 'UA-REG-TC-007~008', risk: ['high', 'High'] as [string, string], pct: 97 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '18',   lbl: 'Total States'      },
  { cls: 'blue',  num: '16',   lbl: 'Total Transitions' },
  { cls: 'green', num: '27',   lbl: 'Test Cases'        },
  { cls: 'green', num: '27',   lbl: 'Automatable'       },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['Timestamp phone (9-digit)',     'String(Date.now()).slice(-9) — unique per run, e.g. "780412345"'],
  ['Timestamp phone (10-digit)',    '"0" + timestampPhone() — upper boundary'],
  ['Bypass OTP',                    '"123456" — PP-566 staging bypass (ENABLE_OTP_BYPASS=true required)'],
  ['Wrong OTP',                     '"000000" — valid format but non-bypass → 401'],
  ['Registered phone',              'Any phone registered via a prior registration run'],
  ['Unregistered phone',            'timestampPhone() called fresh — no prior request-otp/verify-otp'],
  ['Phone 8 digits',                '"08123456" — BVA lower boundary (below ^[0-9]{9,10}$)'],
  ['Phone 11 digits',               '"08123456789" — BVA upper boundary violation'],
  ['Phone with +66 prefix',         '"+66812345678" — EP invalid class (+ rejected by pattern)'],
  ['Phone with letters',            '"abc123456" — EP invalid class'],
  ['OTP 5 digits',                  '"12345" — BVA lower boundary'],
  ['OTP 7 digits',                  '"1234567" — BVA upper boundary violation'],
  ['OTP non-numeric',               '"abcdef" — EP invalid class'],
  ['refreshToken',                  'Captured from verify-otp 200 response body'],
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
export default function UserAuthPage() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Implemented · POPPA API · STG</div>
        <h2><span>USER-AUTH</span> · User Auth API (OTP)</h2>
        <p>
          Test design for the POPPA User Auth OTP endpoints — covering phone OTP registration
          (<code>request-otp → verify-otp → profile</code>), login (<code>verify-otp</code>),
          and token refresh. All tests use the <strong>PP-566 bypass</strong> (<code>pin: &quot;123456&quot;</code>)
          and timestamp phone (<code>String(Date.now()).slice(-9)</code>) for collision-free CI runs.
        </p>
        <div className="hero-stats">
          {[['27','Test Cases'],['34','States & Transitions'],['Review','Status'],['27','Automatable']].map(([v, l]) => (
            <div key={l} className="stat">
              <div className="stat-value">{v}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* See also banner */}
      <div style={{ background: 'rgba(33,150,243,.07)', border: '1px solid rgba(33,150,243,.2)', borderRadius: 8, padding: '10px 16px', fontSize: 13, marginBottom: 16 }}>
        <strong style={{ color: 'var(--blue)' }}>Related:</strong>{' '}
        The mobile-app phone login flow (OTP UI, onboarding, session) is documented in{' '}
        <a href="/pp2" style={{ color: 'var(--blue)' }}>PP-2 · Registration &amp; Login</a>.
        This page covers the underlying API layer only.
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

      {/* Endpoint Contract */}
      <section className="section" id="contract">
        <SectionHeader num="0" title="Endpoint Contract" subtitle="4 endpoints · reviewed against current endpoint schema" />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Path</th><th>Request</th><th>Responses</th></tr></thead>
            <tbody>
              {CONTRACT_ENDPOINTS.map(({ method, path, reqFields, resFields }) => (
                <tr key={path}>
                  <td><B cls={method === 'GET' ? 'blue' : 'green'} label={method} /></td>
                  <td><code>{path}</code></td>
                  <td><code>{reqFields}</code></td>
                  <td style={{ fontSize: 12 }}>{resFields}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ background: 'rgba(255,152,0,.07)', border: '1px solid rgba(255,152,0,.25)', borderRadius: 8, padding: '10px 14px', fontSize: 12, marginTop: 10 }}>
          <strong style={{ color: '#FF9800' }}>PP-566 bypass:</strong>{' '}
          <code>pin: &quot;123456&quot;</code> skips SMS on STG when <code>ENABLE_OTP_BYPASS=true</code>.
          New users are auto-created on first <code>verify-otp</code> — no separate registration endpoint.
          Phone request contract is <code>{'{ countryCode, phoneNumber }'}</code>; <code>phoneNumber</code> still follows <code>^[0-9]&#123;9,10&#125;$</code>.
        </div>
      </section>

      {/* A — Technique Selection */}
      <section className="section" id="techniques">
        <SectionHeader num="A" title="Technique Selection" subtitle="5 modules · EP + BVA + ST" />
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="27 designed TCs · TC-008 login pending clarification" />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Group</th><th>Technique(s)</th><th>TCs</th><th>Risk</th><th>Coverage %</th></tr></thead>
            <tbody>
              {COVERAGE_ROWS.map(row => (
                <tr key={row.mod}>
                  <td>{row.mod}</td>
                  <td>{row.badges.map(([c, l]) => <B key={c} cls={c} label={l} />)}</td>
                  <td style={{ fontSize: 12 }}>{row.tcs}</td>
                  <td><B cls={row.risk[0]} label={row.risk[1]} /></td>
                  <td><div className="cov-bar-wrap"><div className="cov-bar" style={{ width: `${row.pct}px` }} /><span className="cov-pct">{row.pct}%</span></div></td>
                </tr>
              ))}
              <tr style={{ background: 'rgba(255,107,53,.05)' }}>
                <td><strong>Total</strong></td><td /><td><strong>27</strong></td><td /><td><strong>27 designed TCs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Flows */}
      <FlowSection def={MASTER_FLOW_SECTION} />
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* F — Scenario Map (TC metadata merged into each card) */}
      <ScenarioSection
        sectionId="smap-main"
        sectionLetter="F"
        title="Scenario Map — User Auth API (OTP)"
        subtitle="API state machine · UA-LOGIN-TC-001–014 + UA-REG-TC-001–013"
        overviewTitle="State & Transition Overview — User Auth OTP Flow"
        techniqueBadge={{ label: 'State Transition', cls: 'st' }}
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
        tcMeta={TC_SECTIONS.flatMap(s => s.rows)}
        overviewOpts={{ cellW: 180, cellH: 110, pad: 64 }}
      />

      {/* C — Coverage Report */}
      <section className="section" id="coverage-map">
        <SectionHeader num="C" title="Coverage Report" subtitle="4 endpoints × status codes × 25 TCs" />
        <div className="coverage-summary">
          {COVERAGE_STAT_CARDS.map(({ cls, num, lbl }) => (
            <div key={lbl} className={`cov-card ${cls}`}><div className="num">{num}</div><div className="lbl">{lbl}</div></div>
          ))}
        </div>
        <div style={{ background: 'rgba(76,175,80,.07)', border: '1px solid rgba(76,175,80,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 16 }}>
          <strong style={{ color: 'var(--green)' }}>Coverage review:</strong>{' '}
          Core endpoint paths and payload fields have been reviewed against the current endpoint schema.
          Happy path, profile usability, refresh, and major validation classes are represented, but open review comments remain on token-contract assertions and unregistered-phone behavior.
        </div>
        <div style={{ background: 'rgba(255,152,0,.07)', border: '1px solid rgba(255,152,0,.25)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 12 }}>
          <strong style={{ color: '#FF9800' }}>Out of scope:</strong>{' '}
          Social login (Google / LINE / Apple), identity linking, and OTP rate-limiting are covered
          in <a href="/pp2" style={{ color: 'var(--blue)' }}>PP-2</a> (mobile E2E). Logout and resend-otp
          endpoints exist in the endpoint collection but are not covered by this page yet.
        </div>
      </section>

      <section className="section" id="conflict-notes">
        <SectionHeader num="C" title="Conflicts & Clarify" subtitle="Review comments attached to affected test cases" />
        <ClarifySection items={CONFLICT_ITEMS} />
      </section>

      {/* D — Automation Notes */}
      <section className="section" id="automation">
        <SectionHeader num="D" title="Automation Notes" />
        <div className="note-grid">
          <div className="note-card">
            <h4>Framework &amp; Specs</h4>
            <ul>
              <li><code>Playwright APIRequestContext</code></li>
              <li>Login: <code>USER-AUTH-OTP-LOGIN.spec.ts</code></li>
              <li>Register: <code>USER-AUTH-OTP-REGISTER.spec.ts</code></li>
              <li>Helpers: <code>src/api/user/auth.api.ts</code></li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Timestamp Phone Strategy</h4>
            <ul>
              <li><code>String(Date.now()).slice(-9)</code> → unique 9-digit phone</li>
              <li>No fixture DB seeding required for registration tests</li>
              <li>Uniqueness window: ~277 hours before digit rollover</li>
              <li>10-digit variant: <code>&quot;0&quot; + timestampPhone()</code></li>
            </ul>
          </div>
          <div className="note-card">
            <h4>PP-566 OTP Bypass</h4>
            <ul>
              <li>Bypass: <code>pin: &quot;123456&quot;</code> on any valid OTP session</li>
              <li>Requires: <code>ENABLE_OTP_BYPASS=true</code> on STG</li>
              <li>Production: bypass inactive — real SMS required</li>
              <li>Unregistered-phone verify behavior is under review — see clarify notes</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Status</h4>
            <ul>
              <li>Core user-auth specs are implemented in Playwright APIRequestContext</li>
              <li>One case is partial pending behavior clarification: UA-LOGIN-TC-008</li>
              <li>Review drift remains between some designed cases and current assertions</li>
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
    </>
  );
}

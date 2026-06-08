import FlowSection from '@/client/components/FlowSection';
import TcSection from '@/client/components/TcSection';
import ClarifySection from '@/client/components/ClarifySection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/user-profile/flows';
import { TC_SECTIONS } from '@/data/user-profile/testcases';
import { CONFLICT_ITEMS } from '@/data/user-profile/conflicts';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Story',      value: 'USER-PROFILE',                        cls: 'blue'   },
  { label: 'Service',    value: 'ProfileService',                      cls: ''       },
  { label: 'Platform',   value: 'API',                                  cls: ''       },
  { label: 'Framework',  value: 'Playwright APIRequestContext',          cls: ''       },
  { label: 'Language',   value: 'TypeScript',                           cls: ''       },
  { label: 'Auth',       value: 'Bearer accessToken (from verify-otp)', cls: ''       },
  { label: 'Status',     value: 'Draft — Pending Implementation',       cls: 'orange' },
];

const CONTRACT_ENDPOINTS: { method: string; path: string; reqNote: string; resNote: string; cls: string }[] = [
  {
    method: 'GET',
    path: '/api/v1/user/profile',
    reqNote: 'Authorization: Bearer {token}',
    resNote: '200: { id*, name*, bio?, phone?, avatar?, interests?, stats? } · 401: no/bad token',
    cls: 'blue',
  },
  {
    method: 'PATCH',
    path: '/api/v1/user/profile',
    reqNote: 'Bearer + body: { name? (≤50), bio? (≤250), phone? } · additionalProperties: false',
    resNote: '200: { success, data: { id, name, bio, phone } } · 400: validation · 401: auth',
    cls: 'orange',
  },
  {
    method: 'PUT',
    path: '/api/v1/user/interests',
    reqNote: 'Bearer + body: { interests: string[] } · minItems: 1, maxItems: 3',
    resNote: '200: { success, interests: string[] } · 400: count violation',
    cls: 'green',
  },
  {
    method: 'DELETE',
    path: '/api/v1/user/account',
    reqNote: 'Bearer + body: { reason: string (≤500) } · additionalProperties: false',
    resNote: '200: { success, message? } · 400: validation · 401: auth',
    cls: 'high',
  },
];

const TECHNIQUE_ROWS = [
  {
    module: 'GET profile — response contract',
    badges: [['ep', 'Scenario']] as [string, string][],
    rationale: 'Single happy path; verify required fields (id, name) and optional field shapes (avatar: uri, stats object).',
  },
  {
    module: 'PATCH profile — field validation',
    badges: [['ep', 'EP'], ['bva', 'BVA']] as [string, string][],
    rationale: 'name maxLength: 50 and bio maxLength: 250 create clear BVA boundaries at 50/51 and 250/251. All fields optional (empty body valid EP class).',
  },
  {
    module: 'PUT interests — array count',
    badges: [['bva', 'BVA']] as [string, string][],
    rationale: 'minItems: 1 and maxItems: 3 produce four BVA points: 0 (invalid), 1 (min), 3 (max), 4 (invalid).',
  },
  {
    module: 'DELETE account — reason + lifecycle',
    badges: [['ep', 'EP'], ['bva', 'BVA'], ['st', 'ST']] as [string, string][],
    rationale: 'reason maxLength: 500 (BVA at 500/501). State: active account → delete → second request 401. Throwaway account pattern for isolation.',
  },
  {
    module: 'Auth guard — all endpoints',
    badges: [['ep', 'EP']] as [string, string][],
    rationale: 'Missing header and invalid token are two distinct EP invalid classes; test both on every endpoint.',
  },
];

const COVERAGE_ROWS = [
  { mod: 'GET profile',        badges: [['ep', 'Scenario']] as [string, string][], tcs: 'UP-TC-001–004', risk: ['high', 'High'] as [string, string], pct: 98 },
  { mod: 'PATCH profile',      badges: [['ep', 'EP'], ['bva', 'BVA']] as [string, string][], tcs: 'UP-TC-005–015', risk: ['high', 'High'] as [string, string], pct: 95 },
  { mod: 'PUT interests',      badges: [['bva', 'BVA']] as [string, string][], tcs: 'UP-TC-016–023', risk: ['medium', 'Medium'] as [string, string], pct: 97 },
  { mod: 'DELETE account',     badges: [['ep', 'EP'], ['bva', 'BVA'], ['st', 'ST']] as [string, string][], tcs: 'UP-TC-024–030', risk: ['high', 'High'] as [string, string], pct: 90 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',   num: '22', lbl: 'Total States'      },
  { cls: 'blue',   num: '18', lbl: 'Total Transitions' },
  { cls: 'green',  num: '30', lbl: 'Test Cases'        },
  { cls: 'green',  num: '30', lbl: 'Automatable'       },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['Valid accessToken',           'From POST /api/v1/auth/verify-otp with bypass OTP=123456'],
  ['Invalid token',               'Any non-empty string that is not a valid JWT'],
  ['name — 50 chars (BVA)',       '"A".repeat(50)'],
  ['name — 51 chars (BVA+1)',     '"A".repeat(51)'],
  ['bio — 250 chars (BVA)',       '"B".repeat(250)'],
  ['bio — 251 chars (BVA+1)',     '"B".repeat(251)'],
  ['reason — 500 chars (BVA)',    '"R".repeat(500)'],
  ['reason — 501 chars (BVA+1)', '"R".repeat(501)'],
  ['interests — 1 item',          '["sport"]'],
  ['interests — 3 items',         '["sport", "lifestyle", "travel"]'],
  ['interests — 4 items',         '["sport", "lifestyle", "travel", "music"]'],
  ['Throwaway account (DELETE)',  'Create via timestampPhone() + bypass OTP, use once then delete'],
];

// ── Badge / Header helpers ────────────────────────────────────────────────────
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
export default function UserProfilePage() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Draft · POPPA API · ProfileService</div>
        <h2><span>USER-PROFILE</span> · User Profile API</h2>
        <p>
          Test design for the POPPA User Profile API — covering profile read (<code>GET</code>),
          profile update (<code>PATCH</code>), interests replacement (<code>PUT</code>),
          and account deletion (<code>DELETE</code>). All endpoints require Bearer auth obtained
          via the <a href="/user-auth" style={{ color: 'var(--blue)' }}>User Auth API</a>.
        </p>
        <div className="hero-stats">
          {[['30','Test Cases'],['40','States & Transitions'],['95%','Coverage'],['30','Automatable']].map(([v, l]) => (
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

      {/* Endpoint Contract */}
      <section className="section" id="contract">
        <SectionHeader num="0" title="Endpoint Contract" subtitle="4 endpoints · ProfileService" />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Method</th><th>Path</th><th>Request</th><th>Responses</th></tr></thead>
            <tbody>
              {CONTRACT_ENDPOINTS.map(({ method, path, reqNote, resNote, cls }) => (
                <tr key={path + method}>
                  <td><B cls={cls} label={method} /></td>
                  <td><code>{path}</code></td>
                  <td style={{ fontSize: 12 }}>{reqNote}</td>
                  <td style={{ fontSize: 12 }}>{resNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ background: 'rgba(255,152,0,.07)', border: '1px solid rgba(255,152,0,.25)', borderRadius: 8, padding: '10px 14px', fontSize: 12, marginTop: 10 }}>
          <strong style={{ color: '#FF9800' }}>Note:</strong>{' '}
          <code>PUT /api/v1/user/interests</code> only documents a 200 response — no 400 schema defined even though
          <code> minItems/maxItems</code> constraints exist. Assumed standard validation error response.
          <code> DELETE /api/v1/user/account</code> has <code>required: [&quot;reason&quot;]</code> but no <code>minLength</code> — empty string behaviour unconfirmed (see C1).
        </div>
      </section>

      {/* A — Technique Selection */}
      <section className="section" id="techniques">
        <SectionHeader num="A" title="Technique Selection" subtitle="5 groups · EP + BVA + ST" />
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="30 TCs · 4 endpoints" />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Endpoint</th><th>Technique(s)</th><th>TCs</th><th>Risk</th><th>Coverage %</th></tr></thead>
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
                <td><strong>Total</strong></td><td /><td><strong>30</strong></td><td /><td><strong>30 TCs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Flows */}
      <FlowSection def={MASTER_FLOW_SECTION} />
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* TC sections */}
      {TC_SECTIONS.map(def => <TcSection key={def.sectionId} def={def} />)}

      {/* Conflicts */}
      <section className="section" id="conflict-notes">
        <ClarifySection items={CONFLICT_ITEMS} />
      </section>

      {/* C — Coverage Report */}
      <section className="section" id="coverage-map">
        <SectionHeader num="C" title="Coverage Report" subtitle="4 endpoints × status codes × 30 TCs" />
        <div className="coverage-summary">
          {COVERAGE_STAT_CARDS.map(({ cls, num, lbl }) => (
            <div key={lbl} className={`cov-card ${cls}`}><div className="num">{num}</div><div className="lbl">{lbl}</div></div>
          ))}
        </div>
        <div style={{ background: 'rgba(76,175,80,.07)', border: '1px solid rgba(76,175,80,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 16 }}>
          <strong style={{ color: 'var(--green)' }}>Coverage note:</strong>{' '}
          DELETE account coverage is 90% pending C1 resolution (empty-string reason behaviour).
          All other endpoints fully covered.
        </div>
      </section>

      {/* D — Automation Notes */}
      <section className="section" id="automation">
        <SectionHeader num="D" title="Automation Notes" />
        <div className="note-grid">
          <div className="note-card">
            <h4>Auth Setup</h4>
            <ul>
              <li>All tests require <code>accessToken</code> from <code>POST /api/v1/auth/verify-otp</code></li>
              <li>Use <code>timestampPhone()</code> + bypass OTP <code>&quot;123456&quot;</code></li>
              <li>Reuse token within a <code>test.describe</code> via <code>beforeAll</code></li>
            </ul>
          </div>
          <div className="note-card">
            <h4>DELETE account isolation</h4>
            <ul>
              <li>UP-TC-024 and UP-TC-025 must use throwaway accounts</li>
              <li>Pattern: create via <code>timestampPhone()</code> + bypass → delete</li>
              <li>Never delete the shared token account used by other tests</li>
              <li>Run DELETE suite last or in an isolated worker</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>BVA string generation</h4>
            <ul>
              <li><code>&quot;A&quot;.repeat(50)</code> — name 50 chars boundary</li>
              <li><code>&quot;B&quot;.repeat(250)</code> — bio 250 chars boundary</li>
              <li><code>&quot;R&quot;.repeat(500)</code> — reason 500 chars boundary</li>
              <li>Add one char for the &quot;over boundary&quot; test</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Status</h4>
            <ul>
              <li>All 30 TCs: automatable via Playwright APIRequestContext</li>
              <li>Spec file: <code>USER-PROFILE.api.spec.ts</code> (to be created)</li>
              <li>Pending: C1 resolution before UP-TC-027 can be finalized</li>
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

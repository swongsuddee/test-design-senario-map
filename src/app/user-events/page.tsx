import FlowSection from '@/client/components/FlowSection';
import TcSection from '@/client/components/TcSection';
import ClarifySection from '@/client/components/ClarifySection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/user-events/flows';
import { TC_SECTIONS } from '@/data/user-events/testcases';
import { CONFLICT_ITEMS } from '@/data/user-events/conflicts';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Story',      value: 'USER-EVENTS',                          cls: 'blue'   },
  { label: 'Service',    value: 'EventService',                          cls: ''       },
  { label: 'Platform',   value: 'API',                                   cls: ''       },
  { label: 'Framework',  value: 'Playwright APIRequestContext',           cls: ''       },
  { label: 'Language',   value: 'TypeScript',                            cls: ''       },
  { label: 'Auth',       value: 'Bearer accessToken (from verify-otp)',  cls: ''       },
  { label: 'Status',     value: 'Draft — Pending Implementation',        cls: 'orange' },
];

const CONTRACT_ENDPOINTS: { method: string; path: string; reqNote: string; resNote: string; cls: string }[] = [
  {
    method: 'GET',
    path: '/api/v1/events',
    reqNote: 'Bearer auth · query: q? (string), page? (number), limit? (number)',
    resNote: '200: { data: Event[], meta: { total, page, limit } } · 401: no/bad token',
    cls: 'blue',
  },
  {
    method: 'POST',
    path: '/api/v1/events/{eventId}/save',
    reqNote: 'Bearer auth · path param: eventId (string, required)',
    resNote: '200: { success: boolean, saved: boolean } · 401: no/bad token · 404: TBD',
    cls: 'green',
  },
];

const TECHNIQUE_ROWS = [
  {
    module: 'GET events — default + response schema',
    badges: [['ep', 'Scenario']] as [string, string][],
    rationale: 'Verify data array + meta object shape. Each event item must have required id and title.',
  },
  {
    module: 'GET events — query parameters',
    badges: [['ep', 'EP']] as [string, string][],
    rationale: 'q (search), page, and limit are independent optional params — each is a separate EP valid class. Out-of-range page is the key EP invalid class.',
  },
  {
    module: 'POST events/{eventId}/save — save state',
    badges: [['st', 'ST']] as [string, string][],
    rationale: 'Two states: saved:true / saved:false. Toggle behaviour (C1) or idempotent. State transition test across two calls.',
  },
  {
    module: 'Auth guard — both endpoints',
    badges: [['ep', 'EP']] as [string, string][],
    rationale: 'Missing header and invalid token are two EP invalid classes. Both tested on each endpoint.',
  },
];

const COVERAGE_ROWS = [
  { mod: 'GET events',       badges: [['ep', 'Scenario'], ['ep', 'EP']] as [string, string][], tcs: 'UE-TC-001–007', risk: ['high', 'High'] as [string, string], pct: 95 },
  { mod: 'POST events save', badges: [['st', 'ST']] as [string, string][], tcs: 'UE-TC-008–012', risk: ['medium', 'Medium'] as [string, string], pct: 85 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',   num: '13', lbl: 'Total States'      },
  { cls: 'blue',   num: '10', lbl: 'Total Transitions' },
  { cls: 'green',  num: '12', lbl: 'Test Cases'        },
  { cls: 'green',  num: '12', lbl: 'Automatable'       },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['Valid accessToken',         'From POST /api/v1/auth/verify-otp with bypass OTP=123456'],
  ['Invalid token',             'Any non-empty string that is not a valid JWT'],
  ['Search keyword (q)',        'A known event title keyword present in STG DB'],
  ['Valid eventId',             'An event id from GET /api/v1/events response'],
  ['Non-existent eventId',      '"nonexistent-" + Date.now() — no such event in DB'],
  ['Pagination: large page',   '{ page: 9999, limit: 10 } — expected empty data array'],
  ['Pagination: limit=5',       '{ page: 1, limit: 5 } — verify meta.limit reflects param'],
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
export default function UserEventsPage() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Draft · POPPA API · EventService</div>
        <h2><span>USER-EVENTS</span> · User Event API</h2>
        <p>
          Test design for the POPPA User Event API — covering event listing with search and
          pagination (<code>GET /api/v1/events</code>) and event save/unsave toggle
          (<code>POST /api/v1/events/&#123;eventId&#125;/save</code>). Both endpoints require
          Bearer auth from the <a href="/user-auth" style={{ color: 'var(--blue)' }}>User Auth API</a>.
        </p>
        <div className="hero-stats">
          {[['12','Test Cases'],['23','States & Transitions'],['90%','Coverage'],['12','Automatable']].map(([v, l]) => (
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
        <SectionHeader num="0" title="Endpoint Contract" subtitle="2 endpoints · EventService" />
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
          <strong style={{ color: '#FF9800' }}>Open questions:</strong>{' '}
          <code>POST /events/&#123;eventId&#125;/save</code> only documents a 200 response — no 401 or 404 defined in schema.
          Toggle vs idempotent behaviour unconfirmed (C1). Non-existent eventId response code unconfirmed (C2).
        </div>
      </section>

      {/* A — Technique Selection */}
      <section className="section" id="techniques">
        <SectionHeader num="A" title="Technique Selection" subtitle="4 groups · EP + ST" />
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="12 TCs · 2 endpoints" />
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
                <td><strong>Total</strong></td><td /><td><strong>12</strong></td><td /><td><strong>12 TCs</strong></td>
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
        <SectionHeader num="C" title="Coverage Report" subtitle="2 endpoints × status codes × 12 TCs" />
        <div className="coverage-summary">
          {COVERAGE_STAT_CARDS.map(({ cls, num, lbl }) => (
            <div key={lbl} className={`cov-card ${cls}`}><div className="num">{num}</div><div className="lbl">{lbl}</div></div>
          ))}
        </div>
        <div style={{ background: 'rgba(255,152,0,.07)', border: '1px solid rgba(255,152,0,.25)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 12 }}>
          <strong style={{ color: '#FF9800' }}>Pending clarification:</strong>{' '}
          POST events save coverage is 85% until C1 (toggle vs idempotent) and C2 (non-existent eventId) are resolved.
          UE-TC-009 and UE-TC-010 assertions will be updated once confirmed.
        </div>
      </section>

      {/* D — Automation Notes */}
      <section className="section" id="automation">
        <SectionHeader num="D" title="Automation Notes" />
        <div className="note-grid">
          <div className="note-card">
            <h4>Auth Setup</h4>
            <ul>
              <li>Obtain <code>accessToken</code> via <code>verify-otp</code> bypass</li>
              <li>Use <code>timestampPhone()</code> to register a fresh account</li>
              <li>Share token across all tests in <code>beforeAll</code></li>
            </ul>
          </div>
          <div className="note-card">
            <h4>GET events — seeded data</h4>
            <ul>
              <li>Tests assume at least one event exists in STG DB</li>
              <li>UE-TC-003 needs a known keyword — use env var <code>TEST_EVENT_KEYWORD</code></li>
              <li>UE-TC-008 needs a valid <code>eventId</code> from the GET response</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>POST save — dynamic eventId</h4>
            <ul>
              <li>Fetch eventId from <code>GET /api/v1/events</code> in <code>beforeAll</code></li>
              <li>Non-existent id: <code>&quot;nonexistent-&quot; + Date.now()</code></li>
              <li>UE-TC-009 assertion pending C1 resolution</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Status</h4>
            <ul>
              <li>All 12 TCs: automatable via Playwright APIRequestContext</li>
              <li>Spec file: <code>USER-EVENTS.api.spec.ts</code> (to be created)</li>
              <li>Pending: C1 + C2 resolution before final assertions</li>
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

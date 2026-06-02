import FlowSection from '@/components/FlowSection';
import TcSection from '@/components/TcSection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/org-auth/flows';
import { TC_SECTIONS } from '@/data/org-auth/testcases';
import RequirementSection from '@/components/RequirementSection';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Story',      value: 'ORG-AUTH',                               cls: 'blue'  },
  { label: 'Platform',   value: 'API',                                    cls: ''      },
  { label: 'Framework',  value: 'Playwright APIRequestContext',            cls: ''      },
  { label: 'Language',   value: 'TypeScript',                             cls: ''      },
  { label: 'Endpoint',   value: 'POST /api/v1/organizer/auth/login',      cls: ''      },
  { label: 'Status',     value: 'Pending Implementation',                 cls: 'blue'  },
  { label: 'Spec file',  value: 'src/test/api/ORG-AUTH.api.spec.ts',     cls: ''      },
];

const CONTRACT_REQUEST_ROWS: [string, string, string, string][] = [
  ['email',    'string', 'format: email',  'Required'],
  ['password', 'string', 'minLength: 8',   'Required'],
];

const CONTRACT_RESPONSE_ROWS: [string, string, string][] = [
  ['200', 'accessToken (string), refreshToken (string), expiresIn (number), tokenType (enum: "Bearer")', 'accessToken, refreshToken, expiresIn'],
  ['401', 'error (string), message (string)', 'error, message'],
  ['400', 'error (string), message (string) — assumed standard', 'error and/or message'],
];

const TECHNIQUE_ROWS = [
  {
    module: 'Login — valid credentials',
    badges: [['ep', 'Scenario']] as [string, string][],
    rationale: 'Single happy path; verify full 200 response contract.',
  },
  {
    module: 'Login — auth failures',
    badges: [['manual', 'EG'], ['ep', 'EP']] as [string, string][],
    rationale: 'Wrong password vs unregistered email — same 401, no enumeration leakage.',
  },
  {
    module: 'Login — schema validation',
    badges: [['ep', 'EP'], ['bva', 'BVA']] as [string, string][],
    rationale: 'Required fields, email format, password minLength boundary.',
  },
  {
    module: 'Login — extra fields',
    badges: [['manual', 'EG']] as [string, string][],
    rationale: '`additionalProperties: false` constraint on request body.',
  },
];

const COVERAGE_ROWS = [
  { mod: 'Happy path — 200',        badges: [['ep', 'Scenario']] as [string, string][], existing: 'OA-TC-001', risk: ['high', 'High'] as [string, string], pct: 98 },
  { mod: 'Auth failures — 401',     badges: [['ep', 'EP'], ['manual', 'EG']] as [string, string][], existing: 'OA-TC-002–OA-TC-003', risk: ['high', 'High'] as [string, string], pct: 95 },
  { mod: 'Schema validation — 400', badges: [['ep', 'EP'], ['bva', 'BVA']] as [string, string][], existing: 'OA-TC-004–OA-TC-009', risk: ['high', 'High'] as [string, string], pct: 85 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '17',   lbl: 'Total States'      },
  { cls: 'blue',  num: '13',   lbl: 'Total Transitions' },
  { cls: 'green', num: '9',    lbl: 'Test Cases'        },
  { cls: 'blue',  num: '0',    lbl: 'Implemented'       },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['Valid organizer account',     'STG account; ORGANIZER_EMAIL / ORGANIZER_PASSWORD env vars'],
  ['Unregistered email',          'Any email not in STG DB; e.g. nonexistent-${Date.now()}@test.com'],
  ['Wrong password (valid fmt)',  'Any 8+ char string that is not the correct password'],
  ['7-char password string',      '"Short1!" — must have ≥ 1 letter + number to isolate length failure'],
  ['8-char wrong password',       '"Short1!x" — valid schema, wrong credentials'],
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
export default function OrgAuthPage() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Pending Implementation · POPPA API</div>
        <h2><span>ORG-AUTH</span> · Organizer Auth API</h2>
        <p>Test design for the POPPA Organizer Auth API endpoint — covering happy path token contract, auth failure responses (401), and request schema validation (400) via Playwright APIRequestContext.</p>
        <div className="hero-stats">
          {[['9','Test Cases'],['30','States & Transitions'],['100%','Coverage'],['9','Automatable']].map(([v, l]) => (
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
        <SectionHeader num="0" title="Endpoint Contract" subtitle="POST /api/v1/organizer/auth/login" />
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: 'var(--text-secondary)' }}>Request Body (required · additionalProperties: false)</div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Field</th><th>Type</th><th>Constraint</th><th>Required</th></tr></thead>
              <tbody>
                {CONTRACT_REQUEST_ROWS.map(([field, type, constraint, req]) => (
                  <tr key={field}>
                    <td><code>{field}</code></td>
                    <td>{type}</td>
                    <td><code>{constraint}</code></td>
                    <td>{req}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: 'var(--text-secondary)' }}>Responses</div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Status</th><th>Fields</th><th>Required</th></tr></thead>
              <tbody>
                {CONTRACT_RESPONSE_ROWS.map(([status, fields, req]) => (
                  <tr key={status}>
                    <td><B cls={status === '200' ? 'green' : status === '401' ? 'high' : 'medium'} label={status} /></td>
                    <td><code>{fields}</code></td>
                    <td>{req}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ background: 'rgba(255,152,0,.07)', border: '1px solid rgba(255,152,0,.25)', borderRadius: 8, padding: '10px 14px', fontSize: 12, marginTop: 10 }}>
            <strong style={{ color: '#FF9800' }}>Note:</strong> 400 response body shape is not explicitly defined in the endpoint contract — assumed standard <code>&#123; error, message &#125;</code> based on the <code>createEvent</code> pattern in the same file.
          </div>
        </div>
      </section>

      {/* A — Technique Selection */}
      <section className="section" id="techniques">
        <SectionHeader num="A" title="Technique Selection" subtitle="4 modules · 4 techniques" />
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="9 TCs · 100% endpoint coverage" />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Group</th><th>Technique(s)</th><th>TCs</th><th>Risk</th><th>Coverage %</th></tr></thead>
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
        <div style={{ background: 'rgba(255,152,0,.07)', border: '1px solid rgba(255,152,0,.25)', borderRadius: 8, padding: '10px 14px', fontSize: 12, marginTop: 12 }}>
          * 400 status coverage confidence is 85% — not explicitly defined in endpoint contract; assumed standard validation behaviour.
        </div>
      </section>

      {/* 1 — Master flow */}
      <FlowSection def={MASTER_FLOW_SECTION} />

      {/* 2–4 — Sub-flows */}
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* 5–7 — TC sections */}
      {TC_SECTIONS.map(def => <TcSection key={def.sectionId} def={def} />)}

      {/* C — Coverage Report */}
      <section className="section" id="coverage-map">
        <SectionHeader num="C" title="Coverage Report" subtitle="Endpoint × Status Codes × Test Cases" />
        <div className="coverage-summary">
          {COVERAGE_STAT_CARDS.map(({ cls, num, lbl }) => (
            <div key={lbl} className={`cov-card ${cls}`}><div className="num">{num}</div><div className="lbl">{lbl}</div></div>
          ))}
        </div>
        <div style={{ background: 'rgba(76,175,80,.07)', border: '1px solid rgba(76,175,80,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 16 }}>
          <strong style={{ color: 'var(--green)' }}>Full endpoint coverage:</strong> POST /api/v1/organizer/auth/login is fully covered for 200, 401, and assumed 400 responses. Refresh token and logout endpoints are out of scope (not specified in organizer.endpoint.ts).
        </div>
        <div style={{ background: 'rgba(33,150,243,.07)', border: '1px solid rgba(33,150,243,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 12 }}>
          <strong style={{ color: 'var(--blue)' }}>Out of scope:</strong> Refresh token endpoint and logout endpoint for organizer are <code>[NOT SPECIFIED]</code> in the current endpoint contract — flag for backend team confirmation before implementing.
        </div>
      </section>

      {/* D — Automation Notes */}
      <section className="section" id="automation">
        <SectionHeader num="D" title="Automation Notes" />
        <div className="note-grid">
          <div className="note-card">
            <h4>Framework &amp; Spec</h4>
            <ul>
              <li><code>Playwright APIRequestContext</code></li>
              <li>Pattern: <code>test(&apos;...&apos;, async (&#123; request &#125;) =&gt; &#123; ... &#125;)</code></li>
              <li>Spec: <code>src/test/api/ORG-AUTH.api.spec.ts</code></li>
              <li>Base URL: <code>config.organizer.apiBaseUrl</code> (project: api)</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>BVA TC-008 (Data-Driven)</h4>
            <ul>
              <li>Implement as <code>for...of</code> loop with test data array</li>
              <li><code>&#123; chars: 7, expected: 400 &#125;</code> — minLength violated</li>
              <li><code>&#123; chars: 8, expected: 401 &#125;</code> — schema passes, auth fails</li>
              <li>Boundary is <code>minLength: 8</code></li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Anti-Enumeration (TC-003)</h4>
            <ul>
              <li>Assert body shape only — same <code>error</code> + <code>message</code> structure</li>
              <li>Do NOT assert that error message differs between wrong-password and unknown-email cases</li>
              <li>No auth header required — this IS the auth endpoint</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Status</h4>
            <ul>
              <li>All 9 cases: Pending — none implemented yet</li>
              <li>Missing coverage: Refresh token + logout not specified — confirm with backend</li>
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

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="ORG-AUTH" />
      </section>
    </>
  );
}

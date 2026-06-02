import FlowSection from '@/components/FlowSection';
import TcSection from '@/components/TcSection';
import ClarifySection from '@/components/ClarifySection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp136/flows';
import { TC_SECTIONS } from '@/data/pp136/testcases';
import { CONFLICT_ITEMS } from '@/data/pp136/conflicts';
import RequirementSection from '@/components/RequirementSection';
import ScenarioSection from '@/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp136/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-136',                             cls: 'blue'  },
  { label: 'Platform',    value: 'Web (Back Office — Agency Portal)',   cls: ''      },
  { label: 'Framework',   value: 'WebdriverIO + Mocha',                 cls: ''      },
  { label: 'Language',    value: 'TypeScript',                          cls: ''      },
  { label: 'App',         value: 'POPPA Back Office (Agency BO)',        cls: ''      },
  { label: 'Status',      value: 'Ready To Test STG',                   cls: 'green' },
  { label: 'Subtask',     value: 'PP-136 (QA)',                         cls: 'blue'  },
];

const TECHNIQUE_ROWS = [
  { module: 'Upload Field Visibility',   badges: [['dt', 'Decision Table']] as [string, string][],                          rationale: 'Two Agency types (Individual / Corporate) × field presence (Yes/No) — 2 conditions, exhaustive.' },
  { module: 'File Upload — Valid Types', badges: [['ep', 'EP']] as [string, string][],                                      rationale: 'Valid partition: PDF, JPG, PNG; Invalid partition: all other types.' },
  { module: 'File Upload — Size',        badges: [['bva', 'BVA']] as [string, string][],                                    rationale: 'Boundaries at 10 MB: valid ≤ 10 MB, invalid > 10 MB.' },
  { module: 'Error Message Display',     badges: [['manual', 'Specification-based']] as [string, string][],                 rationale: 'AC specifies error messages for unsupported type and oversized file.' },
];

const COVERAGE_ROWS = [
  { mod: 'Upload Field — Individual', badges: [['dt', 'DT']] as [string, string][],          existing: 'PP136-TC-001', risk: ['high', 'High']   as [string, string], pct: 95 },
  { mod: 'Upload Field — Corporate',  badges: [['dt', 'DT']] as [string, string][],          existing: 'PP136-TC-002', risk: ['high', 'High']   as [string, string], pct: 95 },
  { mod: 'Valid Upload (PDF)',         badges: [['ep', 'EP']] as [string, string][],          existing: 'PP136-TC-003', risk: ['high', 'High']   as [string, string], pct: 95 },
  { mod: 'Invalid File Type',         badges: [['ep', 'EP']] as [string, string][],          existing: 'PP136-TC-004', risk: ['high', 'High']   as [string, string], pct: 97 },
  { mod: 'File Size > 10 MB',         badges: [['bva', 'BVA']] as [string, string][],        existing: 'PP136-TC-005', risk: ['high', 'High']   as [string, string], pct: 97 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '19', lbl: 'Total States'      },
  { cls: 'blue',  num: '13', lbl: 'Total Transitions' },
  { cls: 'green', num: '32', lbl: 'Covered'           },
  { cls: 'green', num: '0',  lbl: 'Missing'           },
];

const AUTOMATION_CARDS = [
  {
    title: 'Framework & Spec',
    items: [
      'WebdriverIO + Mocha (browser automation)',
      'Spec (future): src/test/web/agency/PP-136.book-bank-upload.web.ts',
      'All 5 test cases are automation candidates',
    ],
  },
  {
    title: 'File Injection Strategy',
    items: [
      'Use browser.execute or element.setValue(filePath) to bypass OS file dialog',
      'TC-004: inject .exe file path directly into hidden <input type="file">',
      'TC-005: prepare bookbank_large.jpg ~10.5 MB in test fixtures',
    ],
  },
  {
    title: 'API Validation',
    items: [
      'TC-003: after upload success, assert GET /agency/profile returns non-null bookBankDocumentUrl',
      'TC-004/005: assert no document URL is set after rejection',
    ],
  },
  {
    title: 'STG Setup Required',
    items: [
      'TC-001: STG account with profileType = INDIVIDUAL',
      'TC-002: STG account with profileType = COMPANY',
      'TC-003–005: Agency BO URL on STG; valid auth token',
    ],
  },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['Individual Agency account', 'STG test account with profileType = INDIVIDUAL; pre-logged-in session'],
  ['Corporate Agency account',  'STG test account with profileType = COMPANY; pre-logged-in session'],
  ['Valid PDF file',            'bookbank_valid.pdf — size ≤ 10 MB'],
  ['Valid JPG file',            'bookbank_valid.jpg — size ≤ 10 MB'],
  ['Valid PNG file',            'bookbank_valid.png — size ≤ 10 MB'],
  ['Invalid type file',         'bookbank_invalid.exe (or .zip) — triggers type rejection'],
  ['Oversized file',            'bookbank_large.jpg — size ~10.5 MB (boundary test)'],
  ['STG environment',           'Agency BO URL on STG; valid auth token'],
];

// ── Badge helper ────────────────────────────────────────────────────────────────
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
export default function PP136Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-136</span> · Update Book Bank Account</h2>
        <p>End-to-end test design for the POPPA Back Office Agency Portal — covering Book Bank upload field visibility for Individual and Corporate Agency profiles, and file validation (type and size).</p>
        <div className="hero-stats">
          {[['5', 'Test Cases'], ['32', 'States & Transitions'], ['100%', 'Coverage'], ['5', 'Automatable']].map(([v, l]) => (
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="5 TCs · 100% coverage" />
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
                <td><strong>Total</strong></td><td /><td><strong>5</strong></td><td /><td><strong>5 TCs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 1 — Master flow */}
      <FlowSection def={MASTER_FLOW_SECTION} />

      {/* 2–4 — Sub-flows */}
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* 5–6 — TC sections */}
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
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 19 states and 13 transitions are covered by the 5 test cases. No missing coverage items.
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

      {/* Conflict & Clarify */}
      <section className="section" id="conflict-notes">
        <div className="section-header">
          <div className="section-title">Requirement Clarifications &amp; Conflicts</div>
          <div className="section-subtitle">{CONFLICT_ITEMS.length} item{CONFLICT_ITEMS.length !== 1 ? 's' : ''}</div>
        </div>
        <ClarifySection items={CONFLICT_ITEMS} />
      </section>

      {/* F — Scenario Map */}
      <ScenarioSection
        sectionId="smap-main"
        sectionLetter="F"
        title="Scenario Map — Update Book Bank Account"
        subtitle="DAG path per test case · TC-001–TC-005"
        overviewTitle="Update Book Bank Account Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-136" />
      </section>
    </>
  );
}

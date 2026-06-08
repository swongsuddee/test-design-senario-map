import FlowSection from '@/client/components/FlowSection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp209/flows';
import { TC_SECTIONS } from '@/data/pp209/testcases';
import RequirementSection from '@/client/components/RequirementSection';
import ScenarioSection from '@/client/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp209/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-209',                        cls: 'blue'  },
  { label: 'Platform',    value: 'Mobile (iOS / Android)',         cls: ''      },
  { label: 'Framework',   value: 'WebdriverIO + Appium + Mocha',   cls: ''      },
  { label: 'Language',    value: 'TypeScript',                     cls: ''      },
  { label: 'App',         value: 'POPPA Flutter App',              cls: ''      },
  { label: 'Status',      value: 'Ready To Test STG',              cls: 'green' },
  { label: 'Subtask',     value: 'PP-213 (QA)',                    cls: 'blue'  },
];

const TECHNIQUE_ROWS = [
  {
    module: 'Home Page — All Sections',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'AC specifies 9 sections must all be present; enumerate each as a check.',
  },
  {
    module: 'Event List — Interest-based',
    badges: [['dt', 'DT']] as [string, string][],
    rationale: 'User has interests (Yes/No) × events shown (matching / default) — 2-row decision table.',
  },
  {
    module: 'Bottom Menu Navigation',
    badges: [['st', 'ST']] as [string, string][],
    rationale: 'Four taps × four destination states — exhaustive state transition coverage.',
  },
  {
    module: 'CI / Branding',
    badges: [['ep', 'Spec']] as [string, string][],
    rationale: 'Logo, colour, typography must match Figma node 1691-5924.',
  },
];

const COVERAGE_ROWS = [
  { mod: 'Home Page Sections Rendered',  badges: [['ep', 'Spec']] as [string, string][],  existing: 'PP209-TC-001', risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Event List — With Interests',  badges: [['dt', 'DT']] as [string, string][],    existing: 'PP209-TC-002', risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Event List — No Interests',    badges: [['dt', 'DT']] as [string, string][],    existing: 'PP209-TC-003', risk: ['medium', 'Medium'] as [string, string], pct: 90 },
  { mod: 'Bottom Menu — Home',           badges: [['st', 'ST']] as [string, string][],    existing: 'PP209-TC-004', risk: ['medium', 'Medium'] as [string, string], pct: 95 },
  { mod: 'Bottom Menu — Search',         badges: [['st', 'ST']] as [string, string][],    existing: 'PP209-TC-005', risk: ['high', 'High'] as [string, string],   pct: 95 },
  { mod: 'Bottom Menu — Notifications',  badges: [['st', 'ST']] as [string, string][],    existing: 'PP209-TC-006', risk: ['medium', 'Medium'] as [string, string], pct: 95 },
  { mod: 'Bottom Menu — Profile',        badges: [['st', 'ST']] as [string, string][],    existing: 'PP209-TC-007', risk: ['high', 'High'] as [string, string],   pct: 95 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '30',   lbl: 'Total States'      },
  { cls: 'blue',  num: '12',   lbl: 'Total Transitions' },
  { cls: 'green', num: '42',   lbl: 'Covered'           },
  { cls: 'green', num: '0',    lbl: 'Missing'           },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['STG User — with interests',   'Account with interests = [Running, Yoga] or similar; 2+ interests'],
  ['STG User — no interests',     'Account with no interests configured'],
  ['STG events',                  'At least 5 events across multiple categories; some matching Running/Yoga'],
  ['Figma spec',                  'node 1691-5924 — export or screenshot for visual comparison baseline'],
  ['CI colour palette',           'POPPA brand guide — primary, secondary, background hex codes'],
  ['POPPA logo',                  'Expected logo asset for assertion (content hash or visual match)'],
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
export default function PP209Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-209</span> · Home Main Page (Mobile)</h2>
        <p>Test design for the POPPA Mobile App Home page — covering all section rendering, personalised Event List by User Interests, Bottom Menu navigation, and CI / Mood &amp; Tone / Logo branding compliance.</p>
        <div className="hero-stats">
          {[['7','Test Cases'],['42','States & Transitions'],['100%','Coverage'],['7','Automatable']].map(([v, l]) => (
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
        <SectionHeader num="A" title="Technique Selection" subtitle="4 modules · 3 techniques" />
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
                <td><strong>Total</strong></td><td /><td><strong>7</strong></td><td /><td><strong>7 TCs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 1 — Master flow */}
      <FlowSection def={MASTER_FLOW_SECTION} />

      {/* 2–5 — Sub-flows */}
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* 6–8 — TC sections */}

      {/* C — Coverage Report */}
      <section className="section" id="coverage-map">
        <SectionHeader num="C" title="Coverage Report" subtitle="States × Transitions × Test Cases" />
        <div className="coverage-summary">
          {COVERAGE_STAT_CARDS.map(({ cls, num, lbl }) => (
            <div key={lbl} className={`cov-card ${cls}`}><div className="num">{num}</div><div className="lbl">{lbl}</div></div>
          ))}
        </div>
        <div style={{ background: 'rgba(76,175,80,.07)', border: '1px solid rgba(76,175,80,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 16 }}>
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 30 states and 12 transitions are covered by the 7 test cases. No missing coverage items.
        </div>
        <div style={{ background: 'rgba(33,150,243,.07)', border: '1px solid rgba(33,150,243,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 12 }}>
          <strong style={{ color: 'var(--blue)' }}>Note:</strong> TC-001 covers the most states in a single scenario; it can be split into per-section TCs for granular failure isolation. CI / Branding assertions are best reinforced with visual regression (Percy / Applitools) against Figma node 1691-5924.
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
              <li>Spec: <code>src/test/mobile/home/PP-209.home-main-page.mobile.ts</code></li>
              <li>All 7 TCs automatable via Appium element selectors + API interception</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Section Presence</h4>
            <ul>
              <li>Use Appium element selectors (accessibility IDs or Flutter widget keys) to assert each section container is visible on screen</li>
              <li>Smoke suite: TC-001, TC-002, TC-005, TC-007</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Interest-based Event List</h4>
            <ul>
              <li>Intercept Discovery API response (Appium network proxy or mock server)</li>
              <li>Assert interest query params present; validate at least one event card category matches</li>
              <li>Allow up to 30 seconds for event-driven Discovery API propagation (Kafka)</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Visual Regression</h4>
            <ul>
              <li>Integrate visual snapshot test (Applitools / Percy) for CI / Mood &amp; Tone compliance</li>
              <li>Use baseline screenshots from Figma node 1691-5924</li>
              <li>Run on both iOS and Android to catch platform-specific rendering differences</li>
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
        title="Scenario Map — Home Main Page"
        subtitle="DAG path per test case · TC-001–007"
        overviewTitle="Home Main Page Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
        tcMeta={TC_SECTIONS.flatMap(s => s.rows)}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-209" />
      </section>
    </>
  );
}

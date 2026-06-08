import FlowSection from '@/client/components/FlowSection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp13/flows';
import { TC_SECTIONS } from '@/data/pp13/testcases';
import RequirementSection from '@/client/components/RequirementSection';
import ScenarioSection from '@/client/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp13/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-13',                        cls: 'blue'  },
  { label: 'Platform',    value: 'Mobile (iOS / Android)',        cls: ''      },
  { label: 'Framework',   value: 'WebdriverIO + Appium + Mocha',  cls: ''      },
  { label: 'Language',    value: 'TypeScript',                    cls: ''      },
  { label: 'App',         value: 'POPPA Flutter App',             cls: ''      },
  { label: 'Status',      value: 'Ready To Test STG',             cls: 'green' },
];

const TECHNIQUE_ROWS = [
  { module: 'Firebase SDK Installation',    badges: [['ep','Spec']] as [string,string][],   rationale: 'AC 1.1 lists exact requirements (packages, config files, initializeApp); verify each item.' },
  { module: 'Multi-Flavor Firebase Connection', badges: [['dt','DT']] as [string,string][], rationale: '4 flavors × 2 platforms = 8 connectivity combinations to verify.' },
  { module: 'Misconfiguration / Missing Config', badges: [['manual','EG']] as [string,string][], rationale: 'Missing or wrong config files are the most common integration failures.' },
];

const COVERAGE_ROWS = [
  { mod: 'Firebase SDK installation & init',      badges: [['ep','Spec']] as [string,string][], existing: 'PP13-TC-001–002', risk: ['high','High'] as [string,string],   pct: 95 },
  { mod: 'Multi-Flavor connectivity — Dev',       badges: [['dt','DT']] as [string,string][],   existing: 'PP13-TC-003',     risk: ['high','High'] as [string,string],   pct: 97 },
  { mod: 'Multi-Flavor connectivity — Staging',   badges: [['dt','DT']] as [string,string][],   existing: 'PP13-TC-004',     risk: ['high','High'] as [string,string],   pct: 97 },
  { mod: 'Multi-Flavor connectivity — UAT',       badges: [['dt','DT']] as [string,string][],   existing: 'PP13-TC-005',     risk: ['medium','Medium'] as [string,string], pct: 95 },
  { mod: 'Multi-Flavor connectivity — Prod',      badges: [['dt','DT']] as [string,string][],   existing: 'PP13-TC-006',     risk: ['high','High'] as [string,string],   pct: 95 },
  { mod: 'Misconfiguration error handling',       badges: [['manual','EG']] as [string,string][], existing: 'PP13-TC-007',   risk: ['medium','Medium'] as [string,string], pct: 90 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '12',  lbl: 'Total States'      },
  { cls: 'blue',  num: '11',  lbl: 'Total Transitions' },
  { cls: 'green', num: '23',  lbl: 'Covered'           },
  { cls: 'green', num: '0',   lbl: 'Missing'           },
];

const AUTOMATION_CARDS = [
  {
    title: 'Framework & Spec',
    items: [
      'WebdriverIO + Appium + Mocha (TypeScript)',
      'Spec: src/test/mobile/firebase/PP-13.firebase-integration.mobile.ts',
    ],
  },
  {
    title: 'All 7 TCs are Manual',
    items: [
      'Firebase SDK integration is a build-time and configuration-time concern — not verifiable via Appium UI automation alone',
      'Verification relies on: build logs, Firebase console real-time data, and app startup debug output',
    ],
  },
  {
    title: 'CI/CD Build Step Automation',
    items: [
      'flutter build apk --flavor staging (assert exit code 0)',
      'flutter build ios --flavor staging (assert exit code 0)',
      'Parse app startup logs for Firebase project ID matching the expected flavor',
    ],
  },
  {
    title: 'Regression Trigger',
    items: [
      'Run before every release when Firebase config files, pubspec.yaml Firebase dependencies, or flavor configuration changes',
    ],
  },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['Firebase projects',              'Dev, Staging, UAT, Prod Firebase project configurations'],
  ['Android config files',           'google-services.json per flavor in android/app/src/{flavor}/'],
  ['iOS config files',               'GoogleService-Info.plist per flavor in appropriate target directories'],
  ['Flutter flavor build commands',  'flutter run --flavor dev, --flavor staging, --flavor uat, --flavor prod'],
  ['Verification method',            'Firebase console → Project Settings → active connections; or app startup log'],
  ['Misconfiguration test (TC-007)', 'Remove google-services.json from one flavor directory before build'],
];

// ── Badge helper ───────────────────────────────────────────────────────────────
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
export default function PP13Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-13</span> · Integrate Firebase In App</h2>
        <p>End-to-end test design for Firebase SDK integration — covering SDK installation, multi-flavor Firebase connectivity (Dev / Staging / UAT / Prod), and misconfiguration error handling across iOS and Android.</p>
        <div className="hero-stats">
          {[['7','Test Cases'],['23','States & Transitions'],['100%','Coverage'],['0','Automatable (Manual)']].map(([v, l]) => (
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
        <SectionHeader num="A" title="Technique Selection" subtitle="3 modules · 3 techniques" />
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
            <thead><tr><th>Module</th><th>Technique(s)</th><th>Existing TCs</th><th>Risk</th><th>Confidence %</th></tr></thead>
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

      {/* 4–6 — TC sections */}

      {/* C — Coverage Report */}
      <section className="section" id="coverage-map">
        <SectionHeader num="C" title="Coverage Report" subtitle="States × Transitions × Test Cases" />
        <div className="coverage-summary">
          {COVERAGE_STAT_CARDS.map(({ cls, num, lbl }) => (
            <div key={lbl} className={`cov-card ${cls}`}><div className="num">{num}</div><div className="lbl">{lbl}</div></div>
          ))}
        </div>
        <div style={{ background: 'rgba(76,175,80,.07)', border: '1px solid rgba(76,175,80,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 16 }}>
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 12 states and 11 transitions are covered by the 7 test cases. No missing coverage items.
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

      {/* F — Scenario Map */}
      <ScenarioSection
        sectionId="smap-main"
        sectionLetter="F"
        title="Scenario Map — Firebase Integration"
        subtitle="DAG path per test case · TC-001–007"
        overviewTitle="Firebase Integration Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
        tcMeta={TC_SECTIONS.flatMap(s => s.rows)}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-13" />
      </section>
    </>
  );
}

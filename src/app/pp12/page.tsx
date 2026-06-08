import FlowSection from '@/client/components/FlowSection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp12/flows';
import { TC_SECTIONS } from '@/data/pp12/testcases';
import RequirementSection from '@/client/components/RequirementSection';
import ScenarioSection from '@/client/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp12/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-12',                        cls: 'blue'  },
  { label: 'Platform',    value: 'Mobile (iOS / Android)',        cls: ''      },
  { label: 'Framework',   value: 'WebdriverIO + Appium + Mocha',  cls: ''      },
  { label: 'Language',    value: 'TypeScript',                    cls: ''      },
  { label: 'App',         value: 'POPPA Flutter App',             cls: ''      },
  { label: 'Status',      value: 'Ready To Test STG',             cls: 'green' },
];

const TECHNIQUE_ROWS = [
  { module: 'Firebase Config Fetch',       badges: [['ep','Spec']] as [string,string][],              rationale: 'AC1 specifies exact keys that must be retrievable; verify each key is present and non-empty.' },
  { module: 'Version Checking',            badges: [['dt','DT']] as [string,string][],                rationale: 'Two conditions: version comparison (up-to-date / outdated) × isForceUpdate (true / false) → 3 distinct outcomes.' },
  { module: 'Update Dialog — Force vs Soft', badges: [['st','State Transition']] as [string,string][], rationale: 'States: no dialog → force dialog / soft dialog → store opened / home; transitions driven by flag values.' },
  { module: 'Store Redirection',           badges: [['dt','DT']] as [string,string][],                rationale: 'Platform (iOS / Android) × dialog type (Force / Soft) → correct store URL opened.' },
  { module: 'Fetch Failure / Fallback',    badges: [['manual','EG']] as [string,string][],            rationale: 'Network unavailable → cached/default values used; app must not crash.' },
];

const COVERAGE_ROWS = [
  { mod: 'Firebase Config Fetch (success & failure)', badges: [['ep','Spec'],['manual','EG']] as [string,string][], existing: 'PP12-TC-001–002', risk: ['high','High'] as [string,string],   pct: 95 },
  { mod: 'Version Checking',                          badges: [['dt','DT']] as [string,string][],                   existing: 'PP12-TC-003–004', risk: ['high','High'] as [string,string],   pct: 97 },
  { mod: 'Force Update Dialog',                       badges: [['st','ST']] as [string,string][],                   existing: 'PP12-TC-005',     risk: ['high','High'] as [string,string],   pct: 95 },
  { mod: 'Soft Update — Skip',                        badges: [['st','ST']] as [string,string][],                   existing: 'PP12-TC-006',     risk: ['medium','Medium'] as [string,string], pct: 95 },
  { mod: 'Store Redirection — iOS',                   badges: [['dt','DT']] as [string,string][],                   existing: 'PP12-TC-007',     risk: ['high','High'] as [string,string],   pct: 97 },
  { mod: 'Store Redirection — Android',               badges: [['dt','DT']] as [string,string][],                   existing: 'PP12-TC-008',     risk: ['high','High'] as [string,string],   pct: 97 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '16',  lbl: 'Total States'      },
  { cls: 'blue',  num: '12',  lbl: 'Total Transitions' },
  { cls: 'green', num: '28',  lbl: 'Covered'           },
  { cls: 'green', num: '0',   lbl: 'Missing'           },
];

const AUTOMATION_CARDS = [
  {
    title: 'Framework & Spec',
    items: [
      'WebdriverIO + Appium + Mocha',
      'Spec: src/test/mobile/remote-config/PP-12.remote-config.mobile.ts',
    ],
  },
  {
    title: 'Automatable Subset',
    items: [
      'TC-001 through TC-006 — fully automatable via Appium UI interaction',
      'TC-007 & TC-008 — partial; store deep-link destination requires manual verification',
    ],
  },
  {
    title: 'Firebase Config Manipulation',
    items: [
      'Use Firebase Admin SDK or Firebase REST API in test setup hooks to set Remote Config values before each test run',
    ],
  },
  {
    title: 'Network Simulation (TC-002)',
    items: [
      'Android: Appium mobile:setNetworkSpeed or network proxy',
      'iOS: Charles Proxy / network conditioner',
    ],
  },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['Firebase project',                  'STG environment Firebase project'],
  ['versionApp (up-to-date)',           'Set equal to installed app version (e.g. "1.0.0")'],
  ['versionApp (outdated)',             'Set to a higher value than installed (e.g. "9.9.9")'],
  ['versionApp (SemVer BVA)',           'installed = "1.10.0"; set versionApp = "1.9.0" → app treats installed as up-to-date (validates SemVer not lexicographic)'],
  ['isForceUpdate = true',              'Firebase Remote Config key: isForceUpdate = true'],
  ['isForceUpdate = false',             'Firebase Remote Config key: isForceUpdate = false'],
  ['storeUrl',                          'Single Firebase Remote Config key; app reads URL and opens via OS on both platforms'],
  ['Test device (iOS)',                  'Physical iPhone or iOS Simulator running STG build'],
  ['Test device (Android)',              'Physical Android device or Android Emulator running STG build'],
  ['Network state (TC-002)',             'Airplane mode / blocked network for fetch failure scenario'],
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
export default function PP12Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-12</span> · Remote Config</h2>
        <p>End-to-end test design for Firebase Remote Config integration — covering config fetch, version checking, force/soft update dialogs, and App Store / Play Store redirection.</p>
        <div className="hero-stats">
          {[['8','Test Cases'],['28','States & Transitions'],['100%','Coverage'],['6','Automatable']].map(([v, l]) => (
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
        <SectionHeader num="A" title="Technique Selection" subtitle="5 modules · 4 techniques" />
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="8 TCs · 100% coverage" />
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
                <td><strong>Total</strong></td><td /><td><strong>8</strong></td><td /><td><strong>8 TCs</strong></td>
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

      {/* C — Coverage Report */}
      <section className="section" id="coverage-map">
        <SectionHeader num="C" title="Coverage Report" subtitle="States × Transitions × Test Cases" />
        <div className="coverage-summary">
          {COVERAGE_STAT_CARDS.map(({ cls, num, lbl }) => (
            <div key={lbl} className={`cov-card ${cls}`}><div className="num">{num}</div><div className="lbl">{lbl}</div></div>
          ))}
        </div>
        <div style={{ background: 'rgba(76,175,80,.07)', border: '1px solid rgba(76,175,80,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 16 }}>
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 16 states and 12 transitions are covered by the 8 test cases. No missing coverage items.
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
        title="Scenario Map — Remote Config"
        subtitle="DAG path per test case · TC-001–008"
        overviewTitle="Remote Config Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
        tcMeta={TC_SECTIONS.flatMap(s => s.rows)}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-12" />
      </section>
    </>
  );
}

import FlowSection from '@/client/components/FlowSection';
import ClarifySection from '@/client/components/ClarifySection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp35/flows';
import { TC_SECTIONS } from '@/data/pp35/testcases';
import { CONFLICT_ITEMS } from '@/data/pp35/conflicts';
import RequirementSection from '@/client/components/RequirementSection';
import ScenarioSection from '@/client/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp35/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-35',                                  cls: 'blue'  },
  { label: 'Platform',    value: 'Mobile (iOS / Android)',                  cls: ''      },
  { label: 'Framework',   value: 'WebdriverIO + Appium + Mocha',            cls: ''      },
  { label: 'Language',    value: 'TypeScript',                              cls: ''      },
  { label: 'App',         value: 'POPPA Flutter App',                       cls: ''      },
  { label: 'Status',      value: 'Ready To Test STG',                       cls: 'green' },
  { label: 'Scope',       value: 'AppIcon multi-flavor & Native Splash',    cls: ''      },
];

const TECHNIQUE_ROWS = [
  { module: 'Asset Preparation',       badges: [['ep', 'Specification-based']] as [string, string][],                    rationale: 'AC1 specifies exact size (≥ 1024×1024 px, 1:1 ratio); verify asset meets spec before tooling runs.' },
  { module: 'AppIcon — Multi-Flavor',  badges: [['dt', 'Decision Table']] as [string, string][],                         rationale: '4 flavors × 2 platforms = 8 combinations; each flavor must display a distinct icon.' },
  { module: 'Native Splash',           badges: [['ep', 'Specification-based']] as [string, string][],                    rationale: 'AC3 specifies no-flicker, centered, correct background color; verify each attribute.' },
  { module: 'Multi-Environment Build', badges: [['ep', 'Specification-based']] as [string, string][],                    rationale: 'AC4 requires all 4 flavors verified on both Emulator and Physical Device.' },
  { module: 'Negative — Visual Failures', badges: [['manual', 'Error Guessing']] as [string, string][],                  rationale: 'Common integration failures: wrong flavor icon generated, splash screen stays stuck.' },
];

const COVERAGE_ROWS = [
  { mod: 'Asset preparation spec check',             badges: [['ep', 'Spec']] as [string, string][],    existing: 'PP35-TC-001',        risk: ['medium', 'Medium'] as [string, string], pct: 90 },
  { mod: 'App Icon — Dev flavor (iOS + Android)',     badges: [['dt', 'DT']] as [string, string][],     existing: 'PP35-TC-002',        risk: ['high', 'High'] as [string, string],     pct: 97 },
  { mod: 'App Icon — Staging flavor (iOS + Android)', badges: [['dt', 'DT']] as [string, string][],    existing: 'PP35-TC-003',        risk: ['high', 'High'] as [string, string],     pct: 97 },
  { mod: 'App Icon — UAT flavor (iOS + Android)',     badges: [['dt', 'DT']] as [string, string][],     existing: 'PP35-TC-004',        risk: ['medium', 'Medium'] as [string, string], pct: 95 },
  { mod: 'App Icon — Prod flavor (iOS + Android)',    badges: [['dt', 'DT']] as [string, string][],     existing: 'PP35-TC-005',        risk: ['high', 'High'] as [string, string],     pct: 97 },
  { mod: 'Splash Screen — iOS',                      badges: [['ep', 'Spec']] as [string, string][],    existing: 'PP35-TC-006',        risk: ['high', 'High'] as [string, string],     pct: 95 },
  { mod: 'Splash Screen — Android',                  badges: [['ep', 'Spec']] as [string, string][],    existing: 'PP35-TC-007',        risk: ['high', 'High'] as [string, string],     pct: 95 },
  { mod: 'Cross-flavor splash on physical device',   badges: [['ep', 'Spec']] as [string, string][],    existing: 'PP35-TC-008',        risk: ['medium', 'Medium'] as [string, string], pct: 90 },
  { mod: 'Negative — wrong icon for flavor',         badges: [['manual', 'EG']] as [string, string][],  existing: 'PP35-TC-009',        risk: ['medium', 'Medium'] as [string, string], pct: 90 },
  { mod: 'Negative — splash flicker / stuck',        badges: [['manual', 'EG']] as [string, string][],  existing: 'PP35-TC-010',        risk: ['medium', 'Medium'] as [string, string], pct: 90 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '21', lbl: 'Total States'      },
  { cls: 'blue',  num: '18', lbl: 'Total Transitions' },
  { cls: 'green', num: '39', lbl: 'Covered'           },
  { cls: 'green', num: '0',  lbl: 'Missing'           },
];

const AUTOMATION_CARDS = [
  {
    title: 'Framework & Spec',
    items: [
      'WebdriverIO + Appium + Mocha (TypeScript)',
      'Spec: src/test/mobile/visuals/PP-35.app-icon-splash.mobile.ts',
    ],
  },
  {
    title: 'Automation Scope',
    items: [
      'All 10 test cases are Manual — visual/asset verification not accessible via Appium element selectors',
      'App icon check: visual inspection of device home screen / launcher',
      'Native Splash: rendered by OS before Flutter engine starts — Appium cannot capture it',
    ],
  },
  {
    title: 'CI Pipeline Options',
    items: [
      'Run dart run flutter_launcher_icons for all flavors and assert exit code 0 + check generated file existence',
      'Visual regression: capture home screen screenshots via Appium after install and diff against baseline',
      'Recommended tool: Percy or Applitools integrated with device farm runs for multi-flavor checks',
    ],
  },
  {
    title: 'Regression Trigger',
    items: [
      'Run before every release when flutter_launcher_icons.yaml, flutter_native_splash.yaml, or icon/splash assets are modified',
      'TC-008 explicitly requires physical devices to catch hardware-specific rendering bugs (notch, adaptive icon edge cropping)',
    ],
  },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['Source icon file',            'PoppaClub brand icon ≥ 1024×1024 px, PNG, transparent background'],
  ['Flavor icon overlays',        '"Dev", "Staging", "UAT" label overlaid on icon per environment'],
  ['Splash background color',     'Hex value per design spec (e.g. #FFFFFF or brand primary color)'],
  ['Splash logo file',            'PNG or SVG per flutter_native_splash.yaml spec'],
  ['Build tools',                 'flutter_launcher_icons package; flutter_native_splash package'],
  ['Build commands',              'dart run flutter_launcher_icons -f flutter_launcher_icons_{flavor}.yaml'],
  ['Test devices — iOS',          'iPhone (physical) + iOS Simulator'],
  ['Test devices — Android',      'Android phone (physical) + Android Emulator (multiple API levels)'],
  ['Figma reference',             'App UI Design — icon and splash specifications'],
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
export default function PP35Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-35</span> · App Visuals: AppIcon &amp; Native Splash</h2>
        <p>End-to-end test design for the POPPA Mobile App visual assets — covering multi-flavor App Icon generation (Dev / Staging / UAT / Prod) for iOS and Android, Native Splash Screen correctness, and cross-environment verification on Emulator and Physical Device.</p>
        <div className="hero-stats">
          {[['10', 'Test Cases'], ['39', 'States & Transitions'], ['100%', 'Coverage'], ['Manual', 'All Manual']].map(([v, l]) => (
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
        <SectionHeader num="A" title="Technique Selection" subtitle="5 modules · 3 techniques" />
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="10 TCs · 100% coverage" />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Module</th><th>Technique(s)</th><th>Existing TCs</th><th>Risk</th><th>Confidence</th></tr></thead>
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
                <td><strong>Total</strong></td><td /><td><strong>10</strong></td><td /><td><strong>10 TCs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 1 — Master flow */}
      <FlowSection def={MASTER_FLOW_SECTION} />

      {/* 2–5 — Sub-flows */}
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* 6–9 — TC sections */}

      {/* C — Coverage Report */}
      <section className="section" id="coverage-map">
        <SectionHeader num="C" title="Coverage Report" subtitle="States × Transitions × Test Cases" />
        <div className="coverage-summary">
          {COVERAGE_STAT_CARDS.map(({ cls, num, lbl }) => (
            <div key={lbl} className={`cov-card ${cls}`}><div className="num">{num}</div><div className="lbl">{lbl}</div></div>
          ))}
        </div>
        <div style={{ background: 'rgba(76,175,80,.07)', border: '1px solid rgba(76,175,80,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 16 }}>
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 21 states and 18 transitions are covered by the 10 test cases. No missing coverage items.
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
        title="Scenario Map — App Visuals: Icon &amp; Splash"
        subtitle="DAG path per test case · TC-001–010"
        overviewTitle="AppIcon &amp; Native Splash Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
        tcMeta={TC_SECTIONS.flatMap(s => s.rows)}
      />

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
        <RequirementSection story="PP-35" />
      </section>
    </>
  );
}

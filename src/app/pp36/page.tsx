import FlowSection from '@/components/FlowSection';
import TcSection from '@/components/TcSection';
import ClarifySection from '@/components/ClarifySection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp36/flows';
import { TC_SECTIONS } from '@/data/pp36/testcases';
import { CONFLICT_ITEMS } from '@/data/pp36/conflicts';
import RequirementSection from '@/components/RequirementSection';
import ScenarioSection from '@/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp36/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-36',                        cls: 'blue'  },
  { label: 'Platform',    value: 'Mobile (iOS / Android)',        cls: ''      },
  { label: 'Framework',   value: 'WebdriverIO + Appium + Mocha',  cls: ''      },
  { label: 'Language',    value: 'TypeScript',                    cls: ''      },
  { label: 'App',         value: 'POPPA Flutter App',             cls: ''      },
  { label: 'Status',      value: 'Review Code',                   cls: 'blue'  },
  { label: 'Scope',       value: 'POC — Proof of Concept',        cls: ''      },
];

const TECHNIQUE_ROWS = [
  { module: 'Chat Solution Evaluation',  badges: [['spec', 'Spec']] as [string, string][],           rationale: 'AC 1.2 requires feasibility assessment; verify each evaluation criterion is documented.' },
  { module: 'Chat SDK Integration',      badges: [['spec', 'Spec']] as [string, string][],           rationale: 'AC 1.1 defines POC must work within the platform; verify integration without runtime errors.' },
  { module: 'Basic Chat UI',             badges: [['st', 'ST']] as [string, string][],               rationale: 'States: chat screen visible → room opened → message sent → message received.' },
  { module: 'Error / Failure Handling',  badges: [['manual', 'EG']] as [string, string][],           rationale: 'POC context: SDK misconfiguration, connection failure, or UI crash are high-probability failure modes.' },
  { module: 'POC Documentation',         badges: [['spec', 'Spec']] as [string, string][],           rationale: 'AC 1.2 requires a conclusion report; verify report completeness.' },
];

const COVERAGE_ROWS = [
  { mod: 'Chat solution evaluation & selection', badges: [['spec', 'Spec']] as [string, string][],       existing: 'PP36-TC-001', risk: ['medium', 'Medium'] as [string, string], pct: 90 },
  { mod: 'Chat SDK integration — UI accessible', badges: [['spec', 'Spec']] as [string, string][],       existing: 'PP36-TC-002', risk: ['high', 'High'] as [string, string],     pct: 90 },
  { mod: 'Send message — basic flow',            badges: [['st', 'ST']] as [string, string][],           existing: 'PP36-TC-003', risk: ['high', 'High'] as [string, string],     pct: 90 },
  { mod: 'Message delivery to recipient',        badges: [['st', 'ST']] as [string, string][],           existing: 'PP36-TC-004', risk: ['high', 'High'] as [string, string],     pct: 85 },
  { mod: 'Integration failure handling',         badges: [['manual', 'EG']] as [string, string][],       existing: 'PP36-TC-005', risk: ['medium', 'Medium'] as [string, string], pct: 85 },
  { mod: 'POC documentation completeness',       badges: [['spec', 'Spec']] as [string, string][],       existing: 'PP36-TC-006', risk: ['medium', 'Medium'] as [string, string], pct: 90 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '17',   lbl: 'Total States'      },
  { cls: 'blue',  num: '14',   lbl: 'Total Transitions' },
  { cls: 'green', num: '31',   lbl: 'Covered'           },
  { cls: 'green', num: '0',    lbl: 'Missing'           },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['Chat solution candidates', 'e.g. Firebase Realtime Database, Stream Chat, Sendbird, custom WebSocket'],
  ['Test accounts',            'Two STG user accounts for two-party chat test (TC-004)'],
  ['Chat room / channel',      'Pre-configured test chat room on the chosen POC backend'],
  ['POC build',                'Flutter app build with chat SDK integrated (STG or POC flavor)'],
  ['Test devices',             'Two physical or simulated devices for TC-004 (message delivery)'],
  ['POC conclusion document',  'Confluence page or Jira comment with feasibility report'],
  ['Network control',          'Airplane mode or proxy for TC-005 (failure simulation)'],
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
export default function PP36Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Review Code · POPPA Story · POC</div>
        <h2><span>PP-36</span> · POC Open Chat</h2>
        <p>Test design for the POPPA Mobile App POC Open Chat — evaluating and integrating an open chat solution, verifying basic chat functionality (send &amp; receive messages), handling SDK failures gracefully, and documenting POC feasibility.</p>
        <div className="hero-stats">
          {[['6','Test Cases'],['31','States & Transitions'],['100%','Coverage'],['0','Automatable (POC)']].map(([v, l]) => (
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="6 TCs · 100% coverage" />
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
                <td><strong>Total</strong></td><td /><td><strong>6</strong></td><td /><td><strong>6 TCs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 1 — Master flow */}
      <FlowSection def={MASTER_FLOW_SECTION} />

      {/* 2–4 — Sub-flows */}
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* 5–8 — TC sections */}
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
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 17 states and 14 transitions are covered by the 6 test cases. No missing coverage items.
        </div>
        <div style={{ background: 'rgba(33,150,243,.07)', border: '1px solid rgba(33,150,243,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 12 }}>
          <strong style={{ color: 'var(--blue)' }}>POC Note:</strong> All 6 test cases are Manual at this POC stage. Automation is deferred until the chat feature is promoted to a production implementation with stable UI element IDs.
        </div>
      </section>

      {/* D — Automation Notes */}
      <section className="section" id="automation">
        <SectionHeader num="D" title="Automation Notes" />
        <div className="note-grid">
          <div className="note-card">
            <h4>Framework &amp; Spec</h4>
            <ul>
              <li><code>WebdriverIO + Appium + Mocha (TypeScript)</code></li>
              <li>Spec (future): <code>src/test/mobile/chat/PP-36.open-chat-poc.mobile.ts</code></li>
            </ul>
          </div>
          <div className="note-card">
            <h4>POC Blockers</h4>
            <ul>
              <li>Chat UI element accessibility IDs are not yet defined</li>
              <li>Chosen SDK Flutter wrapper may not expose standard accessibility attributes</li>
              <li>Two-device coordination for TC-004 requires dedicated framework setup</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>All 6 TCs — Manual</h4>
            <ul>
              <li><strong>TC-001, TC-006</strong> — Process / documentation checks, not UI interactions</li>
              <li><strong>TC-004</strong> — Requires two simultaneous device sessions</li>
              <li><strong>TC-002, TC-003, TC-005</strong> — Blocked until stable element IDs available</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Post-POC Automation</h4>
            <ul>
              <li>Once solution is decided, automate TC-003 (send message) and TC-004 (message delivery)</li>
              <li>Use Appium + WebdriverIO with well-defined element selectors</li>
              <li>Regression trigger: Not applicable at POC stage</li>
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
        title="Scenario Map — POC Open Chat"
        subtitle="DAG path per test case · TC-001–006"
        overviewTitle="POC Open Chat Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
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
        <RequirementSection story="PP-36" />
      </section>
    </>
  );
}

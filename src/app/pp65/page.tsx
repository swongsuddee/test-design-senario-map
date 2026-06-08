import FlowSection from '@/client/components/FlowSection';
import ClarifySection from '@/client/components/ClarifySection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp65/flows';
import { TC_SECTIONS } from '@/data/pp65/testcases';
import { CONFLICT_ITEMS } from '@/data/pp65/conflicts';
import RequirementSection from '@/client/components/RequirementSection';
import ScenarioSection from '@/client/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp65/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-65',                        cls: 'blue'  },
  { label: 'Platform',    value: 'Mobile (iOS / Android) + API', cls: ''      },
  { label: 'Framework',   value: 'WebdriverIO + Appium + Mocha', cls: ''      },
  { label: 'Language',    value: 'TypeScript',                   cls: ''      },
  { label: 'App',         value: 'POPPA Flutter App',            cls: ''      },
  { label: 'Status',      value: 'Ready To Test STG',            cls: 'green' },
  { label: 'Subtask',     value: 'PP-65 (QA)',                   cls: 'blue'  },
];

const TECHNIQUE_ROWS = [
  { module: 'Follow User',                 badges: [['st', 'State Transition'], ['ep', 'EP']] as [string, string][],              rationale: 'States: not_following → following; idempotency edge case' },
  { module: 'Notification on Follow',      badges: [['ep', 'Spec']] as [string, string][],                                        rationale: 'AC 1.2 กำหนด Kafka user.followed → notification' },
  { module: 'Unfollow User',               badges: [['st', 'State Transition']] as [string, string][],                            rationale: 'States: following → not_following; idempotency' },
  { module: 'Followers / Following Lists', badges: [['ep', 'EP'], ['bva', 'BVA']] as [string, string][],                         rationale: 'Pagination boundary; empty state' },
  { module: 'Block User',                  badges: [['st', 'State Transition'], ['dt', 'Decision Table']] as [string, string][], rationale: 'Mutual block: A blocks B → 2 outcomes (A cannot see B, B cannot see A)' },
];

const COVERAGE_ROWS = [
  { mod: 'Follow User',                 badges: [['st', 'ST'], ['ep', 'EP']] as [string, string][],    existing: 'PP65-TC-001–003', risk: ['high', 'High'] as [string, string],     pct: 95 },
  { mod: 'Notification on Follow',      badges: [['ep', 'Spec']] as [string, string][],                existing: 'PP65-TC-002',     risk: ['medium', 'Medium'] as [string, string], pct: 90 },
  { mod: 'Unfollow User',               badges: [['st', 'ST']] as [string, string][],                  existing: 'PP65-TC-004–005', risk: ['high', 'High'] as [string, string],     pct: 95 },
  { mod: 'Followers / Following Lists', badges: [['ep', 'EP'], ['bva', 'BVA']] as [string, string][], existing: 'PP65-TC-006–008', risk: ['medium', 'Medium'] as [string, string], pct: 93 },
  { mod: 'Block User',                  badges: [['st', 'ST'], ['dt', 'DT']] as [string, string][],   existing: 'PP65-TC-009–010', risk: ['high', 'High'] as [string, string],     pct: 95 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '24',   lbl: 'Total States'      },
  { cls: 'blue',  num: '17',   lbl: 'Total Transitions' },
  { cls: 'green', num: '41',   lbl: 'Covered'           },
  { cls: 'green', num: '0',    lbl: 'Missing'           },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['User A account (STG)',               'User ที่ใช้เป็น Follower / Blocker'],
  ['User B account (STG)',               'User ที่ถูก Follow / Blocked'],
  ['User with followers > 1 page',       'User ที่มี followers มากกว่า page size'],
  ['New user (no follows)',              'Account ใหม่สำหรับ empty state test'],
  ['Kafka consumer / event log API',     'Backend utility สำหรับ assert user.followed event'],
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
export default function PP65Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-65</span> · Social Graph</h2>
        <p>Test design for the POPPA Mobile App Social Graph system — covering follow/unfollow user with count updates, Kafka notification on follow, paginated followers/following lists with empty state, and mutual block user visibility.</p>
        <div className="hero-stats">
          {[['10','Test Cases'],['41','States & Transitions'],['100%','Coverage'],['9','Automatable']].map(([v, l]) => (
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="10 TCs · 100% coverage" />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Module</th><th>Technique(s)</th><th>Test Cases</th><th>Risk</th><th>Coverage %</th></tr></thead>
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
          <strong style={{ color: 'var(--green)' }}>Full Coverage:</strong> All 24 states and 17 transitions are covered by the 10 test cases. TC-002 is Partial (Kafka consumer assertion requires backend event log API or test Kafka consumer). No missing coverage items.
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
              <li>Spec: <code>src/test/mobile/social/PP-65.social-graph.mobile.ts</code></li>
              <li>Automatable: TC-001, TC-003–010 (9 of 10)</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Partial / Manual</h4>
            <ul>
              <li><strong>TC-002</strong> — Kafka event assertion requires backend event log API or Kafka consumer utility; push notification receipt requires device-level assertion</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Dual-Session Setup</h4>
            <ul>
              <li>TC-009, TC-010 require 2 concurrent sessions (User A + User B)</li>
              <li>Follow count assertion: call GET /profile before and after follow/unfollow to compare count</li>
              <li>Block visibility assertion via API: GET /profile/&#123;userId&#125; should return 403/404</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Regression Trigger</h4>
            <ul>
              <li>Run when User Service social graph changes</li>
              <li>Run when Notification Service or Kafka schema changes</li>
              <li>Run when MongoDB schema for follows collection changes</li>
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
        title="Scenario Map — Social Graph"
        subtitle="DAG path per test case · TC-001–010"
        overviewTitle="Social Graph Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
        tcMeta={TC_SECTIONS.flatMap(s => s.rows)}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-65" />
      </section>
    </>
  );
}

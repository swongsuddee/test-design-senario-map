import FlowSection from '@/components/FlowSection';
import TcSection from '@/components/TcSection';
import { MASTER_FLOW_SECTION, FLOW_SECTIONS } from '@/data/pp201/flows';
import { TC_SECTIONS } from '@/data/pp201/testcases';
import RequirementSection from '@/components/RequirementSection';
import ScenarioSection from '@/components/ScenarioSection';
import { SM_NODES, SM_EDGES, SM_SCENARIOS } from '@/data/pp201/scenariomap';

// ── Static data ────────────────────────────────────────────────────────────────
const META_CARDS = [
  { label: 'Jira Story',  value: 'PP-201',                        cls: 'blue'  },
  { label: 'Platform',    value: 'Mobile (iOS / Android)',         cls: ''      },
  { label: 'Framework',   value: 'WebdriverIO + Appium + Mocha',   cls: ''      },
  { label: 'Language',    value: 'TypeScript',                     cls: ''      },
  { label: 'App',         value: 'POPPA Flutter App',              cls: ''      },
  { label: 'Status',      value: 'Ready To Test STG',              cls: 'green' },
  { label: 'Subtask',     value: 'PP-201 (QA)',                    cls: 'blue'  },
];

const TECHNIQUE_ROWS = [
  { module: 'Checkout — Order Summary',      badges: [['ep', 'Spec']] as [string, string][],                     rationale: 'AC specifies price displayed clearly before confirm.' },
  { module: 'Payment Method Selection',      badges: [['ep', 'EP']] as [string, string][],                       rationale: 'Three valid methods in MVP1 (QR, TrueMoney, MobileBanking) + invalid selection.' },
  { module: 'QR PromptPay — Generation',     badges: [['ep', 'Spec']] as [string, string][],                     rationale: 'QR must be generated with 15-min TTL.' },
  { module: 'QR PromptPay — Success',        badges: [['st', 'ST']] as [string, string][],                       rationale: 'PENDING → COMPLETED via webhook.' },
  { module: 'QR PromptPay — Expiry',         badges: [['bva', 'BVA'], ['st', 'ST']] as [string, string][],       rationale: 'TTL boundary: before 15 min (valid), at/after 15 min (expired).' },
  { module: 'Payment Status Polling',        badges: [['st', 'ST']] as [string, string][],                       rationale: 'PENDING → COMPLETED / FAILED / EXPIRED.' },
  { module: 'TrueMoney Wallet',              badges: [['st', 'ST']] as [string, string][],                       rationale: 'Redirect → Return → Status resolved.' },
  { module: 'Mobile Banking',               badges: [['st', 'ST']] as [string, string][],                       rationale: 'Redirect → Return → Status resolved.' },
  { module: 'Webhook Idempotency',           badges: [['manual', 'EG']] as [string, string][],                   rationale: 'Duplicate webhook must not double-write; first call processed, repeat ignored.' },
  { module: 'Refund Policy',                badges: [['bva', 'BVA'], ['dt', 'DT']] as [string, string][],       rationale: 'Three refund tiers: >7d (100%), 3–7d (50%), <3d (0%) — boundaries at 7d and 3d.' },
  { module: 'Organizer Payout',             badges: [['ep', 'Spec']] as [string, string][],                     rationale: 'Fee deduction + net transfer; accurate calculation.' },
];

const COVERAGE_ROWS = [
  { mod: 'Checkout — Order Summary',         badges: [['ep', 'Spec']] as [string, string][],                   existing: 'PP201-TC-001', risk: ['high', 'High'] as [string, string],     pct: 95 },
  { mod: 'QR PromptPay Generation',          badges: [['ep', 'Spec']] as [string, string][],                   existing: 'PP201-TC-002', risk: ['high', 'High'] as [string, string],     pct: 95 },
  { mod: 'QR Payment — Success (Webhook)',   badges: [['st', 'ST']] as [string, string][],                     existing: 'PP201-TC-003', risk: ['high', 'High'] as [string, string],     pct: 97 },
  { mod: 'QR Payment — Expired (15 min)',    badges: [['bva', 'BVA'], ['st', 'ST']] as [string, string][],     existing: 'PP201-TC-004', risk: ['high', 'High'] as [string, string],     pct: 97 },
  { mod: 'Payment Status Polling',           badges: [['st', 'ST']] as [string, string][],                     existing: 'PP201-TC-005', risk: ['high', 'High'] as [string, string],     pct: 95 },
  { mod: 'Payment — FAILED status',          badges: [['st', 'ST']] as [string, string][],                     existing: 'PP201-TC-006', risk: ['high', 'High'] as [string, string],     pct: 95 },
  { mod: 'TrueMoney Wallet Flow',            badges: [['st', 'ST']] as [string, string][],                     existing: 'PP201-TC-007', risk: ['high', 'High'] as [string, string],     pct: 90 },
  { mod: 'Mobile Banking Flow',              badges: [['st', 'ST']] as [string, string][],                     existing: 'PP201-TC-008', risk: ['medium', 'Medium'] as [string, string], pct: 90 },
  { mod: 'Webhook — First occurrence',       badges: [['manual', 'EG']] as [string, string][],                 existing: 'PP201-TC-009', risk: ['high', 'High'] as [string, string],     pct: 97 },
  { mod: 'Webhook — Duplicate (idempotency)',badges: [['manual', 'EG']] as [string, string][],                 existing: 'PP201-TC-010', risk: ['high', 'High'] as [string, string],     pct: 97 },
  { mod: 'Refund — 100% (>7 days)',          badges: [['bva', 'BVA'], ['dt', 'DT']] as [string, string][],     existing: 'PP201-TC-011', risk: ['high', 'High'] as [string, string],     pct: 97 },
  { mod: 'Refund — 50% (3–7 days)',          badges: [['bva', 'BVA'], ['dt', 'DT']] as [string, string][],     existing: 'PP201-TC-012', risk: ['high', 'High'] as [string, string],     pct: 97 },
  { mod: 'Refund — Denied (<3 days)',        badges: [['bva', 'BVA'], ['dt', 'DT']] as [string, string][],     existing: 'PP201-TC-013', risk: ['high', 'High'] as [string, string],     pct: 97 },
  { mod: 'Organizer Payout',                badges: [['ep', 'Spec']] as [string, string][],                   existing: 'PP201-TC-014', risk: ['medium', 'Medium'] as [string, string], pct: 90 },
];

const COVERAGE_STAT_CARDS = [
  { cls: 'blue',  num: '44', lbl: 'Total States'      },
  { cls: 'blue',  num: '31', lbl: 'Total Transitions' },
  { cls: 'green', num: '74', lbl: 'Covered'           },
  { cls: 'red',   num: '1',  lbl: 'Partial'           },
];

const TEST_DATA_ROWS: [string, string][] = [
  ['STG User account',            'Registered user with completed profile; no pending payment'],
  ['Paid ticket event',           'STG event with ticket price > 0 THB'],
  ['Payginix STG sandbox',        'QR PromptPay test endpoint; webhook delivery to STG backend'],
  ['TrueMoney test credentials',  'Payginix STG TrueMoney test account'],
  ['STG test bank (QR scan)',     'Use Payginix STG test QR scanner or backend webhook simulation'],
  ['Webhook payload (success)',   '{paymentId, status: "COMPLETED", amount, ...} — from Payginix spec'],
  ['Webhook payload (failure)',   '{paymentId, status: "FAILED", ...}'],
  ['Refund test — 100%',          'Event date = today + 8 days; ticket paid'],
  ['Refund test — 50%',           'Event date = today + 4 days; ticket paid'],
  ['Refund test — denied',        'Event date = today + 2 days; ticket paid'],
  ['Ended event',                 'STG event with end_date in the past; multiple completed payments'],
  ['Platform fee rate',           'Per agreement (e.g. 5%) — from backend config'],
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
export default function PP201Page() {
  return (
    <>
      {/* Hero */}
      <div className="hero" id="hero">
        <div className="hero-badge">Ready To Test STG · POPPA Story</div>
        <h2><span>PP-201</span> · Payment (Mobile App)</h2>
        <p>End-to-end test design for the POPPA Mobile App payment system — covering Checkout, QR PromptPay, TrueMoney, Mobile Banking, Webhook idempotency, Refund policy, and Organizer Payout.</p>
        <div className="hero-stats">
          {[['14', 'Test Cases'], ['75', 'States & Transitions'], ['99%', 'Coverage'], ['12', 'Automatable']].map(([v, l]) => (
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
        <SectionHeader num="A" title="Technique Selection" subtitle="11 modules · 5 techniques" />
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
        <SectionHeader num="B" title="Coverage Summary" subtitle="14 TCs · 14 modules" />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Module</th><th>Technique(s)</th><th>TCs</th><th>Risk</th><th>Coverage %</th></tr></thead>
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
                <td><strong>Total</strong></td><td /><td><strong>14</strong></td><td /><td><strong>14 TCs</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 1 — Master flow */}
      <FlowSection def={MASTER_FLOW_SECTION} />

      {/* 2–8 — Sub-flows */}
      {FLOW_SECTIONS.map(def => <FlowSection key={def.sectionId} def={def} />)}

      {/* 9–15 — TC sections */}
      {TC_SECTIONS.map(def => <TcSection key={def.sectionId} def={def} />)}

      {/* C — Coverage Report */}
      <section className="section" id="coverage-map">
        <SectionHeader num="C" title="Coverage Report" subtitle="States × Transitions × Test Cases" />
        <div className="coverage-summary">
          {COVERAGE_STAT_CARDS.map(({ cls, num, lbl }) => (
            <div key={lbl} className={`cov-card ${cls}`}><div className="num">{num}</div><div className="lbl">{lbl}</div></div>
          ))}
        </div>
        <div style={{ background: 'rgba(255,152,0,.07)', border: '1px solid rgba(255,152,0,.25)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 16 }}>
          <strong style={{ color: '#FF9800' }}>Partial coverage:</strong> S27 (TrueMoney FAILED path) is marked Partial — the TrueMoney redirect goes to an external app; end-to-end automation is not feasible. Covered at API level via webhook simulation.
        </div>
        <div style={{ background: 'rgba(76,175,80,.07)', border: '1px solid rgba(76,175,80,.2)', borderRadius: 8, padding: '14px 18px', fontSize: 13, marginTop: 12 }}>
          <strong style={{ color: 'var(--green)' }}>All other paths covered:</strong> 44 states and 31 transitions are covered by TC-001–014. No missing coverage items.
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
              <li>Spec: <code>src/test/mobile/payment/PP-201.payment.mobile.ts</code></li>
              <li>Smoke suite: TC-001, TC-002, TC-003, TC-005, TC-009</li>
              <li>Regression suite: All 14 TCs</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Webhook Simulation</h4>
            <ul>
              <li>Use <code>axios.post(STG_BACKEND_WEBHOOK_URL, payload)</code> in test setup</li>
              <li>TC-003, TC-006, TC-009, TC-010 — direct API webhook simulation</li>
              <li>QR Code assertion: assert QR image element is visible; extract paymentId from API response</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>Manual / Partial</h4>
            <ul>
              <li><strong>TC-007</strong> (TrueMoney) — redirect to external app; Appium cannot control a separate iOS/Android app; automate at API level only</li>
              <li><strong>TC-008</strong> (Mobile Banking) — external banking apps; manual verification on device</li>
            </ul>
          </div>
          <div className="note-card">
            <h4>STG Setup Required</h4>
            <ul>
              <li>TC-004 — advance STG test clock or use short-TTL test QR</li>
              <li>TC-011–013 — manipulate STG event end_date via API for refund boundary tests</li>
              <li>TC-014 — use STG event with past end date for payout trigger</li>
              <li>TC-003, TC-007 — Payginix STG sandbox with test bank accounts</li>
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
        title="Scenario Map — Payment"
        subtitle="DAG path per test case · TC-001–014"
        overviewTitle="Payment Complete Flow DAG"
        nodes={SM_NODES}
        edges={SM_EDGES}
        scenarios={SM_SCENARIOS}
      />

      {/* Original Requirement */}
      <section className="section" id="requirements">
        <RequirementSection story="PP-201" />
      </section>
    </>
  );
}

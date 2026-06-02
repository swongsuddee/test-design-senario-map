import type { DagEdge, DagNode, Scenario } from '@/types';

// ── Nodes ─────────────────────────────────────────────────────────────────────
// Columns: 0=entry  1=load  2=fields/cta-check  3=cta-state  4=outcome
// Rows:    0..5
export const SM_NODES: DagNode[] = [
  // col 0 — entry
  { id: 'N1',  col: 0, row: 0, name: 'User\nNavigates',    type: 'action',   details: 'User taps event from Home or Search.' },

  // col 1 — load phase
  { id: 'N2',  col: 1, row: 0, name: 'API\nRequest',       type: 'action',   details: 'GET /events/{id} called.' },
  { id: 'N3',  col: 1, row: 1, name: 'Event Data\nLoaded', type: 'expect',   details: 'Event detail page fully rendered.' },
  { id: 'N4',  col: 1, row: 2, name: 'API\nError State',   type: 'expect',   details: 'Error state shown to user.' },

  // col 2 — info / type check
  { id: 'N5',  col: 2, row: 1, name: 'Info\nFields',       type: 'expect',   details: 'Name, date, location, image, desc, ticket types.' },
  { id: 'N6',  col: 2, row: 2, name: 'Event\nType',        type: 'decision', details: 'Free event vs Paid event.' },
  { id: 'N7',  col: 2, row: 4, name: 'User\nScrolls',      type: 'action',   details: 'User scrolls to participant section.' },

  // col 3 — CTA state / participant load
  { id: 'N8',  col: 3, row: 1, name: 'Join\nButton',       type: 'action',   details: 'Free event — Join CTA shown.' },
  { id: 'N9',  col: 3, row: 2, name: 'Buy Ticket\nButton', type: 'action',   details: 'Paid event — Buy Ticket CTA shown.' },
  { id: 'N10', col: 3, row: 3, name: 'Reg\nState Check',   type: 'decision', details: 'Already registered? Sold out?' },
  { id: 'N11', col: 3, row: 4, name: 'Participant\nAPI',   type: 'action',   details: 'GET /events/{id}/participants called.' },

  // col 4 — final outcomes
  { id: 'N12', col: 4, row: 1, name: 'Registration\nFlow', type: 'expect',   details: 'Join flow triggered.' },
  { id: 'N13', col: 4, row: 2, name: 'Checkout\nFlow',     type: 'expect',   details: 'Checkout flow triggered.' },
  { id: 'N14', col: 4, row: 3, name: 'CTA\nDisabled',      type: 'expect',   details: 'Already registered or sold out — CTA disabled.' },
  { id: 'N15', col: 4, row: 4, name: 'Participant\nList',  type: 'expect',   details: 'Confirmed participants displayed.' },
  { id: 'N16', col: 4, row: 5, name: 'Participants\nEmpty',type: 'expect',   details: 'Empty state — no confirmed participants.' },
];

// ── Edges ─────────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N1',  to: 'N2',  label: 'Open event' },
  { from: 'N2',  to: 'N3',  label: 'API 200' },
  { from: 'N2',  to: 'N4',  label: 'API error' },
  { from: 'N3',  to: 'N5',  label: 'Fields shown' },
  { from: 'N3',  to: 'N6',  label: 'Check type' },
  { from: 'N6',  to: 'N8',  label: 'Free' },
  { from: 'N6',  to: 'N9',  label: 'Paid' },
  { from: 'N8',  to: 'N10', label: 'Check reg state' },
  { from: 'N9',  to: 'N10', label: 'Check slots' },
  { from: 'N10', to: 'N12', label: 'Tap Join' },
  { from: 'N10', to: 'N13', label: 'Tap Buy Ticket' },
  { from: 'N10', to: 'N14', label: 'Registered / Sold out' },
  { from: 'N3',  to: 'N7',  label: 'Scroll down' },
  { from: 'N7',  to: 'N11', label: 'Section visible' },
  { from: 'N11', to: 'N15', label: 'Has participants' },
  { from: 'N11', to: 'N16', label: 'No participants' },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP268-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Event Detail page loads successfully',
    steps: [
      { action: 'Tap event from Home or Search', data: 'STG published event', expect: 'GET /events/{id} called' },
      { action: 'Assert page renders', data: '—', expect: 'Event Detail page visible; loading indicator gone' },
    ],
    activePath: ['N1', 'N2', 'N3'],
    activeEdges: [['N1', 'N2'], ['N2', 'N3']],
  },
  {
    id: 'PP268-TC-002',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Core event info fields all rendered correctly',
    steps: [
      { action: 'Open Event Detail page', data: 'STG event with all fields populated', expect: 'Page renders' },
      { action: 'Assert each field visible', data: 'Name, date/time, location, image, description, ticket types', expect: 'All 6 fields non-empty and correctly rendered' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N5'],
    activeEdges: [['N1', 'N2'], ['N2', 'N3'], ['N3', 'N5']],
  },
  {
    id: 'PP268-TC-003',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Event info renders correctly for different categories',
    steps: [
      { action: 'Open event from category A (e.g. Running)', data: 'STG event category A', expect: 'Fields render correctly' },
      { action: 'Open event from category B (e.g. Concert)', data: 'STG event category B', expect: 'Fields render correctly for both categories' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N5'],
    activeEdges: [['N1', 'N2'], ['N2', 'N3'], ['N3', 'N5']],
  },
  {
    id: 'PP268-TC-004',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Ticket types section displayed on Event Detail page',
    steps: [
      { action: 'Open Event Detail page', data: 'Event with multiple ticket types', expect: 'Ticket types section visible with all options listed' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N5'],
    activeEdges: [['N1', 'N2'], ['N2', 'N3'], ['N3', 'N5']],
  },
  {
    id: 'PP268-TC-005',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Free event shows Join button; tapping triggers registration',
    steps: [
      { action: 'Open free event detail page', data: 'STG free event; user not registered', expect: 'Join button visible and enabled' },
      { action: 'Tap Join button', data: '—', expect: 'Registration flow starts' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N6', 'N8', 'N10', 'N12'],
    activeEdges: [['N1', 'N2'], ['N2', 'N3'], ['N3', 'N6'], ['N6', 'N8'], ['N8', 'N10'], ['N10', 'N12']],
  },
  {
    id: 'PP268-TC-006',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Paid event shows Buy Ticket; tapping triggers checkout',
    steps: [
      { action: 'Open paid event detail page', data: 'STG paid event; user not registered', expect: 'Buy Ticket button visible and enabled' },
      { action: 'Tap Buy Ticket button', data: '—', expect: 'Checkout / payment flow starts' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N6', 'N9', 'N10', 'N13'],
    activeEdges: [['N1', 'N2'], ['N2', 'N3'], ['N3', 'N6'], ['N6', 'N9'], ['N9', 'N10'], ['N10', 'N13']],
  },
  {
    id: 'PP268-TC-007',
    typeCls: 'st',
    type: 'Functional',
    name: 'Already-registered user sees disabled CTA or Registered label',
    steps: [
      { action: 'Open event that user is already registered for', data: 'STG user pre-registered via API', expect: 'CTA shows "Registered" label or is disabled' },
      { action: 'Assert CTA not tappable for re-registration', data: '—', expect: 'No duplicate registration possible' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N6', 'N8', 'N10', 'N14'],
    activeEdges: [['N1', 'N2'], ['N2', 'N3'], ['N3', 'N6'], ['N6', 'N8'], ['N8', 'N10'], ['N10', 'N14']],
  },
  {
    id: 'PP268-TC-008',
    typeCls: 'st',
    type: 'Functional',
    name: 'Sold-out event shows disabled CTA',
    steps: [
      { action: 'Open event with 0 remaining slots', data: 'STG event at full capacity', expect: 'CTA button shown as disabled / greyed out' },
      { action: 'Assert no registration action possible', data: '—', expect: 'Tapping CTA has no effect' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N6', 'N9', 'N10', 'N14'],
    activeEdges: [['N1', 'N2'], ['N2', 'N3'], ['N3', 'N6'], ['N6', 'N9'], ['N9', 'N10'], ['N10', 'N14']],
  },
  {
    id: 'PP268-TC-009',
    typeCls: 'manual',
    type: 'Negative',
    name: 'API failure on Event Detail shows error state',
    steps: [
      { action: 'Force API error via proxy (5xx on GET /events/{id})', data: 'mitmproxy intercept', expect: 'App displays error state / error message to user' },
      { action: 'Assert no crash; error is user-friendly', data: '—', expect: 'Error state rendered; retry option or back navigation available' },
    ],
    activePath: ['N1', 'N2', 'N4'],
    activeEdges: [['N1', 'N2'], ['N2', 'N4']],
  },
  {
    id: 'PP268-TC-010',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Confirmed participant list shown on scroll',
    steps: [
      { action: 'Open event detail; scroll to participant section', data: 'STG event with 2+ confirmed participants', expect: 'Participant section becomes visible' },
      { action: 'Assert participant list loaded', data: '—', expect: 'GET /events/{id}/participants called; confirmed participants displayed' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N7', 'N11', 'N15'],
    activeEdges: [['N1', 'N2'], ['N2', 'N3'], ['N3', 'N7'], ['N7', 'N11'], ['N11', 'N15']],
  },
  {
    id: 'PP268-TC-011',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Each participant row displays identity (name / avatar)',
    steps: [
      { action: 'Open participant section with confirmed participants', data: 'STG event; 2+ confirmed participants', expect: 'Each row shows participant avatar and display name' },
    ],
    activePath: ['N3', 'N7', 'N11', 'N15'],
    activeEdges: [['N3', 'N7'], ['N7', 'N11'], ['N11', 'N15']],
  },
  {
    id: 'PP268-TC-012',
    typeCls: 'manual',
    type: 'Functional',
    name: 'Empty participant list shows empty state',
    steps: [
      { action: 'Open event with 0 confirmed participants; scroll to participant section', data: 'STG event with no confirmed participants', expect: 'Empty state message shown in participant section' },
    ],
    activePath: ['N3', 'N7', 'N11', 'N16'],
    activeEdges: [['N3', 'N7'], ['N7', 'N11'], ['N11', 'N16']],
  },
];

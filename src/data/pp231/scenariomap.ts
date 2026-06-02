import type { DagEdge, DagNode, Scenario } from '@/types';

// ── DAG nodes ─────────────────────────────────────────────────────────────────
// col: 0=start, 1=api call, 2=api decision, 3=render/error, 4=components,
//      5=filter decision, 6=filter states, 7=re-fetch, 8=outcomes
export const SM_NODES: DagNode[] = [
  { id: 'N1',  col: 0, row: 1, name: 'Dashboard\nOpened',     type: 'action',   details: 'Organizer navigates to event dashboard.' },
  { id: 'N2',  col: 1, row: 1, name: 'API\nCalled',           type: 'action',   details: 'GET Event Summary from read model API.' },
  { id: 'N3',  col: 2, row: 1, name: 'API\nResponse?',        type: 'decision', details: 'Branch: success vs error.' },
  { id: 'N4',  col: 3, row: 0, name: 'Error\nState',          type: 'expect',   details: 'Dashboard shows error with retry option.' },
  { id: 'N5',  col: 3, row: 1, name: 'Components\nRendered',  type: 'action',   details: 'Pie Chart, Summary Metrics, and Ticket Table all mount.' },
  { id: 'N6',  col: 4, row: 0, name: 'Pie Chart\nDisplayed',  type: 'expect',   details: 'Ticket type distribution visualised.' },
  { id: 'N7',  col: 4, row: 1, name: 'Metrics\nDisplayed',    type: 'expect',   details: 'Revenue, Tickets Sold, Participants shown.' },
  { id: 'N8',  col: 4, row: 2, name: 'Ticket Table\nDisplayed', type: 'expect', details: 'Per-ticket-type breakdown shown.' },
  { id: 'N9',  col: 5, row: 1, name: 'Date Filter\nAvail.',   type: 'action',   details: 'Date range picker available to organizer.' },
  { id: 'N10', col: 6, row: 1, name: 'Range\nSelected?',      type: 'decision', details: 'Did organizer apply a date range?' },
  { id: 'N11', col: 7, row: 0, name: 'Invalid\nRange',        type: 'expect',   details: 'End before start — filter rejected, data unchanged.' },
  { id: 'N12', col: 7, row: 1, name: 'Data\nUpdated',         type: 'expect',   details: 'Dashboard refreshed for selected date range.' },
];

// ── DAG edges ─────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N1',  to: 'N2'  },
  { from: 'N2',  to: 'N3'  },
  { from: 'N3',  to: 'N4',  label: 'Error'   },
  { from: 'N3',  to: 'N5',  label: 'Success' },
  { from: 'N5',  to: 'N6'  },
  { from: 'N5',  to: 'N7'  },
  { from: 'N5',  to: 'N8'  },
  { from: 'N6',  to: 'N9'  },
  { from: 'N7',  to: 'N9'  },
  { from: 'N8',  to: 'N9'  },
  { from: 'N9',  to: 'N10' },
  { from: 'N10', to: 'N11', label: 'Invalid' },
  { from: 'N10', to: 'N12', label: 'Valid'   },
];

// ── Scenarios (one per TC) ────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP231-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'All dashboard components render on initial page load (Pie Chart, Summary Metrics, Ticket Metrics Table)',
    steps: [
      { action: 'Log in as Organizer and open an event with ticket sales', data: 'Valid STG Organizer account; event with multi-type sales', expect: 'Navigates to Organizer Dashboard page' },
      { action: 'Observe dashboard components', data: '—', expect: 'Pie Chart, Summary Metrics (Revenue / Tickets Sold / Participants), and Ticket Metrics Table all visible' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N5', 'N6', 'N7', 'N8'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N5'], ['N5','N6'], ['N5','N7'], ['N5','N8']],
  },
  {
    id: 'PP231-TC-002',
    typeCls: 'dt',
    type: 'Functional',
    name: 'Pie Chart correctly visualises ticket type proportions for multiple types, single type, and zero-sales scenarios',
    steps: [
      { action: 'Open dashboard for event with multiple ticket types sold (VIP 50%, Standard 30%, Early Bird 20%)', data: '3 ticket types — confirmed sold proportions known', expect: 'Pie chart shows 3 slices with correct proportions matching sold counts' },
      { action: 'Open dashboard for event with single ticket type only', data: 'Event where only 1 ticket type was sold', expect: 'Pie chart shows 1 slice representing 100% of sales' },
      { action: 'Open dashboard for event with zero ticket sales', data: 'Event with 0 tickets sold', expect: 'Pie chart shows empty/zero state (no slices)' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N5', 'N6'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N5'], ['N5','N6']],
  },
  {
    id: 'PP231-TC-003',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Total Revenue, Tickets Sold, and Participants values match confirmed payments only',
    steps: [
      { action: 'Seed event with 5 confirmed tickets @ 500 THB, 2 pending, 1 failed', data: 'Confirmed: 5 × 500 THB = 2,500 THB; pending: 2; failed: 1', expect: 'Seed complete' },
      { action: 'Open Organizer Dashboard for that event', data: '—', expect: 'Dashboard loads with metrics' },
      { action: 'Read Total Revenue, Tickets Sold, and Total Participants values', data: '—', expect: 'Revenue = 2,500 THB; Tickets Sold = 5; Participants = 5 (confirmed only — pending/failed excluded)' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N5', 'N7'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N5'], ['N5','N7']],
  },
  {
    id: 'PP231-TC-004',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Ticket Metrics Table shows per-ticket-type breakdown with correct name, quantity sold, and revenue',
    steps: [
      { action: 'Open dashboard for event with 3 ticket types', data: 'VIP: 10 sold @ 1,000 THB; Standard: 20 sold @ 500 THB; Early Bird: 5 sold @ 200 THB', expect: 'Dashboard loads' },
      { action: 'Inspect Ticket Metrics Table rows', data: '—', expect: 'Table shows 3 rows; each row has correct ticket name, quantity sold, and revenue total' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N5', 'N8'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N5'], ['N5','N8']],
  },
  {
    id: 'PP231-TC-005',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Selecting a valid date range updates dashboard data (all metrics reflect the selected period)',
    steps: [
      { action: 'Open Organizer Dashboard (default all-time view)', data: 'Event with sales on multiple dates', expect: 'Dashboard shows default range metrics' },
      { action: 'Open Date Range Picker and select a valid range (e.g. last 7 days)', data: 'Start date < End date; both within event window', expect: 'Picker accepts the range' },
      { action: 'Confirm the range', data: '—', expect: 'Dashboard re-fetches API with date filter; all metrics (Pie Chart, Summary, Table) update to reflect sales in the selected period only' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N5', 'N6', 'N7', 'N8', 'N9', 'N10', 'N12'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N5'], ['N5','N6'], ['N5','N7'], ['N5','N8'], ['N6','N9'], ['N7','N9'], ['N8','N9'], ['N9','N10'], ['N10','N12']],
  },
  {
    id: 'PP231-TC-006',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Metrics change correctly when date range narrows or widens — confirming filter is applied',
    steps: [
      { action: 'Open Dashboard; note default metrics values', data: 'Event with sales distributed on at least 3 different dates', expect: 'Default metrics visible' },
      { action: 'Apply narrow date range (only 1 day with known sales)', data: 'Start = End = date with 2 known confirmed tickets', expect: 'Metrics update — Tickets Sold = 2; Revenue matches that day only' },
      { action: 'Widen range to full event window', data: '—', expect: 'Metrics return to original all-time values' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N5', 'N9', 'N10', 'N12'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N5'], ['N5','N9'], ['N9','N10'], ['N10','N12']],
  },
  {
    id: 'PP231-TC-007',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Selecting end date before start date is rejected — dashboard data unchanged',
    steps: [
      { action: 'Open Dashboard; note current metrics values', data: '—', expect: 'Dashboard visible with valid metric data' },
      { action: 'Open Date Range Picker; set End Date earlier than Start Date', data: 'Start = 2024-06-10; End = 2024-06-05', expect: 'Picker rejects the selection or shows validation error' },
      { action: 'Confirm or attempt to apply', data: '—', expect: 'Filter is NOT applied; dashboard metrics remain unchanged from step 1' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N5', 'N9', 'N10', 'N11'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N5'], ['N5','N9'], ['N9','N10'], ['N10','N11']],
  },
  {
    id: 'PP231-TC-008',
    typeCls: 'dt',
    type: 'Functional',
    name: 'Pending and failed payments are excluded from all dashboard metrics (confirmed-only CQRS read model)',
    steps: [
      { action: 'Seed event: 3 confirmed @ 200 THB, 2 pending @ 200 THB, 1 failed @ 200 THB', data: 'Confirmed: 3; Pending: 2; Failed: 1', expect: 'Seed complete' },
      { action: 'Open Organizer Dashboard for the event', data: '—', expect: 'Dashboard loads' },
      { action: 'Verify Total Revenue, Tickets Sold, and Participants', data: '—', expect: 'Revenue = 600 THB (3 × 200); Tickets Sold = 3; Participants = 3; pending and failed NOT counted' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N5', 'N7'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N5'], ['N5','N7']],
  },
  {
    id: 'PP231-TC-009',
    typeCls: 'manual',
    type: 'Functional',
    name: 'Dashboard shows error state when Event Summary API is unavailable — graceful degradation',
    steps: [
      { action: 'Configure API stub / WireMock to return HTTP 500 for Event Summary endpoint', data: 'WireMock stub: GET /event-summary → 500', expect: 'Stub active' },
      { action: 'Open Organizer Dashboard', data: '—', expect: 'Dashboard enters error state — error message displayed with retry option' },
      { action: 'Click Retry', data: '—', expect: 'Dashboard re-sends API request; if stub removed, dashboard loads normally' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N4'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N4']],
  },
];

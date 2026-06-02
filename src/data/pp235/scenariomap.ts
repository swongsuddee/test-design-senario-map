import type { DagEdge, DagNode, Scenario } from '@/types';

// ── DAG nodes ─────────────────────────────────────────────────────────────────
// col: 0=entry, 1=api load, 2=load decision, 3=list/error, 4=interactions,
//      5=search/filter outcomes, 6=row tap, 7=detail, 8=back
export const SM_NODES: DagNode[] = [
  { id: 'N1',  col: 0, row: 2, name: 'Event Page\nOpened',      type: 'action',   details: 'Organizer navigates to Event Running Registered page.' },
  { id: 'N2',  col: 1, row: 2, name: 'API Request\nSent',       type: 'action',   details: 'GET participant list API called.' },
  { id: 'N3',  col: 2, row: 2, name: 'API\nResponse?',          type: 'decision', details: 'Branch: success or error.' },
  { id: 'N4',  col: 3, row: 1, name: 'Error\nState',            type: 'expect',   details: 'API failure — error state with informative message shown.' },
  { id: 'N5',  col: 3, row: 2, name: 'List\nLoaded',            type: 'expect',   details: 'Participant list displayed with all statuses.' },
  { id: 'N6',  col: 4, row: 2, name: 'Search / Filter\nInput',  type: 'action',   details: 'Organizer types a search term or selects a status filter.' },
  { id: 'N7',  col: 4, row: 3, name: 'Filter\nCleared',         type: 'action',   details: 'Organizer clears the active search or filter.' },
  { id: 'N8',  col: 5, row: 1, name: 'Search\nResults',         type: 'expect',   details: 'Filtered list showing name-matching rows.' },
  { id: 'N9',  col: 5, row: 2, name: 'Status Filter\nApplied',  type: 'expect',   details: 'Only participants matching selected status visible.' },
  { id: 'N10', col: 5, row: 3, name: 'Full List\nRestored',     type: 'expect',   details: 'All participants visible again after clearing filter.' },
  { id: 'N11', col: 6, row: 2, name: 'Row\nTapped',             type: 'action',   details: 'Organizer taps a participant row.' },
  { id: 'N12', col: 7, row: 2, name: 'Detail Page\nLoaded',     type: 'action',   details: 'Participant Detail page loads.' },
  { id: 'N13', col: 8, row: 2, name: 'Detail Fields\nShown',    type: 'expect',   details: 'Name, Ticket Type, Payment Status, Check-in Status displayed.' },
  { id: 'N14', col: 9, row: 2, name: 'Back to\nList',           type: 'expect',   details: 'Organizer navigates back; list + filter state preserved.' },
];

// ── DAG edges ─────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N1',  to: 'N2'  },
  { from: 'N2',  to: 'N3'  },
  { from: 'N3',  to: 'N4',  label: 'Error'   },
  { from: 'N3',  to: 'N5',  label: 'Success' },
  { from: 'N5',  to: 'N6'  },
  { from: 'N5',  to: 'N7'  },
  { from: 'N6',  to: 'N8',  label: 'Search'  },
  { from: 'N6',  to: 'N9',  label: 'Filter'  },
  { from: 'N7',  to: 'N10' },
  { from: 'N5',  to: 'N11' },
  { from: 'N8',  to: 'N11' },
  { from: 'N9',  to: 'N11' },
  { from: 'N11', to: 'N12' },
  { from: 'N12', to: 'N13' },
  { from: 'N13', to: 'N14' },
];

// ── Scenarios (one per TC) ────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP235-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Participant list loads with all statuses visible (registered, confirmed, checked-in, cancelled)',
    steps: [
      { action: 'Log in as Organizer and navigate to an event in "running" state', data: 'STG Organizer; event with participants in all 4 statuses', expect: 'Event Running Registered page opens' },
      { action: 'Observe the participant list', data: '—', expect: 'List loads with participants; rows for registered, confirmed, checked-in, and cancelled statuses all visible' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N5'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N5']],
  },
  {
    id: 'PP235-TC-002',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Status badges render correct labels and colours for all 4 participant statuses',
    steps: [
      { action: 'Open participant list with participants in all 4 statuses', data: 'Event with ≥1 participant per status', expect: 'List loads' },
      { action: 'Inspect the status badge for each of the 4 statuses', data: 'registered, confirmed, checked-in, cancelled', expect: 'Each badge shows the correct label text and applies the correct colour styling per status' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N5'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N5']],
  },
  {
    id: 'PP235-TC-003',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Search by participant name returns matching rows; partial match and clear also work correctly',
    steps: [
      { action: 'Open participant list', data: 'Known participant full name: "สมชาย ใจดี"', expect: 'Full list visible' },
      { action: 'Type full participant name in search field', data: '"สมชาย ใจดี"', expect: 'List filters to show only that participant' },
      { action: 'Clear search field (backspace or ×)', data: '—', expect: 'Full unfiltered list restored' },
      { action: 'Type partial name (first name only)', data: '"สมชาย"', expect: 'List shows all participants whose name contains "สมชาย"' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N5', 'N6', 'N8'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N5'], ['N5','N6'], ['N6','N8']],
  },
  {
    id: 'PP235-TC-004',
    typeCls: 'dt',
    type: 'Functional',
    name: 'Filter by "registered" status shows only registered participants; other statuses hidden',
    steps: [
      { action: 'Open participant list with participants in all 4 statuses', data: 'At least 1 participant per status', expect: 'Full list visible' },
      { action: 'Select "registered" from status filter', data: 'Filter = registered', expect: 'List updates — only participants with status = registered shown; confirmed/checked-in/cancelled rows hidden' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N5', 'N6', 'N9'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N5'], ['N5','N6'], ['N6','N9']],
  },
  {
    id: 'PP235-TC-005',
    typeCls: 'dt',
    type: 'Functional',
    name: 'Filter by "cancelled" status shows only cancelled participants; no active-status rows visible',
    steps: [
      { action: 'Open participant list with participants in all 4 statuses', data: 'At least 1 cancelled participant', expect: 'Full list visible' },
      { action: 'Select "cancelled" from status filter', data: 'Filter = cancelled', expect: 'List updates — only participants with status = cancelled shown; registered/confirmed/checked-in rows hidden' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N5', 'N6', 'N9'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N5'], ['N5','N6'], ['N6','N9']],
  },
  {
    id: 'PP235-TC-006',
    typeCls: 'st',
    type: 'Functional',
    name: 'Clearing status filter restores the full unfiltered participant list',
    steps: [
      { action: 'Open participant list; apply "confirmed" status filter', data: 'Filter = confirmed', expect: 'Only confirmed participants visible' },
      { action: 'Clear/reset the filter (select "All" or click ×)', data: '—', expect: 'All participants across all statuses restored — same as initial load' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N5', 'N6', 'N9', 'N7', 'N10'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N5'], ['N5','N6'], ['N6','N9'], ['N5','N7'], ['N7','N10']],
  },
  {
    id: 'PP235-TC-007',
    typeCls: 'manual',
    type: 'Negative',
    name: 'API failure shows error state in participant list; page remains stable with informative message',
    steps: [
      { action: 'Configure proxy/WireMock to return 5xx for participant list endpoint', data: 'Participant list API → 500 Internal Server Error', expect: 'Stub active' },
      { action: 'Navigate to Event Running Registered page', data: '—', expect: 'Page shows error state — informative message visible; no blank screen or unhandled JS error' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N4'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N4']],
  },
  {
    id: 'PP235-TC-008',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Tapping a participant row opens the detail page and route changes to participant detail view',
    steps: [
      { action: 'Open participant list', data: 'Event with ≥1 participant', expect: 'List visible' },
      { action: 'Tap/click a participant row', data: 'Row for known participant', expect: 'Navigation occurs — route changes to participant detail view; Participant Detail page loads' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N5', 'N11', 'N12'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N5'], ['N5','N11'], ['N11','N12']],
  },
  {
    id: 'PP235-TC-009',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Detail page shows correct Name and Ticket Type matching known participant data',
    steps: [
      { action: 'Open participant detail for a known participant', data: 'Participant: Name = "สมชาย ใจดี"; Ticket Type = "VIP"', expect: 'Detail page loads' },
      { action: 'Verify Name and Ticket Type fields', data: '—', expect: 'Name = "สมชาย ใจดี" and Ticket Type = "VIP" displayed correctly' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N5', 'N11', 'N12', 'N13'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N5'], ['N5','N11'], ['N11','N12'], ['N12','N13']],
  },
  {
    id: 'PP235-TC-010',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Detail page shows correct Payment Status and Check-in Status reflecting actual participant data',
    steps: [
      { action: 'Open participant detail for a known participant', data: 'Participant with known Payment Status = "confirmed" and Check-in Status = "checked-in"', expect: 'Detail page loads' },
      { action: 'Verify Payment Status and Check-in Status fields', data: '—', expect: 'Payment Status = "confirmed" and Check-in Status = "checked-in" displayed and match backend data' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N5', 'N11', 'N12', 'N13'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N5'], ['N5','N11'], ['N11','N12'], ['N12','N13']],
  },
  {
    id: 'PP235-TC-011',
    typeCls: 'st',
    type: 'Functional',
    name: 'Back navigation returns organizer to participant list; previous search/filter state preserved',
    steps: [
      { action: 'Open participant list and apply a name search ("สมชาย")', data: 'Search term = "สมชาย"', expect: 'Filtered list shown' },
      { action: 'Tap a row to open participant detail', data: '—', expect: 'Detail page loads' },
      { action: 'Press Back button', data: '—', expect: 'Returns to participant list; search term "สมชาย" still active — filtered list preserved' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N5', 'N6', 'N8', 'N11', 'N12', 'N13', 'N14'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N5'], ['N5','N6'], ['N6','N8'], ['N8','N11'], ['N11','N12'], ['N12','N13'], ['N13','N14']],
  },
];

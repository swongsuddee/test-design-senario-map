import type { DagEdge, DagNode, Scenario } from '@/types';

// ── DAG Nodes ─────────────────────────────────────────────────────────────────
//
// col/row layout (0-based):
//
//  col:  0           1           2           3          4           5
//  row0  DETAIL ──► TYPE? ──► JOIN ──► REGISTERED ──► MYEVENTS
//                        └──► SELECT ──► RESERVE ──► PAY? ──► CONFIRMED ──► QR
//                                               └──► TIMEOUT ──► RELEASED
//  row2  CANCEL? ──► CANCEL ──► FREED ──► REMOVED
//               └──► STARTED ──► ERR
//  row3  SCAN ──► VALID? ──► CHECKIN
//                      └──► INVALID

export const SM_NODES: DagNode[] = [
  // Join free event path
  { id: 'N01', col: 0, row: 0, name: 'Event\nDetail',    type: 'action',   details: 'User opens Event Detail page.' },
  { id: 'N02', col: 1, row: 0, name: 'Event\nType?',     type: 'decision', details: 'Is this a free or paid event?' },
  { id: 'N03', col: 2, row: 0, name: 'Tap\nJoin',        type: 'action',   details: 'User taps Join button for free event.' },
  { id: 'N04', col: 3, row: 0, name: 'Status:\nRegistered', type: 'expect', details: 'Registration record created; status = registered.' },
  { id: 'N05', col: 4, row: 0, name: 'My Events\nUpcoming', type: 'expect', details: 'Event appears in My Events Upcoming tab.' },
  { id: 'N06', col: 3, row: 1, name: 'Duplicate\nJoin',  type: 'expect',   details: 'Second join attempt is idempotent; no error, no duplicate record.' },
  // Paid ticket path
  { id: 'N07', col: 2, row: 2, name: 'Select\nTicket',   type: 'action',   details: 'User selects ticket type and quantity.' },
  { id: 'N08', col: 3, row: 2, name: 'Reserve\n15 min',  type: 'action',   details: 'System reserves ticket; 15-minute timer starts.' },
  { id: 'N09', col: 4, row: 2, name: 'Payment\nDone?',   type: 'decision', details: 'Did user pay within 15 minutes?' },
  { id: 'N10', col: 5, row: 1, name: 'Status:\nConfirmed', type: 'expect', details: 'Payment confirmed; status = confirmed; QR generated.' },
  { id: 'N11', col: 6, row: 1, name: 'QR Code\nShown',   type: 'expect',   details: 'QR Code available in My Events for check-in.' },
  { id: 'N12', col: 5, row: 3, name: 'Ticket\nReleased', type: 'expect',   details: 'Timeout: reservation expired; ticket stock restored.' },
  // My Events tabs
  { id: 'N13', col: 4, row: 4, name: 'My Events\nPage',  type: 'action',   details: 'User navigates to My Events screen.' },
  { id: 'N14', col: 5, row: 4, name: 'Past\nEvents',     type: 'expect',   details: 'Past tab shows completed/cancelled events.' },
  // Leave / cancel path
  { id: 'N15', col: 0, row: 5, name: 'Cancel\nEvent',    type: 'action',   details: 'User taps Cancel and confirms.' },
  { id: 'N16', col: 1, row: 5, name: 'Event\nStarted?',  type: 'decision', details: 'Has the event already started?' },
  { id: 'N17', col: 2, row: 5, name: 'Cancel\nBlocked',  type: 'expect',   details: 'Cannot cancel a started event; API returns error.' },
  { id: 'N18', col: 2, row: 6, name: 'Status:\nCancelled', type: 'expect', details: 'Status set to cancelled; refund triggered if paid.' },
  { id: 'N19', col: 3, row: 6, name: 'Ticket\nFreed',    type: 'expect',   details: 'Ticket stock restored; refund flow triggered for paid event.' },
  { id: 'N20', col: 4, row: 6, name: 'Removed\nfrom List', type: 'expect', details: 'Event no longer appears in My Events Upcoming.' },
  // Check-in path
  { id: 'N21', col: 0, row: 7, name: 'Scan\nQR Code',    type: 'action',   details: 'Organizer opens scan screen and scans attendee QR.' },
  { id: 'N22', col: 1, row: 7, name: 'QR\nValid?',       type: 'decision', details: 'Is the QR code valid and not expired?' },
  { id: 'N23', col: 2, row: 7, name: 'Checked\nIn',      type: 'expect',   details: 'Status updated to checked-in; shown in Participant List.' },
  { id: 'N24', col: 2, row: 8, name: 'Scan\nError',      type: 'expect',   details: 'Invalid or expired QR: error shown; Participant List unchanged.' },
];

// ── DAG Edges ─────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N01', to: 'N02' },
  { from: 'N02', to: 'N03', label: 'free' },
  { from: 'N02', to: 'N07', label: 'paid' },
  { from: 'N03', to: 'N04' },
  { from: 'N03', to: 'N06', label: 'duplicate' },
  { from: 'N04', to: 'N05' },
  { from: 'N07', to: 'N08' },
  { from: 'N08', to: 'N09' },
  { from: 'N09', to: 'N10', label: 'paid in time' },
  { from: 'N09', to: 'N12', label: 'timeout' },
  { from: 'N10', to: 'N11' },
  { from: 'N13', to: 'N05', label: 'Upcoming tab' },
  { from: 'N13', to: 'N14', label: 'Past tab' },
  { from: 'N11', to: 'N13', label: 'view QR' },
  { from: 'N15', to: 'N16' },
  { from: 'N16', to: 'N17', label: 'started' },
  { from: 'N16', to: 'N18', label: 'not started' },
  { from: 'N18', to: 'N19' },
  { from: 'N19', to: 'N20' },
  { from: 'N21', to: 'N22' },
  { from: 'N22', to: 'N23', label: 'valid' },
  { from: 'N22', to: 'N24', label: 'invalid' },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP105-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Join Free Event — status registered + event appears in My Events Upcoming',
    steps: [
      { action: 'Open a published Free Event detail page', data: 'Valid STG user; published free event', expect: 'Event Detail page loaded' },
      { action: 'Tap Join button', data: '—', expect: 'Status = registered; event appears in My Events Upcoming' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N04', 'N05'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N04'], ['N04','N05']],
  },
  {
    id: 'PP105-TC-002',
    typeCls: 'ep',
    type: 'Negative',
    name: 'Duplicate Join is idempotent — no error, no duplicate record created',
    steps: [
      { action: 'Join a free event (already registered)', data: 'User already registered for the event', expect: 'No error; API returns same registered state' },
      { action: 'Verify records', data: '—', expect: 'No duplicate registration record created' },
    ],
    activePath: ['N03', 'N06'],
    activeEdges: [['N03','N06']],
  },
  {
    id: 'PP105-TC-003',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Paid Event — reserve ticket, pay in time → confirmed + QR Code in My Events',
    steps: [
      { action: 'Select ticket type and quantity on paid event', data: 'Paid event with stock; valid user', expect: 'Ticket reserved; 15-minute timer begins' },
      { action: 'Complete payment within 15 minutes', data: 'Payginix STG sandbox', expect: 'Status = confirmed; QR Code visible in My Events' },
    ],
    activePath: ['N01', 'N02', 'N07', 'N08', 'N09', 'N10', 'N11'],
    activeEdges: [['N01','N02'], ['N02','N07'], ['N07','N08'], ['N08','N09'], ['N09','N10'], ['N10','N11']],
  },
  {
    id: 'PP105-TC-004',
    typeCls: 'ep',
    type: 'Functional',
    name: 'QR Code in My Events is scannable for Check-in after confirmed payment',
    steps: [
      { action: 'Navigate to confirmed event in My Events', data: 'Confirmed ticket STG', expect: 'QR Code section is visible' },
      { action: 'Inspect QR Code', data: '—', expect: 'QR Code is clear and decodable; encodes correct attendee/ticket data' },
    ],
    activePath: ['N10', 'N11', 'N13'],
    activeEdges: [['N10','N11'], ['N11','N13']],
  },
  {
    id: 'PP105-TC-005',
    typeCls: 'bva',
    type: 'Functional',
    name: 'Ticket timeout after 15 min — ticket released; stock returns to available',
    steps: [
      { action: 'Reserve ticket on paid event', data: 'Paid event with stock', expect: 'Ticket reserved; timer starts' },
      { action: 'Let timer expire without paying (simulate 15 min)', data: 'Admin API or short-TTL STG config', expect: 'Reservation expired; ticket status = released; stock incremented back' },
    ],
    activePath: ['N07', 'N08', 'N09', 'N12'],
    activeEdges: [['N07','N08'], ['N08','N09'], ['N09','N12']],
  },
  {
    id: 'PP105-TC-006',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'My Events Upcoming tab shows event name, date/time, location, ticket info, and status',
    steps: [
      { action: 'Navigate to My Events Upcoming tab', data: 'User with at least one upcoming registered event', expect: 'Event card shows name, date/time, location, ticket info, and status' },
    ],
    activePath: ['N13', 'N05'],
    activeEdges: [['N13','N05']],
  },
  {
    id: 'PP105-TC-007',
    typeCls: 'ep',
    type: 'Functional',
    name: 'My Events Past tab shows completed and cancelled events',
    steps: [
      { action: 'Navigate to My Events Past tab', data: 'User with at least one past/cancelled event', expect: 'Past events listed with correct status (completed / cancelled)' },
    ],
    activePath: ['N13', 'N14'],
    activeEdges: [['N13','N14']],
  },
  {
    id: 'PP105-TC-008',
    typeCls: 'ep',
    type: 'Functional',
    name: 'QR Code displayed in My Events is clear and correctly decodable',
    steps: [
      { action: 'Open My Events; view QR Code for confirmed event', data: 'Confirmed ticket', expect: 'QR Code image is crisp, scannable, and decodes to correct attendee token' },
    ],
    activePath: ['N13', 'N05', 'N11'],
    activeEdges: [['N13','N05'], ['N05','N11']],
  },
  {
    id: 'PP105-TC-009',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Leave Free Event — status cancelled; ticket returned to available; event removed from Upcoming',
    steps: [
      { action: 'Tap Cancel on a free event in My Events; confirm', data: 'Registered free event', expect: 'Status = cancelled' },
      { action: 'Verify ticket and list', data: '—', expect: 'Ticket stock +1 (available); event no longer in Upcoming tab' },
    ],
    activePath: ['N15', 'N16', 'N18', 'N19', 'N20'],
    activeEdges: [['N15','N16'], ['N16','N18'], ['N18','N19'], ['N19','N20']],
  },
  {
    id: 'PP105-TC-010',
    typeCls: 'st',
    type: 'Functional',
    name: 'Leave Paid Event — status cancelled + refund flow triggered + removed from Upcoming',
    steps: [
      { action: 'Cancel a confirmed paid event in My Events', data: 'Confirmed paid ticket', expect: 'Status = cancelled' },
      { action: 'Verify refund and list', data: '—', expect: 'Refund flow triggered; ticket stock freed; event removed from Upcoming' },
    ],
    activePath: ['N15', 'N16', 'N18', 'N19', 'N20'],
    activeEdges: [['N15','N16'], ['N16','N18'], ['N18','N19'], ['N19','N20']],
  },
  {
    id: 'PP105-TC-011',
    typeCls: 'st',
    type: 'Negative',
    name: 'Cannot cancel an event that has already started — API error; status unchanged',
    steps: [
      { action: 'Attempt to cancel an event that has already started', data: 'Event with start_time in the past', expect: 'Cancel request rejected' },
      { action: 'Verify status', data: '—', expect: 'API returns error; event status unchanged; event remains in list' },
    ],
    activePath: ['N15', 'N16', 'N17'],
    activeEdges: [['N15','N16'], ['N16','N17']],
  },
  {
    id: 'PP105-TC-012',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Organizer scans valid QR Code — status checked-in; attendee in Participant List',
    steps: [
      { action: 'Organizer opens Scan QR screen and scans attendee QR', data: 'Valid attendee QR Code', expect: 'QR decoded successfully' },
      { action: 'Verify attendee status', data: '—', expect: 'Attendee status = checked-in; name visible in Participant List' },
    ],
    activePath: ['N21', 'N22', 'N23'],
    activeEdges: [['N21','N22'], ['N22','N23']],
  },
  {
    id: 'PP105-TC-013',
    typeCls: 'ep',
    type: 'Negative',
    name: 'Scan invalid or expired QR Code — error message shown; Participant List unchanged',
    steps: [
      { action: 'Organizer scans an invalid or expired QR Code', data: 'Random string or expired token QR', expect: 'Scan rejected with error message' },
      { action: 'Verify Participant List', data: '—', expect: 'No new check-in record added; list unchanged' },
    ],
    activePath: ['N21', 'N22', 'N24'],
    activeEdges: [['N21','N22'], ['N22','N24']],
  },
];

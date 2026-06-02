import type { DagEdge, DagNode, Scenario } from '@/types';

// ── DAG nodes ─────────────────────────────────────────────────────────────────
// col: 0=entry, 1=API call, 2=API response decision, 3=success/error branches,
//      4=field rendering, 5=content decisions, 6=outcomes
export const SM_NODES: DagNode[] = [
  { id: 'N1',  col: 0, row: 2, name: 'Event List\nPage',        type: 'action',   details: 'Organizer on the event list page.' },
  { id: 'N2',  col: 1, row: 2, name: 'Event\nSelected',         type: 'action',   details: 'Organizer taps/clicks an event to view detail.' },
  { id: 'N3',  col: 2, row: 2, name: 'GET /event/:id\nCalled',  type: 'action',   details: 'API request sent for event data.' },
  { id: 'N4',  col: 3, row: 2, name: 'API\nResponse?',          type: 'decision', details: 'Branch on HTTP response code.' },
  { id: 'N5',  col: 4, row: 0, name: '404 Not\nFound',          type: 'expect',   details: 'Event does not exist — clear 404 error page shown.' },
  { id: 'N6',  col: 4, row: 1, name: '500 Server\nError',       type: 'expect',   details: 'Server error — error state with retry shown.' },
  { id: 'N7',  col: 4, row: 2, name: 'Data Bound\nto UI',       type: 'action',   details: 'API response fields mapped to page elements.' },
  { id: 'N8',  col: 5, row: 2, name: 'Core Fields\nShown',      type: 'expect',   details: 'Name, date/time, location all visible.' },
  { id: 'N9',  col: 5, row: 3, name: 'Images\nDecision',        type: 'decision', details: 'Does the event have images?' },
  { id: 'N10', col: 5, row: 4, name: 'Tickets\nDecision',       type: 'decision', details: 'How many ticket types?' },
  { id: 'N11', col: 6, row: 2, name: 'Gallery\nShown',          type: 'expect',   details: 'Event has images — gallery/carousel rendered.' },
  { id: 'N12', col: 6, row: 3, name: 'Placeholder\nShown',      type: 'expect',   details: 'No images — placeholder shown.' },
  { id: 'N13', col: 6, row: 4, name: 'Ticket List\nShown',      type: 'expect',   details: 'One or more ticket types rendered.' },
  { id: 'N14', col: 6, row: 5, name: 'Empty\nTickets',          type: 'expect',   details: 'No ticket types — empty state shown.' },
  { id: 'N15', col: 4, row: 6, name: 'Access\nDenied',          type: 'expect',   details: 'Event owned by another organizer — 403 or not in list.' },
];

// ── DAG edges ─────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N1',  to: 'N2'  },
  { from: 'N2',  to: 'N3'  },
  { from: 'N3',  to: 'N4'  },
  { from: 'N4',  to: 'N5',  label: '404'     },
  { from: 'N4',  to: 'N6',  label: '500'     },
  { from: 'N4',  to: 'N7',  label: '200 OK'  },
  { from: 'N7',  to: 'N8'  },
  { from: 'N7',  to: 'N9'  },
  { from: 'N7',  to: 'N10' },
  { from: 'N9',  to: 'N11', label: 'Has images' },
  { from: 'N9',  to: 'N12', label: 'No images'  },
  { from: 'N10', to: 'N13', label: '>0 types'   },
  { from: 'N10', to: 'N14', label: '0 types'    },
  { from: 'N2',  to: 'N15', label: 'Other\'s event' },
];

// ── Scenarios (one per TC) ────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP234-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'All core event information fields are displayed on the Event Detail page (name, date/time, location, images, ticket types)',
    steps: [
      { action: 'Log in as Organizer and open event list', data: 'Valid STG Organizer; event with name, date/time, location, images, ticket types', expect: 'Event list visible' },
      { action: 'Tap/click event to open Event Detail page', data: '—', expect: 'GET /event/:id called; Event Detail page loads' },
      { action: 'Verify each required field is visible on the page', data: '—', expect: 'Event Name, Date & Time, Location/Venue, Event Images, and Ticket Types section all displayed' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N4', 'N7', 'N8', 'N9', 'N10', 'N11', 'N13'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N4'], ['N4','N7'], ['N7','N8'], ['N7','N9'], ['N7','N10'], ['N9','N11'], ['N10','N13']],
  },
  {
    id: 'PP234-TC-002',
    typeCls: 'dt',
    type: 'Functional',
    name: 'Event images render correctly for events with images; placeholder shown for events without images',
    steps: [
      { action: 'Open Event Detail for event with images', data: 'Event with 3 uploaded images', expect: 'Images/gallery section visible; images load (src non-empty, isVisible = true)' },
      { action: 'Open Event Detail for event with no images', data: 'Event with 0 uploaded images', expect: 'Placeholder image or "no image" fallback shown in images section' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N4', 'N7', 'N9', 'N11', 'N12'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N4'], ['N4','N7'], ['N7','N9'], ['N9','N11'], ['N9','N12']],
  },
  {
    id: 'PP234-TC-003',
    typeCls: 'dt',
    type: 'Functional',
    name: 'Ticket Types list renders correctly for single and multiple ticket type scenarios',
    steps: [
      { action: 'Open Event Detail for event with 3 ticket types', data: 'Ticket types: VIP, Standard, Early Bird', expect: 'Ticket Types section shows 3 rows with correct names' },
      { action: 'Open Event Detail for event with exactly 1 ticket type', data: 'Only one ticket type defined', expect: 'Ticket Types section shows 1 row' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N4', 'N7', 'N10', 'N13'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N4'], ['N4','N7'], ['N7','N10'], ['N10','N13']],
  },
  {
    id: 'PP234-TC-004',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Event Detail page values match the data returned by GET /event/:id API',
    steps: [
      { action: 'Intercept GET /event/:id API response and capture JSON payload', data: 'Known event ID with fully populated fields', expect: 'API JSON captured' },
      { action: 'Open Event Detail page for same event', data: '—', expect: 'Page renders' },
      { action: 'Compare each UI field value against the captured API JSON fields', data: 'name, date, location, images array, ticket types array', expect: 'Every displayed field value exactly matches the API response value' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N4', 'N7', 'N8'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N4'], ['N4','N7'], ['N7','N8']],
  },
  {
    id: 'PP234-TC-005',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Event with no ticket types shows an appropriate empty or placeholder state in the Ticket Types section',
    steps: [
      { action: 'Open Event Detail for event with zero ticket types defined', data: 'Event ID with no ticket type records', expect: 'Page loads' },
      { action: 'Inspect Ticket Types section', data: '—', expect: 'Section shows empty state (e.g. "No ticket types" message) — no blank rows or errors' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N4', 'N7', 'N10', 'N14'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N4'], ['N4','N7'], ['N7','N10'], ['N10','N14']],
  },
  {
    id: 'PP234-TC-006',
    typeCls: 'manual',
    type: 'Negative',
    name: 'Navigating to a deleted or non-existent event shows a clear error page (404)',
    steps: [
      { action: 'Construct direct URL to Event Detail page with a non-existent event ID', data: 'e.g. /events/00000000-dead-beef-0000-000000000000', expect: 'Navigation initiated' },
      { action: 'Observe page response', data: '—', expect: 'Clear 404 / "Event Not Found" error page displayed; no blank page or unhandled JS error' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N4', 'N5'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N4'], ['N4','N5']],
  },
  {
    id: 'PP234-TC-007',
    typeCls: 'manual',
    type: 'Negative',
    name: 'Event Detail shows error state with retry option when the Event API returns 500 or times out',
    steps: [
      { action: 'Configure WireMock / Playwright network intercept to return HTTP 500 for GET /event/:id', data: 'Stub: GET /event/:id → 500 Internal Server Error', expect: 'Stub active' },
      { action: 'Navigate to Event Detail page', data: '—', expect: 'Page shows error state with user-friendly message and a Retry button/action' },
      { action: 'Click Retry (optionally remove stub first)', data: '—', expect: 'Page re-requests the API; if stub removed, detail loads normally' },
    ],
    activePath: ['N1', 'N2', 'N3', 'N4', 'N6'],
    activeEdges: [['N1','N2'], ['N2','N3'], ['N3','N4'], ['N4','N6']],
  },
  {
    id: 'PP234-TC-008',
    typeCls: 'ep',
    type: 'Security',
    name: 'Organizer cannot access Event Detail for an event owned by a different organizer',
    steps: [
      { action: 'Log in as Organizer A', data: 'Organizer A credentials (STG)', expect: 'Organizer A dashboard visible' },
      { action: 'Attempt to navigate to Event Detail URL for an event owned by Organizer B', data: 'Event ID owned by Organizer B (not in Organizer A\'s event list)', expect: 'Access denied — 403 error page or event not found / not in list; Organizer A cannot view Organizer B\'s event data' },
    ],
    activePath: ['N1', 'N2', 'N15'],
    activeEdges: [['N1','N2'], ['N2','N15']],
  },
];

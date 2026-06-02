import type { DagEdge, DagNode, Scenario } from '@/types';

// ── DAG Nodes ─────────────────────────────────────────────────────────────────
// col 0: entry points
// col 1: API / action nodes
// col 2: data / branch outcomes
// col 3: detail / terminal states
export const SM_NODES: DagNode[] = [
  // Finance List flow
  { id: 'N01', col: 0, row: 0,  name: 'Finance\nPage Open', type: 'action',   details: 'Organizer navigates to the Finance / Transaction page.' },
  { id: 'N02', col: 1, row: 0,  name: 'API\nRequest',       type: 'action',   details: 'Finance list API request is sent to the backend.' },
  { id: 'N03', col: 1, row: 1,  name: 'API\nError?',        type: 'decision', details: 'Did the API respond with an error or timeout?' },
  { id: 'N04', col: 2, row: 2,  name: 'Error\nState',       type: 'expect',   details: 'Finance list API failure — error state displayed gracefully.' },
  { id: 'N05', col: 2, row: 0,  name: 'List\nLoaded',       type: 'expect',   details: 'Finance list loaded; order rows and summary displayed.' },
  // Revenue summary
  { id: 'N06', col: 3, row: 0,  name: 'Revenue\nSummary',   type: 'action',   details: 'Revenue summary section rendered: Total, Platform Fee, Gateway Fee, Net Payout.' },
  // Fee calculation
  { id: 'N07', col: 0, row: 3,  name: 'Total\nRevenue',     type: 'action',   details: 'Total Revenue value confirmed from API data.' },
  { id: 'N08', col: 1, row: 3,  name: 'Gateway\nFee 2.5%',  type: 'action',   details: 'Gateway Fee = 2.5% × Total Revenue.' },
  { id: 'N09', col: 1, row: 4,  name: 'Platform\nFee 0.5%', type: 'action',   details: 'Platform Fee = 0.5% × Total Revenue.' },
  { id: 'N10', col: 2, row: 3,  name: 'Net\nPayout',        type: 'action',   details: 'Net Payout = Revenue − Gateway Fee − Platform Fee.' },
  { id: 'N11', col: 3, row: 3,  name: 'Values\nCorrect',    type: 'expect',   details: 'Displayed fee values match expected calculations.' },
  { id: 'N12', col: 3, row: 4,  name: 'Rounding\nCheck',    type: 'expect',   details: 'Fractional revenue: fees round correctly to 2 decimal places.' },
  { id: 'N13', col: 2, row: 5,  name: 'Zero\nRevenue',      type: 'expect',   details: 'Zero-revenue event: all fees display as 0 with no NaN errors.' },
  // Order Detail flow
  { id: 'N14', col: 0, row: 6,  name: 'Order\nRow Tap',     type: 'action',   details: 'Organizer taps an order row in the finance list.' },
  { id: 'N15', col: 1, row: 6,  name: 'Detail\nAPI',        type: 'action',   details: 'Order Detail API request sent.' },
  { id: 'N16', col: 2, row: 6,  name: 'Detail\nLoaded',     type: 'expect',   details: 'Order Detail page loaded successfully.' },
  { id: 'N17', col: 3, row: 6,  name: 'Fields\nVerified',   type: 'expect',   details: 'Order ID, Buyer, Ticket Type, Price, Status, Payment Date displayed correctly.' },
  { id: 'N18', col: 3, row: 7,  name: 'Back to\nList',      type: 'expect',   details: 'Organizer navigates back; finance list is intact.' },
];

// ── DAG Edges ─────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N01', to: 'N02', label: 'Navigate' },
  { from: 'N02', to: 'N03', label: 'Response' },
  { from: 'N03', to: 'N04', label: 'Error' },
  { from: 'N03', to: 'N05', label: 'Success' },
  { from: 'N05', to: 'N06', label: 'Render summary' },
  { from: 'N07', to: 'N08', label: '×2.5%' },
  { from: 'N07', to: 'N09', label: '×0.5%' },
  { from: 'N08', to: 'N10', label: 'Subtract' },
  { from: 'N09', to: 'N10', label: 'Subtract' },
  { from: 'N10', to: 'N11', label: 'Assert' },
  { from: 'N10', to: 'N12', label: 'Fractional' },
  { from: 'N07', to: 'N13', label: 'Zero value' },
  { from: 'N14', to: 'N15', label: 'Tap row' },
  { from: 'N15', to: 'N16', label: 'API 200' },
  { from: 'N16', to: 'N17', label: 'Assert fields' },
  { from: 'N17', to: 'N18', label: 'Back' },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP236-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Finance page loads and displays transaction rows',
    steps: [
      { action: 'Log in as organizer and navigate to Finance page', data: 'STG organizer credentials', expect: 'Finance page is displayed' },
      { action: 'Verify transaction/order rows are listed', data: 'STG event with completed transactions', expect: 'Order rows with statuses are displayed' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N05'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N05']],
  },
  {
    id: 'PP236-TC-002',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Revenue summary section displays Total Revenue, Platform Fee (0.5%), Gateway Fee (2.5%), and Net Payout',
    steps: [
      { action: 'Navigate to Finance page with a completed event', data: 'STG event with known revenue', expect: 'Finance list loads' },
      { action: 'Verify the Revenue summary section is visible with all four fields', data: '—', expect: 'Total Revenue, Platform Fee, Gateway Fee, and Net Payout labels and values displayed' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N05', 'N06'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N05'], ['N05','N06']],
  },
  {
    id: 'PP236-TC-003',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Gateway Fee equals 2.5% of Total Revenue',
    steps: [
      { action: 'Navigate to Finance page for event with known revenue', data: 'Total Revenue = 10,000 THB', expect: 'Finance list with summary loaded' },
      { action: 'Assert displayed Gateway Fee value', data: 'Expected: 250 THB (2.5%)', expect: 'Displayed Gateway Fee = 250 THB' },
    ],
    activePath: ['N07', 'N08', 'N10', 'N11'],
    activeEdges: [['N07','N08'], ['N08','N10'], ['N10','N11']],
  },
  {
    id: 'PP236-TC-004',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Platform Fee equals 0.5% of Total Revenue',
    steps: [
      { action: 'Navigate to Finance page for event with known revenue', data: 'Total Revenue = 10,000 THB', expect: 'Finance list with summary loaded' },
      { action: 'Assert displayed Platform Fee value', data: 'Expected: 50 THB (0.5%)', expect: 'Displayed Platform Fee = 50 THB' },
    ],
    activePath: ['N07', 'N09', 'N10', 'N11'],
    activeEdges: [['N07','N09'], ['N09','N10'], ['N10','N11']],
  },
  {
    id: 'PP236-TC-005',
    typeCls: 'dt',
    type: 'Functional',
    name: 'Net Payout equals Revenue minus Gateway Fee minus Platform Fee',
    steps: [
      { action: 'Navigate to Finance page with known revenue event', data: 'Total Revenue = 10,000 THB', expect: 'Finance list loaded' },
      { action: 'Assert Net Payout = Total Revenue − Gateway Fee − Platform Fee', data: 'Expected: 10,000 − 250 − 50 = 9,700 THB', expect: 'Displayed Net Payout = 9,700 THB' },
    ],
    activePath: ['N07', 'N08', 'N09', 'N10', 'N11'],
    activeEdges: [['N07','N08'], ['N07','N09'], ['N08','N10'], ['N09','N10'], ['N10','N11']],
  },
  {
    id: 'PP236-TC-006',
    typeCls: 'bva',
    type: 'Functional',
    name: 'Fee calculation with fractional amount rounds correctly to 2 decimal places',
    steps: [
      { action: 'Navigate to Finance page for event with fractional revenue', data: 'Total Revenue = 333.33 THB', expect: 'Finance list loaded' },
      { action: 'Assert Gateway Fee and Platform Fee round to 2 decimal places', data: 'Gateway: 8.33 THB · Platform: 1.67 THB', expect: 'Displayed values match expected 2-decimal rounded figures' },
    ],
    activePath: ['N07', 'N08', 'N09', 'N10', 'N12'],
    activeEdges: [['N07','N08'], ['N07','N09'], ['N08','N10'], ['N09','N10'], ['N10','N12']],
  },
  {
    id: 'PP236-TC-007',
    typeCls: 'bva',
    type: 'Functional',
    name: 'Zero-revenue event shows all fees as 0 without NaN or display error',
    steps: [
      { action: 'Navigate to Finance page for a zero-revenue event', data: 'Total Revenue = 0 THB', expect: 'Finance list loaded' },
      { action: 'Assert all fee and payout values display as 0', data: 'Expected: Gateway Fee = 0, Platform Fee = 0, Net Payout = 0', expect: 'No NaN, no display error; all values show 0' },
    ],
    activePath: ['N07', 'N13'],
    activeEdges: [['N07','N13']],
  },
  {
    id: 'PP236-TC-008',
    typeCls: 'manual',
    type: 'Negative',
    name: 'Finance list API failure shows error state gracefully',
    steps: [
      { action: 'Simulate finance list API failure (network mock / proxy)', data: 'Force 5xx on finance list endpoint', expect: 'Error state UI component displayed — no blank screen or unhandled exception' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N04'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N04']],
  },
  {
    id: 'PP236-TC-009',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Tapping an order row opens the Order Detail page',
    steps: [
      { action: 'Tap a visible order row in the finance list', data: 'Known order row', expect: 'Order Detail page is opened' },
    ],
    activePath: ['N14', 'N15', 'N16'],
    activeEdges: [['N14','N15'], ['N15','N16']],
  },
  {
    id: 'PP236-TC-010',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Order Detail shows Order ID and Buyer name',
    steps: [
      { action: 'Navigate to Order Detail for a known order', data: 'Known order with buyer details', expect: 'Order Detail page loaded' },
      { action: 'Verify Order ID and Buyer name are displayed', data: 'Expected Order ID and Buyer name', expect: 'Both fields visible and correct' },
    ],
    activePath: ['N14', 'N15', 'N16', 'N17'],
    activeEdges: [['N14','N15'], ['N15','N16'], ['N16','N17']],
  },
  {
    id: 'PP236-TC-011',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Order Detail shows Ticket Type, Price, Status, and Payment Date',
    steps: [
      { action: 'Navigate to Order Detail for a known order', data: 'Known order with all field data', expect: 'Order Detail page loaded' },
      { action: 'Verify Ticket Type, Price, Status, and Payment Date are displayed', data: 'Expected values for all four fields', expect: 'All four fields visible and match expected data' },
    ],
    activePath: ['N14', 'N15', 'N16', 'N17'],
    activeEdges: [['N14','N15'], ['N15','N16'], ['N16','N17']],
  },
  {
    id: 'PP236-TC-012',
    typeCls: 'st',
    type: 'Functional',
    name: 'Back navigation returns organizer to finance list with list intact',
    steps: [
      { action: 'From Order Detail page, tap the Back button', data: '—', expect: 'Finance list page is displayed' },
      { action: 'Verify the finance list is still intact with previous data', data: '—', expect: 'Order rows and summary still visible as before navigation' },
    ],
    activePath: ['N14', 'N15', 'N16', 'N17', 'N18'],
    activeEdges: [['N14','N15'], ['N15','N16'], ['N16','N17'], ['N17','N18']],
  },
];

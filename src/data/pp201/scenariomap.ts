import type { DagEdge, DagNode, Scenario } from '@/types';

// ── DAG Nodes ─────────────────────────────────────────────────────────────────
//
// col/row layout (0-based):
//
//  col:  0           1           2          3           4
//  row0  CHECKOUT ──► METHOD ──► QR ──► PENDING ──► WEBHOOK? ──► COMPLETED ──► HISTORY
//                          └──► TMW ──► REDIRECT       └──► FAILED
//                          └──► MB ──► REDIRECT        └──► EXPIRED ──► RETRY
//  row3  POLL ──► STATUS? (loop PENDING)
//  row4  WEBHOOK_IN ──► IDEM? ──► PROCESS / SKIP
//  row5  REFUND_REQ ──► DAYS? ──► FULL / PARTIAL / DENIED
//  row6  PAYOUT ──► FEE ──► TRANSFER

export const SM_NODES: DagNode[] = [
  // Checkout
  { id: 'N01', col: 0, row: 0, name: 'Order\nSummary',   type: 'action',   details: 'User views Order Summary: ticket details and price.' },
  { id: 'N02', col: 1, row: 0, name: 'Select\nMethod',   type: 'decision', details: 'User chooses payment method: QR PromptPay, TrueMoney, or Mobile Banking.' },
  // QR PromptPay path
  { id: 'N03', col: 2, row: 0, name: 'QR\nGenerated',    type: 'action',   details: 'QR PromptPay code generated; 15-minute countdown starts.' },
  { id: 'N04', col: 3, row: 0, name: 'Status:\nPending', type: 'expect',   details: 'Payment status = PENDING; awaiting scan and webhook.' },
  { id: 'N05', col: 4, row: 0, name: 'Webhook\nResult?', type: 'decision', details: 'What result did the Payginix webhook deliver?' },
  { id: 'N06', col: 5, row: 0, name: 'Status:\nCompleted', type: 'expect', details: 'Payment COMPLETED; ticket confirmed; History recorded.' },
  { id: 'N07', col: 5, row: 1, name: 'Status:\nFailed',  type: 'expect',   details: 'Payment FAILED; retry option shown.' },
  { id: 'N08', col: 5, row: 2, name: 'QR\nExpired',      type: 'expect',   details: 'QR TTL elapsed (15 min); EXPIRED status; prompt to retry.' },
  // Polling
  { id: 'N09', col: 6, row: 0, name: 'Poll\nStatus',     type: 'action',   details: 'App polls GET /payments/status until status changes.' },
  // TrueMoney / Mobile Banking
  { id: 'N10', col: 2, row: 3, name: 'TMW\nRedirect',    type: 'action',   details: 'App redirects to TrueMoney Wallet app.' },
  { id: 'N11', col: 2, row: 4, name: 'MB\nRedirect',     type: 'action',   details: 'App redirects to Mobile Banking app (BBL/KBANK/SCB/KMA/KTB).' },
  { id: 'N12', col: 3, row: 3, name: 'Return\nto App',   type: 'action',   details: 'Deep link returns user to POPPA; webhook resolves status.' },
  // Webhook idempotency
  { id: 'N13', col: 0, row: 5, name: 'Webhook\nArrives', type: 'action',   details: 'Payginix sends webhook to POPPA backend.' },
  { id: 'N14', col: 1, row: 5, name: 'Seen\nBefore?',    type: 'decision', details: 'Has this idempotency key been processed already?' },
  { id: 'N15', col: 2, row: 5, name: 'Process\nWebhook', type: 'action',   details: 'First occurrence: payment status updated; no duplicate record.' },
  { id: 'N16', col: 2, row: 6, name: 'Duplicate\nIgnored', type: 'expect', details: 'Repeat webhook silently ignored; HTTP 200 returned.' },
  // Refund
  { id: 'N17', col: 0, row: 7, name: 'Refund\nRequest',  type: 'action',   details: 'User or system initiates a refund after cancellation.' },
  { id: 'N18', col: 1, row: 7, name: 'Days\nBefore?',    type: 'decision', details: 'How many days remain until the event?' },
  { id: 'N19', col: 2, row: 7, name: '100%\nRefund',     type: 'expect',   details: '>7 days before event: full refund to original method.' },
  { id: 'N20', col: 2, row: 8, name: '50%\nRefund',      type: 'expect',   details: '3-7 days before event: 50% refund to original method.' },
  { id: 'N21', col: 2, row: 9, name: 'No\nRefund',       type: 'expect',   details: '<3 days before event: refund denied per policy.' },
  // Payout
  { id: 'N22', col: 0, row: 10, name: 'Event\nEnds',     type: 'action',   details: 'Event end date reached; payout calculation begins.' },
  { id: 'N23', col: 1, row: 10, name: 'Fee\nDeducted',   type: 'action',   details: 'Platform fee deducted from gross revenue.' },
  { id: 'N24', col: 2, row: 10, name: 'Net\nPayout',     type: 'expect',   details: 'Net amount transferred to Organizer; payout report generated.' },
];

// ── DAG Edges ─────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N01', to: 'N02', label: 'confirm' },
  { from: 'N02', to: 'N03', label: 'QR PromptPay' },
  { from: 'N02', to: 'N10', label: 'TrueMoney' },
  { from: 'N02', to: 'N11', label: 'Mobile Banking' },
  { from: 'N03', to: 'N04' },
  { from: 'N04', to: 'N05', label: 'webhook' },
  { from: 'N04', to: 'N08', label: 'timeout 15 min' },
  { from: 'N05', to: 'N06', label: 'success' },
  { from: 'N05', to: 'N07', label: 'failure' },
  { from: 'N06', to: 'N09' },
  { from: 'N09', to: 'N06', label: 'COMPLETED' },
  { from: 'N09', to: 'N07', label: 'FAILED' },
  { from: 'N09', to: 'N08', label: 'EXPIRED' },
  { from: 'N10', to: 'N12' },
  { from: 'N11', to: 'N12' },
  { from: 'N12', to: 'N05', label: 'webhook' },
  { from: 'N13', to: 'N14' },
  { from: 'N14', to: 'N15', label: 'first time' },
  { from: 'N14', to: 'N16', label: 'duplicate' },
  { from: 'N17', to: 'N18' },
  { from: 'N18', to: 'N19', label: '> 7 days' },
  { from: 'N18', to: 'N20', label: '3-7 days' },
  { from: 'N18', to: 'N21', label: '< 3 days' },
  { from: 'N22', to: 'N23' },
  { from: 'N23', to: 'N24' },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP201-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Order Summary shows ticket details and price before payment',
    steps: [
      { action: 'Select ticket and proceed to checkout', data: 'Paid event; valid STG user', expect: 'Order Summary screen shows ticket name, quantity, and total price' },
    ],
    activePath: ['N01', 'N02'],
    activeEdges: [['N01','N02']],
  },
  {
    id: 'PP201-TC-002',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'QR PromptPay code generated with 15-minute countdown',
    steps: [
      { action: 'Select QR PromptPay as payment method', data: 'Payginix STG sandbox', expect: 'QR Code displayed; 15-minute countdown timer visible' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N04'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N04']],
  },
  {
    id: 'PP201-TC-003',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'QR PromptPay payment completes via Webhook — status COMPLETED',
    steps: [
      { action: 'Generate QR Code and simulate scan + payment', data: 'Payginix STG webhook: status = COMPLETED', expect: 'Payment status updated to COMPLETED; ticket confirmed' },
    ],
    activePath: ['N03', 'N04', 'N05', 'N06', 'N09'],
    activeEdges: [['N03','N04'], ['N04','N05'], ['N05','N06'], ['N06','N09']],
  },
  {
    id: 'PP201-TC-004',
    typeCls: 'bva',
    type: 'Functional',
    name: 'QR Code expires after 15 minutes — status EXPIRED; retry prompted',
    steps: [
      { action: 'Generate QR Code; do not pay', data: 'Advance STG clock or short-TTL test QR', expect: 'After 15 min, QR expires' },
      { action: 'Check payment status', data: '—', expect: 'Status = EXPIRED; message shown; option to get new QR' },
    ],
    activePath: ['N03', 'N04', 'N08'],
    activeEdges: [['N03','N04'], ['N04','N08']],
  },
  {
    id: 'PP201-TC-005',
    typeCls: 'st',
    type: 'Functional',
    name: 'App polls payment status and reflects COMPLETED',
    steps: [
      { action: 'Initiate payment; observe polling loop', data: 'App polls GET /payments/status', expect: 'Polling starts; status shows PENDING while waiting' },
      { action: 'Simulate webhook success', data: 'Payginix webhook payload: COMPLETED', expect: 'App polls and receives COMPLETED; navigates to Success Screen' },
    ],
    activePath: ['N04', 'N09', 'N06'],
    activeEdges: [['N04','N09'], ['N09','N06']],
  },
  {
    id: 'PP201-TC-006',
    typeCls: 'st',
    type: 'Negative',
    name: 'Payment failure shown with retry option',
    steps: [
      { action: 'Simulate payment failure webhook', data: 'Payginix webhook: status = FAILED', expect: 'Status = FAILED; error message shown; retry option visible' },
    ],
    activePath: ['N04', 'N09', 'N07'],
    activeEdges: [['N04','N09'], ['N09','N07']],
  },
  {
    id: 'PP201-TC-007',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'TrueMoney redirect flow completes successfully',
    steps: [
      { action: 'Select TrueMoney Wallet; complete payment in TrueMoney app', data: 'Payginix TrueMoney STG test account', expect: 'Redirect to TrueMoney; payment completed' },
      { action: 'Return to POPPA app', data: 'Deep link return', expect: 'Status = COMPLETED; ticket confirmed' },
    ],
    activePath: ['N02', 'N10', 'N12', 'N05', 'N06'],
    activeEdges: [['N02','N10'], ['N10','N12'], ['N12','N05'], ['N05','N06']],
  },
  {
    id: 'PP201-TC-008',
    typeCls: 'st',
    type: 'Functional',
    name: 'Mobile Banking option appears and initiates redirect',
    steps: [
      { action: 'Select Mobile Banking on payment method screen', data: 'Available banking apps on device', expect: 'Mobile Banking option listed; tapping initiates redirect to banking app' },
    ],
    activePath: ['N02', 'N11', 'N12'],
    activeEdges: [['N02','N11'], ['N11','N12']],
  },
  {
    id: 'PP201-TC-009',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'First webhook from Payginix is processed correctly',
    steps: [
      { action: 'Send webhook to POPPA backend (first occurrence)', data: 'Valid payload with unique paymentId', expect: 'Webhook processed; payment status updated; no duplicate record' },
    ],
    activePath: ['N13', 'N14', 'N15'],
    activeEdges: [['N13','N14'], ['N14','N15']],
  },
  {
    id: 'PP201-TC-010',
    typeCls: 'ep',
    type: 'Negative',
    name: 'Duplicate webhook is ignored — no double processing',
    steps: [
      { action: 'Send the same webhook payload a second time', data: 'Same paymentId as TC-009', expect: 'Second webhook ignored; HTTP 200 returned; no duplicate record created' },
    ],
    activePath: ['N13', 'N14', 'N16'],
    activeEdges: [['N13','N14'], ['N14','N16']],
  },
  {
    id: 'PP201-TC-011',
    typeCls: 'bva',
    type: 'Functional',
    name: 'User gets 100% refund when cancelling more than 7 days before event',
    steps: [
      { action: 'Cancel ticket for event 8 days away', data: 'Event date = today + 8 days', expect: 'Refund policy check passes; 100% refund initiated to original payment method' },
    ],
    activePath: ['N17', 'N18', 'N19'],
    activeEdges: [['N17','N18'], ['N18','N19']],
  },
  {
    id: 'PP201-TC-012',
    typeCls: 'bva',
    type: 'Functional',
    name: 'User gets 50% refund when cancelling 3-7 days before event',
    steps: [
      { action: 'Cancel ticket for event 4 days away', data: 'Event date = today + 4 days', expect: 'Refund policy check passes; 50% refund initiated to original payment method' },
    ],
    activePath: ['N17', 'N18', 'N20'],
    activeEdges: [['N17','N18'], ['N18','N20']],
  },
  {
    id: 'PP201-TC-013',
    typeCls: 'bva',
    type: 'Negative',
    name: 'No refund when cancelling within 3 days of event',
    steps: [
      { action: 'Cancel ticket for event 2 days away', data: 'Event date = today + 2 days', expect: 'Refund denied per policy; no money returned; cancellation still processed' },
    ],
    activePath: ['N17', 'N18', 'N21'],
    activeEdges: [['N17','N18'], ['N18','N21']],
  },
  {
    id: 'PP201-TC-014',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Organizer receives net payout after event ends with correct fee deduction',
    steps: [
      { action: 'Event end date passes; payout job triggered', data: 'STG event with past end_date; multiple confirmed payments', expect: 'Gross revenue calculated' },
      { action: 'Verify payout amount and report', data: 'Platform fee rate from backend config', expect: 'Platform fee deducted; net amount transferred to Organizer; payout report visible to admin' },
    ],
    activePath: ['N22', 'N23', 'N24'],
    activeEdges: [['N22','N23'], ['N23','N24']],
  },
];

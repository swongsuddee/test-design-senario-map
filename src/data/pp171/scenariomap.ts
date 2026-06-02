import type { DagEdge, DagNode, Scenario } from '@/types';

// ── DAG Nodes ─────────────────────────────────────────────────────────────────
// col 0: entry / subject states
// col 1: gate / check nodes
// col 2: outcomes / triggered states
// col 3: downstream effects / terminals
export const SM_NODES: DagNode[] = [
  // Access Control gate
  { id: 'N01', col: 0, row: 0,  name: 'Agency\nLogs In',    type: 'action',   details: 'Agency user logs in to the Back-Office portal.' },
  { id: 'N02', col: 1, row: 0,  name: 'Approval\nStatus?',  type: 'decision', details: 'What is the Agency approval status: Pending, Rejected, or Approved?' },
  { id: 'N03', col: 2, row: 0,  name: 'Menu\nLOCKED',       type: 'expect',   details: 'Create Event menu is locked — Agency cannot access.' },
  { id: 'N04', col: 2, row: 1,  name: 'Menu\nUNLOCKED',     type: 'expect',   details: 'Create Event menu is unlocked — Agency can access.' },
  { id: 'N05', col: 3, row: 0,  name: 'Access\nDenied',     type: 'expect',   details: 'Agency is blocked from entering the Create Event flow.' },
  { id: 'N06', col: 3, row: 1,  name: 'Select\nCategory',   type: 'expect',   details: 'Agency proceeds to select event category and creates event.' },
  // Onboarding notification
  { id: 'N07', col: 0, row: 2,  name: 'Admin\nApproves',    type: 'action',   details: 'Admin performs the Approve action on an Agency.' },
  { id: 'N08', col: 1, row: 2,  name: 'Status\nApproved',   type: 'action',   details: 'Agency status changes to Approved.' },
  { id: 'N09', col: 2, row: 2,  name: 'Push/Email\nSent',   type: 'expect',   details: 'Push Notification and Email dispatched to Agency with onboarding link.' },
  // Corporate doc gate
  { id: 'N10', col: 0, row: 3,  name: 'Corp Docs\nCheck',   type: 'decision', details: 'Are all required corporate documents submitted and complete?' },
  { id: 'N11', col: 1, row: 4,  name: 'Not in\nAdmin BO',   type: 'expect',   details: 'Agency NOT listed in Admin BO — incomplete docs gate.' },
  { id: 'N12', col: 1, row: 3,  name: 'Listed in\nAdmin BO', type: 'expect',  details: 'Agency appears in Admin BO list — documents complete.' },
  // Audit trail
  { id: 'N13', col: 2, row: 3,  name: 'Audit\nCreated',     type: 'action',   details: 'Audit trail entry created with actorId and timestamp.' },
  // RBAC
  { id: 'N14', col: 0, row: 5,  name: 'No-Role\nAdmin',     type: 'action',   details: 'Admin without KYC/Verifier role attempts to Approve an Agency.' },
  { id: 'N15', col: 1, row: 5,  name: 'RBAC\nCheck',        type: 'decision', details: 'Does the Admin have the required KYC/Verifier role?' },
  { id: 'N16', col: 2, row: 5,  name: '403\nDenied',        type: 'expect',   details: 'System returns 403 — permission denied; Agency status unchanged.' },
  // Event list
  { id: 'N17', col: 0, row: 6,  name: 'Event\nList View',   type: 'action',   details: 'Admin opens the Event Management list page.' },
  { id: 'N18', col: 1, row: 6,  name: 'List\nLoaded',       type: 'expect',   details: 'Event list loaded with paginated results and required fields.' },
  { id: 'N19', col: 2, row: 6,  name: 'Search/\nFilter',    type: 'action',   details: 'Admin applies keyword search or status filter.' },
  { id: 'N20', col: 3, row: 6,  name: 'Results\nFiltered',  type: 'expect',   details: 'Filtered event list matching applied criteria displayed.' },
  // Event approve/reject
  { id: 'N21', col: 0, row: 7,  name: 'Pending\nApproved',  type: 'action',   details: 'Event is in pending_approved status.' },
  { id: 'N22', col: 1, row: 7,  name: 'Admin\nDecision?',   type: 'decision', details: 'Does Admin Approve or Reject the pending_approved event?' },
  { id: 'N23', col: 2, row: 7,  name: 'Published\n+ Notify', type: 'expect',  details: 'Event status → published; Organizer is notified.' },
  { id: 'N24', col: 2, row: 8,  name: 'Draft +\nReason',    type: 'expect',   details: 'Event status → draft; rejection reason stored in history.' },
  // Cancel approve/reject
  { id: 'N25', col: 0, row: 9,  name: 'Pending\nCancel',    type: 'action',   details: 'Event is in pending_cancel status.' },
  { id: 'N26', col: 1, row: 9,  name: 'Cancel\nDecision?',  type: 'decision', details: 'Does Admin Approve or Reject the cancel request?' },
  { id: 'N27', col: 2, row: 9,  name: 'Cancelled\n+ Refund', type: 'expect',  details: 'Event cancelled; refund triggered; participants notified.' },
  { id: 'N28', col: 2, row: 10, name: 'Published\nRestored', type: 'expect',  details: 'Event restored to published; Organizer notified of rejection.' },
];

// ── DAG Edges ─────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N01', to: 'N02', label: 'Check status' },
  { from: 'N02', to: 'N03', label: 'Pending/Rejected' },
  { from: 'N02', to: 'N04', label: 'Approved' },
  { from: 'N03', to: 'N05', label: 'Access attempt' },
  { from: 'N04', to: 'N06', label: 'Enter flow' },
  { from: 'N07', to: 'N08', label: 'Approve' },
  { from: 'N08', to: 'N09', label: 'Side effect' },
  { from: 'N10', to: 'N11', label: 'Incomplete' },
  { from: 'N10', to: 'N12', label: 'Complete' },
  { from: 'N08', to: 'N13', label: 'Audit write' },
  { from: 'N14', to: 'N15', label: 'API call' },
  { from: 'N15', to: 'N16', label: 'No role' },
  { from: 'N17', to: 'N18', label: 'Load list' },
  { from: 'N18', to: 'N19', label: 'Apply filter' },
  { from: 'N19', to: 'N20', label: 'Filter results' },
  { from: 'N21', to: 'N22', label: 'Admin reviews' },
  { from: 'N22', to: 'N23', label: 'Approve' },
  { from: 'N22', to: 'N24', label: 'Reject' },
  { from: 'N25', to: 'N26', label: 'Admin reviews' },
  { from: 'N26', to: 'N27', label: 'Approve cancel' },
  { from: 'N26', to: 'N28', label: 'Reject cancel' },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP171-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Create Event menu is LOCKED for Agency with PENDING status',
    steps: [
      { action: 'Log in as Agency with PENDING status', data: 'STG Agency: verificationStatus = PENDING_REVIEW', expect: 'Home dashboard displayed' },
      { action: 'Attempt to access Create Event menu', data: '—', expect: 'Create Event menu is locked — access is blocked' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N05'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N05']],
  },
  {
    id: 'PP171-TC-002',
    typeCls: 'st',
    type: 'Functional',
    name: 'Create Event menu is LOCKED for Agency with REJECTED status',
    steps: [
      { action: 'Log in as Agency with REJECTED status', data: 'STG Agency: verificationStatus = REJECTED', expect: 'Home dashboard displayed' },
      { action: 'Attempt to access Create Event menu', data: '—', expect: 'Create Event menu is locked — access is blocked' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N05'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N05']],
  },
  {
    id: 'PP171-TC-003',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Create Event menu is UNLOCKED for Approved Agency — Agency can access and select category',
    steps: [
      { action: 'Log in as Agency with APPROVED status', data: 'STG Agency: verificationStatus = APPROVED', expect: 'Home dashboard displayed' },
      { action: 'Click Create Event menu', data: '—', expect: 'Create Event flow is accessible; category selection page shown' },
    ],
    activePath: ['N01', 'N02', 'N04', 'N06'],
    activeEdges: [['N01','N02'], ['N02','N04'], ['N04','N06']],
  },
  {
    id: 'PP171-TC-004',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Approval triggers Push Notification / Email with onboarding link to Agency',
    steps: [
      { action: 'Admin with KYC/Verifier role approves a PENDING Agency', data: 'STG KYC/Verifier Admin + Pending Agency', expect: 'Agency status updates to Approved' },
      { action: 'Verify Agency receives Push Notification or Email', data: 'Mailtrap / registered device token', expect: 'Notification/email received with onboarding link' },
    ],
    activePath: ['N07', 'N08', 'N09'],
    activeEdges: [['N07','N08'], ['N08','N09']],
  },
  {
    id: 'PP171-TC-005',
    typeCls: 'dt',
    type: 'Functional',
    name: 'Corporate Agency with incomplete docs is not listed in Admin BO; appears after docs are complete',
    steps: [
      { action: 'Verify Corporate Agency with incomplete documents is not listed in Admin BO', data: 'STG Corporate Agency with missing required docs', expect: 'Agency does NOT appear in Admin BO agency list' },
      { action: 'Complete all required documents for the Corporate Agency', data: 'STG Corporate Agency with all docs submitted', expect: 'Agency appears in Admin BO agency list' },
    ],
    activePath: ['N10', 'N11', 'N12'],
    activeEdges: [['N10','N11'], ['N10','N12']],
  },
  {
    id: 'PP171-TC-006',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Status change is recorded with actor (actorId) and timestamp after Approve or Reject',
    steps: [
      { action: 'Admin approves or rejects an Agency status', data: 'STG KYC/Verifier Admin + Agency', expect: 'Status change is applied' },
      { action: 'Verify audit trail entry is created in Agency history', data: '—', expect: 'Entry contains: actorId and timestamp of the action' },
    ],
    activePath: ['N07', 'N08', 'N13'],
    activeEdges: [['N07','N08'], ['N08','N13']],
  },
  {
    id: 'PP171-TC-007',
    typeCls: 'manual',
    type: 'Negative',
    name: 'Admin without KYC/Verifier role receives 403 when attempting to Approve Agency',
    steps: [
      { action: 'Attempt to approve Agency using Admin account without KYC/Verifier role', data: 'STG Admin: role = admin (no KYC/Verifier)', expect: 'API call attempted' },
      { action: 'Verify 403 response is returned', data: '—', expect: '403 Permission denied; Agency status unchanged' },
    ],
    activePath: ['N14', 'N15', 'N16'],
    activeEdges: [['N14','N15'], ['N15','N16']],
  },
  {
    id: 'PP171-TC-008',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Admin can view paginated Event list with all required fields',
    steps: [
      { action: 'Log in as Admin and navigate to Event Management', data: 'STG Admin credentials', expect: 'Event list page loaded' },
      { action: 'Verify list shows title, organizer, category, status, participants, and revenue', data: '—', expect: 'All 6 required fields visible in each row; pagination controls present' },
    ],
    activePath: ['N17', 'N18'],
    activeEdges: [['N17','N18']],
  },
  {
    id: 'PP171-TC-009',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Admin can search by keyword and filter by status; results match applied criteria',
    steps: [
      { action: 'Enter a keyword in the Event list search field', data: 'Known event title keyword', expect: 'Event list filters to matching events' },
      { action: 'Apply a status filter (e.g. published)', data: 'Status filter = published', expect: 'Only events matching both keyword and status are displayed' },
    ],
    activePath: ['N17', 'N18', 'N19', 'N20'],
    activeEdges: [['N17','N18'], ['N18','N19'], ['N19','N20']],
  },
  {
    id: 'PP171-TC-010',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Admin approves pending_approved event — status becomes published and Organizer is notified',
    steps: [
      { action: 'Navigate to a pending_approved event and click Approve', data: 'STG event with status = pending_approved', expect: 'ApproveEvent RPC called' },
      { action: 'Verify event status is now published', data: '—', expect: 'Event status changes to published' },
      { action: 'Verify Organizer receives notification', data: 'Mailtrap / push service', expect: 'Organizer notified of event approval' },
    ],
    activePath: ['N21', 'N22', 'N23'],
    activeEdges: [['N21','N22'], ['N22','N23']],
  },
  {
    id: 'PP171-TC-011',
    typeCls: 'st',
    type: 'Functional',
    name: 'Admin rejects pending_approved event with reason — status becomes draft; reason stored in history',
    steps: [
      { action: 'Navigate to a pending_approved event, click Reject, and enter a rejection reason', data: 'STG event with status = pending_approved + reason text', expect: 'RejectEvent RPC called' },
      { action: 'Verify event status is now draft', data: '—', expect: 'Event status changes to draft' },
      { action: 'Verify rejection reason is stored in event history', data: '—', expect: 'Rejection reason visible in event history log' },
    ],
    activePath: ['N21', 'N22', 'N24'],
    activeEdges: [['N21','N22'], ['N22','N24']],
  },
  {
    id: 'PP171-TC-012',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Admin approves cancel request — event becomes cancelled, refund triggered, participants notified',
    steps: [
      { action: 'Navigate to a pending_cancel event and click Approve Cancel', data: 'STG event with status = pending_cancel, paid ticket(s) exist', expect: 'ApproveCancelEvent RPC called' },
      { action: 'Verify event status is cancelled', data: '—', expect: 'Event status = cancelled' },
      { action: 'Verify refund is triggered and participants are notified', data: 'Payment Service API / Kafka events', expect: 'Refund triggered; participant notifications sent' },
    ],
    activePath: ['N25', 'N26', 'N27'],
    activeEdges: [['N25','N26'], ['N26','N27']],
  },
  {
    id: 'PP171-TC-013',
    typeCls: 'st',
    type: 'Functional',
    name: 'Admin rejects cancel request — event status restored to published; Organizer notified',
    steps: [
      { action: 'Navigate to a pending_cancel event and click Reject Cancel', data: 'STG event with status = pending_cancel', expect: 'RejectCancelEvent RPC called' },
      { action: 'Verify event status is restored to published', data: '—', expect: 'Event status = published' },
      { action: 'Verify Organizer is notified of the cancel rejection', data: 'Mailtrap / push service', expect: 'Organizer receives cancellation rejection notification' },
    ],
    activePath: ['N25', 'N26', 'N28'],
    activeEdges: [['N25','N26'], ['N26','N28']],
  },
];

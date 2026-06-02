import type { DagEdge, DagNode, Scenario } from '@/types';

// ── DAG Nodes ─────────────────────────────────────────────────────────────────
//
// col/row layout (0-based):
//
//  col:  0             1            2           3          4           5
//  row0  SETTINGS ──► DEL_BTN ──► DIALOG ──► CONFIRM ──► API ──► API_OK ──► LOGOUT ──► LANDING ──► RELOGIN?──► REJECTED
//                              └──► CANCEL                     └──► API_ERR
//

export const SM_NODES: DagNode[] = [
  { id: 'N01', col: 0, row: 0, name: 'Account\nSettings',  type: 'action',   details: 'Organizer is on the Account Settings page.' },
  { id: 'N02', col: 1, row: 0, name: 'Delete\nButton',     type: 'action',   details: 'Delete Account button is visible and tapped.' },
  { id: 'N03', col: 2, row: 0, name: 'Confirm\nDialog',    type: 'decision', details: 'Confirmation dialog displayed — user chooses action.' },
  { id: 'N04', col: 3, row: 1, name: 'Cancelled\nNo Change', type: 'expect', details: 'Dialog dismissed; account intact; user stays logged in.' },
  { id: 'N05', col: 3, row: 0, name: 'Confirm\nDeletion',  type: 'action',   details: 'User taps Confirm — deletion API is called.' },
  { id: 'N06', col: 4, row: 0, name: 'API\nResult?',       type: 'decision', details: 'Did DELETE /account succeed?' },
  { id: 'N07', col: 5, row: 1, name: 'API\nError',         type: 'expect',   details: 'API returns 4xx/5xx — account NOT deleted; error message shown.' },
  { id: 'N08', col: 5, row: 0, name: 'Force\nLogout',      type: 'action',   details: 'API success — session cleared and force-logout executed.' },
  { id: 'N09', col: 6, row: 0, name: 'Landing\nPage',      type: 'expect',   details: 'Organizer redirected to Landing Page with cleared session.' },
  { id: 'N10', col: 7, row: 0, name: 'Re-login\nAttempt?', type: 'decision', details: 'Does the organizer try to log back in with deleted credentials?' },
  { id: 'N11', col: 8, row: 0, name: 'Login\nRejected',    type: 'expect',   details: 'Auth system rejects the deleted account credentials with an error.' },
];

// ── DAG Edges ─────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N01', to: 'N02', label: 'navigate' },
  { from: 'N02', to: 'N03', label: 'tap Delete' },
  { from: 'N03', to: 'N04', label: 'Cancel' },
  { from: 'N03', to: 'N05', label: 'Confirm' },
  { from: 'N05', to: 'N06' },
  { from: 'N06', to: 'N07', label: 'failure' },
  { from: 'N06', to: 'N08', label: 'success' },
  { from: 'N08', to: 'N09', label: 'redirect' },
  { from: 'N09', to: 'N10' },
  { from: 'N10', to: 'N11', label: 'attempt' },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP244-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Delete Account button is visible and accessible in Account Settings',
    steps: [
      { action: 'Log in as STG Organizer', data: 'Shared STG organizer credentials', expect: 'Login succeeds; dashboard visible' },
      { action: 'Navigate to Account Settings', data: '—', expect: 'Account Settings page loads' },
      { action: 'Locate Delete Account button', data: '—', expect: 'Button is visible, enabled, and accessible' },
    ],
    activePath: ['N01', 'N02'],
    activeEdges: [['N01','N02']],
  },
  {
    id: 'PP244-TC-002',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Tapping Delete Account shows a confirmation dialog with warning message and action buttons',
    steps: [
      { action: 'Navigate to Account Settings', data: 'Shared STG organizer account', expect: 'Account Settings page visible' },
      { action: 'Tap the Delete Account button', data: '—', expect: 'Confirmation dialog appears' },
      { action: 'Inspect dialog content', data: '—', expect: 'Warning message, Confirm/Cancel buttons all present' },
    ],
    activePath: ['N01', 'N02', 'N03'],
    activeEdges: [['N01','N02'], ['N02','N03']],
  },
  {
    id: 'PP244-TC-003',
    typeCls: 'st',
    type: 'Functional',
    name: 'Cancelling the confirmation dialog leaves the account intact and organizer logged in',
    steps: [
      { action: 'Open confirmation dialog', data: 'Shared STG organizer account', expect: 'Dialog visible' },
      { action: 'Tap Cancel / No', data: '—', expect: 'Dialog dismissed' },
      { action: 'Verify account and session', data: '—', expect: 'Account still exists; organizer remains logged in on Account Settings page' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N04'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N04']],
  },
  {
    id: 'PP244-TC-004',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Confirming deletion deletes the account, force-logs out the organizer, and redirects to Landing Page',
    steps: [
      { action: 'Log in with throwaway STG organizer account', data: 'Throwaway account credentials', expect: 'Login succeeds' },
      { action: 'Open Delete Account dialog and tap Confirm', data: '—', expect: 'API called; deletion in progress' },
      { action: 'API responds success', data: 'STG environment', expect: 'Force logout executed; session cleared' },
      { action: 'Observe redirect', data: '—', expect: 'Organizer lands on Landing Page' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N05', 'N06', 'N08', 'N09'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N05'], ['N05','N06'], ['N06','N08'], ['N08','N09']],
  },
  {
    id: 'PP244-TC-005',
    typeCls: 'st',
    type: 'Functional',
    name: 'Deleted account session is fully cleared — protected route redirects to login/landing',
    steps: [
      { action: 'Complete deletion of throwaway account (TC-004 precondition)', data: 'Throwaway account', expect: 'Account deleted; redirected to Landing Page' },
      { action: 'Attempt to navigate to a protected URL directly', data: '/organizer/dashboard', expect: 'Redirected to login or Landing Page (not dashboard)' },
      { action: 'Call protected API with old session token', data: 'Stale auth token', expect: 'HTTP 401 Unauthorized' },
    ],
    activePath: ['N08', 'N09', 'N10'],
    activeEdges: [['N08','N09'], ['N09','N10']],
  },
  {
    id: 'PP244-TC-006',
    typeCls: 'manual',
    type: 'Negative',
    name: 'Attempting to log in with deleted account credentials is rejected with an error message',
    steps: [
      { action: 'Complete deletion of throwaway account', data: 'Throwaway account credentials', expect: 'Account deleted; on Landing Page' },
      { action: 'Attempt to log in with deleted account email + password', data: 'Email and password of deleted account', expect: 'Login rejected with error message (account not found / invalid credentials)' },
    ],
    activePath: ['N09', 'N10', 'N11'],
    activeEdges: [['N09','N10'], ['N10','N11']],
  },
  {
    id: 'PP244-TC-007',
    typeCls: 'manual',
    type: 'Negative',
    name: 'Delete API failure keeps the account active and shows an error message',
    steps: [
      { action: 'Open confirmation dialog and tap Confirm', data: 'Shared STG organizer account', expect: 'Deletion API called' },
      { action: 'Intercept DELETE /account and return HTTP 500', data: 'WireMock / Playwright route intercept', expect: 'Request fails with 5xx' },
      { action: 'Observe UI and account state', data: '—', expect: 'Error message shown; organizer remains logged in; account still exists' },
    ],
    activePath: ['N03', 'N05', 'N06', 'N07'],
    activeEdges: [['N03','N05'], ['N05','N06'], ['N06','N07']],
  },
];

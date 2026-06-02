import type { DagEdge, DagNode, Scenario } from '@/types';

// ── DAG Nodes ─────────────────────────────────────────────────────────────────
// Layout (col = horizontal, row = vertical, 0-based)
//
//  col:  0          1           2           3           4          5
//  row0: BO_URL  -> SESS_CHK -> VALID_SESS (expect)
//  row1:                     -> LOGIN_FORM -> CREDS_IN -> AUTH_CHK -> SESSION
//  row2:                                              -> AUTH_FAIL (expect)
//  row3:          ROLE_CHK -> DENY_ROLE (expect)
//  row4:          DASHBOARD -> INACTIVE -> SESS_EXP (expect)
//  row5:                    -> LOGOUT    -> POST_AUTH (expect)

export const SM_NODES: DagNode[] = [
  { id: 'N01', col: 0, row: 0, name: 'BO URL\nOpened',      type: 'action',   details: 'Admin navigates to Back-Office URL; no session cookie present.' },
  { id: 'N02', col: 1, row: 0, name: 'Session\nCheck',      type: 'decision', details: 'System checks for a valid session / JWT cookie.' },
  { id: 'N03', col: 2, row: 0, name: 'Valid\nSession',       type: 'expect',   details: 'Existing session found — redirected directly to Dashboard.' },
  { id: 'N04', col: 2, row: 1, name: 'Login\nForm',          type: 'expect',   details: '/login page rendered; email + password fields visible.' },
  { id: 'N05', col: 3, row: 1, name: 'Credentials\nEntered', type: 'action',   details: 'Admin fills email & password, clicks Login — button shows "Logging in...".' },
  { id: 'N06', col: 4, row: 1, name: 'Auth\nCheck',          type: 'decision', details: 'Backend validates credentials, role, and account status.' },
  { id: 'N07', col: 5, row: 1, name: 'Session\nCreated',     type: 'expect',   details: 'JWT issued; session stored; redirect to Dashboard.' },
  { id: 'N08', col: 4, row: 2, name: 'Auth\nFailed',         type: 'expect',   details: 'Invalid credentials / suspended account / server error — error shown on /login.' },
  { id: 'N09', col: 4, row: 3, name: 'Role\nDenied',         type: 'expect',   details: 'Agency or End-user role detected; access denied message shown.' },
  { id: 'N10', col: 0, row: 4, name: 'Dashboard\nActive',    type: 'action',   details: 'Admin uses the BO Dashboard; activity resets inactivity timer.' },
  { id: 'N11', col: 1, row: 4, name: 'Inactivity\nTimeout',  type: 'decision', details: 'Inactivity monitor fires after configured idle period.' },
  { id: 'N12', col: 2, row: 4, name: 'Session\nExpired',     type: 'expect',   details: 'Session invalidated; admin redirected to /login.' },
  { id: 'N13', col: 1, row: 5, name: 'Logout\nAction',       type: 'action',   details: 'Admin clicks the logout arrow icon in the sidebar.' },
  { id: 'N14', col: 2, row: 5, name: 'Logged\nOut',          type: 'expect',   details: 'Session destroyed; redirect to /login; protected URLs blocked.' },
  { id: 'N15', col: 0, row: 6, name: 'Forgot\nPassword',     type: 'action',   details: 'Admin clicks "Forgot password?" link on /login page.' },
  { id: 'N16', col: 1, row: 6, name: 'Reset\nInitiated',     type: 'expect',   details: 'Password reset flow triggered; email dispatched.' },
];

// ── DAG Edges ─────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N01', to: 'N02',                        },
  { from: 'N02', to: 'N03', label: 'has session'   },
  { from: 'N02', to: 'N04', label: 'no session'    },
  { from: 'N04', to: 'N05'                         },
  { from: 'N05', to: 'N06'                         },
  { from: 'N06', to: 'N07', label: 'admin + valid' },
  { from: 'N06', to: 'N08', label: 'bad creds'     },
  { from: 'N06', to: 'N09', label: 'wrong role'    },
  { from: 'N08', to: 'N04', label: 'retry'         },
  { from: 'N07', to: 'N10'                         },
  { from: 'N03', to: 'N10'                         },
  { from: 'N10', to: 'N11'                         },
  { from: 'N11', to: 'N12', label: 'idle timeout'  },
  { from: 'N11', to: 'N10', label: 'still active'  },
  { from: 'N10', to: 'N13'                         },
  { from: 'N13', to: 'N14'                         },
  { from: 'N04', to: 'N15'                         },
  { from: 'N15', to: 'N16'                         },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP5-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'No session → /login form shown',
    steps: [
      { action: 'Open BO URL without session cookie', data: '—', expect: '/login redirected; Login form visible with email, password fields' },
      { action: 'Fill valid admin credentials, click Login', data: 'Valid admin email & password (env vars)', expect: 'Button shows "Logging in…"; auth request sent' },
      { action: 'Observe result', data: '—', expect: 'Session created; redirect to /dashboard' },
    ],
    activePath: ['N01', 'N02', 'N04', 'N05', 'N06', 'N07', 'N10'],
    activeEdges: [['N01','N02'], ['N02','N04'], ['N04','N05'], ['N05','N06'], ['N06','N07'], ['N07','N10']],
  },
  {
    id: 'PP5-TC-002',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Valid session → Dashboard direct',
    steps: [
      { action: 'Open BO URL with valid session cookie already set', data: 'Admin session JWT in cookie', expect: '/login skipped; /dashboard loaded immediately' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N10'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N10']],
  },
  {
    id: 'PP5-TC-004',
    typeCls: 'dt',
    type: 'Negative',
    name: 'Agency account → access denied',
    steps: [
      { action: 'Submit login with Agency account credentials', data: 'Agency email & password', expect: 'Role check fails; access denied message; BO Dashboard unreachable' },
    ],
    activePath: ['N01', 'N02', 'N04', 'N05', 'N06', 'N09'],
    activeEdges: [['N01','N02'], ['N02','N04'], ['N04','N05'], ['N05','N06'], ['N06','N09']],
  },
  {
    id: 'PP5-TC-005',
    typeCls: 'dt',
    type: 'Negative',
    name: 'End-user account → access denied',
    steps: [
      { action: 'Submit login with End-user account credentials', data: 'End-user email & password', expect: 'Role check fails; access denied message; BO Dashboard unreachable' },
    ],
    activePath: ['N01', 'N02', 'N04', 'N05', 'N06', 'N09'],
    activeEdges: [['N01','N02'], ['N02','N04'], ['N04','N05'], ['N05','N06'], ['N06','N09']],
  },
  {
    id: 'PP5-TC-006',
    typeCls: 'st',
    type: 'Negative',
    name: 'Wrong password → error toast',
    steps: [
      { action: 'Submit login with correct email, wrong password', data: 'Valid admin email, incorrect password', expect: '"Invalid email or password" toast shown; form stays on /login' },
    ],
    activePath: ['N01', 'N02', 'N04', 'N05', 'N06', 'N08', 'N04'],
    activeEdges: [['N01','N02'], ['N02','N04'], ['N04','N05'], ['N05','N06'], ['N06','N08'], ['N08','N04']],
  },
  {
    id: 'PP5-TC-007',
    typeCls: 'st',
    type: 'Negative',
    name: 'Suspended account → login rejected',
    steps: [
      { action: 'Submit login with suspended admin account credentials', data: 'Suspended admin email & password (STG pre-configured)', expect: 'Auth fails; error shown; user not logged in; /login remains' },
    ],
    activePath: ['N01', 'N02', 'N04', 'N05', 'N06', 'N08'],
    activeEdges: [['N01','N02'], ['N02','N04'], ['N04','N05'], ['N05','N06'], ['N06','N08']],
  },
  {
    id: 'PP5-TC-008',
    typeCls: 'manual',
    type: 'Negative',
    name: 'Backend unreachable → error shown',
    steps: [
      { action: 'Submit login while backend is unreachable', data: 'Infra-level network block simulated', expect: 'Server error message shown on /login; user not authenticated' },
    ],
    activePath: ['N01', 'N02', 'N04', 'N05', 'N06', 'N08'],
    activeEdges: [['N01','N02'], ['N02','N04'], ['N04','N05'], ['N05','N06'], ['N06','N08']],
  },
  {
    id: 'PP5-TC-012',
    typeCls: 'st',
    type: 'Functional',
    name: 'Inactivity timeout → /login redirect',
    steps: [
      { action: 'Login, then leave session idle past timeout threshold', data: 'Admin session; configured idle TTL on STG', expect: 'Session invalidated; admin redirected to /login' },
    ],
    activePath: ['N10', 'N11', 'N12'],
    activeEdges: [['N10','N11'], ['N11','N12']],
  },
  {
    id: 'PP5-TC-013',
    typeCls: 'st',
    type: 'Functional',
    name: 'Active use → session persists',
    steps: [
      { action: 'Login, continue using Dashboard within timeout window', data: 'Admin session; repeated interactions', expect: 'No unexpected redirect; session remains valid throughout' },
    ],
    activePath: ['N10', 'N11', 'N10'],
    activeEdges: [['N10','N11'], ['N11','N10']],
  },
  {
    id: 'PP5-TC-014',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Logout → session destroyed',
    steps: [
      { action: 'Click logout arrow icon in sidebar', data: 'Authenticated admin session', expect: 'Session destroyed; redirect to /login' },
    ],
    activePath: ['N10', 'N13', 'N14'],
    activeEdges: [['N10','N13'], ['N13','N14']],
  },
  {
    id: 'PP5-TC-015',
    typeCls: 'st',
    type: 'Functional',
    name: '"Forgot password?" triggers reset',
    steps: [
      { action: 'Click "Forgot password?" link on /login', data: '—', expect: 'Forgot password link visible; click triggers password reset flow' },
      { action: 'Submit reset form', data: 'Valid admin email address', expect: 'Password reset email dispatched' },
    ],
    activePath: ['N04', 'N15', 'N16'],
    activeEdges: [['N04','N15'], ['N15','N16']],
  },
  {
    id: 'PP5-TC-016',
    typeCls: 'st',
    type: 'Functional',
    name: 'Button disabled during auth',
    steps: [
      { action: 'Fill credentials and click Login', data: 'Valid admin credentials', expect: 'Button text changes to "Logging in…" and is disabled during auth request' },
    ],
    activePath: ['N04', 'N05', 'N06'],
    activeEdges: [['N04','N05'], ['N05','N06']],
  },
  {
    id: 'PP5-TC-017',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Protected URL w/o session → /login',
    steps: [
      { action: 'Navigate directly to /dashboard/events without a session cookie', data: '—', expect: 'Redirect to /login; Login form displayed' },
    ],
    activePath: ['N01', 'N02', 'N04'],
    activeEdges: [['N01','N02'], ['N02','N04']],
  },
  {
    id: 'PP5-TC-018',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Valid credentials → Dashboard + nav',
    steps: [
      { action: 'Submit valid admin credentials on /login', data: 'Valid admin email & password', expect: 'Dashboard shown; full nav items visible (Events, Users, Organizers, Payments, etc.)' },
    ],
    activePath: ['N04', 'N05', 'N06', 'N07', 'N10'],
    activeEdges: [['N04','N05'], ['N05','N06'], ['N06','N07'], ['N07','N10']],
  },
  {
    id: 'PP5-TC-019',
    typeCls: 'st',
    type: 'Functional',
    name: 'Post-logout: protected URL → /login',
    steps: [
      { action: 'Logout, then navigate to a protected URL (/dashboard/events)', data: '—', expect: 'Redirect to /login; no auto-login; session not restored' },
    ],
    activePath: ['N13', 'N14'],
    activeEdges: [['N13','N14']],
  },
];

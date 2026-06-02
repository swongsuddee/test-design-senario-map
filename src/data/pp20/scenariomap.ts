import type { DagEdge, DagNode, Scenario } from '@/types';

// ── DAG Nodes ─────────────────────────────────────────────────────────────────
//
// col/row layout (0-based):
//
//  col:  0        1         2          3         4         5
//  row0  LOGIN → STORE → API_CALL → VALID? → API_OK
//                              ↓(401)→ REFRESH→ REFRESH_OK?→ NEW_TOKEN→ API_CALL (loop)
//                                                 ↓(expired)
//  row1                                         LOGOUT → LOGIN_PAGE
//  row2  NAV_GUARD → AUTH_CHK → PROTECTED
//                      ↓(unauth) → LOGIN_PAGE

export const SM_NODES: DagNode[] = [
  { id: 'N01', col: 0, row: 0, name: 'Login\nSuccess',     type: 'action',   details: 'User authenticates; Access Token and Refresh Token received.' },
  { id: 'N02', col: 1, row: 0, name: 'Store\nTokens',      type: 'action',   details: 'Access Token and Refresh Token stored in Secure Storage.' },
  { id: 'N03', col: 2, row: 0, name: 'API\nCall',          type: 'action',   details: 'App makes an API call using the Access Token.' },
  { id: 'N04', col: 3, row: 0, name: 'Token\nValid?',      type: 'decision', details: 'Does the API return success or 401 (expired token)?' },
  { id: 'N05', col: 4, row: 0, name: 'API\nSuccess',       type: 'expect',   details: 'API responds successfully — Access Token was valid.' },
  { id: 'N06', col: 3, row: 1, name: 'Refresh\nToken',     type: 'action',   details: 'App silently calls /refresh-token with Refresh Token.' },
  { id: 'N07', col: 4, row: 1, name: 'Refresh\nValid?',    type: 'decision', details: 'Did the refresh call succeed or fail (expired/invalid Refresh Token)?' },
  { id: 'N08', col: 5, row: 1, name: 'New Token\nStored',  type: 'action',   details: 'New Access Token (and optionally Refresh Token) stored silently.' },
  { id: 'N09', col: 5, row: 2, name: 'Force\nLogout',      type: 'action',   details: 'Refresh Token expired — all tokens cleared from Secure Storage.' },
  { id: 'N10', col: 6, row: 2, name: 'Login\nScreen',      type: 'expect',   details: 'User redirected to Login screen.' },
  { id: 'N11', col: 0, row: 2, name: 'Nav\nGuard',         type: 'action',   details: 'User attempts navigation to a protected screen.' },
  { id: 'N12', col: 1, row: 2, name: 'Auth\nState?',       type: 'decision', details: 'Navigation guard checks whether user is authenticated.' },
  { id: 'N13', col: 2, row: 2, name: 'Protected\nScreen',  type: 'expect',   details: 'Protected screen displayed to authenticated user.' },
];

// ── DAG Edges ─────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N01', to: 'N02', label: 'login OK' },
  { from: 'N02', to: 'N03', label: 'tokens ready' },
  { from: 'N03', to: 'N04' },
  { from: 'N04', to: 'N05', label: 'valid' },
  { from: 'N04', to: 'N06', label: '401' },
  { from: 'N06', to: 'N07' },
  { from: 'N07', to: 'N08', label: 'success' },
  { from: 'N08', to: 'N03', label: 'retry' },
  { from: 'N07', to: 'N09', label: 'expired' },
  { from: 'N09', to: 'N10', label: 'redirect' },
  { from: 'N11', to: 'N12' },
  { from: 'N12', to: 'N13', label: 'authed' },
  { from: 'N12', to: 'N10', label: 'unauthed' },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP20-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Access Token and Refresh Token are stored in Secure Storage after login',
    steps: [
      { action: 'Login with valid STG credentials', data: 'STG test account (email + password)', expect: 'Login succeeds; tokens returned' },
      { action: 'Inspect Secure Storage for tokens', data: 'idb (iOS) / adb + EncryptedSharedPreferences (Android)', expect: 'Both Access Token and Refresh Token present in Secure Storage; not in plain text' },
    ],
    activePath: ['N01', 'N02'],
    activeEdges: [['N01','N02']],
  },
  {
    id: 'PP20-TC-002',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'API call succeeds when Access Token is still valid — no refresh triggered',
    steps: [
      { action: 'Login and make an API call with valid Access Token', data: 'STG account; fresh Access Token', expect: 'API responds 200' },
      { action: 'Verify no refresh call was made', data: 'Network proxy logs', expect: 'No /refresh-token request observed' },
    ],
    activePath: ['N02', 'N03', 'N04', 'N05'],
    activeEdges: [['N02','N03'], ['N03','N04'], ['N04','N05']],
  },
  {
    id: 'PP20-TC-003',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'App silently refreshes token and retries on 401 without logging user out',
    steps: [
      { action: 'Inject expired Access Token (valid Refresh Token remains)', data: 'Charles Proxy / test backdoor', expect: 'Next API call returns 401' },
      { action: 'Observe automatic refresh', data: '—', expect: '/refresh-token called silently; new Access Token stored' },
      { action: 'Verify original request retried', data: '—', expect: 'Original API call retried and succeeds; user remains logged in' },
    ],
    activePath: ['N03', 'N04', 'N06', 'N07', 'N08', 'N03', 'N05'],
    activeEdges: [['N03','N04'], ['N04','N06'], ['N06','N07'], ['N07','N08'], ['N08','N03'], ['N03','N05']],
  },
  {
    id: 'PP20-TC-004',
    typeCls: 'smoke',
    type: 'Negative',
    name: 'App forces logout and redirects to Login when Refresh Token is expired',
    steps: [
      { action: 'Inject expired Access Token and expired/revoked Refresh Token', data: 'Backend admin API or proxy', expect: 'API call returns 401' },
      { action: 'Observe refresh attempt failure', data: '—', expect: 'Refresh call returns 401/403; tokens cleared from Secure Storage' },
      { action: 'Verify redirect', data: '—', expect: 'User is redirected to Login screen; no crash' },
    ],
    activePath: ['N03', 'N04', 'N06', 'N07', 'N09', 'N10'],
    activeEdges: [['N03','N04'], ['N04','N06'], ['N06','N07'], ['N07','N09'], ['N09','N10']],
  },
  {
    id: 'PP20-TC-005',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Authenticated user can navigate to protected screens without redirection',
    steps: [
      { action: 'Login and navigate to a protected screen', data: 'STG authenticated account; protected route', expect: 'Navigation guard evaluates auth state = authenticated' },
      { action: 'Observe screen', data: '—', expect: 'Protected screen displayed; no redirect to Login' },
    ],
    activePath: ['N11', 'N12', 'N13'],
    activeEdges: [['N11','N12'], ['N12','N13']],
  },
  {
    id: 'PP20-TC-006',
    typeCls: 'smoke',
    type: 'Negative',
    name: 'Unauthenticated user is redirected to Login when accessing protected screens',
    steps: [
      { action: 'Clear tokens / use unauthenticated state and attempt to navigate to protected screen', data: 'No tokens in Secure Storage', expect: 'Navigation guard evaluates auth state = unauthenticated' },
      { action: 'Observe redirect', data: '—', expect: 'User redirected to Login screen; protected screen not shown' },
    ],
    activePath: ['N11', 'N12', 'N10'],
    activeEdges: [['N11','N12'], ['N12','N10']],
  },
];

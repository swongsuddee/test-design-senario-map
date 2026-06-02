import type { DagEdge, DagNode, Scenario } from '@/types';

export const SS_NODES: DagNode[] = [
  { id: 'S33', col: 0, row: 1, name: 'App\nLaunch',       type: 'action',   details: 'User opens app. Token read from local storage.' },
  { id: 'S35', col: 1, row: 1, name: 'Token\nExists?',    type: 'decision', details: 'Is a JWT / refresh token present in keychain?' },
  { id: 'S36', col: 2, row: 0, name: 'Token\nValid?',     type: 'decision', details: 'Is the token valid and not expired?' },
  { id: 'S37', col: 3, row: 0, name: 'Silent\nRefresh',   type: 'action',   details: 'Near expiry: app silently refreshes using refresh token.' },
  { id: 'S38', col: 2, row: 2, name: 'Clear\nToken',      type: 'action',   details: 'Expired/invalid token removed from storage.' },
  { id: 'S39', col: 4, row: 0, name: 'Home\nPage',        type: 'expect',   details: 'Session valid. Skip Login; show Home directly.' },
  { id: 'S40', col: 3, row: 2, name: 'Login\nPage',       type: 'expect',   details: 'No / expired token. User must re-authenticate.' },
];

export const SS_EDGES: DagEdge[] = [
  { from: 'S33', to: 'S35', label: '' },
  { from: 'S35', to: 'S36', label: 'Exists' },
  { from: 'S35', to: 'S40', label: 'None' },
  { from: 'S36', to: 'S37', label: 'Near expiry' },
  { from: 'S36', to: 'S39', label: 'Valid' },
  { from: 'S36', to: 'S38', label: 'Expired' },
  { from: 'S37', to: 'S39', label: 'Refreshed' },
  { from: 'S38', to: 'S40', label: '' },
];

export const SS_SCENARIOS: Scenario[] = [
  {
    id: 'PP2-TC-031', typeCls: 'smoke', type: 'Functional',
    name: 'Valid token — reopen app skips Login and shows Home',
    steps: [
      { action: 'Re-open the app',     data: '—', expect: 'App reads local token' },
      { action: 'Observe navigation',  data: '—', expect: 'Login page skipped; Home page appears directly' },
    ],
    activePath:  ['S33','S35','S36','S39'],
    activeEdges: [['S33','S35'],['S35','S36'],['S36','S39']],
  },
  {
    id: 'PP2-TC-032', typeCls: 'high', type: 'Functional',
    name: 'Expired token — app redirects to Login',
    steps: [
      { action: 'Open app with expired tokens', data: '—', expect: 'Token validation fails; token cleared' },
      { action: 'Observe navigation',           data: '—', expect: 'Login page displayed' },
    ],
    activePath:  ['S33','S35','S36','S38','S40'],
    activeEdges: [['S33','S35'],['S35','S36'],['S36','S38'],['S38','S40']],
  },
  {
    id: 'PP2-TC-042', typeCls: 'smoke', type: 'Functional',
    name: 'No token (fresh install) — Login page shown ▲ New',
    steps: [
      { action: 'Launch app with no stored token', data: 'Fresh install', expect: 'App reads token storage; nothing found' },
      { action: 'Observe navigation',              data: '—',             expect: 'Login page displayed directly' },
    ],
    activePath:  ['S33','S35','S40'],
    activeEdges: [['S33','S35'],['S35','S40']],
  },
  {
    id: 'PP2-TC-043', typeCls: 'manual', type: 'Manual',
    name: 'Token near expiry — silent refresh runs; Home shown ▲ New',
    steps: [
      { action: 'Reopen app when JWT is within refresh window', data: '—', expect: 'Silent token refresh triggered' },
      { action: 'Observe navigation',                           data: '—', expect: 'Home page shown; no redirect to Login' },
    ],
    activePath:  ['S33','S35','S36','S37','S39'],
    activeEdges: [['S33','S35'],['S35','S36'],['S36','S37'],['S37','S39']],
  },
];

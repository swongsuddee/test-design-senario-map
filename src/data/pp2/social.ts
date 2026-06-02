import type { DagEdge, DagNode, Scenario } from '@/types';

export const SL_NODES: DagNode[] = [
  { id: 'SL1',  col: 0, row: 1, name: 'Login\nPage',      type: 'action',   details: 'Entry point. User taps social provider button.' },
  { id: 'SL2',  col: 1, row: 0, name: 'Google\nOAuth',    type: 'action',   details: 'Google account picker / consent sheet.' },
  { id: 'SL3',  col: 1, row: 1, name: 'LINE\nOAuth',      type: 'action',   details: 'LINE authentication webview.' },
  { id: 'SL4',  col: 1, row: 2, name: 'Apple\nOAuth',     type: 'action',   details: 'Apple Sign In system sheet.' },
  { id: 'SL5',  col: 2, row: 2, name: 'Hide\nEmail?',     type: 'decision', details: 'Apple first sign-in: share real or relay email.' },
  { id: 'SL6',  col: 3, row: 2, name: 'Real\nEmail',      type: 'action',   details: 'User chose to share real email address.' },
  { id: 'SL7',  col: 3, row: 3, name: 'Private\nRelay',   type: 'action',   details: 'Apple-generated private relay address used.' },
  { id: 'SL8',  col: 4, row: 1, name: 'Email\nCheck',     type: 'decision', details: 'Is email already in the system?' },
  { id: 'SL9',  col: 5, row: 0, name: 'Existing\nUser',   type: 'expect',   details: 'Same provider match. Profile found → Home.' },
  { id: 'SL10', col: 5, row: 2, name: 'New\nUser',        type: 'expect',   details: 'Email not in system → PDPA.' },
];

export const SL_EDGES: DagEdge[] = [
  { from: 'SL1', to: 'SL2',  label: 'Google' },
  { from: 'SL1', to: 'SL3',  label: 'LINE' },
  { from: 'SL1', to: 'SL4',  label: 'Apple' },
  { from: 'SL4', to: 'SL5',  label: 'New user' },
  { from: 'SL5', to: 'SL6',  label: 'Share' },
  { from: 'SL5', to: 'SL7',  label: 'Hide' },
  { from: 'SL2', to: 'SL8',  label: '' },
  { from: 'SL3', to: 'SL8',  label: '' },
  { from: 'SL4', to: 'SL8',  label: 'Returning' },
  { from: 'SL6', to: 'SL8',  label: '' },
  { from: 'SL7', to: 'SL8',  label: '' },
  { from: 'SL8', to: 'SL9',  label: 'Registered' },
  { from: 'SL8', to: 'SL10', label: 'New' },
];

export const SL_SCENARIOS: Scenario[] = [
  {
    id: 'PP2-TC-011', typeCls: 'manual', type: 'Manual',
    name: 'Google login — new user lands on PDPA',
    steps: [
      { action: 'Tap Google on Login page',           data: '—', expect: 'Google OAuth sheet or webview appears' },
      { action: 'Select / confirm Google account',    data: '—', expect: 'OAuth completes; email not in system' },
      { action: 'Observe navigation',                 data: '—', expect: 'PDPA Consent screen appears' },
    ],
    activePath:  ['SL1','SL2','SL8','SL10'],
    activeEdges: [['SL1','SL2'],['SL2','SL8'],['SL8','SL10']],
  },
  {
    id: 'PP2-TC-012', typeCls: 'manual', type: 'Manual',
    name: 'Google login — existing user goes to Home',
    steps: [
      { action: 'Tap Google; complete OAuth',         data: '—', expect: 'Email matched; same provider; profile found' },
      { action: 'Observe navigation',                 data: '—', expect: 'Home page displayed' },
    ],
    activePath:  ['SL1','SL2','SL8','SL9'],
    activeEdges: [['SL1','SL2'],['SL2','SL8'],['SL8','SL9']],
  },
  {
    id: 'PP2-TC-013', typeCls: 'manual', type: 'Manual',
    name: 'LINE login — new user lands on PDPA',
    steps: [
      { action: 'Tap LINE on Login page',             data: '—', expect: 'LINE OAuth webview appears' },
      { action: 'Complete LINE authentication',       data: '—', expect: 'Email not in system' },
      { action: 'Observe navigation',                 data: '—', expect: 'PDPA Consent screen appears' },
    ],
    activePath:  ['SL1','SL3','SL8','SL10'],
    activeEdges: [['SL1','SL3'],['SL3','SL8'],['SL8','SL10']],
  },
  {
    id: 'PP2-TC-014', typeCls: 'manual', type: 'Manual',
    name: 'LINE login — existing user goes to Home',
    steps: [
      { action: 'Tap LINE; complete OAuth',           data: '—', expect: 'Profile found via same provider' },
      { action: 'Observe navigation',                 data: '—', expect: 'Home page displayed' },
    ],
    activePath:  ['SL1','SL3','SL8','SL9'],
    activeEdges: [['SL1','SL3'],['SL3','SL8'],['SL8','SL9']],
  },
  {
    id: 'PP2-TC-015', typeCls: 'manual', type: 'Manual',
    name: 'Apple login — new user; real email; lands on PDPA (iOS only)',
    steps: [
      { action: 'Tap Apple ID on Login page',         data: '—', expect: 'Apple Sign In sheet appears' },
      { action: 'Authenticate; choose Share My Email',data: '—', expect: 'OAuth completes with real email' },
      { action: 'Observe navigation',                 data: '—', expect: 'PDPA Consent screen appears' },
    ],
    activePath:  ['SL1','SL4','SL5','SL6','SL8','SL10'],
    activeEdges: [['SL1','SL4'],['SL4','SL5'],['SL5','SL6'],['SL6','SL8'],['SL8','SL10']],
  },
  {
    id: 'PP2-TC-016', typeCls: 'manual', type: 'Manual',
    name: 'Apple login — new user; Hide My Email; PDPA shown (iOS only)',
    steps: [
      { action: 'Tap Apple ID; auth; choose Hide My Email', data: '—', expect: 'Apple-generated private relay email used' },
      { action: 'Observe navigation',                       data: '—', expect: 'PDPA Consent screen appears' },
      { action: 'Verify stored email via API',              data: '—', expect: 'Private relay address stored (not real email)' },
    ],
    activePath:  ['SL1','SL4','SL5','SL7','SL8','SL10'],
    activeEdges: [['SL1','SL4'],['SL4','SL5'],['SL5','SL7'],['SL7','SL8'],['SL8','SL10']],
  },
  {
    id: 'PP2-TC-017', typeCls: 'manual', type: 'Manual',
    name: 'Apple login — existing user goes to Home (iOS only)',
    steps: [
      { action: 'Tap Apple ID; complete auth',        data: '—', expect: 'Profile found' },
      { action: 'Observe navigation',                 data: '—', expect: 'Home page displayed; no onboarding' },
    ],
    activePath:  ['SL1','SL4','SL8','SL9'],
    activeEdges: [['SL1','SL4'],['SL4','SL8'],['SL8','SL9']],
  },
  {
    id: 'PP2-TC-035', typeCls: 'manual', type: 'Manual',
    name: 'Subsequent Apple login skips email preference sheet (iOS only)',
    steps: [
      { action: 'Sign out; attempt Apple login again', data: '—', expect: 'Apple sign-in sheet — no email preference prompt' },
      { action: 'Auth completes',                      data: '—', expect: 'Returning user; navigates per profile state' },
    ],
    activePath:  ['SL1','SL4','SL8','SL9'],
    activeEdges: [['SL1','SL4'],['SL4','SL8'],['SL8','SL9']],
  },
];

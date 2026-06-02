import type { DagEdge, DagNode, Scenario } from '@/types';

export const IL_NODES: DagNode[] = [
  { id: 'IL1', col: 0, row: 1, name: 'Social\nOAuth',     type: 'action',   details: 'Any social provider completes OAuth.' },
  { id: 'S18', col: 1, row: 1, name: 'Email\nCheck',      type: 'decision', details: 'Is email registered? Same or different provider?' },
  { id: 'S21', col: 2, row: 0, name: 'Profile\nCheck',    type: 'expect',   details: 'Same provider or new email — proceed normally.' },
  { id: 'S19', col: 2, row: 2, name: 'Linking\nDialog',   type: 'action',   details: 'Email conflict: registered via different provider.' },
  { id: 'S20', col: 3, row: 1, name: 'Accounts\nMerged',  type: 'expect',   details: 'Confirmed: both providers linked to one account.' },
  { id: 'S11', col: 3, row: 3, name: 'Login\nPage',       type: 'action',   details: 'Cancelled linking — return to Login.' },
];

export const IL_EDGES: DagEdge[] = [
  { from: 'IL1', to: 'S18', label: '' },
  { from: 'S18', to: 'S21', label: 'Match/New' },
  { from: 'S18', to: 'S19', label: 'Conflict' },
  { from: 'S19', to: 'S20', label: 'Confirm' },
  { from: 'S19', to: 'S11', label: 'Cancel' },
];

export const IL_SCENARIOS: Scenario[] = [
  {
    id: 'PP2-TC-018', typeCls: 'manual', type: 'Manual',
    name: 'Duplicate email (diff provider) triggers linking dialog',
    steps: [
      { action: 'Tap LINE; auth with same email as Google account', data: 'test@gmail.com', expect: 'Email conflict detected' },
      { action: 'Observe UI',                                       data: '—',              expect: 'Identity Linking dialog — both providers shown' },
    ],
    activePath:  ['IL1','S18','S19'],
    activeEdges: [['IL1','S18'],['S18','S19']],
  },
  {
    id: 'PP2-TC-019', typeCls: 'manual', type: 'Manual',
    name: 'Confirm linking — accounts merged; navigate to Home',
    steps: [
      { action: 'Tap Confirm / Link Account',            data: '—', expect: 'Accounts merged' },
      { action: 'Observe navigation',                    data: '—', expect: 'Profile check proceeds; existing user → Home' },
      { action: 'Verify either provider can log in',     data: '—', expect: 'Google and LINE both authenticate same account' },
    ],
    activePath:  ['IL1','S18','S19','S20'],
    activeEdges: [['IL1','S18'],['S18','S19'],['S19','S20']],
  },
  {
    id: 'PP2-TC-020', typeCls: 'manual', type: 'Manual',
    name: 'Cancel linking — returns to Login page',
    steps: [
      { action: 'Tap Cancel on Identity Linking dialog', data: '—', expect: 'Dialog dismissed' },
      { action: 'Observe navigation',                    data: '—', expect: 'Login page displayed; no accounts merged' },
    ],
    activePath:  ['IL1','S18','S19','S11'],
    activeEdges: [['IL1','S18'],['S18','S19'],['S19','S11']],
  },
  {
    id: 'PP2-TC-036', typeCls: 'manual', type: 'Manual',
    name: 'Social login phone conflict triggers linking dialog',
    steps: [
      { action: 'Login via social with phone matching phone-auth account', data: '—', expect: 'System detects phone conflict' },
      { action: 'Observe UI',                                              data: '—', expect: 'Identity Linking dialog appears' },
    ],
    activePath:  ['IL1','S18','S19'],
    activeEdges: [['IL1','S18'],['S18','S19']],
  },
  {
    id: 'PP2-TC-039', typeCls: 'manual', type: 'Manual',
    name: 'Same email — same provider — no linking dialog ▲ New',
    steps: [
      { action: 'Tap Google; auth with already-registered Google account', data: 'registered@gmail.com', expect: 'Email found; provider matches' },
      { action: 'Observe UI',                                              data: '—',                    expect: 'No Identity Linking dialog appears' },
      { action: 'Observe navigation',                                      data: '—',                    expect: 'Profile check proceeds; existing user → Home' },
    ],
    activePath:  ['IL1','S18','S21'],
    activeEdges: [['IL1','S18'],['S18','S21']],
  },
];

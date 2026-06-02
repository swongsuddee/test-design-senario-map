import type { DagEdge, DagNode, Scenario } from '@/types';

export const EC_NODES: DagNode[] = [
  { id: 'EC1', col: 0, row: 0, name: 'Initiate\nLogin',   type: 'action', details: 'User starts any login method on throttled network.' },
  { id: 'EC2', col: 1, row: 0, name: 'Loading\nSpinner',  type: 'expect', details: 'Shimmer / spinner appears immediately during auth.' },
  { id: 'EC3', col: 2, row: 0, name: 'Auth\nComplete',    type: 'expect', details: 'Auth finishes; spinner disappears; navigates correctly.' },
  { id: 'EC4', col: 0, row: 1, name: 'App\nRestart',      type: 'action', details: 'App killed and reopened within OTP rate-limit window.' },
  { id: 'EC5', col: 1, row: 1, name: 'OTP\nScreen',       type: 'action', details: 'User attempts another OTP request after restart.' },
  { id: 'EC6', col: 2, row: 1, name: 'Rate\nLimited',     type: 'expect', details: 'Server-side rate limit still enforced after restart.' },
];

export const EC_EDGES: DagEdge[] = [
  { from: 'EC1', to: 'EC2', label: 'Slow net' },
  { from: 'EC2', to: 'EC3', label: 'Auth done' },
  { from: 'EC4', to: 'EC5', label: 'Reopen' },
  { from: 'EC5', to: 'EC6', label: '4th OTP' },
];

export const EC_SCENARIOS: Scenario[] = [
  {
    id: 'PP2-TC-033', typeCls: 'manual', type: 'Manual',
    name: 'Spinner shown during auth on slow network',
    steps: [
      { action: 'Initiate login on slow network', data: 'Throttled (Charles Proxy)', expect: 'Shimmer or spinner appears immediately' },
      { action: 'Auth completes',                 data: '—',                          expect: 'Spinner disappears; navigates correctly' },
    ],
    activePath:  ['EC1','EC2','EC3'],
    activeEdges: [['EC1','EC2'],['EC2','EC3']],
  },
  {
    id: 'PP2-TC-034', typeCls: 'manual', type: 'Manual',
    name: 'OTP rate limit persists after app restart',
    steps: [
      { action: 'Reopen app within 5-min window; attempt OTP for same phone', data: '—', expect: 'Rate limit still enforced (server-side check)' },
    ],
    activePath:  ['EC4','EC5','EC6'],
    activeEdges: [['EC4','EC5'],['EC5','EC6']],
  },
];

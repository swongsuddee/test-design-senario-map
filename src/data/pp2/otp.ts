import type { DagEdge, DagNode, Scenario } from '@/types';

export const OTP_NODES: DagNode[] = [
  { id: 'S5',  col: 0, row: 0, name: 'OTP\nScreen',    type: 'action',   details: '60s countdown. Awaiting 6-digit entry.' },
  { id: 'S8',  col: 0, row: 1, name: 'Resend\nAvail.', type: 'action',   details: 'Timer expired. Tap to resend OTP.' },
  { id: 'S9',  col: 0, row: 2, name: 'Rate\nLimited',  type: 'expect',   details: '4th request blocked server-side.' },
  { id: 'S6',  col: 1, row: 0, name: 'OTP\nCorrect?',  type: 'decision', details: '6-digit auto-submit on entry.' },
  { id: 'S7',  col: 1, row: 1, name: 'OTP\nError',     type: 'expect',   details: 'Wrong OTP. Fields cleared.' },
  { id: 'S10', col: 2, row: 0, name: 'Profile\nCheck', type: 'expect',   details: 'Auth success. New or existing?' },
];

export const OTP_EDGES: DagEdge[] = [
  { from: 'S5', to: 'S6',  label: 'Enter OTP' },
  { from: 'S5', to: 'S8',  label: '60s' },
  { from: 'S8', to: 'S5',  label: 'Resend' },
  { from: 'S8', to: 'S9',  label: '>3×' },
  { from: 'S6', to: 'S7',  label: 'Wrong' },
  { from: 'S7', to: 'S5',  label: 'Retry' },
  { from: 'S6', to: 'S10', label: 'Correct' },
];

export const OTP_SCENARIOS: Scenario[] = [
  {
    id: 'PP2-TC-006', typeCls: 'high', type: 'Functional',
    name: 'OTP countdown timer visible; Resend disabled initially',
    steps: [
      { action: 'Observe OTP screen after sending',  data: '—', expect: 'Countdown timer visible starting at 60s' },
      { action: 'Verify Resend button state',        data: '—', expect: 'Resend button is disabled' },
      { action: 'Wait 60 seconds',                   data: '—', expect: 'Timer reaches 0' },
      { action: 'Observe Resend button',             data: '—', expect: 'Resend button becomes enabled' },
    ],
    activePath:  ['S5', 'S8'],
    activeEdges: [['S5','S8']],
  },
  {
    id: 'PP2-TC-007', typeCls: 'high', type: 'Functional',
    name: 'Resend OTP within rate limit — countdown resets',
    steps: [
      { action: 'Wait 60s for countdown to expire', data: '—', expect: 'Resend button enabled' },
      { action: 'Tap Resend (1st resend)',           data: '—', expect: 'New OTP sent; countdown resets to 60s' },
      { action: 'Wait 60s; tap Resend again',        data: '—', expect: 'New OTP sent; rate limit not yet reached' },
    ],
    activePath:  ['S5', 'S8'],
    activeEdges: [['S5','S8'],['S8','S5']],
  },
  {
    id: 'PP2-TC-008', typeCls: 'manual', type: 'Negative',
    name: 'OTP rate limit exceeded — 4th request blocked',
    steps: [
      { action: 'Attempt 4th Resend within 5-min window', data: '—', expect: 'Request blocked; rate-limit message shown' },
    ],
    activePath:  ['S8', 'S9'],
    activeEdges: [['S8','S9']],
  },
  {
    id: 'PP2-TC-009', typeCls: 'high', type: 'Negative',
    name: 'Wrong OTP shows error; correct OTP proceeds',
    steps: [
      { action: 'Enter wrong 6-digit OTP',    data: '000000',         expect: 'Error message shown; remains on OTP screen' },
      { action: 'Enter correct 6-digit OTP',  data: 'TEST_OTP (STG)', expect: 'OTP accepted; navigate to next step' },
    ],
    activePath:  ['S5', 'S6', 'S7', 'S10'],
    activeEdges: [['S5','S6'],['S6','S7'],['S7','S5'],['S5','S6'],['S6','S10']],
  },
  {
    id: 'PP2-TC-010', typeCls: 'high', type: 'Functional',
    name: 'OTP input cleared after wrong entry',
    steps: [
      { action: 'Enter wrong OTP',           data: '000000', expect: 'Error shown' },
      { action: 'Observe OTP input fields',  data: '—',      expect: 'Fields cleared and ready for re-entry' },
    ],
    activePath:  ['S5', 'S6', 'S7'],
    activeEdges: [['S5','S6'],['S6','S7']],
  },
  {
    id: 'PP2-TC-038', typeCls: 'bva', type: 'Boundary',
    name: 'OTP 5 digits — does not auto-submit (BVA lower boundary) ▲ New',
    steps: [
      { action: 'Enter exactly 5 digits in OTP field', data: '12345',  expect: 'No auto-submit; no navigation' },
      { action: 'Enter 6th digit',                     data: '123456', expect: 'Auto-submit triggered' },
    ],
    activePath:  ['S5', 'S6'],
    activeEdges: [['S5','S6']],
  },
];

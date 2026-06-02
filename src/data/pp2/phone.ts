import type { DagEdge, DagNode, Scenario } from '@/types';

export const PL_NODES: DagNode[] = [
  { id: 'S1',  col: 0, row: 0, name: 'Login\nPage',       type: 'action',   details: 'Entry point. User sees login options.' },
  { id: 'S2',  col: 1, row: 0, name: 'Phone\nInput',      type: 'action',   details: 'Enter phone number. Auto-strips dashes.' },
  { id: 'S3',  col: 2, row: 0, name: 'Format\nValid?',    type: 'decision', details: 'Must be exactly 10 digits.' },
  { id: 'S4',  col: 2, row: 1, name: 'Error +\nOTP Off',  type: 'expect',   details: 'Inline error. OTP button disabled.' },
  { id: 'S5',  col: 3, row: 0, name: 'OTP\nScreen',       type: 'action',   details: '60s countdown. SMS sent.' },
  { id: 'S8',  col: 3, row: 1, name: 'Resend\nAvail.',    type: 'action',   details: 'Timer expired. Up to 3 resends.' },
  { id: 'S9',  col: 3, row: 2, name: 'Rate\nLimited',     type: 'expect',   details: '4th resend blocked server-side.' },
  { id: 'S6',  col: 4, row: 0, name: 'OTP\nCorrect?',     type: 'decision', details: '6-digit auto-submit on entry.' },
  { id: 'S7',  col: 4, row: 1, name: 'OTP\nError',        type: 'expect',   details: 'Wrong OTP. Fields cleared.' },
  { id: 'S10', col: 5, row: 0, name: 'Profile\nCheck',    type: 'expect',   details: 'Auth success. New or existing?' },
];

export const PL_EDGES: DagEdge[] = [
  { from: 'S1', to: 'S2',  label: 'Tap Phone' },
  { from: 'S2', to: 'S3',  label: '' },
  { from: 'S3', to: 'S4',  label: 'Invalid' },
  { from: 'S3', to: 'S5',  label: 'Valid' },
  { from: 'S5', to: 'S6',  label: 'Enter OTP' },
  { from: 'S5', to: 'S8',  label: '60s' },
  { from: 'S8', to: 'S9',  label: '>3×' },
  { from: 'S6', to: 'S7',  label: 'Wrong' },
  { from: 'S6', to: 'S10', label: 'Correct' },
];

export const PL_SCENARIOS: Scenario[] = [
  {
    id: 'PP2-TC-001', typeCls: 'smoke', type: 'Functional',
    name: 'Phone login happy path — new user lands on PDPA',
    steps: [
      { action: 'Tap Phone Number login option',     data: '—',              expect: 'Phone Input screen appears' },
      { action: 'Enter valid 10-digit number',       data: '0812345678',     expect: 'Input accepted; OTP button enabled' },
      { action: 'Tap Send OTP button',               data: '—',              expect: 'OTP screen; 60s countdown starts' },
      { action: 'Enter correct 6-digit OTP',         data: 'TEST_OTP (STG)', expect: 'OTP accepted' },
      { action: 'Observe navigation',                data: '—',              expect: 'PDPA Consent screen appears' },
    ],
    activePath:  ['S1', 'S2', 'S3', 'S5', 'S6', 'S10'],
    activeEdges: [['S1','S2'],['S2','S3'],['S3','S5'],['S5','S6'],['S6','S10']],
  },
  {
    id: 'PP2-TC-002', typeCls: 'high', type: 'Negative',
    name: 'Phone too short (9 digits) — error shown; OTP button disabled',
    steps: [
      { action: 'Enter 9-digit number',              data: '081234567',      expect: 'Inline error; OTP button disabled' },
      { action: 'Add one more digit (→10)',          data: '0812345678',     expect: 'Error clears; OTP button enabled' },
    ],
    activePath:  ['S1', 'S2', 'S3', 'S4'],
    activeEdges: [['S1','S2'],['S2','S3'],['S3','S4']],
  },
  {
    id: 'PP2-TC-005', typeCls: 'smoke', type: 'Functional',
    name: 'Phone login happy path — existing user goes to Home',
    steps: [
      { action: 'Enter registered phone number',     data: 'TEST_PHONE_EXISTING', expect: 'Input accepted' },
      { action: 'Enter correct OTP',                 data: 'TEST_OTP (STG)',       expect: 'OTP verified' },
      { action: 'Observe navigation',                data: '—',                    expect: 'Home page displayed; no PDPA' },
    ],
    activePath:  ['S1', 'S2', 'S3', 'S5', 'S6', 'S10'],
    activeEdges: [['S1','S2'],['S2','S3'],['S3','S5'],['S5','S6'],['S6','S10']],
  },
  {
    id: 'PP2-TC-037', typeCls: 'bva', type: 'Boundary',
    name: 'Phone 11 digits — error shown (BVA upper boundary) ▲ New',
    steps: [
      { action: 'Enter 11-digit number',             data: '08123456789',    expect: 'Inline error; OTP button disabled' },
      { action: 'Remove last digit (→10)',           data: '0812345678',     expect: 'Error clears; OTP button enabled' },
    ],
    activePath:  ['S1', 'S2', 'S3', 'S4'],
    activeEdges: [['S1','S2'],['S2','S3'],['S3','S4']],
  },
];

import type { DagEdge, DagNode, Scenario } from '@/types';

// ── DAG Nodes ─────────────────────────────────────────────────────────────────
//
// col/row layout (0-based):
//
//  col:  0          1           2          3          4
//  row0  START ──► TIMER ──► COUNTING ──► DISABLED
//                                └──► ENABLED ──► PRESS ──► RATE ──► LOADING ──► API
//                                                                  └──► BLOCKED
//                                                                              ├──► APIERR
//                                                                              └──► INVAL ──► SUCCESS
//                                     WAIT ──► ENTER ──► EXPCHECK ──► EXPIRY
//                                                                  └──► VERIFIED

export const SM_NODES: DagNode[] = [
  // Row 0: page load → timer → counting decision
  { id: 'N01', col: 0, row: 0, name: 'Verification\nPage', type: 'action',   details: 'Organizer lands on email verification page; timer initialises.' },
  { id: 'N02', col: 1, row: 0, name: 'Start 60s\nTimer',   type: 'action',   details: 'Frontend starts 60-second countdown.' },
  { id: 'N03', col: 2, row: 0, name: 'Timer\nRunning?',    type: 'decision', details: 'Is the countdown still above 0?' },
  { id: 'N04', col: 3, row: 0, name: 'Button\nDisabled',   type: 'expect',   details: 'Resend button is disabled while timer counts down.' },
  // Row 1: timer reaches 0 → button enabled → press decision
  { id: 'N05', col: 3, row: 1, name: 'Button\nEnabled',    type: 'expect',   details: 'Timer = 0: Resend button becomes enabled, timer UI hides.' },
  { id: 'N06', col: 4, row: 1, name: 'Rate\nLimit OK?',    type: 'decision', details: 'Has the user exceeded 3-5 resends per hour?' },
  // Row 2: rate limit paths
  { id: 'N07', col: 5, row: 0, name: 'Rate\nBlocked',      type: 'expect',   details: 'Rate limit exceeded — button permanently disabled, error message shown.' },
  { id: 'N08', col: 5, row: 1, name: 'API\nCall',          type: 'action',   details: 'Resend API called; button in loading state.' },
  { id: 'N09', col: 6, row: 0, name: 'API\nError',         type: 'expect',   details: 'Network/server error — error toast shown, timer NOT reset.' },
  { id: 'N10', col: 6, row: 1, name: 'Token\nInvalidated', type: 'action',   details: 'Old OTP/link invalidated; new token generated.' },
  { id: 'N11', col: 7, row: 1, name: 'New Email\nSent',    type: 'action',   details: 'New verification email dispatched to original address.' },
  { id: 'N12', col: 8, row: 1, name: 'Success\nToast',     type: 'expect',   details: 'Success toast shown; timer resets to 60s.' },
  // Row 3: OTP submission path
  { id: 'N13', col: 2, row: 2, name: 'Enter\nOTP',         type: 'action',   details: 'User enters OTP/code from email.' },
  { id: 'N14', col: 3, row: 2, name: 'Token\nExpired?',    type: 'decision', details: 'Was the OTP submitted after 15 minutes?' },
  { id: 'N15', col: 4, row: 2, name: 'Expiry\nError',      type: 'expect',   details: 'Token expired — user prompted to resend.' },
  { id: 'N16', col: 5, row: 2, name: 'OTP\nAccepted',      type: 'expect',   details: 'OTP valid — verification succeeds.' },
];

// ── DAG Edges ─────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N01', to: 'N02', label: 'Page load' },
  { from: 'N02', to: 'N03' },
  { from: 'N03', to: 'N04', label: 'counting' },
  { from: 'N03', to: 'N05', label: 'reaches 0' },
  { from: 'N04', to: 'N03' },
  { from: 'N05', to: 'N06', label: 'user presses' },
  { from: 'N06', to: 'N07', label: 'exceeded' },
  { from: 'N06', to: 'N08', label: 'OK' },
  { from: 'N08', to: 'N09', label: 'error' },
  { from: 'N08', to: 'N10', label: 'success' },
  { from: 'N10', to: 'N11' },
  { from: 'N11', to: 'N12' },
  { from: 'N12', to: 'N02', label: 'reset timer' },
  { from: 'N05', to: 'N13', label: 'wait for email' },
  { from: 'N13', to: 'N14' },
  { from: 'N14', to: 'N15', label: '>15 min' },
  { from: 'N14', to: 'N16', label: 'valid' },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP228-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Countdown timer starts at 60s and Resend button is disabled on page load',
    steps: [
      { action: 'Navigate to email verification page', data: 'STG organizer account (unverified)', expect: 'Page loads; 60s countdown starts immediately' },
      { action: 'Observe Resend button state', data: '—', expect: 'Resend button is disabled; timer shows ~60 seconds' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N04'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N04']],
  },
  {
    id: 'PP228-TC-002',
    typeCls: 'st',
    type: 'Functional',
    name: 'Resend button remains disabled throughout the entire 60-second countdown window',
    steps: [
      { action: 'Navigate to email verification page', data: 'STG organizer account (unverified)', expect: 'Countdown starts from 60' },
      { action: 'Poll button state at 45s, 30s, 15s, 1s remaining', data: 'Playwright clock / waitForFunction', expect: 'Button is disabled at every sampled point' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N04'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N04'], ['N04','N03']],
  },
  {
    id: 'PP228-TC-003',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Resend button enables and timer disappears when countdown reaches 0',
    steps: [
      { action: 'Navigate to email verification page', data: 'STG organizer account (unverified)', expect: 'Countdown starts from 60' },
      { action: 'Wait for timer to reach 0 (clock mock)', data: 'Playwright clock fast-forward', expect: 'Resend button becomes enabled; countdown label disappears' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N05'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N05']],
  },
  {
    id: 'PP228-TC-004',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Pressing Resend shows loading state, sends new email, shows success toast, and resets 60s timer',
    steps: [
      { action: 'Navigate to verification page; wait for button to enable', data: 'STG organizer account', expect: 'Resend button is enabled' },
      { action: 'Click Resend button', data: '—', expect: 'Button enters loading state; disabled' },
      { action: 'API call resolves success', data: 'Intercepted or real STG call', expect: 'Old token invalidated; new email sent; success toast visible' },
      { action: 'Observe timer reset', data: '—', expect: 'Countdown resets to 60s; button disabled again' },
    ],
    activePath: ['N05', 'N06', 'N08', 'N10', 'N11', 'N12', 'N02'],
    activeEdges: [['N05','N06'], ['N06','N08'], ['N08','N10'], ['N10','N11'], ['N11','N12'], ['N12','N02']],
  },
  {
    id: 'PP228-TC-005',
    typeCls: 'st',
    type: 'Security',
    name: 'Old verification OTP/link is rejected after Resend is triggered',
    steps: [
      { action: 'Capture OTP from first email', data: 'Mailosaur inbox API', expect: 'OTP-1 retrieved' },
      { action: 'Click Resend button (new email sent)', data: 'STG organizer account', expect: 'Success toast; new OTP-2 issued' },
      { action: 'Submit OTP-1 in verification form', data: 'Old OTP from step 1', expect: 'Error shown — OTP/link is invalid or expired' },
    ],
    activePath: ['N05', 'N06', 'N08', 'N10', 'N11', 'N12'],
    activeEdges: [['N05','N06'], ['N06','N08'], ['N08','N10'], ['N10','N11'], ['N11','N12']],
  },
  {
    id: 'PP228-TC-006',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Multiple resends within the allowed limit (up to 3-5/hour) all succeed',
    steps: [
      { action: 'Click Resend repeatedly up to the allowed limit', data: 'Rate-limit threshold = 3-5/hr (STG config)', expect: 'Each resend succeeds; success toast shown each time' },
    ],
    activePath: ['N05', 'N06', 'N08', 'N10', 'N11', 'N12'],
    activeEdges: [['N05','N06'], ['N06','N08'], ['N08','N10'], ['N10','N11'], ['N11','N12']],
  },
  {
    id: 'PP228-TC-007',
    typeCls: 'bva',
    type: 'Security',
    name: 'Exceeding the resend limit (> 5 per hour) blocks the button with an error message',
    steps: [
      { action: 'Pre-seed account to have hit the rate limit (5 resends in current hour)', data: 'STG pre-seeded account or API setup', expect: 'Account is at rate limit boundary' },
      { action: 'Click Resend once more (6th attempt)', data: '—', expect: 'Button permanently disabled; error message about rate limit / try again in 30 min' },
    ],
    activePath: ['N05', 'N06', 'N07'],
    activeEdges: [['N05','N06'], ['N06','N07']],
  },
  {
    id: 'PP228-TC-008',
    typeCls: 'manual',
    type: 'Functional',
    name: 'Network/server error during Resend shows error toast without resetting the countdown',
    steps: [
      { action: 'Wait for Resend button to enable', data: 'STG organizer account', expect: 'Button enabled' },
      { action: 'Intercept Resend API and return HTTP 500', data: 'Playwright route intercept / WireMock', expect: 'Button enters loading then returns to error state' },
      { action: 'Observe toast and timer', data: '—', expect: 'Error toast shown; timer countdown is NOT reset' },
    ],
    activePath: ['N05', 'N06', 'N08', 'N09'],
    activeEdges: [['N05','N06'], ['N06','N08'], ['N08','N09']],
  },
  {
    id: 'PP228-TC-009',
    typeCls: 'bva',
    type: 'Functional',
    name: 'Submitting a verification OTP after 15 minutes shows an expiry error',
    steps: [
      { action: 'Obtain a valid OTP from email', data: 'Mailosaur inbox API', expect: 'OTP retrieved' },
      { action: 'Wait > 15 minutes (or advance DB timestamp)', data: 'Time manipulation on STG DB', expect: 'Token is now expired' },
      { action: 'Submit expired OTP in verification form', data: 'OTP from step 1', expect: 'Expiry error shown; user prompted to resend' },
    ],
    activePath: ['N01', 'N05', 'N13', 'N14', 'N15'],
    activeEdges: [['N01','N05'], ['N05','N13'], ['N13','N14'], ['N14','N15']],
  },
];

import type { DagEdge, DagNode, Scenario } from '@/types';

// ── DAG Nodes ─────────────────────────────────────────────────────────────────
// col 0: entry / trigger states
// col 1: validation / check nodes
// col 2: branch outcomes / intermediate states
// col 3: success / error terminals
export const SM_NODES: DagNode[] = [
  // col 0 — entry
  { id: 'N01', col: 0, row: 0,  name: 'Forgot\nPassword', type: 'action',   details: 'Organizer opens the Forgot Password page and enters email.' },
  // col 1 — format validation
  { id: 'N02', col: 1, row: 0,  name: 'Email\nFormat?',   type: 'decision', details: 'Is the submitted email address format valid?' },
  // col 2 — format outcomes
  { id: 'N03', col: 2, row: 1,  name: 'Format\nError',    type: 'expect',   details: 'Format validation fails — error shown, button disabled.' },
  // col 1b — rate limit check
  { id: 'N04', col: 1, row: 2,  name: 'Rate\nLimit?',     type: 'decision', details: 'Has the user requested more than once within 60 seconds?' },
  { id: 'N05', col: 2, row: 2,  name: 'Button\nDisabled', type: 'expect',   details: 'Rate limit exceeded — button disabled, cooldown timer shown.' },
  // col 2 — generic response
  { id: 'N06', col: 2, row: 0,  name: 'Generic\nResponse', type: 'action',  details: 'Generic message shown regardless of email existence.' },
  // col 1c — token validity
  { id: 'N07', col: 1, row: 3,  name: 'Token\nValid?',    type: 'decision', details: 'Is the reset token unexpired and unused?' },
  { id: 'N08', col: 2, row: 3,  name: 'Token\nExpired',   type: 'expect',   details: 'Token has expired — error page shown.' },
  { id: 'N09', col: 2, row: 4,  name: 'Token\nUsed',      type: 'expect',   details: 'Token already used once — error page shown.' },
  { id: 'N10', col: 2, row: 5,  name: 'Old\nInvalidated', type: 'action',   details: 'New link requested — previous token invalidated.' },
  // col 2 — reset form
  { id: 'N11', col: 0, row: 6,  name: 'Reset\nForm',      type: 'action',   details: 'Reset Password form shown with new and confirm fields.' },
  { id: 'N12', col: 1, row: 6,  name: 'Strength\nOK?',    type: 'decision', details: 'Does the new password meet strength requirements?' },
  { id: 'N13', col: 2, row: 7,  name: 'Strength\nError',  type: 'expect',   details: 'Inline error — password too weak.' },
  { id: 'N14', col: 1, row: 8,  name: 'Passwords\nMatch?', type: 'decision', details: 'Do new password and confirm password match?' },
  { id: 'N15', col: 2, row: 8,  name: 'Mismatch\nError',  type: 'expect',   details: 'Confirm disabled — passwords do not match.' },
  { id: 'N16', col: 1, row: 9,  name: 'Same as\nOld?',    type: 'decision', details: 'Is the new password identical to the old one?' },
  { id: 'N17', col: 2, row: 9,  name: 'Reuse\nError',     type: 'expect',   details: 'Error shown — password must be different from previous.' },
  { id: 'N18', col: 1, row: 5,  name: 'Show/Hide\nToggle', type: 'action',  details: 'Eye icon toggles password field between visible and hidden.' },
  // col 3 — post-reset
  { id: 'N19', col: 2, row: 6,  name: 'Confirm\nEnabled', type: 'action',   details: 'All validations passed — Confirm button enabled.' },
  { id: 'N20', col: 3, row: 7,  name: 'Force\nLogout',    type: 'action',   details: 'All active sessions are force-logged out.' },
  { id: 'N21', col: 3, row: 8,  name: 'Email\nSent',      type: 'action',   details: 'Confirmation email dispatched to organizer.' },
  { id: 'N22', col: 3, row: 9,  name: 'Login +\nToast',   type: 'expect',   details: 'Redirected to Login page with success toast.' },
];

// ── DAG Edges ─────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N01', to: 'N02', label: 'Submit email' },
  { from: 'N02', to: 'N03', label: 'Invalid' },
  { from: 'N02', to: 'N04', label: 'Valid' },
  { from: 'N04', to: 'N05', label: 'Exceeded' },
  { from: 'N04', to: 'N06', label: 'OK' },
  { from: 'N06', to: 'N07', label: 'Click link' },
  { from: 'N07', to: 'N08', label: 'Expired' },
  { from: 'N07', to: 'N09', label: 'Used' },
  { from: 'N07', to: 'N10', label: 'New link' },
  { from: 'N07', to: 'N11', label: 'Valid' },
  { from: 'N10', to: 'N11', label: 'Valid token' },
  { from: 'N11', to: 'N12', label: 'Enter password' },
  { from: 'N11', to: 'N18', label: 'Toggle eye' },
  { from: 'N12', to: 'N13', label: 'Too weak' },
  { from: 'N12', to: 'N14', label: 'Valid' },
  { from: 'N14', to: 'N15', label: 'Mismatch' },
  { from: 'N14', to: 'N16', label: 'Match' },
  { from: 'N16', to: 'N17', label: 'Same' },
  { from: 'N16', to: 'N19', label: 'Different' },
  { from: 'N19', to: 'N20', label: 'Confirm' },
  { from: 'N20', to: 'N21', label: 'Notify' },
  { from: 'N21', to: 'N22', label: 'Redirect' },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP227-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Valid registered email shows generic success message and sends reset email',
    steps: [
      { action: 'Navigate to Forgot Password page', data: 'STG Organizer URL', expect: 'Email input form is displayed' },
      { action: 'Enter valid registered email and submit', data: 'test-organizer@example.com', expect: 'Generic success message shown regardless of registration' },
      { action: 'Verify reset email arrives in inbox', data: 'Mailosaur inbox', expect: 'Reset email received with unique reset link' },
    ],
    activePath: ['N01', 'N02', 'N04', 'N06'],
    activeEdges: [['N01','N02'], ['N02','N04'], ['N04','N06']],
  },
  {
    id: 'PP227-TC-002',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Invalid email without @ symbol is rejected',
    steps: [
      { action: 'Enter email without @ symbol and submit', data: 'invalidemail.com', expect: 'Format error shown, Send button remains disabled' },
    ],
    activePath: ['N01', 'N02', 'N03'],
    activeEdges: [['N01','N02'], ['N02','N03']],
  },
  {
    id: 'PP227-TC-003',
    typeCls: 'bva',
    type: 'Functional',
    name: 'Invalid email without domain TLD is rejected',
    steps: [
      { action: 'Enter email without TLD domain and submit', data: 'abc@com', expect: 'Format error shown, Send button remains disabled' },
    ],
    activePath: ['N01', 'N02', 'N03'],
    activeEdges: [['N01','N02'], ['N02','N03']],
  },
  {
    id: 'PP227-TC-004',
    typeCls: 'smoke',
    type: 'Security',
    name: 'Non-existent email shows identical generic message (no enumeration)',
    steps: [
      { action: 'Enter valid-format but unregistered email and submit', data: 'ghost@notexist.com', expect: 'Identical generic message shown — indistinguishable from TC-001' },
    ],
    activePath: ['N01', 'N02', 'N04', 'N06'],
    activeEdges: [['N01','N02'], ['N02','N04'], ['N04','N06']],
  },
  {
    id: 'PP227-TC-005',
    typeCls: 'bva',
    type: 'Functional',
    name: 'Clicking submit twice within 60 seconds disables the button',
    steps: [
      { action: 'Submit a valid email request', data: 'test-organizer@example.com', expect: 'Generic response shown' },
      { action: 'Immediately submit the same request again (within 60s)', data: 'test-organizer@example.com', expect: 'Submit button disabled with cooldown timer shown' },
    ],
    activePath: ['N01', 'N02', 'N04', 'N05'],
    activeEdges: [['N01','N02'], ['N02','N04'], ['N04','N05']],
  },
  {
    id: 'PP227-TC-006',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Valid unexpired reset link opens Reset Password page',
    steps: [
      { action: 'Click the reset link in the email (within expiry window)', data: 'Fresh token URL from inbox', expect: 'Reset Password form page is displayed' },
    ],
    activePath: ['N06', 'N07', 'N11'],
    activeEdges: [['N06','N07'], ['N07','N11']],
  },
  {
    id: 'PP227-TC-007',
    typeCls: 'bva',
    type: 'Functional',
    name: 'Expired reset link shows error page',
    steps: [
      { action: 'Click reset link more than 30 minutes after generation', data: 'Expired token URL (>30 min)', expect: 'Error page shown: token expired' },
    ],
    activePath: ['N06', 'N07', 'N08'],
    activeEdges: [['N06','N07'], ['N07','N08']],
  },
  {
    id: 'PP227-TC-008',
    typeCls: 'st',
    type: 'Security',
    name: 'Used reset link shows error page (one-time use)',
    steps: [
      { action: 'Click a reset link that was already used to reset a password', data: 'Previously-used token URL', expect: 'Error page shown: link already used' },
    ],
    activePath: ['N06', 'N07', 'N09'],
    activeEdges: [['N06','N07'], ['N07','N09']],
  },
  {
    id: 'PP227-TC-009',
    typeCls: 'st',
    type: 'Security',
    name: 'Requesting a new link invalidates the previous unused link',
    steps: [
      { action: 'Request a reset link (Link A generated)', data: 'test-organizer@example.com', expect: 'Link A received in inbox' },
      { action: 'Request another reset link without using Link A', data: 'test-organizer@example.com', expect: 'Link B generated; Link A is now invalid' },
      { action: 'Click Link A', data: 'Old token URL', expect: 'Error page shown — token invalidated' },
      { action: 'Click Link B', data: 'New token URL', expect: 'Reset Password form displayed' },
    ],
    activePath: ['N06', 'N07', 'N10', 'N11'],
    activeEdges: [['N06','N07'], ['N07','N10'], ['N10','N11']],
  },
  {
    id: 'PP227-TC-010',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Password meeting all strength criteria enables confirm button',
    steps: [
      { action: 'Open Reset Password form with valid token', data: 'Valid token URL', expect: 'Form displayed' },
      { action: 'Enter a strong password meeting all requirements', data: 'Secure123', expect: 'All strength indicators pass; confirm button enables' },
    ],
    activePath: ['N11', 'N12', 'N14', 'N16', 'N19'],
    activeEdges: [['N11','N12'], ['N12','N14'], ['N14','N16'], ['N16','N19']],
  },
  {
    id: 'PP227-TC-011',
    typeCls: 'bva',
    type: 'Functional',
    name: 'Password shorter than 8 characters is rejected immediately',
    steps: [
      { action: 'Enter password shorter than 8 characters', data: 'Ab1 (3 chars) / Abcdef1 (7 chars)', expect: 'Inline strength error shown; confirm button disabled' },
    ],
    activePath: ['N11', 'N12', 'N13'],
    activeEdges: [['N11','N12'], ['N12','N13']],
  },
  {
    id: 'PP227-TC-012',
    typeCls: 'dt',
    type: 'Functional',
    name: 'Password missing required character classes is rejected',
    steps: [
      { action: 'Enter password missing uppercase letters', data: 'alllowercase1', expect: 'Inline strength error shown' },
      { action: 'Enter password missing lowercase letters', data: 'ALLUPPERCASE1', expect: 'Inline strength error shown' },
      { action: 'Enter password missing digits', data: 'NoDigitsHere', expect: 'Inline strength error shown' },
    ],
    activePath: ['N11', 'N12', 'N13'],
    activeEdges: [['N11','N12'], ['N12','N13']],
  },
  {
    id: 'PP227-TC-013',
    typeCls: 'dt',
    type: 'Functional',
    name: 'Mismatched confirm password disables the confirm button',
    steps: [
      { action: 'Enter a valid strong password in the New Password field', data: 'Secure123', expect: 'Strength indicators pass' },
      { action: 'Enter a different password in the Confirm Password field', data: 'Different99', expect: 'Mismatch error shown; confirm button disabled' },
    ],
    activePath: ['N11', 'N12', 'N14', 'N15'],
    activeEdges: [['N11','N12'], ['N12','N14'], ['N14','N15']],
  },
  {
    id: 'PP227-TC-014',
    typeCls: 'manual',
    type: 'Security',
    name: 'Setting new password to same as old password is rejected',
    steps: [
      { action: 'Enter the current known password as the new password', data: 'Current account password', expect: 'Error shown: password must be different from previous' },
    ],
    activePath: ['N11', 'N12', 'N14', 'N16', 'N17'],
    activeEdges: [['N11','N12'], ['N12','N14'], ['N14','N16'], ['N16','N17']],
  },
  {
    id: 'PP227-TC-015',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Eye icon toggles password field visibility',
    steps: [
      { action: 'Click the eye icon on the password field', data: '—', expect: 'Password characters become visible (input type = text)' },
      { action: 'Click the eye icon again', data: '—', expect: 'Password characters are hidden again (input type = password)' },
    ],
    activePath: ['N11', 'N18'],
    activeEdges: [['N11','N18']],
  },
  {
    id: 'PP227-TC-016',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Successful password reset force-logs out all sessions, sends notification email, and redirects to Login',
    steps: [
      { action: 'Complete reset form with valid strong non-reused password and confirm', data: 'Secure123 / Secure123', expect: 'Password updated successfully' },
      { action: 'Verify all active sessions are terminated', data: 'Multi-session test harness', expect: 'All other sessions are force-logged out' },
      { action: 'Verify confirmation email is received', data: 'Mailosaur inbox', expect: 'Email: "Your password has been changed" received' },
      { action: 'Observe page redirect after confirmation', data: '—', expect: 'Redirected to Login page with success toast displayed' },
    ],
    activePath: ['N11', 'N12', 'N14', 'N16', 'N19', 'N20', 'N21', 'N22'],
    activeEdges: [['N11','N12'], ['N12','N14'], ['N14','N16'], ['N16','N19'], ['N19','N20'], ['N20','N21'], ['N21','N22']],
  },
];

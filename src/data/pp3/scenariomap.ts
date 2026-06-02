import type { DagEdge, DagNode, Scenario } from '@/types';

// ── Nodes ─────────────────────────────────────────────────────────────────────
// Columns: 0=entry  1=profile  2=edit-screen  3=validation  4=outcome
// Rows:    0..5
export const SM_NODES: DagNode[] = [
  // col 0
  { id: 'N1',  col: 0, row: 0, name: 'Home\nPage',       type: 'action',   details: 'User opens app; authenticated.' },
  { id: 'N2',  col: 0, row: 3, name: 'Settings\nScreen', type: 'action',   details: 'User taps Settings from Profile.' },
  { id: 'N3',  col: 0, row: 5, name: '401\nUnauthorized',type: 'decision', details: 'Any screen returns 401.' },

  // col 1
  { id: 'N4',  col: 1, row: 0, name: 'Profile\nPage',    type: 'action',   details: 'Avatar, Name, Bio, Stats, Tabs.' },
  { id: 'N5',  col: 1, row: 1, name: 'Activity\nTabs',   type: 'decision', details: 'Upcoming / History / Saved tabs.' },
  { id: 'N6',  col: 1, row: 3, name: 'Interests\nScreen',type: 'action',   details: '1–3 category selection.' },
  { id: 'N7',  col: 1, row: 5, name: 'Login\nPage',      type: 'expect',   details: 'Session cleared; user reaches login.' },

  // col 2
  { id: 'N8',  col: 2, row: 0, name: 'Edit\nProfile',    type: 'action',   details: 'Name / Bio / Phone fields.' },
  { id: 'N9',  col: 2, row: 1, name: 'Saved\nTab',       type: 'decision', details: 'Has events vs empty state.' },
  { id: 'N10', col: 2, row: 3, name: 'Count\nCheck',     type: 'decision', details: '0 / 1–3 / 4 interests selected.' },
  { id: 'N11', col: 2, row: 4, name: 'Delete\nDialog',   type: 'action',   details: 'Confirmation dialog with reason field.' },

  // col 3
  { id: 'N12', col: 3, row: 0, name: 'Field\nValidation',type: 'decision', details: 'Name / Bio / Phone rules checked.' },
  { id: 'N13', col: 3, row: 1, name: 'Saved\nEmpty',     type: 'expect',   details: 'Empty state + CTA shown.' },
  { id: 'N14', col: 3, row: 2, name: 'Network\nCheck',   type: 'decision', details: 'PATCH /v1/user/profile result.' },
  { id: 'N15', col: 3, row: 3, name: 'Save\nDisabled',   type: 'expect',   details: '0 interests: Save button disabled.' },
  { id: 'N16', col: 3, row: 4, name: 'Reason\nValidation',type:'decision', details: 'Reason text ≤ 500 chars?' },

  // col 4
  { id: 'N17', col: 4, row: 0, name: 'Profile\nUpdated', type: 'expect',   details: 'Profile page reflects edits immediately.' },
  { id: 'N18', col: 4, row: 1, name: 'Validation\nError',type: 'expect',   details: 'Inline error shown; user stays on Edit.' },
  { id: 'N19', col: 4, row: 2, name: 'Error\nToast',     type: 'expect',   details: 'Network error toast; stay on Edit.' },
  { id: 'N20', col: 4, row: 3, name: 'Interests\nSaved', type: 'expect',   details: 'Feed re-calculated after save.' },
  { id: 'N21', col: 4, row: 4, name: 'Account\nDeleted', type: 'expect',   details: 'Account deleted; redirect to Login.' },
];

// ── Edges ─────────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N1',  to: 'N4',  label: 'Navigate' },
  { from: 'N4',  to: 'N5',  label: 'View tabs' },
  { from: 'N4',  to: 'N8',  label: 'Tap Edit' },
  { from: 'N4',  to: 'N2',  label: 'Settings' },
  { from: 'N5',  to: 'N9',  label: 'Saved tab' },
  { from: 'N9',  to: 'N13', label: 'Empty' },
  { from: 'N9',  to: 'N5',  label: 'Has events' },
  { from: 'N8',  to: 'N12', label: 'Tap Save' },
  { from: 'N12', to: 'N18', label: 'Invalid' },
  { from: 'N12', to: 'N14', label: 'Valid' },
  { from: 'N14', to: 'N19', label: 'Net error' },
  { from: 'N14', to: 'N17', label: 'Success' },
  { from: 'N18', to: 'N8',  label: 'Fix & retry' },
  { from: 'N19', to: 'N8',  label: 'Retry' },
  { from: 'N2',  to: 'N6',  label: 'Interests' },
  { from: 'N6',  to: 'N10', label: 'Select' },
  { from: 'N10', to: 'N15', label: '0 selected' },
  { from: 'N10', to: 'N6',  label: 'Max 3 (4th blocked)' },
  { from: 'N10', to: 'N20', label: '1–3 saved' },
  { from: 'N2',  to: 'N11', label: 'Delete acct' },
  { from: 'N11', to: 'N16', label: 'Confirm' },
  { from: 'N11', to: 'N2',  label: 'Cancel' },
  { from: 'N16', to: 'N21', label: 'Valid ≤500' },
  { from: 'N16', to: 'N11', label: 'Over 500' },
  { from: 'N2',  to: 'N7',  label: 'Logout' },
  { from: 'N3',  to: 'N7',  label: '401 redirect' },
  { from: 'N21', to: 'N7',  label: 'Redirect' },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  // TC-001 — Smoke: profile loads
  {
    id: 'PP3-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Profile page loads all data correctly',
    steps: [
      { action: 'Open app; navigate to Profile', data: 'Valid STG user account', expect: 'Avatar, name, bio, stats, and tabs visible' },
      { action: 'Assert API call returns 200', data: 'GET /v1/user/profile', expect: 'Profile data rendered without pull-to-refresh' },
    ],
    activePath: ['N1', 'N4'],
    activeEdges: [['N1', 'N4']],
  },

  // TC-002/003/004 — Activity tabs (grouped)
  {
    id: 'PP3-TC-002',
    typeCls: 'st',
    type: 'Functional',
    name: 'Activity tabs show events in correct order',
    steps: [
      { action: 'Navigate to Profile → tap Upcoming', data: 'Account with upcoming events', expect: 'Upcoming events listed newest first' },
      { action: 'Tap History tab', data: '—', expect: 'Past events listed newest first' },
      { action: 'Tap Saved tab with events', data: 'Account with saved events', expect: 'Saved event list shown' },
    ],
    activePath: ['N1', 'N4', 'N5'],
    activeEdges: [['N1', 'N4'], ['N4', 'N5']],
  },

  // TC-005 — Saved tab empty state
  {
    id: 'PP3-TC-005',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Saved tab empty state shows CTA deep link',
    steps: [
      { action: 'Navigate to Saved tab', data: 'Account with no saved events', expect: 'Empty state message shown' },
      { action: 'Assert CTA button present', data: '—', expect: 'CTA links to Event Search page' },
    ],
    activePath: ['N1', 'N4', 'N5', 'N9', 'N13'],
    activeEdges: [['N1', 'N4'], ['N4', 'N5'], ['N5', 'N9'], ['N9', 'N13']],
  },

  // TC-006 — Smoke: Edit Profile opens
  {
    id: 'PP3-TC-006',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Edit Profile screen opens from Profile',
    steps: [
      { action: 'Navigate to Profile; tap Edit Profile', data: '—', expect: 'Edit Profile screen opens with current values pre-filled' },
    ],
    activePath: ['N1', 'N4', 'N8'],
    activeEdges: [['N1', 'N4'], ['N4', 'N8']],
  },

  // TC-007 — Name empty error (EP negative)
  {
    id: 'PP3-TC-007',
    typeCls: 'ep',
    type: 'Negative',
    name: 'Display name empty — error on Save',
    steps: [
      { action: 'Clear display name field; tap Save', data: 'Empty string ""', expect: 'Inline validation error: name required' },
      { action: 'Assert user stays on Edit Profile', data: '—', expect: 'No API call made' },
    ],
    activePath: ['N8', 'N12', 'N18'],
    activeEdges: [['N8', 'N12'], ['N12', 'N18']],
  },

  // TC-008/009 — BVA name length 50 / 51
  {
    id: 'PP3-TC-008',
    typeCls: 'bva',
    type: 'Boundary',
    name: 'Display name 50 chars accepted; 51 chars rejected',
    steps: [
      { action: 'Enter 50-char display name; tap Save', data: '50-char Thai/English string', expect: 'Name accepted; profile updated' },
      { action: 'Enter 51-char display name; tap Save', data: '51-char string', expect: 'Inline error: max 50 chars exceeded' },
    ],
    activePath: ['N8', 'N12', 'N14', 'N17'],
    activeEdges: [['N8', 'N12'], ['N12', 'N14'], ['N14', 'N17']],
  },

  // TC-010/011/012 — Name char-class validation (EP / DT)
  {
    id: 'PP3-TC-010',
    typeCls: 'ep',
    type: 'Negative',
    name: 'Display name with digits or disallowed chars rejected',
    steps: [
      { action: 'Enter name with digits (e.g. "Test123"); tap Save', data: '"Test123"', expect: 'Inline error: digits not allowed' },
      { action: 'Enter name with disallowed special chars; tap Save', data: '"Test@#$"', expect: 'Inline error: disallowed characters' },
      { action: 'Enter name with allowed special chars; tap Save', data: '"Smith-Jones"', expect: 'Name accepted' },
    ],
    activePath: ['N8', 'N12', 'N18'],
    activeEdges: [['N8', 'N12'], ['N12', 'N18']],
  },

  // TC-014/015/016 — Bio BVA (250/251/empty)
  {
    id: 'PP3-TC-014',
    typeCls: 'bva',
    type: 'Boundary',
    name: 'Bio 250 chars accepted; 251 rejected; empty accepted',
    steps: [
      { action: 'Enter 250-char bio; tap Save', data: '250-char text', expect: 'Bio accepted; profile updated' },
      { action: 'Enter 251-char bio; tap Save', data: '251-char text', expect: 'Inline error: max 250 chars' },
      { action: 'Clear bio field; tap Save', data: 'Empty string ""', expect: 'Save succeeds (bio is optional)' },
    ],
    activePath: ['N8', 'N12', 'N14', 'N17'],
    activeEdges: [['N8', 'N12'], ['N12', 'N14'], ['N14', 'N17']],
  },

  // TC-017 — Valid phone update
  {
    id: 'PP3-TC-017',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Valid phone update accepted; invalid phone rejected',
    steps: [
      { action: 'Enter valid phone "0812345678"; tap Save', data: '"0812345678"', expect: 'Phone accepted; PATCH /v1/user/profile called' },
      { action: 'Enter invalid phone "123"; tap Save', data: '"123"', expect: 'Inline error: invalid phone format' },
    ],
    activePath: ['N8', 'N12', 'N14', 'N17'],
    activeEdges: [['N8', 'N12'], ['N12', 'N14'], ['N14', 'N17']],
  },

  // TC-019 — Profile reflects changes immediately
  {
    id: 'PP3-TC-019',
    typeCls: 'st',
    type: 'Functional',
    name: 'Profile reflects changes immediately after Save',
    steps: [
      { action: 'Edit name and phone; tap Save', data: 'Valid values', expect: 'PATCH /v1/user/profile returns 200' },
      { action: 'Assert Profile page shows updated values', data: '—', expect: 'No pull-to-refresh required; data live on screen' },
    ],
    activePath: ['N8', 'N12', 'N14', 'N17'],
    activeEdges: [['N8', 'N12'], ['N12', 'N14'], ['N14', 'N17']],
  },

  // TC-020 — Network failure on Save
  {
    id: 'PP3-TC-020',
    typeCls: 'st',
    type: 'Negative',
    name: 'Network failure during Save shows Error Toast',
    steps: [
      { action: 'Enable network throttle / offline; tap Save', data: 'Valid fields; offline network', expect: 'Error Toast shown; user stays on Edit screen' },
    ],
    activePath: ['N8', 'N12', 'N14', 'N19'],
    activeEdges: [['N8', 'N12'], ['N12', 'N14'], ['N14', 'N19']],
  },

  // TC-021 — Smoke: interests saved
  {
    id: 'PP3-TC-021',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Change interests — saved and profile updated',
    steps: [
      { action: 'Navigate to Interests screen; change selection (1–3 items); tap Save', data: 'Valid 1–3 categories', expect: 'Interests saved; discovery feed re-calculated' },
    ],
    activePath: ['N4', 'N2', 'N6', 'N10', 'N20'],
    activeEdges: [['N4', 'N2'], ['N2', 'N6'], ['N6', 'N10'], ['N10', 'N20']],
  },

  // TC-023/024 — Interests BVA (0 / 4)
  {
    id: 'PP3-TC-023',
    typeCls: 'bva',
    type: 'Boundary',
    name: 'Cannot save 0 interests; 4th interest blocked',
    steps: [
      { action: 'Deselect all interests; try Save', data: '0 interests selected', expect: 'Save button disabled; minimum 1 required' },
      { action: 'Select 3 interests; attempt to tap 4th', data: '4th interest option', expect: '4th selection blocked; max 3 enforced' },
    ],
    activePath: ['N6', 'N10', 'N15'],
    activeEdges: [['N6', 'N10'], ['N10', 'N15']],
  },

  // TC-026/027 — Delete account flow
  {
    id: 'PP3-TC-026',
    typeCls: 'st',
    type: 'Functional',
    name: 'Delete Account dialog opens; reason text accepted',
    steps: [
      { action: 'Go to Settings; tap Delete Account button', data: 'De-emphasised button', expect: 'Confirmation dialog opens' },
      { action: 'Enter reason text (≤ 500 chars)', data: '250-char reason', expect: 'Reason text accepted; Confirm button enabled' },
    ],
    activePath: ['N4', 'N2', 'N11', 'N16'],
    activeEdges: [['N4', 'N2'], ['N2', 'N11'], ['N11', 'N16']],
  },

  // TC-028/029 — Delete reason BVA
  {
    id: 'PP3-TC-028',
    typeCls: 'bva',
    type: 'Boundary',
    name: 'Delete reason 500 chars accepted; 501 rejected',
    steps: [
      { action: 'Enter 500-char reason; tap Confirm', data: '500-char Thai text', expect: 'Reason accepted; DELETE request proceeds' },
      { action: 'Enter 501-char reason; tap Confirm', data: '501-char text', expect: 'Inline error: max 500 chars exceeded' },
    ],
    activePath: ['N11', 'N16', 'N21'],
    activeEdges: [['N11', 'N16'], ['N16', 'N21']],
  },

  // TC-030 — Cancel delete
  {
    id: 'PP3-TC-030',
    typeCls: 'st',
    type: 'Functional',
    name: 'Cancel delete returns to Settings; account intact',
    steps: [
      { action: 'Tap Cancel in Confirmation dialog', data: '—', expect: 'Dialog dismissed; user returns to Settings; account not deleted' },
    ],
    activePath: ['N2', 'N11', 'N2'],
    activeEdges: [['N2', 'N11'], ['N11', 'N2']],
  },

  // TC-031 — Smoke: confirm delete
  {
    id: 'PP3-TC-031',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Confirm delete — account deleted; redirect to Login',
    steps: [
      { action: 'Enter valid reason; tap Confirm Delete', data: 'Fresh test account; valid reason ≤ 500', expect: 'DELETE /v1/user/account called; sessions cleared' },
      { action: 'Assert redirect', data: '—', expect: 'User navigated to Login page' },
    ],
    activePath: ['N11', 'N16', 'N21', 'N7'],
    activeEdges: [['N11', 'N16'], ['N16', 'N21'], ['N21', 'N7']],
  },

  // TC-033 — 401 redirect
  {
    id: 'PP3-TC-033',
    typeCls: 'st',
    type: 'Functional',
    name: 'Token expiry (401) redirects gracefully to Login',
    steps: [
      { action: 'Force token expiry (STG API / expired JWT)', data: 'Expired JWT token', expect: '401 response intercepted gracefully' },
      { action: 'Assert redirect', data: '—', expect: 'User navigated to Login page without crash' },
    ],
    activePath: ['N3', 'N7'],
    activeEdges: [['N3', 'N7']],
  },

  // TC-035 — Smoke: logout
  {
    id: 'PP3-TC-035',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Logout clears session and redirects to Login',
    steps: [
      { action: 'Navigate to Settings; tap Logout', data: '—', expect: 'Local session and token cleared' },
      { action: 'Assert redirect', data: '—', expect: 'User reaches Login page' },
    ],
    activePath: ['N4', 'N2', 'N7'],
    activeEdges: [['N4', 'N2'], ['N2', 'N7']],
  },
];

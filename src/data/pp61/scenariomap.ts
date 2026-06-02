import type { DagEdge, DagNode, Scenario } from '@/types';

// ── DAG Nodes ─────────────────────────────────────────────────────────────────
//
// col/row layout (0-based):
//
//  col:  0          1           2           3          4
//  row0  START ──► TYPE? ──► PUBLIC ──► [done]
//                      └──► OWNVIEW ──► EDIT ──► VALIDATE? ──► SAVE ──► KAFKA
//                                              └──► ERR
//                                 └──► AVATAR? ──► UPLOAD ──► GCS
//                                              └──► BADSIZE
//                                              └──► BADTYPE
//  row3  DELETE ──► SOFT ──► REVOKE / HARD
//  row4  SETTINGS
//  row5  ORG ──► BADGE?
//  row6  ADMIN ──► FILTER / NONAUTH

export const SM_NODES: DagNode[] = [
  // col 0: entry
  { id: 'N01', col: 0, row: 0, name: 'Open\nProfile',    type: 'action',   details: 'User navigates to a profile page (own or other user).' },
  // col 1: type decision
  { id: 'N02', col: 1, row: 0, name: 'Profile\nType?',   type: 'decision', details: 'Is the viewer authenticated and viewing own profile?' },
  // col 2: profile views
  { id: 'N03', col: 2, row: 0, name: 'Public\nProfile',  type: 'expect',   details: 'Unauthenticated or other-user profile: avatar, name, bio, followers shown.' },
  { id: 'N04', col: 2, row: 1, name: 'Own\nProfile',     type: 'expect',   details: 'Authenticated own profile: full data + Edit button visible.' },
  // col 3: edit / avatar paths
  { id: 'N05', col: 3, row: 1, name: 'Edit\nProfile',    type: 'action',   details: 'User taps Edit and modifies display name, bio, phone, or email.' },
  { id: 'N06', col: 3, row: 2, name: 'Avatar\nUpload',   type: 'action',   details: 'User taps avatar area and selects a file.' },
  // col 4: validation / upload outcomes
  { id: 'N07', col: 4, row: 1, name: 'Valid\nInput?',    type: 'decision', details: 'Are all edited fields valid (format, length)?' },
  { id: 'N08', col: 4, row: 2, name: 'File\nValid?',     type: 'decision', details: 'Is the file type JPG/PNG and size <= 5 MB?' },
  // col 5: outcomes
  { id: 'N09', col: 5, row: 0, name: 'Save\nSuccess',    type: 'expect',   details: 'Profile saved; Kafka user.updated emitted.' },
  { id: 'N10', col: 5, row: 1, name: 'Validation\nError', type: 'expect',  details: 'Error message displayed; profile not saved.' },
  { id: 'N11', col: 5, row: 2, name: 'GCS\nUpload',      type: 'expect',   details: 'File uploaded and resized to 3 sizes in GCS; new avatar shown.' },
  { id: 'N12', col: 5, row: 3, name: 'Upload\nRejected', type: 'expect',   details: 'Error shown: file size > 5 MB or unsupported format.' },
  // delete flow
  { id: 'N13', col: 0, row: 4, name: 'Delete\nAccount',  type: 'action',   details: 'User initiates account deletion.' },
  { id: 'N14', col: 1, row: 4, name: 'Soft\nDelete',     type: 'expect',   details: 'Soft Delete applied; Grace Period 30 days begins; user logged out.' },
  { id: 'N15', col: 2, row: 4, name: 'Delete\nLifecycle?', type: 'decision', details: 'Within Grace Period: revoke? Or period elapsed: hard delete?' },
  { id: 'N16', col: 3, row: 3, name: 'Account\nRestored', type: 'expect',  details: 'Soft delete cancelled; account back to active; login works.' },
  { id: 'N17', col: 3, row: 5, name: 'Hard\nDelete',     type: 'expect',   details: 'PII anonymised; Kafka user.deleted emitted.' },
  // settings / organizer / admin
  { id: 'N18', col: 0, row: 6, name: 'Settings\nPage',   type: 'action',   details: 'User opens Account Settings.' },
  { id: 'N19', col: 1, row: 6, name: 'Settings\nApplied', type: 'expect',  details: 'Language or notification preference updated immediately.' },
  { id: 'N20', col: 0, row: 7, name: 'Org\nProfile',     type: 'action',   details: 'Event page loaded; Organizer Profile component renders.' },
  { id: 'N21', col: 1, row: 7, name: 'Badge\nShown',     type: 'expect',   details: 'Verified organizer: name + Verified Badge shown.' },
  { id: 'N22', col: 1, row: 8, name: 'No\nBadge',        type: 'expect',   details: 'Unverified organizer: name shown without badge.' },
  { id: 'N23', col: 0, row: 9, name: 'Admin\nHistory',   type: 'action',   details: 'Admin navigates to User History page.' },
  { id: 'N24', col: 1, row: 9, name: 'Paginated\nList',  type: 'expect',   details: 'User History shown paginated (20/page); next page loads new records.' },
  { id: 'N25', col: 2, row: 9, name: 'Filter\nResult',   type: 'expect',   details: 'Filter by action applied; table shows only matching records.' },
  { id: 'N26', col: 1, row: 10, name: 'Access\nDenied',  type: 'expect',   details: 'Non-admin receives 403 / redirect; User History not accessible.' },
];

// ── DAG Edges ─────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N01', to: 'N02' },
  { from: 'N02', to: 'N03', label: 'public' },
  { from: 'N02', to: 'N04', label: 'own' },
  { from: 'N04', to: 'N05', label: 'tap Edit' },
  { from: 'N04', to: 'N06', label: 'tap Avatar' },
  { from: 'N05', to: 'N07' },
  { from: 'N07', to: 'N09', label: 'valid' },
  { from: 'N07', to: 'N10', label: 'invalid' },
  { from: 'N06', to: 'N08' },
  { from: 'N08', to: 'N11', label: 'valid' },
  { from: 'N08', to: 'N12', label: 'invalid' },
  { from: 'N13', to: 'N14', label: 'confirm' },
  { from: 'N14', to: 'N15' },
  { from: 'N15', to: 'N16', label: 'revoke' },
  { from: 'N15', to: 'N17', label: '30d elapsed' },
  { from: 'N18', to: 'N19', label: 'change setting' },
  { from: 'N20', to: 'N21', label: 'verified' },
  { from: 'N20', to: 'N22', label: 'unverified' },
  { from: 'N23', to: 'N24', label: 'admin access' },
  { from: 'N24', to: 'N25', label: 'filter' },
  { from: 'N23', to: 'N26', label: 'non-admin' },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP61-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Public profile accessible without login — avatar, name, bio, followers shown',
    steps: [
      { action: 'Open public profile URL without logging in', data: 'Public profile URL of another user', expect: 'Profile page loads; avatar, display name, bio, followers/following visible' },
    ],
    activePath: ['N01', 'N02', 'N03'],
    activeEdges: [['N01','N02'], ['N02','N03']],
  },
  {
    id: 'PP61-TC-002',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Own Profile shows full data + Edit button for authenticated user',
    steps: [
      { action: 'Log in and navigate to own profile', data: 'Valid STG user account', expect: 'Own profile shows avatar, display name, bio, followers/following, and Edit Profile button' },
    ],
    activePath: ['N01', 'N02', 'N04'],
    activeEdges: [['N01','N02'], ['N02','N04']],
  },
  {
    id: 'PP61-TC-003',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Edit display name and bio — saved successfully + Kafka user.updated emitted',
    steps: [
      { action: 'Tap Edit Profile; update display name and bio', data: 'Valid name (<=50 chars); valid bio', expect: 'Fields updated in UI' },
      { action: 'Tap Save', data: '—', expect: 'Profile saved; Kafka user.updated event emitted; updated values shown on profile' },
    ],
    activePath: ['N04', 'N05', 'N07', 'N09'],
    activeEdges: [['N04','N05'], ['N05','N07'], ['N07','N09']],
  },
  {
    id: 'PP61-TC-004',
    typeCls: 'bva',
    type: 'Functional',
    name: 'Edit phone number — 10-digit accepted; 9-digit rejected (BVA boundary)',
    steps: [
      { action: 'Edit phone to 10-digit number and save', data: '"0812345678"', expect: 'Saved successfully' },
      { action: 'Edit phone to 9-digit number and save', data: '"081234567"', expect: 'Error message shown; profile not saved' },
    ],
    activePath: ['N04', 'N05', 'N07', 'N09'],
    activeEdges: [['N04','N05'], ['N05','N07'], ['N07','N09']],
  },
  {
    id: 'PP61-TC-005',
    typeCls: 'ep',
    type: 'Negative',
    name: 'Invalid email format shows error and does not save',
    steps: [
      { action: 'Edit email with invalid format', data: '"notanemail"', expect: 'Email field marked invalid' },
      { action: 'Tap Save', data: '—', expect: 'Error message displayed; profile not saved; user remains on edit screen' },
    ],
    activePath: ['N04', 'N05', 'N07', 'N10'],
    activeEdges: [['N04','N05'], ['N05','N07'], ['N07','N10']],
  },
  {
    id: 'PP61-TC-006',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Upload JPG <= 5 MB — resize 3 sizes to GCS; new avatar shown on profile',
    steps: [
      { action: 'Tap avatar area and select valid JPG file', data: 'File: valid.jpg (2 MB)', expect: 'File accepted; upload starts' },
      { action: 'Upload completes', data: '—', expect: 'Avatar resized (3 sizes) and stored in GCS; new avatar visible on profile' },
    ],
    activePath: ['N04', 'N06', 'N08', 'N11'],
    activeEdges: [['N04','N06'], ['N06','N08'], ['N08','N11']],
  },
  {
    id: 'PP61-TC-007',
    typeCls: 'bva',
    type: 'Negative',
    name: 'Upload file > 5 MB — error shown; original avatar unchanged',
    steps: [
      { action: 'Select file larger than 5 MB', data: 'File: large.jpg (6 MB)', expect: 'Upload rejected' },
      { action: 'Observe error', data: '—', expect: 'Error "file size exceeds 5 MB" shown; original avatar unchanged' },
    ],
    activePath: ['N04', 'N06', 'N08', 'N12'],
    activeEdges: [['N04','N06'], ['N06','N08'], ['N08','N12']],
  },
  {
    id: 'PP61-TC-008',
    typeCls: 'dt',
    type: 'Negative',
    name: 'Upload GIF file — error "only JPG and PNG supported"',
    steps: [
      { action: 'Select GIF file for avatar upload', data: 'File: animated.gif', expect: 'Upload rejected' },
      { action: 'Observe error', data: '—', expect: 'Error "only JPG and PNG supported" shown; avatar unchanged' },
    ],
    activePath: ['N04', 'N06', 'N08', 'N12'],
    activeEdges: [['N04','N06'], ['N06','N08'], ['N08','N12']],
  },
  {
    id: 'PP61-TC-009',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Delete account — Soft Delete applied; user logged out; re-login rejected',
    steps: [
      { action: 'Tap Delete Account and confirm', data: 'Throwaway STG account', expect: 'Deletion confirmed' },
      { action: 'Observe post-deletion state', data: '—', expect: 'Account soft-deleted (Grace Period 30d begins); user force-logged out' },
      { action: 'Attempt to log in with deleted credentials', data: 'Same email/password', expect: 'Login rejected' },
    ],
    activePath: ['N13', 'N14'],
    activeEdges: [['N13','N14']],
  },
  {
    id: 'PP61-TC-010',
    typeCls: 'st',
    type: 'Functional',
    name: 'Cancel Soft Delete within Grace Period — account restored to active',
    steps: [
      { action: 'Trigger soft delete on throwaway account', data: 'Throwaway STG account', expect: 'Account in Soft Delete state' },
      { action: 'Revoke deletion within Grace Period (admin API or link)', data: 'Within 30-day window', expect: 'Account restored to active; login succeeds' },
    ],
    activePath: ['N13', 'N14', 'N15', 'N16'],
    activeEdges: [['N13','N14'], ['N14','N15'], ['N15','N16']],
  },
  {
    id: 'PP61-TC-011',
    typeCls: 'st',
    type: 'Functional',
    name: 'Hard Delete after Grace Period — PII anonymised + Kafka user.deleted emitted',
    steps: [
      { action: 'Simulate Grace Period expiry (admin API)', data: 'Admin API to advance grace period clock', expect: 'Hard Delete triggered' },
      { action: 'Verify anonymisation and event', data: '—', expect: 'PII anonymised; Kafka user.deleted event emitted' },
    ],
    activePath: ['N13', 'N14', 'N15', 'N17'],
    activeEdges: [['N13','N14'], ['N14','N15'], ['N15','N17']],
  },
  {
    id: 'PP61-TC-012',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Change language English <> Thai — applied immediately without restart',
    steps: [
      { action: 'Open Account Settings; change language to Thai', data: 'Currently English', expect: 'App UI switches to Thai immediately' },
      { action: 'Change back to English', data: '—', expect: 'App UI switches to English immediately; no app restart required' },
    ],
    activePath: ['N18', 'N19'],
    activeEdges: [['N18','N19']],
  },
  {
    id: 'PP61-TC-013',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Disable Notification Preference — toggle off; push notifications not received',
    steps: [
      { action: 'Open Account Settings; toggle Notification Preference off', data: '—', expect: 'Toggle shows off state; preference saved' },
      { action: 'Trigger a push notification event', data: '—', expect: 'User does not receive push notification' },
    ],
    activePath: ['N18', 'N19'],
    activeEdges: [['N18','N19']],
  },
  {
    id: 'PP61-TC-014',
    typeCls: 'dt',
    type: 'Functional',
    name: 'Verified Organizer Profile shows name + Verified Badge on Event Page',
    steps: [
      { action: 'Open Event Page for event by verified organizer', data: 'Verified organizer on STG', expect: 'Organizer section shows organisation name and Verified Badge' },
    ],
    activePath: ['N20', 'N21'],
    activeEdges: [['N20','N21']],
  },
  {
    id: 'PP61-TC-015',
    typeCls: 'dt',
    type: 'Functional',
    name: 'Unverified Organizer Profile shows name only — no Verified Badge',
    steps: [
      { action: 'Open Event Page for event by unverified organizer', data: 'Unverified organizer on STG', expect: 'Organizer section shows name; no Verified Badge present' },
    ],
    activePath: ['N20', 'N22'],
    activeEdges: [['N20','N22']],
  },
  {
    id: 'PP61-TC-016',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Admin views User History — paginated 20/page; next page loads non-duplicate records',
    steps: [
      { action: 'Log in as Admin; navigate to User History', data: 'Admin STG account', expect: 'List shows first 20 records' },
      { action: 'Navigate to next page', data: '—', expect: 'Next page loads; records are unique (no duplicates from page 1)' },
    ],
    activePath: ['N23', 'N24'],
    activeEdges: [['N23','N24']],
  },
  {
    id: 'PP61-TC-017',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Admin filters User History by action — table shows only matching records',
    steps: [
      { action: 'Apply action filter on User History table', data: 'Filter: action = "profile_updated"', expect: 'Table refreshes; only profile_updated records shown' },
    ],
    activePath: ['N23', 'N24', 'N25'],
    activeEdges: [['N23','N24'], ['N24','N25']],
  },
  {
    id: 'PP61-TC-018',
    typeCls: 'ep',
    type: 'Negative',
    name: 'Non-Admin accessing User History receives 403 / redirect (RBAC guard)',
    steps: [
      { action: 'Log in as regular user; navigate to User History URL', data: 'Non-admin STG account', expect: 'API returns 403 or redirect occurs; User History content not shown' },
    ],
    activePath: ['N23', 'N26'],
    activeEdges: [['N23','N26']],
  },
];

import type { DagEdge, DagNode, Scenario } from '@/types';

// ── Nodes ─────────────────────────────────────────────────────────────────────
// Columns: 0=entry  1=action  2=system  3=outcome
// Rows:    0..5
export const SM_NODES: DagNode[] = [
  // col 0 — entry states
  { id: 'N1', col: 0, row: 0, name: 'Profile B\n(Not Following)', type: 'action',   details: 'User A views User B profile — currently not following.' },
  { id: 'N2', col: 0, row: 2, name: 'Profile B\n(Following)',     type: 'action',   details: 'User A views User B profile — already following.' },
  { id: 'N3', col: 0, row: 4, name: 'Followers\nList',            type: 'action',   details: 'User opens Followers list.' },
  { id: 'N4', col: 0, row: 5, name: 'Following\nList',            type: 'action',   details: 'User opens Following list.' },

  // col 1 — user action
  { id: 'N5', col: 1, row: 0, name: 'Tap Follow',                  type: 'action',   details: 'User A taps Follow button.' },
  { id: 'N6', col: 1, row: 1, name: 'Duplicate\nFollow',           type: 'decision', details: 'Already following — idempotent path.' },
  { id: 'N7', col: 1, row: 2, name: 'Tap\nUnfollow',               type: 'action',   details: 'User A taps Unfollow button.' },
  { id: 'N8', col: 1, row: 3, name: 'Duplicate\nUnfollow',         type: 'decision', details: 'Already not following — idempotent path.' },
  { id: 'N9', col: 1, row: 4, name: 'Tap Block\nUser B',           type: 'action',   details: 'User A taps Block from profile.' },

  // col 2 — system state
  { id: 'N10', col: 2, row: 0, name: 'Follow\nRelationship',       type: 'expect',   details: 'Follow record created in DB.' },
  { id: 'N11', col: 2, row: 1, name: 'Count\nUpdated',             type: 'expect',   details: 'followers_count(B)+1, following_count(A)+1.' },
  { id: 'N12', col: 2, row: 2, name: 'Follow\nRemoved',            type: 'expect',   details: 'Follow record deleted from DB.' },
  { id: 'N13', col: 2, row: 4, name: 'List\nPaginated',            type: 'expect',   details: 'Paginated list with avatar, name, follow status.' },
  { id: 'N14', col: 2, row: 5, name: 'Empty\nState',               type: 'expect',   details: 'No followers / following — empty state shown.' },

  // col 3 — final outcomes
  { id: 'N15', col: 3, row: 0, name: 'Kafka\nPublished',           type: 'action',   details: 'user.followed event emitted to Kafka.' },
  { id: 'N16', col: 3, row: 1, name: 'Notification\nSent',         type: 'expect',   details: 'User B receives push notification.' },
  { id: 'N17', col: 3, row: 2, name: 'Count\nDecremented',         type: 'expect',   details: 'followers_count(B)-1, following_count(A)-1.' },
  { id: 'N18', col: 3, row: 3, name: 'Idempotent\nOK',             type: 'expect',   details: 'No error; state unchanged.' },
  { id: 'N19', col: 3, row: 4, name: 'Block\nMutual',              type: 'expect',   details: 'A cannot see B; B cannot see A.' },
];

// ── Edges ─────────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  // Follow happy path
  { from: 'N1',  to: 'N5',  label: 'Open profile' },
  { from: 'N5',  to: 'N10', label: 'API success' },
  { from: 'N10', to: 'N11', label: 'Count update' },
  { from: 'N11', to: 'N15', label: 'Kafka emit' },
  { from: 'N15', to: 'N16', label: 'Notify B' },
  // Duplicate follow
  { from: 'N1',  to: 'N6',  label: 'Already following' },
  { from: 'N6',  to: 'N18', label: 'Idempotent' },
  // Unfollow happy path
  { from: 'N2',  to: 'N7',  label: 'Tap Unfollow' },
  { from: 'N7',  to: 'N12', label: 'API success' },
  { from: 'N12', to: 'N17', label: 'Count update' },
  // Duplicate unfollow
  { from: 'N2',  to: 'N8',  label: 'Not following' },
  { from: 'N8',  to: 'N18', label: 'Idempotent' },
  // Followers list
  { from: 'N3',  to: 'N13', label: 'Has followers' },
  { from: 'N3',  to: 'N14', label: 'No followers' },
  // Following list
  { from: 'N4',  to: 'N13', label: 'Has following' },
  { from: 'N4',  to: 'N14', label: 'No following' },
  // Block
  { from: 'N1',  to: 'N9',  label: 'Tap Block' },
  { from: 'N9',  to: 'N19', label: 'Block created' },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP65-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Follow User B — counts updated, Kafka emitted',
    steps: [
      { action: 'User A opens User B profile (not following)', data: 'User A & B accounts in STG', expect: 'Follow button visible' },
      { action: 'Tap Follow button', data: '—', expect: 'POST /follow returns 201; follow record created' },
      { action: 'Assert count changes via GET /profile', data: 'Before/after counts', expect: 'followers_count(B)+1, following_count(A)+1' },
      { action: 'Assert Kafka event emitted', data: 'user.followed topic', expect: 'Event published in Kafka log' },
    ],
    activePath: ['N1', 'N5', 'N10', 'N11', 'N15'],
    activeEdges: [['N1', 'N5'], ['N5', 'N10'], ['N10', 'N11'], ['N11', 'N15']],
  },
  {
    id: 'PP65-TC-002',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Follow User B — User B receives push notification',
    steps: [
      { action: 'User A follows User B', data: 'User A & B in STG', expect: 'Kafka user.followed published successfully' },
      { action: 'Assert notification arrives on User B device', data: 'User B device (STG)', expect: 'Push notification received by User B' },
    ],
    activePath: ['N1', 'N5', 'N10', 'N11', 'N15', 'N16'],
    activeEdges: [['N1', 'N5'], ['N5', 'N10'], ['N10', 'N11'], ['N11', 'N15'], ['N15', 'N16']],
  },
  {
    id: 'PP65-TC-003',
    typeCls: 'ep',
    type: 'Negative',
    name: 'Duplicate Follow — idempotent; counts unchanged',
    steps: [
      { action: 'User A follows User B (already following); tap Follow again', data: 'A already follows B', expect: 'API returns no error; status remains Following' },
      { action: 'Assert counts via GET /profile', data: '—', expect: 'followers_count unchanged; no duplicate record' },
    ],
    activePath: ['N1', 'N6', 'N18'],
    activeEdges: [['N1', 'N6'], ['N6', 'N18']],
  },
  {
    id: 'PP65-TC-004',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Unfollow User B — counts decremented; button resets',
    steps: [
      { action: 'User A taps Unfollow on User B profile', data: 'A already follows B', expect: 'DELETE /follow returns 200; follow record removed' },
      { action: 'Assert count changes', data: '—', expect: 'followers_count(B)-1, following_count(A)-1' },
      { action: 'Assert button label', data: '—', expect: 'Button shows "Follow" again' },
    ],
    activePath: ['N2', 'N7', 'N12', 'N17'],
    activeEdges: [['N2', 'N7'], ['N7', 'N12'], ['N12', 'N17']],
  },
  {
    id: 'PP65-TC-005',
    typeCls: 'ep',
    type: 'Negative',
    name: 'Duplicate Unfollow — idempotent; no 5xx error',
    steps: [
      { action: 'User A unfollows User B (not following); tap Unfollow again', data: 'A does not follow B', expect: 'API returns 200 or 404 handled gracefully; no 5xx' },
    ],
    activePath: ['N2', 'N8', 'N18'],
    activeEdges: [['N2', 'N8'], ['N8', 'N18']],
  },
  {
    id: 'PP65-TC-006',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Followers list — paginated; avatar/name/status shown',
    steps: [
      { action: 'Open Followers list', data: 'User with 2+ pages of followers', expect: 'First page renders — avatar, display name, follow status visible' },
      { action: 'Scroll to bottom; trigger next page', data: '—', expect: 'Next page loads; no duplicate rows' },
    ],
    activePath: ['N3', 'N13'],
    activeEdges: [['N3', 'N13']],
  },
  {
    id: 'PP65-TC-007',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Following list — paginated; avatar/name/status shown',
    steps: [
      { action: 'Open Following list', data: 'User with 2+ pages of following', expect: 'First page renders correctly' },
      { action: 'Paginate to next page', data: '—', expect: 'Subsequent pages load without duplication' },
    ],
    activePath: ['N4', 'N13'],
    activeEdges: [['N4', 'N13']],
  },
  {
    id: 'PP65-TC-008',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Empty state shown when no Followers or Following',
    steps: [
      { action: 'Open Followers list on new account', data: 'New account with 0 followers', expect: 'Empty state message shown' },
      { action: 'Open Following list on same account', data: '—', expect: 'Empty state message shown' },
    ],
    activePath: ['N3', 'N14'],
    activeEdges: [['N3', 'N14']],
  },
  {
    id: 'PP65-TC-009',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Block User B — A cannot see B content; follow removed',
    steps: [
      { action: 'User A taps Block on User B profile', data: 'Mutual follow relationship exists', expect: 'Block created; follow relationship auto-removed' },
      { action: 'Assert A cannot see B profile/posts', data: '—', expect: 'B profile/posts hidden for A' },
    ],
    activePath: ['N1', 'N9', 'N19'],
    activeEdges: [['N1', 'N9'], ['N9', 'N19']],
  },
  {
    id: 'PP65-TC-010',
    typeCls: 'st',
    type: 'Functional',
    name: 'Block mutual — B gets 403/404 on A profile',
    steps: [
      { action: 'Block is active (A blocks B)', data: 'Block record exists', expect: 'B cannot see A content' },
      { action: 'B tries GET /profile/{userId A}', data: 'API call from B session', expect: 'API returns 403 or 404 for B' },
    ],
    activePath: ['N1', 'N9', 'N19'],
    activeEdges: [['N1', 'N9'], ['N9', 'N19']],
  },
];

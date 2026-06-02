import type { DagEdge, DagNode, Scenario } from '@/types';

// ── DAG Nodes ─────────────────────────────────────────────────────────────────
//
// col/row layout (0-based):
//
//  col:  0          1           2           3          4
//  row0  PUSH ──► BADGE? ──► BADGE_ON ──► FONT ──► IMG? ──► FULL_LAYOUT
//                       └──► BADGE_OFF            └──► NO_IMG ──► CARD_READY
//  row3  SINGLE ──► MORE? ──► STACKED ──► EXPAND ──► TAP? ──► DEEPLINK ──► TARGET
//                        └──► SINGLE             └──► IDLE         └──► FALLBACK
//  row5  STAMP ──► AGE? ──► MINS
//                      └──► HOURS
//                      └──► ABS_DATE

export const SM_NODES: DagNode[] = [
  // Layout rendering
  { id: 'N01', col: 0, row: 0, name: 'Push\nReceived',   type: 'action',   details: 'Push notification payload arrives on device.' },
  { id: 'N02', col: 1, row: 0, name: 'Badge\nCount > 0?', type: 'decision', details: 'Does the badge count in the payload exceed 0?' },
  { id: 'N03', col: 2, row: 0, name: 'Badge\nShown',     type: 'expect',   details: 'App icon shows numeric badge in Leading area.' },
  { id: 'N04', col: 2, row: 1, name: 'No\nBadge',        type: 'expect',   details: 'App icon shown without badge number.' },
  { id: 'N05', col: 3, row: 0, name: 'Font\nHierarchy',  type: 'action',   details: 'Title rendered Bold; body/subtitle rendered Regular weight.' },
  { id: 'N06', col: 4, row: 0, name: 'Image\nURL?',      type: 'decision', details: 'Does the payload contain a content image URL?' },
  { id: 'N07', col: 5, row: 0, name: 'Full\nLayout',     type: 'expect',   details: '3-column layout: Icon | Title+Body | Trailing image.' },
  { id: 'N08', col: 5, row: 1, name: 'Compact\nLayout',  type: 'expect',   details: '2-column layout: Icon | Title+Body (expanded width).' },
  { id: 'N09', col: 6, row: 0, name: 'Card\nReady',      type: 'expect',   details: 'Notification card fully rendered on Lock Screen.' },
  // Stacking
  { id: 'N10', col: 0, row: 3, name: 'Single\nCard',     type: 'expect',   details: 'First notification from app shown as standalone card.' },
  { id: 'N11', col: 1, row: 3, name: 'More\nFrom App?',  type: 'decision', details: 'Does another notification arrive from the same app?' },
  { id: 'N12', col: 2, row: 3, name: 'Stacked\nCards',   type: 'expect',   details: 'iOS groups notifications into stack view.' },
  { id: 'N13', col: 3, row: 3, name: 'Expand\nStack',    type: 'action',   details: 'User taps stack to expand individual cards.' },
  { id: 'N14', col: 4, row: 3, name: 'Cards\nVisible',   type: 'expect',   details: 'All individual notification cards visible after expansion.' },
  // Deep link
  { id: 'N15', col: 5, row: 3, name: 'Tap\nCard',        type: 'action',   details: 'User taps a notification card.' },
  { id: 'N16', col: 6, row: 3, name: 'Route\nResolved?', type: 'decision', details: 'Does the deep link path match a known in-app route?' },
  { id: 'N17', col: 7, row: 2, name: 'Target\nScreen',   type: 'expect',   details: 'App opens to the correct in-app screen.' },
  { id: 'N18', col: 7, row: 4, name: 'Home\nFallback',   type: 'expect',   details: 'Unknown route: app falls back to Home screen.' },
  // Timestamp
  { id: 'N19', col: 0, row: 6, name: 'Calc\nAge',        type: 'action',   details: 'Card calculates notification age from received_at timestamp.' },
  { id: 'N20', col: 1, row: 6, name: 'Age\nBracket?',    type: 'decision', details: 'Which time bracket does the notification age fall into?' },
  { id: 'N21', col: 2, row: 5, name: 'Xm ago\n< 1h',     type: 'expect',   details: 'Notification < 60 min: shown as "Xm ago" e.g. "5m ago".' },
  { id: 'N22', col: 2, row: 6, name: 'Xh ago\n1-23h',    type: 'expect',   details: 'Notification 1-23h old: shown as "Xh ago" e.g. "2h ago".' },
  { id: 'N23', col: 2, row: 7, name: 'Abs Date\n>= 24h', type: 'expect',   details: 'Notification >= 24h: shown as absolute date e.g. "May 14".' },
];

// ── DAG Edges ─────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N01', to: 'N02' },
  { from: 'N02', to: 'N03', label: 'count > 0' },
  { from: 'N02', to: 'N04', label: 'count = 0' },
  { from: 'N03', to: 'N05' },
  { from: 'N04', to: 'N05' },
  { from: 'N05', to: 'N06' },
  { from: 'N06', to: 'N07', label: 'image present' },
  { from: 'N06', to: 'N08', label: 'no image' },
  { from: 'N07', to: 'N09' },
  { from: 'N08', to: 'N09' },
  { from: 'N10', to: 'N11' },
  { from: 'N11', to: 'N12', label: 'yes' },
  { from: 'N11', to: 'N10', label: 'no' },
  { from: 'N12', to: 'N13', label: 'user expands' },
  { from: 'N13', to: 'N14' },
  { from: 'N14', to: 'N15', label: 'tap card' },
  { from: 'N15', to: 'N16' },
  { from: 'N16', to: 'N17', label: 'matched' },
  { from: 'N16', to: 'N18', label: 'not found' },
  { from: 'N19', to: 'N20' },
  { from: 'N20', to: 'N21', label: '< 60 min' },
  { from: 'N20', to: 'N22', label: '1-23h' },
  { from: 'N20', to: 'N23', label: '>= 24h' },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP122-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'App icon badge shown when notification count > 0',
    steps: [
      { action: 'Trigger push with badge count = 1', data: 'Payload: badge = 1, title, body', expect: 'App icon on Home Screen shows numeric badge = 1' },
    ],
    activePath: ['N01', 'N02', 'N03'],
    activeEdges: [['N01','N02'], ['N02','N03']],
  },
  {
    id: 'PP122-TC-002',
    typeCls: 'dt',
    type: 'Functional',
    name: 'App icon shows no badge when count = 0',
    steps: [
      { action: 'Trigger push with badge count = 0', data: 'Payload: badge = 0, title, body', expect: 'App icon shown without badge number' },
    ],
    activePath: ['N01', 'N02', 'N04'],
    activeEdges: [['N01','N02'], ['N02','N04']],
  },
  {
    id: 'PP122-TC-003',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Trailing image shown when content image URL is present',
    steps: [
      { action: 'Send push notification with valid attachment-url', data: 'mutable-content:1; valid attachment-url', expect: 'Notification card shows trailing square image; title and body visible' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N05', 'N06', 'N07', 'N09'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N05'], ['N05','N06'], ['N06','N07'], ['N07','N09']],
  },
  {
    id: 'PP122-TC-004',
    typeCls: 'dt',
    type: 'Functional',
    name: 'Trailing area hidden; body text expands when no image',
    steps: [
      { action: 'Send push notification without attachment-url', data: 'Standard payload; no image field', expect: 'Card has no trailing image; body text occupies full width' },
    ],
    activePath: ['N01', 'N02', 'N04', 'N05', 'N06', 'N08', 'N09'],
    activeEdges: [['N01','N02'], ['N02','N04'], ['N04','N05'], ['N05','N06'], ['N06','N08'], ['N08','N09']],
  },
  {
    id: 'PP122-TC-005',
    typeCls: 'manual',
    type: 'Functional',
    name: 'Title is Bold and body is Regular weight — with image',
    steps: [
      { action: 'Inspect card with trailing image', data: 'Push with image; physical iPhone', expect: 'Title text rendered in Bold weight; body/subtitle in Regular weight' },
    ],
    activePath: ['N05', 'N06', 'N07', 'N09'],
    activeEdges: [['N05','N06'], ['N06','N07'], ['N07','N09']],
  },
  {
    id: 'PP122-TC-006',
    typeCls: 'manual',
    type: 'Functional',
    name: 'Title is Bold and body is Regular weight — without image',
    steps: [
      { action: 'Inspect card without trailing image', data: 'Push without image; physical iPhone', expect: 'Title in Bold; body in Regular; body expands to full card width' },
    ],
    activePath: ['N05', 'N06', 'N08', 'N09'],
    activeEdges: [['N05','N06'], ['N06','N08'], ['N08','N09']],
  },
  {
    id: 'PP122-TC-007',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Single notification shows as standalone card',
    steps: [
      { action: 'Send one push notification to device with empty notification centre', data: 'Single push payload', expect: 'Notification shown as individual standalone card on Lock Screen' },
    ],
    activePath: ['N01', 'N02', 'N09', 'N10'],
    activeEdges: [['N01','N02'], ['N02','N09'], ['N09','N10']],
  },
  {
    id: 'PP122-TC-008',
    typeCls: 'st',
    type: 'Functional',
    name: 'Two notifications from same app stack into iOS group',
    steps: [
      { action: 'Send a second push from the same app while first is on Lock Screen', data: '2 notifications from POPPA app', expect: 'iOS groups them into a stack view (stacked card style)' },
    ],
    activePath: ['N10', 'N11', 'N12'],
    activeEdges: [['N10','N11'], ['N11','N12']],
  },
  {
    id: 'PP122-TC-009',
    typeCls: 'st',
    type: 'Functional',
    name: 'Tapping stack expands to individual notification cards',
    steps: [
      { action: 'Tap the stacked notification group on Lock Screen', data: 'Stack of 2+ notifications', expect: 'Stack expands; each notification card visible individually' },
    ],
    activePath: ['N12', 'N13', 'N14'],
    activeEdges: [['N12','N13'], ['N13','N14']],
  },
  {
    id: 'PP122-TC-010',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Tapping notification navigates to the correct in-app screen via deep link',
    steps: [
      { action: 'Tap a notification card with known deep link', data: 'poppa://event/{eventId}', expect: 'App opens; Event Detail screen shown for the correct event' },
    ],
    activePath: ['N15', 'N16', 'N17'],
    activeEdges: [['N15','N16'], ['N16','N17']],
  },
  {
    id: 'PP122-TC-011',
    typeCls: 'dt',
    type: 'Functional',
    name: 'Different deep link paths route to correct screens',
    steps: [
      { action: 'Send push with deep link to Profile screen', data: 'poppa://profile/{userId}', expect: 'App opens Profile screen for the user' },
      { action: 'Send push with deep link to Home', data: 'poppa://home', expect: 'App opens Home screen' },
    ],
    activePath: ['N15', 'N16', 'N17'],
    activeEdges: [['N15','N16'], ['N16','N17']],
  },
  {
    id: 'PP122-TC-012',
    typeCls: 'st',
    type: 'Negative',
    name: 'Unknown deep link route falls back to Home screen',
    steps: [
      { action: 'Send push with an unrecognised deep link path', data: 'poppa://unknown/does-not-exist', expect: 'App opens and falls back to Home screen' },
    ],
    activePath: ['N15', 'N16', 'N18'],
    activeEdges: [['N15','N16'], ['N16','N18']],
  },
  {
    id: 'PP122-TC-013',
    typeCls: 'bva',
    type: 'Functional',
    name: 'Notification < 60 min shows "Xm ago" format',
    steps: [
      { action: 'Receive push and observe timestamp within 5 minutes', data: 'Push received < 60 min ago', expect: 'Timestamp shown as "Xm ago" e.g. "5m ago"' },
    ],
    activePath: ['N19', 'N20', 'N21'],
    activeEdges: [['N19','N20'], ['N20','N21']],
  },
  {
    id: 'PP122-TC-014',
    typeCls: 'bva',
    type: 'Functional',
    name: 'Notification 1-23h old shows "Xh ago" format',
    steps: [
      { action: 'Advance device clock by 2 hours after push; observe timestamp', data: 'Push age = 2h (advance device clock)', expect: 'Timestamp shown as "2h ago"' },
    ],
    activePath: ['N19', 'N20', 'N22'],
    activeEdges: [['N19','N20'], ['N20','N22']],
  },
  {
    id: 'PP122-TC-015',
    typeCls: 'bva',
    type: 'Functional',
    name: 'Notification >= 24h shows absolute date format',
    steps: [
      { action: 'Advance device clock by 25 hours after push; observe timestamp', data: 'Push age = 25h (advance device clock)', expect: 'Timestamp shown as absolute date e.g. "May 14"' },
    ],
    activePath: ['N19', 'N20', 'N23'],
    activeEdges: [['N19','N20'], ['N20','N23']],
  },
];

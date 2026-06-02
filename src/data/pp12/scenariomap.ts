import type { DagEdge, DagNode, Scenario } from '@/types';

// ── DAG Nodes ─────────────────────────────────────────────────────────────────
//
// col/row layout (0-based):
//
//  col:  0        1         2         3         4         5
//  row0  LAUNCH→FETCH →FETCH_OK→ COMPARE→ DIALOG→ FORCE
//                   ↓ (fail)         ↓         ↓
//  row1          FALLBACK         HOME      SOFT  → STORE
//                                             ↓ (skip)
//  row2                                      HOME

export const SM_NODES: DagNode[] = [
  { id: 'N01', col: 0, row: 0, name: 'App\nLaunch',       type: 'action',   details: 'User launches the app; Remote Config fetch is triggered.' },
  { id: 'N02', col: 1, row: 0, name: 'Fetch\nConfig',      type: 'action',   details: 'App calls Firebase Remote Config to retrieve versionApp, isForceUpdate, storeUrl.' },
  { id: 'N03', col: 2, row: 0, name: 'Fetch\nOK?',         type: 'decision', details: 'Did the Firebase fetch succeed or fail?' },
  { id: 'N04', col: 2, row: 1, name: 'Use\nFallback',      type: 'action',   details: 'Fetch failed — app uses cached or default config values.' },
  { id: 'N05', col: 3, row: 0, name: 'Compare\nVersion',   type: 'decision', details: 'Compare installed app version against versionApp from Remote Config.' },
  { id: 'N06', col: 4, row: 0, name: 'Force\nUpdate?',     type: 'decision', details: 'Version is outdated — check isForceUpdate flag.' },
  { id: 'N07', col: 5, row: 0, name: 'Force\nDialog',      type: 'expect',   details: 'Force Update dialog shown — only "อัพเดท" button, cannot be dismissed.' },
  { id: 'N08', col: 5, row: 1, name: 'Soft\nDialog',       type: 'expect',   details: 'Soft Update dialog shown — "ข้าม" and "อัพเดท" buttons visible.' },
  { id: 'N09', col: 4, row: 1, name: 'Navigate\nHome',     type: 'expect',   details: 'App navigates to Home screen — version is up-to-date or user skipped.' },
  { id: 'N10', col: 6, row: 0, name: 'Open\nStore',        type: 'expect',   details: 'App Store (iOS) or Play Store (Android) opened via storeUrl.' },
];

// ── DAG Edges ─────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N01', to: 'N02', label: 'launch' },
  { from: 'N02', to: 'N03' },
  { from: 'N03', to: 'N04', label: 'fail' },
  { from: 'N03', to: 'N05', label: 'success' },
  { from: 'N04', to: 'N05', label: 'fallback' },
  { from: 'N05', to: 'N09', label: 'up-to-date' },
  { from: 'N05', to: 'N06', label: 'outdated' },
  { from: 'N06', to: 'N07', label: 'force=true' },
  { from: 'N06', to: 'N08', label: 'force=false' },
  { from: 'N08', to: 'N09', label: 'tap ข้าม' },
  { from: 'N07', to: 'N10', label: 'tap อัพเดท' },
  { from: 'N08', to: 'N10', label: 'tap อัพเดท' },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP12-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'App fetches all required Remote Config keys on launch',
    steps: [
      { action: 'Launch app on STG device', data: 'STG build; valid Firebase project', expect: 'App initialises and connects to Firebase Remote Config' },
      { action: 'Observe config fetch', data: 'versionApp, isForceUpdate, storeUrl keys', expect: 'All three keys fetched successfully and non-empty' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N05', 'N09'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N05'], ['N05','N09']],
  },
  {
    id: 'PP12-TC-002',
    typeCls: 'manual',
    type: 'Negative',
    name: 'App falls back to cached/default values when fetch fails — no crash',
    steps: [
      { action: 'Disable network on device and launch app', data: 'Airplane mode / blocked network', expect: 'App starts; Firebase fetch fails' },
      { action: 'Observe behaviour', data: '—', expect: 'App uses cached/default values; no crash; proceeds normally' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N04', 'N05', 'N09'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N04'], ['N04','N05'], ['N05','N09']],
  },
  {
    id: 'PP12-TC-003',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'App navigates to Home when current version is up-to-date',
    steps: [
      { action: 'Set versionApp in Remote Config equal to installed version', data: 'versionApp = installed app version', expect: 'Config fetched successfully' },
      { action: 'Launch app', data: '—', expect: 'No update dialog shown; app navigates directly to Home' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N05', 'N09'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N05'], ['N05','N09']],
  },
  {
    id: 'PP12-TC-004',
    typeCls: 'dt',
    type: 'Functional',
    name: 'Soft Update dialog shown when version outdated and isForceUpdate = false',
    steps: [
      { action: 'Set versionApp > installed version; isForceUpdate = false', data: 'versionApp = "9.9.9"; isForceUpdate = false', expect: 'Config fetched' },
      { action: 'Launch app', data: '—', expect: 'Soft Update dialog shown with "ข้าม" and "อัพเดท" buttons' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N05', 'N06', 'N08'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N05'], ['N05','N06'], ['N06','N08']],
  },
  {
    id: 'PP12-TC-005',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Force Update dialog shows only "อัพเดท" and cannot be dismissed when isForceUpdate = true',
    steps: [
      { action: 'Set versionApp > installed; isForceUpdate = true', data: 'versionApp = "9.9.9"; isForceUpdate = true', expect: 'Config fetched' },
      { action: 'Launch app', data: '—', expect: 'Force Update dialog shown — only "อัพเดท" button; back gesture/tap outside does not dismiss' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N05', 'N06', 'N07'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N05'], ['N05','N06'], ['N06','N07']],
  },
  {
    id: 'PP12-TC-006',
    typeCls: 'st',
    type: 'Functional',
    name: 'Tapping "ข้าม" on Soft Update dialog navigates to Home without opening store',
    steps: [
      { action: 'Trigger Soft Update dialog (isForceUpdate = false, version outdated)', data: 'versionApp = "9.9.9"; isForceUpdate = false', expect: 'Soft Update dialog displayed' },
      { action: 'Tap "ข้าม" button', data: '—', expect: 'Dialog dismissed; app navigates to Home; store NOT opened' },
    ],
    activePath: ['N06', 'N08', 'N09'],
    activeEdges: [['N06','N08'], ['N08','N09']],
  },
  {
    id: 'PP12-TC-007',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Tapping "อัพเดท" opens App Store on iOS device',
    steps: [
      { action: 'Trigger update dialog on iOS device', data: 'iOS device; storeUrl = App Store URL', expect: 'Update dialog shown' },
      { action: 'Tap "อัพเดท" button', data: '—', expect: 'App Store opens at the correct app listing' },
    ],
    activePath: ['N07', 'N10'],
    activeEdges: [['N07','N10']],
  },
  {
    id: 'PP12-TC-008',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Tapping "อัพเดท" opens Play Store on Android device',
    steps: [
      { action: 'Trigger update dialog on Android device', data: 'Android device; storeUrl = Play Store URL', expect: 'Update dialog shown' },
      { action: 'Tap "อัพเดท" button', data: '—', expect: 'Play Store opens at the correct app listing' },
    ],
    activePath: ['N08', 'N10'],
    activeEdges: [['N08','N10']],
  },
];

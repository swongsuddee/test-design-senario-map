import type { DagEdge, DagNode, Scenario } from '@/types';

// ── DAG Nodes ─────────────────────────────────────────────────────────────────
//
// col/row layout (0-based):
//
//  col:  0        1         2         3         4
//  row0  PROJECT→ INSTALL→ CONFIG → FLAVOR→ PLATFORM→ CONNECT
//                                               ↓
//  row1                              MISCONFIG (error path)

export const SM_NODES: DagNode[] = [
  { id: 'N01', col: 0, row: 0, name: 'Flutter\nProject',    type: 'action',   details: 'Flutter project without Firebase SDK.' },
  { id: 'N02', col: 1, row: 0, name: 'Install\nSDK',        type: 'action',   details: 'Add firebase_core and related packages to pubspec.yaml; place config files.' },
  { id: 'N03', col: 2, row: 0, name: 'Init\nApp',           type: 'action',   details: 'Call Firebase.initializeApp() at app startup.' },
  { id: 'N04', col: 3, row: 0, name: 'Select\nFlavor',      type: 'decision', details: 'Choose build flavor: Dev / Staging / UAT / Prod.' },
  { id: 'N05', col: 4, row: 0, name: 'Platform\nCheck',     type: 'decision', details: 'Which platform is the build targeting — iOS or Android?' },
  { id: 'N06', col: 5, row: 0, name: 'Firebase\nConnected', type: 'expect',   details: 'Firebase successfully connected to correct project for the selected flavor and platform.' },
  { id: 'N07', col: 5, row: 1, name: 'Config\nError',       type: 'expect',   details: 'Missing or incorrect config file — meaningful error shown, no silent crash.' },
  { id: 'N08', col: 2, row: 1, name: 'Build\nFails',        type: 'expect',   details: 'SDK integration error — build fails with clear error output.' },
];

// ── DAG Edges ─────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N01', to: 'N02', label: 'add packages' },
  { from: 'N02', to: 'N03', label: 'files placed' },
  { from: 'N03', to: 'N04', label: 'build OK' },
  { from: 'N03', to: 'N08', label: 'build fails' },
  { from: 'N04', to: 'N05', label: 'flavor set' },
  { from: 'N05', to: 'N06', label: 'connects' },
  { from: 'N05', to: 'N07', label: 'misconfigured' },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP13-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Firebase SDK is correctly installed and initialised — build succeeds',
    steps: [
      { action: 'Add firebase_core and required packages to pubspec.yaml', data: 'pubspec.yaml; google-services.json; GoogleService-Info.plist in correct dirs', expect: 'Packages resolve without errors' },
      { action: 'Call Firebase.initializeApp() at app startup and build', data: 'flutter build (any flavor)', expect: 'Build succeeds; no SDK-related errors in output' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N04', 'N05', 'N06'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N04'], ['N04','N05'], ['N05','N06']],
  },
  {
    id: 'PP13-TC-002',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'App builds and runs on iOS and Android without Firebase errors',
    steps: [
      { action: 'Build and run app on iOS Simulator', data: 'STG flavor', expect: 'App launches; no Firebase runtime errors in console' },
      { action: 'Build and run app on Android Emulator', data: 'STG flavor', expect: 'App launches; no Firebase runtime errors in logcat' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N04', 'N05', 'N06'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N04'], ['N04','N05'], ['N05','N06']],
  },
  {
    id: 'PP13-TC-003',
    typeCls: 'dt',
    type: 'Functional',
    name: 'Firebase connects to correct Dev project when Dev flavor is built',
    steps: [
      { action: 'Build app with Dev flavor on iOS and Android', data: 'flutter run --flavor dev', expect: 'App launches' },
      { action: 'Check Firebase console / startup log for project ID', data: 'Dev Firebase project ID', expect: 'App connects to Dev Firebase project only — no staging/prod data' },
    ],
    activePath: ['N04', 'N05', 'N06'],
    activeEdges: [['N04','N05'], ['N05','N06']],
  },
  {
    id: 'PP13-TC-004',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Firebase connects to correct Staging project when Staging flavor is built',
    steps: [
      { action: 'Build app with Staging flavor on iOS and Android', data: 'flutter run --flavor staging', expect: 'App launches' },
      { action: 'Check Firebase console / startup log for project ID', data: 'Staging Firebase project ID', expect: 'App connects to Staging Firebase project only' },
    ],
    activePath: ['N04', 'N05', 'N06'],
    activeEdges: [['N04','N05'], ['N05','N06']],
  },
  {
    id: 'PP13-TC-005',
    typeCls: 'dt',
    type: 'Functional',
    name: 'Firebase connects to correct UAT project when UAT flavor is built',
    steps: [
      { action: 'Build app with UAT flavor on iOS and Android', data: 'flutter run --flavor uat', expect: 'App launches' },
      { action: 'Check Firebase console / startup log for project ID', data: 'UAT Firebase project ID', expect: 'App connects to UAT Firebase project only' },
    ],
    activePath: ['N04', 'N05', 'N06'],
    activeEdges: [['N04','N05'], ['N05','N06']],
  },
  {
    id: 'PP13-TC-006',
    typeCls: 'dt',
    type: 'Functional',
    name: 'Firebase connects to correct Prod project — no dev/staging data written',
    steps: [
      { action: 'Build app with Prod flavor on iOS and Android', data: 'flutter run --flavor prod', expect: 'App launches' },
      { action: 'Check Firebase console / startup log for project ID', data: 'Prod Firebase project ID', expect: 'App connects to Prod project; no dev or staging events written' },
    ],
    activePath: ['N04', 'N05', 'N06'],
    activeEdges: [['N04','N05'], ['N05','N06']],
  },
  {
    id: 'PP13-TC-007',
    typeCls: 'manual',
    type: 'Negative',
    name: 'App shows meaningful error when Firebase config file is missing — no silent crash',
    steps: [
      { action: 'Remove google-services.json from one flavor directory and build', data: 'Misconfigured flavor directory', expect: 'Build fails or app throws visible error on launch' },
      { action: 'Observe error output', data: '—', expect: 'Meaningful error message displayed; app does not silently crash' },
    ],
    activePath: ['N04', 'N05', 'N07'],
    activeEdges: [['N04','N05'], ['N05','N07']],
  },
];

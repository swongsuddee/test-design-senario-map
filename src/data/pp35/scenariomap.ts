import type { DagEdge, DagNode, Scenario } from '@/types';

// ── DAG Nodes ─────────────────────────────────────────────────────────────────
//
// col/row layout (0-based):
//
//  col:  0        1         2         3         4         5
//  row0  ASSET → CONFIG → FLAVOR → PLATFORM→ ICON_OK → SPLASH_OK
//                                     ↓(icon fail)→ ICON_ERR
//  row1                                          ↓(splash fail)→ SPLASH_ERR
//  row2                    NEGATIVE: wrong icon / stuck splash

export const SM_NODES: DagNode[] = [
  { id: 'N01', col: 0, row: 0, name: 'Asset\nReady',       type: 'action',   details: 'App Icon (≥1024×1024 px, 1:1) and Splash logo/color assets prepared.' },
  { id: 'N02', col: 1, row: 0, name: 'Tool\nConfig',       type: 'action',   details: 'flutter_launcher_icons and flutter_native_splash configured per flavor.' },
  { id: 'N03', col: 2, row: 0, name: 'Select\nFlavor',     type: 'decision', details: 'Select build flavor: Dev / Staging / UAT / Prod.' },
  { id: 'N04', col: 3, row: 0, name: 'Platform\nTarget',   type: 'decision', details: 'Target platform: iOS Simulator or Android Emulator/Device.' },
  { id: 'N05', col: 4, row: 0, name: 'Icon\nCorrect?',     type: 'decision', details: 'Does the app icon on the launcher match the expected flavor icon?' },
  { id: 'N06', col: 5, row: 0, name: 'Splash\nCorrect?',   type: 'decision', details: 'Does the native splash display correctly (centered, no flicker, correct BG)?' },
  { id: 'N07', col: 6, row: 0, name: 'Pass',               type: 'expect',   details: 'All visuals verified — icon and splash correct for the flavor and platform.' },
  { id: 'N08', col: 5, row: 1, name: 'Icon\nError',        type: 'expect',   details: 'Wrong icon shown for flavor (misconfiguration).' },
  { id: 'N09', col: 6, row: 1, name: 'Splash\nError',      type: 'expect',   details: 'Splash flickers, shows wrong ratio, or remains stuck.' },
];

// ── DAG Edges ─────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N01', to: 'N02', label: 'assets ready' },
  { from: 'N02', to: 'N03', label: 'config done' },
  { from: 'N03', to: 'N04', label: 'flavor chosen' },
  { from: 'N04', to: 'N05', label: 'build + install' },
  { from: 'N05', to: 'N06', label: 'icon OK' },
  { from: 'N05', to: 'N08', label: 'wrong icon' },
  { from: 'N06', to: 'N07', label: 'splash OK' },
  { from: 'N06', to: 'N09', label: 'splash fail' },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP35-TC-001',
    typeCls: 'ep',
    type: 'Functional',
    name: 'App Icon source asset meets size and ratio requirements; splash logo and color defined',
    steps: [
      { action: 'Verify icon source file dimensions', data: 'Brand icon PNG file', expect: 'File is ≥ 1024×1024 px with 1:1 aspect ratio' },
      { action: 'Verify splash logo and background color are specified in config', data: 'flutter_native_splash.yaml', expect: 'Splash logo path and background hex color defined' },
    ],
    activePath: ['N01', 'N02'],
    activeEdges: [['N01','N02']],
  },
  {
    id: 'PP35-TC-002',
    typeCls: 'dt',
    type: 'Functional',
    name: 'Dev flavor displays correct labeled icon on Android Emulator and iOS Simulator',
    steps: [
      { action: 'Build Dev flavor and install on Android Emulator and iOS Simulator', data: 'flutter_launcher_icons — Dev config', expect: 'App installed on both platforms' },
      { action: 'Check app icon on launcher/home screen', data: '—', expect: 'Icon shows "Dev" label on both platforms; correct flavor icon' },
    ],
    activePath: ['N02', 'N03', 'N04', 'N05', 'N06', 'N07'],
    activeEdges: [['N02','N03'], ['N03','N04'], ['N04','N05'], ['N05','N06'], ['N06','N07']],
  },
  {
    id: 'PP35-TC-003',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Staging flavor displays correct labeled icon on Android Emulator and iOS Simulator',
    steps: [
      { action: 'Build Staging flavor and install on Android Emulator and iOS Simulator', data: 'flutter_launcher_icons — Staging config', expect: 'App installed on both platforms' },
      { action: 'Check app icon on launcher/home screen', data: '—', expect: 'Icon shows "Staging" label on both platforms' },
    ],
    activePath: ['N02', 'N03', 'N04', 'N05', 'N06', 'N07'],
    activeEdges: [['N02','N03'], ['N03','N04'], ['N04','N05'], ['N05','N06'], ['N06','N07']],
  },
  {
    id: 'PP35-TC-004',
    typeCls: 'dt',
    type: 'Functional',
    name: 'UAT flavor displays correct labeled icon on Android Emulator and iOS Simulator',
    steps: [
      { action: 'Build UAT flavor and install on Android Emulator and iOS Simulator', data: 'flutter_launcher_icons — UAT config', expect: 'App installed on both platforms' },
      { action: 'Check app icon on launcher/home screen', data: '—', expect: 'Icon shows "UAT" label on both platforms' },
    ],
    activePath: ['N02', 'N03', 'N04', 'N05', 'N06', 'N07'],
    activeEdges: [['N02','N03'], ['N03','N04'], ['N04','N05'], ['N05','N06'], ['N06','N07']],
  },
  {
    id: 'PP35-TC-005',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Prod flavor displays standard brand icon without environment labels on both platforms',
    steps: [
      { action: 'Build Prod flavor and install on Android Emulator and iOS Simulator', data: 'flutter_launcher_icons — Prod config', expect: 'App installed on both platforms' },
      { action: 'Check app icon on launcher/home screen', data: '—', expect: 'Standard brand icon shown with no "Dev"/"Staging"/"UAT" label' },
    ],
    activePath: ['N02', 'N03', 'N04', 'N05', 'N06', 'N07'],
    activeEdges: [['N02','N03'], ['N03','N04'], ['N04','N05'], ['N05','N06'], ['N06','N07']],
  },
  {
    id: 'PP35-TC-006',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Native Splash Screen displays correctly on iOS (no flicker, centered, correct background)',
    steps: [
      { action: 'Launch any flavor build on iOS Simulator or physical iPhone', data: 'flutter_native_splash configured; correct logo and BG color', expect: 'Splash Screen appears immediately on launch' },
      { action: 'Observe splash screen rendering', data: '—', expect: 'Logo is centered; background color correct; no flicker; transitions to next screen smoothly' },
    ],
    activePath: ['N02', 'N04', 'N05', 'N06', 'N07'],
    activeEdges: [['N02','N04'], ['N04','N05'], ['N05','N06'], ['N06','N07']],
  },
  {
    id: 'PP35-TC-007',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Native Splash Screen displays correctly on Android (no flicker, centered, correct background)',
    steps: [
      { action: 'Launch any flavor build on Android Emulator or physical Android phone', data: 'flutter_native_splash configured; correct logo and BG color', expect: 'Splash Screen appears immediately on launch' },
      { action: 'Observe splash screen rendering', data: '—', expect: 'Logo is centered; background color correct; no flicker; transitions to next screen smoothly' },
    ],
    activePath: ['N02', 'N04', 'N05', 'N06', 'N07'],
    activeEdges: [['N02','N04'], ['N04','N05'], ['N05','N06'], ['N06','N07']],
  },
  {
    id: 'PP35-TC-008',
    typeCls: 'ep',
    type: 'Functional',
    name: 'All flavors show correct icon and splash on physical devices (iOS and Android)',
    steps: [
      { action: 'Install all 4 flavor builds on physical iPhone and physical Android phone', data: 'Dev / Staging / UAT / Prod builds', expect: 'All 4 flavors installed' },
      { action: 'Verify icon and splash for each flavor on each device', data: '—', expect: 'Each flavor shows correct labeled/unlabeled icon and splash; no hardware-specific rendering issues' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N04', 'N05', 'N06', 'N07'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N04'], ['N04','N05'], ['N05','N06'], ['N06','N07']],
  },
  {
    id: 'PP35-TC-009',
    typeCls: 'manual',
    type: 'Negative',
    name: 'Incorrect icon displayed for a flavor when icon config is misconfigured',
    steps: [
      { action: 'Intentionally misconfigure flutter_launcher_icons for one flavor (swap icon paths)', data: 'Misconfigured flavor YAML', expect: 'Build completes' },
      { action: 'Check launcher icon for the misconfigured flavor', data: '—', expect: 'Wrong icon displayed — defect identified; test fails as expected' },
    ],
    activePath: ['N03', 'N04', 'N05', 'N08'],
    activeEdges: [['N03','N04'], ['N04','N05'], ['N05','N08']],
  },
  {
    id: 'PP35-TC-010',
    typeCls: 'manual',
    type: 'Negative',
    name: 'Splash screen flickers or remains stuck when misconfigured',
    steps: [
      { action: 'Set incorrect duration or remove splash asset from flutter_native_splash config', data: 'Misconfigured flutter_native_splash.yaml', expect: 'Build completes' },
      { action: 'Launch app and observe splash', data: '—', expect: 'Splash flickers, shows wrong ratio, or remains stuck — defect identified' },
    ],
    activePath: ['N04', 'N05', 'N06', 'N09'],
    activeEdges: [['N04','N05'], ['N05','N06'], ['N06','N09']],
  },
];

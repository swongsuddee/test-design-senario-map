import type { DagEdge, DagNode, Scenario } from '@/types';

// ── DAG Nodes ─────────────────────────────────────────────────────────────────
//
// col/row layout (0-based):
//
//  col:  0        1         2         3         4         5
//  row0  SCOPE → EVAL → SELECTED→ INTEGRATE→ CHAT_UI→ SEND_MSG→ RECV_MSG→ DOC
//                  ↓(no solution)→ DOC (no-solution path)
//  row1                              ↓(failure)→ FAIL

export const SM_NODES: DagNode[] = [
  { id: 'N01', col: 0, row: 0, name: 'POC\nScope',         type: 'action',   details: 'POC scope defined — evaluate an open-source/third-party chat solution for the platform.' },
  { id: 'N02', col: 1, row: 0, name: 'Evaluate\nOptions',  type: 'action',   details: 'Research and assess chat solution candidates (platform compat, cost, SDK).' },
  { id: 'N03', col: 2, row: 0, name: 'Solution\nFound?',   type: 'decision', details: 'Is a suitable solution identified after evaluation?' },
  { id: 'N04', col: 3, row: 0, name: 'Integrate\nSDK',     type: 'action',   details: 'Add chosen chat SDK to Flutter app; configure and initialise.' },
  { id: 'N05', col: 4, row: 0, name: 'Chat\nUI Ready',     type: 'expect',   details: 'Chat UI screen is accessible in the app after SDK integration.' },
  { id: 'N06', col: 5, row: 0, name: 'Send\nMessage',      type: 'action',   details: 'User opens a chat room and types and sends a text message.' },
  { id: 'N07', col: 6, row: 0, name: 'Message\nDelivered', type: 'expect',   details: 'Message received and displayed for the other participant.' },
  { id: 'N08', col: 7, row: 0, name: 'POC\nDocument',      type: 'expect',   details: 'POC conclusion report completed and shared with team.' },
  { id: 'N09', col: 3, row: 1, name: 'SDK\nError',         type: 'expect',   details: 'Integration fails — SDK error or UI crash; handled gracefully, no silent crash.' },
];

// ── DAG Edges ─────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N01', to: 'N02', label: 'start eval' },
  { from: 'N02', to: 'N03', label: 'analysis done' },
  { from: 'N03', to: 'N04', label: 'solution chosen' },
  { from: 'N03', to: 'N08', label: 'no solution' },
  { from: 'N04', to: 'N05', label: 'integrated' },
  { from: 'N04', to: 'N09', label: 'SDK fails' },
  { from: 'N05', to: 'N06', label: 'open chat' },
  { from: 'N06', to: 'N07', label: 'send' },
  { from: 'N07', to: 'N08', label: 'POC done' },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP36-TC-001',
    typeCls: 'manual',
    type: 'Functional',
    name: 'Chat solution candidates are evaluated and a recommendation is made',
    steps: [
      { action: 'Identify candidate chat solutions (e.g. Firebase RTDB, Stream Chat, Sendbird)', data: 'POC scope document', expect: 'List of candidates documented' },
      { action: 'Evaluate each candidate against platform compat, cost, SDK support', data: 'Evaluation criteria', expect: 'Analysis document produced; recommendation made' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N04'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N04']],
  },
  {
    id: 'PP36-TC-002',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Chat UI screen is accessible in the app after SDK integration',
    steps: [
      { action: 'Add chosen chat SDK to pubspec.yaml and configure', data: 'Selected chat SDK package', expect: 'SDK installed; build succeeds' },
      { action: 'Navigate to Chat screen in app', data: 'POC build on device/simulator', expect: 'Chat UI screen rendered without errors' },
    ],
    activePath: ['N03', 'N04', 'N05'],
    activeEdges: [['N03','N04'], ['N04','N05']],
  },
  {
    id: 'PP36-TC-003',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'User can type and send a text message in the chat',
    steps: [
      { action: 'Open chat room / conversation in the Chat screen', data: 'Pre-configured test chat room', expect: 'Chat room opens' },
      { action: 'Type a message in the input field and tap Send', data: 'Text: "Hello POC"', expect: 'Message displayed in chat bubble; no error' },
    ],
    activePath: ['N05', 'N06'],
    activeEdges: [['N05','N06']],
  },
  {
    id: 'PP36-TC-004',
    typeCls: 'st',
    type: 'Functional',
    name: 'Message sent by one user is received and displayed for another user',
    steps: [
      { action: 'User A sends a text message in a shared chat room', data: 'Two STG test accounts on two devices', expect: 'Message sent by User A visible in their chat' },
      { action: 'Observe User B device for message arrival', data: '—', expect: 'Message appears in User B chat within a few seconds' },
    ],
    activePath: ['N06', 'N07'],
    activeEdges: [['N06','N07']],
  },
  {
    id: 'PP36-TC-005',
    typeCls: 'manual',
    type: 'Negative',
    name: 'App handles chat SDK error gracefully without crashing',
    steps: [
      { action: 'Simulate SDK failure (disconnect network or provide invalid API key)', data: 'Airplane mode or misconfigured SDK credentials', expect: 'Chat SDK throws an error' },
      { action: 'Observe app behaviour', data: '—', expect: 'App shows a user-friendly error message; app does not crash or freeze' },
    ],
    activePath: ['N04', 'N09'],
    activeEdges: [['N04','N09']],
  },
  {
    id: 'PP36-TC-006',
    typeCls: 'manual',
    type: 'Functional',
    name: 'POC conclusion report is complete and shared with team',
    steps: [
      { action: 'Complete POC testing and compile findings', data: 'POC test results', expect: 'Feasibility, limitations, and risks documented' },
      { action: 'Share report with team (Confluence / Jira comment)', data: '—', expect: 'Report published and accessible to team; includes recommendation' },
    ],
    activePath: ['N07', 'N08'],
    activeEdges: [['N07','N08']],
  },
];

import type { DagEdge, DagNode, Scenario } from '@/types';

// ── Nodes ─────────────────────────────────────────────────────────────────────
// Columns: 0=entry  1=home  2=sections/check  3=outcome
// Rows:    0..5
export const SM_NODES: DagNode[] = [
  // col 0 — entry
  { id: 'N1', col: 0, row: 0, name: 'User\nAuthenticated', type: 'action',   details: 'User has valid session; app opens.' },
  { id: 'N2', col: 0, row: 3, name: 'Home\nPage Open',     type: 'action',   details: 'Home page fully rendered.' },

  // col 1 — home load
  { id: 'N3', col: 1, row: 0, name: 'Home Page\nLoading',  type: 'action',   details: 'API calls in-flight; sections rendering.' },
  { id: 'N4', col: 1, row: 1, name: 'Sections\nRendered',  type: 'expect',   details: 'All 5 main sections visible.' },
  { id: 'N5', col: 1, row: 3, name: 'Interests\nCheck',    type: 'decision', details: 'Does user have interests configured?' },
  { id: 'N6', col: 1, row: 5, name: 'Bottom\nMenu',        type: 'action',   details: '4-tab bottom navigation bar visible.' },

  // col 2 — decision / sub-state
  { id: 'N7',  col: 2, row: 2, name: 'CI / Brand\nCheck',     type: 'expect',   details: 'Logo, colour, typography match Figma spec.' },
  { id: 'N8',  col: 2, row: 3, name: 'Interests\nPresent',    type: 'action',   details: 'User has 1+ interests set.' },
  { id: 'N9',  col: 2, row: 4, name: 'No\nInterests',         type: 'action',   details: 'User has 0 interests configured.' },
  { id: 'N10', col: 2, row: 5, name: 'Nav Tab\nTapped',       type: 'decision', details: 'User taps one of 4 bottom-menu tabs.' },

  // col 3 — outcomes
  { id: 'N11', col: 3, row: 3, name: 'Personalised\nEvent List', type: 'expect', details: 'Event list filtered by user interests.' },
  { id: 'N12', col: 3, row: 4, name: 'Default\nEvent List',      type: 'expect', details: 'Unfiltered event list displayed.' },
  { id: 'N13', col: 3, row: 5, name: 'Destination\nPage',        type: 'expect', details: 'Search / Notifications / Profile page opens.' },
];

// ── Edges ─────────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N1',  to: 'N3',  label: 'Login success' },
  { from: 'N3',  to: 'N4',  label: 'APIs complete' },
  { from: 'N4',  to: 'N7',  label: 'Assert CI/Brand' },
  { from: 'N2',  to: 'N5',  label: 'Check interests' },
  { from: 'N5',  to: 'N8',  label: 'Has interests' },
  { from: 'N5',  to: 'N9',  label: 'No interests' },
  { from: 'N8',  to: 'N11', label: 'Filter applied' },
  { from: 'N9',  to: 'N12', label: 'No filter' },
  { from: 'N2',  to: 'N6',  label: 'Render menu' },
  { from: 'N6',  to: 'N10', label: 'Tap tab' },
  { from: 'N10', to: 'N2',  label: 'Home tab' },
  { from: 'N10', to: 'N13', label: 'Other tab' },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP209-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'All 5 home sections visible; CI branding correct',
    steps: [
      { action: 'Log in with valid STG account; navigate to Home', data: 'STG user credentials', expect: 'Home page loads' },
      { action: 'Assert all 5 sections visible', data: 'Search bar, Feed, Interest Group, Event List, Bottom Menu', expect: 'Each section container rendered and visible' },
      { action: 'Assert CI / Mood & Tone compliance', data: 'Figma node 1691-5924', expect: 'Logo, colour palette, typography match spec' },
    ],
    activePath: ['N1', 'N3', 'N4', 'N7'],
    activeEdges: [['N1', 'N3'], ['N3', 'N4'], ['N4', 'N7']],
  },
  {
    id: 'PP209-TC-002',
    typeCls: 'dt',
    type: 'Functional',
    name: 'Event list shows personalised events when interests set',
    steps: [
      { action: 'Open Home page with user that has interests configured', data: 'STG user with interests = [Running, Yoga]', expect: 'Discovery API called with interest filter params' },
      { action: 'Assert event cards match interest categories', data: '—', expect: 'At least 1 event card category matches user interests' },
    ],
    activePath: ['N2', 'N5', 'N8', 'N11'],
    activeEdges: [['N2', 'N5'], ['N5', 'N8'], ['N8', 'N11']],
  },
  {
    id: 'PP209-TC-003',
    typeCls: 'dt',
    type: 'Functional',
    name: 'Event list shows default events when no interests set',
    steps: [
      { action: 'Open Home page with user that has no interests', data: 'STG account with interests = []', expect: 'Discovery API called without interest filter' },
      { action: 'Assert default event list shown', data: '—', expect: 'Generic event list displayed (no filtering)' },
    ],
    activePath: ['N2', 'N5', 'N9', 'N12'],
    activeEdges: [['N2', 'N5'], ['N5', 'N9'], ['N9', 'N12']],
  },
  {
    id: 'PP209-TC-004',
    typeCls: 'st',
    type: 'Functional',
    name: 'Tapping Home tab stays on or reloads Home page',
    steps: [
      { action: 'With Home page open, tap Home tab in bottom menu', data: '—', expect: 'Screen remains on Home; no navigation away' },
    ],
    activePath: ['N2', 'N6', 'N10', 'N2'],
    activeEdges: [['N2', 'N6'], ['N6', 'N10'], ['N10', 'N2']],
  },
  {
    id: 'PP209-TC-005',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Tapping Search tab navigates to Search page',
    steps: [
      { action: 'Tap Search tab in bottom menu', data: '—', expect: 'App navigates to Search page' },
    ],
    activePath: ['N2', 'N6', 'N10', 'N13'],
    activeEdges: [['N2', 'N6'], ['N6', 'N10'], ['N10', 'N13']],
  },
  {
    id: 'PP209-TC-006',
    typeCls: 'st',
    type: 'Functional',
    name: 'Tapping Notifications tab navigates to Notifications page',
    steps: [
      { action: 'Tap Notifications tab in bottom menu', data: '—', expect: 'App navigates to Notifications page' },
    ],
    activePath: ['N2', 'N6', 'N10', 'N13'],
    activeEdges: [['N2', 'N6'], ['N6', 'N10'], ['N10', 'N13']],
  },
  {
    id: 'PP209-TC-007',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Tapping Profile tab navigates to Profile page',
    steps: [
      { action: 'Tap Profile tab in bottom menu', data: '—', expect: 'App navigates to Profile page' },
    ],
    activePath: ['N2', 'N6', 'N10', 'N13'],
    activeEdges: [['N2', 'N6'], ['N6', 'N10'], ['N10', 'N13']],
  },
];

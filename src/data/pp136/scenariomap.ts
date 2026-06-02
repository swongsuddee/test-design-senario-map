import type { DagEdge, DagNode, Scenario } from '@/types';

// ── DAG Nodes ─────────────────────────────────────────────────────────────────
//
// col/row layout (0-based):
//
//  col:  0          1          2          3          4          5
//  row0  LOGIN ──► PROFILE ──► TYPE? ──► INDIV ──► FIELD ──► UPLOAD_BTN ──► FILE_PICKER ──► TYPE_OK?
//                           └──► CORP ──► FIELD                                             └──► SIZE_OK? ──► PROGRESS ──► SUCCESS
//                                                                                    └──► INVAL_TYPE (error)
//                                                                                                   └──► SIZE_ERR (error)

export const SM_NODES: DagNode[] = [
  { id: 'N01', col: 0, row: 0, name: 'Agency\nLogin',       type: 'action',   details: 'Agency authenticates in POPPA Back Office.' },
  { id: 'N02', col: 1, row: 0, name: 'Profile\nPage',       type: 'action',   details: 'Agency opens Profile / Documents section.' },
  { id: 'N03', col: 2, row: 0, name: 'Agency\nType?',       type: 'decision', details: 'Is the account Individual or Corporate?' },
  { id: 'N04', col: 3, row: 0, name: 'Individual\nDocs',    type: 'action',   details: 'Individual Documents section rendered.' },
  { id: 'N05', col: 3, row: 1, name: 'Corporate\nDocs',     type: 'action',   details: 'Corporate Documents section rendered.' },
  { id: 'N06', col: 4, row: 0, name: 'Book Bank\nField',    type: 'expect',   details: 'Book Bank Upload field is visible for the resolved agency type.' },
  { id: 'N07', col: 5, row: 0, name: 'Select\nFile',        type: 'action',   details: 'Agency clicks Upload and selects a file from device.' },
  { id: 'N08', col: 6, row: 0, name: 'File\nType OK?',      type: 'decision', details: 'Is the file PDF, JPG, or PNG?' },
  { id: 'N09', col: 7, row: 1, name: 'Type\nRejected',      type: 'expect',   details: 'Unsupported file type (.exe, .zip, etc.) — error message shown.' },
  { id: 'N10', col: 7, row: 0, name: 'File\nSize OK?',      type: 'decision', details: 'Is the file size ≤ 10 MB?' },
  { id: 'N11', col: 8, row: 1, name: 'Size\nRejected',      type: 'expect',   details: 'File > 10 MB — error message shown.' },
  { id: 'N12', col: 8, row: 0, name: 'Upload\nProgress',    type: 'action',   details: 'POST /book-bank API call in progress.' },
  { id: 'N13', col: 9, row: 0, name: 'Upload\nSuccess',     type: 'expect',   details: 'Upload succeeds — preview / status shown; bookBankDocumentUrl set.' },
];

// ── DAG Edges ─────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N01', to: 'N02', label: 'logged in' },
  { from: 'N02', to: 'N03', label: 'page loads' },
  { from: 'N03', to: 'N04', label: 'Individual' },
  { from: 'N03', to: 'N05', label: 'Corporate' },
  { from: 'N04', to: 'N06' },
  { from: 'N05', to: 'N06' },
  { from: 'N06', to: 'N07', label: 'click Upload' },
  { from: 'N07', to: 'N08', label: 'file selected' },
  { from: 'N08', to: 'N09', label: 'invalid type' },
  { from: 'N08', to: 'N10', label: 'valid type' },
  { from: 'N10', to: 'N11', label: '>10 MB' },
  { from: 'N10', to: 'N12', label: '≤10 MB' },
  { from: 'N12', to: 'N13', label: 'API OK' },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP136-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Book Bank upload field visible for Individual Agency',
    steps: [
      { action: 'Log in with Individual Agency account', data: 'STG account with profileType = INDIVIDUAL', expect: 'Login succeeds' },
      { action: 'Navigate to Profile / Documents section', data: '—', expect: 'Page loads with Individual Documents section' },
      { action: 'Inspect Book Bank upload field', data: '—', expect: 'Book Bank Upload field is visible on the page' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N04', 'N06'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N04'], ['N04','N06']],
  },
  {
    id: 'PP136-TC-002',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Book Bank upload field visible for Corporate Agency',
    steps: [
      { action: 'Log in with Corporate Agency account', data: 'STG account with profileType = COMPANY', expect: 'Login succeeds' },
      { action: 'Navigate to Profile / Documents section', data: '—', expect: 'Page loads with Corporate Documents section' },
      { action: 'Inspect Book Bank upload field', data: '—', expect: 'Book Bank Upload field is visible on the page' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N05', 'N06'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N05'], ['N05','N06']],
  },
  {
    id: 'PP136-TC-003',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Upload valid PDF file (≤ 10 MB) succeeds',
    steps: [
      { action: 'Log in and navigate to Documents section', data: 'STG Individual or Corporate Agency account', expect: 'Book Bank Upload field visible' },
      { action: 'Click Upload Book Bank and select valid PDF', data: 'bookbank_valid.pdf — ≤ 10 MB', expect: 'File picker opens; file selected' },
      { action: 'Observe upload result', data: 'POST /book-bank', expect: 'Upload in progress then success; preview/status shown' },
      { action: 'Verify via API', data: 'GET /agency/profile', expect: 'bookBankDocumentUrl is non-null' },
    ],
    activePath: ['N06', 'N07', 'N08', 'N10', 'N12', 'N13'],
    activeEdges: [['N06','N07'], ['N07','N08'], ['N08','N10'], ['N10','N12'], ['N12','N13']],
  },
  {
    id: 'PP136-TC-004',
    typeCls: 'ep',
    type: 'Negative',
    name: 'Unsupported file type (.exe) is rejected with error message',
    steps: [
      { action: 'Navigate to Documents section; click Upload', data: 'STG Agency account', expect: 'File picker opens' },
      { action: 'Select invalid file type', data: 'bookbank_invalid.exe (or .zip)', expect: 'File selected in picker' },
      { action: 'Observe rejection', data: '—', expect: 'Error message shown for unsupported file type; no upload occurs' },
      { action: 'Verify via API', data: 'GET /agency/profile', expect: 'bookBankDocumentUrl remains null/unchanged' },
    ],
    activePath: ['N06', 'N07', 'N08', 'N09'],
    activeEdges: [['N06','N07'], ['N07','N08'], ['N08','N09']],
  },
  {
    id: 'PP136-TC-005',
    typeCls: 'bva',
    type: 'Negative',
    name: 'File exceeding 10 MB is rejected with error message',
    steps: [
      { action: 'Navigate to Documents section; click Upload', data: 'STG Agency account', expect: 'File picker opens' },
      { action: 'Select oversized file', data: 'bookbank_large.jpg — ~10.5 MB (boundary: just over 10 MB)', expect: 'File selected in picker' },
      { action: 'Observe rejection', data: '—', expect: 'Error message shown for file exceeding 10 MB; no upload occurs' },
      { action: 'Verify via API', data: 'GET /agency/profile', expect: 'bookBankDocumentUrl remains null/unchanged' },
    ],
    activePath: ['N06', 'N07', 'N08', 'N10', 'N11'],
    activeEdges: [['N06','N07'], ['N07','N08'], ['N08','N10'], ['N10','N11']],
  },
];

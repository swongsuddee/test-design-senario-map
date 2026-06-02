import type { DagEdge, DagNode, Scenario } from '@/types';

// ── DAG Nodes ─────────────────────────────────────────────────────────────────
// Layout (col = horizontal, row = vertical, 0-based)
//
//  col:  0           1           2           3           4
//  row0: ACCESS   -> RBAC_CHK -> RBAC_DENY (expect)
//  row1:                      -> PAGE_LOAD -> API_CALL  -> TABLE_OK (expect)
//  row2:                                              -> EMPTY_ST (expect)
//  row3:           SEARCH_IN -> MATCH_RES (expect)
//  row4:                      -> NO_MATCH (expect)
//  row5:           FILT_SEL  -> FILT_RES (expect)
//  row6:           REVIEW_BTN -> DETAIL_PG (expect)

export const SM_NODES: DagNode[] = [
  { id: 'N01', col: 0, row: 0, name: 'Admin\nAccesses',    type: 'action',   details: 'Admin navigates to Agency Verification Listing URL in BO.' },
  { id: 'N02', col: 1, row: 0, name: 'RBAC\nCheck',        type: 'decision', details: 'Middleware checks admin role; non-admin requests are rejected.' },
  { id: 'N03', col: 2, row: 0, name: 'Access\nDenied',     type: 'expect',   details: 'Non-admin gets redirect or 403 Forbidden.' },
  { id: 'N04', col: 2, row: 1, name: 'Page\nLoads',        type: 'action',   details: 'RBAC passes; page starts loading Agency data.' },
  { id: 'N05', col: 3, row: 1, name: 'API\nCall',          type: 'action',   details: 'GET /admin/organizers called with Admin JWT.' },
  { id: 'N06', col: 4, row: 1, name: 'Table\nShown',       type: 'expect',   details: 'Table renders with all columns: Agency Name, Type, Date, Status.' },
  { id: 'N07', col: 4, row: 2, name: 'Empty\nState',       type: 'expect',   details: 'API returns empty list; table shows placeholder "ยังไม่มีรายการ".' },
  { id: 'N08', col: 0, row: 3, name: 'Search\nInput',      type: 'action',   details: 'Admin types Agency name into the search field.' },
  { id: 'N09', col: 1, row: 3, name: 'Match\nFound',       type: 'expect',   details: 'Table filters to show only rows with the matching Agency name.' },
  { id: 'N10', col: 1, row: 4, name: 'No\nMatch',          type: 'expect',   details: 'No Agency matches keyword; empty state "ไม่พบข้อมูล" shown.' },
  { id: 'N11', col: 0, row: 5, name: 'Filter\nSelect',     type: 'action',   details: 'Admin selects a status from the Filter dropdown.' },
  { id: 'N12', col: 1, row: 5, name: 'Filter\nApplied',    type: 'expect',   details: 'Table shows only rows matching the selected status value.' },
  { id: 'N13', col: 0, row: 6, name: 'Review\nButton',     type: 'action',   details: 'Admin clicks the Review/ตรวจสอบ button on an Agency row.' },
  { id: 'N14', col: 1, row: 6, name: 'Detail\nPage',       type: 'expect',   details: 'Navigate to Agency Detail page (PP-170) with correct Agency ID.' },
];

// ── DAG Edges ─────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N01', to: 'N02'                              },
  { from: 'N02', to: 'N03', label: 'non-admin'         },
  { from: 'N02', to: 'N04', label: 'admin role'        },
  { from: 'N04', to: 'N05'                              },
  { from: 'N05', to: 'N06', label: 'has data'          },
  { from: 'N05', to: 'N07', label: 'empty list'        },
  { from: 'N06', to: 'N08'                              },
  { from: 'N06', to: 'N11'                              },
  { from: 'N06', to: 'N13'                              },
  { from: 'N08', to: 'N09', label: 'keyword matches'   },
  { from: 'N08', to: 'N10', label: 'no match'          },
  { from: 'N11', to: 'N12'                              },
  { from: 'N13', to: 'N14'                              },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP104-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Table renders all columns',
    steps: [
      { action: 'Login as Admin and open Agency Verification Listing', data: 'Admin JWT; STG with agency data', expect: 'Table visible; all columns present: Agency Name, Type, Date, Status' },
    ],
    activePath: ['N01', 'N02', 'N04', 'N05', 'N06'],
    activeEdges: [['N01','N02'], ['N02','N04'], ['N04','N05'], ['N05','N06']],
  },
  {
    id: 'PP104-TC-002',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Search by exact name → filtered',
    steps: [
      { action: 'Open listing; type exact Agency name in search field', data: 'Agency name that exists in STG', expect: 'Table filters; only matching Agency rows shown' },
    ],
    activePath: ['N01', 'N02', 'N04', 'N05', 'N06', 'N08', 'N09'],
    activeEdges: [['N01','N02'], ['N02','N04'], ['N04','N05'], ['N05','N06'], ['N06','N08'], ['N08','N09']],
  },
  {
    id: 'PP104-TC-003',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Partial keyword → partial match',
    steps: [
      { action: 'Type partial keyword in search field', data: 'Partial name substring (e.g. "Test")', expect: 'Table shows all rows containing keyword in Agency name' },
    ],
    activePath: ['N06', 'N08', 'N09'],
    activeEdges: [['N06','N08'], ['N08','N09']],
  },
  {
    id: 'PP104-TC-004',
    typeCls: 'ep',
    type: 'Negative',
    name: 'Unknown keyword → empty state',
    steps: [
      { action: 'Type a name that does not exist in any Agency record', data: 'Non-existent agency name string', expect: 'Table shows empty state "ไม่พบข้อมูล"' },
    ],
    activePath: ['N06', 'N08', 'N10'],
    activeEdges: [['N06','N08'], ['N08','N10']],
  },
  {
    id: 'PP104-TC-005',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Filter by status → correct rows',
    steps: [
      { action: 'Select each status value from the filter dropdown one at a time', data: 'PENDING_REVIEW / APPROVED / REJECTED / REQUESTED_MORE_INFO', expect: 'Table shows only rows matching the selected status for each selection' },
    ],
    activePath: ['N06', 'N11', 'N12'],
    activeEdges: [['N06','N11'], ['N11','N12']],
  },
  {
    id: 'PP104-TC-006',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Review button → Detail page',
    steps: [
      { action: 'Click the Review/ตรวจสอบ button on an Agency row', data: 'Agency row with known ID', expect: 'Navigate to Agency Detail page (PP-170); correct Agency ID in URL' },
    ],
    activePath: ['N06', 'N13', 'N14'],
    activeEdges: [['N06','N13'], ['N13','N14']],
  },
  {
    id: 'PP104-TC-007',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Empty list → empty state UI',
    steps: [
      { action: 'Open listing when API returns empty array', data: 'Clean STG or mock API returning []', expect: 'Table shows empty placeholder "ยังไม่มีรายการ"; no error thrown' },
    ],
    activePath: ['N01', 'N02', 'N04', 'N05', 'N07'],
    activeEdges: [['N01','N02'], ['N02','N04'], ['N04','N05'], ['N05','N07']],
  },
  {
    id: 'PP104-TC-008',
    typeCls: 'ep',
    type: 'Negative',
    name: 'Non-admin → 403 or redirect',
    steps: [
      { action: 'Access Verification Listing URL with non-admin credentials', data: 'Agency JWT or End-user JWT', expect: 'System redirects or returns 403 Forbidden; listing not accessible' },
    ],
    activePath: ['N01', 'N02', 'N03'],
    activeEdges: [['N01','N02'], ['N02','N03']],
  },
];

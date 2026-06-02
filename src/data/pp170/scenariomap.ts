import type { DagEdge, DagNode, Scenario } from '@/types';

// ── DAG Nodes ─────────────────────────────────────────────────────────────────
// Layout (col = horizontal, row = vertical, 0-based)
//
//  col:  0          1           2           3          4
//  row0: ADMIN   -> DETAIL   -> TYPE_CHK  -> CORP_DOC (expect)
//  row1:                                  -> IND_DOC  (expect)
//  row2:          REVIEW    -> DECISION  -> APPROVE   -> APPROVED (expect)
//  row3:                                -> REJECT_BTN -> REASON? -> NO_REASON (expect)
//  row4:                                                         -> WITH_RSN  -> REJECTED (expect)
//  row5:          LOG_WRITE -> LOG_DONE (expect)

export const SM_NODES: DagNode[] = [
  { id: 'N01', col: 0, row: 0, name: 'Admin\nAuthd',      type: 'action',   details: 'Admin is authenticated in BO with KYC/Verifier role.' },
  { id: 'N02', col: 1, row: 0, name: 'Agency\nDetail',    type: 'action',   details: 'Admin opens Agency Detail page; GET /admin/organizers/:id called.' },
  { id: 'N03', col: 2, row: 0, name: 'Agency\nType?',     type: 'decision', details: 'System checks profileType: COMPANY vs INDIVIDUAL.' },
  { id: 'N04', col: 3, row: 0, name: 'Corp\nDocs',        type: 'expect',   details: 'Corporate documents shown: หนังสือรับรองบริษัท, ภพ.20, บัตรประชาชนกรรมการ.' },
  { id: 'N05', col: 3, row: 1, name: 'Indiv\nDocs',       type: 'expect',   details: 'Individual documents shown: หน้าบัตรประชาชน, ข้อมูลบัญชีธนาคาร.' },
  { id: 'N06', col: 1, row: 2, name: 'Admin\nReviews',    type: 'action',   details: 'Admin examines the displayed documents.' },
  { id: 'N07', col: 2, row: 2, name: 'Decision\nPoint',   type: 'decision', details: 'Admin chooses to Approve or Reject the Agency.' },
  { id: 'N08', col: 3, row: 2, name: 'Approve\nClick',    type: 'action',   details: 'Admin clicks the Approve button.' },
  { id: 'N09', col: 4, row: 2, name: 'Approved\nStatus',  type: 'expect',   details: 'Status → อนุมัติแล้ว; Email sent; Create Event permission unlocked.' },
  { id: 'N10', col: 3, row: 3, name: 'Reject\nClick',     type: 'action',   details: 'Admin clicks the Reject button; reason input field shown.' },
  { id: 'N11', col: 4, row: 3, name: 'Reason\nCheck',     type: 'decision', details: 'System validates whether a reject reason has been entered.' },
  { id: 'N12', col: 5, row: 3, name: 'Blocked\nError',    type: 'expect',   details: 'No reason entered; system shows validation error; API not called.' },
  { id: 'N13', col: 4, row: 4, name: 'Confirm\nReject',   type: 'action',   details: 'Admin enters reason and confirms rejection.' },
  { id: 'N14', col: 5, row: 4, name: 'Rejected\nStatus',  type: 'expect',   details: 'Status → ถูกปฏิเสธ; Agency can view reason and re-submit.' },
  { id: 'N15', col: 1, row: 5, name: 'Log\nWrite',        type: 'action',   details: 'System writes internal audit log entry after any review action.' },
  { id: 'N16', col: 2, row: 5, name: 'Log\nRecorded',     type: 'expect',   details: 'Log contains reviewedBy (adminId) and reviewedAt (ISO timestamp).' },
];

// ── DAG Edges ─────────────────────────────────────────────────────────────────
export const SM_EDGES: DagEdge[] = [
  { from: 'N01', to: 'N02'                               },
  { from: 'N02', to: 'N03'                               },
  { from: 'N03', to: 'N04', label: 'Corporate'          },
  { from: 'N03', to: 'N05', label: 'Individual'         },
  { from: 'N04', to: 'N06'                               },
  { from: 'N05', to: 'N06'                               },
  { from: 'N06', to: 'N07'                               },
  { from: 'N07', to: 'N08', label: 'approve'            },
  { from: 'N07', to: 'N10', label: 'reject'             },
  { from: 'N08', to: 'N09'                               },
  { from: 'N09', to: 'N15'                               },
  { from: 'N10', to: 'N11'                               },
  { from: 'N11', to: 'N12', label: 'no reason'          },
  { from: 'N11', to: 'N13', label: 'has reason'         },
  { from: 'N13', to: 'N14'                               },
  { from: 'N14', to: 'N15'                               },
  { from: 'N15', to: 'N16'                               },
];

// ── Scenarios ─────────────────────────────────────────────────────────────────
export const SM_SCENARIOS: Scenario[] = [
  {
    id: 'PP170-TC-001',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Corporate Agency docs display',
    steps: [
      { action: 'Open Agency Detail for a Corporate Agency', data: 'STG Corporate Agency (profileType=COMPANY, PENDING_REVIEW)', expect: 'Page shows หนังสือรับรองบริษัท, ภพ.20, บัตรประชาชนกรรมการ fields' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N04'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N04']],
  },
  {
    id: 'PP170-TC-002',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Individual Agency docs display',
    steps: [
      { action: 'Open Agency Detail for an Individual Agency', data: 'STG Individual Agency (profileType=INDIVIDUAL, PENDING_REVIEW)', expect: 'Page shows หน้าบัตรประชาชน, ข้อมูลบัญชีธนาคาร fields' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N05'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N05']],
  },
  {
    id: 'PP170-TC-003',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Approve Agency → status & effects',
    steps: [
      { action: 'Open Agency Detail page for PENDING_REVIEW agency', data: 'STG Agency with verificationStatus=PENDING_REVIEW', expect: 'Detail page loads; document fields visible' },
      { action: 'Click the Approve button', data: '—', expect: 'PATCH /admin/organizers/:id/review called with APPROVED' },
      { action: 'Observe status and side effects', data: '—', expect: 'Status → อนุมัติแล้ว; Email notification sent to Agency; Create Event permission unlocked' },
    ],
    activePath: ['N01', 'N02', 'N03', 'N04', 'N06', 'N07', 'N08', 'N09', 'N15', 'N16'],
    activeEdges: [['N01','N02'], ['N02','N03'], ['N03','N04'], ['N04','N06'], ['N06','N07'], ['N07','N08'], ['N08','N09'], ['N09','N15'], ['N15','N16']],
  },
  {
    id: 'PP170-TC-004',
    typeCls: 'ep',
    type: 'Negative',
    name: 'Reject without reason → blocked',
    steps: [
      { action: 'Click Reject button; leave reason field empty; click Confirm', data: 'No text in reason input', expect: 'System shows validation error; Confirm action blocked; API not called' },
    ],
    activePath: ['N06', 'N07', 'N10', 'N11', 'N12'],
    activeEdges: [['N06','N07'], ['N07','N10'], ['N10','N11'], ['N11','N12']],
  },
  {
    id: 'PP170-TC-005',
    typeCls: 'smoke',
    type: 'Functional',
    name: 'Reject with reason → status change',
    steps: [
      { action: 'Click Reject button and enter reject reason', data: '"เอกสารไม่ครบ กรุณาอัปโหลดใหม่"', expect: 'Reason field accepts input' },
      { action: 'Click Confirm Reject', data: '—', expect: 'PATCH called with REJECTED + reviewRemark; status → ถูกปฏิเสธ' },
      { action: 'Verify Agency can see reason', data: '—', expect: 'Agency account can view rejection reason and option to re-submit' },
    ],
    activePath: ['N06', 'N07', 'N10', 'N11', 'N13', 'N14', 'N15', 'N16'],
    activeEdges: [['N06','N07'], ['N07','N10'], ['N10','N11'], ['N11','N13'], ['N13','N14'], ['N14','N15'], ['N15','N16']],
  },
  {
    id: 'PP170-TC-006',
    typeCls: 'ep',
    type: 'Functional',
    name: 'Audit log recorded after review',
    steps: [
      { action: 'Complete any review action (Approve or Reject with reason)', data: 'Admin session; Agency in PENDING_REVIEW', expect: 'Review completes successfully' },
      { action: 'Verify audit log via GET /admin/organizers/:id', data: '—', expect: 'Response contains reviewedBy = adminId and reviewedAt = ISO timestamp' },
    ],
    activePath: ['N09', 'N15', 'N16'],
    activeEdges: [['N09','N15'], ['N15','N16']],
  },
];

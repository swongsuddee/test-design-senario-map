import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    ADMIN([Admin opens Agency list]) --> DETAIL[Open Agency Detail page]
    DETAIL --> TYPE{Agency type?}

    TYPE -->|Corporate| CORP[Display: หนังสือรับรองบริษัท\\nภพ.20, บัตรประชาชนกรรมการ]
    TYPE -->|Individual| IND[Display: หน้าบัตรประชาชน\\nข้อมูลบัญชีธนาคาร]

    CORP --> REVIEW[Admin reviews documents]
    IND --> REVIEW

    REVIEW --> DECISION{Admin decision?}

    DECISION -->|Approve| APPROVE_ACT[Click Approve button]
    DECISION -->|Reject| REJECT_REASON{Reason\\nprovided?}

    REJECT_REASON -->|No| BLOCKED([System blocks — must enter reason])
    REJECT_REASON -->|Yes| REJECT_ACT[Click Confirm Reject]

    APPROVE_ACT --> APPROVE_DONE([Status → อนุมัติแล้ว\\nEmail sent + Create Event unlocked])
    REJECT_ACT --> REJECT_DONE([Status → ถูกปฏิเสธ\\nAgency can view reason + Re-submit])

    APPROVE_DONE --> LOG[Internal Log recorded\\nAdmin ID + Timestamp]
    REJECT_DONE --> LOG

    style APPROVE_DONE fill:#4CAF50,color:#fff
    style REJECT_DONE fill:#FF9800,color:#fff
    style BLOCKED fill:#f44336,color:#fff
    style LOG fill:#2196F3,color:#fff`;

const FLOW_DOC_DISPLAY = `flowchart TD
    S1([Admin authenticated]) -->|"T1 · PP170-TC-001 PP170-TC-002"| S2[Agency Detail page loads\\nGET /admin/organizers/:id]
    S2 --> S2B{profileType?}
    S2B -->|"T2 · PP170-TC-001"| S3[Corporate]
    S2B -->|"T3 · PP170-TC-002"| S5[Individual]
    S3 --> S4([Display: หนังสือรับรองบริษัท\\nภพ.20, บัตรประชาชนกรรมการ])
    S5 --> S6([Display: หน้าบัตรประชาชน\\nข้อมูลบัญชีธนาคาร])

    style S4 fill:#4CAF50,color:#fff
    style S6 fill:#4CAF50,color:#fff`;

const FLOW_APPROVE = `flowchart TD
    S7([Documents reviewed]) -->|"T4 · PP170-TC-003"| S8[Admin clicks Approve]
    S8 -->|"T5 · PP170-TC-003"| S9[PATCH /admin/organizers/:id/review\\nreviewStatus = APPROVED]
    S9 --> S10([Status: อนุมัติแล้ว])
    S10 -->|"T6 · PP170-TC-003"| S11[Email notification\\nsent to Agency]
    S10 -->|"T7 · PP170-TC-003"| S12([Create Event permission\\nunlocked])

    style S10 fill:#4CAF50,color:#fff
    style S11 fill:#2196F3,color:#fff
    style S12 fill:#4CAF50,color:#fff`;

const FLOW_REJECT = `flowchart TD
    S13([Admin clicks Reject]) -->|"T8 · PP170-TC-004 PP170-TC-005"| S14[Reason input field\\ndisplayed / required]
    S14 -->|"T9 · PP170-TC-004"| S15[Attempt confirm\\nwithout reason]
    S15 --> S16([System blocks — error:\\nรeason is required])
    S14 -->|"T10 · PP170-TC-005"| S17[Admin types reject reason]
    S17 -->|"T11 · PP170-TC-005"| S18[Admin confirms reject]
    S18 -->|"T12 · PP170-TC-005"| S19[PATCH /admin/organizers/:id/review\\nreviewStatus = REJECTED\\nreviewRemark = reason]
    S19 --> S20([Status: ถูกปฏิเสธ])
    S20 --> S21([Agency sees reason\\nand can Re-submit])

    style S16 fill:#f44336,color:#fff
    style S20 fill:#FF9800,color:#fff
    style S21 fill:#2196F3,color:#fff`;

const FLOW_LOG = `flowchart TD
    S22([Review action completed\\nApprove or Reject]) -->|"T13 · PP170-TC-006"| S23[Internal log written]
    S23 -->|"T14 · PP170-TC-006"| S24([Log: reviewedBy = adminId\\nreviewedAt = timestamp])

    style S24 fill:#2196F3,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Document Review & Approval',
  subtitle: 'End-to-end Admin BO review process overview',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-doc-display',
    num: '2',
    title: 'Sub-Flow 1 · Document Display by Agency Type',
    subtitle: 'S1–S6 · T1–T3 · TC-001–002',
    chart: FLOW_DOC_DISPLAY,
    states: [
      ['S1', 'Admin authenticated in BO'],
      ['S2', 'Agency Detail page requested (GET /admin/organizers/:id)'],
      ['S3', 'Agency type = Corporate'],
      ['S4', 'Corporate documents displayed (หนังสือรับรอง, ภพ.20, บัตรประชาชนกรรมการ)'],
      ['S5', 'Agency type = Individual'],
      ['S6', 'Individual documents displayed (บัตรประชาชน, บัญชีธนาคาร)'],
    ],
    transitions: [
      ['T1', 'Admin opens Agency Detail (GET /admin/organizers/:id)'],
      ['T2', 'profileType = COMPANY → show corporate docs'],
      ['T3', 'profileType = INDIVIDUAL → show individual docs'],
    ],
  },
  {
    sectionId: 'flow-approve',
    num: '3',
    title: 'Sub-Flow 2 · Approve Agency',
    subtitle: 'S7–S12 · T4–T7 · TC-003',
    chart: FLOW_APPROVE,
    states: [
      ['S7',  'Admin reviews documents — ready to decide'],
      ['S8',  'Admin clicks Approve button'],
      ['S9',  'API PATCH — reviewStatus = APPROVED'],
      ['S10', 'Agency status → อนุมัติแล้ว'],
      ['S11', 'Email notification sent to Agency'],
      ['S12', 'Create Event permission unlocked'],
    ],
    transitions: [
      ['T4', 'Admin clicks Approve'],
      ['T5', 'API returns success → status updated'],
      ['T6', 'Side effect: Email sent'],
      ['T7', 'Side effect: Create Event unlocked'],
    ],
  },
  {
    sectionId: 'flow-reject',
    num: '4',
    title: 'Sub-Flow 3 · Reject Agency',
    subtitle: 'S13–S21 · T8–T12 · TC-004–005',
    chart: FLOW_REJECT,
    states: [
      ['S13', 'Admin clicks Reject button'],
      ['S14', 'Reason input field displayed'],
      ['S15', 'Admin attempts confirm without reason'],
      ['S16', 'System blocks reject — validation error'],
      ['S17', 'Admin enters reject reason'],
      ['S18', 'Admin confirms reject'],
      ['S19', 'API PATCH — reviewStatus = REJECTED'],
      ['S20', 'Agency status → ถูกปฏิเสธ'],
      ['S21', 'Agency can view reason and re-submit'],
    ],
    transitions: [
      ['T8',  'Admin clicks Reject'],
      ['T9',  'Confirm without reason → validation error'],
      ['T10', 'Admin types reason'],
      ['T11', 'Admin confirms with reason → API call'],
      ['T12', 'API returns success — status updated'],
    ],
  },
  {
    sectionId: 'flow-log',
    num: '5',
    title: 'Sub-Flow 4 · Internal Audit Log',
    subtitle: 'S22–S24 · T13–T14 · TC-006',
    chart: FLOW_LOG,
    states: [
      ['S22', 'Approve or Reject action completed'],
      ['S23', 'Internal log entry written'],
      ['S24', 'Log contains Admin ID and Timestamp'],
    ],
    transitions: [
      ['T13', 'Any review action completes'],
      ['T14', 'System writes log entry'],
    ],
  },
];

import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    AGENCY([Agency logs in to BO]) --> STATUS{Agency\\nApproval Status?}

    STATUS -->|Pending / Rejected| LOCKED[Create Event menu\\nLOCKED]
    STATUS -->|Approved| UNLOCKED[Create Event menu\\nUNLOCKED]

    LOCKED --> BLOCK([Agency cannot access\\nCreate Event])
    UNLOCKED --> CREATE([Agency selects category\\nand creates Event])

    ADMIN([Admin approves Agency]) --> NOTIF[Push Notification / Email\\nsent to Agency]
    NOTIF --> UNLOCK_ACT[Create Event permission\\nunlocked immediately]

    CORP_INC([Corporate Agency\\nincomplete documents]) --> HIDDEN([Agency NOT listed\\nin Admin BO])

    ACTION([Any status change]) --> AUDIT([Audit Trail recorded\\nwho + when])

    ADMIN_NOROLE([Admin without\\nKYC/Verifier role]) --> REJECT_PERM([System blocks Approve\\nPermission denied])

    style LOCKED fill:#f44336,color:#fff
    style UNLOCKED fill:#4CAF50,color:#fff
    style BLOCK fill:#f44336,color:#fff
    style CREATE fill:#4CAF50,color:#fff
    style AUDIT fill:#2196F3,color:#fff
    style REJECT_PERM fill:#f44336,color:#fff`;

const FLOW_ACCESS_CONTROL = `flowchart TD
    S1([Agency status: PENDING]) -->|"T1 · PP171-TC-001"| S2[Create Event: LOCKED]
    S4([Agency status: REJECTED]) -->|"T2 · PP171-TC-002"| S2
    S2 -->|"T4 · PP171-TC-001 PP171-TC-002"| S3([Access denied\\nCannot enter Create Event])

    S5([Agency status: APPROVED]) -->|"T3 · PP171-TC-003"| S6[Create Event: UNLOCKED]
    S6 -->|"T5 · PP171-TC-003"| S7([Agency selects category\\nand creates Event])

    style S2 fill:#f44336,color:#fff
    style S3 fill:#f44336,color:#fff
    style S6 fill:#4CAF50,color:#fff
    style S7 fill:#4CAF50,color:#fff`;

const FLOW_ONBOARDING = `flowchart TD
    S8([Admin approves Agency]) -->|"T6 · PP171-TC-004"| S9[Status → อนุมัติแล้ว]
    S9 -->|"T7 · PP171-TC-004"| S10[Push Notification / Email\\nsent to Agency]
    S10 -->|"T8 · PP171-TC-004"| S11([Notification includes\\nonboarding link])

    style S11 fill:#4CAF50,color:#fff
    style S10 fill:#2196F3,color:#fff`;

const FLOW_CORP_DOCS = `flowchart TD
    S12([Corporate Agency\\nincomplete docs]) -->|"T9 · PP171-TC-005"| S13[Agency submits request]
    S13 --> S14([Agency NOT listed\\nin Admin BO])

    S15([Corporate Agency\\ndocs complete]) -->|"T10 · PP171-TC-005"| S16([Agency listed\\nin Admin BO])

    style S14 fill:#f44336,color:#fff
    style S16 fill:#4CAF50,color:#fff`;

const FLOW_AUDIT = `flowchart TD
    S17([Agency status changed]) -->|"T11 · PP171-TC-006"| S18[Audit trail entry created]
    S18 -->|"T12 · PP171-TC-006"| S19([Entry: actorId + timestamp\\nin Agency history])

    style S19 fill:#2196F3,color:#fff`;

const FLOW_RBAC = `flowchart TD
    S20([Admin — no KYC/Verifier role\\nclicks Approve]) -->|"T13 · PP171-TC-007"| S21[API call attempted]
    S21 -->|"T14 · PP171-TC-007"| S22([403 Permission denied])
    S22 --> S23([Agency status\\nunchanged])

    style S22 fill:#f44336,color:#fff
    style S23 fill:#FF9800,color:#fff`;

const FLOW_EVENT_LIST = `flowchart TD
    S24([Admin opens Event List]) -->|"T15 · PP171-TC-008"| S25[Event list loaded\\npaginated results]
    S25 -->|"T16 · PP171-TC-009"| S26[Admin applies keyword search\\nor status filter]
    S26 --> S27([Filtered event list\\ndisplayed])

    style S25 fill:#2196F3,color:#fff
    style S27 fill:#4CAF50,color:#fff`;

const FLOW_EVENT_APPROVE = `flowchart TD
    S28([Event: pending_approved]) -->|"T17 · PP171-TC-010"| S29[Admin clicks Approve\\nApproveEvent RPC]
    S29 --> S30([Event: published\\nOrganizer notified])

    S28 -->|"T18 · PP171-TC-011"| S31[Admin clicks Reject + reason\\nRejectEvent RPC]
    S31 --> S32([Event: draft\\nreason in history])

    S33([Event: pending_cancel]) -->|"T19 · PP171-TC-012"| S34[Admin approves cancel\\nApproveCancelEvent RPC]
    S34 --> S35([Event: cancelled\\nRefund triggered\\nParticipants notified])

    S33 -->|"T20 · PP171-TC-013"| S36[Admin rejects cancel\\nRejectCancelEvent RPC]
    S36 --> S37([Event: published\\nOrganizer notified])

    style S30 fill:#4CAF50,color:#fff
    style S32 fill:#FF9800,color:#fff
    style S35 fill:#f44336,color:#fff
    style S37 fill:#4CAF50,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Permission Activation',
  subtitle: 'End-to-end Agency access control and event approval overview',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-access-control',
    num: '2',
    title: 'Sub-Flow 1 · Create Event Access Control',
    subtitle: 'S1–S7 · T1–T5 · TC-001–003',
    chart: FLOW_ACCESS_CONTROL,
    states: [
      ['S1', 'Agency logged in — status = Pending'],
      ['S2', 'Create Event menu — LOCKED state'],
      ['S3', 'Agency cannot access Create Event page'],
      ['S4', 'Agency logged in — status = Rejected'],
      ['S5', 'Agency logged in — status = Approved'],
      ['S6', 'Create Event menu — UNLOCKED state'],
      ['S7', 'Agency accesses Create Event; selects category'],
    ],
    transitions: [
      ['T1', 'Agency status = PENDING → lock menu'],
      ['T2', 'Agency status = REJECTED → lock menu'],
      ['T3', 'Agency status = APPROVED → unlock menu'],
      ['T4', 'Agency attempts to navigate to Create Event (locked)'],
      ['T5', 'Agency successfully navigates to Create Event (unlocked)'],
    ],
  },
  {
    sectionId: 'flow-onboarding',
    num: '3',
    title: 'Sub-Flow 2 · Onboarding Notification on Approval',
    subtitle: 'S8–S11 · T6–T8 · TC-004',
    chart: FLOW_ONBOARDING,
    states: [
      ['S8',  'Admin completes Approve action'],
      ['S9',  'Agency status changes to Approved'],
      ['S10', 'Push Notification / Email sent to Agency'],
      ['S11', 'Notification contains link to start using platform'],
    ],
    transitions: [
      ['T6', 'Admin triggers Approve'],
      ['T7', 'Status updated → side effect: send notification'],
      ['T8', 'Notification delivered with onboarding link'],
    ],
  },
  {
    sectionId: 'flow-corp-docs',
    num: '4',
    title: 'Sub-Flow 3 · Corporate Document Validation Before Listing',
    subtitle: 'S12–S16 · T9–T10 · TC-005',
    chart: FLOW_CORP_DOCS,
    states: [
      ['S12', 'Corporate Agency — documents incomplete'],
      ['S13', 'Agency submits request'],
      ['S14', 'Agency NOT visible in Admin BO list'],
      ['S15', 'Corporate Agency — all documents complete'],
      ['S16', 'Agency appears in Admin BO list'],
    ],
    transitions: [
      ['T9',  'Submit with incomplete documents → hidden from BO'],
      ['T10', 'Documents complete → visible in BO'],
    ],
  },
  {
    sectionId: 'flow-audit',
    num: '5',
    title: 'Sub-Flow 4 · Audit Trail',
    subtitle: 'S17–S19 · T11–T12 · TC-006',
    chart: FLOW_AUDIT,
    states: [
      ['S17', 'Agency status changes (any direction)'],
      ['S18', 'Audit trail entry created'],
      ['S19', 'Entry contains: who acted + when'],
    ],
    transitions: [
      ['T11', 'Status change event triggers audit write'],
      ['T12', 'Audit entry persisted with actor + timestamp'],
    ],
  },
  {
    sectionId: 'flow-rbac',
    num: '6',
    title: 'Sub-Flow 5 · RBAC — Only KYC/Verifier Can Approve',
    subtitle: 'S20–S23 · T13–T14 · TC-007',
    chart: FLOW_RBAC,
    states: [
      ['S20', 'Admin without KYC/Verifier role clicks Approve'],
      ['S21', 'API call attempted'],
      ['S22', 'System returns permission denied (403)'],
      ['S23', 'Status unchanged'],
    ],
    transitions: [
      ['T13', 'Non-verifier Admin triggers Approve'],
      ['T14', 'RBAC check fails — 403 returned'],
    ],
  },
  {
    sectionId: 'flow-event-list',
    num: '7',
    title: 'Sub-Flow 6 · Event List — Admin View',
    subtitle: 'S24–S27 · T15–T16 · TC-008–009',
    chart: FLOW_EVENT_LIST,
    states: [
      ['S24', 'Admin opens Event List page'],
      ['S25', 'Event list loaded (paginated)'],
      ['S26', 'Admin applies search / filter / sort'],
      ['S27', 'Filtered event list displayed'],
    ],
    transitions: [
      ['T15', 'Admin navigates to Event Management'],
      ['T16', 'Search / filter / sort parameters applied'],
    ],
  },
  {
    sectionId: 'flow-event-approve',
    num: '8',
    title: 'Sub-Flow 7 · Admin Approve / Reject Event',
    subtitle: 'S28–S37 · T17–T20 · TC-010–013',
    chart: FLOW_EVENT_APPROVE,
    states: [
      ['S28', 'Event in pending_approved status'],
      ['S29', 'Admin approves event'],
      ['S30', 'Event status → published'],
      ['S31', 'Admin rejects event (pending_approved)'],
      ['S32', 'Event status → draft + reason stored'],
      ['S33', 'Event in pending_cancel status'],
      ['S34', 'Admin approves cancel'],
      ['S35', 'Event status → cancelled; refund triggered'],
      ['S36', 'Admin rejects cancel'],
      ['S37', 'Event status → published (restored)'],
    ],
    transitions: [
      ['T17', 'Admin approve (pending_approved → published)'],
      ['T18', 'Admin reject (pending_approved → draft)'],
      ['T19', 'Admin approve cancel (pending_cancel → cancelled)'],
      ['T20', 'Admin reject cancel (pending_cancel → published)'],
    ],
  },
];

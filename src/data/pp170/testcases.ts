import type { TcSectionDef } from '@/types';

export const TC_SECTIONS: TcSectionDef[] = [
  {
    sectionId: 'tc-doc-display',
    num: '6',
    title: 'Test Cases · Document Display by Agency Type',
    subtitle: 'TC-001–002',
    cols: ['module', 'type', 'labels'],
    rows: [
      {
        id: 'PP170-TC-001',
        module: 'Document Display',
        summary: 'Corporate Agency detail shows correct documents (หนังสือรับรองบริษัท, ภพ.20, บัตรประชาชนกรรมการ)',
        type: 'Functional',
        priority: 'high',
        auto: 'auto',
        labels: [['smoke', 'Smoke'], ['dt', 'DT'], ['regression', 'Regression']],
      },
      {
        id: 'PP170-TC-002',
        module: 'Document Display',
        summary: 'Individual Agency detail shows correct documents (หน้าบัตรประชาชน, ข้อมูลบัญชีธนาคาร)',
        type: 'Functional',
        priority: 'high',
        auto: 'auto',
        labels: [['smoke', 'Smoke'], ['dt', 'DT'], ['regression', 'Regression']],
      },
    ],
  },
  {
    sectionId: 'tc-approve',
    num: '7',
    title: 'Test Cases · Approve Agency',
    subtitle: 'TC-003',
    cols: ['module', 'type', 'labels'],
    rows: [
      {
        id: 'PP170-TC-003',
        module: 'Approve Agency',
        summary: 'Approving Agency changes status to อนุมัติแล้ว, sends email, and unlocks Create Event permission',
        type: 'Functional',
        priority: 'high',
        auto: 'auto',
        labels: [['smoke', 'Smoke'], ['st', 'ST'], ['regression', 'Regression']],
      },
    ],
  },
  {
    sectionId: 'tc-reject',
    num: '8',
    title: 'Test Cases · Reject Agency',
    subtitle: 'TC-004–005',
    cols: ['module', 'type', 'labels'],
    rows: [
      {
        id: 'PP170-TC-004',
        module: 'Reject — No Reason',
        summary: 'System blocks Reject action when no reason is entered — validation error shown, API not called',
        type: 'Negative',
        priority: 'high',
        auto: 'auto',
        labels: [['negative', 'Negative'], ['ep', 'Spec'], ['regression', 'Regression']],
      },
      {
        id: 'PP170-TC-005',
        module: 'Reject with Reason',
        summary: 'Rejecting with reason changes status to ถูกปฏิเสธ; Agency can view reason and re-submit',
        type: 'Functional',
        priority: 'high',
        auto: 'auto',
        labels: [['smoke', 'Smoke'], ['st', 'ST'], ['regression', 'Regression']],
      },
    ],
  },
  {
    sectionId: 'tc-log',
    num: '9',
    title: 'Test Cases · Internal Audit Log',
    subtitle: 'TC-006',
    cols: ['module', 'type', 'labels'],
    rows: [
      {
        id: 'PP170-TC-006',
        module: 'Internal Log',
        summary: 'Audit log records reviewedBy (adminId) and reviewedAt (ISO timestamp) after any review action',
        type: 'Functional',
        priority: 'medium',
        auto: 'auto',
        labels: [['ep', 'Spec'], ['regression', 'Regression']],
      },
    ],
  },
];

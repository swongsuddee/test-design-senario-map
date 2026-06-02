import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    START([Agency / Admin\\nเข้าหน้า Create Event บน BO]) --> FILL[กรอกข้อมูล Event\\nชื่องาน, ประเภท, สถานที่, วันเวลา]
    FILL --> TICKET[เพิ่ม Ticket Types\\nระยะทาง, ราคา, จำนวน, วันรับสมัคร]
    TICKET --> EXIT{ออกจากหน้า\\nก่อนเสร็จ?}
    EXIT -->|Yes| DRAFT[บันทึก Draft\\nอัตโนมัติ]
    EXIT -->|No| SUBMIT[กด Publish]
    DRAFT --> RESUME[กลับมา Resume\\nจากจุดเดิม]
    RESUME --> SUBMIT
    SUBMIT --> PENDING[สถานะ: pending_approved\\nรอ Admin อนุมัติ]
    PENDING --> APPROVE{Admin\\nตัดสินใจ}
    APPROVE -->|Approve| PUBLISHED([สถานะ: published\\nเผยแพร่บน Mobile App])
    APPROVE -->|Reject| REJECTED([สถานะ: draft\\nAgency แก้ไขใหม่])
    PUBLISHED --> CANCEL{Agency\\nต้องการยกเลิก?}
    CANCEL -->|Yes| PCANCEL[สถานะ: pending_cancel\\nรอ Admin อนุมัติ]
    PCANCEL --> ACANCEL{Admin\\nตัดสินใจ}
    ACANCEL -->|Approve| CANCELLED([สถานะ: cancelled\\n+ Trigger Refund])
    ACANCEL -->|Reject| PUBLISHED

    style PUBLISHED fill:#4CAF50,color:#fff
    style CANCELLED fill:#f44336,color:#fff
    style REJECTED fill:#FF9800,color:#fff
    style DRAFT fill:#2196F3,color:#fff`;

const FLOW_CREATE_INFO = `flowchart TD
    S1([Agency/Admin\\nเข้าหน้า Create Event]) -->|"T1 · PP51-TC-001"| S2[กรอกข้อมูล Event\\nชื่องาน, ประเภท, สถานที่, วันเวลา]
    S2 -->|"T2 · PP51-TC-001 PP51-TC-002"| S3[ข้อมูลครบถ้วน valid]
    S2 -->|"T3 · PP51-TC-003"| S4[ข้อมูลไม่ครบ / invalid\\nแสดง validation error]
    S4 -->|แก้ไขข้อมูล| S2
    S3 -->|"T4 · PP51-TC-001"| S5([ระบบบันทึก Event\\nลง Database])

    style S5 fill:#4CAF50,color:#fff
    style S4 fill:#f44336,color:#fff`;

const FLOW_TICKET_TYPES = `flowchart TD
    S6([ขั้นตอน Condition\\n& Ticket Type]) -->|"T5 · PP51-TC-004"| S7[กรอก Ticket Type\\nระยะทาง, ราคา, จำนวน, วันรับสมัคร]
    S7 -->|"T6 · PP51-TC-004 PP51-TC-005"| S8([Ticket Type สร้างสำเร็จ\\n+ Stock Management])
    S7 -->|"T7 · PP51-TC-006"| S9[Validation Error\\nข้อมูลไม่ถูกต้อง]
    S9 -->|แก้ไข| S7
    S8 -->|"T8 · PP51-TC-005"| S10[เพิ่ม Ticket Type\\nประเภทถัดไป หรือดำเนินการต่อ]

    style S8 fill:#4CAF50,color:#fff
    style S9 fill:#f44336,color:#fff`;

const FLOW_DRAFT = `flowchart TD
    S11([กำลังสร้าง Event\\nยังไม่เสร็จ]) -->|"T9 · PP51-TC-007"| S12[ออกจากหน้า\\nปิด Browser]
    S12 -->|"T10 · PP51-TC-007"| S13[ระบบบันทึก Draft\\nอัตโนมัติ]
    S13 -->|"T11 · PP51-TC-008"| S14[กลับมาดูรายการ\\nDraft]
    S14 -->|"T12 · PP51-TC-008"| S15([Resume Event Draft\\nจากจุดที่ค้างไว้])

    style S13 fill:#2196F3,color:#fff
    style S15 fill:#4CAF50,color:#fff`;

const FLOW_PUBLISH = `flowchart TD
    S16([Agency กรอกข้อมูลครบ]) -->|"T13 · PP51-TC-009"| S17[กด Publish]
    S17 -->|"T14 · PP51-TC-009"| S18[สถานะ: pending_approved\\nรอ Admin อนุมัติ]
    S18 -->|"T15 · PP51-TC-010"| S19[Admin Approve]
    S18 -->|"T16 · PP51-TC-011"| S21[Admin Reject]
    S19 -->|"T15"| S20([สถานะ: published\\nเผยแพร่บน Mobile App])
    S21 -->|"T16"| S22([สถานะ: draft\\nAgency แก้ไขใหม่])

    style S20 fill:#4CAF50,color:#fff
    style S22 fill:#FF9800,color:#fff
    style S18 fill:#2196F3,color:#fff`;

const FLOW_CANCEL = `flowchart TD
    S23([Event: published]) -->|"T17 · PP51-TC-012"| S24[Agency กดยกเลิก Event]
    S24 -->|"T18 · PP51-TC-012"| S25[สถานะ: pending_cancel\\nรอ Admin อนุมัติ]
    S25 -->|"T19 · PP51-TC-013"| S26[Admin Approve Cancel]
    S25 -->|"T20 · PP51-TC-014"| S28[Admin Reject Cancel]
    S26 -->|"T19"| S27([สถานะ: cancelled\\n+ Trigger Refund Flow])
    S28 -->|"T20"| S29([สถานะ: published\\nยังคงเผยแพร่อยู่])

    style S27 fill:#f44336,color:#fff
    style S29 fill:#4CAF50,color:#fff
    style S25 fill:#FF9800,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Create Event Running',
  subtitle: 'End-to-end event lifecycle: create → publish → approve → cancel',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-create-info',
    num: '2',
    title: 'Sub-Flow 1 · Create Event Information',
    subtitle: 'S1–S5 · T1–T4 · TC-001–003',
    chart: FLOW_CREATE_INFO,
    states: [
      ['S1', 'Agency/Admin อยู่ที่หน้า Create Event'],
      ['S2', 'กรอกข้อมูลพื้นฐาน (ชื่องาน, ประเภท, สถานที่, วันเวลา)'],
      ['S3', 'ข้อมูลครบถ้วน valid'],
      ['S4', 'ข้อมูลไม่ครบ / invalid — แสดง validation error'],
      ['S5', 'ระบบบันทึก Event ลง Database'],
    ],
    transitions: [
      ['T1', 'เข้าหน้า Create Event'],
      ['T2', 'กรอกข้อมูลครบถ้วนและถูกต้อง'],
      ['T3', 'ข้อมูลไม่ครบหรือ invalid'],
      ['T4', 'บันทึกข้อมูลสำเร็จ'],
    ],
  },
  {
    sectionId: 'flow-ticket-types',
    num: '3',
    title: 'Sub-Flow 2 · Event Items & Ticket Types',
    subtitle: 'S6–S10 · T5–T8 · TC-004–006',
    chart: FLOW_TICKET_TYPES,
    states: [
      ['S6',  'ขั้นตอน Condition & Ticket Type'],
      ['S7',  'เพิ่ม Ticket Type (ระยะทาง, ราคา, จำนวน, วันรับสมัคร)'],
      ['S8',  'Ticket Type สร้างสำเร็จ + Stock Management'],
      ['S9',  'Ticket Type ข้อมูลไม่ถูกต้อง — Validation Error'],
      ['S10', 'เพิ่ม Ticket Type ประเภทถัดไป หรือดำเนินการต่อ'],
    ],
    transitions: [
      ['T5', 'เข้าขั้นตอน Ticket Type'],
      ['T6', 'เพิ่ม Ticket Type ข้อมูลถูกต้อง'],
      ['T7', 'Ticket Type ข้อมูลไม่ถูกต้อง (ราคา/จำนวนเป็น 0 หรือว่าง)'],
      ['T8', 'ระบบสร้าง Ticket Type + Stock'],
    ],
  },
  {
    sectionId: 'flow-draft',
    num: '4',
    title: 'Sub-Flow 3 · Event Draft',
    subtitle: 'S11–S15 · T9–T12 · TC-007–008',
    chart: FLOW_DRAFT,
    states: [
      ['S11', 'กำลังสร้าง Event (ยังไม่เสร็จ)'],
      ['S12', 'ออกจากหน้า / ปิด Browser'],
      ['S13', 'ระบบบันทึก Draft อัตโนมัติ'],
      ['S14', 'กลับมา Resume จากจุดเดิม (Draft List)'],
      ['S15', 'Resume Event Draft จากจุดที่ค้างไว้'],
    ],
    transitions: [
      ['T9',  'ออกจากหน้าก่อนกด Publish'],
      ['T10', 'บันทึก Draft อัตโนมัติสำเร็จ'],
      ['T11', 'กลับเข้ามาดู Draft'],
      ['T12', 'Resume Event Draft จากจุดที่ค้างไว้'],
    ],
  },
  {
    sectionId: 'flow-publish',
    num: '5',
    title: 'Sub-Flow 4 · Publish Event — Pending Approval',
    subtitle: 'S16–S22 · T13–T16 · TC-009–011',
    chart: FLOW_PUBLISH,
    states: [
      ['S16', 'Agency กรอกข้อมูล Event ครบถ้วน'],
      ['S17', 'กด Publish'],
      ['S18', 'สถานะ: pending_approved — รอ Admin อนุมัติ'],
      ['S19', 'Admin อนุมัติ'],
      ['S20', 'สถานะ: published — เผยแพร่บน Mobile App'],
      ['S21', 'Admin ปฏิเสธ'],
      ['S22', 'สถานะ: draft (rejected) — Agency แก้ไขใหม่'],
    ],
    transitions: [
      ['T13', 'กด Publish'],
      ['T14', 'สถานะเปลี่ยนเป็น pending_approved'],
      ['T15', 'Admin Approve → published'],
      ['T16', 'Admin Reject → draft'],
    ],
  },
  {
    sectionId: 'flow-cancel',
    num: '6',
    title: 'Sub-Flow 5 · Cancel Event',
    subtitle: 'S23–S29 · T17–T20 · TC-012–014',
    chart: FLOW_CANCEL,
    states: [
      ['S23', 'Event สถานะ published'],
      ['S24', 'Agency กดยกเลิก Event'],
      ['S25', 'สถานะ: pending_cancel — รอ Admin อนุมัติ'],
      ['S26', 'Admin อนุมัติ Cancel'],
      ['S27', 'สถานะ: cancelled + Trigger Refund Flow'],
      ['S28', 'Admin ปฏิเสธ Cancel'],
      ['S29', 'สถานะ: published (ยังคงอยู่)'],
    ],
    transitions: [
      ['T17', 'Agency กดยกเลิก Event'],
      ['T18', 'สถานะเปลี่ยนเป็น pending_cancel'],
      ['T19', 'Admin Approve Cancel → cancelled'],
      ['T20', 'Admin Reject Cancel → คงสถานะ published'],
    ],
  },
];

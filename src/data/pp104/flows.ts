import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    ADMIN([Admin เข้าสู่ระบบ\\nBO Portal]) --> ACCESS{RBAC\\nCheck}
    ACCESS -->|Admin role| LIST[โหลดหน้า\\nAgency Verification Listing]
    ACCESS -->|Non-Admin| REDIRECT([Redirect ออก\\nAccess Denied])

    LIST --> TABLE[แสดงตาราง Agency\\nชื่อ, ประเภท, วันที่, สถานะ]
    TABLE --> FILTER{ผู้ใช้\\nต้องการ?}
    FILTER -->|Search by name| SEARCH[พิมพ์ชื่อ Agency\\nในช่องค้นหา]
    FILTER -->|Filter by status| FSTATUS[เลือก Filter\\nสถานะ]
    FILTER -->|Review| REVIEW[กดปุ่ม ตรวจสอบ]

    SEARCH --> RESULT[ตารางกรองแสดง\\nเฉพาะรายการที่ตรง]
    FSTATUS --> FRESULT[ตารางแสดงเฉพาะ\\nสถานะที่เลือก]
    REVIEW --> DETAIL([นำทางไป\\nหน้า Detail PP-170])

    style DETAIL fill:#4CAF50,color:#fff
    style REDIRECT fill:#f44336,color:#fff
    style TABLE fill:#2196F3,color:#fff`;

const FLOW_DASHBOARD = `flowchart TD
    S1([Admin เข้าหน้า\\nAgency Verification]) -->|"T1 · PP104-TC-001"| S2[โหลดข้อมูลจาก\\nGET /admin/organizers]
    S2 -->|"T2 · PP104-TC-001"| S3[ตารางแสดง:\\nชื่อ Agency, ประเภท, วันที่, สถานะ]
    S2 -->|"T3 · PP104-TC-007"| S4([Empty State\\n"ไม่มีรายการ"])

    style S3 fill:#4CAF50,color:#fff
    style S4 fill:#FF9800,color:#fff
    style S2 fill:#2196F3,color:#fff`;

const FLOW_SEARCH = `flowchart TD
    S5([Admin พิมพ์ชื่อ\\nใน Search field]) -->|"T4 · PP104-TC-002 PP104-TC-003"| S6[ตารางกรองแสดง\\nรายการที่ตรง]
    S5 -->|"T6 · PP104-TC-004"| S7([ไม่พบรายการ\\n"ไม่พบข้อมูล"])

    style S6 fill:#4CAF50,color:#fff
    style S7 fill:#FF9800,color:#fff`;

const FLOW_FILTER = `flowchart TD
    S8([Admin เลือก\\nFilter สถานะ]) -->|"T7 · PP104-TC-005"| S9[ตาราง: เฉพาะ\\nPENDING_REVIEW]
    S8 -->|"T8 · PP104-TC-005"| S10[ตาราง: เฉพาะ\\nAPPROVED]
    S8 -->|"T9 · PP104-TC-005"| S11[ตาราง: เฉพาะ\\nREJECTED]
    S8 -->|"T10 · PP104-TC-005"| S12[ตาราง: เฉพาะ\\nREQUESTED_MORE_INFO]

    style S9 fill:#FF9800,color:#fff
    style S10 fill:#4CAF50,color:#fff
    style S11 fill:#f44336,color:#fff
    style S12 fill:#2196F3,color:#fff`;

const FLOW_REVIEW = `flowchart TD
    S13([Admin กดปุ่ม Review\\nbน Agency Row]) -->|"T11 · PP104-TC-006"| S14([Navigate ไปหน้า\\nAgency Detail PP-170])

    style S14 fill:#4CAF50,color:#fff`;

const FLOW_RBAC = `flowchart TD
    S15([Non-Admin เข้า URL\\nหน้า Agency Verification]) -->|"T13 · PP104-TC-008"| S16[RBAC Check\\nล้มเหลว]
    S16 -->|"T14 · PP104-TC-008"| S17([Redirect ออก\\nหรือ 403 Forbidden])

    style S17 fill:#f44336,color:#fff
    style S16 fill:#FF9800,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Agency Verification Listing',
  subtitle: 'End-to-end system overview — Admin BO Portal',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-dashboard',
    num: '2',
    title: 'Sub-Flow 1 · Dashboard List',
    subtitle: 'S1–S4 · T1–T3 · TC-001, TC-007',
    chart: FLOW_DASHBOARD,
    states: [
      ['S1', 'Admin เข้าหน้า Agency Verification'],
      ['S2', 'ระบบโหลดข้อมูลจาก GET /admin/organizers'],
      ['S3', 'ตารางแสดงครบทุกคอลัมน์'],
      ['S4', 'ไม่มีข้อมูลในระบบ — Empty state'],
    ],
    transitions: [
      ['T1', 'หน้าโหลดสำเร็จ'],
      ['T2', 'API คืนข้อมูลรายการ'],
      ['T3', 'API คืนรายการว่าง (empty list)'],
    ],
  },
  {
    sectionId: 'flow-search',
    num: '3',
    title: 'Sub-Flow 2 · Search by Name',
    subtitle: 'S5–S7 · T4–T6 · TC-002–004',
    chart: FLOW_SEARCH,
    states: [
      ['S5', 'Admin พิมพ์ชื่อใน Search field'],
      ['S6', 'ตารางกรองแสดงรายการที่ตรง'],
      ['S7', 'ไม่มีรายการที่ตรง — "ไม่พบข้อมูล"'],
    ],
    transitions: [
      ['T4', 'พิมพ์ชื่อที่ตรงกับ Agency ในระบบ'],
      ['T5', 'ผลลัพธ์แสดงรายการที่ตรง'],
      ['T6', 'พิมพ์ชื่อที่ไม่มีในระบบ — ไม่พบ'],
    ],
  },
  {
    sectionId: 'flow-filter',
    num: '4',
    title: 'Sub-Flow 3 · Filter by Status',
    subtitle: 'S8–S12 · T7–T10 · TC-005',
    chart: FLOW_FILTER,
    states: [
      ['S8',  'Admin เลือก Filter สถานะ'],
      ['S9',  'ตารางแสดงเฉพาะ PENDING_REVIEW'],
      ['S10', 'ตารางแสดงเฉพาะ APPROVED'],
      ['S11', 'ตารางแสดงเฉพาะ REJECTED'],
      ['S12', 'ตารางแสดงเฉพาะ REQUESTED_MORE_INFO'],
    ],
    transitions: [
      ['T7',  'เลือก Filter = PENDING_REVIEW'],
      ['T8',  'เลือก Filter = APPROVED'],
      ['T9',  'เลือก Filter = REJECTED'],
      ['T10', 'เลือก Filter = REQUESTED_MORE_INFO'],
    ],
  },
  {
    sectionId: 'flow-review',
    num: '5',
    title: 'Sub-Flow 4 · Review Action',
    subtitle: 'S13–S14 · T11–T12 · TC-006',
    chart: FLOW_REVIEW,
    states: [
      ['S13', 'Admin กดปุ่ม Review บน Agency row'],
      ['S14', 'ระบบ Navigate ไปหน้า Detail (PP-170)'],
    ],
    transitions: [
      ['T11', 'กดปุ่ม "ตรวจสอบ (Review)"'],
      ['T12', 'Navigate สำเร็จ — หน้า Detail โหลด'],
    ],
  },
  {
    sectionId: 'flow-rbac',
    num: '6',
    title: 'Sub-Flow 5 · RBAC Guard',
    subtitle: 'S15–S17 · T13–T14 · TC-008',
    chart: FLOW_RBAC,
    states: [
      ['S15', 'Non-Admin พยายามเข้าหน้า Verification Listing'],
      ['S16', 'RBAC Check ล้มเหลว'],
      ['S17', 'Redirect / 403 Forbidden'],
    ],
    transitions: [
      ['T13', 'Non-Admin เข้า URL โดยตรง'],
      ['T14', 'RBAC Guard ปฏิเสธ — Redirect'],
    ],
  },
];

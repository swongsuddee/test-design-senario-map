import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    USER([User เข้า App\\nEnd User / Organizer / Admin]) --> PROFILE[ดูโปรไฟล์ตัวเอง\\nor โปรไฟล์คนอื่น]

    PROFILE --> VIEW{Profile\\nType?}
    VIEW -->|Own Profile| EDIT[แก้ไขโปรไฟล์\\ndisplay name, bio, avatar]
    VIEW -->|Other User| PUBLIC[Public Profile\\nเข้าถึงโดยไม่ต้อง login]

    EDIT --> AVATAR{Upload\\nAvatar?}
    AVATAR -->|Yes| UPLOAD[Upload JPG/PNG ≤ 5MB\\nResize 3 ขนาด → GCS]
    AVATAR -->|No| SAVE[บันทึกโปรไฟล์]
    UPLOAD --> SAVE

    SAVE --> KAFKA[Emit Kafka: user.updated]

    PROFILE --> SETTINGS[Account Settings\\nภาษา + Notification Preferences]
    PROFILE --> DELETE{ต้องการลบบัญชี?}
    DELETE -->|Yes| SOFTDEL[Soft Delete\\nGrace Period 30 วัน]
    SOFTDEL --> HARDDEL[Hard Delete\\n+ Anonymize + Kafka user.deleted]
    DELETE -->|No| PROFILE

    PROFILE --> ORGPROFILE[Organizer Profile\\nชื่อองค์กร, verified badge]
    PROFILE --> HISTORY[User History\\nAdmin ดู paginated + filter]

    style SAVE fill:#4CAF50,color:#fff
    style HARDDEL fill:#f44336,color:#fff
    style KAFKA fill:#2196F3,color:#fff
    style SOFTDEL fill:#FF9800,color:#fff`;

const FLOW_VIEW_EDIT = `flowchart TD
    S1([User เข้าหน้า Profile]) -->|"T1 · PP61-TC-001"| S2[Public Profile\\nแสดงโดยไม่ต้อง login]
    S1 -->|"T2 · PP61-TC-002"| S3[Own Profile\\nauthenticated]
    S3 -->|"T3 · PP61-TC-003"| S4[แก้ไขข้อมูล\\ndisplay name, bio, phone, email]
    S4 -->|"T4 · PP61-TC-003 PP61-TC-004"| S5([บันทึกสำเร็จ\\n+ Kafka: user.updated])
    S4 -->|"T5 · PP61-TC-005"| S6[Validation Error\\nแสดง error message]

    style S5 fill:#4CAF50,color:#fff
    style S6 fill:#f44336,color:#fff
    style S2 fill:#2196F3,color:#fff`;

const FLOW_AVATAR = `flowchart TD
    S7([User กดอัพโหลด Avatar]) -->|"T6 · PP61-TC-006"| S8[เลือกไฟล์ JPG/PNG ≤ 5MB]
    S7 -->|"T7 · PP61-TC-007"| S10A[Error: ไฟล์ขนาดเกิน 5MB]
    S7 -->|"T8 · PP61-TC-008"| S10B[Error: นามสกุลไม่รองรับ]
    S8 -->|"T9 · PP61-TC-006"| S9[Upload + Resize\\n3 ขนาด → GCS]
    S9 --> S11([Avatar อัพเดต\\nบน Profile])

    style S11 fill:#4CAF50,color:#fff
    style S10A fill:#f44336,color:#fff
    style S10B fill:#f44336,color:#fff
    style S9 fill:#2196F3,color:#fff`;

const FLOW_DELETE = `flowchart TD
    S12([User กดลบบัญชี]) -->|"T10 · PP61-TC-009"| S13[ยืนยันการลบ]
    S13 -->|"T11 · PP61-TC-009"| S14[Soft Delete\\nGrace Period 30 วัน]
    S14 -->|"T12 · PP61-TC-010"| S15([ยกเลิก Soft Delete\\nAccount คืนสภาพ])
    S14 -->|"T13 · PP61-TC-011"| S16([Hard Delete\\nAnonymize + Kafka: user.deleted])

    style S15 fill:#4CAF50,color:#fff
    style S16 fill:#f44336,color:#fff
    style S14 fill:#FF9800,color:#fff`;

const FLOW_SETTINGS = `flowchart TD
    S17([User เข้าหน้า\\nAccount Settings]) -->|"T14 · PP61-TC-012"| S18[เปลี่ยนภาษา]
    S17 -->|"T15 · PP61-TC-013"| S19[ตั้งค่า Notification\\nPreferences]
    S18 -->|"T16 · PP61-TC-012"| S20([Settings apply ทันที\\nไม่ต้อง restart App])
    S19 -->|"T16 · PP61-TC-013"| S20

    style S20 fill:#4CAF50,color:#fff`;

const FLOW_ORGANIZER = `flowchart TD
    S21([Event Page โหลด]) -->|"T17 · PP61-TC-014"| S22[แสดง Organizer Profile\\nชื่อองค์กร + Verified Badge]
    S21 -->|"T18 · PP61-TC-015"| S23[แสดง Organizer Profile\\nไม่มี Badge]

    style S22 fill:#4CAF50,color:#fff
    style S23 fill:#FF9800,color:#fff`;

const FLOW_ADMIN_HISTORY = `flowchart TD
    S24([Admin เข้าหน้า\\nUser History]) -->|"T19 · PP61-TC-016"| S25[แสดงรายการ\\nUser History paginated]
    S25 -->|"T20 · PP61-TC-016"| S26[เลื่อนหน้า Pagination\\nโหลดหน้าถัดไป]
    S25 -->|"T21 · PP61-TC-017"| S27A[Filter by Action\\nแสดงเฉพาะ action ที่เลือก]
    S27([Non-Admin พยายามเข้า]) -->|"T22 · PP61-TC-018"| S28([Redirect / Access Denied])

    style S27A fill:#4CAF50,color:#fff
    style S28 fill:#f44336,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — User Profile Epic',
  subtitle: 'End-to-end system overview',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-view-edit',
    num: '2',
    title: 'Sub-Flow 1 · View & Edit Profile',
    subtitle: 'S1–S6 · T1–T5 · TC-001–005',
    chart: FLOW_VIEW_EDIT,
    states: [
      ['S1', 'User เข้าหน้า Profile'],
      ['S2', 'แสดง Public Profile (ไม่ต้อง login)'],
      ['S3', 'แสดง Own Profile (authenticated)'],
      ['S4', 'แก้ไขข้อมูล (display name, bio, phone, email)'],
      ['S5', 'ข้อมูล valid — บันทึกสำเร็จ + Kafka: user.updated'],
      ['S6', 'ข้อมูล invalid — แสดง validation error'],
    ],
    transitions: [
      ['T1', 'ดู Public Profile โดยไม่ล็อกอิน'],
      ['T2', 'ดู Own Profile (authenticated)'],
      ['T3', 'กดแก้ไขโปรไฟล์'],
      ['T4', 'กรอกข้อมูลถูกต้อง กดบันทึก'],
      ['T5', 'กรอกข้อมูลไม่ถูกต้อง'],
    ],
  },
  {
    sectionId: 'flow-avatar',
    num: '3',
    title: 'Sub-Flow 2 · Avatar Upload',
    subtitle: 'S7–S11 · T6–T9 · TC-006–008',
    chart: FLOW_AVATAR,
    states: [
      ['S7',   'User กดอัพโหลด Avatar'],
      ['S8',   'เลือกไฟล์ JPG/PNG ≤ 5MB'],
      ['S9',   'ไฟล์ valid — Upload + Resize 3 ขนาด → GCS'],
      ['S10A', 'Error: ไฟล์ขนาดเกิน 5MB'],
      ['S10B', 'Error: นามสกุลไม่รองรับ'],
      ['S11',  'Avatar อัพเดตสำเร็จบน Profile'],
    ],
    transitions: [
      ['T6', 'เลือกไฟล์ JPG/PNG ≤ 5MB (valid)'],
      ['T7', 'เลือกไฟล์ > 5MB (invalid size)'],
      ['T8', 'เลือกไฟล์นามสกุลไม่รองรับ (e.g. GIF)'],
      ['T9', 'Upload + Resize สำเร็จ'],
    ],
  },
  {
    sectionId: 'flow-delete',
    num: '4',
    title: 'Sub-Flow 3 · Account Lifecycle — Delete Account',
    subtitle: 'S12–S16 · T10–T13 · TC-009–011',
    chart: FLOW_DELETE,
    states: [
      ['S12', 'User กดลบบัญชี'],
      ['S13', 'ยืนยันการลบ'],
      ['S14', 'Soft Delete — Grace Period 30 วัน'],
      ['S15', 'ยกเลิก Soft Delete (ภายใน 30 วัน)'],
      ['S16', 'Hard Delete — Anonymize + Kafka user.deleted'],
    ],
    transitions: [
      ['T10', 'กดลบบัญชีและยืนยัน'],
      ['T11', 'Soft Delete สำเร็จ (Grace Period เริ่มนับ)'],
      ['T12', 'ยกเลิก (ภายใน Grace Period) — account คืนสภาพ'],
      ['T13', 'หมด Grace Period 30 วัน → Hard Delete'],
    ],
  },
  {
    sectionId: 'flow-settings',
    num: '5',
    title: 'Sub-Flow 4 · Account Settings',
    subtitle: 'S17–S20 · T14–T16 · TC-012–013',
    chart: FLOW_SETTINGS,
    states: [
      ['S17', 'User เข้าหน้า Account Settings'],
      ['S18', 'เปลี่ยนภาษา'],
      ['S19', 'ตั้งค่า Notification Preferences'],
      ['S20', 'Settings apply ทันที (ไม่ต้อง restart App)'],
    ],
    transitions: [
      ['T14', 'เลือกภาษาใหม่'],
      ['T15', 'เปลี่ยน Notification Preference'],
      ['T16', 'บันทึกและ apply ทันที'],
    ],
  },
  {
    sectionId: 'flow-organizer',
    num: '6',
    title: 'Sub-Flow 5 · Organizer Profile',
    subtitle: 'S21–S23 · T17–T18 · TC-014–015',
    chart: FLOW_ORGANIZER,
    states: [
      ['S21', 'Organizer Profile แสดงบน Event Page'],
      ['S22', 'แสดง: ชื่อองค์กร, description, verified badge'],
      ['S23', 'Organizer ไม่ผ่าน Verification — ไม่แสดง badge'],
    ],
    transitions: [
      ['T17', 'Event page โหลด — Organizer verified'],
      ['T18', 'Event page โหลด — Organizer ไม่ผ่าน verification'],
    ],
  },
  {
    sectionId: 'flow-admin-history',
    num: '7',
    title: 'Sub-Flow 6 · Admin View User History',
    subtitle: 'S24–S28 · T19–T22 · TC-016–018',
    chart: FLOW_ADMIN_HISTORY,
    states: [
      ['S24',  'Admin เข้าหน้า User History'],
      ['S25',  'แสดงรายการ paginated'],
      ['S26',  'Filter by action'],
      ['S27',  'Non-Admin พยายามเข้า'],
      ['S27A', 'Filter by Action — แสดงเฉพาะ action ที่เลือก'],
      ['S28',  'Redirect / Access Denied'],
    ],
    transitions: [
      ['T19', 'Admin เข้าหน้า User History'],
      ['T20', 'เลื่อนหน้า (pagination)'],
      ['T21', 'Filter by action'],
      ['T22', 'Non-Admin พยายามเข้า — Redirect'],
    ],
  },
];

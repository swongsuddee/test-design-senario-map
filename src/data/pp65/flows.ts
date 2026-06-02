import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    USER([User A เปิด Profile\\nของ User B]) --> ACTION{เลือกการกระทำ}

    ACTION -->|Follow| FOLLOW[Follow User B]
    ACTION -->|Unfollow| UNFOLLOW[Unfollow User B]
    ACTION -->|Block| BLOCK[Block User B]

    FOLLOW --> FCOUNT[followers_count B + 1\\nfollowing_count A + 1]
    FCOUNT --> KAFKA[Publish Kafka: user.followed\\n→ Notification Service]
    KAFKA --> NOTIFY([User B ได้รับ notification])

    UNFOLLOW --> UFCOUNT[followers_count B - 1\\nfollowing_count A - 1]

    BLOCK --> MUTUAL[Mutual Block\\nA ไม่เห็น B content\\nB ไม่เห็น A content]

    USER --> LISTS{ดูรายการ}
    LISTS -->|Followers| FLIST[Followers List\\npaginated]
    LISTS -->|Following| FWLIST[Following List\\npaginated]

    style NOTIFY fill:#4CAF50,color:#fff
    style MUTUAL fill:#f44336,color:#fff
    style KAFKA fill:#2196F3,color:#fff
    style FCOUNT fill:#4CAF50,color:#fff`;

const FLOW_FOLLOW = `flowchart TD
    S1([User A หน้า\\nProfile User B]) -->|"T1 · PP65-TC-001"| S2[A กด Follow B]
    S2 -->|"T2 · PP65-TC-001"| S3[Follow Relationship\\nสร้างสำเร็จ]
    S3 -->|"T2"| S4[followers_count B +1\\nfollowing_count A +1]
    S4 -->|"T3 · PP65-TC-001"| S5[Kafka: user.followed\\nemit]
    S5 -->|"T4 · PP65-TC-002"| S6([Notification ส่งถึง B])
    S2 -->|"T5 · PP65-TC-003"| S7[A Follow B อยู่แล้ว\\nDuplicate follow]
    S7 --> S8([Idempotent: ไม่ error\\nstate ไม่เปลี่ยน])

    style S6 fill:#4CAF50,color:#fff
    style S4 fill:#4CAF50,color:#fff
    style S8 fill:#FF9800,color:#fff
    style S5 fill:#2196F3,color:#fff`;

const FLOW_UNFOLLOW = `flowchart TD
    S9([A Follow B\\nอยู่แล้ว]) -->|"T6 · PP65-TC-004"| S10[A กด Unfollow B]
    S10 -->|"T7 · PP65-TC-004"| S11[Follow Relationship\\nถูกลบ]
    S11 --> S12([followers_count B -1\\nfollowing_count A -1])
    S10 -->|"T8 · PP65-TC-005"| S13([A ไม่ได้ Follow B\\nUnfollow ซ้ำ — no error])

    style S12 fill:#4CAF50,color:#fff
    style S13 fill:#FF9800,color:#fff`;

const FLOW_LISTS = `flowchart TD
    S14([User เข้า\\nFollowers List]) -->|"T9 · PP65-TC-006"| S15[แสดงรายการ paginated\\navatar, display name, follow status]
    S15 -->|"T10 · PP65-TC-006"| S15B[โหลดหน้าถัดไป\\npagination]
    S16([User เข้า\\nFollowing List]) -->|"T11 · PP65-TC-007"| S17[แสดงรายการ paginated\\navatar, display name, follow status]
    S17 -->|"T12 · PP65-TC-007"| S17B[โหลดหน้าถัดไป]
    S14 -->|"T13 · PP65-TC-008"| S18([Empty State\\n"ยังไม่มี Followers"])
    S16 -->|"T13 · PP65-TC-008"| S18

    style S15 fill:#4CAF50,color:#fff
    style S17 fill:#4CAF50,color:#fff
    style S18 fill:#FF9800,color:#fff`;

const FLOW_BLOCK = `flowchart TD
    S19([User A หน้า\\nProfile User B]) -->|"T14 · PP65-TC-009"| S20[A กด Block B]
    S20 -->|"T15 · PP65-TC-009"| S21[Mutual Block\\nสร้างสำเร็จ]
    S21 -->|"T17 · PP65-TC-009"| S22[A ไม่เห็น content B\\nProfile/Post hidden]
    S21 -->|"T16 · PP65-TC-010"| S23[B ไม่เห็น content A\\nProfile hidden]
    S24([B พยายามดู\\nProfile A]) -->|"T16 · PP65-TC-010"| S25([Access Denied\\nContent Hidden])

    style S22 fill:#f44336,color:#fff
    style S23 fill:#f44336,color:#fff
    style S25 fill:#f44336,color:#fff
    style S21 fill:#FF9800,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Social Graph',
  subtitle: 'End-to-end system overview',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-follow',
    num: '2',
    title: 'Sub-Flow 1 · Follow User',
    subtitle: 'S1–S8 · T1–T5 · TC-001–003',
    chart: FLOW_FOLLOW,
    states: [
      ['S1', 'User A อยู่หน้า Profile User B'],
      ['S2', 'A กด Follow B'],
      ['S3', 'Follow Relationship สร้างสำเร็จ'],
      ['S4', 'followers_count (B) + 1, following_count (A) + 1'],
      ['S5', 'Kafka: user.followed emit'],
      ['S6', 'Notification Service แจ้งเตือน B'],
      ['S7', 'A Follow B อยู่แล้ว (duplicate follow attempt)'],
      ['S8', 'Idempotent: ไม่ error, state ไม่เปลี่ยน'],
    ],
    transitions: [
      ['T1', 'กด Follow'],
      ['T2', 'Relationship สร้างสำเร็จ — count อัปเดต'],
      ['T3', 'Kafka publish สำเร็จ'],
      ['T4', 'Notification ส่งถึง B'],
      ['T5', 'Duplicate follow — ระบบ handle idempotently'],
    ],
  },
  {
    sectionId: 'flow-unfollow',
    num: '3',
    title: 'Sub-Flow 2 · Unfollow User',
    subtitle: 'S9–S13 · T6–T8 · TC-004–005',
    chart: FLOW_UNFOLLOW,
    states: [
      ['S9',  'A Follow B อยู่แล้ว'],
      ['S10', 'A กด Unfollow B'],
      ['S11', 'Follow Relationship ถูกลบ'],
      ['S12', 'followers_count (B) - 1, following_count (A) - 1'],
      ['S13', 'A ไม่ได้ Follow B (Unfollow ซ้ำ — idempotent)'],
    ],
    transitions: [
      ['T6', 'กด Unfollow'],
      ['T7', 'Relationship ลบสำเร็จ — count อัปเดต'],
      ['T8', 'Unfollow ซ้ำ — idempotent'],
    ],
  },
  {
    sectionId: 'flow-lists',
    num: '4',
    title: 'Sub-Flow 3 · Followers & Following Lists',
    subtitle: 'S14–S18 · T9–T13 · TC-006–008',
    chart: FLOW_LISTS,
    states: [
      ['S14',  'User เข้าดู Followers List'],
      ['S15',  'แสดงรายการ paginated (avatar, display name, follow status)'],
      ['S15B', 'โหลดหน้าถัดไป — pagination Followers'],
      ['S16',  'User เข้าดู Following List'],
      ['S17',  'แสดงรายการ paginated (avatar, display name, follow status)'],
      ['S17B', 'โหลดหน้าถัดไป — pagination Following'],
      ['S18',  'รายการว่าง (ยังไม่มี follower/following)'],
    ],
    transitions: [
      ['T9',  'เปิด Followers List'],
      ['T10', 'เลื่อนหน้า (pagination) Followers'],
      ['T11', 'เปิด Following List'],
      ['T12', 'เลื่อนหน้า (pagination) Following'],
      ['T13', 'Followers/Following = 0 → Empty state'],
    ],
  },
  {
    sectionId: 'flow-block',
    num: '5',
    title: 'Sub-Flow 4 · Block User',
    subtitle: 'S19–S25 · T14–T17 · TC-009–010',
    chart: FLOW_BLOCK,
    states: [
      ['S19', 'User A อยู่หน้า Profile User B'],
      ['S20', 'A กด Block B'],
      ['S21', 'Block Relationship สร้าง (mutual)'],
      ['S22', 'A ไม่เห็น content ของ B'],
      ['S23', 'B ไม่เห็น content ของ A'],
      ['S24', 'B พยายามดู Profile A'],
      ['S25', 'Access Denied / Hidden'],
    ],
    transitions: [
      ['T14', 'กด Block'],
      ['T15', 'Mutual block สำเร็จ — A ไม่เห็น B'],
      ['T16', 'B พยายามเข้า Profile A — denied'],
      ['T17', 'A พยายามเห็น content B — hidden'],
    ],
  },
];

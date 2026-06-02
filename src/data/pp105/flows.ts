import type { FlowSectionDef } from '@/types';

const MASTER_FLOW = `flowchart TD
    USER([End User เปิด\\nEvent Detail]) --> TYPE{Event\\nType?}

    TYPE -->|Free Event| JOIN[กด Join Free]
    TYPE -->|Paid Event| SELECT[เลือก Ticket Type\\n& จำนวน]

    JOIN --> REGISTERED([สถานะ: registered\\nEvent ใน My Events])

    SELECT --> RESERVE[Reserve Ticket\\n15 นาที]
    RESERVE --> PAYMENT{ชำระเงิน\\nภายใน 15 นาที?}
    PAYMENT -->|Yes| CONFIRM([สถานะ: confirmed\\n+ QR Code ใน My Events])
    PAYMENT -->|No / Timeout| RELEASE([Ticket Released\\nกลับเป็น available])

    REGISTERED --> MYEVENTS[My Events\\nUpcoming / Past]
    CONFIRM --> MYEVENTS

    MYEVENTS --> LEAVE{ต้องการ\\nยกเลิก?}
    LEAVE -->|Yes| CANCEL[กด Cancel ยืนยัน]
    CANCEL --> CANCELLED([สถานะ: cancelled\\nTicket available\\n+ Refund ถ้า paid])
    LEAVE -->|No| MYEVENTS

    MYEVENTS --> QR[แสดง QR Code]
    QR --> CHECKIN{Organizer\\nScan QR?}
    CHECKIN -->|Yes| CHECKED([สถานะ: checked-in\\nแสดงใน Participant list])

    style REGISTERED fill:#4CAF50,color:#fff
    style CONFIRM fill:#4CAF50,color:#fff
    style CHECKED fill:#4CAF50,color:#fff
    style RELEASE fill:#f44336,color:#fff
    style CANCELLED fill:#f44336,color:#fff
    style RESERVE fill:#FF9800,color:#fff`;

const FLOW_JOIN_FREE = `flowchart TD
    S1([User หน้า Event Detail\\nFree Event]) -->|"T1 · PP105-TC-001"| S2[User กด Join]
    S2 -->|"T2 · PP105-TC-001"| S3[สถานะ: registered\\nบันทึกสำเร็จ]
    S3 -->|"T3 · PP105-TC-001"| S4([Event แสดงใน\\nMy Events Upcoming])
    S2 -->|"T4 · PP105-TC-002"| S5([Duplicate Join\\nError / Idempotent])

    style S4 fill:#4CAF50,color:#fff
    style S5 fill:#FF9800,color:#fff
    style S3 fill:#2196F3,color:#fff`;

const FLOW_BUY_TICKET = `flowchart TD
    S6([User เลือก Ticket Type\\n& จำนวน]) -->|"T5 · PP105-TC-003"| S7[Reserve Ticket\\n15 นาที]
    S7 -->|"T5"| S8[สถานะ: reserved\\nTimer เริ่มนับ]
    S8 -->|"T6 · PP105-TC-003"| S9[ชำระเงินสำเร็จ\\nKafka: payment.success]
    S9 -->|"T6"| S10[สถานะ: confirmed]
    S10 -->|"T8 · PP105-TC-004"| S11([QR Code แสดง\\nใน My Events])
    S8 -->|"T7 · PP105-TC-005"| S12[Timeout 15 นาที\\nไม่ชำระเงิน]
    S12 -->|"T7"| S13([Ticket Released\\nกลับเป็น available])

    style S11 fill:#4CAF50,color:#fff
    style S13 fill:#f44336,color:#fff
    style S8 fill:#FF9800,color:#fff
    style S10 fill:#2196F3,color:#fff`;

const FLOW_MY_EVENTS = `flowchart TD
    S14([User เข้าหน้า\\nMy Events]) -->|"T9 · PP105-TC-006"| S15[Tab Upcoming\\nEvent ที่ยังไม่เริ่ม]
    S14 -->|"T10 · PP105-TC-007"| S16[Tab Past\\nEvent ที่ผ่านมาแล้ว]
    S15 -->|"T11 · PP105-TC-008"| S17([แสดง QR Code\\nสำหรับ Check-in])

    style S17 fill:#4CAF50,color:#fff
    style S15 fill:#2196F3,color:#fff`;

const FLOW_LEAVE = `flowchart TD
    S18([User กด Cancel\\nยืนยัน]) -->|"T12 · PP105-TC-009"| S19[สถานะ: cancelled]
    S18 -->|"T13 · PP105-TC-010"| S21[Trigger Refund\\nPaid Event]
    S19 -->|"T14 · PP105-TC-009"| S20[Ticket กลับเป็น\\navailable]
    S21 --> S20
    S20 -->|"T15 · PP105-TC-009 PP105-TC-010"| S22([Event หายจาก\\nUpcoming])
    S23([Cancel Event\\nที่เริ่มแล้ว]) -->|"T16 · PP105-TC-011"| S24([Error: ไม่สามารถยกเลิก\\nEvent ที่เริ่มแล้ว])

    style S22 fill:#f44336,color:#fff
    style S24 fill:#f44336,color:#fff
    style S19 fill:#FF9800,color:#fff`;

const FLOW_CHECKIN = `flowchart TD
    S25([Organizer เปิดหน้า\\nScan QR]) -->|"T17 · PP105-TC-012"| S26[Scan QR Code\\nของ Attendee]
    S26 -->|"T18 · PP105-TC-012"| S27[สถานะ: checked-in]
    S27 --> S28([แสดงใน\\nParticipant List])
    S26 -->|"T19 · PP105-TC-013"| S29([QR Code ไม่ valid\\nError message])

    style S28 fill:#4CAF50,color:#fff
    style S29 fill:#f44336,color:#fff
    style S27 fill:#2196F3,color:#fff`;

export const MASTER_FLOW_SECTION: FlowSectionDef = {
  sectionId: 'master-flow',
  num: '1',
  title: 'Master Flow — Event Registration / Join Event',
  subtitle: 'End-to-end system overview — Mobile Flutter App',
  chart: MASTER_FLOW,
};

export const FLOW_SECTIONS: FlowSectionDef[] = [
  {
    sectionId: 'flow-join-free',
    num: '2',
    title: 'Sub-Flow 1 · Join Free Event',
    subtitle: 'S1–S5 · T1–T4 · TC-001–002',
    chart: FLOW_JOIN_FREE,
    states: [
      ['S1', 'User อยู่หน้า Event Detail (Free Event)'],
      ['S2', 'User กด Join'],
      ['S3', 'สถานะ: registered'],
      ['S4', 'Event แสดงใน My Events (Upcoming)'],
      ['S5', 'User พยายาม Join Event ซ้ำ'],
    ],
    transitions: [
      ['T1', 'กด Join (Free Event)'],
      ['T2', 'บันทึก registered สำเร็จ'],
      ['T3', 'Event แสดงใน My Events (Upcoming)'],
      ['T4', 'Duplicate join — idempotent'],
    ],
  },
  {
    sectionId: 'flow-buy-ticket',
    num: '3',
    title: 'Sub-Flow 2 · Buy Ticket — Paid Event',
    subtitle: 'S6–S13 · T5–T8 · TC-003–005',
    chart: FLOW_BUY_TICKET,
    states: [
      ['S6',  'User เลือก Ticket Type & จำนวน'],
      ['S7',  'ระบบ Reserve Ticket 15 นาที'],
      ['S8',  'สถานะ: reserved'],
      ['S9',  'User ชำระเงินสำเร็จภายใน 15 นาที'],
      ['S10', 'สถานะ: confirmed'],
      ['S11', 'QR Code แสดงใน My Events'],
      ['S12', 'Timeout 15 นาที — ไม่ชำระ'],
      ['S13', 'Ticket Released — กลับเป็น available'],
    ],
    transitions: [
      ['T5', 'เริ่ม Checkout — Reserve Ticket'],
      ['T6', 'ชำระเงินสำเร็จ → confirmed'],
      ['T7', 'Timeout 15 นาที → release ticket'],
      ['T8', 'QR Code สร้างสำเร็จ'],
    ],
  },
  {
    sectionId: 'flow-my-events',
    num: '4',
    title: 'Sub-Flow 3 · My Events',
    subtitle: 'S14–S17 · T9–T11 · TC-006–008',
    chart: FLOW_MY_EVENTS,
    states: [
      ['S14', 'User เข้าหน้า My Events'],
      ['S15', 'Tab Upcoming — แสดง Event ที่ยังไม่เริ่ม'],
      ['S16', 'Tab Past — แสดง Event ที่ผ่านมาแล้ว'],
      ['S17', 'แสดง QR Code สำหรับ Check-in'],
    ],
    transitions: [
      ['T9',  'เข้า Tab Upcoming'],
      ['T10', 'เข้า Tab Past'],
      ['T11', 'กด View QR Code'],
    ],
  },
  {
    sectionId: 'flow-leave',
    num: '5',
    title: 'Sub-Flow 4 · Leave Event / Cancellation',
    subtitle: 'S18–S24 · T12–T16 · TC-009–011',
    chart: FLOW_LEAVE,
    states: [
      ['S18', 'User กด Cancel ยืนยัน'],
      ['S19', 'สถานะ: cancelled'],
      ['S20', 'Ticket กลับเป็น available'],
      ['S21', 'Trigger Refund (Paid Event)'],
      ['S22', 'Event หายจาก Upcoming'],
      ['S23', 'User พยายาม Cancel Event ที่เริ่มแล้ว'],
    ],
    transitions: [
      ['T12', 'กด Cancel + ยืนยัน (Free Event)'],
      ['T13', 'กด Cancel + ยืนยัน (Paid Event) → Trigger Refund'],
      ['T14', 'สถานะ cancelled; Ticket available'],
      ['T15', 'Event หายจาก Upcoming'],
      ['T16', 'Cancel Event ที่ started / ผ่านไปแล้ว — ไม่อนุญาต'],
    ],
  },
  {
    sectionId: 'flow-checkin',
    num: '6',
    title: 'Sub-Flow 5 · Check-in via QR Code',
    subtitle: 'S25–S29 · T17–T19 · TC-012–013',
    chart: FLOW_CHECKIN,
    states: [
      ['S25', 'Organizer เปิดหน้า Scan QR'],
      ['S26', 'Scan QR Code ของ Attendee'],
      ['S27', 'สถานะ: checked-in'],
      ['S28', 'แสดงใน Participant List'],
      ['S29', 'QR Code ไม่ valid หรือ expired'],
    ],
    transitions: [
      ['T17', 'Scan QR Code สำเร็จ (valid)'],
      ['T18', 'สถานะเปลี่ยนเป็น checked-in'],
      ['T19', 'Scan QR Code ที่ไม่ valid / expired'],
    ],
  },
];

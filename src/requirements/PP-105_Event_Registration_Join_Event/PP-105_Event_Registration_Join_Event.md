# PP-105 · [M-App][End-User] Event Registration (Join Event - สมัครเข้าร่วมงานวิ่ง)

| Field        | Value                     |
|--------------|---------------------------|
| **Key**      | PP-105                    |
| **Type**     | Story                     |
| **Project**  | POPPA                     |
| **Status**   | In Progress               |
| **Assignee** | —                         |

---

## User Story

> **ในฐานะ:** End-User ผู้ใช้งาน Mobile App
> **ฉันต้องการ:** เข้าร่วม Event งานวิ่งได้ตั้งแต่การสมัคร ซื้อบัตร ไปจนถึง Check-in หน้างาน
> **เพื่อ:** จัดการการเข้าร่วม Event อย่างครบถ้วนในแอปเดียว

---

## 1. Description

ระบบ Event Registration ครอบคลุม 5 flow หลัก:
- **Join Free Event** — สมัครงานฟรี ไม่ผ่าน payment
- **Buy Ticket (Paid Event)** — เลือก Ticket Type, จ่ายเงิน, รับยืนยัน
- **My Events** — ดู Upcoming / Past events + QR Code
- **Leave Event** — ยกเลิกการเข้าร่วม + trigger refund (paid)
- **Check-in** — Organizer scan QR code

---

## 2. Technical Acceptance Criteria

### Scenario 1 — Join Free Event
- **Given:** User อยู่ที่หน้า Event Detail ของงานฟรี
- **When:** กด "Join" เพื่อเข้าร่วม
- **Then:** ระบบบันทึกสถานะเป็น `registered` และ Event แสดงในหน้า My Events — ไม่ต้องผ่านขั้นตอน payment

### Scenario 2 — Buy Ticket (Paid Event)
- **Given:** User เลือก Ticket Type และจำนวน
- **When:** เริ่ม Checkout
- **Then:**
  - ระบบ Reserve ticket 15 นาที ระหว่าง checkout
  - ชำระเงินสำเร็จ → สถานะเป็น `confirmed` + แสดง ticket ใน My Events
  - ไม่จ่ายภายใน 15 นาที → ticket ถูกปล่อยกลับ (available)

### Scenario 3 — My Events
- **Given:** User เข้าหน้า My Events
- **When:** ดู tab Upcoming / Past
- **Then:** แสดง Event (ชื่อ, วันเวลา, สถานที่), Ticket info (type, qty, status) และ QR Code สำหรับ Check-in

### Scenario 4 — Leave Event (Cancellation)
- **Given:** User ต้องการยกเลิกการเข้าร่วม Event ที่ยังไม่เริ่ม
- **When:** กด Cancel ยืนยัน
- **Then:** สถานะเปลี่ยนเป็น `cancelled`, Ticket กลับไปเป็น available, ถ้า paid event → trigger refund, Event หายจาก Upcoming

### Scenario 5 — Check-in (Organizer Flow)
- **Given:** Organizer ต้องการ Check-in ผู้เข้าร่วม
- **When:** Scan QR Code ของ attendee
- **Then:** ระบบเปลี่ยนสถานะเป็น `checked-in` และแสดงใน Participant list

---

## 3. Backend & Data Specifications

### Ticket Status Flow
```
reserved (15 min) → confirmed (paid) → checked-in
                 ↘ released (timeout/cancel)
```

### Key Dependencies
- Payment Service (Payginix — QR & Mobile Banking)
- Notification API (Push notification หลัง confirm)
- Points System (Optional reward หลัง confirm)

---

## 4. Definition of Done

- [ ] Join free event บันทึกสถานะ `registered` ได้ถูกต้อง
- [ ] Ticket reservation (15 min) + auto-release ทำงานถูกต้อง
- [ ] Payment flow → `confirmed` + My Events แสดง QR Code
- [ ] Leave Event + Refund flow ทำงานถูกต้อง
- [ ] Check-in via QR Code ทำงานถูกต้อง

---

## 5. Subtasks

| Key | Summary | Status |
|-----|---------|--------|
| [PP-180](./PP-180_BE_Design_Event_Participation_Architecture.md) | [BE][Event] Design Event Participation Architecture | Ready To Test STG |
| [PP-181](./PP-181_BE_Implement_GetEventByID.md) | [BE][Event][User] Implement GetEventByID | Ready To Test STG |
| [PP-182](./PP-182_BE_Implement_Join_Event_Free.md) | [BE][Ticket][User] Implement Join Event (free event support) | Ready To Test STG |
| [PP-183](./PP-183_BE_Implement_GetTicketType.md) | [BE][Ticket][User] Implement GetTicketType | Ready To Test STG |
| [PP-184](./PP-184_BE_Implement_GetParticipantList.md) | [BE][Ticket][User] Implement GetParticipantList | Ready To Test STG |
| [PP-185](./PP-185_BE_Create_Pending_Registration_Paid.md) | [BE][Event] Implement Create Pending Registration for Paid Event | Closed |
| [PP-186](./PP-186_BE_Paid_Event_Call_Payment_API.md) | [BE][Event][User] Paid Event call payment api | Ready To Test STG |
| [PP-187](./PP-187_BE_Expired_Ticket_Worker_Temporal.md) | [BE][Ticket][User] Implement Expired ticket worker include temporal | Ready to Deploy STG |
| [PP-188](./PP-188_BE_Consume_Kafka_Payment_Success.md) | [BE][Ticket][User] Consume Kafka payment.success to update order success | Ready To Test STG |
| [PP-189](./PP-189_BE_Payment_Completed_Idempotency.md) | [BE][Ticket][User] Implement Payment Completed Idempotency | Ready To Test STG |
| [PP-190](./PP-190_BE_Publish_Points_Event_After_Confirmed.md) | [BE][Event] Publish Points Event After Confirmed | Dev Block |
| [PP-191](./PP-191_BE_My_Events_API.md) | [BE][Event][User] Implement My Events API | Dev Block |
| [PP-192](./PP-192_BE_My_Event_Detail_API.md) | [BE][Event][User] Implement My Event Detail API | Dev Block |
| [PP-193](./PP-193_BE_Leave_Event_API.md) | [BE][Event] Implement Leave Event API | Dev Block |
| [PP-194](./PP-194_BE_Integrate_Refund_Flow.md) | [BE][Event] Integrate Refund Flow with Payment Service | Dev Block |
| [PP-195](./PP-195_BE_Generate_QR_Code_Ticket.md) | [BE][Event] Implement Generate QR Code for Ticket | Dev Block |
| [PP-196](./PP-196_BE_Checkin_API.md) | [BE][Event] Implement Check-in API | Dev Block |
| [PP-198](./PP-198_BE_Call_Notification_API.md) | [BE][Event][User] Call to notification-api (Push notification) | Ready To Test STG |
| [PP-199](./PP-199_BE_Registration_History_Tracking.md) | [BE][Event] Implement Registration History Tracking | Dev Block |
| [PP-200](./PP-200_BE_Get_Registration_Timeline_API.md) | [BE][Event] Implement Get Registration Timeline API | Dev Block |
| [PP-223](./PP-223_BE_Implement_Participant_Detail.md) | [BE][Event][Organizer] Implement Participant Detail | Ready to Deploy STG |
| [PP-224](./PP-224_BE_Implement_Finance_Page.md) | [BE][Ticket][Organizer] Implement การเงิน Page | Ready to Deploy STG |
| [PP-225](./PP-225_BE_Implement_Finance_Detail.md) | [BE][Ticket][Organizer] Implement การเงิน detail | Ready to Deploy STG |
| [PP-284](./PP-284_BE_CRUD_Guest.md) | [BE][Guest] CRUD Guest | Ready To Test STG |
| [PP-288](./PP-288_MB_Ticket_Selection_UI.md) | [MB][End-User] Event Registration Ticket Selection UI | Ready To Test STG |
| [PP-289](./PP-289_MB_Ticket_Selection_API.md) | [MB][End-User] Event Registration Ticket Selection Integrate API | Ready To Test STG |
| [PP-290](./PP-290_MB_Fill_Information_UI.md) | [MB][End-User] Event Registration Fill Information UI | Ready To Test STG |
| [PP-291](./PP-291_MB_Fill_Information_API.md) | [MB][End-User] Event Registration Fill Information Integrate API | Ready To Test STG |
| [PP-292](./PP-292_MB_Summary_UI.md) | [MB][End-User] Event Registration Summary UI | Ready To Test STG |
| [PP-293](./PP-293_MB_Registration_Draft.md) | [MB][End-User] Event Registration Draft (Local Storage) | Ready To Test STG |
| [PP-295](./PP-295_MB_Summary_API.md) | [MB][End-User] Event Registration Summary Integrate API | Ready To Test STG |
| [PP-443](./PP-443_BE_Ticket_Schema_Order.md) | [BE][Ticket] ปรับ schema Order | Ready to Deploy STG |

> Flow diagram → [PP-105.diagram.md](../../test-design/PP-105.diagram.md)
> Test design → [PP-105.design.md](../../test-design/PP-105.design.md)

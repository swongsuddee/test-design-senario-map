# PP-467 · [BE][Story] Implement Story State Machine & Transition Logic

| Field        | Value                                    |
|--------------|------------------------------------------|
| **Key**      | PP-467                                   |
| **Type**     | Sub-task                                 |
| **Project**  | POPPA                                    |
| **Status**   | To Do                                    |
| **Assignee** | —                                        |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md)        |

---

## User Story

> Backend มี State Machine จัดการ Lifecycle ของ Story ตั้งแต่สร้างจนถึงหมดอายุหรือถูกลบ

---

## 1. Description

Implement Story State Machine บน Backend กำหนด States และ Transitions ที่ถูกต้องสำหรับ Lifecycle ของ Story ได้แก่ PENDING → ACTIVE → EXPIRED/DELETED พร้อม Guard Conditions

---

## 2. Acceptance Criteria

### Scenario 1 — PENDING to ACTIVE Transition

- **Given:** Story ถูกสร้างใหม่ (State = PENDING)
- **When:** Media Upload สำเร็จ
- **Then:** State เปลี่ยนเป็น ACTIVE และ Story ปรากฏใน Feed

### Scenario 2 — ACTIVE to EXPIRED Transition

- **Given:** Story มี State = ACTIVE
- **When:** expiresAt < now
- **Then:** State เปลี่ยนเป็น EXPIRED และ Story หายจาก Public Feed

### Scenario 3 — ACTIVE to DELETED Transition

- **Given:** Story มี State = ACTIVE
- **When:** เจ้าของกด Delete
- **Then:** State เปลี่ยนเป็น DELETED และ Story หายจาก Public Feed

### Scenario 4 — Invalid Transition Guard

- **Given:** Story มี State = EXPIRED
- **When:** พยายาม Transition ไปยัง ACTIVE
- **Then:** ระบบ Reject Transition และ Log Error

---

## 3. Definition of Done

- [ ] PENDING → ACTIVE เมื่อ Upload สำเร็จ
- [ ] ACTIVE → EXPIRED เมื่อหมดเวลา
- [ ] ACTIVE → DELETED เมื่อเจ้าของกด Delete
- [ ] Invalid Transition ถูก Guard และ Log

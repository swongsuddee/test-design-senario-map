# PP-462 · [BE][Story] Implement Pub/Sub Consumer — Story Upload Events

| Field        | Value                                    |
|--------------|------------------------------------------|
| **Key**      | PP-462                                   |
| **Type**     | Sub-task                                 |
| **Project**  | POPPA                                    |
| **Status**   | In Progress |
| **Assignee** | —                                        |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md)        |

---

## User Story

> Backend มี Pub/Sub Consumer รับ Event การอัปโหลด Story Media และอัปเดต Story State ให้พร้อมแสดงผล

---

## 1. Description

Implement Kafka Consumer สำหรับ Story Upload Events เมื่อ Media Upload Service อัปโหลดสำเร็จ Consumer จะอัปเดต Story State จาก PENDING เป็น ACTIVE และ Publish Event ต่อไปยัง Topic อื่น

---

## 2. Acceptance Criteria

### Scenario 1 — Consume Upload Success Event

- **Given:** Media Upload Service Publish Event `story.upload.completed`
- **When:** Consumer รับ Event
- **Then:** Story State ถูกอัปเดตจาก PENDING เป็น ACTIVE

### Scenario 2 — Consume Upload Failed Event

- **Given:** Media Upload Service Publish Event `story.upload.failed`
- **When:** Consumer รับ Event
- **Then:** Story State ถูกอัปเดตเป็น FAILED และ Story ไม่แสดงใน Feed

### Scenario 3 — Retry on Processing Error

- **Given:** Consumer พบ Error ขณะประมวลผล Event
- **When:** เกิด Exception
- **Then:** Consumer Retry ตาม Policy ที่กำหนดไว้

---

## 3. Definition of Done

- [ ] Consumer รับ story.upload.completed และอัปเดต State เป็น ACTIVE
- [ ] Consumer รับ story.upload.failed และอัปเดต State เป็น FAILED
- [ ] Retry Policy ทำงานถูกต้อง

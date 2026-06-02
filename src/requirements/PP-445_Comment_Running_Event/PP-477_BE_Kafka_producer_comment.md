# PP-477 · [BE] Kafka producer comment.created/deleted + event-api consumer อัปเดต commentsCount

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-477                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | To Do                                              |
| **Assignee** | —                                                  |
| **Parent**   | [PP-445](./PP-445_Comment_Running_Event.md)        |

---

## User Story

> Backend Publish Kafka Events เมื่อ Comment ถูกสร้าง/ลบ และ event-api Consumer อัปเดต commentsCount ใน Event Document

---

## 1. Description

Implement Kafka Producer ใน Comment Service ที่ Publish `comment.created` เมื่อ Comment สำเร็จ และ `comment.deleted` เมื่อลบ พร้อม Implement Consumer ใน event-api ที่อัปเดต `commentsCount` Field ใน Event Document

---

## 2. Acceptance Criteria

### Scenario 1 — Publish comment.created

- **Given:** Comment ถูกสร้างสำเร็จ
- **When:** Comment Service บันทึก Comment
- **Then:** Event `comment.created` พร้อม commentId, eventId, authorId ถูก Publish ไปยัง Kafka

### Scenario 2 — Publish comment.deleted

- **Given:** Comment ถูกลบ
- **When:** Comment Service ลบ Comment
- **Then:** Event `comment.deleted` พร้อม commentId, eventId ถูก Publish ไปยัง Kafka

### Scenario 3 — event-api Consumer Update Count

- **Given:** event-api Consumer รับ Event comment.created
- **When:** Consumer ประมวลผล
- **Then:** `commentsCount` ใน Event Document เพิ่มขึ้น 1

### Scenario 4 — event-api Consumer Decrement Count

- **Given:** event-api Consumer รับ Event comment.deleted
- **When:** Consumer ประมวลผล
- **Then:** `commentsCount` ใน Event Document ลดลง 1 (ไม่ต่ำกว่า 0)

---

## 3. Definition of Done

- [ ] Kafka Producer Publish comment.created สำเร็จ
- [ ] Kafka Producer Publish comment.deleted สำเร็จ
- [ ] event-api Consumer อัปเดต commentsCount เพิ่มขึ้น
- [ ] event-api Consumer อัปเดต commentsCount ลดลง (ไม่ต่ำกว่า 0)

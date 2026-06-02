# PP-460 · [BE][Story] Implement API Reply to Story

| Field        | Value                                    |
|--------------|------------------------------------------|
| **Key**      | PP-460                                   |
| **Type**     | Sub-task                                 |
| **Project**  | POPPA                                    |
| **Status**   | To Do                                    |
| **Assignee** | —                                        |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md)        |

---

## User Story

> Backend มี API สำหรับรับ Reply ที่ User ส่งตอบกลับ Story ของคนอื่น

---

## 1. Description

Implement API Reply to Story บน Backend รับข้อความ Reply จาก User, บันทึกลงใน Database, และส่ง Notification ไปยังเจ้าของ Story

---

## 2. Acceptance Criteria

### Scenario 1 — Reply Story Success

- **Given:** User เปิดดู Story ของเพื่อน
- **When:** Client ส่ง POST /stories/:id/replies พร้อมข้อความ
- **Then:** API บันทึก Reply สำเร็จและส่ง Notification ให้เจ้าของ Story

### Scenario 2 — Validation

- **Given:** Client ส่ง Reply ที่ข้อความว่าง
- **When:** API รับ Request
- **Then:** Return HTTP 400 พร้อม Error Message

### Scenario 3 — Reply to Expired Story

- **Given:** Story หมดอายุแล้ว
- **When:** Client ส่ง POST /stories/:id/replies
- **Then:** Return HTTP 404 หรือ 410 Gone

---

## 3. Definition of Done

- [ ] POST /stories/:id/replies บันทึก Reply สำเร็จ
- [ ] Notification ส่งให้เจ้าของ Story
- [ ] Validation คืน HTTP 400 เมื่อข้อความว่าง
- [ ] ไม่สามารถ Reply Story ที่หมดอายุ

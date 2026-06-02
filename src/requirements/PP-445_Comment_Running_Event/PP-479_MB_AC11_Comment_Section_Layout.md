# PP-479 · [MB][End-User] AC 1.1 Comment Section layout (avatar/name/text/timestamp)

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-479                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | To Do                                              |
| **Assignee** | —                                                  |
| **Parent**   | [PP-445](./PP-445_Comment_Running_Event.md)        |

---

## User Story

> End-User เห็น Comment Section บนหน้า Event ที่แสดง Avatar, ชื่อ, ข้อความ และ Timestamp ได้อย่างถูกต้อง

---

## 1. Description

Implement UI ของ Comment Section บน Mobile App แสดง Comment Card แต่ละรายการพร้อม Avatar ของผู้แสดงความคิดเห็น, Display Name, ข้อความ Comment, และ Timestamp

---

## 2. Acceptance Criteria

### Scenario 1 — Comment Card Layout

- **Given:** มี Comment ใน Event
- **When:** หน้า Event Detail โหลด Comment Section
- **Then:** แต่ละ Comment แสดง Avatar (รูปโปรไฟล์), Display Name, ข้อความ Comment, และ Timestamp

### Scenario 2 — Avatar Fallback

- **Given:** User ที่ Comment ไม่มีรูปโปรไฟล์
- **When:** Comment แสดง
- **Then:** แสดง Default Avatar แทนรูปโปรไฟล์ที่หายไป

### Scenario 3 — Long Name Handling

- **Given:** User มีชื่อยาว
- **When:** Comment แสดง
- **Then:** ชื่อถูก Truncate ด้วย "..." เมื่อเกินความกว้างที่กำหนด

---

## 3. Definition of Done

- [ ] Comment Card แสดง Avatar, ชื่อ, ข้อความ, Timestamp
- [ ] Default Avatar แสดงเมื่อไม่มีรูปโปรไฟล์
- [ ] ชื่อยาว Truncate ด้วย "..."

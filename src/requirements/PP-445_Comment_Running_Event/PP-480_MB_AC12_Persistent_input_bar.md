# PP-480 · [MB][End-User] AC 1.2 Persistent input bar + avatar

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-480                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | To Do                                              |
| **Assignee** | —                                                  |
| **Parent**   | [PP-445](./PP-445_Comment_Running_Event.md)        |

---

## User Story

> End-User เห็น Input Bar สำหรับพิมพ์ Comment ติดอยู่ด้านล่างหน้าจอตลอดเวลาพร้อม Avatar ของตัวเอง

---

## 1. Description

Implement Persistent Input Bar บนหน้า Event Detail ที่ติดอยู่ด้านล่างหน้าจอตลอดเวลา แสดง Avatar ของ User ที่ Login อยู่ช่องพิมพ์ Comment และปุ่ม Send

---

## 2. Acceptance Criteria

### Scenario 1 — Persistent Bar

- **Given:** End-User อยู่ในหน้า Event Detail ที่มี Comment Section
- **When:** เลื่อนหน้าจอขึ้นลง
- **Then:** Input Bar ยังคงอยู่ด้านล่างหน้าจอตลอดเวลา

### Scenario 2 — User Avatar Display

- **Given:** End-User Login อยู่
- **When:** หน้า Event Detail โหลด
- **Then:** Avatar ของ User ที่ Login แสดงอยู่ที่ Input Bar

### Scenario 3 — Keyboard Aware

- **Given:** End-User กด Input Bar
- **When:** Keyboard เปิดขึ้น
- **Then:** Input Bar เลื่อนขึ้นตาม Keyboard โดย Comment List ยังเห็นได้

---

## 3. Definition of Done

- [ ] Input Bar ติดด้านล่างหน้าจอตลอดเวลา
- [ ] Avatar ของ User ที่ Login แสดงบน Input Bar
- [ ] Input Bar เลื่อนขึ้นเมื่อ Keyboard เปิด

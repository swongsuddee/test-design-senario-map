# PP-461 · [BE][Story] Implement API Soft Delete Story

| Field        | Value                                    |
|--------------|------------------------------------------|
| **Key**      | PP-461                                   |
| **Type**     | Sub-task                                 |
| **Project**  | POPPA                                    |
| **Status**   | To Do                                    |
| **Assignee** | —                                        |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md)        |

---

## User Story

> Backend มี API สำหรับ Soft Delete Story โดยเจ้าของ Story โดยไม่ลบข้อมูลจริงออกจาก Database

---

## 1. Description

Implement API Soft Delete Story บน Backend เปลี่ยน State ของ Story เป็น Deleted โดยไม่ลบ Document จริงออกจาก MongoDB เพื่อให้ Archive ยังคงข้อมูลไว้ได้

---

## 2. Acceptance Criteria

### Scenario 1 — Soft Delete Success

- **Given:** User เป็นเจ้าของ Story
- **When:** Client ส่ง DELETE /stories/:id
- **Then:** Story Field `deletedAt` ถูก Set และ Story หายจาก Public Feed

### Scenario 2 — Unauthorized Delete

- **Given:** User ไม่ใช่เจ้าของ Story
- **When:** Client ส่ง DELETE /stories/:id
- **Then:** Return HTTP 403 Forbidden

### Scenario 3 — Story Still in Archive

- **Given:** Story ถูก Soft Delete แล้ว
- **When:** เจ้าของ Story เข้า Story Archive
- **Then:** Story ยังคงปรากฏใน Archive ของเจ้าของ

---

## 3. Definition of Done

- [ ] DELETE /stories/:id ทำ Soft Delete สำเร็จ
- [ ] Story หายจาก Public Feed หลัง Soft Delete
- [ ] Unauthorized คืน HTTP 403
- [ ] Story ยังอยู่ใน Archive ของเจ้าของหลัง Soft Delete

# PP-485 · [MB][End-User] AC 2.4 Tier 1/Tier 2 indentation + thread line + reply auto-mention

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-485                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | To Do                                              |
| **Assignee** | —                                                  |
| **Parent**   | [PP-445](./PP-445_Comment_Running_Event.md)        |

---

## User Story

> End-User เห็น Comment Thread แบบ 2 ระดับ (Tier 1/Tier 2) พร้อม Thread Line และ Reply ที่ Auto-mention

---

## 1. Description

Implement UI สำหรับ Comment Thread 2 ระดับบน Mobile App โดย Tier 2 (Reply) แสดง Indentation ลึกกว่า Tier 1, มี Thread Line ทางด้านซ้าย, และ Reply Auto-prepend @mention ของเจ้าของ Comment Tier 1

---

## 2. Acceptance Criteria

### Scenario 1 — Tier 1 Comment Layout

- **Given:** Comment เป็น Top-level (Tier 1)
- **When:** แสดงใน Comment List
- **Then:** Comment แสดงชิดซ้ายโดยไม่มี Indentation

### Scenario 2 — Tier 2 Indentation + Thread Line

- **Given:** Comment เป็น Reply (Tier 2)
- **When:** แสดงใน Comment List
- **Then:** Comment แสดง Indentation ลึกกว่า Tier 1 และมี Thread Line ทางซ้าย

### Scenario 3 — Reply Auto-mention

- **Given:** End-User กด Reply บน Comment ของ User A
- **When:** Input Bar เปิดขึ้นสำหรับ Reply
- **Then:** "@UserA" ถูก Pre-fill ใน Input Bar อัตโนมัติ

### Scenario 4 — Max Depth Guard

- **Given:** End-User พยายาม Reply บน Comment Tier 2
- **When:** กดปุ่ม Reply
- **Then:** ระบบ Reply ไปยัง Tier 1 แทน (ไม่มี Tier 3)

---

## 3. Definition of Done

- [ ] Tier 1 Comment ไม่มี Indentation
- [ ] Tier 2 มี Indentation และ Thread Line
- [ ] Reply Auto-prepend @mention
- [ ] ไม่มี Tier 3 (Reply บน Tier 2 ไปที่ Tier 1)

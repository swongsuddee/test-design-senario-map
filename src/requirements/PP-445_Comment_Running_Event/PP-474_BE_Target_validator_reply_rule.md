# PP-474 · [BE] Target validator + reply rule Tier 2 auto-mention

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-474                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | To Do                                              |
| **Assignee** | —                                                  |
| **Parent**   | [PP-445](./PP-445_Comment_Running_Event.md)        |

---

## User Story

> Backend ตรวจสอบ targetType/targetId ที่ถูกต้อง และ Auto-mention เจ้าของ Comment Tier 1 เมื่อมีการ Reply (Tier 2)

---

## 1. Description

Implement Target Validator ตรวจสอบว่า targetType และ targetId ที่ส่งมาถูกต้องและมีอยู่จริง รวมถึง Reply Rule ที่ Tier 2 จะ Auto-add @mention ของเจ้าของ Comment Tier 1 โดยอัตโนมัติ

---

## 2. Acceptance Criteria

### Scenario 1 — Valid Target

- **Given:** Client ส่ง Comment พร้อม targetType=event และ targetId ที่มีอยู่
- **When:** Validator ตรวจสอบ
- **Then:** Validation ผ่านและ Comment ถูกสร้าง

### Scenario 2 — Invalid Target

- **Given:** Client ส่ง Comment พร้อม targetId ที่ไม่มีอยู่
- **When:** Validator ตรวจสอบ
- **Then:** Return HTTP 404 Not Found

### Scenario 3 — Tier 2 Auto-mention

- **Given:** User Reply (Tier 2) ต่อ Comment Tier 1 ของ User A
- **When:** Comment Tier 2 ถูกสร้าง
- **Then:** Content ถูก Prepend ด้วย @UserA โดยอัตโนมัติ

---

## 3. Definition of Done

- [ ] Target Validator ตรวจสอบ targetType และ targetId ได้
- [ ] Invalid Target คืน HTTP 404
- [ ] Tier 2 Reply Auto-mention เจ้าของ Comment Tier 1

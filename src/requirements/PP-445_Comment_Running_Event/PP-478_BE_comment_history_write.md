# PP-478 · [BE] comment_history write + owner-only edit/delete + soft delete placeholder

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-478                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | To Do                                              |
| **Assignee** | —                                                  |
| **Parent**   | [PP-445](./PP-445_Comment_Running_Event.md)        |

---

## User Story

> Backend บันทึก Comment History เมื่อมีการแก้ไข รองรับ Owner-only Edit/Delete และใช้ Soft Delete แทนการลบจริง

---

## 1. Description

Implement comment_history Collection สำหรับบันทึก Audit Trail ของการแก้ไข Comment, Guard ให้เฉพาะ Owner เท่านั้นที่สามารถ Edit/Delete Comment ของตัวเอง, และใช้ Soft Delete (deletedAt Field) แทนการลบจริงออกจาก Database

---

## 2. Acceptance Criteria

### Scenario 1 — Comment History on Edit

- **Given:** User Edit Comment ของตัวเอง
- **When:** UpdateComment API ถูกเรียก
- **Then:** เวอร์ชันเก่าของ Comment ถูกบันทึกลง comment_history Collection

### Scenario 2 — Owner-only Edit Guard

- **Given:** User พยายาม Edit Comment ของคนอื่น
- **When:** UpdateComment API ถูกเรียก
- **Then:** Return HTTP 403 Forbidden

### Scenario 3 — Owner-only Delete Guard

- **Given:** User พยายาม Delete Comment ของคนอื่น
- **When:** DeleteComment API ถูกเรียก
- **Then:** Return HTTP 403 Forbidden

### Scenario 4 — Soft Delete

- **Given:** Owner ลบ Comment ของตัวเอง
- **When:** DeleteComment API ถูกเรียก
- **Then:** Comment Field `deletedAt` ถูก Set และแสดงเป็น Placeholder "[ลบแล้ว]" แทน

---

## 3. Definition of Done

- [ ] comment_history บันทึก Audit Trail เมื่อ Edit
- [ ] Edit Comment ของคนอื่นคืน HTTP 403
- [ ] Delete Comment ของคนอื่นคืน HTTP 403
- [ ] Soft Delete ตั้ง deletedAt และแสดง Placeholder

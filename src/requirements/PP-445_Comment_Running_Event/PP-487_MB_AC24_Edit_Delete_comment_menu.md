# PP-487 · [MB][End-User] AC 2.4 Edit/Delete own comment menu (3-dot)

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-487                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | To Do                                              |
| **Assignee** | —                                                  |
| **Parent**   | [PP-445](./PP-445_Comment_Running_Event.md)        |

---

## User Story

> End-User สามารถแก้ไขหรือลบ Comment ของตัวเองผ่าน 3-dot Menu บน Comment

---

## 1. Description

Implement 3-dot Menu บน Comment Card ให้แสดงตัวเลือก Edit และ Delete เฉพาะสำหรับ Comment ที่ User เป็นเจ้าของ รองรับ Inline Edit Mode และ Confirmation Dialog ก่อน Delete

---

## 2. Acceptance Criteria

### Scenario 1 — Show 3-dot Menu on Own Comment

- **Given:** End-User เห็น Comment ของตัวเองใน List
- **When:** กดปุ่ม 3-dot บน Comment
- **Then:** เมนูแสดงตัวเลือก "แก้ไข" และ "ลบ"

### Scenario 2 — No 3-dot Menu on Others' Comment

- **Given:** End-User เห็น Comment ของคนอื่น
- **When:** ดู Comment นั้น
- **Then:** ไม่มีปุ่ม 3-dot สำหรับ Edit/Delete (อาจมีแค่ Report)

### Scenario 3 — Edit Comment

- **Given:** End-User กด "แก้ไข" จากเมนู
- **When:** Inline Edit Mode เปิด
- **Then:** Input Bar แสดงข้อความเดิมให้แก้ไขได้ และมีปุ่ม Save/Cancel

### Scenario 4 — Delete Comment with Confirmation

- **Given:** End-User กด "ลบ" จากเมนู
- **When:** Confirmation Dialog แสดง
- **Then:** หาก Confirm ลบ — Comment ถูก Soft Delete และแสดงเป็น "[ลบแล้ว]"

---

## 3. Definition of Done

- [ ] 3-dot Menu แสดงเฉพาะ Comment ของตัวเอง
- [ ] ไม่มี Edit/Delete บน Comment ของคนอื่น
- [ ] Inline Edit Mode ทำงานได้
- [ ] Delete Confirmation Dialog + Soft Delete ทำงาน

# PP-349 · Story Archive (คลังเก็บ Story)

| Field        | Value                                    |
|--------------|------------------------------------------|
| **Key**      | PP-349                                   |
| **Type**     | Sub-task                                 |
| **Project**  | POPPA                                    |
| **Status**   | To Do                                    |
| **Assignee** | —                                        |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md)        |

---

## User Story

> End-User สามารถดู Story ที่หมดอายุแล้วจากคลังเก็บ Story Archive ส่วนตัวได้

---

## 1. Description

Implement ฟีเจอร์ Story Archive ให้เก็บ Story ที่หมดอายุ 24 ชั่วโมงไว้ในคลังส่วนตัว End-User สามารถเข้าดู Archive, Replay Story เก่า, และลบ Story ออกจาก Archive ได้

---

## 2. Acceptance Criteria

### Scenario 1 — Access Story Archive

- **Given:** End-User มี Story ที่หมดอายุแล้ว
- **When:** เข้าเมนู Story Archive
- **Then:** ระบบแสดงรายการ Story ที่หมดอายุแล้วในรูปแบบ Grid หรือ List

### Scenario 2 — Replay Archived Story

- **Given:** End-User เห็น Story ใน Archive
- **When:** กดเปิด Story
- **Then:** ระบบเล่น Story นั้นใน Story Viewer แบบ Private

### Scenario 3 — Delete Archived Story

- **Given:** End-User เปิด Story ใน Archive
- **When:** กดปุ่ม Delete
- **Then:** Story ถูกลบออกจาก Archive อย่างถาวร

### Scenario 4 — Archive Auto-save

- **Given:** Story ที่ End-User สร้างครบ 24 ชั่วโมง
- **When:** Story หายจาก Public Feed
- **Then:** Story ถูกย้ายไปเก็บใน Archive อัตโนมัติ

---

## 3. Definition of Done

- [ ] Story Archive แสดงรายการ Story ที่หมดอายุ
- [ ] Replay Story Archive ทำงานได้
- [ ] ลบ Story จาก Archive ได้
- [ ] Story Auto-save ลง Archive เมื่อหมดอายุ

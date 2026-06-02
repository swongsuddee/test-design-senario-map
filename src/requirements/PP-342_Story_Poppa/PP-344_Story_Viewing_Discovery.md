# PP-344 · Story Viewing & Discovery

| Field        | Value                                    |
|--------------|------------------------------------------|
| **Key**      | PP-344                                   |
| **Type**     | Sub-task                                 |
| **Project**  | POPPA                                    |
| **Status**   | To Do                                    |
| **Assignee** | —                                        |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md)        |

---

## User Story

> End-User สามารถดู Story ของเพื่อนที่ตนติดตามได้จากหน้าหลักของแอป

---

## 1. Description

Implement การแสดง Story ของเพื่อนบนหน้าหลัก Mobile App เรียงตามลำดับเวลา รองรับ Full-screen Story Viewer พร้อม Progress Bar แสดงเวลาที่เหลือ และ Auto-advance ไปยัง Story ถัดไป

---

## 2. Acceptance Criteria

### Scenario 1 — Story Feed Display

- **Given:** End-User มีเพื่อนที่มี Story ที่ยังไม่หมดอายุ
- **When:** เปิดหน้าหลัก
- **Then:** แสดง Story Avatar ของเพื่อนเรียงแถวด้านบน

### Scenario 2 — View Story

- **Given:** End-User เห็น Story Avatar ของเพื่อน
- **When:** กดที่ Avatar
- **Then:** เปิด Full-screen Story Viewer แสดง Media พร้อม Progress Bar

### Scenario 3 — Auto-advance

- **Given:** End-User กำลังดู Story
- **When:** Progress Bar ครบ
- **Then:** ระบบเลื่อนไปยัง Story ถัดไปอัตโนมัติ

### Scenario 4 — No Friends State

- **Given:** End-User ยังไม่มีเพื่อน
- **When:** เปิดหน้าหลัก
- **Then:** แสดง Follow Friend แทน Story Feed

---

## 3. Definition of Done

- [ ] Story Feed แสดง Avatar เพื่อนถูกต้อง
- [ ] Full-screen Viewer เปิดได้พร้อม Progress Bar
- [ ] Auto-advance ไปยัง Story ถัดไปทำงานได้
- [ ] No Friends State แสดง Follow Friend

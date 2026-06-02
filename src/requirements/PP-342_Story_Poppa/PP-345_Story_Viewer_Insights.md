# PP-345 · Story Viewer Insights

| Field        | Value                                    |
|--------------|------------------------------------------|
| **Key**      | PP-345                                   |
| **Type**     | Sub-task                                 |
| **Project**  | POPPA                                    |
| **Status**   | To Do                                    |
| **Assignee** | —                                        |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md)        |

---

## User Story

> End-User ที่สร้าง Story สามารถดูได้ว่าใครเปิดดู Story ของตนแล้วบ้าง

---

## 1. Description

Implement ฟีเจอร์ Story Viewer Insights ให้เจ้าของ Story สามารถดูรายชื่อผู้ที่เปิดดู Story ได้ พร้อมจำนวนยอด View แสดงบน Story

---

## 2. Acceptance Criteria

### Scenario 1 — View Story Insights

- **Given:** End-User เป็นเจ้าของ Story
- **When:** เปิดดู Story ของตัวเองและกด Insights
- **Then:** ระบบแสดงรายชื่อผู้ที่เปิดดู Story

### Scenario 2 — View Count Display

- **Given:** มีคนเปิดดู Story แล้ว
- **When:** เจ้าของ Story ดู Story ของตัวเอง
- **Then:** แสดงจำนวน View ที่ถูกต้อง

### Scenario 3 — Record View

- **Given:** End-User เปิดดู Story ของเพื่อน
- **When:** ดู Story ครบ Progress Bar
- **Then:** ระบบบันทึก View ให้เจ้าของ Story ได้เห็น

---

## 3. Definition of Done

- [ ] รายชื่อผู้ดู Story แสดงได้สำหรับเจ้าของ
- [ ] ยอด View Count แสดงถูกต้อง
- [ ] การบันทึก View ทำงานได้

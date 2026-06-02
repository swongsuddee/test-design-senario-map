# PP-347 · VDO editor : Trim 15 วิ

| Field        | Value                                    |
|--------------|------------------------------------------|
| **Key**      | PP-347                                   |
| **Type**     | Sub-task                                 |
| **Project**  | POPPA                                    |
| **Status**   | To Do                                    |
| **Assignee** | —                                        |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md)        |

---

## User Story

> End-User สามารถตัดวิดีโอให้เหลือไม่เกิน 15 วินาทีก่อนเผยแพร่เป็น Story

---

## 1. Description

Implement VDO Editor บน Story Creation ให้ผู้ใช้สามารถ Trim วิดีโอสูงสุด 15 วินาทีโดยใช้ Timeline Slider กำหนดจุดเริ่มต้นและสิ้นสุดก่อนเผยแพร่

---

## 2. Acceptance Criteria

### Scenario 1 — Open VDO Editor

- **Given:** End-User เลือกวิดีโอที่มีความยาวมากกว่า 15 วินาที
- **When:** ระบบตรวจพบความยาวเกิน
- **Then:** เปิด VDO Editor อัตโนมัติพร้อม Timeline Slider

### Scenario 2 — Trim Video

- **Given:** End-User เห็น Timeline Slider
- **When:** ลาก Handle เพื่อกำหนดจุดเริ่มต้นและสิ้นสุด
- **Then:** Preview แสดงเฉพาะช่วงที่เลือก

### Scenario 3 — Trim Limit Enforcement

- **Given:** End-User พยายามเลือกช่วงที่ยาวกว่า 15 วินาที
- **When:** ลาก Handle
- **Then:** ระบบจำกัดให้เลือกได้สูงสุด 15 วินาทีเท่านั้น

### Scenario 4 — Confirm Trim

- **Given:** End-User เลือกช่วงวิดีโอที่ต้องการแล้ว
- **When:** กดปุ่ม Confirm
- **Then:** วิดีโอถูก Trim และนำไปใช้ใน Story

---

## 3. Definition of Done

- [ ] VDO Editor เปิดได้เมื่อวิดีโอยาวเกิน 15 วินาที
- [ ] Timeline Slider ทำงานถูกต้อง
- [ ] จำกัดการเลือกสูงสุด 15 วินาที
- [ ] Confirm Trim บันทึกช่วงที่เลือกได้

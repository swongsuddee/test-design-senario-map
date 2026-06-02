# PP-484 · [MB][End-User] AC 2.3 Thai relative time formatter

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-484                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | To Do                                              |
| **Assignee** | —                                                  |
| **Parent**   | [PP-445](./PP-445_Comment_Running_Event.md)        |

---

## User Story

> End-User เห็น Timestamp ของ Comment แสดงเป็นภาษาไทยแบบ Relative Time ที่อัปเดตตามเวลาจริง

---

## 1. Description

Implement Thai Relative Time Formatter สำหรับ Timestamp ของ Comment แสดงเวลาในรูปแบบภาษาไทย เช่น เมื่อครู่, 5 นาทีที่แล้ว, 2 ชม., เมื่อวาน และวันที่ พ.ศ. โดย Timestamp อัปเดตอัตโนมัติตามเวลาจริง

---

## 2. Acceptance Criteria

### Scenario 1 — Just Now (เมื่อครู่)

- **Given:** Comment ถูกสร้างไม่นาน (< 1 นาที)
- **When:** Timestamp แสดง
- **Then:** แสดง "เมื่อครู่"

### Scenario 2 — Minutes (นาทีที่แล้ว)

- **Given:** Comment ถูกสร้าง 1-59 นาทีที่แล้ว
- **When:** Timestamp แสดง
- **Then:** แสดง "X นาทีที่แล้ว"

### Scenario 3 — Hours (ชม. ที่แล้ว)

- **Given:** Comment ถูกสร้าง 1-23 ชั่วโมงที่แล้ว
- **When:** Timestamp แสดง
- **Then:** แสดง "X ชม. ที่แล้ว"

### Scenario 4 — Yesterday (เมื่อวาน)

- **Given:** Comment ถูกสร้างเมื่อวาน
- **When:** Timestamp แสดง
- **Then:** แสดง "เมื่อวาน"

### Scenario 5 — Older Date (วันที่ พ.ศ.)

- **Given:** Comment ถูกสร้างมากกว่า 2 วันที่แล้ว
- **When:** Timestamp แสดง
- **Then:** แสดงวันที่แบบไทย เช่น "15 ม.ค. 2568"

---

## 3. Definition of Done

- [ ] "เมื่อครู่" แสดงเมื่อ Comment < 1 นาที
- [ ] "X นาทีที่แล้ว" แสดงสำหรับ 1-59 นาที
- [ ] "X ชม. ที่แล้ว" แสดงสำหรับ 1-23 ชั่วโมง
- [ ] "เมื่อวาน" แสดงสำหรับวันก่อนหน้า
- [ ] วันที่ พ.ศ. แสดงสำหรับ Comment เก่ากว่า 2 วัน

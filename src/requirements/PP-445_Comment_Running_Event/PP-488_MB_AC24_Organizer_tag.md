# PP-488 · [MB][End-User] AC 2.4 Organizer tag สีส้ม #FF5900

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-488                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | To Do                                              |
| **Assignee** | —                                                  |
| **Parent**   | [PP-445](./PP-445_Comment_Running_Event.md)        |

---

## User Story

> End-User เห็น Badge/Tag สีส้ม #FF5900 บน Comment ของ Organizer งานวิ่งนั้น

---

## 1. Description

Implement Organizer Tag บน Comment Card ที่แสดง Badge หรือ Label สีส้ม (#FF5900) สำหรับ Comment ที่มาจาก Organizer ของ Event นั้น เพื่อให้ผู้ใช้รู้ว่าเป็น Comment จากผู้จัดงาน

---

## 2. Acceptance Criteria

### Scenario 1 — Organizer Tag Display

- **Given:** Comment มาจาก Organizer ของ Event (isOrganizer=true)
- **When:** Comment แสดงใน Comment List
- **Then:** แสดง Badge/Label สีส้ม #FF5900 ถัดจากชื่อ Organizer

### Scenario 2 — Regular User No Tag

- **Given:** Comment มาจาก User ทั่วไป (isOrganizer=false)
- **When:** Comment แสดงใน Comment List
- **Then:** ไม่มี Organizer Tag แสดง

### Scenario 3 — Tag Color Accuracy

- **Given:** Organizer Tag แสดงบน Comment
- **When:** ตรวจสอบสี
- **Then:** สี Tag ตรงกับ Hex #FF5900 พอดี

---

## 3. Definition of Done

- [ ] Organizer Tag สีส้ม #FF5900 แสดงบน Comment จาก Organizer
- [ ] User ทั่วไปไม่มี Tag
- [ ] สี Tag ตรงกับ #FF5900 ตาม Spec

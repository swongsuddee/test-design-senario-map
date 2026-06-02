# PP-476 · [BE] Mention parser @user + organizer enrichment (isOrganizer flag)

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-476                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | To Do                                              |
| **Assignee** | —                                                  |
| **Parent**   | [PP-445](./PP-445_Comment_Running_Event.md)        |

---

## User Story

> Backend Parse @mention ใน Comment Content และ Enrich Comment Data ด้วย isOrganizer Flag สำหรับผู้จัดงาน

---

## 1. Description

Implement Mention Parser ที่ Parse @username ใน Comment Content, Resolve User ID, และ Enrich Comment Author Data ด้วย `isOrganizer` Flag โดยตรวจสอบว่า Author เป็น Organizer ของ Event นั้นหรือไม่

---

## 2. Acceptance Criteria

### Scenario 1 — Parse @mention

- **Given:** Comment Content มีข้อความ "@username"
- **When:** Parser ประมวลผล
- **Then:** Mention ถูก Resolve เป็น userId และบันทึกใน mentions Array

### Scenario 2 — Organizer Enrichment

- **Given:** Comment Author เป็น Organizer ของ Event
- **When:** API Return Comment Data
- **Then:** Field `isOrganizer: true` ปรากฏใน Comment Object

### Scenario 3 — Non-Organizer User

- **Given:** Comment Author ไม่ใช่ Organizer ของ Event
- **When:** API Return Comment Data
- **Then:** Field `isOrganizer: false` ปรากฏใน Comment Object

---

## 3. Definition of Done

- [ ] Mention Parser Resolve @username เป็น userId
- [ ] isOrganizer: true สำหรับ Comment จาก Organizer
- [ ] isOrganizer: false สำหรับ Comment จาก User ทั่วไป

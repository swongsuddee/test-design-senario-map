# PP-486 · [MB][End-User] AC 2.4 @mention typeahead picker + noti

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-486                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | To Do                                              |
| **Assignee** | —                                                  |
| **Parent**   | [PP-445](./PP-445_Comment_Running_Event.md)        |

---

## User Story

> End-User สามารถพิมพ์ @ ใน Comment เพื่อค้นหาและ Mention User อื่น และ User ที่ถูก Mention ได้รับ Notification

---

## 1. Description

Implement @mention Typeahead Picker บน Mobile App เมื่อ User พิมพ์ "@" ในช่อง Comment ระบบแสดง Dropdown รายชื่อ User ที่ตรงกัน User เลือกได้ และ User ที่ถูก Mention ได้รับ Push Notification

---

## 2. Acceptance Criteria

### Scenario 1 — Typeahead Trigger

- **Given:** End-User พิมพ์ "@" ใน Comment Input
- **When:** พิมพ์ตัวอักษรต่อจาก "@"
- **Then:** Dropdown แสดงรายชื่อ User ที่ตรงกับข้อความที่พิมพ์

### Scenario 2 — Select User from Typeahead

- **Given:** Typeahead Dropdown แสดงอยู่
- **When:** End-User กดเลือก User จาก Dropdown
- **Then:** @username ถูก Insert ลงใน Input Bar และ Dropdown ปิด

### Scenario 3 — Mention Notification

- **Given:** Comment ที่มี @mention ถูกส่งสำเร็จ
- **When:** API บันทึก Comment
- **Then:** User ที่ถูก Mention ได้รับ Push Notification

### Scenario 4 — No Result Typeahead

- **Given:** End-User พิมพ์ "@" ตามด้วยชื่อที่ไม่มีในระบบ
- **When:** ค้นหาไม่พบ User
- **Then:** Dropdown แสดง "ไม่พบผู้ใช้" หรือปิดอัตโนมัติ

---

## 3. Definition of Done

- [ ] "@" Trigger เปิด Typeahead Dropdown
- [ ] เลือก User จาก Dropdown Insert @username ได้
- [ ] Push Notification ส่งถึง User ที่ถูก Mention
- [ ] No Result State แสดงถูกต้อง

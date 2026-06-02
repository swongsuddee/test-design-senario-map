# PP-233 · [BE][Event][Organizer] Draft + Submit Update Database Schema for Host and Organizer Fields

| Field        | Value                                                                                              |
|--------------|----------------------------------------------------------------------------------------------------|
| **Key**      | PP-233                                                                                             |
| **Type**     | Sub-task                                                                                           |
| **Project**  | POPPA                                                                                              |
| **Status**   | To Do                                                                                              |
| **Assignee** | —                                                                                                  |
| **Parent**   | [PP-226](./PP-226_Event_Detail_Organizer_Information.md)                                           |

---

## User Story

> อัปเดต Database Schema เพื่อรองรับ Host และ Organizer Fields แยกกันบน Event

---

## 1. Description

งาน Backend ที่ต้องวางแผนและ Draft Schema Update สำหรับ Event ให้รองรับ Field "Host" และ "Organizer" แยกจากกัน รองรับกรณีที่ทั้งสองเป็นรายการเดียวกัน หรือต่างกัน โดยต้องผ่านขั้นตอน Draft และ Submit ให้ทีม Review ก่อน Apply จริง

---

## 2. Acceptance Criteria

### Scenario 1 — Draft Schema ครบถ้วน

- **Given:** Developer เริ่มออกแบบ Schema
- **When:** Draft เสร็จสมบูรณ์
- **Then:** Schema รองรับ `host_id`, `organizer_id` (หรือ equivalent) บน Event Table/Collection โดยทั้งสอง Field อาจชี้ไปยัง Entity เดียวกันได้

### Scenario 2 — Schema Submit และผ่าน Review

- **Given:** Draft Schema พร้อมแล้ว
- **When:** Submit ให้ทีม Review
- **Then:** ทีมอนุมัติ Schema ก่อน Migration

### Scenario 3 — Migration Applied สำเร็จ

- **Given:** Schema ผ่าน Review แล้ว
- **When:** Run Migration บน Environment ที่กำหนด
- **Then:** Database มี Host และ Organizer Fields พร้อมใช้งาน ไม่มี Data Loss

---

## 3. Definition of Done

- [ ] Draft Schema ครอบคลุม Host และ Organizer Fields
- [ ] Schema ผ่าน Review จากทีม
- [ ] Migration Script พร้อมและผ่านการทดสอบ
- [ ] Apply Migration บน STG/Production สำเร็จ

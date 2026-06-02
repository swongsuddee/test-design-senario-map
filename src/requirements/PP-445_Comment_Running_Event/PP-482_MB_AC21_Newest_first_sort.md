# PP-482 · [MB][End-User] AC 2.1 Newest-first sort + lazy load pagination

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-482                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | To Do                                              |
| **Assignee** | —                                                  |
| **Parent**   | [PP-445](./PP-445_Comment_Running_Event.md)        |

---

## User Story

> End-User เห็น Comment ล่าสุดก่อน และระบบโหลดเพิ่มอัตโนมัติเมื่อเลื่อนลงถึงด้านล่าง

---

## 1. Description

Implement Comment List ที่เรียงลำดับ Newest-first และรองรับ Lazy Load Pagination โดยโหลด 10-15 รายการต่อหน้า เมื่อ User เลื่อนถึงด้านล่างของ List ระบบจะโหลดเพิ่มอัตโนมัติ

---

## 2. Acceptance Criteria

### Scenario 1 — Newest-first Sort

- **Given:** มี Comment หลายรายการที่สร้างในเวลาต่างกัน
- **When:** Comment Section โหลด
- **Then:** Comment ที่สร้างล่าสุดแสดงอยู่ด้านบนสุด

### Scenario 2 — Initial Load

- **Given:** End-User เปิด Comment Section
- **When:** ระบบโหลด Comment
- **Then:** แสดง Comment 10-15 รายการแรก (Newest)

### Scenario 3 — Lazy Load Trigger

- **Given:** End-User เลื่อน Comment List ลงถึงด้านล่าง
- **When:** มี Comment เพิ่มเติมในระบบ
- **Then:** ระบบโหลด Comment ชุดถัดไปอัตโนมัติและต่อท้าย List

### Scenario 4 — End of List

- **Given:** โหลด Comment ครบทั้งหมดแล้ว
- **When:** End-User เลื่อนลงถึงด้านล่าง
- **Then:** ไม่โหลดเพิ่มและแสดง Indicator ว่าไม่มี Comment เพิ่มเติม

---

## 3. Definition of Done

- [ ] Comment เรียงลำดับ Newest-first
- [ ] โหลด 10-15 รายการต่อหน้า
- [ ] Lazy Load ทำงานเมื่อเลื่อนถึงด้านล่าง
- [ ] End of List Indicator แสดงถูกต้อง

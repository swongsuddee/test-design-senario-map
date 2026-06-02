# PP-495 · [FE][BO][Organizer] Edit draft event implement UI

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-495                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | In Progress |
| **Assignee** | —                                                  |
| **Parent**   | [PP-492](./PP-492_Edit_Running_Event.md)           |

---

## User Story

> Organizer สามารถเห็นและใช้งาน UI หน้า Edit Draft Event ที่แสดงข้อมูล Draft งานวิ่งปัจจุบันพร้อมให้แก้ไขได้

---

## 1. Description

Implement UI ของหน้า Edit Draft Event บน Backoffice สำหรับ Organizer แสดง Form ที่ Pre-fill ด้วยข้อมูล Draft งานวิ่งปัจจุบัน รองรับการแก้ไขและบันทึก Draft ต่อเนื่อง

---

## 2. Acceptance Criteria

### Scenario 1 — Pre-fill Draft Data

- **Given:** Organizer เปิดหน้า Edit Draft Event
- **When:** หน้าโหลดเสร็จ
- **Then:** Form แสดงข้อมูล Draft งานวิ่งปัจจุบันครบทุก Field

### Scenario 2 — Edit Draft Fields

- **Given:** Form แสดงข้อมูล Draft เดิมอยู่
- **When:** Organizer แก้ไข Field ใดก็ตาม
- **Then:** Field นั้นอัปเดตค่าตาม Input ของ Organizer

### Scenario 3 — Draft Indicator

- **Given:** Organizer อยู่ในหน้า Edit Draft
- **When:** ดู Header หรือ Label ของหน้า
- **Then:** มี Indicator แสดงว่าเป็นการแก้ไข Draft (ไม่ใช่ Published Event)

### Scenario 4 — Validation UI

- **Given:** Organizer ลบข้อมูล Required Field ออก
- **When:** กด Save Draft หรือ Blur Field
- **Then:** แสดง Error Message ใต้ Field นั้น

---

## 3. Definition of Done

- [ ] Form Pre-fill ข้อมูล Draft ครบถ้วน
- [ ] แก้ไข Field ได้ทุก Field
- [ ] Draft Indicator แสดงบนหน้า
- [ ] Validation Error แสดงถูกต้อง

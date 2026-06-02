# PP-493 · [FE][BO][Organizer] Edit event implement UI

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-493                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | Review Code |
| **Assignee** | —                                                  |
| **Parent**   | [PP-492](./PP-492_Edit_Running_Event.md)           |

---

## User Story

> Organizer สามารถเห็นและใช้งาน UI หน้า Edit Event ที่แสดงข้อมูลงานวิ่งปัจจุบันพร้อมให้แก้ไขได้

---

## 1. Description

Implement UI ของหน้า Edit Event บน Backoffice สำหรับ Organizer แสดง Form ที่ Pre-fill ด้วยข้อมูลงานวิ่งปัจจุบัน รองรับการแก้ไขทุก Field ที่อนุญาต พร้อม Validation UI

---

## 2. Acceptance Criteria

### Scenario 1 — Pre-fill Form Data

- **Given:** Organizer เปิดหน้า Edit Event
- **When:** หน้าโหลดเสร็จ
- **Then:** Form แสดงข้อมูลงานวิ่งปัจจุบันครบทุก Field

### Scenario 2 — Edit Fields

- **Given:** Form แสดงข้อมูลเดิมอยู่
- **When:** Organizer แก้ไข Field ใดก็ตาม
- **Then:** Field นั้นอัปเดตค่าตาม Input ของ Organizer

### Scenario 3 — Validation UI

- **Given:** Organizer ลบข้อมูล Required Field ออก
- **When:** กด Save หรือ Blur Field
- **Then:** แสดง Error Message ใต้ Field นั้น

### Scenario 4 — Cancel Button

- **Given:** Organizer เปิดหน้า Edit Event
- **When:** กดปุ่ม Cancel
- **Then:** กลับสู่หน้า Event Detail โดยไม่มีการเปลี่ยนแปลง

---

## 3. Definition of Done

- [ ] Form Pre-fill ข้อมูลงานวิ่งปัจจุบันครบถ้วน
- [ ] แก้ไข Field ได้ทุก Field ที่อนุญาต
- [ ] Validation Error แสดงถูกต้อง
- [ ] Cancel กลับสู่ Event Detail โดยไม่บันทึก

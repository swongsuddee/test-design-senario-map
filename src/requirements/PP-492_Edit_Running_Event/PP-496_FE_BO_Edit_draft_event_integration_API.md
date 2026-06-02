# PP-496 · [FE][BO][Organizer] Edit draft event integration API

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-496                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | In Progress |
| **Assignee** | —                                                  |
| **Parent**   | [PP-492](./PP-492_Edit_Running_Event.md)           |

---

## User Story

> เมื่อ Organizer บันทึก Edit Draft Event ระบบ Frontend เรียก API ส่งข้อมูลและอัปเดต Draft บน Backend

---

## 1. Description

Implement API Integration ของหน้า Edit Draft Event บน Backoffice Frontend เรียก API เพื่ออัปเดต Draft งานวิ่ง รองรับ Loading State, Success Feedback, และ Error Handling รวมถึงตัวเลือก Publish Draft หลังจากแก้ไข

---

## 2. Acceptance Criteria

### Scenario 1 — Save Draft API Call

- **Given:** Organizer แก้ไข Draft และกด Save Draft
- **When:** API ถูกเรียก
- **Then:** ส่ง Request พร้อมข้อมูล Draft ที่แก้ไขครบถ้วน

### Scenario 2 — Loading State

- **Given:** Organizer กด Save Draft
- **When:** API กำลัง Processing
- **Then:** ปุ่ม Save Draft แสดง Loading Spinner และ Disable ชั่วคราว

### Scenario 3 — Success Feedback

- **Given:** API อัปเดต Draft สำเร็จ
- **When:** Response กลับมา
- **Then:** แสดง Success Notification และ User กลับหน้า Draft List หรืออยู่หน้าเดิม

### Scenario 4 — Publish Draft Option

- **Given:** Organizer แก้ไข Draft เสร็จแล้ว
- **When:** กดปุ่ม Publish (ถ้ามี)
- **Then:** ระบบเรียก Publish API และเปลี่ยน Draft เป็น Published Event

### Scenario 5 — Error Handling

- **Given:** API Return Error ขณะบันทึก Draft
- **When:** Response กลับมา
- **Then:** แสดง Error Message และ User สามารถลองใหม่ได้

---

## 3. Definition of Done

- [ ] Save Draft API Call ส่งข้อมูลครบถ้วน
- [ ] Loading State แสดงระหว่าง API Call
- [ ] Success Notification แสดงหลัง Save สำเร็จ
- [ ] Publish Draft ทำงานได้ (ถ้า Spec ระบุ)
- [ ] Error Handling แสดง Error Message

# PP-494 · [FE][BO][Organizer] Edit event integration API

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-494                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | Review Code |
| **Assignee** | —                                                  |
| **Parent**   | [PP-492](./PP-492_Edit_Running_Event.md)           |

---

## User Story

> เมื่อ Organizer บันทึก Edit Event ระบบ Frontend เรียก API ส่งข้อมูลที่แก้ไขและอัปเดต Event บน Backend

---

## 1. Description

Implement API Integration ของหน้า Edit Event บน Backoffice Frontend เรียก PUT/PATCH API เพื่ออัปเดตข้อมูลงานวิ่งที่ Publish แล้ว รองรับ Loading State, Success Feedback, และ Error Handling

---

## 2. Acceptance Criteria

### Scenario 1 — Save Event API Call

- **Given:** Organizer แก้ไขข้อมูลและกด Save
- **When:** API ถูกเรียก
- **Then:** ส่ง Request พร้อมข้อมูลที่แก้ไขครบถ้วน

### Scenario 2 — Loading State

- **Given:** Organizer กด Save
- **When:** API กำลัง Processing
- **Then:** ปุ่ม Save แสดง Loading Spinner และ Disable ชั่วคราว

### Scenario 3 — Success Feedback

- **Given:** API อัปเดต Event สำเร็จ
- **When:** Response กลับมา
- **Then:** แสดง Success Notification และ Navigate กลับหน้า Event Detail

### Scenario 4 — Error Handling

- **Given:** API Return Error
- **When:** Response กลับมา
- **Then:** แสดง Error Message และ User สามารถลองใหม่ได้

---

## 3. Definition of Done

- [ ] API Call ส่งข้อมูลครบถ้วน
- [ ] Loading State แสดงระหว่าง API Call
- [ ] Success Notification แสดงและ Navigate กลับ
- [ ] Error Handling แสดง Error Message

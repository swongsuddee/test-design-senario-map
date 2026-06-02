# PP-243 · [BE][Event][User] Implement Event Detail API (excluding comments)

| Field        | Value                                                                                              |
|--------------|----------------------------------------------------------------------------------------------------|
| **Key**      | PP-243                                                                                             |
| **Type**     | Sub-task                                                                                           |
| **Project**  | POPPA                                                                                              |
| **Status**   | Ready To Test STG                                                                                  |
| **Assignee** | —                                                                                                  |
| **Parent**   | [PP-237](./PP-237_Event_Detail_Excluding_Comment.md)                                               |

---

## User Story

> Implement Backend API สำหรับ Event Detail สำหรับ End-User โดยไม่รวม Comment Data

---

## 1. Description

งาน Backend ที่ต้อง Implement API Endpoint สำหรับดึงข้อมูล Event Detail ครบทุก Field ที่จำเป็นสำหรับหน้า Event Detail บน Mobile App ยกเว้น Comment Data ครอบคลุมข้อมูล Event หลัก, Gallery, Registration Info และ Host/Organizer

---

## 2. Acceptance Criteria

### Scenario 1 — API ส่งคืน Event Detail ครบถ้วน

- **Given:** Event ID ที่ถูกต้อง
- **When:** End-User เรียก Event Detail API
- **Then:** Response มีข้อมูลครบ เช่น ชื่องาน, วันที่, สถานที่, รายละเอียด, ราคา, Gallery URLs, Registration Deadline

### Scenario 2 — ไม่รวม Comment Data

- **Given:** Event ที่มี Comment ในระบบ
- **When:** เรียก Event Detail API
- **Then:** Response ไม่มี Comment Field หรือ Comment Data ใด ๆ

### Scenario 3 — Event ID ไม่ถูกต้อง

- **Given:** Event ID ที่ไม่มีในระบบ
- **When:** เรียก Event Detail API
- **Then:** API ส่งคืน Status 404 พร้อม Error Message ที่เหมาะสม

### Scenario 4 — Event ที่ยังไม่ Published

- **Given:** Event ที่ยังอยู่ใน Draft State
- **When:** End-User เรียก Event Detail API
- **Then:** API ส่งคืน Status 403 หรือ 404 เพื่อป้องกันการเข้าถึงก่อนกำหนด

---

## 3. Definition of Done

- [ ] API Endpoint สร้างและทำงานได้
- [ ] Response ครบทุก Field ตาม Requirement
- [ ] ไม่มี Comment Data ใน Response
- [ ] ส่ง 404 เมื่อ Event ID ไม่ถูกต้อง
- [ ] ป้องกัน Event ที่ยัง Draft
- [ ] มี Unit/Integration Test ครอบคลุม
- [ ] Document API Spec (Swagger/Postman)

# PP-242 · [BE][Event] Implement Event Participants API

| Field        | Value                                                                                              |
|--------------|----------------------------------------------------------------------------------------------------|
| **Key**      | PP-242                                                                                             |
| **Type**     | Sub-task                                                                                           |
| **Project**  | POPPA                                                                                              |
| **Status**   | Ready To Test STG                                                                                  |
| **Assignee** | —                                                                                                  |
| **Parent**   | [PP-237](./PP-237_Event_Detail_Excluding_Comment.md)                                               |

---

## User Story

> Implement Backend API สำหรับดึงรายชื่อผู้เข้าร่วมงานวิ่ง (Event Participants)

---

## 1. Description

งาน Backend ที่ต้อง Implement API Endpoint สำหรับดึงรายชื่อ Participants ของ Event ที่กำหนด รองรับ Pagination, ส่งคืนข้อมูลพื้นฐานของ Participant แต่ละคน เช่น ชื่อ, Avatar URL และ Participation Status

---

## 2. Acceptance Criteria

### Scenario 1 — API ส่งคืน Participants List สำเร็จ

- **Given:** Event ID ที่ถูกต้องและมี Participants
- **When:** เรียก GET Event Participants API
- **Then:** Response ส่งคืนรายชื่อ Participants พร้อมข้อมูลพื้นฐานครบ

### Scenario 2 — Pagination ทำงานถูกต้อง

- **Given:** Event ที่มี Participants จำนวนมาก
- **When:** เรียก API พร้อม Pagination Parameters (page, limit)
- **Then:** API ส่งคืนข้อมูลถูกต้องตาม Page ที่ร้องขอ พร้อม Metadata (total, has_next)

### Scenario 3 — Event ไม่มี Participants

- **Given:** Event ที่ยังไม่มีผู้ลงทะเบียน
- **When:** เรียก Event Participants API
- **Then:** API ส่งคืน Empty Array พร้อม Status 200 ไม่ Error

### Scenario 4 — Event ID ไม่ถูกต้อง

- **Given:** Event ID ที่ไม่มีในระบบ
- **When:** เรียก Event Participants API
- **Then:** API ส่งคืน Status 404 พร้อม Error Message ที่เหมาะสม

---

## 3. Definition of Done

- [ ] API Endpoint สร้างและทำงานได้
- [ ] Pagination ทำงานถูกต้อง
- [ ] ส่ง Empty Array เมื่อไม่มี Participants
- [ ] ส่ง 404 เมื่อ Event ID ไม่ถูกต้อง
- [ ] มี Unit/Integration Test ครอบคลุม
- [ ] Document API Spec (Swagger/Postman)

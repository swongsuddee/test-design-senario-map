# PP-336 · [BE] Create Participation amount APIs

| Field        | Value                                                                                              |
|--------------|----------------------------------------------------------------------------------------------------|
| **Key**      | PP-336                                                                                             |
| **Type**     | Sub-task                                                                                           |
| **Project**  | POPPA                                                                                              |
| **Status**   | Ready To Test STG                                                                                  |
| **Assignee** | —                                                                                                  |
| **Parent**   | [PP-296](./PP-296_View_Whos_Registered_Event.md)                                                   |

---

## User Story

> Implement Backend API สำหรับส่งคืนจำนวนผู้สมัครงานวิ่งผ่าน Poppa App (Participation Amount)

---

## 1. Description

งาน Backend ที่ต้อง Implement API Endpoint สำหรับนับและส่งคืนจำนวน Participants ที่ลงทะเบียนผ่าน Poppa App สำหรับ Event ที่กำหนด ใช้สำหรับแสดง Wording "จาก Poppa X คน" บน Mobile App

---

## 2. Acceptance Criteria

### Scenario 1 — API ส่งคืน Participation Amount ถูกต้อง

- **Given:** Event ID ที่ถูกต้องและมีผู้สมัครผ่าน Poppa App
- **When:** เรียก Participation Amount API
- **Then:** Response ส่งคืนจำนวน Participants จาก Poppa App ที่ถูกต้อง

### Scenario 2 — ไม่มีผู้สมัครจาก Poppa

- **Given:** Event ที่ยังไม่มีผู้สมัครผ่าน Poppa App
- **When:** เรียก Participation Amount API
- **Then:** API ส่งคืน `{ "poppa_count": 0 }` หรือเทียบเท่า พร้อม Status 200

### Scenario 3 — Event ID ไม่ถูกต้อง

- **Given:** Event ID ที่ไม่มีในระบบ
- **When:** เรียก Participation Amount API
- **Then:** API ส่งคืน Status 404 พร้อม Error Message ที่เหมาะสม

### Scenario 4 — นับเฉพาะ Poppa Participants

- **Given:** Event ที่มีผู้สมัครจากหลายช่องทาง
- **When:** เรียก Participation Amount API
- **Then:** ค่าที่ส่งคืนนับเฉพาะ Participants ที่ลงทะเบียนผ่าน Poppa App เท่านั้น ไม่รวมช่องทางอื่น

---

## 3. Definition of Done

- [ ] API Endpoint สร้างและทำงานได้
- [ ] ส่งคืน `poppa_count` ถูกต้อง
- [ ] ส่ง 0 เมื่อไม่มีผู้สมัครจาก Poppa
- [ ] ส่ง 404 เมื่อ Event ID ไม่ถูกต้อง
- [ ] นับเฉพาะ Poppa Participants เท่านั้น
- [ ] มี Unit/Integration Test ครอบคลุม
- [ ] Document API Spec (Swagger/Postman)

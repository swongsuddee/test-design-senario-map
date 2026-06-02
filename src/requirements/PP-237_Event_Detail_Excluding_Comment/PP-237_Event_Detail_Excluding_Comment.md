# PP-237 · [M-App][End-User] Event Detail excluding comment

| Field        | Value                                                                                                    |
|--------------|----------------------------------------------------------------------------------------------------------|
| **Key**      | PP-237                                                                                                   |
| **Type**     | Story                                                                                                    |
| **Project**  | POPPA                                                                                                    |
| **Status**   | Ready To Test STG                                                                                        |
| **Assignee** | Prachum                                                                                                  |
| **Figma**    | https://www.figma.com/design/PKyOOKQydjB98nVMOOyxy4/-PP--App-UI-Design?node-id=2525-4706&m=dev          |

---

## User Story

> **ในฐานะ:** End-User ผู้ใช้งาน Mobile App
> **ฉันต้องการ:** ดูรายละเอียดงานวิ่งทั้งหมด ยกเว้น Comment Section
> **เพื่อ:** ตัดสินใจสมัครงานวิ่งได้อย่างรวดเร็ว

---

## 1. Description

หน้า Event Detail บน Mobile App แสดงข้อมูลงานวิ่งครบทุกส่วนยกเว้นระบบ Comment (ซึ่งเป็น Story แยกต่างหาก) รองรับการแสดงผล Event Detail หลัก, รายชื่อ Participants และ Gallery โดยข้อมูลทั้งหมดมาจาก API ที่ Integrate แล้ว

---

## 2. Acceptance Criteria

### Scenario 1 — แสดงข้อมูล Event Detail หลัก

- **Given:** End-User เปิดหน้า Event Detail
- **When:** หน้าโหลดสำเร็จ
- **Then:** ระบบแสดงข้อมูล Event ครบถ้วน เช่น ชื่องาน, วันที่, สถานที่, รายละเอียด, ราคา และรูปภาพ Event

### Scenario 2 — ไม่แสดง Comment Section

- **Given:** End-User อยู่ที่หน้า Event Detail
- **When:** Scroll ดูเนื้อหาทั้งหมด
- **Then:** ไม่มี Comment Section ปรากฏในหน้านี้

### Scenario 3 — แสดง Participants

- **Given:** End-User เปิดหน้า Event Detail
- **When:** เลื่อนไปยังส่วน Participants หรือกดดูรายชื่อ
- **Then:** ระบบแสดงรายชื่อผู้เข้าร่วมที่ลงทะเบียนแล้ว

### Scenario 4 — แสดง Gallery

- **Given:** Event มีรูปภาพ Gallery
- **When:** End-User เลื่อนไปยังส่วน Gallery
- **Then:** ระบบแสดงรูปภาพ Gallery ของ Event

### Scenario 5 — Event ไม่มีข้อมูล Participants

- **Given:** Event ที่ยังไม่มีผู้ลงทะเบียน
- **When:** End-User เปิดหน้า Event Detail
- **Then:** ส่วน Participants แสดง Empty State ที่เหมาะสม ไม่ขึ้น Error

---

## 3. Status Values

| Section | หมายเหตุ |
|---------|----------|
| Event Detail | แสดงครบทุก Field ตาม Figma |
| Participants | ดึงข้อมูลจาก Participants API (PP-242) |
| Gallery | แสดงรูปจาก Event Data |
| Comment | ไม่รวมใน Story นี้ |

---

## 4. Definition of Done

- [ ] UI ตรงตาม Figma node-id 2525-4706
- [ ] Event Detail API Integrate สำเร็จ (PP-243)
- [ ] Participants API Integrate สำเร็จ (PP-240)
- [ ] UI Participants แสดงถูกต้อง (PP-241)
- [ ] ไม่มี Comment Section บนหน้านี้
- [ ] Empty State แสดงเมื่อไม่มี Participants
- [ ] ทดสอบบน STG ผ่าน

---

## 5. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-238](./PP-238_MB_End_User_UI_for_Event_Detail_Excluding_Comment.md) | [MB][End-User] UI for Event Detail (excluding comment) | Ready To Test STG |
| [PP-239](./PP-239_MB_End_User_Integrate_Event_Detail.md) | [MB][End-User] Integrate Event Detail | Ready To Test STG |
| [PP-240](./PP-240_MB_End_User_Integrate_Event_Participants_API.md) | [MB][End-User] Integrate Event Participants API | Ready To Test STG |
| [PP-241](./PP-241_MB_End_User_UI_for_Event_Participants.md) | [MB][End-User] UI for Event Participants | Ready To Test STG |
| [PP-242](./PP-242_BE_Event_Implement_Event_Participants_API.md) | [BE][Event] Implement Event Participants API | Ready To Test STG |
| [PP-243](./PP-243_BE_Event_User_Implement_Event_Detail_API_Excluding_Comments.md) | [BE][Event][User] Implement Event Detail API (excluding comments) | Ready To Test STG |

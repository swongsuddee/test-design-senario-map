# PP-302 · Your Vibes - Core Mindset Assessment the 70% Quiz (หน้าจอ 7 คำถาม)

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-302        |
| **Type**     | Story         |
| **Project**  | POPPA         |
| **Status**   | In Progress         |
| **Assignee** | —             |
| **Figma**    | Design by Dev |

---

## User Story

> **ในฐานะ:** End-User ผู้ใช้งาน Mobile App
> **ฉันต้องการ:** ตอบแบบสอบถาม 7 ข้อในรูปแบบที่ใช้งานง่าย
> **เพื่อ:** เข้าใจลักษณะบุคลิกภาพหลักของฉัน

---

## 1. Description

หน้าจอ Quiz สำหรับ End-User ที่แสดงคำถามทีละ 1 ข้อ รวม 7 ข้อ พร้อม Progress Bar เพื่อบอกสถานะการทำแบบสอบถาม ผู้ใช้สามารถย้อนกลับเพื่อแก้ไขคำตอบก่อนหน้าได้ และระบบจะไม่อนุญาตให้ดำเนินการต่อหากยังไม่ได้เลือกคำตอบในข้อปัจจุบัน ผลลัพธ์ถูก Mapping เข้า 4 กลุ่ม Behavioral: Energy (Active), Social (Social), Structure (Wellness), Exploration (Creative)

---

## 2. Acceptance Criteria

### Scenario 1 — แสดงคำถามทีละข้อ

- **Given:** End-User เข้าสู่หน้า Your Vibes Quiz
- **When:** หน้าโหลดสำเร็จ
- **Then:** ระบบแสดงคำถามข้อที่ 1 จากทั้งหมด 7 ข้อ และแสดงเพียง 1 ข้อในแต่ละครั้ง

### Scenario 2 — Progress Bar แสดงสถานะ

- **Given:** End-User กำลังทำแบบสอบถาม
- **When:** ผู้ใช้อยู่ที่คำถามข้อใดข้อหนึ่ง
- **Then:** Progress Bar แสดงสัดส่วนที่ถูกต้องตามจำนวนข้อที่ผ่านมาแล้ว (เช่น ข้อ 3/7 = ~43%)

### Scenario 3 — ย้อนกลับเพื่อแก้ไขคำตอบ

- **Given:** End-User ทำแบบสอบถามถึงข้อที่ 2 หรือมากกว่า
- **When:** ผู้ใช้กดปุ่ม "ย้อนกลับ" (Back)
- **Then:** ระบบแสดงคำถามข้อก่อนหน้าพร้อมคำตอบเดิมที่เคยเลือกไว้ และผู้ใช้สามารถเปลี่ยนคำตอบได้

### Scenario 4 — บล็อกการกด "ถัดไป" เมื่อยังไม่ได้เลือกคำตอบ

- **Given:** End-User อยู่ที่คำถามข้อใดข้อหนึ่ง
- **When:** ผู้ใช้ยังไม่ได้เลือกตัวเลือกคำตอบ
- **Then:** ปุ่ม "ถัดไป" ถูก Disabled และกดไม่ได้ ระบบไม่เลื่อนไปข้อถัดไป

### Scenario 5 — ส่งคำตอบครบ 7 ข้อ

- **Given:** End-User ตอบครบทั้ง 7 ข้อแล้ว
- **When:** ผู้ใช้กด "ถัดไป" ที่ข้อสุดท้าย
- **Then:** ระบบส่งคำตอบ Q1-Q7 ไปยัง API และนำทางผู้ใช้ไปหน้าผลลัพธ์ (PP-303)

---

## 3. Technical Rules

### Backend Behavioral Mapping

| Dimension  | Category    | Description              |
|------------|-------------|--------------------------|
| Energy     | Active      | ความหนักของกิจกรรม       |
| Social     | Social      | การมีปฏิสัมพันธ์กับผู้อื่น |
| Structure  | Wellness    | ความต้องการความเป็นระบบ  |
| Exploration| Creative    | การเปิดรับสิ่งใหม่        | ### API

```
POST /v1/vibes/quiz/submit
Body: { answers: [Q1, Q2, Q3, Q4, Q5, Q6, Q7] }  // int 1-5 per answer
```

---

## 4. Definition of Done

- [ ] แสดงคำถามทีละ 1 ข้อ ครบ 7 ข้อ
- [ ] Progress Bar แสดงสถานะถูกต้องในแต่ละข้อ
- [ ] ปุ่ม Back ย้อนกลับพร้อมโหลดคำตอบเดิม
- [ ] ปุ่ม Next ถูก Disabled จนกว่าจะเลือกคำตอบ
- [ ] เมื่อตอบครบ 7 ข้อ ส่ง API submit และนำทางไปหน้า Results
- [ ] Integration ทดสอบกับ API POST /v1/vibes/quiz/submit ผ่าน

---

## 5. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-422](./PP-422_MB_Implement_Wireframe_Quiz_Page.md) | [MB][End-User] Implement wireframe quiz page (wait for ui) | To Do |
| [PP-423](./PP-423_MB_Implement_UI_Quiz_Page.md) | [MB][End-User] implement ui quiz page | To Do |
| [PP-424](./PP-424_MB_Integration_API_Quiz_Submit.md) | [MB][End-User] integration api quiz submit | To Do |
| [PP-438](./PP-438_BE_POST_Vibes_Quiz_Submit.md) | [BE] POST /v1/vibes/quiz/submit — รับ answers Q1-Q7 (int 1-5), validate ครบ 7 ข้อ, delegate scoring service, return animal result | Ready to Deploy STG |

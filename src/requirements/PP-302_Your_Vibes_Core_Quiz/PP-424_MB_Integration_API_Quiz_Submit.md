# PP-424 · [MB][End-User] integration api quiz submit

| Field        | Value                                                      |
|--------------|------------------------------------------------------------|
| **Key**      | PP-424                                                     |
| **Type**     | Sub-task                                                   |
| **Project**  | POPPA                                                      |
| **Status**   | To Do                                                      |
| **Assignee** | —                                                          |
| **Parent**   | [PP-302](./PP-302_Your_Vibes_Core_Quiz.md)                 |

---

## User Story

> เชื่อมต่อหน้า Quiz กับ API เพื่อส่งคำตอบ Q1-Q7 และรับผลลัพธ์ Animal จาก Backend

---

## 1. Description

Integration Mobile App กับ API POST /v1/vibes/quiz/submit โดยส่งคำตอบที่ผู้ใช้เลือกทั้ง 7 ข้อ (int 1-5 ต่อข้อ) และจัดการ Response เพื่อนำผลลัพธ์ไปแสดงในหน้า Results (PP-303)

---

## 2. Acceptance Criteria

### Scenario 1 — ส่งคำตอบสำเร็จ

- **Given:** End-User ตอบครบ 7 ข้อ
- **When:** กดปุ่ม Submit ที่ข้อสุดท้าย
- **Then:** แอปเรียก POST /v1/vibes/quiz/submit พร้อม payload { answers: [Q1, Q2, Q3, Q4, Q5, Q6, Q7] } และนำทางไปหน้า Results พร้อม Animal Result ที่ได้รับ

### Scenario 2 — จัดการ Error จาก API

- **Given:** API ตอบกลับด้วย Error (5xx / Network Error)
- **When:** Submit ล้มเหลว
- **Then:** แอปแสดง Error Message ที่เหมาะสมและไม่ออกจากหน้า Quiz

### Scenario 3 — Loading State ระหว่างรอ API

- **Given:** End-User กด Submit
- **When:** รอ API Response
- **Then:** แอปแสดง Loading Indicator และปิดการกดปุ่มซ้ำ

---

## 3. Definition of Done

- [ ] POST /v1/vibes/quiz/submit ถูกเรียกพร้อม answers ครบ 7 ข้อ
- [ ] Navigation ไปหน้า Results พร้อม Animal Result เมื่อ API สำเร็จ
- [ ] Loading State ระหว่างรอ Response
- [ ] Error Handling แสดง Message ที่เหมาะสม

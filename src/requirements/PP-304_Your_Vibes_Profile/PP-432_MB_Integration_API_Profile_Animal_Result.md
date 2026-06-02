# PP-432 · [MB][End-User] integration api profile animal result

| Field        | Value                                                      |
|--------------|------------------------------------------------------------|
| **Key**      | PP-432                                                     |
| **Type**     | Sub-task                                                   |
| **Project**  | POPPA                                                      |
| **Status**   | To Do                                                      |
| **Assignee** | —                                                          |
| **Parent**   | [PP-304](./PP-304_Your_Vibes_Profile.md)                   |

---

## User Story

> เชื่อมต่อหน้า Profile กับ API GET /v1/users/{userId}/profile เพื่อโหลดข้อมูล vibe_result และแสดง Animal Result

---

## 1. Description

Integration Mobile App กับ API GET /v1/users/{userId}/profile โดยนำ Field vibe_result ที่ Backend เพิ่มเข้ามา (PP-440) มาแสดงใน Section Vibe Result ของหน้า Profile รองรับทั้งกรณีที่ vibe_result มีข้อมูลและกรณีที่เป็น null

---

## 2. Acceptance Criteria

### Scenario 1 — โหลด Vibe Result จาก Profile API สำเร็จ

- **Given:** User มี vibe_result ใน Profile
- **When:** เปิดหน้า Profile
- **Then:** แอปอ่าน vibe_result จาก Profile API Response และแสดง Animal Image, Animal Type ใน Section ที่กำหนด

### Scenario 2 — จัดการ vibe_result เป็น null

- **Given:** User ยังไม่มี vibe_result (ยังไม่ทำ Quiz)
- **When:** เปิดหน้า Profile
- **Then:** แอปแสดง Empty State หรือซ่อน Section โดยไม่แสดง Error

### Scenario 3 — จัดการ Error จาก API

- **Given:** API ตอบกลับด้วย Error
- **When:** โหลดหน้า Profile
- **Then:** แอปแสดง Error State ที่เหมาะสมและไม่ Crash

---

## 3. Definition of Done

- [ ] โหลด vibe_result จาก GET /v1/users/{userId}/profile ได้ถูกต้อง
- [ ] Animal Image และ Animal Type แสดงเมื่อมีข้อมูล
- [ ] Empty State แสดงเมื่อ vibe_result เป็น null
- [ ] Error Handling ทำงานถูกต้อง

# PP-429 · [MB][End-User] integration api quiz results

| Field        | Value                                                      |
|--------------|------------------------------------------------------------|
| **Key**      | PP-429                                                     |
| **Type**     | Sub-task                                                   |
| **Project**  | POPPA                                                      |
| **Status**   | To Do                                                      |
| **Assignee** | —                                                          |
| **Parent**   | [PP-303](./PP-303_Your_Vibes_Results.md)                   |

---

## User Story

> เชื่อมต่อหน้า Results กับ API GET /v1/vibes/result เพื่อโหลดข้อมูล Animal, Scores, และกิจกรรมแนะนำ

---

## 1. Description

Integration Mobile App กับ API GET /v1/vibes/result โดยโหลด animal info (name, image key, description), scores 4 มิติ และ recommended activities จาก Backend แล้วนำมาแสดงในหน้า Results ที่ Implement ใน PP-428

---

## 2. Acceptance Criteria

### Scenario 1 — โหลดผลลัพธ์สำเร็จ

- **Given:** End-User เข้าหน้า Results หลังทำ Quiz
- **When:** หน้าโหลด
- **Then:** แอปเรียก GET /v1/vibes/result และนำข้อมูล animal, scores, recommended_activities มาแสดงในหน้าได้ถูกต้อง

### Scenario 2 — จัดการ Error จาก API

- **Given:** API ตอบกลับด้วย Error (5xx / Network Error)
- **When:** โหลดหน้า Results
- **Then:** แอปแสดง Error State พร้อมปุ่ม Retry

### Scenario 3 — Loading State

- **Given:** End-User เข้าหน้า Results
- **When:** รอ API Response
- **Then:** แสดง Loading Indicator จนกว่าข้อมูลจะโหลดเสร็จ

---

## 3. Definition of Done

- [ ] GET /v1/vibes/result ถูกเรียกเมื่อเข้าหน้า Results
- [ ] Animal name, image, description แสดงถูกต้อง
- [ ] Scores 4 มิติแสดงใน Chart ถูกต้อง
- [ ] Recommended activities แสดงครบ 4 หมวด
- [ ] Loading State และ Error State ทำงานถูกต้อง

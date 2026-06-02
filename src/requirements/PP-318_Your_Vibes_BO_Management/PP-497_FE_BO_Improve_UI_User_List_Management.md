# PP-497 · [FE][BO][Admin] Improve UI user list management

| Field        | Value                                                           |
|--------------|-----------------------------------------------------------------|
| **Key**      | PP-497                                                          |
| **Type**     | Sub-task                                                        |
| **Project**  | POPPA                                                           |
| **Status**   | Review Code |
| **Assignee** | —                                                               |
| **Parent**   | [PP-318](./PP-318_Your_Vibes_BO_Management.md)                  |

---

## User Story

> ปรับปรุง UI ตาราง User List Management ใน Backoffice ให้รองรับ Advanced Filtering (Animal Type, Score Range), Summary Dashboard, และ Export

---

## 1. Description

Improve หน้า User List Management โดยเพิ่ม: Filter Panel สำหรับ Filter ตาม Animal Type และ Score Range รายมิติ, Summary Dashboard Section แสดง Total User / Pie Chart / Engagement Rate / Top Vibe Dimension, และ Export Button สำหรับ CSV/Excel รวมถึงปรับ Layout ให้รองรับ Pagination อย่างถูกต้อง

---

## 2. Acceptance Criteria

### Scenario 1 — Filter by Animal Type

- **Given:** Admin อยู่ที่หน้า User List
- **When:** เลือก Animal Type จาก Filter
- **Then:** ตารางแสดงเฉพาะ User ที่มี Animal Type ตรงกับที่เลือก

### Scenario 2 — Filter by Score Range

- **Given:** Admin อยู่ที่หน้า User List
- **When:** กำหนด Score Range รายมิติ
- **Then:** ตารางแสดงเฉพาะ User ที่คะแนนมิตินั้นอยู่ในช่วงที่กำหนด

### Scenario 3 — Summary Dashboard แสดงถูกต้อง

- **Given:** หน้า User List โหลดสำเร็จ
- **When:** มองที่ส่วน Dashboard
- **Then:** แสดง Total User, Animal Distribution Pie Chart, Engagement Rate, Top Vibe Dimension

### Scenario 4 — Export ทำงานได้

- **Given:** Admin กดปุ่ม Export
- **When:** ระบบประมวลผล
- **Then:** Download ไฟล์ CSV หรือ Excel ที่มีข้อมูล User ตาม Filter ปัจจุบัน

### Scenario 5 — Performance

- **Given:** มีข้อมูล User จำนวนมาก
- **When:** โหลดหน้า User List
- **Then:** ข้อมูลโหลดพร้อม Pagination ภายใน 2 วินาที

---

## 3. Definition of Done

- [ ] Filter Panel (Animal Type + Score Range) ทำงานถูกต้อง
- [ ] Summary Dashboard แสดงสถิติถูกต้อง
- [ ] Export CSV/Excel ทำงานได้
- [ ] Pagination ทำงานและโหลดภายใน 2 วินาที
- [ ] ทำงานถูกต้องบน Desktop Resolution

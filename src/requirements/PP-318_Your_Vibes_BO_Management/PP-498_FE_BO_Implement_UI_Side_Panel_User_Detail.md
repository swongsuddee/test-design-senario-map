# PP-498 · [FE][BO][Admin] Implement UI side plan user detail

| Field        | Value                                                           |
|--------------|-----------------------------------------------------------------|
| **Key**      | PP-498                                                          |
| **Type**     | Sub-task                                                        |
| **Project**  | POPPA                                                           |
| **Status**   | Review Code |
| **Assignee** | —                                                               |
| **Parent**   | [PP-318](./PP-318_Your_Vibes_BO_Management.md)                  |

---

## User Story

> Implement UI Side-panel แสดงรายละเอียด Vibe ของ User แต่ละคนใน Backoffice

---

## 1. Description

สร้าง Side-panel Component ที่เปิดขึ้นเมื่อ Admin คลิก User ในตาราง แสดงสรุปข้อมูล Vibe ของ User ได้แก่: ชื่อและรูปสัตว์, คำอธิบายบุคลิกภาพ, Score Meter Chart แสดงคะแนน % ทั้ง 4 มิติ, และรายการ "คุณน่าจะชอบอะไร" แบ่งตาม 4 หมวด

---

## 2. Acceptance Criteria

### Scenario 1 — Side-panel เปิดเมื่อกด User

- **Given:** Admin อยู่ที่หน้า User List
- **When:** กดที่ User รายหนึ่ง
- **Then:** Side-panel เลื่อนออกมาแสดงข้อมูล Vibe ของ User นั้น

### Scenario 2 — แสดงข้อมูล Vibe ครบถ้วน

- **Given:** Side-panel เปิดสำหรับ User ที่มี vibe_result
- **When:** มองที่ Side-panel
- **Then:** แสดงชื่อสัตว์, คำอธิบายบุคลิกภาพ, Score Meter Chart 4 มิติ, และกิจกรรมแนะนำ 4 หมวด

### Scenario 3 — Side-panel สำหรับ User ที่ยังไม่ทำ Quiz

- **Given:** Side-panel เปิดสำหรับ User ที่ไม่มี vibe_result
- **When:** มองที่ Side-panel
- **Then:** แสดง Empty State ที่เหมาะสม (ไม่แสดง Error)

### Scenario 4 — ปิด Side-panel

- **Given:** Side-panel เปิดอยู่
- **When:** Admin กด Close หรือคลิกนอก Panel
- **Then:** Side-panel ปิดลงและตารางกลับมาใช้งานได้ปกติ

---

## 3. Definition of Done

- [ ] Side-panel Component สร้างแล้วและเปิด/ปิดได้
- [ ] แสดงข้อมูล Vibe ครบถ้วนเมื่อมีข้อมูล
- [ ] Score Meter Chart แสดง % ครบ 4 มิติ
- [ ] กิจกรรมแนะนำแสดงครบ 4 หมวด
- [ ] Empty State สำหรับ User ที่ไม่มี vibe_result
- [ ] ทำงานถูกต้องบน Desktop Resolution

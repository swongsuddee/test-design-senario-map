# PP-239 · [MB][End-User] Integrate Event Detail

| Field        | Value                                                                                              |
|--------------|----------------------------------------------------------------------------------------------------|
| **Key**      | PP-239                                                                                             |
| **Type**     | Sub-task                                                                                           |
| **Project**  | POPPA                                                                                              |
| **Status**   | Ready To Test STG                                                                                  |
| **Assignee** | —                                                                                                  |
| **Parent**   | [PP-237](./PP-237_Event_Detail_Excluding_Comment.md)                                               |

---

## User Story

> Integrate Event Detail API เข้ากับ UI บน Mobile App เพื่อแสดงข้อมูลงานวิ่งแบบ Real Data

---

## 1. Description

งาน Mobile ที่ต้องเชื่อมต่อ UI ของหน้า Event Detail (PP-238) กับ Event Detail API (PP-243) โดย Fetch ข้อมูลและ Map ลง Component ให้ถูกต้อง จัดการ Loading State, Error State และ Empty State

---

## 2. Acceptance Criteria

### Scenario 1 — Fetch ข้อมูลสำเร็จ

- **Given:** End-User เปิดหน้า Event Detail
- **When:** API ตอบกลับสำเร็จ
- **Then:** UI แสดงข้อมูล Event ถูกต้องทุก Field ตาม API Response

### Scenario 2 — แสดง Loading State

- **Given:** End-User เปิดหน้า Event Detail
- **When:** API ยังโหลดไม่เสร็จ
- **Then:** แสดง Loading Indicator ที่เหมาะสม

### Scenario 3 — จัดการ Error State

- **Given:** API ตอบกลับด้วย Error
- **When:** หน้า Event Detail โหลด
- **Then:** แสดง Error Message ที่เหมาะสม มีปุ่ม Retry

---

## 3. Definition of Done

- [ ] ข้อมูล Event Detail แสดงจาก API ถูกต้อง
- [ ] Loading State แสดงระหว่างรอ
- [ ] Error State พร้อม Retry Button
- [ ] ผ่าน Integration Test บน STG

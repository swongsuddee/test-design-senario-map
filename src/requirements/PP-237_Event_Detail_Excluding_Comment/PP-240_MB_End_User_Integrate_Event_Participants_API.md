# PP-240 · [MB][End-User] Integrate Event Participants API

| Field        | Value                                                                                              |
|--------------|----------------------------------------------------------------------------------------------------|
| **Key**      | PP-240                                                                                             |
| **Type**     | Sub-task                                                                                           |
| **Project**  | POPPA                                                                                              |
| **Status**   | Ready To Test STG                                                                                  |
| **Assignee** | —                                                                                                  |
| **Parent**   | [PP-237](./PP-237_Event_Detail_Excluding_Comment.md)                                               |

---

## User Story

> Integrate Event Participants API เข้ากับ UI บน Mobile App เพื่อแสดงรายชื่อผู้เข้าร่วมงานวิ่ง

---

## 1. Description

งาน Mobile ที่ต้องเชื่อมต่อ UI ส่วน Participants (PP-241) กับ Event Participants API (PP-242) โดย Fetch รายชื่อผู้เข้าร่วมและ Map ลง Component จัดการ Pagination, Loading State และ Empty State เมื่อไม่มีผู้เข้าร่วม

---

## 2. Acceptance Criteria

### Scenario 1 — แสดงรายชื่อ Participants สำเร็จ

- **Given:** End-User เปิดดูส่วน Participants ของ Event
- **When:** API ตอบกลับรายชื่อผู้เข้าร่วม
- **Then:** UI แสดงรายชื่อ Participants ถูกต้องตาม API Response

### Scenario 2 — Empty State เมื่อไม่มี Participants

- **Given:** Event ที่ยังไม่มีผู้ลงทะเบียน
- **When:** Fetch Participants API สำเร็จแต่ได้รายการว่าง
- **Then:** แสดง Empty State ที่เหมาะสม

### Scenario 3 — Pagination ทำงานถูกต้อง

- **Given:** Event ที่มี Participants จำนวนมาก
- **When:** End-User Scroll ถึงท้ายรายการ
- **Then:** โหลด Participants เพิ่มเติม (Load More / Infinite Scroll) ได้ถูกต้อง

---

## 3. Definition of Done

- [ ] รายชื่อ Participants แสดงจาก API ถูกต้อง
- [ ] Empty State แสดงเมื่อไม่มีข้อมูล
- [ ] Pagination/Load More ทำงานได้
- [ ] ผ่าน Integration Test บน STG

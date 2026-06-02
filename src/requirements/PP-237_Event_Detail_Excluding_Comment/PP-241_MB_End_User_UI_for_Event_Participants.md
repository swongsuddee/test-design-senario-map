# PP-241 · [MB][End-User] UI for Event Participants

| Field        | Value                                                                                              |
|--------------|----------------------------------------------------------------------------------------------------|
| **Key**      | PP-241                                                                                             |
| **Type**     | Sub-task                                                                                           |
| **Project**  | POPPA                                                                                              |
| **Status**   | Ready To Test STG                                                                                  |
| **Assignee** | —                                                                                                  |
| **Parent**   | [PP-237](./PP-237_Event_Detail_Excluding_Comment.md)                                               |

---

## User Story

> Implement UI Component สำหรับแสดงรายชื่อผู้เข้าร่วมงานวิ่ง (Participants) บน Mobile App

---

## 1. Description

งาน Mobile ที่ต้อง Implement UI ของส่วน Participants บนหน้า Event Detail ตาม Figma Design ประกอบด้วย Participant Card แสดงชื่อ, รูป Avatar และข้อมูลพื้นฐาน รองรับ Empty State และ Loading State

---

## 2. Acceptance Criteria

### Scenario 1 — UI Participants แสดงถูกต้อง

- **Given:** มีข้อมูล Participants
- **When:** เปิดดูส่วน Participants บนหน้า Event Detail
- **Then:** แสดง Participant Card พร้อม Avatar, ชื่อ ตาม Figma Design

### Scenario 2 — Empty State

- **Given:** ไม่มีผู้เข้าร่วม
- **When:** แสดงส่วน Participants
- **Then:** แสดง Empty State Component ที่เหมาะสม

### Scenario 3 — Loading State

- **Given:** กำลัง Fetch ข้อมูล Participants
- **When:** รอ API Response
- **Then:** แสดง Skeleton Loader หรือ Loading Indicator

---

## 3. Definition of Done

- [ ] Participant Card UI ตรงตาม Figma
- [ ] Empty State Component พร้อม
- [ ] Loading State แสดงระหว่างรอ
- [ ] ผ่าน Code Review

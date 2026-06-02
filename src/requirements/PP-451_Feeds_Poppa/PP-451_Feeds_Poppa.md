# PP-451 · [M-App][End-User] Feeds — Poppa (หน้าฟีดหลัก)

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-451        |
| **Type**     | Story         |
| **Project**  | POPPA         |
| **Status**   | In Progress   |
| **Assignee** | —             |
| **Figma**    | Design by Dev |

---

## User Story

> **ในฐานะ:** End-User บน M-App
> **ฉันต้องการ:** เห็น Feed หลักที่แสดง Post และ Reels จาก following ตามลำดับเวลา
> **เพื่อ:** ติดตามเนื้อหาล่าสุดจากคนที่ฉัน follow โดยไม่มี algorithmic ranking

---

## 1. Description

หน้า Feed หลักของ Poppa แสดง Post และ Reels จาก following ตามลำดับเวลา (chronological) โดยไม่ใช้ personalized หรือ algorithmic feed รองรับการดู Post Detail, การ Report Post ที่ไม่เหมาะสม และ integrate กับ BE Feed service

---

## 2. Acceptance Criteria

### Scenario 1 — แสดง Post Feed

- **Given:** User เปิดหน้า Feeds
- **When:** ระบบโหลด Feed
- **Then:** แสดง Post ของคนที่ User follow เรียงตามเวลาล่าสุด (chronological)

### Scenario 2 — Post Feed Integrate API

- **Given:** หน้า Feed โหลด
- **When:** FE เรียก Feed API
- **Then:** ได้รับรายการ Post ที่ถูกต้องจาก backend

### Scenario 3 — ดู Post Detail

- **Given:** User เห็น Post ใน Feed
- **When:** กดที่ Post
- **Then:** แสดง Post Detail UI พร้อมข้อมูลครบถ้วน (caption, media, likes, comments)

### Scenario 4 — Post Detail Integrate API

- **Given:** User เปิด Post Detail
- **When:** FE โหลด detail
- **Then:** ดึงข้อมูล Post detail จาก API ได้ถูกต้อง

### Scenario 5 — Report Post UI

- **Given:** User เห็น Post ที่ไม่เหมาะสม
- **When:** กด Report
- **Then:** แสดง Report Dialog พร้อม reason options

### Scenario 6 — Report Post Integrate API

- **Given:** User เลือก reason และ confirm Report
- **When:** FE ส่ง report
- **Then:** API รับ report สำเร็จ; แสดง success confirmation

---

## 3. Definition of Done

- [ ] Post Feed UI แสดง chronological feed ได้ถูกต้อง
- [ ] Post Feed integrate กับ Feed API
- [ ] Post Detail UI แสดงข้อมูลครบถ้วน
- [ ] Post Detail integrate กับ API
- [ ] Report Post UI แสดง Dialog พร้อม reason options
- [ ] Report Post integrate กับ API
- [ ] [RFC] System Design — Feeds เสร็จและ reviewed

---

## 4. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-454](./PP-454_RFC_System_Design_Feeds.md) | [RFC] System Design — Feeds (Architecture, Flow, Data Schema) | In Progress |
| [PP-509](./PP-509_Post_Feed_UI.md) | [MB][End-User] Post Feed UI | Review Code |
| [PP-510](./PP-510_Post_Feed_Integrate_API.md) | [MB][End-User] Post Feed Integrate API | To Do |
| [PP-515](./PP-515_Feeds_Post_Detail_UI.md) | [MB][End-User] Feeds Post Detail UI | To Do |
| [PP-516](./PP-516_Feeds_Post_Detail_Integrate_API.md) | [MB][End-User] Feeds Post Detail Integrate API | To Do |
| [PP-517](./PP-517_Feeds_Report_Post_UI.md) | [MB][End-User] Feeds Report Post UI | To Do |
| [PP-518](./PP-518_Feeds_Report_Post_Integrate_API.md) | [MB][End-User] Feeds Report Post Integrate API | To Do |

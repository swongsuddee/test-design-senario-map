# PP-500 · [BE][Event][End user] Return Host + Organizer Snapshot

| Field        | Value                                                                                              |
|--------------|----------------------------------------------------------------------------------------------------|
| **Key**      | PP-500                                                                                             |
| **Type**     | Sub-task                                                                                           |
| **Project**  | POPPA                                                                                              |
| **Status**   | To Do                                                                                              |
| **Assignee** | —                                                                                                  |
| **Parent**   | [PP-226](./PP-226_Event_Detail_Organizer_Information.md)                                           |

---

## User Story

> Implement BE API ให้ส่งคืน Host และ Organizer Snapshot ในข้อมูล Event Detail สำหรับ End-User

---

## 1. Description

งาน Backend ที่ต้อง Implement ให้ Event Detail API ส่งคืนข้อมูล Snapshot ของ Host และ Organizer พร้อมกับ Event Data โดย Snapshot ต้องเก็บข้อมูล ณ เวลาที่ Event ถูกสร้าง เพื่อให้ข้อมูล Host/Organizer ที่แสดงบน App ไม่เปลี่ยนแปลงหากมีการแก้ไขโปรไฟล์ในภายหลัง

---

## 2. Acceptance Criteria

### Scenario 1 — API ส่งคืน Host Snapshot

- **Given:** End-User เรียก Event Detail API
- **When:** Event มี Host ที่กำหนดไว้
- **Then:** Response มีข้อมูล Host Snapshot ครบ เช่น `host.name`, `host.logo_url`

### Scenario 2 — API ส่งคืน Organizer Snapshot

- **Given:** End-User เรียก Event Detail API
- **When:** Event มี Organizer ที่กำหนดไว้
- **Then:** Response มีข้อมูล Organizer Snapshot ครบ เช่น `organizer.name`, `organizer.logo_url`

### Scenario 3 — Host = Organizer

- **Given:** Event ที่ Host และ Organizer เป็นรายการเดียวกัน
- **When:** เรียก Event Detail API
- **Then:** Response ส่งคืนข้อมูลทั้งสอง Field โดยมีค่าเหมือนกัน

### Scenario 4 — ไม่มีข้อมูล Host หรือ Organizer

- **Given:** Event ที่ไม่มี Host หรือ Organizer กำหนดไว้
- **When:** เรียก Event Detail API
- **Then:** Response ส่ง `null` หรือ Empty Object สำหรับ Field ที่ขาด โดยไม่ Error

---

## 3. Definition of Done

- [ ] API ส่งคืน Host Snapshot ถูกต้องครบทุก Field
- [ ] API ส่งคืน Organizer Snapshot ถูกต้องครบทุก Field
- [ ] กรณี Host = Organizer ส่งข้อมูลถูกต้อง
- [ ] กรณีไม่มีข้อมูล ส่ง null/empty ไม่ขึ้น Error
- [ ] มี Unit/Integration Test ครอบคลุม

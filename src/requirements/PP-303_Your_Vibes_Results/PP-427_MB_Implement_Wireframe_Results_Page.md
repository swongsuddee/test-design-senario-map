# PP-427 · [MB][End-User] implement wireframe results page (wait for ui)

| Field        | Value                                                      |
|--------------|------------------------------------------------------------|
| **Key**      | PP-427                                                     |
| **Type**     | Sub-task                                                   |
| **Project**  | POPPA                                                      |
| **Status**   | To Do                                                      |
| **Assignee** | —                                                          |
| **Parent**   | [PP-303](./PP-303_Your_Vibes_Results.md)                   |

---

## User Story

> สร้าง Wireframe โครงสร้างหน้าจอ Results สำหรับ End-User ก่อนที่ UI Design จะพร้อม

---

## 1. Description

สร้าง Wireframe / Skeleton ของหน้า Your Vibes Results โดยใช้ Placeholder UI เพื่อให้ทีม Mobile สามารถจัดโครงสร้าง Layout ได้ล่วงหน้า ครอบคลุม: Animal Image Area, Description Area, Chart Area (4 แกน), Recommended Activities Area, Share Button, Done Button

---

## 2. Acceptance Criteria

### Scenario 1 — โครงสร้างหน้าจอครบถ้วน

- **Given:** นักพัฒนาเปิดหน้า Results Wireframe
- **When:** หน้าแสดงผล
- **Then:** มี Placeholder สำหรับทุก Section ที่ระบุใน PP-303 AC ครบถ้วน

### Scenario 2 — ปุ่ม Share และ Done ทำงานได้

- **Given:** Wireframe ถูก Implement แล้ว
- **When:** กดปุ่ม Done
- **Then:** Navigation ไปยังหน้าถัดไปทำงานได้ (แม้เป็น Placeholder)

---

## 3. Definition of Done

- [ ] Wireframe ครอบคลุมทุก Section ตาม PP-303
- [ ] ปุ่ม Done มี Navigation ที่ทำงานได้
- [ ] พร้อมรับ UI Design จริงใน PP-428 โดยไม่ต้องเปลี่ยน Logic

# PP-422 · [MB][End-User] Implement wireframe quiz page (wait for ui)

| Field        | Value                                                      |
|--------------|------------------------------------------------------------|
| **Key**      | PP-422                                                     |
| **Type**     | Sub-task                                                   |
| **Project**  | POPPA                                                      |
| **Status**   | To Do                                                      |
| **Assignee** | —                                                          |
| **Parent**   | [PP-302](./PP-302_Your_Vibes_Core_Quiz.md)                 |

---

## User Story

> สร้าง Wireframe โครงสร้างหน้าจอ Quiz สำหรับ End-User ก่อนที่ UI Design จะพร้อม

---

## 1. Description

สร้าง Wireframe / Skeleton ของหน้า Quiz โดยใช้ Placeholder UI เพื่อให้ทีม Mobile สามารถจัดโครงสร้าง Layout และ Navigation ได้ล่วงหน้า รอรับ UI Design จริงในภายหลัง

---

## 2. Acceptance Criteria

### Scenario 1 — โครงสร้างหน้าจอถูกต้อง

- **Given:** นักพัฒนาเปิดหน้า Quiz Wireframe
- **When:** หน้าแสดงผล
- **Then:** มี Placeholder สำหรับ Progress Bar, คำถาม, ตัวเลือกคำตอบ, ปุ่ม Back และปุ่ม Next ครบถ้วน

### Scenario 2 — Navigation เชื่อมต่อได้

- **Given:** Wireframe ถูก Implement แล้ว
- **When:** ทีมทดสอบ Navigation Flow
- **Then:** สามารถเดินหน้า/ถอยหลังระหว่างข้อได้ถูกต้อง แม้จะเป็น Placeholder UI

---

## 3. Definition of Done

- [ ] Wireframe ครอบคลุมทุก Component ที่ระบุใน PP-302
- [ ] Navigation Flow ระหว่างข้อ 1-7 ทำงานได้
- [ ] พร้อมรับ UI Design จริงใน PP-423 โดยไม่ต้องเปลี่ยน Logic

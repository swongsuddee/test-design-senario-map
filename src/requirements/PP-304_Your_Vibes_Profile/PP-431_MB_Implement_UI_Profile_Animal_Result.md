# PP-431 · [MB][End-User] implement ui profile animal result page

| Field        | Value                                                      |
|--------------|------------------------------------------------------------|
| **Key**      | PP-431                                                     |
| **Type**     | Sub-task                                                   |
| **Project**  | POPPA                                                      |
| **Status**   | To Do                                                      |
| **Assignee** | —                                                          |
| **Parent**   | [PP-304](./PP-304_Your_Vibes_Profile.md)                   |

---

## User Story

> นำ UI Design จริงมา Implement Section Animal Result ในหน้า Profile ให้ตรงตาม Design Spec

---

## 1. Description

นำ Figma / UI Design มา Implement Section Vibe Result ในหน้า User Profile อย่างครบถ้วน ครอบคลุม Animal Image (รูปภาพชัดเจน), ชื่อประเภทบุคลิกภาพ, ปุ่ม Share พร้อม State ถูกต้อง และ Empty State สำหรับกรณี User ยังไม่ทำ Quiz

---

## 2. Acceptance Criteria

### Scenario 1 — UI ตรงตาม Design

- **Given:** นักพัฒนา Implement UI ตาม Design Spec
- **When:** เปิดหน้า Profile ในแอปที่มี Vibe Result
- **Then:** ทุก Component แสดงผลถูกต้องตาม Design (รูปภาพ, ชื่อสัตว์, ปุ่ม Share)

### Scenario 2 — Empty State สำหรับผู้ยังไม่ทำ Quiz

- **Given:** User ยังไม่มี vibe_result
- **When:** เปิดหน้า Profile
- **Then:** แสดง Empty State / Prompt ที่ Design กำหนด (ไม่แสดง Error)

---

## 3. Definition of Done

- [ ] Animal Image แสดงชัดเจนตาม Design
- [ ] ชื่อประเภทบุคลิกภาพแสดงถูกต้อง
- [ ] ปุ่ม Share มี Style ถูกต้องตาม Design
- [ ] Empty State แสดงเมื่อ vibe_result เป็น null

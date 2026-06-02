# PP-423 · [MB][End-User] implement ui quiz page

| Field        | Value                                                      |
|--------------|------------------------------------------------------------|
| **Key**      | PP-423                                                     |
| **Type**     | Sub-task                                                   |
| **Project**  | POPPA                                                      |
| **Status**   | To Do                                                      |
| **Assignee** | —                                                          |
| **Parent**   | [PP-302](./PP-302_Your_Vibes_Core_Quiz.md)                 |

---

## User Story

> นำ UI Design จริงมา Implement แทนที่ Wireframe ในหน้า Quiz ให้ตรงกับ Design Spec

---

## 1. Description

นำ Figma / UI Design ที่ได้รับมา Implement หน้า Quiz ให้มีความสวยงามตาม Spec โดยครอบคลุม Progress Bar, Card คำถาม, ปุ่มตัวเลือก (Option Buttons), ปุ่ม Back, และปุ่ม Next พร้อม State ที่ถูกต้อง (Active / Disabled)

---

## 2. Acceptance Criteria

### Scenario 1 — UI ตรงตาม Design

- **Given:** นักพัฒนา Implement UI ตาม Design Spec แล้ว
- **When:** เปิดหน้า Quiz ในแอป
- **Then:** Layout, สี, Font, ขนาดปุ่ม ตรงตาม Design ทุก Component

### Scenario 2 — State ของปุ่ม Next

- **Given:** ผู้ใช้ยังไม่ได้เลือกคำตอบ
- **When:** มองที่ปุ่ม Next
- **Then:** ปุ่มแสดง Style Disabled (สีจาง / ไม่สามารถกดได้)

### Scenario 3 — State ของ Progress Bar

- **Given:** ผู้ใช้อยู่ที่ข้อ N
- **When:** มองที่ Progress Bar
- **Then:** แถบแสดงความก้าวหน้า N/7 อย่างถูกต้องตาม Design

---

## 3. Definition of Done

- [ ] UI ทุก Component ตรงตาม Design Spec
- [ ] Progress Bar แสดงถูกต้องในทุกข้อ
- [ ] ปุ่ม Next มี Disabled State เมื่อยังไม่เลือกคำตอบ
- [ ] ปุ่ม Back มี Style ถูกต้อง
- [ ] ตัวเลือกคำตอบแสดง Selected State เมื่อถูกเลือก

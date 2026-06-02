# PP-238 · [MB][End-User] UI for Event Detail (excluding comment)

| Field        | Value                                                                                              |
|--------------|----------------------------------------------------------------------------------------------------|
| **Key**      | PP-238                                                                                             |
| **Type**     | Sub-task                                                                                           |
| **Project**  | POPPA                                                                                              |
| **Status**   | Ready To Test STG                                                                                  |
| **Assignee** | —                                                                                                  |
| **Parent**   | [PP-237](./PP-237_Event_Detail_Excluding_Comment.md)                                               |

---

## User Story

> Implement UI สำหรับหน้า Event Detail บน Mobile App ยกเว้น Comment Section

---

## 1. Description

งาน Mobile ที่ต้อง Implement UI ของหน้า Event Detail ตาม Figma Design โดยครอบคลุมโครงสร้างหน้าทั้งหมด ได้แก่ Event Image, ชื่องาน, รายละเอียด, สถานที่, วันที่ และ Gallery ยกเว้นส่วน Comment

---

## 2. Acceptance Criteria

### Scenario 1 — UI แสดงครบตาม Figma

- **Given:** Developer Implement UI ตาม Figma node-id 2525-4706
- **When:** เปิดหน้า Event Detail บน Mobile App
- **Then:** Layout และ Component ตรงตาม Figma Design ทุก Section (ยกเว้น Comment)

### Scenario 2 — Responsive บนหลายขนาดหน้าจอ

- **Given:** UI ถูก Implement แล้ว
- **When:** ทดสอบบน Device ขนาดต่าง ๆ
- **Then:** Layout ไม่แตกหรือ Overflow บนทุก Device ที่รองรับ

### Scenario 3 — ไม่มี Comment Component

- **Given:** UI ถูก Implement แล้ว
- **When:** ตรวจสอบโครงสร้าง Component
- **Then:** ไม่มี Comment Component หรือ Placeholder Comment ในหน้า

---

## 3. Definition of Done

- [ ] UI ตรงตาม Figma ทุก Section ยกเว้น Comment
- [ ] ทดสอบบน iOS และ Android
- [ ] ไม่มี Comment Component ในหน้า
- [ ] ผ่าน Code Review

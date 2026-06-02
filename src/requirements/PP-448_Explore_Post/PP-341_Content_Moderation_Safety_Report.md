# PP-341 · [M-App][End-User] Content Moderation (Safety & Report)

| Field        | Value |
|--------------|-------|
| **Key**      | PP-341 |
| **Type**     | Sub-task |
| **Project**  | POPPA |
| **Status**   | To Do |
| **Assignee** | — |
| **Parent**   | [PP-448](./PP-448_Explore_Post.md) |
| **Figma**    | Design by Dev |

---

## User Story

> ฉันต้องการแจ้งเตือนระบบหากเจอเนื้อหาที่ไม่เหมาะสม เพื่อรักษาความปลอดภัยของ Community

---

## 1. Description

Content Moderation ให้ผู้ใช้สามารถ Report โพสต์ที่ไม่เหมาะสมผ่านเมนู 3 Dots โดยเลือกสาเหตุ (Spam, Inappropriate Content, Harassment) และข้อมูล Report จะถูกส่งไปยัง Backoffice ของ Admin Poppa เพื่อตรวจสอบและดำเนินการลบโพสต์หรือ Ban ผู้ใช้หากจำเป็น

---

## 2. Acceptance Criteria

### Scenario 1 — Access Report Menu via 3 Dots

- **Given:** ผู้ใช้เห็นโพสต์ที่ต้องการ Report
- **When:** ผู้ใช้กดเมนู 3 Dots บนโพสต์
- **Then:** ระบบแสดงตัวเลือก "Report"

### Scenario 2 — Select Report Reason: Spam

- **Given:** ผู้ใช้เลือก "Report" จากเมนู 3 Dots
- **When:** ผู้ใช้เลือกสาเหตุ "Spam"
- **Then:** ระบบบันทึก Report พร้อมสาเหตุ Spam และส่งไปยัง Backoffice

### Scenario 3 — Select Report Reason: Inappropriate Content

- **Given:** ผู้ใช้เลือก "Report" จากเมนู 3 Dots
- **When:** ผู้ใช้เลือกสาเหตุ "Inappropriate Content"
- **Then:** ระบบบันทึก Report พร้อมสาเหตุ Inappropriate Content และส่งไปยัง Backoffice

### Scenario 4 — Select Report Reason: Harassment

- **Given:** ผู้ใช้เลือก "Report" จากเมนู 3 Dots
- **When:** ผู้ใช้เลือกสาเหตุ "Harassment"
- **Then:** ระบบบันทึก Report พร้อมสาเหตุ Harassment และส่งไปยัง Backoffice

### Scenario 5 — Admin Receives Report in Backoffice

- **Given:** ผู้ใช้ส่ง Report สำเร็จ
- **When:** Admin เปิด Backoffice
- **Then:** ข้อมูล Report แสดงในระบบ Backoffice Admin Poppa พร้อมรายละเอียดโพสต์และสาเหตุ

---

## 3. Technical Rules

| Feature | Rule |
|---------|------|
| Report Entry Point | เมนู 3 Dots บนโพสต์ |
| Report Reasons | Spam, Inappropriate Content, Harassment |
| Report Destination | Backoffice Admin Poppa |
| Admin Actions | ตรวจสอบ → ลบโพสต์หรือ Ban ผู้ใช้หากจำเป็น |

---

## 4. Definition of Done

- [ ] เมนู 3 Dots บนโพสต์แสดงตัวเลือก "Report"
- [ ] ผู้ใช้สามารถเลือกสาเหตุ Spam ได้
- [ ] ผู้ใช้สามารถเลือกสาเหตุ Inappropriate Content ได้
- [ ] ผู้ใช้สามารถเลือกสาเหตุ Harassment ได้
- [ ] ข้อมูล Report ถูกส่งไปยัง Backoffice Admin ครบถ้วน
- [ ] Admin สามารถเห็น Report ใน Backoffice และดำเนินการได้

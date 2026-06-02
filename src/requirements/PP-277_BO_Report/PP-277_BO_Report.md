# PP-277 · [BO] Report (แสดงข้อมูลผู้สมัครงานวิ่ง)

| Field        | Value         |
|--------------|---------------|
| **Key**      | PP-277        |
| **Type**     | Story         |
| **Project**  | POPPA         |
| **Status**   | To Do         |
| **Assignee** | —             |
| **Figma**    | Design by Dev |

---

## User Story

> **ในฐานะ:** Organizer ผู้จัดงานวิ่ง
> **ฉันต้องการ:** ดูข้อมูลสรุปผู้สมัครงานวิ่ง
> **เพื่อ:** ติดตามและวิเคราะห์จำนวนผู้เข้าร่วมได้จาก Dashboard Export

---

## 1. Description

ระบบ Report สำหรับ Organizer บน Backoffice เพื่อดูข้อมูลผู้สมัครงานวิ่ง โดยทีม UX/UI ได้หารือกันให้ตัด Report Menu ออกจาก Navigation หลัก และให้ดูข้อมูลผ่านฟีเจอร์ Excel Export บนหน้า Dashboard แทน ข้อมูลสรุปสามารถส่งออกได้โดยตรงจาก Dashboard Export

---

## 2. Acceptance Criteria

### Scenario 1 — Organizer ดูข้อมูลผู้สมัครผ่าน Dashboard Export

- **Given:** Organizer เข้าสู่ระบบ Backoffice และอยู่บนหน้า Dashboard
- **When:** กดปุ่ม Export ข้อมูล
- **Then:** ระบบส่งออกไฟล์ Excel ที่มีข้อมูลผู้สมัครงานวิ่งครบถ้วน

### Scenario 2 — ไม่มี Report Menu แยกต่างหาก

- **Given:** Organizer เข้าสู่ระบบ Backoffice
- **When:** ดู Navigation Menu หลัก
- **Then:** ไม่มีเมนู "Report" แยกต่างหาก ข้อมูลรวมอยู่ใน Dashboard Export แทน

### Scenario 3 — ข้อมูล Export ครบถ้วน

- **Given:** Organizer กด Export ข้อมูลผู้สมัคร
- **When:** ไฟล์ Excel ถูกดาวน์โหลดเสร็จสิ้น
- **Then:** ไฟล์มีข้อมูลผู้สมัครครบถ้วน เช่น ชื่อ, ประเภทการสมัคร, สถานะการชำระเงิน และวันที่สมัคร

---

## 3. Technical Rules

| หมายเหตุ | รายละเอียด |
|----------|-----------|
| Report Menu | ถูกตัดออกจาก Navigation ตามมติทีม UX/UI |
| ช่องทางดูข้อมูล | ผ่าน Excel Export บนหน้า Dashboard |
| Format ข้อมูล | Excel (.xlsx) |
| ข้อมูลที่ต้องมีใน Export | ชื่อผู้สมัคร, ประเภทการสมัคร, สถานะการชำระเงิน, วันที่สมัคร |

---

## 4. Definition of Done

- [ ] ยืนยันว่าไม่มี Report Menu แยกต่างหากใน Navigation
- [ ] Dashboard Export ส่งออกข้อมูลผู้สมัครได้ครบถ้วน
- [ ] ไฟล์ Excel มีข้อมูลตรงตาม Requirement (ชื่อ, ประเภทการสมัคร, สถานะการชำระเงิน, วันที่สมัคร)
- [ ] ทดสอบ Export บน STG ผ่าน

---

## 5. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| — | ไม่พบ Sub-task ใน Jira (issue ไม่สามารถเข้าถึงได้ผ่าน API) | — |

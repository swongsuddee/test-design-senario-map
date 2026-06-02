# PP-136 · [BO][Agency x Personal] Update Book Bank Acc (เติมเรื่องเอกสาร Bank Acc)

| Field        | Value                                      |
|--------------|--------------------------------------------|
| **Key**      | PP-136                                     |
| **Type**     | Story                                      |
| **Project**  | POPPA                                      |
| **Status**   | Ready To Test STG                          |
| **Assignee** | Jojoe - Sattawat.w                         |
| **Figma**    | ตาม CaptureScreen ใน Jira                  |

---

## User Story

> **ในฐานะ:** Agency (นิติบุคคล หรือ บุคคลธรรมดา)
> **ฉันต้องการ:** อัปโหลดหน้าสมุดบัญชีธนาคารในขั้นตอนกรอกเอกสารสำคัญ
> **เพื่อ:** ให้ Admin ตรวจสอบบัญชีธนาคารที่ใช้รับเงินค่าสมัคร

---

## 1. Description

เพิ่มกล่อง Upload "หน้าสมุดบัญชีธนาคาร" ที่ Section เอกสารสำคัญในหน้า Profile ของ Agency ทั้งประเภทนิติบุคคลและบุคคลธรรมดา

---

## 2. Acceptance Criteria

### Scenario 1 — Book Bank Upload Field visible (Individual)

- **Given:** Agency ที่เลือกประเภท "บุคคลธรรมดา" อยู่ที่หน้า Profile / เอกสารสำคัญ
- **When:** หน้าโหลดสำเร็จ
- **Then:** ระบบแสดงกล่อง Upload "หน้าสมุดบัญชีธนาคาร" ใน Section เอกสารสำคัญ

### Scenario 2 — Book Bank Upload Field visible (Corporate)

- **Given:** Agency ที่เลือกประเภท "นิติบุคคล" อยู่ที่หน้า Profile / เอกสารสำคัญ
- **When:** หน้าโหลดสำเร็จ
- **Then:** ระบบแสดงกล่อง Upload "หน้าสมุดบัญชีธนาคาร" ใน Section เอกสารสำคัญเช่นกัน

### Scenario 3 — Upload Book Bank Document

- **Given:** Agency กดเลือกไฟล์ในกล่อง Upload หน้าสมุดบัญชี
- **When:** Agency เลือกไฟล์ที่ถูกต้อง (PDF, JPG, PNG ไม่เกิน 10 MB)
- **Then:** ไฟล์ถูกอัปโหลดสำเร็จและแสดงสถานะ/ตัวอย่างไฟล์ในหน้า

### Scenario 4 — Invalid File Type

- **Given:** Agency พยายามอัปโหลดไฟล์ที่ไม่รองรับ (เช่น .exe, .zip)
- **When:** เลือกไฟล์
- **Then:** ระบบปฏิเสธและแสดงข้อความแจ้งประเภทไฟล์ที่รองรับ

---

## 3. File Upload Rules

| Field | Rule |
|-------|------|
| **ประเภทไฟล์** | PDF, JPG, PNG เท่านั้น |
| **ขนาดสูงสุด** | 10 MB ต่อไฟล์ |
| **Applies to** | บุคคลธรรมดา และ นิติบุคคล |

---

## 4. Definition of Done

- [ ] กล่อง Upload หน้าสมุดบัญชีธนาคารแสดงในหน้า Individual Profile
- [ ] กล่อง Upload หน้าสมุดบัญชีธนาคารแสดงในหน้า Corporate Profile
- [ ] Upload สำเร็จสำหรับไฟล์ประเภท PDF, JPG, PNG ≤ 10 MB
- [ ] แสดง Error สำหรับไฟล์ประเภทที่ไม่รองรับ

---

## 5. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-137](./PP-137_BE_APIs_for_Book_Bank.md) | [BE] APIs for Book Bank | Ready To Test STG |
| [PP-138](./PP-138_FE_Book_Bank_Integration_API.md) | [FE] Book Bank integration api | Ready To Test STG |
| [PP-139](./PP-139_FE_Book_Bank_Implement_UI.md) | [FE] Book Bank implement ui | Ready to Deploy STG |

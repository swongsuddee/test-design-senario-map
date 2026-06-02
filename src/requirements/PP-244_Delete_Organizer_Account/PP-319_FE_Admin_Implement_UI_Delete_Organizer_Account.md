# PP-319 · [FE][Admin] implement ui delete organizer account

| Field        | Value                                                    |
|--------------|----------------------------------------------------------|
| **Key**      | PP-319                                                   |
| **Type**     | Sub-task                                                 |
| **Project**  | POPPA                                                    |
| **Status**   | Ready To Test STG                                        |
| **Assignee** | BIG Phanuwit                                             |
| **Parent**   | [PP-244](./PP-244_Delete_Organizer_Account.md)           |
| **Figma**    | Design by Dev                                            |

---

## User Story

Implement UI สำหรับ Delete Organizer Account ใน BO ครอบคลุมปุ่ม Delete, Dialog ยืนยัน และ feedback หลังลบสำเร็จ

---

## 1. Acceptance Criteria

### Scenario 1 — Delete Button และ Confirmation Dialog

- **Given:** Admin อยู่ที่หน้า Organizer Account Detail
- **When:** กดปุ่ม Delete Account
- **Then:** แสดง Confirmation Dialog พร้อม warning message และปุ่ม Confirm / Cancel

### Scenario 2 — Success Feedback

- **Given:** Admin กด Confirm ใน Dialog
- **When:** ระบบลบ account สำเร็จ
- **Then:** แสดง success notification และ redirect กลับรายการ Organizer

---

## 2. Definition of Done

- [ ] ปุ่ม Delete Account แสดงบนหน้า Organizer Detail
- [ ] Confirmation Dialog แสดงก่อนดำเนินการ
- [ ] Success/Error feedback แสดงหลัง API response

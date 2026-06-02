# PP-433 · [FE][Admin] integration api delete organizer account

| Field        | Value                                                    |
|--------------|----------------------------------------------------------|
| **Key**      | PP-433                                                   |
| **Type**     | Sub-task                                                 |
| **Project**  | POPPA                                                    |
| **Status**   | Ready To Test STG                                        |
| **Assignee** | BIG Phanuwit                                             |
| **Parent**   | [PP-244](./PP-244_Delete_Organizer_Account.md)           |
| **Figma**    | Design by Dev                                            |

---

## User Story

เชื่อมต่อ API สำหรับ Delete Organizer Account พร้อม handle loading และ error state

---

## 1. Acceptance Criteria

### Scenario 1 — Integration สำเร็จ

- **Given:** UI Delete Organizer account พร้อมใช้งาน
- **When:** Admin กด Confirm ใน Dialog
- **Then:** FE เรียก API ลบ account, แสดง loading state ระหว่างรอ, และ refresh list หลัง success

### Scenario 2 — API Error

- **Given:** API ส่งกลับ error (e.g., 500, 404)
- **When:** FE รับ response
- **Then:** แสดง error message ที่เหมาะสมและ dialog ยังคงเปิดอยู่

---

## 2. Definition of Done

- [ ] FE เรียก Delete API ได้ถูกต้อง
- [ ] Loading state แสดงระหว่างรอ API
- [ ] Error state แสดงเมื่อ API ล้มเหลว
- [ ] List refresh อัตโนมัติหลังลบสำเร็จ

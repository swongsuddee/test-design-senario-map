# PP-99 · Gender

| Field        | Value                                                                                         |
|--------------|-----------------------------------------------------------------------------------------------|
| **Key**      | PP-99                                                                                         |
| **Type**     | Sub-task                                                                                      |
| **Project**  | POPPA                                                                                         |
| **Status**   | To Do                                                                                         |
| **Assignee** | Tum-Natthapon.C                                                                               |
| **Parent**   | [PP-90](./PP-90_Register_Flow.md)                                                             |
| **Figma**    | https://www.figma.com/design/PKyOOKQydjB98nVMOOyxy4/-PP--App-UI-Design?node-id=1691-5924     |

---

## User Story

> ในฐานะ End-User ฉันต้องการระบุเพศของตัวเอง เพื่อให้ระบบสามารถ Personalize ประสบการณ์การใช้งานและ Content ได้ตรงกับความต้องการมากขึ้น

---

## 1. Description

ขั้นตอนเลือกเพศ (Gender) ของผู้ใช้ใน Register Flow โดยแสดง Option ให้ผู้ใช้เลือก และสามารถข้ามขั้นตอนนี้ได้ (Optional) ก่อนไปยังขั้นตอนสุดท้ายของ Register Flow

---

## 2. Acceptance Criteria

### Scenario 1 — Display Gender Selection

- **Given:** ผู้ใช้ผ่านขั้นตอน Birth Date แล้ว
- **When:** ระบบแสดงหน้าเลือก Gender
- **Then:** แสดง Option Gender ให้เลือก (เช่น ชาย, หญิง, LGBTQ+, ไม่ระบุ)

### Scenario 2 — Select Gender

- **Given:** ผู้ใช้อยู่ที่หน้าเลือก Gender
- **When:** ผู้ใช้กด Option Gender ที่ต้องการ
- **Then:** ระบบ Highlight Option ที่เลือกและบันทึกค่า

### Scenario 3 — Skip Gender (Optional)

- **Given:** ผู้ใช้ไม่ต้องการระบุ Gender
- **When:** ผู้ใช้กดปุ่ม "ข้ามขั้นตอนนี้" หรือเลือก "ไม่ระบุ"
- **Then:** ระบบดำเนินการต่อโดยไม่บันทึก Gender

### Scenario 4 — Save and Complete Registration

- **Given:** ผู้ใช้เลือก Gender แล้ว
- **When:** ผู้ใช้กดปุ่ม "เสร็จสิ้น" หรือ "ถัดไป"
- **Then:** ระบบบันทึก Gender และเสร็จสิ้น Register Flow นำผู้ใช้ไปยังหน้า Home

---

## 3. Technical Rules

| Rule | Detail |
|------|--------|
| Gender Options | ชาย, หญิง, LGBTQ+, ไม่ระบุ |
| Optional Field | ผู้ใช้สามารถข้ามได้โดยไม่ Error |
| Storage | บันทึกใน Users Table: gender field |

---

## 4. Definition of Done

- [ ] แสดง Gender Options ครบถ้วนตาม Figma
- [ ] เลือก Gender ได้และ Highlight ถูกต้อง
- [ ] ข้ามขั้นตอนนี้ได้โดยไม่มี Error
- [ ] บันทึก Gender และเสร็จสิ้น Register Flow ได้

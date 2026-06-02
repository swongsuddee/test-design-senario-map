# PP-94 · Terms & Cons / PDPA

| Field        | Value                                                                                         |
|--------------|-----------------------------------------------------------------------------------------------|
| **Key**      | PP-94                                                                                         |
| **Type**     | Sub-task                                                                                      |
| **Project**  | POPPA                                                                                         |
| **Status**   | To Do                                                                                         |
| **Assignee** | Tum-Natthapon.C                                                                               |
| **Parent**   | [PP-90](./PP-90_Register_Flow.md)                                                             |
| **Figma**    | https://www.figma.com/design/PKyOOKQydjB98nVMOOyxy4/-PP--App-UI-Design?node-id=1691-5924     |

---

## User Story

> ในฐานะ End-User ฉันต้องการอ่านและยอมรับ Terms & Conditions และ PDPA ก่อนเริ่มใช้งานแอป เพื่อให้ตัวเองรับทราบสิทธิ์และความเป็นส่วนตัวของข้อมูล

---

## 1. Description

หน้าแสดง Terms & Conditions และ PDPA (Personal Data Protection Act) ที่ผู้ใช้ต้องยอมรับก่อนดำเนินการต่อใน Register Flow โดยระบบต้องบังคับให้ผู้ใช้ยอมรับเงื่อนไขก่อนจึงจะ Proceed ได้

---

## 2. Acceptance Criteria

### Scenario 1 — Display Terms & PDPA

- **Given:** ผู้ใช้ Sign-up สำเร็จและอยู่ที่ขั้นตอน Terms & PDPA
- **When:** หน้าโหลดสำเร็จ
- **Then:** ระบบแสดงเนื้อหา Terms & Conditions และ PDPA พร้อม Checkbox ยอมรับ

### Scenario 2 — Mandatory Acceptance

- **Given:** ผู้ใช้ยังไม่ได้ Tick Checkbox ยอมรับ Terms & PDPA
- **When:** ผู้ใช้กดปุ่ม "ถัดไป" หรือ "ยืนยัน"
- **Then:** ระบบไม่อนุญาตให้ดำเนินการต่อ และแสดงข้อความแจ้งให้ยอมรับก่อน

### Scenario 3 — Accept and Proceed

- **Given:** ผู้ใช้ Tick Checkbox ยอมรับ Terms & PDPA ครบถ้วนแล้ว
- **When:** ผู้ใช้กดปุ่ม "ยืนยัน"
- **Then:** ระบบบันทึกการยอมรับและนำผู้ใช้ไปยัง Step ถัดไป (Phone OTP)

### Scenario 4 — Read Full Content

- **Given:** ผู้ใช้ต้องการอ่านรายละเอียดเพิ่มเติม
- **When:** ผู้ใช้กดลิงก์ "อ่านเพิ่มเติม" หรือ "Terms & Conditions"
- **Then:** ระบบแสดงเนื้อหาฉบับเต็มใน Modal หรือหน้าใหม่

---

## 3. Technical Rules

| Rule | Detail |
|------|--------|
| PDPA Consent | ต้องบันทึก Consent ลง Database พร้อม Timestamp |
| Checkbox | ต้องแยก Checkbox ระหว่าง Terms และ PDPA (ถ้ามีหลายรายการ) |
| Enforcement | ระบบต้องไม่อนุญาตให้ข้ามขั้นตอนนี้โดยไม่ยอมรับ |

---

## 4. Definition of Done

- [ ] แสดงเนื้อหา Terms & Conditions และ PDPA ถูกต้อง
- [ ] Checkbox บังคับยอมรับก่อนดำเนินการต่อได้
- [ ] แสดง Error เมื่อผู้ใช้กด Proceed โดยไม่ได้ยอมรับ
- [ ] บันทึกการยอมรับและนำทางไปยัง Phone OTP
- [ ] ลิงก์อ่านเนื้อหาฉบับเต็มทำงานได้

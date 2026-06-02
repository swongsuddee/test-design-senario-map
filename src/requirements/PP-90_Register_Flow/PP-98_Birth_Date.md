# PP-98 · Birth Date

| Field        | Value                                                                                         |
|--------------|-----------------------------------------------------------------------------------------------|
| **Key**      | PP-98                                                                                         |
| **Type**     | Sub-task                                                                                      |
| **Project**  | POPPA                                                                                         |
| **Status**   | To Do                                                                                         |
| **Assignee** | Tum-Natthapon.C                                                                               |
| **Parent**   | [PP-90](./PP-90_Register_Flow.md)                                                             |
| **Figma**    | https://www.figma.com/design/PKyOOKQydjB98nVMOOyxy4/-PP--App-UI-Design?node-id=1691-5924     |

---

## User Story

> ในฐานะ End-User ฉันต้องการกรอกวันเกิดของตัวเอง เพื่อให้ระบบสามารถยืนยันอายุและปรับ Content ที่เหมาะสมกับช่วงวัยของฉัน

---

## 1. Description

ขั้นตอนกรอกวันเกิด (Birth Date) ของผู้ใช้ใน Register Flow โดยมี Date Picker หรือช่องกรอกวันเดือนปีเกิด ระบบตรวจสอบอายุขั้นต่ำก่อนอนุญาตให้ดำเนินการต่อ

---

## 2. Acceptance Criteria

### Scenario 1 — Display Birth Date Input

- **Given:** ผู้ใช้ผ่านขั้นตอน Profile Setup แล้ว
- **When:** ระบบแสดงหน้ากรอกวันเกิด
- **Then:** แสดง Date Picker หรือ Input Field สำหรับวัน/เดือน/ปีเกิด

### Scenario 2 — Select Valid Birth Date

- **Given:** ผู้ใช้อยู่ที่หน้ากรอกวันเกิด
- **When:** ผู้ใช้เลือกวันเกิดที่ถูกต้องและมีอายุตามเกณฑ์ขั้นต่ำ
- **Then:** ระบบยอมรับค่าและแสดงวันที่ที่เลือก

### Scenario 3 — Age Restriction

- **Given:** ผู้ใช้เลือกวันเกิดที่ทำให้อายุต่ำกว่าเกณฑ์ขั้นต่ำ
- **When:** ผู้ใช้กดปุ่ม "ถัดไป"
- **Then:** ระบบแสดง Error แจ้งว่าอายุไม่ถึงเกณฑ์ที่กำหนด

### Scenario 4 — Save and Proceed

- **Given:** ผู้ใช้กรอกวันเกิดที่ถูกต้องและผ่านเกณฑ์อายุ
- **When:** ผู้ใช้กดปุ่ม "ถัดไป"
- **Then:** ระบบบันทึกวันเกิดและนำผู้ใช้ไปยัง Step ถัดไป (Gender)

---

## 3. Technical Rules

| Rule | Detail |
|------|--------|
| Date Format | DD/MM/YYYY (ปี ค.ศ. เท่านั้น) |
| Future Date | ห้ามเป็นวันที่ในอนาคต |
| Minimum Age | ตรวจสอบอายุขั้นต่ำตาม Config (ถ้ามี) |
| Storage | บันทึกใน Users Table: dob field |

---

## 4. Definition of Done

- [ ] แสดง Date Picker หรือ Input วันเกิดถูกต้องตาม Figma
- [ ] เลือกวันเกิดที่ถูกต้องได้สำเร็จ
- [ ] แสดง Error เมื่ออายุต่ำกว่าเกณฑ์
- [ ] บันทึกวันเกิดและนำทางไปยังหน้า Gender

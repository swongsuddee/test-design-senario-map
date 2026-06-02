# PP-97 · End-User Profile

| Field        | Value                                                                                         |
|--------------|-----------------------------------------------------------------------------------------------|
| **Key**      | PP-97                                                                                         |
| **Type**     | Sub-task                                                                                      |
| **Project**  | POPPA                                                                                         |
| **Status**   | To Do                                                                                         |
| **Assignee** | Tum-Natthapon.C                                                                               |
| **Parent**   | [PP-90](./PP-90_Register_Flow.md)                                                             |
| **Figma**    | https://www.figma.com/design/PKyOOKQydjB98nVMOOyxy4/-PP--App-UI-Design?node-id=1691-5924     |

---

## User Story

> ในฐานะ End-User ฉันต้องการตั้งค่าโปรไฟล์เบื้องต้นของตัวเอง เพื่อให้ระบบและผู้ใช้คนอื่นรู้จักฉันได้

---

## 1. Description

ขั้นตอนตั้งค่า Profile เบื้องต้นของ End-User ใน Register Flow ผู้ใช้จะกรอกชื่อ-นามสกุล, Username, อัปโหลดรูปโปรไฟล์ และข้อมูลอื่นๆ ที่จำเป็นสำหรับการใช้งาน

---

## 2. Acceptance Criteria

### Scenario 1 — Display Profile Setup

- **Given:** ผู้ใช้ผ่านขั้นตอน Character & Quiz + Interest แล้ว
- **When:** ระบบแสดงหน้าตั้งค่าโปรไฟล์
- **Then:** แสดงฟอร์มกรอกข้อมูลโปรไฟล์พร้อม Field ที่จำเป็น

### Scenario 2 — Fill Profile Information

- **Given:** ผู้ใช้อยู่ที่หน้าตั้งค่าโปรไฟล์
- **When:** ผู้ใช้กรอกชื่อ-นามสกุลและ Username ที่ถูกต้อง
- **Then:** ระบบ Validate ข้อมูลและแสดงสถานะว่าข้อมูลถูกต้อง

### Scenario 3 — Upload Profile Picture

- **Given:** ผู้ใช้อยู่ที่หน้าตั้งค่าโปรไฟล์
- **When:** ผู้ใช้กดเลือกรูปโปรไฟล์และเลือกรูปจาก Gallery หรือถ่ายรูปใหม่
- **Then:** ระบบแสดง Preview รูปที่เลือก

### Scenario 4 — Duplicate Username

- **Given:** ผู้ใช้กรอก Username ที่มีในระบบแล้ว
- **When:** ผู้ใช้ออกจาก Field หรือกด Submit
- **Then:** ระบบแสดง Error "Username นี้ถูกใช้งานแล้ว"

### Scenario 5 — Save Profile

- **Given:** ผู้ใช้กรอกข้อมูลโปรไฟล์ครบถ้วนและถูกต้อง
- **When:** ผู้ใช้กดปุ่ม "ถัดไป"
- **Then:** ระบบบันทึกโปรไฟล์และนำผู้ใช้ไปยัง Step ถัดไป (Birth Date)

---

## 3. Technical Rules

| Rule | Detail |
|------|--------|
| Display Name | สูงสุด 50 ตัวอักษร, ภาษาไทย/อังกฤษ, ไม่มีตัวเลข |
| Allowed Special Chars | ช่องว่าง (space), จุด (.), ขีดกลาง (-), อะพอสทรอฟี (') |
| Bio | สูงสุด 250 ตัวอักษร |
| Username | ต้องไม่ซ้ำในระบบ, ตรวจสอบแบบ Real-time |
| Profile Image | รองรับ Upload จาก Gallery และถ่ายรูปใหม่ |

---

## 4. Definition of Done

- [ ] แสดงฟอร์ม Profile ครบทุก Field ตาม Figma
- [ ] Validate ชื่อและ Username ถูกต้อง
- [ ] อัปโหลดรูปโปรไฟล์และแสดง Preview ได้
- [ ] แสดง Error เมื่อ Username ซ้ำ
- [ ] บันทึกโปรไฟล์และนำทางไปยัง Birth Date

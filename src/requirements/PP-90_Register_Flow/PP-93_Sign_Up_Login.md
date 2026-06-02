# PP-93 · Sign-up & Login

| Field        | Value                                                                                         |
|--------------|-----------------------------------------------------------------------------------------------|
| **Key**      | PP-93                                                                                         |
| **Type**     | Sub-task                                                                                      |
| **Project**  | POPPA                                                                                         |
| **Status**   | To Do                                                                                         |
| **Assignee** | Tum-Natthapon.C                                                                               |
| **Parent**   | [PP-90](./PP-90_Register_Flow.md)                                                             |
| **Figma**    | https://www.figma.com/design/PKyOOKQydjB98nVMOOyxy4/-PP--App-UI-Design?node-id=1691-5925     |

---

## User Story

> ในฐานะ End-User ฉันต้องการสมัครสมาชิกใหม่หรือเข้าสู่ระบบด้วยบัญชีที่มีอยู่ เพื่อเข้าใช้งานแอป Poppa ได้

---

## 1. Description

หน้า Sign-up & Login สำหรับ End-User ให้ผู้ใช้สามารถสมัครสมาชิกใหม่ด้วย Email/Phone หรือเข้าสู่ระบบด้วยบัญชีที่มีอยู่แล้ว รองรับ Social Login (Apple, Google, LINE) และการ Validate ข้อมูลที่กรอก

---

## 2. Acceptance Criteria

### Scenario 1 — Sign-up with Email

- **Given:** ผู้ใช้อยู่ที่หน้า Sign-up
- **When:** ผู้ใช้กรอก Email และ Password ที่ถูกต้องแล้วกด "สมัครสมาชิก"
- **Then:** ระบบสร้างบัญชีและนำผู้ใช้ไปยัง Step ถัดไป (Terms & PDPA)

### Scenario 2 — Login with Existing Account

- **Given:** ผู้ใช้มีบัญชีอยู่แล้วและอยู่ที่หน้า Login
- **When:** ผู้ใช้กรอก Email และ Password ที่ถูกต้องแล้วกด "เข้าสู่ระบบ"
- **Then:** ระบบยืนยันตัวตนสำเร็จและนำผู้ใช้ไปยังหน้า Home

### Scenario 3 — Field Validation

- **Given:** ผู้ใช้อยู่ที่หน้า Sign-up
- **When:** ผู้ใช้กรอกข้อมูลไม่ครบหรือรูปแบบไม่ถูกต้อง (เช่น Email ไม่มี @)
- **Then:** ระบบแสดง Error Message ใต้ Field ที่มีปัญหา และไม่ Submit ฟอร์ม

### Scenario 4 — Duplicate Email

- **Given:** ผู้ใช้พยายาม Sign-up ด้วย Email ที่มีในระบบแล้ว
- **When:** ผู้ใช้กด "สมัครสมาชิก"
- **Then:** ระบบแสดงข้อความว่า Email นี้ถูกใช้งานแล้ว

---

## 3. Technical Rules

| Rule | Detail |
|------|--------|
| Auth Methods | Phone Number, Apple ID, LINE, Google |
| Phone Format | เก็บในรูป International Format (+66812345678) |
| OTP Rate Limit | ไม่เกิน 3 ครั้งใน 5 นาที |
| Identity Linking | หาก Email ซ้ำระหว่าง Social Providers แสดง Identity Linking Dialog |

---

## 4. Definition of Done

- [ ] Sign-up ด้วย Email & Password ทำงานได้สำเร็จ
- [ ] Login ด้วย Email & Password ทำงานได้สำเร็จ
- [ ] Validation แสดง Error ถูกต้องทุก Field
- [ ] Duplicate Email แสดง Error message ถูกต้อง
- [ ] นำทางไปยัง Step ถัดไปหลัง Sign-up สำเร็จ

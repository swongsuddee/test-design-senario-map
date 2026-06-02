# PP-95 · Phone OTP

| Field        | Value                                                                                         |
|--------------|-----------------------------------------------------------------------------------------------|
| **Key**      | PP-95                                                                                         |
| **Type**     | Sub-task                                                                                      |
| **Project**  | POPPA                                                                                         |
| **Status**   | To Do                                                                                         |
| **Assignee** | Tum-Natthapon.C                                                                               |
| **Parent**   | [PP-90](./PP-90_Register_Flow.md)                                                             |
| **Figma**    | https://www.figma.com/design/PKyOOKQydjB98nVMOOyxy4/-PP--App-UI-Design?node-id=1691-5924     |

---

## User Story

> ในฐานะ End-User ฉันต้องการยืนยันเบอร์โทรศัพท์ด้วย OTP เพื่อให้ระบบมั่นใจว่าฉันเป็นเจ้าของเบอร์นั้นจริง

---

## 1. Description

ขั้นตอนยืนยันตัวตนด้วย One-Time Password (OTP) ที่ส่งไปยังหมายเลขโทรศัพท์ของผู้ใช้ รองรับการกรอก OTP, การขอส่ง OTP ใหม่ และการนับเวลา Cooldown ก่อนขอ Resend ได้อีกครั้ง

---

## 2. Acceptance Criteria

### Scenario 1 — Enter Phone Number

- **Given:** ผู้ใช้อยู่ที่หน้า Phone OTP
- **When:** ผู้ใช้กรอกเบอร์โทรศัพท์ที่ถูกต้องและกด "ส่ง OTP"
- **Then:** ระบบส่ง OTP ไปยังเบอร์ที่กรอก และแสดงหน้ากรอก OTP

### Scenario 2 — Verify OTP

- **Given:** ผู้ใช้ได้รับ OTP และอยู่ที่หน้ากรอก OTP
- **When:** ผู้ใช้กรอก OTP ถูกต้องและกด "ยืนยัน"
- **Then:** ระบบยืนยันสำเร็จและนำผู้ใช้ไปยัง Step ถัดไป (Character & Quiz)

### Scenario 3 — Invalid OTP

- **Given:** ผู้ใช้กรอก OTP ผิด
- **When:** ผู้ใช้กด "ยืนยัน"
- **Then:** ระบบแสดง Error "OTP ไม่ถูกต้อง" และให้ผู้ใช้กรอกใหม่

### Scenario 4 — Resend OTP

- **Given:** ผู้ใช้ยังไม่ได้รับ OTP หรือ OTP หมดอายุ
- **When:** ผู้ใช้กดปุ่ม "ส่ง OTP ใหม่" หลังหมด Cooldown
- **Then:** ระบบส่ง OTP ใหม่และรีเซ็ต Cooldown Timer

### Scenario 5 — Cooldown Timer

- **Given:** ผู้ใช้กดส่ง OTP ไปแล้ว
- **When:** ยังอยู่ในช่วง Cooldown
- **Then:** ปุ่ม Resend ถูก Disable และแสดง Countdown Timer

---

## 3. Technical Rules

| Rule | Detail |
|------|--------|
| OTP Length | 6 หลัก |
| Cooldown Duration | 60 วินาที (หรือตามที่ Config ไว้) |
| OTP Expiry | 15 นาที หลังจากส่ง |
| Rate Limit | ไม่เกิน 3-5 ครั้งต่ออีเมลหรือเบอร์ภายใน 1 ชั่วโมง |
| Phone Format | รองรับเบอร์ไทย 10 หลัก, ลบ Dash (-) หรือช่องว่างอัตโนมัติ |

---

## 4. Definition of Done

- [ ] ส่ง OTP ไปยังเบอร์โทรศัพท์ได้สำเร็จ
- [ ] กรอก OTP ถูกต้องและยืนยันสำเร็จ
- [ ] แสดง Error เมื่อ OTP ผิด
- [ ] Resend OTP ทำงานได้หลังหมด Cooldown
- [ ] Cooldown Timer แสดงและนับถอยหลังถูกต้อง

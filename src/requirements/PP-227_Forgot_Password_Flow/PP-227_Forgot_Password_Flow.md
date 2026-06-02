# PP-227 · [Organizer] Forgot Password Flow (ลืมรหัสผ่าน)

| Field        | Value                     |
|--------------|---------------------------|
| **Key**      | PP-227                    |
| **Type**     | Story                     |
| **Project**  | POPPA                     |
| **Status**   | Ready to Deploy STG               |
| **Assignee** | pathai laooatthaphong     |

---

## User Story

> **ในฐานะ:** Organizer (ผู้สมัครใหม่หรือที่มีบัญชีอยู่แล้ว)
> **ฉันต้องการ:** กู้คืนรหัสผ่านเมื่อลืมรหัสผ่านเดิม
> **เพื่อ:** ยืนยันตัวตนผ่านอีเมลและตั้งรหัสผ่านใหม่ได้อย่างปลอดภัย กลับเข้าใช้งานระบบ Backoffice ได้อีกครั้ง

---

## 1. Technical Acceptance Criteria

### Scenario 1 — Request Reset Link (หน้าขอรับลิงก์กู้คืน)

- **AC 1.1:** ระบบต้องมีฟิลด์ Email Input ที่รองรับการตรวจสอบรูปแบบอีเมล (Format Validation) เช่น ต้องมี `@` และ `.`
- **AC 1.2:** เมื่อกดปุ่ม "ส่งลิงก์กู้คืนรหัสผ่าน" ระบบต้องตรวจสอบว่ามี Email นี้ในฐานะ Organizer หรือไม่
- **AC 1.3:** **[Security]** ไม่ว่าจะมีอีเมลในระบบหรือไม่ ระบบต้องแสดงข้อความตอบกลับแบบเดียวกัน: _"หากอีเมลนี้มีอยู่ในระบบ เราได้ส่งคำแนะนำในการตั้งรหัสผ่านใหม่ไปให้ท่านแล้ว"_ (ป้องกัน Enumeration Attack)
- **AC 1.4:** ปุ่มส่งอีเมลต้องมีระบบ **Rate Limit** — กดได้ 1 ครั้งต่อ 60 วินาที (ป้องกัน SMTP spam)
- **AC 1.5:** ระบบส่ง Email พร้อมลิงก์ที่มี **Unique Token** สำหรับการรีเซ็ต

### Scenario 2 — Reset Token Security (ความปลอดภัยของลิงก์)

- **AC 2.1:** ลิงก์มีอายุจำกัด **15-30 นาที** — หมดอายุต้องใช้ไม่ได้ + แสดงหน้า Error
- **AC 2.2:** ลิงก์เป็นแบบ **One-time Use** — ใช้แล้วต้องถูก invalidate ทันที
- **AC 2.3:** ถ้า User ขอลิงก์ใหม่ → ลิงก์เก่าที่ยังไม่หมดอายุต้องถูก invalidate

### Scenario 3 — Reset Password Logic (หน้าตั้งรหัสผ่านใหม่)

- **AC 3.1:** แสดงช่อง New Password และ Confirm New Password
- **AC 3.2:** ตรวจสอบ **Password Strength**: ขั้นต่ำ 8 ตัวอักษร, มีพิมพ์ใหญ่, พิมพ์เล็ก และตัวเลข — แสดง Error ทันทีหากไม่ครบ
- **AC 3.3:** ฟิลด์ทั้งสองต้องมี "Show/Hide Password" (ไอคอนรูปตา)
- **AC 3.4:** ตรวจสอบว่า Password ทั้งสองช่องตรงกัน (Match Validation) ก่อนอนุญาตให้กดยืนยัน
- **AC 3.5:** **[Security]** รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านเดิม

### Scenario 4 — Post-Success Action (หลังทำรายการสำเร็จ)

- **AC 4.1:** เปลี่ยนรหัสผ่านสำเร็จ → ทำลาย Session เดิมทั้งหมด (Force Logout ทุกอุปกรณ์)
- **AC 4.2:** Redirect ไปยังหน้า **Login Page** พร้อม Success Toast/Message
- **AC 4.3:** ส่ง **Notification Email** แจ้งว่า "รหัสผ่านถูกเปลี่ยนแล้ว" (หากไม่ได้ทำเองให้ติดต่อ Admin)

---

## 2. Edge Cases & QA Notes

| Case | Expected |
|------|----------|
| กรอกรูปแบบอีเมลผิด (เช่น `abc@com`) | ไม่ผ่าน Format Validation |
| ใช้ลิงก์ที่หมดอายุแล้ว | แสดง Error page |
| ใช้ลิงก์เดิมซ้ำ (One-time use) | ลิงก์ไม่ทำงาน |
| ตั้งรหัสผ่านไม่ตาม Policy | แสดง Error ทันที |
| รหัสผ่านสองช่องไม่ตรงกัน | Disable ปุ่มยืนยัน |
| กดขอ Reset Link รัวๆ (เกิน Rate Limit) | ปุ่ม Disabled + แจ้งเตือน |

---

## 3. Definition of Done

- [ ] Request Reset Link ส่ง Email พร้อม Unique Token
- [ ] Token Security: One-time use + Expiry ทำงานถูกต้อง
- [ ] Password Strength Validation ครบตามเงื่อนไข
- [ ] Force Logout ทุก Session หลังเปลี่ยนรหัสผ่านสำเร็จ
- [ ] Rate Limit ป้องกัน SMTP spam ทำงานถูกต้อง

---

## 4. Subtasks

| Key | Summary | Status |
|-----|---------|--------|
| [PP-245](./PP-245_FE_Implement_Forgot_Password_Flow.md) | [FE][BO][Organizer] implement flow forgot password | Ready To Test STG |
| [PP-278](./PP-278_BE_Email_Resend_Password.md) | [BE][Organizer] email resend password | Ready to Deploy STG |
| [PP-279](./PP-279_BE_Update_Forget_Password.md) | [BE][Organizer] update forget password | Ready to Deploy STG |

> Flow diagram → [PP-227.diagram.md](../../test-design/PP-227.diagram.md)
> Test design → [PP-227.design.md](../../test-design/PP-227.design.md)

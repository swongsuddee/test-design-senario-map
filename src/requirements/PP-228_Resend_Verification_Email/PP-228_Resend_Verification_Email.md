# PP-228 · [Imp-UI][Organizer] Register Flow - Resend Verification Email

| Field        | Value                     |
|--------------|---------------------------|
| **Key**      | PP-228                    |
| **Type**     | Story                     |
| **Project**  | POPPA                     |
| **Status**   | Ready to Deploy STG               |
| **Assignee** | pathai laooatthaphong     |

---

## User Story

> **ในฐานะ:** Organizer (ผู้สมัครใหม่)
> **ฉันต้องการ:** ขอให้ระบบส่งรหัสผ่านหรือลิงก์ยืนยันตัวตนให้อีกครั้งทางอีเมล เมื่อไม่ได้รับในรอบแรก
> **เพื่อ:** ยืนยันตัวตนและเข้าสู่ระบบ Backoffice ได้สำเร็จ

---

## 1. Technical Acceptance Criteria

### Scenario 1 — Countdown Timer & Button Control

- **AC 1.1:** เมื่อ User เข้าสู่หน้ายืนยันตัวตน ระบบเริ่มนับถอยหลัง **60 วินาที** ทันที
- **AC 1.2:** ระหว่างนับถอยหลัง ปุ่ม "ส่งรหัสอีกครั้ง" (Resend) ต้องอยู่ในสถานะ **Disabled**
- **AC 1.3:** เมื่อตัวนับเป็น 0 → ปุ่มเปลี่ยนเป็น **Enabled** และตัวเลขวินาทีหายไป
- **AC 1.4:** เมื่อกด Resend → Reset ตัวนับกลับ 60 วินาที และปุ่มกลับเป็น **Disabled** ทันที

### Scenario 2 — API & Email Trigger

- **AC 2.1:** เมื่อกด Resend ระบบ Generate รหัสผ่าน/ลิงก์ใหม่ และส่งไปยังอีเมลเดิม
- **AC 2.2:** รหัส/ลิงก์เดิม (Old OTP/Link) ต้องถูก **invalidate** ทันที (ใช้ได้เฉพาะอันล่าสุด)
- **AC 2.3:** ระบบต้องมี **Loading State** ระหว่างรอ API Response ป้องกันกด Resend ซ้ำ

### Scenario 3 — Rate Limiting & Security

- **AC 3.1:** **[Security]** จำกัดจำนวน Resend ไม่เกิน **3-5 ครั้งต่ออีเมลภายใน 1 ชั่วโมง**
- **AC 3.2:** เกินจำนวน → แสดง Error: _"คุณขอรหัสผ่านบ่อยเกินไป กรุณาลองใหม่ในอีก 30 นาที"_ + Disable ปุ่มถาวรในช่วงนั้น
- **AC 3.3:** ลิงก์/รหัสมี **Expiration Time** 15 นาที — กรอกรหัสหมดอายุต้องแสดงข้อความชัดเจน

### Scenario 4 — Feedback & Notification

- **AC 4.1:** ส่งอีเมลสำเร็จ → แสดง **Success Toast**: _"ส่งรหัสยืนยันใหม่สำเร็จแล้ว กรุณาเช็คที่ Inbox"_
- **AC 4.2:** เกิด Error (Mail Server ล่ม) → แสดงข้อความ: _"เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"_ โดยไม่ Reset ตัวนับ

---

## 2. Edge Cases & QA Notes

| Case | Expected |
|------|----------|
| กดปุ่มขณะ Countdown ยังไม่หมด | ปุ่มกดไม่ได้ (Disabled) |
| กรอกรหัสเดิม (หลัง Resend) | รหัสไม่ถูกต้อง / หมดอายุ |
| กรอกรหัสหลัง 15 นาที | Expired Token |
| ปิด Internet แล้วกด Resend | Error state ไม่นับถอยหลังฟรี |
| เปิด 2 Tabs แล้วกด Resend จาก Tab 1, กรอกใน Tab 2 | Token ล่าสุดต้องทำงาน |
| กด Resend รัวๆ เกิน Limit | Block การส่งเมล + Disable ปุ่ม |

---

## 3. Definition of Done

- [ ] Countdown Timer 60 วินาทีทำงานถูกต้อง
- [ ] Resend invalidates old token + ส่งอีเมลใหม่
- [ ] Rate Limit 3-5 ครั้ง/ชั่วโมงทำงาน
- [ ] Token Expiry 15 นาทีทำงานถูกต้อง
- [ ] Success/Error feedback แสดงถูกต้อง

---

## 4. Subtasks

| Key | Summary | Status |
|-----|---------|--------|
| [PP-280](./PP-280_FE_Improve_UI_Countdown_Resend.md) | [FE][BO][Organize] improve ui countdown resend email verify page | Ready To Test STG |
| [PP-281](./PP-281_BE_Improve_Count_Time_Resend.md) | [BE][Organizer] improve count time resend email verify | Ready to Deploy STG |

> Flow diagram → [PP-228.diagram.md](../../test-design/PP-228.diagram.md)
> Test design → [PP-228.design.md](../../test-design/PP-228.design.md)

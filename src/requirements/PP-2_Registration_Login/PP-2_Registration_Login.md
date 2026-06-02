# PP-2 · [M-App][End-User] Registration & Login

| Field       | Value                                      |
|-------------|--------------------------------------------|
| **Key**     | PP-2                                       |
| **Type**    | Story                                      |
| **Project** | POPPA                                      |
| **Status**  | Ready To Test STG                          |
| **Assignee**| Jojoe - Sattawat.w                         |
| **Figma**   | [App UI Design – node 1691-5925](https://www.figma.com/design/PKyOOKQydjB98nVMOOyxy4/-PP--App-UI-Design?node-id=1691-5925) |

---

## User Story

> **ในฐานะ:** End-User ผู้ใช้งาน Mobile App
> **ฉันต้องการ:** ต้องการสมัครสมาชิกและเข้าสู่ระบบผ่านช่องทางที่สะดวก 4 ช่องทาง (Phone No, Apple ID, LINE, Google)
> **เพื่อ:** เริ่มต้นใช้งานแอปพลิเคชันได้อย่างรวดเร็ว โดยระบบต้องรองรับการเชื่อมโยงบัญชีและรักษาความปลอดภัยของข้อมูล

---

## 1. Description

พัฒนาระบบ Authentication สำหรับ End-user บน Mobile App (Flutter) รองรับ 4 ช่องทางหลัก พร้อมระบบ:
- **OTP Verification** — ยืนยันตัวตนผ่านเบอร์โทรศัพท์
- **Identity Linking** — เชื่อมโยงบัญชีกรณี Email ซ้ำข้ามช่องทาง
- **PDPA Consent** — ยอมรับนโยบายความเป็นส่วนตัว
- **Onboarding** — เก็บข้อมูล Attributes (Gender, DOB, Interests)

---

## 2. Technical Acceptance Criteria

### Scenario 1 — Phone Number & OTP Validation
- **Given:** User เลือกเข้าสู่ระบบด้วยเบอร์โทรศัพท์
- **When:** User กรอกเบอร์โทรศัพท์ไม่ครบ 10 หลัก หรือ Format ไม่ถูกต้อง
- **Then:** แสดง Error Message ทันที และ Disabled ปุ่ม "รับรหัส OTP" จนกว่าจะกรอกครบถ้วน
- **And:** เมื่อกดรับรหัส ระบบส่ง OTP 6 หลัก พร้อม Countdown 60 วินาที สำหรับ Resend

### Scenario 2 — Identity Linking (Conflict Handling)
- **Given:** User มีบัญชีใน system ด้วย `test@gmail.com` ผ่าน Google Login
- **When:** User พยายาม Login ด้วย LINE Login ซึ่งใช้ `test@gmail.com` ชุดเดียวกัน
- **Then:** แสดง Identity Linking Dialog ให้ User ยืนยันการ Link Account เพื่อป้องกัน Duplicate User

### Scenario 3 — New User Onboarding & Attributes Collection
- **Given:** User ใหม่ทำการ Login/Verify OTP สำเร็จเป็นครั้งแรก
- **When:** ระบบตรวจสอบพบว่ายังไม่มีข้อมูล Profile ใน Database
- **Then:** บังคับผ่าน Step-by-Step Flow:
  1. **PDPA Consent** — กดยอมรับเงื่อนไขและนโยบาย
  2. **Basic Identity** — ชื่อ (Display Name), เพศ (Gender), วันเกิด (DOB ค.ศ.)
  3. **Phone Verification** — (กรณี Social Login ครั้งแรก) กรอกเบอร์โทร + Verify OTP
  4. **Interests Selection** — เลือกหมวดหมู่ที่สนใจ 1–3 หมวดหมู่
- **Result:** บันทึกลง `Users` + `User_Interests` tables

### Scenario 4 — Session Persistence (Auto Login)
- **Given:** User เข้าสู่ระบบสำเร็จและปิดแอปไป
- **When:** User เปิดแอปขึ้นมาใหม่
- **Then:** ตรวจสอบ JWT/Refresh Token — ถ้ายังไม่หมดอายุ ข้ามหน้า Login → ไปหน้า Home ทันที

---

## 3. Backend & Data Specifications

### Auth Provider Integration

| Provider | Method |
|----------|--------|
| **LINE** | Firebase Auth / Auth Service (Token) |
| **Google** | Firebase Auth / Auth Service (Token) |
| **Apple** | Firebase Auth / Auth Service (Token) |
| **Phone** | SMS OTP → Verify → Create Session | ### Data Validation Logic | Field | Rule |
|-------|------|
| **DOB** | Format `DD/MM/YYYY`, ปีค.ศ., ห้ามเป็นอนาคต, ตรวจอายุขั้นต่ำ |
| **Phone** | ลบ dash/ช่องว่างอัตโนมัติ, เก็บรูปแบบ `+66XXXXXXXXX` | ### Database Schema
**Users Table**
```
auth_provider_id  — Google / Apple / LINE / Phone
email
display_name
dob
gender
phone_number
```
**User_Interests Table**
```
user_id     → FK to Users
category_id → Sport, Lifestyle, etc.
```

---

## 4. Edge Cases

| Case | Handling |
|------|----------|
| **Apple Hide My Email** | รองรับ Private Email ที่ Apple Generate ให้ |
| **OTP Rate Limit** | จำกัดไม่เกิน 3 ครั้งใน 5 นาที (Anti-spam) |
| **Slow Network** | แสดง Shimmer/Spinner ระหว่างรอ Auth / DB write |

---

## 5. Definition of Done

- [ ] API Auth & Registration รองรับ 4 ช่องทางทำงานได้ถูกต้อง
- [ ] ระบบ Identity Linking ตรวจสอบ Email/Phone ซ้ำได้แม่นยำ
- [ ] ข้อมูล Profile และ Interests ถูกบันทึกลง Database ครบถ้วนตาม Schema
- [ ] ผ่านการทดสอบบน iOS (Apple Login ตรงตาม Apple Guideline)
- [ ] จัดการ Error Handling (OTP ผิด, Token หมดอายุ) ได้ครอบคลุม

---

## 6. Subtasks

| Key | Summary | Status | Assignee |
|-----|---------|--------|----------|
| [PP-8](./PP-8_MB_Mock_UI_Registration_Login.md) | [MB][End-User] Mock UI for Registration & Login | Ready to Deploy Prod | Tum-Natthapon.C |
| [PP-10](./PP-10_QA_TestCase_Registration_Login.md) | [QA][TestCase][End-User] Registration & Login | Closed | Jojoe - Sattawat.w |
| [PP-14](./PP-14_MB_Integrate_API_Login_Without_Social.md) | [M-App][End-User] Integrate API - Login without social | Ready to Deploy Prod | Tum-Natthapon.C |
| [PP-15](./PP-15_MB_Integrate_API_Login_With_Social.md) | [M-App][End-User] Integrate API - Login with social | Ready to Deploy Prod | Tum-Natthapon.C |
| [PP-16](./PP-16_MB_Connect_Sign_In_Google.md) | [M-App][End-User] Connect sign in with Google | Ready to Deploy Prod | Tum-Natthapon.C |
| [PP-17](./PP-17_MB_Connect_Sign_In_Facebook.md) | [M-App][End-User] Connect sign in with Facebook | Closed | Tum-Natthapon.C |
| [PP-18](./PP-18_MB_Connect_Sign_In_Apple.md) | [M-App][End-User] Connect sign in with Apple | Ready to Deploy Prod | Tum-Natthapon.C |
| [PP-19](./PP-19_MB_Connect_Sign_In_LINE.md) | [M-App][End-User] Connect sign in with LINE | Ready to Deploy Prod | Tum-Natthapon.C |
| [PP-21](./PP-21_BE_Set_CRUD_Provider.md) | [BE] Set CRUD provider | Closed | Famp-Visarut |
| [PP-22](./PP-22_BE_Create_Auth_Service.md) | [BE] Create Auth service | Closed | Famp-Visarut |
| [PP-23](./PP-23_BE_Auth_Method_Email.md) | [BE][End-User] Auth Method: Email | Closed | Pond-Siritep |
| [PP-24](./PP-24_BE_Auth_Method_LINE.md) | [BE][End-User] Auth Method: LINE | Closed | Famp-Visarut |
| [PP-25](./PP-25_BE_Auth_Method_Google.md) | [BE][End-User] Auth Method: Google account | Closed | pathai |
| [PP-26](./PP-26_BE_Auth_Method_Apple.md) | [BE][End-User] Auth Method: Apple Account | Ready to Deploy Prod | Ohm-Phakorn.s |
| [PP-27](./PP-27_BE_Auth_Method_Facebook.md) | [BE][End-User] Auth Method: Facebook | Dev Block | Pond-Siritep |
| [PP-28](./PP-28_BE_Email_Service.md) | [BE] Email service | Dev Block | — |
| [PP-29](./PP-29_BE_Auth_Method_Phone_OTP.md) | [BE][End-User] Auth Method: Phone number & OTP | Closed | Pond-Siritep |
| [PP-30](./PP-30_BE_OTP_ThaiBulkSMS.md) | [BE] OTP sending by ThaiBulkSMS | Closed | Famp-Visarut |
| [PP-31](./PP-31_BE_CRU_User_Interest_Category.md) | [BE][End-User] CRU user's interesting category (onboarding) | In Progress | — |
| [PP-57](./PP-57_BE_Register_Login_OAuth2.md) | [BE][UserService] Register/Login OAuth2 (Google, Apple, LINE) | Ready to Deploy Prod | Ohm-Phakorn.s |
| [PP-58](./PP-58_BE_Register_Login_Phone.md) | [BE][UserService] Register/Login Phone number | Ready to Deploy Prod | Ohm-Phakorn.s |

> Flow diagram → [PP-2.diagram.md](../../test-design/PP-2.diagram.md)
> Test design → [PP-2.design.md](../../test-design/PP-2.design.md)

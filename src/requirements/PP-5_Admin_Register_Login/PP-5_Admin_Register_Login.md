# PP-5 · [BO][Admin] Register & Login

| Field        | Value                                                                                                         |
|--------------|---------------------------------------------------------------------------------------------------------------|
| **Key**      | PP-5                                                                                                          |
| **Type**     | Story                                                                                                         |
| **Project**  | POPPA                                                                                                         |
| **Status**   | Ready To Test STG                                                                                             |
| **Assignee** | Jojoe - Sattawat.w                                                                                            |
| **Figma**    | [POPPA Board – node 646-1145](https://www.figma.com/board/vxenYTGUGvqK8LjRJ4JBOK/POPPA?node-id=646-1145)    |

---

## User Story

> **ในฐานะ:** ผู้ดูแลระบบ (Admin Platform)
> **ฉันต้องการ:** หน้า Login ที่มีความปลอดภัยและใช้งานง่าย
> **เพื่อ:** เข้าไปบริหารจัดการข้อมูลในระบบ Poppa และป้องกันไม่ให้บุคคลภายนอกเข้าถึงข้อมูลหลังบ้านได้

---

## 1. Description

พัฒนาระบบ Login สำหรับ **Admin** ผ่าน Web Application (Desktop เท่านั้น) โดยใช้ **Casdoor** เป็น Identity Provider (OAuth2/SSO) — ไม่มี Self-registration; Admin Account ถูกสร้างโดย Super Admin ผ่าน Casdoor Console หรือ Admin Invitation Flow เท่านั้น

---

## 2. Main Flow (Casdoor OAuth2 — Story-Level)

1. Admin เปิดหน้า BO → ระบบตรวจว่ายังไม่ Login → Redirect ไป Casdoor Login Page
2. Admin กรอก Email + Password (หรือ SSO) บน Casdoor
3. Casdoor Authenticate สำเร็จ → Redirect กลับมาที่ BO พร้อม Authorization Code
4. BO Frontend ส่ง Code ไป Backend → Backend แลกเป็น Access Token + ID Token จาก Casdoor
5. Backend ตรวจ Role จาก Token → ถ้าเป็น Admin → สร้าง Session → ส่ง Session Token กลับ Frontend
6. Frontend เก็บ Session Token → เข้าหน้า Dashboard

> **หมายเหตุ:** Admin Account ถูกสร้างโดย Super Admin ผ่าน Casdoor Console หรือ Admin Invitation Flow เท่านั้น — ไม่มี Self-registration *(ขัดแย้งกับ PP-55 — ดู C1 ใน clarifications)*

---

## 3. Technical Acceptance Criteria

### Scenario 1 — Login via Casdoor
- **Given:** Admin เปิดหน้า BO บน Web Browser
- **When:** Admin ยังไม่ได้ Login
- **Then:** ระบบแสดงเพียงปุ่ม "เข้าสู่ระบบด้วย Poppa Account" และ Redirect ไป Casdoor — ไม่มี Login Form บน BO โดยตรง

### Scenario 2 — Role Validation
- **Given:** Casdoor Authentication สำเร็จ
- **When:** Backend ตรวจสอบ Token
- **Then:** อนุญาตเฉพาะ Role = `Admin` เท่านั้นให้เข้า Dashboard; Agency และ End-user ต้องถูกปฏิเสธพร้อมข้อความแจ้งเตือน

### Scenario 3 — Session Management
- **Given:** Admin เข้าสู่ระบบสำเร็จ
- **When:** Admin เลือก "Remember Me"
- **Then:** Session คงอยู่แม้ปิด Browser; หากไม่เลือก Session สิ้นสุดเมื่อปิด Browser; Session ที่ไม่มีการใช้งานเกินเวลาที่กำหนดจะถูกตัดอัตโนมัติ  
> **[NOT SPECIFIED]** Session timeout duration (idle and absolute) — ไม่ระบุในการ์ด

### Scenario 4 — Error Handling
- **Given:** เกิด Error ระหว่าง Login
- **When:** ระบบตรวจพบ Error
- **Then:** แสดงข้อความแจ้งเตือนที่ชัดเจนตาม Error Table ด้านล่าง

### Scenario 5 — Forgot Password
- **Given:** Admin ลืมรหัสผ่าน
- **When:** Admin กด Forgot Password บน Casdoor
- **Then:** Admin ได้รับลิงก์รีเซ็ตรหัสผ่านทาง Email

---

## 4. Error Cases

| Error Case | User-Facing Message |
|------------|---------------------|
| ไม่มีสิทธิ์เข้าใช้งาน (Unauthorized Access) | คุณไม่มีสิทธิ์เข้าใช้งานในระบบนี้ กรุณาติดต่อผู้ดูแลระบบ |
| เซิร์ฟเวอร์มีปัญหา | ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ในขณะนี้ กรุณาลองใหม่อีกครั้งในภายหลัง |

---

## 5. UX/UI Notes

- **Login Page:** ไม่มี Login Form บน BO — มีแค่ปุ่ม "เข้าสู่ระบบด้วย Poppa Account" ที่ Redirect ไป Casdoor
- **Loading State:** แสดง Spinner + "กำลังตรวจสอบสิทธิ์..." ระหว่าง OAuth Callback Processing
- **Responsive:** Desktop (1280px+) เป็นหลัก — ไม่ต้องรองรับ Mobile สำหรับ BO

---

## 6. Definition of Done

- [ ] Admin สามารถ Login ผ่าน Casdoor เข้าสู่ BO Dashboard ได้สมบูรณ์บน Chrome/Safari (Desktop)
- [ ] Role Validation ทำงานถูกต้อง (กั้น Agency / End-user ไม่ให้เข้า Dashboard)
- [ ] Session Management (Remember Me + Inactivity Timeout) ทำงานถูกต้อง
- [ ] Error Handling ครอบคลุมทุก Case ตาม Error Table
- [ ] Forgot Password Flow ผ่าน Casdoor ส่ง Email ได้จริง

---

## 7. Subtasks

| Key | Summary | Status | Assignee |
|-----|---------|--------|----------|
| [PP-53](./PP-53_FE_Portal_Init.md) | [FE][Admin] Portal init project | Ready to Deploy Prod | — |
| [PP-54](./PP-54_FE_Portal_API.md) | [FE][Admin] Portal API integration | Ready to Deploy Prod | — |
| [PP-55](./PP-55_BE_Admin_Register_Email.md) | [BE] Admin Register Email | Closed | — |
| [PP-60](./PP-60_BE_Admin_Login_Email.md) | [BE] Admin Login Email | Ready to Deploy Prod | — |
| [PP-101](./PP-101_BE_Admin_Create_Account.md) | [BE] Admin Create Admin Account | Ready To Test STG | — |
| [PP-102](./PP-102_BE_Admin_Change_Password.md) | [BE] Admin Change Password | Closed | — |

---

> Flow diagram → [PP-5.diagram.md](../../test-design/PP-5.diagram.md)
> Test design → [PP-5.design.md](../../test-design/PP-5.design.md)
> Clarifications → [PP-5_clarifications.md](../../../.agents/review-notes/req-clarify/PP-5_clarifications.md)

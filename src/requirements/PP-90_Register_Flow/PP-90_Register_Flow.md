# PP-90 · [Imp][M-App][End-User] Register Flow

| Field        | Value                                                                                         |
|--------------|-----------------------------------------------------------------------------------------------|
| **Key**      | PP-90                                                                                         |
| **Type**     | Story                                                                                         |
| **Project**  | POPPA                                                                                         |
| **Status**   | To Do                                                                                         |
| **Assignee** | Tum-Natthapon.C                                                                               |
| **Figma**    | https://www.figma.com/design/PKyOOKQydjB98nVMOOyxy4/-PP--App-UI-Design?node-id=1691-5924     |

---

## User Story

> **ในฐานะ:** End-User ที่ต้องการสมัครใช้งานแอปพลิเคชัน Poppa
> **ฉันต้องการ:** ผ่านขั้นตอนการลงทะเบียนตั้งแต่ Splash Screen จนถึงการตั้งค่าโปรไฟล์
> **เพื่อ:** เข้าใช้งานฟีเจอร์ต่างๆ ของแอปได้อย่างสมบูรณ์

---

## 1. Description

การ์ดนี้จะเพิ่ม Step ที่ขาดหายไปใน Register Flow ของ Mobile App ได้แก่ Splash Screen, Introduce pages, Terms & Conditions / PDPA, Character Quiz และอัพเดทเรื่อง CI โดย Flow ครอบคลุมตั้งแต่ผู้ใช้เปิดแอปครั้งแรกจนเสร็จสิ้นการสมัครสมาชิก

---

## 2. Acceptance Criteria

### Scenario 1 — Full Register Flow Completion

- **Given:** ผู้ใช้เปิดแอปเป็นครั้งแรกและยังไม่มีบัญชี
- **When:** ผู้ใช้ดำเนินการผ่านทุก Step ใน Register Flow
- **Then:** ระบบนำผู้ใช้ผ่าน Splash Screen → Introduce Pages → Sign-up → Terms & PDPA → Phone OTP → Character Quiz → Profile Setup → Birth Date → Gender จนเสร็จสิ้น

### Scenario 2 — Step Navigation

- **Given:** ผู้ใช้อยู่ในขั้นตอนใดขั้นตอนหนึ่งของ Register Flow
- **When:** ผู้ใช้กดปุ่ม Back
- **Then:** ระบบนำผู้ใช้กลับไปยัง Step ก่อนหน้าโดยไม่สูญเสียข้อมูลที่กรอกไปแล้ว

### Scenario 3 — Error Handling

- **Given:** ผู้ใช้อยู่ใน Register Flow และเครือข่ายขาดหาย
- **When:** ระบบไม่สามารถเชื่อมต่อ Server ได้
- **Then:** ระบบแสดงหน้า Error Page "ไม่สามารถเชื่อมต่อได้" พร้อมปุ่ม Retry

---

## 3. Register Flow Steps

| Step | Sub-task | Description |
|------|----------|-------------|
| 1 | PP-91 | Splash Screen |
| 2 | PP-92 | Introduce 3 pages |
| 3 | PP-93 | Sign-up & Login |
| 4 | PP-94 | Terms & Cons / PDPA |
| 5 | PP-95 | Phone OTP |
| 6 | PP-96 | Character & Quiz + Interest |
| 7 | PP-97 | End-user Profile |
| 8 | PP-98 | Birth date |
| 9 | PP-99 | Gender |
| 10 | PP-100 | Error Page - Can't connect |

---

## 4. Definition of Done

- [ ] Splash Screen แสดงผลถูกต้องเมื่อเปิดแอป
- [ ] Introduce Pages แสดงครบ 3 หน้า และ Skip ได้
- [ ] Sign-up & Login ทำงานได้ถูกต้อง
- [ ] Terms & PDPA บังคับยอมรับก่อนดำเนินการต่อ
- [ ] Phone OTP ส่งและยืนยันได้สำเร็จ
- [ ] Character Quiz & Interest บันทึกค่าได้ถูกต้อง
- [ ] End-user Profile, Birth Date, Gender บันทึกได้ครบถ้วน
- [ ] Error Page แสดงเมื่อไม่สามารถเชื่อมต่อได้
- [ ] CI pipeline ผ่านทุก Step

---

## 5. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-91](./PP-91_Splash_Screen.md) | Splash Screen | To Do |
| [PP-92](./PP-92_Introduce_3_Pages.md) | Introduce 3 pages | To Do |
| [PP-93](./PP-93_Sign_Up_Login.md) | Sign-up & Login | To Do |
| [PP-94](./PP-94_Terms_Cons_PDPA.md) | Terms & Cons / PDPA | To Do |
| [PP-95](./PP-95_Phone_OTP.md) | Phone OTP | To Do |
| [PP-96](./PP-96_Character_Quiz_Interest.md) | Character & Quiz + Interest | To Do |
| [PP-97](./PP-97_End_User_Profile.md) | end-user Profile | To Do |
| [PP-98](./PP-98_Birth_Date.md) | Birth date | To Do |
| [PP-99](./PP-99_Gender.md) | Gender | To Do |
| [PP-100](./PP-100_Error_Page.md) | Error Page - Can't connect | To Do |

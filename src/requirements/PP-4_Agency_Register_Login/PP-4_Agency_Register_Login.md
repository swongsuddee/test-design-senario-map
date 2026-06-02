# PP-4 · [BO][Agency] Register & Login

| Field        | Value                                                                                                                                                              |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Key**      | PP-4                                                                                                                                                               |
| **Type**     | Story                                                                                                                                                              |
| **Project**  | POPPA                                                                                                                                                              |
| **Status**   | Ready To Test STG                                                                                                                                                  |
| **Assignee** | Jojoe - Sattawat.w                                                                                                                                                 |
| **Figma**    | [Organizer – Register Login node 104-17](https://www.figma.com/design/Wb6LSfgyIj4mfKMHy8MLHK/Organizer---Register-Login?node-id=104-17&t=FISjyd7YriKLHjgz-1) |

---

## User Story

> **ในฐานะ:** Agency User (นิติบุคคล หรือ บุคคลธรรมดา)
> **ฉันต้องการ:** ลงทะเบียนและส่งเอกสารยืนยันตัวตนผ่าน Web Application
> **เพื่อ:** ขอรับสิทธิ์ในการสร้างกิจกรรมบน Platform ส่งเอกสารยืนยันตัวตน และเมื่อได้รับการอนุมัติจาก Admin จะสามารถเข้าถึงระบบ Back-office เพื่อบริหารจัดการ Event (สร้าง, แก้ไข) และจัดการข้อมูลผู้สมัคร (Participation) ได้อย่างเต็มรูปแบบผ่าน Desktop

---

## 1. Description

พัฒนาระบบสมัครสมาชิกและเข้าสู่ระบบสำหรับ **Agency** ผ่าน Web Application (Desktop) รองรับการเลือกระหว่างบุคคลธรรมดาและนิติบุคคล, การอัปโหลดเอกสารยืนยันตัวตน และระบบจัดการสถานะการอนุมัติ (Verification Status) เพื่อกำหนดสิทธิ์การบริหารจัดการ Event

---

## 2. Technical Acceptance Criteria

### Scenario 1 — Registration with Identity Selection

- **Given:** Agency อยู่ที่หน้า Register บน Web Browser
- **When:** Agency เลือกประเภท "Individual" หรือ "Corporate"
- **Then:** ระบบต้องแสดง Input Form ที่แตกต่างกันตามประเภทที่เลือก (นิติบุคคลต้องมีเลขประจำตัวผู้เสียภาษีและที่อยู่บริษัท) และข้อมูลที่กรอกต้องถูก Validate ตามกฎ (Regex สำหรับเลขบัตรประชาชน/เลขภาษี 13 หลัก) ทั้งสองประเภทต้องกรอก **เบอร์โทรศัพท์ (Local Phone Number) บังคับกรอก**

### Scenario 2 — Multi-File Upload & Secure Storage

- **Given:** Agency อยู่ในขั้นตอนการอัปโหลดเอกสาร (ภ.พ.20 หรือ บัตรประชาชน)
- **When:** Agency ทำการ Drag & Drop ไฟล์ (PDF, JPG, PNG) เข้ามาในระบบ
- **Then:** ระบบต้องตรวจสอบขนาดไฟล์ (Max 10MB) และประเภทไฟล์ก่อน จากนั้นอัปโหลดไปยัง Secure Storage (Private Bucket) ที่ไม่สามารถเข้าถึงได้จาก Public URL ตรงๆ

### Scenario 3 — Restricted Access (Pending Approval)

- **Given:** Agency สมัครสมาชิกและส่งเอกสารเสร็จสิ้นแล้ว (Status = `Pending`)
- **When:** Agency ทำการ Login เข้าสู่ระบบ Web Portal
- **Then:** ระบบต้อง Redirect User ไปยังหน้า "Verification Status" เสมอ และไม่อนุญาตให้เข้าถึงเมนู "Create Event" จนกว่าสถานะใน Database จะถูกเปลี่ยนเป็น `Approved` โดย Admin

### Scenario 4 — Re-submission upon Rejection

- **Given:** Agency ถูก Admin ปฏิเสธการอนุมัติ (Status = `Rejected`)
- **When:** Agency เข้าสู่ระบบมาเห็นเหตุผลการ Reject (Comment จาก Admin)
- **Then:** ระบบต้องอนุญาตให้ Agency แก้ไขข้อมูลหรืออัปโหลดเอกสารใหม่ และกดปุ่ม "Re-submit" เพื่อเปลี่ยนสถานะกลับเป็น `Pending` อีกครั้ง

---

## 3. Backend & Data Specifications

### Field Validation Rules

| Field | Rule |
|---|---|
| **เลขบัตรประชาชน (Individual)** | 13 หลัก ตัวเลขเท่านั้น · Regex validation ทั้ง Frontend และ Backend |
| **เลขประจำตัวผู้เสียภาษี (Corporate)** | 13 หลัก ตัวเลขเท่านั้น · Regex validation ทั้ง Frontend และ Backend |
| **เบอร์โทรศัพท์ (Individual & Corporate)** | Local Phone Number · บังคับกรอก · ตัวเลขเท่านั้น |
| **File Upload** | ประเภท: PDF, JPG, PNG เท่านั้น · ขนาดสูงสุด: 10MB ต่อไฟล์ | ### Verification Status Flow | Status | ความหมาย | การเข้าถึง |
|---|---|---|
| `Pending` | รอ Admin ตรวจสอบ | Redirect ไปหน้า Verification Status เสมอ |
| `Approved` | Admin อนุมัติแล้ว | เข้าถึง BO Dashboard และ Create Event ได้ |
| `Rejected` | Admin ปฏิเสธ | แสดงเหตุผล + Re-submit form | ### Database Impact

```
Agency registration creates record in DB with:
  type            — "individual" | "corporate"
  status          — "pending" | "approved" | "rejected"
  id_card_number  — (individual only)
  tax_id          — (corporate only)
  phone_number    — local phone number (both types)
  document_paths  — array of Private Bucket paths
  reject_reason   — populated by Admin on rejection
```

---

## 4. Edge Cases

| Case | Handling |
|---|---|
| **Unfinished Registration** (browser closed mid-flow) | Draft saved at any time — user can return and resume from where they left off |
| **File Corruption** | Backend ตรวจจับและส่ง Error 400 กลับไป |
| **Double Submission** (rapid clicks during large file upload) | Idempotency guard — สร้างได้เพียง 1 record ใน DB |

---

## 5. Definition of Done

- [ ] Web Application สามารถ Register และ Login ได้สมบูรณ์บน Chrome/Safari
- [ ] ระบบ File Upload รองรับ Drag & Drop และบันทึกเข้า Secure Storage ได้จริง
- [ ] RBAC ทำงานถูกต้อง (กั้นหน้า Dashboard หากไม่ได้รับการ Approve)
- [ ] ข้อมูลนิติบุคคลและบุคคลธรรมดาถูกแยกเก็บและเรียกใช้ได้ถูกต้องตาม Schema
- [ ] มีระบบ Validation เลขบัตรประชาชน/เลขผู้เสียภาษีทั้งฝั่ง Frontend และ Backend

---

## 6. Subtask Status

| Key | Summary | Status | Assignee |
|-----|---------|--------|----------|
| [PP-37](./PP-37_FE_Login_Page_UI.md) | [FE][BO][Agency] Login Page implement UI | Ready to Deploy Prod | — |
| [PP-38](./PP-38_FE_Login_Page_API_Integration.md) | [FE][BO][Agency] Login Page implement integration with API | Ready to Deploy Prod | — |
| [PP-39](./PP-39_FE_Register_Page_UI.md) | [FE][BO][Agency] Register Page implement UI | Ready to Deploy Prod | — |
| [PP-40](./PP-40_FE_Register_Page_API_Integration.md) | [FE][BO][Agency] Register Page implement integration with API | Ready to Deploy Prod | — |
| [PP-41](./PP-41_FE_Profile_Select_Page.md) | [FE][BO][Agency] Profile Select Page UI and integration with API | Ready to Deploy Prod | — |
| [PP-42](./PP-42_FE_Profile_Organizer_Page_UI.md) | [FE][BO][Agency] Profile Organizer Page implement UI | Ready to Deploy Prod | — |
| [PP-43](./PP-43_FE_Profile_Organizer_Page_API.md) | [FE][BO][Agency] Profile Organizer Page integration with API | Ready to Deploy Prod | — |
| [PP-44](./PP-44_FE_Profile_Personal_Page_UI.md) | [FE][BO][Agency] Profile Personal Page implement UI | Ready to Deploy Prod | — |
| [PP-45](./PP-45_FE_Profile_Personal_Page_API.md) | [FE][BO][Agency] Profile Personal Page integration with API | Ready to Deploy Prod | — |
| [PP-46](./PP-46_FE_Init_Project.md) | [FE][BO][Agency] init project | Ready to Deploy Prod | — |
| [PP-47](./PP-47_FE_Navbar_Sidebar.md) | [FE][BO][Agency] Navbar and Sidebar | Ready to Deploy Prod | — |
| [PP-48](./PP-48_FE_Input_Components.md) | [FE][BO][Agency] Input All components | Closed | — |
| [PP-56](./PP-56_BE_Register_Email.md) | [BE][UserService][Organize] Register Email | Closed | — |
| [PP-59](./PP-59_BE_Login_Email.md) | [BE][UserService][Organize] Login Email | Closed | — |
| [PP-134](./PP-134_FE_Upload_Image_Integration.md) | [FE][BO][Agency] upload image integration | Ready to Deploy Prod | — |
| [PP-211](./PP-211_BE_User_Identify_Character.md) | [BE][End-User] User Identify Your Character | Dev Block | — |

---

> Flow diagram → [PP-4.diagram.md](../../test-design/PP-4.diagram.md)
> Test design → [PP-4.design.md](../../test-design/PP-4.design.md)

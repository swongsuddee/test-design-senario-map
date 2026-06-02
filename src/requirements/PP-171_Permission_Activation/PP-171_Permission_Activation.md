# PP-171 · [BO][Admin] Permission Activation (การเปิดสิทธิ์การสร้าง Event)

| Field        | Value                                      |
|--------------|--------------------------------------------|
| **Key**      | PP-171                                     |
| **Type**     | Story                                      |
| **Project**  | POPPA                                      |
| **Status**   | Ready To Test STG                          |
| **Assignee** | Jojoe - Sattawat.w                         |
| **Figma**    | Design by Dev                              |

---

## User Story

> **ในฐานะ:** Admin Platform Poppa
> **ฉันต้องการ:** ควบคุมสิทธิ์การสร้าง Event ของ Agency ตามสถานะการอนุมัติ
> **เพื่อ:** ให้เฉพาะ Agency ที่ผ่านการตรวจสอบแล้วเท่านั้นที่สามารถสร้าง Event ได้

---

## 1. Description

ระบบควบคุม Access ของเมนู "Create Event" บน Agency BO — Lock หากยังไม่อนุมัติ, Unlock ทันทีเมื่อสถานะเป็น "อนุมัติแล้ว" พร้อมส่ง Notification แจ้ง Agency และบันทึก Audit Trail ทุกการเปลี่ยนสถานะ

---

## 2. Acceptance Criteria

### Scenario 1 — Create Event Locked (Pending / Rejected)

- **Given:** Agency ที่มีสถานะ "รอตรวจสอบ" หรือ "ถูกปฏิเสธ" เข้าสู่ระบบ
- **When:** Agency พยายามเข้าเมนู "Create Event"
- **Then:** เมนูถูก Lock — Agency ไม่สามารถเข้าหน้าสร้าง Event ได้

### Scenario 2 — Create Event Unlocked (Approved)

- **Given:** Agency ที่มีสถานะ "อนุมัติแล้ว" เข้าสู่ระบบ
- **When:** Agency เข้าเมนู "Create Event"
- **Then:** เมนูถูก Unlock, Agency สามารถเลือกหมวดหมู่ Event และตั้งค่ารายละเอียดได้

### Scenario 3 — Onboarding Notification on Approval

- **Given:** Admin ทำการ Approve Agency
- **When:** สถานะเปลี่ยนเป็น "อนุมัติแล้ว"
- **Then:** ระบบส่ง Push Notification หรือ Email ยืนยันผลการอนุมัติพร้อม Link เริ่มต้นใช้งาน

### Scenario 4 — Corporate Document Validation Before Listing

- **Given:** Agency ประเภทนิติบุคคลยังไม่ Upload เอกสารทางกฎหมายครบ
- **When:** Agency Submit คำขอ
- **Then:** รายการ Agency ยังไม่ปรากฏใน Admin Backoffice จนกว่าเอกสารจะครบ

### Scenario 5 — Audit Trail

- **Given:** มีการเปลี่ยนสถานะของ Agency
- **When:** การดำเนินการเสร็จสิ้น
- **Then:** ระบบบันทึกลง History ของ Agency รายนั้นๆ เพื่อตรวจสอบย้อนหลังได้

### Scenario 6 — RBAC: Only KYC/Verifier Role Can Approve

- **Given:** Admin ที่ไม่มี Role "KYC/Verifier" พยายามกด Approve
- **When:** กดปุ่ม Approve
- **Then:** ระบบไม่อนุญาต — เฉพาะ Role "KYC/Verifier" เท่านั้นที่มีสิทธิ์

---

## 3. Technical & Business Rules

| Rule | Detail |
|------|--------|
| **Access Control** | Lock "Create Event" หากสถานะ ≠ อนุมัติแล้ว |
| **Document Validation** | นิติบุคคลต้องครบก่อนจึงแสดงใน Admin BO |
| **Audit Trail** | บันทึกทุกการเปลี่ยนสถานะ (who + when) |
| **Security** | เฉพาะ Role KYC/Verifier เท่านั้นที่ Approve ได้ |

---

## 4. Definition of Done

- [ ] เมนู Create Event ถูก Lock เมื่อสถานะ Pending / Rejected
- [ ] เมนู Create Event ถูก Unlock เมื่อสถานะ Approved
- [ ] ระบบส่ง Notification เมื่อ Approved
- [ ] นิติบุคคลที่เอกสารไม่ครบไม่ปรากฏใน Admin BO
- [ ] Audit Trail บันทึกทุกการเปลี่ยนสถานะ
- [ ] Admin ที่ไม่มี KYC/Verifier role ไม่สามารถ Approve ได้

---

## 5. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-86](./PP-86_BE_Admin_Approve_Reject_Publish.md) | [BE] Admin Approve/Reject Publish | Ready to Deploy STG |
| [PP-87](./PP-87_BE_Admin_Approve_Reject_Cancel.md) | [BE] Admin Approve/Reject Cancel | Ready to Deploy STG |
| [PP-119](./PP-119_BE_Admin_Get_Event_List.md) | [BE] Admin Get Event List | Ready To Test STG |
| [PP-174](./PP-174_FE_Page_Get_Event_List.md) | [FE] Page Get Event list | Ready To Test STG |
| [PP-175](./PP-175_FE_Approve_Reject_Event.md) | [FE] Approve / Reject Event | Ready To Test STG |

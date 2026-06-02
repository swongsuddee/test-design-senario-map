# PP-170 · [BO][Admin] Document Review & Approval Logic (การตรวจสอบและอนุมัติ)

| Field        | Value                                      |
|--------------|--------------------------------------------|
| **Key**      | PP-170                                     |
| **Type**     | Story                                      |
| **Project**  | POPPA                                      |
| **Status**   | Ready to Deploy Prod |
| **Assignee** | Jojoe - Sattawat.w                         |
| **Figma**    | Design by Dev                              |

---

## User Story

> **ในฐานะ:** Admin Platform Poppa
> **ฉันต้องการ:** ตรวจสอบข้อมูลและเอกสารประกอบการสมัครอย่างละเอียด
> **เพื่อ:** ตัดสินใจว่า Agency รายนี้มีความน่าเชื่อถือเพียงพอที่จะสร้าง Event บน Platform หรือไม่

---

## 1. Description

หน้า Detail ของแต่ละ Agency ใน Admin BO สำหรับตรวจสอบเอกสาร แล้วทำการ Approve หรือ Reject พร้อมระบุเหตุผล ระบบบันทึก Log การดำเนินการทุกครั้ง

---

## 2. Acceptance Criteria

### Scenario 1 — Information Display: Corporate (นิติบุคคล)

- **Given:** Admin เปิดหน้า Detail ของ Agency ประเภทนิติบุคคล
- **When:** หน้าโหลดสำเร็จ
- **Then:** ระบบแสดงเอกสาร: หนังสือรับรองบริษัท, ภพ.20, บัตรประชาชนกรรมการ

### Scenario 2 — Information Display: Individual (บุคคลธรรมดา)

- **Given:** Admin เปิดหน้า Detail ของ Agency ประเภทบุคคลธรรมดา
- **When:** หน้าโหลดสำเร็จ
- **Then:** ระบบแสดงเอกสาร: หน้าบัตรประชาชน, ข้อมูลบัญชีธนาคาร (สำหรับรับเงินค่าสมัคร)

### Scenario 3 — Approve Agency

- **Given:** Admin ดูเอกสารครบแล้ว และตัดสินใจอนุมัติ
- **When:** Admin กดปุ่ม Approve (อนุมัติ)
- **Then:** สถานะเปลี่ยนเป็น "อนุมัติแล้ว", ระบบส่ง Email แจ้งเตือนไปยัง Agency, สิทธิ์การสร้าง Event ถูกเปิดทันที

### Scenario 4 — Reject without reason (blocked)

- **Given:** Admin ตัดสินใจปฏิเสธ
- **When:** Admin กดปุ่ม Reject โดยไม่ระบุเหตุผล
- **Then:** ระบบไม่อนุญาตให้ดำเนินการ — ต้องระบุเหตุผลก่อน

### Scenario 5 — Reject with reason

- **Given:** Admin ระบุเหตุผลแล้วยืนยัน Reject
- **When:** Admin กดยืนยัน
- **Then:** สถานะเปลี่ยนเป็น "ถูกปฏิเสธ", Agency สามารถดูเหตุผลและกลับมา Re-submit ได้

### Scenario 6 — Internal Log

- **Given:** Admin ทำการ Approve หรือ Reject
- **When:** การดำเนินการเสร็จสิ้น
- **Then:** ระบบบันทึก Log ว่า Admin คนไหนดำเนินการ และดำเนินการเมื่อวันที่เท่าไหร่

---

## 3. Status Action Summary

| Action | Status After | Side Effect |
|--------|-------------|-------------|
| Approve | อนุมัติแล้ว | ส่ง Email + เปิดสิทธิ์ Create Event |
| Reject (with reason) | ถูกปฏิเสธ | Agency เห็นเหตุผล + Re-submit ได้ |
| Reject (no reason) | ไม่เปลี่ยน | ระบบบล็อก — ต้องระบุเหตุผลก่อน |

---

## 4. Definition of Done

- [ ] หน้า Detail แสดงเอกสารถูกต้องแยกตามประเภท Corporate / Individual
- [ ] Approve ทำงานได้ — เปลี่ยนสถานะ + ส่ง Email + เปิดสิทธิ์
- [ ] Reject บังคับให้ระบุเหตุผล — ไม่สามารถยืนยันโดยไม่กรอก
- [ ] Internal Log บันทึก Admin ID + Timestamp ทุกครั้ง

---

## 5. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-115](./PP-115_BE_Admin_Review_Organizer_Verification_Profile.md) | [BE] Admin Review Organizer Verification Profile | Ready to Deploy Prod |
| [PP-176](./PP-176_BE_Admin_Get_Profile_Organizer_Detail.md) | [BE] Admin Get Profile Organizer Detail | Ready to Deploy Prod |
| [PP-178](./PP-178_FE_Page_Organizer_Detail.md) | [FE] Page Organizer Detail | Ready to Deploy Prod |
| [PP-179](./PP-179_FE_Admin_Review_Organizer.md) | [FE] Admin Review Organizer | Ready to Deploy Prod |

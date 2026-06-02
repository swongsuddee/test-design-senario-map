# PP-104 · [BO][Admin] Agency Verification Listing (หน้าจัดการคำขอ)

| Field        | Value                                      |
|--------------|--------------------------------------------|
| **Key**      | PP-104                                     |
| **Type**     | Story                                      |
| **Project**  | POPPA                                      |
| **Status**   | Ready To Test STG                          |
| **Assignee** | Jojoe - Sattawat.w                         |
| **Figma**    | Design by Dev                              |

---

## User Story

> **ในฐานะ:** Admin Platform Poppa
> **ฉันต้องการ:** ดูรายการคำขอสมัครเข้าใช้งานของ Agency ทั้งหมด
> **เพื่อ:** คัดกรองและดำเนินการตรวจสอบเอกสารตามลำดับ

---

## 1. Description

หน้า Backoffice สำหรับ Admin ที่แสดงตารางรายการคำขอสมัครของ Agency ทั้งหมด รองรับการค้นหา กรองตามสถานะ และปุ่ม Review เพื่อเข้าไปตรวจสอบรายละเอียดเชิงลึก

---

## 2. Acceptance Criteria

### Scenario 1 — Dashboard List

- **Given:** Admin เข้าสู่ระบบและเปิดหน้า Agency Verification
- **When:** หน้าโหลดสำเร็จ
- **Then:** ระบบแสดงตารางรายชื่อ Agency ที่สมัครเข้ามา โดยมีคอลัมน์ดังนี้:
  - ชื่อ Agency / ชื่อผู้สมัคร
  - ประเภท (นิติบุคคล / บุคคลธรรมดา)
  - วันที่ส่งคำขอ (Submitted Date)
  - สถานะการสมัคร: รอตรวจสอบ / ถูกปฏิเสธ / อนุมัติแล้ว

### Scenario 2 — Search by Name

- **Given:** Admin อยู่ที่หน้า Agency Verification Listing
- **When:** Admin พิมพ์ชื่อในช่องค้นหา
- **Then:** ตารางกรองแสดงเฉพาะรายการที่ตรงกับชื่อนั้น

### Scenario 3 — Filter by Status

- **Given:** Admin อยู่ที่หน้า Agency Verification Listing
- **When:** Admin เลือก Filter "รอตรวจสอบ"
- **Then:** ตารางแสดงเฉพาะรายการที่มีสถานะ "รอตรวจสอบ" เท่านั้น

### Scenario 4 — Review Action

- **Given:** ตารางแสดงรายการ Agency
- **When:** Admin กดปุ่ม "ตรวจสอบ (Review)" ของรายการใดรายการหนึ่ง
- **Then:** ระบบนำทางไปยังหน้า Detail ของ Agency รายนั้น (PP-170)

### Scenario 5 — RBAC Guard

- **Given:** ผู้ใช้งานที่ไม่ใช่ Admin พยายามเข้าหน้านี้
- **When:** เข้าถึง URL โดยตรง
- **Then:** ระบบ Redirect ออกจากหน้า Dashboard

---

## 3. Status Values

| Status | Thai Label |
|--------|------------|
| PENDING_REVIEW | รอตรวจสอบ |
| APPROVED | อนุมัติแล้ว |
| REJECTED | ถูกปฏิเสธ |

---

## 4. Definition of Done

- [ ] ตารางแสดงรายการ Agency ครบทุกคอลัมน์ตาม AC
- [ ] Search by name ทำงานถูกต้อง
- [ ] Filter by "รอตรวจสอบ" ทำงานถูกต้อง
- [ ] ปุ่ม "ตรวจสอบ" นำทางไปหน้า Detail ได้
- [ ] RBAC กั้นผู้ใช้ที่ไม่ใช่ Admin

---

## 5. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-117](./PP-117_BE_List_Organizer_Verification_Queue.md) | [BE] List Organizer Verification Queue for Admin | Ready To Test STG |
| [PP-177](./PP-177_FE_Page_Organizer_List.md) | [FE] Page Organizer List | Ready To Test STG |

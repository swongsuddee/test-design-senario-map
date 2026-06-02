# PP-226 · [Imp][M-App][End-User] Event Detail - Organizer Information (แสดงรายชื่อผู้จัดงานวิ่ง)

| Field        | Value                     |
|--------------|---------------------------|
| **Key**      | PP-226                    |
| **Type**     | Story                     |
| **Project**  | POPPA                     |
| **Status**   | To Do                     |
| **Assignee** | —                         |
| **Figma**    | Design by Dev             |

---

## User Story

> **ในฐานะ:** นักวิ่งผู้ใช้งาน Poppa App
> **ฉันต้องการ:** เห็นทั้งชื่อเจ้าของงาน (Host) และผู้ดำเนินการจัดงาน (Organizer) ในหน้ารายละเอียดงานวิ่ง
> **เพื่อ:** การตัดสินใจสมัครงานวิ่งได้อย่างมั่นใจ

---

## 1. Description

หน้า Event Detail บน Mobile App ต้องแสดงทั้งชื่อ "เจ้าภาพ" (Host) และ "ผู้จัดงาน" (Organizer) แยกกันอย่างชัดเจน โดย "เจ้าภาพ" คือต้นงานที่จัดงานวิ่ง ส่วน "ผู้จัดงาน" คือผู้ดำเนินการจัดอีเว้นท์ขึ้นมา เป็นไปได้ที่จะมีเจ้าภาพและผู้จัดแยกกัน หรือเจ้าภาพกับผู้จัดเป็นคนเดียวกัน ระบบนี้รองรับ 3 รูปแบบการแสดงผล ได้แก่ แสดงชื่อ Host หลัก (เน้น Brand), แสดงชื่อ Agency (เน้น Operation), และแบบ Hybrid ที่แสดงทั้งคู่

---

## 2. Acceptance Criteria

### Scenario 1 — แสดง Host และ Organizer บน Event Detail

- **Given:** End-User เปิดหน้า Event Detail ของงานวิ่ง
- **When:** หน้าโหลดข้อมูลสำเร็จ
- **Then:** ระบบแสดงส่วน "เจ้าภาพ" (Host) และ "ผู้จัดงาน" (Organizer) อย่างชัดเจนในหน้ารายละเอียด

### Scenario 2 — Host และ Organizer เป็นคนเดียวกัน

- **Given:** งานวิ่งที่ Host และ Organizer เป็นรายการเดียวกัน
- **When:** End-User เปิดดูหน้า Event Detail
- **Then:** ระบบแสดงชื่อเดียวในทั้งสองตำแหน่ง หรือแสดงแบบรวมให้กระชับ ไม่ซ้ำซ้อน

### Scenario 3 — Host และ Organizer แยกจากกัน

- **Given:** งานวิ่งที่ Host และ Organizer เป็นคนละรายการ
- **When:** End-User เปิดดูหน้า Event Detail
- **Then:** ระบบแสดงชื่อ Host และชื่อ Organizer แยกกันอย่างชัดเจน (Hybrid Display)

### Scenario 4 — ข้อมูล Organizer ไม่มี Snapshot

- **Given:** Event ที่ยังไม่มีข้อมูล Host หรือ Organizer ใน Snapshot
- **When:** End-User เปิดดูหน้า Event Detail
- **Then:** ระบบแสดง Placeholder หรือ "-" ในส่วนที่ไม่มีข้อมูล โดยไม่ขึ้น Error

---

## 3. Display Rules

| รูปแบบการแสดงผล | คำอธิบาย |
|----------------|----------|
| แสดงชื่อ Host หลัก (เน้น Brand) | นักวิ่งเชื่อมั่นในแบรนด์ใหญ่ ตัดสินใจจาก "เจ้าของงาน" |
| แสดงชื่อ Agency (เน้น Operation) | นักวิ่งสาย Performance เลือกจาก Organizer ที่รู้ว่า "ใครคุมหน้างาน" |
| Hybrid (แสดงทั้งคู่) | แสดงความร่วมมือ (Partnership) ครบถ้วน |

---

## 4. Definition of Done

- [ ] หน้า Event Detail แสดงส่วน "เจ้าภาพ" และ "ผู้จัดงาน" ถูกต้องตาม AC
- [ ] กรณี Host = Organizer แสดงผลโดยไม่ซ้ำซ้อน
- [ ] กรณี Host ≠ Organizer แสดงแยกทั้งสองชื่อ
- [ ] กรณีไม่มีข้อมูลแสดง Placeholder ไม่ขึ้น Error
- [ ] Database Schema รองรับ Host และ Organizer Fields (PP-233)
- [ ] BE ส่งคืน Host + Organizer Snapshot ได้ (PP-500)
- [ ] UI ผ่าน Design Review (PP-232)

---

## 5. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-232](./PP-232_MB_End_User_Design_UI_for_Event_Detail_Organizer_Information.md) | [MB][End-User] Design UI for Event Detail - Organizer Information | To Do |
| [PP-233](./PP-233_BE_Event_Organizer_Draft_Submit_Update_Database_Schema_for_Host_and_Organizer_Fields.md) | [BE][Event][Organizer] Draft + Submit Update Database Schema for Host and Organizer Fields | To Do |
| [PP-500](./PP-500_BE_Event_End_User_Return_Host_Organizer_Snapshot.md) | [BE][Event][End user] Return Host + Organizer Snapshot | To Do |

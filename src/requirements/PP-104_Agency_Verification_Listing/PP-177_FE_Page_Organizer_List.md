# PP-177 · [FE][Admin] Page Organizer List

| Field        | Value                                                              |
|--------------|--------------------------------------------------------------------|
| **Key**      | PP-177                                                             |
| **Type**     | Sub-task                                                           |
| **Project**  | POPPA                                                              |
| **Status**   | Ready To Test STG                                                  |
| **Assignee** | pathai laooatthaphong                                              |
| **Parent**   | [PP-104](./PP-104_Agency_Verification_Listing.md)                  |

---

## Summary

พัฒนาหน้า Frontend สำหรับแสดงรายการ Organizer ทั้งหมดในระบบ Admin Portal (Organizer List Page)

---

## 1. Acceptance Criteria

- แสดงตารางรายการ Organizer พร้อมข้อมูลสรุปครบถ้วน (ชื่อ, ประเภท, สถานะ, วันที่ส่งคำขอ)
- รองรับ search และ filter ตามสถานะ
- มีปุ่ม "ตรวจสอบ (Review)" นำทางไปหน้า Detail
- ใช้ API จาก PP-117 (`GET /admin/organizers`)

> ไม่มี description เพิ่มเติมใน Jira — scope อ้างอิงจาก AC ของ story PP-104

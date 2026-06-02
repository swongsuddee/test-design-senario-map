# PP-176 · [BE][User-Service] Admin Get Profile Organizer Detail

| Field        | Value                                                                    |
|--------------|--------------------------------------------------------------------------|
| **Key**      | PP-176                                                                   |
| **Type**     | Sub-task                                                                 |
| **Project**  | POPPA                                                                    |
| **Status**   | Ready to Deploy Prod |
| **Assignee** | pathai laooatthaphong                                                    |
| **Parent**   | [PP-170](./PP-170_Document_Review_Approval_Logic.md)                     |

---

## Summary

API สำหรับ Admin ดึงข้อมูล Profile รายละเอียดของ Organizer เพื่อใช้แสดงในหน้า Detail ก่อนทำการ review

---

## 1. Acceptance Criteria

- Admin ดึงข้อมูล profile ของ organizer ได้ครบถ้วน
- แสดงเอกสารแยกตาม profileType (INDIVIDUAL / COMPANY)
- รองรับการดึงข้อมูล verification documents
- ตรวจสอบสิทธิ์ admin ก่อนให้เข้าถึง

> ไม่มี description เพิ่มเติมใน Jira — scope อ้างอิงจาก AC ของ story PP-170

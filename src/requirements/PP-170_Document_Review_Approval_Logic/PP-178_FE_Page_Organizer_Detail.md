# PP-178 · [FE][Admin] Page Organizer Detail

| Field        | Value                                                                    |
|--------------|--------------------------------------------------------------------------|
| **Key**      | PP-178                                                                   |
| **Type**     | Sub-task                                                                 |
| **Project**  | POPPA                                                                    |
| **Status**   | Ready to Deploy Prod |
| **Assignee** | pathai laooatthaphong                                                    |
| **Parent**   | [PP-170](./PP-170_Document_Review_Approval_Logic.md)                     |

---

## Summary

พัฒนาหน้า Frontend สำหรับแสดงข้อมูลรายละเอียดของ Organizer ให้ Admin ตรวจสอบเอกสารก่อนทำการ Approve / Reject

---

## 1. Acceptance Criteria

- แสดงข้อมูล organizer profile ครบถ้วน
- แสดงเอกสารแยกตามประเภท (นิติบุคคล / บุคคลธรรมดา)
- ใช้ API จาก PP-176 (`GET /admin/organizers/:id`)

> ไม่มี description เพิ่มเติมใน Jira — scope อ้างอิงจาก AC ของ story PP-170

# PP-179 · [FE][Admin] Admin Review Organizer

| Field        | Value                                                                    |
|--------------|--------------------------------------------------------------------------|
| **Key**      | PP-179                                                                   |
| **Type**     | Sub-task                                                                 |
| **Project**  | POPPA                                                                    |
| **Status**   | Ready to Deploy Prod |
| **Assignee** | pathai laooatthaphong                                                    |
| **Parent**   | [PP-170](./PP-170_Document_Review_Approval_Logic.md)                     |

---

## Summary

พัฒนา UI Component สำหรับ Admin กด Approve / Reject บนหน้า Organizer Detail พร้อม input เหตุผล

---

## 1. Acceptance Criteria

- มีปุ่ม Approve และ Reject บนหน้า Detail
- กด Reject ต้องมี input field สำหรับระบุเหตุผล (บังคับกรอก)
- หลัง Approve / Reject สำเร็จให้แสดง feedback และอัปเดตสถานะในหน้า
- ใช้ API จาก PP-115

> ไม่มี description เพิ่มเติมใน Jira — scope อ้างอิงจาก AC ของ story PP-170

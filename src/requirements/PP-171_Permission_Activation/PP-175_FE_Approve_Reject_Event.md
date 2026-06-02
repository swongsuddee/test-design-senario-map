# PP-175 · [FE][Admin] Approve / Reject Event

| Field        | Value                                                        |
|--------------|--------------------------------------------------------------|
| **Key**      | PP-175                                                       |
| **Type**     | Sub-task                                                     |
| **Project**  | POPPA                                                        |
| **Status**   | Ready To Test STG                                            |
| **Assignee** | pathai laooatthaphong                                        |
| **Parent**   | [PP-171](./PP-171_Permission_Activation.md)                  |

---

## Summary

พัฒนา UI Component สำหรับ Admin Approve / Reject Event บน Admin Portal

---

## 1. Acceptance Criteria

- มีปุ่ม Approve และ Reject สำหรับ event ที่อยู่ใน `pending_approved` / `pending_cancel`
- กด Reject ต้องมี input field สำหรับระบุเหตุผล (บังคับกรอก)
- หลังดำเนินการสำเร็จให้อัปเดตสถานะใน UI ทันที
- ใช้ API จาก PP-86 / PP-87

> ไม่มี description เพิ่มเติมใน Jira — scope อ้างอิงจาก AC ของ story PP-171

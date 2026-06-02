# PP-174 · [FE][Admin] Page Get Event List

| Field        | Value                                                        |
|--------------|--------------------------------------------------------------|
| **Key**      | PP-174                                                       |
| **Type**     | Sub-task                                                     |
| **Project**  | POPPA                                                        |
| **Status**   | Ready To Test STG                                            |
| **Assignee** | pathai laooatthaphong                                        |
| **Parent**   | [PP-171](./PP-171_Permission_Activation.md)                  |

---

## Summary

พัฒนาหน้า Frontend สำหรับแสดงรายการ Event ทั้งหมดใน Admin Portal

---

## 1. Acceptance Criteria

- แสดงตาราง Event list พร้อม title, organizer, category, status, participant count, revenue
- รองรับ search, filter, sort
- ใช้ API จาก PP-119 (`AdminGetEventList`)

> ไม่มี description เพิ่มเติมใน Jira — scope อ้างอิงจาก AC ของ story PP-171

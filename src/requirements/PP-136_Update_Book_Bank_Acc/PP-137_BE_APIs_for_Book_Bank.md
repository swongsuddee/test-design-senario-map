# PP-137 · [BE] APIs for Book Bank

| Field        | Value                                                        |
|--------------|--------------------------------------------------------------|
| **Key**      | PP-137                                                       |
| **Type**     | Sub-task                                                     |
| **Project**  | POPPA                                                        |
| **Status**   | Ready To Test STG                                            |
| **Assignee** | Famp-Visarut Phaisarnwattanakarn                             |
| **Parent**   | [PP-136](./PP-136_Update_Book_Bank_Acc.md)                   |

---

## Summary

พัฒนา API สำหรับจัดการข้อมูลบัญชีธนาคาร (Book Bank) ของ Agency ทั้งประเภทนิติบุคคลและบุคคลธรรมดา

---

## 1. Acceptance Criteria

- API รองรับการ Upload / Update หน้าสมุดบัญชีธนาคาร
- ประเภทไฟล์ที่รองรับ: PDF, JPG, PNG
- ขนาดไฟล์สูงสุด: 10 MB
- บันทึก path เข้า Secure Storage (Private Bucket)
- ใช้งานได้ทั้ง Individual และ Corporate profile

> ไม่มี description เพิ่มเติมใน Jira — scope อ้างอิงจาก AC ของ story PP-136

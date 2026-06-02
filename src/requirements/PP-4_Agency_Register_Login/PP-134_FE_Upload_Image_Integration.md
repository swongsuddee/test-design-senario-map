# PP-134 · [FE][BO][Agency] upload image integration

| Field        | Value                                        |
|--------------|----------------------------------------------|
| **Key**      | PP-134                                       |
| **Type**     | Sub-task                                     |
| **Project**  | POPPA                                        |
| **Status**   | Ready to Deploy Prod |
| **Assignee** | —                                            |
| **Parent**   | [PP-4](./PP-4_Agency_Register_Login.md)     |

---

## Summary

เชื่อมต่อ Frontend Agency BO กับ API สำหรับอัปโหลดรูปภาพ/เอกสาร ไปยัง Secure Storage (Private Bucket)

---

## 1. Acceptance Criteria

- รองรับ Drag & Drop file upload (PDF, JPG, PNG)
- ตรวจสอบขนาดไฟล์ Max 10MB ก่อน upload
- แสดง progress และ error state ตามที่ story PP-4 กำหนด

> ไม่มี description เพิ่มเติมใน Jira — scope อ้างอิงจาก AC ของ story PP-4

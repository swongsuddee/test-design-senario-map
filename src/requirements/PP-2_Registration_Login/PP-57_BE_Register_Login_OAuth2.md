# PP-57 · [BE][UserService] Register/Login OAuth2 (Google, Apple, LINE)

| Field        | Value                                        |
|--------------|----------------------------------------------|
| **Key**      | PP-57                                        |
| **Type**     | Sub-task                                     |
| **Project**  | POPPA                                        |
| **Status**   | Ready to Deploy Prod |
| **Assignee** | Ohm-Phakorn.s                                |
| **Parent**   | [PP-2](./PP-2_Registration_Login.md)        |

---

## Summary

พัฒนา UserService API สำหรับ Register/Login ผ่าน OAuth2 — รองรับ Google, Apple, LINE

---

## 1. Acceptance Criteria

- รองรับ Identity Linking กรณี Email ซ้ำข้าม provider
- บันทึก auth_provider_id ลง Users table
- ส่ง JWT/Refresh Token กลับหลัง authenticate สำเร็จ

> ไม่มี description เพิ่มเติมใน Jira — scope อ้างอิงจาก AC ของ story PP-2

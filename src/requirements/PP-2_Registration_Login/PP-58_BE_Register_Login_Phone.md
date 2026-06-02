# PP-58 · [BE][UserService] Register/Login Phone number

| Field        | Value                                        |
|--------------|----------------------------------------------|
| **Key**      | PP-58                                        |
| **Type**     | Sub-task                                     |
| **Project**  | POPPA                                        |
| **Status**   | Ready to Deploy Prod |
| **Assignee** | Ohm-Phakorn.s                                |
| **Parent**   | [PP-2](./PP-2_Registration_Login.md)        |

---

## Summary

พัฒนา UserService API สำหรับ Register/Login ด้วย Phone Number + OTP — เก็บ Phone ในรูปแบบ `+66XXXXXXXXX`

---

## 1. Acceptance Criteria

- ส่ง OTP 6 หลัก, Countdown 60 วินาที
- Rate Limit: ไม่เกิน 3 ครั้งใน 5 นาที (Anti-spam)
- บันทึก phone_number ลง Users table

> ไม่มี description เพิ่มเติมใน Jira — scope อ้างอิงจาก AC ของ story PP-2

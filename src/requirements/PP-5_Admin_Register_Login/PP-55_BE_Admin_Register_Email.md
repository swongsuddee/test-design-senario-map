# PP-55 · [BE] Admin Register Email

| Field        | Value                                           |
|--------------|-------------------------------------------------|
| **Key**      | PP-55                                           |
| **Type**     | Sub-task                                        |
| **Project**  | POPPA                                           |
| **Status**   | Closed                                          |
| **Assignee** | —                                               |
| **Parent**   | [PP-5](./PP-5_Admin_Register_Login.md)         |

---

## Summary

API สำหรับ Admin สมัครสมาชิกด้วย Email พร้อมระบบยืนยัน Email

---

## 1. API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /auth/admin/register | สมัครสมาชิก Admin (email, password, full_name) |
| GET | /auth/admin/verify-email | ยืนยัน Email ด้วย Token (?token=xxx) |
| POST | /auth/admin/resend-verification | ขอส่ง Verification Email ใหม่ |

## 2. Constraints

- Password: min 8 chars, at least 1 digit, bcrypt hashed
- Email must be unique in DB
- Role: admin, initial status: pending_verification
- Verification token TTL: 24 hours (Redis: verify:admin:{token})
- Resend rate limit: 1 time / 5 min (Redis: verify:resend:{email})
- Status flow: pending_verification → pending_approval → active / rejected
- Return same response for duplicate and new email (prevent Email Enumeration)

> **หมายเหตุ:** Closed — ขัดแย้งกับ story PP-5 ที่ระบุว่าไม่มี Self-registration (ดู PP-5 clarifications)

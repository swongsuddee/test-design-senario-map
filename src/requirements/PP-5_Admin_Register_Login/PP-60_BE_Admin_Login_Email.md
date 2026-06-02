# PP-60 · [BE] Admin Login Email

| Field        | Value                                           |
|--------------|-------------------------------------------------|
| **Key**      | PP-60                                           |
| **Type**     | Sub-task                                        |
| **Project**  | POPPA                                           |
| **Status**   | Ready to Deploy Prod |
| **Assignee** | —                                               |
| **Parent**   | [PP-5](./PP-5_Admin_Register_Login.md)         |

---

## Summary

API สำหรับ Admin Login ด้วย Email + Password พร้อม Token management

---

## 1. API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /auth/admin/login | Login ด้วย Email + Password |
| POST | /auth/refresh | Refresh Access Token |
| POST | /auth/logout | Revoke Refresh Token |

## 2. Constraints

- Account must have status: active to login
- Status checks return specific 403 messages:
  - pending_verification → "Please verify your email before login"
  - pending_approval → "Your account is pending approval"
  - rejected → "Your account has been rejected"
- Wrong credentials → 401 "Invalid credentials" (no email enumeration)
- Access Token TTL: 15 min; Refresh Token TTL: 7 days
- Redis: refresh:admin:{user_id} — login overwrites previous token (1 session per account)

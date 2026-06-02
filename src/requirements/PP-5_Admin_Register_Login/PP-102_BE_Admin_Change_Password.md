# PP-102 · [BE] Admin Change Password

| Field        | Value                                           |
|--------------|-------------------------------------------------|
| **Key**      | PP-102                                          |
| **Type**     | Sub-task                                        |
| **Project**  | POPPA                                           |
| **Status**   | Closed                                          |
| **Assignee** | —                                               |
| **Parent**   | [PP-5](./PP-5_Admin_Register_Login.md)         |

---

## Summary

API สำหรับ Admin เปลี่ยนรหัสผ่านของตนเอง

---

## 1. Acceptance Criteria

- Admin changes own password
- Required: currentPassword + newPassword
- Validation: currentPassword bcrypt verified, newPassword min 8 chars, must differ from current
- Revokes all refresh tokens after change (force re-login all devices)
- Publishes Kafka event: admin.admin.passwordChanged

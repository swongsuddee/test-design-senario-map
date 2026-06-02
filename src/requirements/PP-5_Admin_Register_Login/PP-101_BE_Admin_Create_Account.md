# PP-101 · [BE] Admin Create Admin Account

| Field        | Value                                           |
|--------------|-------------------------------------------------|
| **Key**      | PP-101                                          |
| **Type**     | Sub-task                                        |
| **Project**  | POPPA                                           |
| **Status**   | Ready To Test STG                               |
| **Assignee** | —                                               |
| **Parent**   | [PP-5](./PP-5_Admin_Register_Login.md)         |

---

## Summary

API สำหรับ Super Admin สร้าง Admin Account ใหม่ใน Admin Portal

---

## 1. Acceptance Criteria

- Only super_admin can create admin accounts via Admin Portal
- Fields: name, email, password, role (admin / moderator), permissions
- Roles allowed via API: admin, moderator — super_admin via seed script only
- Publishes Kafka event: admin.admin.created
- Sends invite email async (goroutine / Kafka consumer)
- Returns admin record without passwordHash
- Audit: createdBy = adminID

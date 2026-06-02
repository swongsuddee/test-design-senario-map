# PP-443 · [BE][Ticket] ปรับ schema Order

| Field        | Value                                         |
|--------------|-----------------------------------------------|
| **Key**      | PP-443                                        |
| **Type**     | Sub-task                                      |
| **Project**  | POPPA                                         |
| **Status**   | Ready to Deploy STG                           |
| **Assignee** | Pond-Siritep Tongdoung                        |
| **Parent**   | [PP-105](./PP-105_Event_Registration_Join_Event.md) |
| **Figma**    | Design by Dev                                 |

---

## User Story

ปรับ schema Order ให้ snapshot user เพื่อ performance ในการ search

---

## 1. Acceptance Criteria

### Scenario 1 — Schema Migration

- **Given:** Order schema ปัจจุบันไม่มี snapshot ของ user data
- **When:** ปรับ schema ให้ embed/snapshot user fields ที่จำเป็น
- **Then:** การ search order ทำได้เร็วขึ้นโดยไม่ต้อง join กับ user collection

---

## 2. Definition of Done

- [ ] Schema Order มี snapshot user fields ครบถ้วน
- [ ] Performance การ search order ดีขึ้น
- [ ] Migration script ทำงานสำเร็จโดยไม่กระทบ data เดิม

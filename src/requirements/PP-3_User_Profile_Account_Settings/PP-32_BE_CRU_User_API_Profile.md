# PP-32 · [BE][End-User] CRU user-api to handle User Profile

| Field        | Value                                                              |
|--------------|--------------------------------------------------------------------|
| **Key**      | PP-32                                                              |
| **Type**     | Sub-task                                                           |
| **Project**  | POPPA                                                              |
| **Status**   | Ready to Deploy Prod                                                  |
| **Assignee** | Ohm-Phakorn.s                                                      |
| **Parent**   | [PP-3](./PP-3_User_Profile_Account_Settings.md)                   |

---

## Summary

พัฒนา Backend API สำหรับ Create / Read / Update ข้อมูล User Profile รองรับ endpoints ที่ story PP-3 กำหนด

---

## 1. Acceptance Criteria

- `GET /v1/user/profile` — ดึงข้อมูล Avatar, Display Name, Bio, stats, event tabs
- `PATCH /v1/user/profile` — อัปเดต Display Name, Bio, Phone Number พร้อม validation ตาม rules
- `DELETE /v1/user/account` — เปลี่ยนสถานะ User เป็น `Deleted`, revoke sessions ทั้งหมด
- Interests update ต้อง trigger Discovery/Home re-calculation

> ไม่มี description เพิ่มเติมใน Jira — scope อ้างอิงจาก AC ของ story PP-3

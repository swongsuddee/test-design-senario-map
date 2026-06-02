# PP-31 · [BE][End-User] CRU user's interesting category (onboarding)

| Field        | Value                                        |
|--------------|----------------------------------------------|
| **Key**      | PP-31                                        |
| **Type**     | Sub-task                                     |
| **Project**  | POPPA                                        |
| **Status**   | In Progress |
| **Assignee** | —                                            |
| **Parent**   | [PP-2](./PP-2_Registration_Login.md)        |

---

## Summary

พัฒนา Backend API สำหรับ Create / Read / Update ข้อมูล Interests Category ของ User ระหว่าง Onboarding Flow

---

## 1. Acceptance Criteria

- บันทึกข้อมูลลง `User_Interests` table (user_id → FK to Users, category_id)
- รองรับการเลือก 1–3 หมวดหมู่ระหว่าง Onboarding Step 4

> ไม่มี description เพิ่มเติมใน Jira — scope อ้างอิงจาก AC ของ story PP-2

# PP-244 · [BO][Organizer] Delete Organizer Account

| Field        | Value                     |
|--------------|---------------------------|
| **Key**      | PP-244                    |
| **Type**     | Story                     |
| **Project**  | POPPA                     |
| **Status**   | Ready To Test STG         |
| **Assignee** | —                         |

---

## User Story

> ไม่มี description เพิ่มเติมใน Jira — scope อ้างอิงจาก story title และ context ของโปรเจกต์ POPPA

---

## 1. Technical Acceptance Criteria

### Scenario 1 — Delete Account Flow

- **AC 1.1:** Organizer สามารถลบบัญชีของตนเองได้จากหน้า Account Settings
- **AC 1.2:** ระบบต้องแสดง Confirmation Dialog ก่อนดำเนินการลบ
- **AC 1.3:** หลังลบบัญชี → Force Logout และ Redirect ไปหน้า Landing Page

---

## 2. Definition of Done

- [ ] Delete Account flow ทำงานถูกต้องครบทุก step
- [ ] Confirmation Dialog แสดงก่อนลบ
- [ ] Force Logout หลังลบสำเร็จ

---

## 3. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-319](./PP-319_FE_Admin_Implement_UI_Delete_Organizer_Account.md) | [FE][Admin] implement ui delete organizer account | Ready To Test STG |
| [PP-320](./PP-320_BE_Admin_Create_API_Delete_Organizer.md) | [BE][Admin] create api delete organize | Ready To Test STG |
| [PP-433](./PP-433_FE_Admin_Integration_API_Delete_Organizer_Account.md) | [FE][Admin] integration api delete organizer account | Ready To Test STG |

> Flow diagram → [PP-244.diagram.md](../../test-design/PP-244.diagram.md)
> Test design → [PP-244.design.md](../../test-design/PP-244.design.md)

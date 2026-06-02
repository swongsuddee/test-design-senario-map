# PP-234 · [BO][Organizer] Organizer Event Detail

| Field        | Value                     |
|--------------|---------------------------|
| **Key**      | PP-234                    |
| **Type**     | Story                     |
| **Project**  | POPPA                     |
| **Status**   | Ready To Test STG         |
| **Assignee** | —                         |

---

## User Story

> ไม่มี description เพิ่มเติมใน Jira — scope อ้างอิงจาก sub-task และ context ของ story PP-51

---

## 1. Technical Acceptance Criteria

### Scenario 1 — Event Detail Information Display

- **AC 1.1:** Organizer สามารถดูรายละเอียด Event ที่ตนสร้างได้ (ชื่อ, วันเวลา, สถานที่, Ticket Types, รูปภาพ)
- **AC 1.2:** ข้อมูลดึงมาจาก API GET Event by ID

---

## 2. Definition of Done

- [ ] หน้า Event Detail แสดงข้อมูลถูกต้องครบถ้วน
- [ ] API integration ทำงานถูกต้อง

---

## 3. Subtasks

| Key | Summary | Status |
|-----|---------|--------|
| [PP-157](./PP-157_FE_Event_Detail_Information_UI.md) | [FE][BO][Organizer] Event Detail information UI | Ready To Test STG |
| [PP-118](./PP-118_BE_Get_Event_Detail.md) | [BE][Event][Organizer] Get Event Detail | Ready To Test STG |

> Flow diagram → [PP-234.diagram.md](../../test-design/PP-234.diagram.md)
> Test design → [PP-234.design.md](../../test-design/PP-234.design.md)

# PP-235 · [BO][Organizer] Organizer Portal - Event Running Registered (User Register List)

| Field        | Value                     |
|--------------|---------------------------|
| **Key**      | PP-235                    |
| **Type**     | Story                     |
| **Project**  | POPPA                     |
| **Status**   | Ready to Deploy STG               |
| **Assignee** | —                         |

---

## User Story

> **ในฐานะ:** Organizer
> **ฉันต้องการ:** ดูรายชื่อผู้ที่ลงทะเบียนเข้าร่วม Event และรายละเอียดของแต่ละคน
> **เพื่อ:** บริหารจัดการผู้เข้าร่วม Event ได้อย่างมีประสิทธิภาพ

---

## 1. Technical Acceptance Criteria

### Scenario 1 — Participant List Display

- **AC 1.1:** แสดงรายชื่อผู้ที่ลงทะเบียนทั้งหมด พร้อม Status (registered, confirmed, checked-in, cancelled)
- **AC 1.2:** รองรับการ Search / Filter ผู้เข้าร่วมตามชื่อหรือ Status

### Scenario 2 — Participant Detail

- **AC 2.1:** Organizer สามารถกดดูรายละเอียดของผู้เข้าร่วมแต่ละคนได้
- **AC 2.2:** แสดงข้อมูล: ชื่อ-นามสกุล, Ticket Type, สถานะการชำระเงิน, Check-in Status

---

## 2. Definition of Done

- [ ] Participant List แสดงข้อมูลถูกต้องครบถ้วน
- [ ] Participant Detail page ทำงานถูกต้อง
- [ ] API integration ทำงานถูกต้อง

---

## 3. Subtasks

| Key | Summary | Status |
|-----|---------|--------|
| [PP-158](./PP-158_FE_Event_Detail_User_Register_UI.md) | [FE][BO][Organizer] Event Detail user register UI | Ready To Test STG |
| [PP-159](./PP-159_FE_Event_Detail_User_Register_API.md) | [FE][BO][Organizer] Event Detail user register Integrate API | Ready To Test STG |
| [PP-197](./PP-197_BE_Participant_List_API.md) | [BE][Event][Organizer] Implement Participant List API | Ready to Deploy STG |
| [PP-246](./PP-246_FE_User_Register_Detail_UI.md) | [FE][BO][Organizer] User register detail UI | Ready To Test STG |
| [PP-247](./PP-247_FE_User_Register_Detail_API.md) | [FE][BO][Organizer] User register detail Integrate API | Ready To Test STG |

> Flow diagram → [PP-235.diagram.md](../../test-design/PP-235.diagram.md)
> Test design → [PP-235.design.md](../../test-design/PP-235.design.md)

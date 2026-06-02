# PP-268 · [M-App][End-User] Event Detail (Mobile App)

| Field        | Value                     |
|--------------|---------------------------|
| **Key**      | PP-268                    |
| **Type**     | Story                     |
| **Project**  | POPPA                     |
| **Status**   | Ready To Test STG         |
| **Assignee** | —                         |

---

## User Story

> **ในฐานะ:** End-User ผู้ใช้งาน Mobile App
> **ฉันต้องการ:** ดูรายละเอียด Event บน Mobile App
> **เพื่อ:** ตัดสินใจเข้าร่วม Event และดูรายชื่อผู้เข้าร่วม

---

## 1. Technical Acceptance Criteria

### Scenario 1 — Event Detail Display

- **AC 1.1:** แสดงข้อมูล Event ครบถ้วน (ชื่อ, วันเวลา, สถานที่, รูปภาพ, คำอธิบาย, Ticket Types)
- **AC 1.2:** แสดงปุ่ม Join / Buy Ticket ตามประเภท Event (Free / Paid)

### Scenario 2 — Participant List

- **AC 2.1:** แสดงรายชื่อผู้เข้าร่วมที่ confirmed แล้ว
- **AC 2.2:** ดึงข้อมูลผ่าน API

---

## 2. Definition of Done

- [ ] Event Detail UI แสดงข้อมูลถูกต้องตาม Figma
- [ ] Participant List UI แสดงรายชื่อถูกต้อง
- [ ] API integration ทำงานถูกต้อง

---

## 3. Subtasks

| Key | Summary | Status |
|-----|---------|--------|
| [PP-273](./PP-273_MB_Event_Detail_UI.md) | [MB][End-User] Event Detail UI | Ready To Test STG |
| [PP-274](./PP-274_MB_Event_Detail_API.md) | [MB][End-User] Event Detail Integrate API | Ready To Test STG |
| [PP-275](./PP-275_BE_Running_Details_APIs.md) | [BE][Event] Running Details APIs | To Do |
| [PP-285](./PP-285_MB_Participant_UI.md) | [MB][End-User] Participant UI | Ready To Test STG |
| [PP-286](./PP-286_MB_Participant_API.md) | [MB][End-User] Participant Integrate API | Ready To Test STG |

> Flow diagram → [PP-268.diagram.md](../../test-design/PP-268.diagram.md)
> Test design → [PP-268.design.md](../../test-design/PP-268.design.md)

# PP-492 · Edit Running Event (แก้ไขงานวิ่ง)

| Field        | Value                  |
|--------------|------------------------|
| **Key**      | PP-492                 |
| **Type**     | Story                  |
| **Project**  | POPPA                  |
| **Status**   | In Progress                  |
| **Assignee** | BIG Phanuwit           |
| **Figma**    | Design by Dev          |

---

## User Story

> **ในฐานะ:** Organizer ผู้จัดงานวิ่ง
> **ฉันต้องการ:** แก้ไขเนื้อหางานวิ่ง
> **เพื่อ:** ให้ข้อมูลงานวิ่งถูกต้องและทันสมัย

---

## 1. Description

ฟีเจอร์ Edit Running Event บน Backoffice ให้ Organizer สามารถแก้ไขข้อมูลงานวิ่งที่ Publish แล้วหรือ Draft ที่ยังไม่ได้ Publish โดยมี UI สำหรับการแก้ไขและ Integration กับ API ทั้ง 2 กรณี

---

## 2. Acceptance Criteria

### Scenario 1 — Edit Published Event UI

- **Given:** Organizer เปิดหน้า Event Detail บน Backoffice
- **When:** กดปุ่ม Edit Event
- **Then:** หน้า Edit Event เปิดพร้อมข้อมูลงานวิ่งปัจจุบัน

### Scenario 2 — Save Changes to Published Event

- **Given:** Organizer แก้ไขข้อมูลงานวิ่งบนหน้า Edit
- **When:** กดปุ่ม Save
- **Then:** ระบบส่ง API และอัปเดตข้อมูลงานวิ่งที่ Publish แล้ว

### Scenario 3 — Edit Draft Event UI

- **Given:** Organizer เปิดหน้า Draft Event บน Backoffice
- **When:** กดปุ่ม Edit Draft
- **Then:** หน้า Edit Draft เปิดพร้อมข้อมูล Draft ปัจจุบัน

### Scenario 4 — Save Changes to Draft Event

- **Given:** Organizer แก้ไขข้อมูล Draft บนหน้า Edit
- **When:** กดปุ่ม Save Draft
- **Then:** ระบบส่ง API และบันทึก Draft ที่อัปเดตแล้ว

### Scenario 5 — Validation

- **Given:** Organizer ลบข้อมูล Required Field ออก
- **When:** กดปุ่ม Save
- **Then:** ระบบแสดง Validation Error และไม่บันทึก

---

## 3. Technical Rules

| Rule | Detail |
|------|--------|
| Edit Published Event | แก้ไขได้ทุก Field ที่อนุญาต |
| Edit Draft Event | แก้ไขได้ทุก Field |
| API Integration | FE เรียก API Edit Event / Edit Draft Event แยกกัน |
| Validation | Required Fields ต้องไม่ว่าง |

---

## 4. Definition of Done

- [ ] Edit Event UI ของ Published Event ทำงานได้
- [ ] API Integration ของ Published Event ทำงานได้
- [ ] Edit Draft Event UI ทำงานได้
- [ ] API Integration ของ Draft Event ทำงานได้
- [ ] Validation แสดง Error เมื่อ Required Fields ว่าง

---

## 5. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-493](./PP-493_FE_BO_Edit_event_implement_UI.md) | [FE][BO][Organizer] Edit event implement UI | Review Code |
| [PP-494](./PP-494_FE_BO_Edit_event_integration_API.md) | [FE][BO][Organizer] Edit event integration API | Review Code |
| [PP-495](./PP-495_FE_BO_Edit_draft_event_implement_UI.md) | [FE][BO][Organizer] Edit draft event implement UI | In Progress |
| [PP-496](./PP-496_FE_BO_Edit_draft_event_integration_API.md) | [FE][BO][Organizer] Edit draft event integration API | In Progress |

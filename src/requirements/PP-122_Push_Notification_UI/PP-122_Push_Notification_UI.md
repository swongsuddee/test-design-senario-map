# PP-122 · [M-App] Push Notification UI

| Field        | Value             |
|--------------|-------------------|
| **Key**      | PP-122            |
| **Type**     | Story             |
| **Project**  | POPPA             |
| **Status**   | Ready To Test STG |
| **Assignee** | Tum-Natthapon.C   |

---

## User Story

> **ในฐานะ:** End-User ผู้ใช้งาน Poppa App
> **ฉันต้องการ:** เห็นการแจ้งเตือนที่ชัดเจนและเป็นระเบียบบน Lock Screen
> **เพื่อ:** เข้าใจข้อความจากแอปได้อย่างรวดเร็ว และมองเห็นสัญลักษณ์หรือรูปภาพที่เกี่ยวข้องได้ชัดเจน

---

## 1. Technical Acceptance Criteria

### AC1 — Layout Positioning

- **Leading (ซ้าย):** แสดง Platform App Icon พร้อม Badge จำนวน notification (ถ้ามี)
- **Center (กลาง):** แสดง Title (Bold) + Subtitle / Body Text ด้วย Font Weight ต่างกันตาม hierarchy
- **Trailing (ขวา):** แสดง Content Image (Square) — ถ้าไม่มีภาพให้ซ่อนและขยาย Body Text เต็มพื้นที่

### AC2 — Notification Stacking

- หาก App เดียวกันมีหลาย notification ให้แสดงแบบ Stack (iOS style)

### AC3 — Interaction

- Tap ที่ Card → Deep link ไปยังหน้าที่เกี่ยวข้องภายในแอปได้ถูกต้อง

### AC4 — Time Stamp

- แสดงเวลาที่ได้รับ notification (เช่น "2h ago") ที่มุมขวาบนของ Card

---

## 2. Definition of Done

- [ ] Layout (Icon + Body + Image) แสดงถูกต้องตาม spec
- [ ] Notification stacking ทำงานถูกต้อง
- [ ] Deep link จาก notification ทำงานถูกต้อง
- [ ] Timestamp แสดงถูกต้อง

---

## 3. Subtasks

| Key | Summary | Status |
|-----|---------|--------|
| [PP-123](./PP-123_BE_Push_Notification_UI_Lock_Screen.md) | [BE] Push Notification UI on Lock Screen | Ready To Test STG |
| [PP-124](./PP-124_MB_Push_Notification_UI_Lock_Screen.md) | [MB] Push Notification UI on Lock Screen | Ready To Test STG |
| [PP-125](./PP-125_QA_Push_Notification_UI_Lock_Screen.md) | [QA][BE] Push Notification UI on Lock Screen | To Do |

> Flow diagram → [PP-122.diagram.md](../../test-design/PP-122.diagram.md)
> Test design → [PP-122.design.md](../../test-design/PP-122.design.md)

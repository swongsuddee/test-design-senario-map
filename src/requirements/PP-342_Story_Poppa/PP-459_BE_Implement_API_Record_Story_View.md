# PP-459 · [BE][Story] Implement API Record Story View

| Field        | Value                                    |
|--------------|------------------------------------------|
| **Key**      | PP-459                                   |
| **Type**     | Sub-task                                 |
| **Project**  | POPPA                                    |
| **Status**   | To Do                                    |
| **Assignee** | —                                        |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md)        |

---

## User Story

> Backend บันทึก View Event เมื่อ User เปิดดู Story เพื่อให้เจ้าของ Story เห็น Insights

---

## 1. Description

Implement API Record Story View บน Backend รับ Request เมื่อ User เปิดดู Story, บันทึก viewer userId และ timestamp ลงใน MongoDB, ป้องกัน Duplicate View จากผู้ดูคนเดิม

---

## 2. Acceptance Criteria

### Scenario 1 — Record View Success

- **Given:** User เปิดดู Story ของคนอื่น
- **When:** Client ส่ง POST /stories/:id/views
- **Then:** API บันทึก viewerId และ viewedAt สำเร็จ

### Scenario 2 — Duplicate View Prevention

- **Given:** User เคยดู Story นี้แล้ว
- **When:** Client ส่ง POST /stories/:id/views ซ้ำ
- **Then:** API ไม่นับ View ซ้ำ (Idempotent)

### Scenario 3 — Self-view Exclusion

- **Given:** User เปิดดู Story ของตัวเอง
- **When:** Client ส่ง POST /stories/:id/views
- **Then:** API ไม่บันทึก Self-view ใน Viewer List

---

## 3. Definition of Done

- [ ] POST /stories/:id/views บันทึก View สำเร็จ
- [ ] Duplicate View ไม่ถูกนับซ้ำ
- [ ] Self-view ไม่ถูกบันทึกใน Viewer List

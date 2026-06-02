# PP-348 · Insert Sticker (Sticker BE มีให้เท่านั้น)

| Field        | Value                                    |
|--------------|------------------------------------------|
| **Key**      | PP-348                                   |
| **Type**     | Sub-task                                 |
| **Project**  | POPPA                                    |
| **Status**   | To Do                                    |
| **Assignee** | —                                        |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md)        |

---

## User Story

> End-User สามารถเพิ่ม Sticker ที่ Backend จัดเตรียมไว้ลงบน Story ได้

---

## 1. Description

Implement ฟีเจอร์ Insert Sticker บน Story Editor โดย Sticker ที่ใช้ได้จะมาจาก Backend เท่านั้น ผู้ใช้สามารถเลือก Sticker จาก Catalog, วางลงบน Story, ย้ายตำแหน่ง และปรับขนาดได้

---

## 2. Acceptance Criteria

### Scenario 1 — Open Sticker Catalog

- **Given:** End-User อยู่ในหน้า Story Editor
- **When:** กดปุ่ม Sticker
- **Then:** ระบบแสดง Sticker Catalog ที่โหลดจาก Backend

### Scenario 2 — Select Sticker

- **Given:** Sticker Catalog แสดงอยู่
- **When:** End-User กดเลือก Sticker
- **Then:** Sticker ปรากฏบน Story Editor ตรงกลางหน้าจอ

### Scenario 3 — Move Sticker

- **Given:** มี Sticker บน Story Editor
- **When:** End-User ลาก Sticker
- **Then:** Sticker ย้ายตำแหน่งตาม Gesture

### Scenario 4 — Resize Sticker

- **Given:** มี Sticker บน Story Editor
- **When:** End-User ใช้ Pinch Gesture บน Sticker
- **Then:** ขนาด Sticker เปลี่ยนตาม Gesture

### Scenario 5 — No External Sticker

- **Given:** End-User ใช้ Sticker Feature
- **When:** ระบบโหลด Catalog
- **Then:** แสดงเฉพาะ Sticker ที่มาจาก Backend Catalog เท่านั้น

---

## 3. Definition of Done

- [ ] Sticker Catalog โหลดจาก Backend ได้
- [ ] เลือก Sticker วางบน Story ได้
- [ ] Drag ย้ายตำแหน่ง Sticker ได้
- [ ] Pinch ปรับขนาด Sticker ได้
- [ ] ไม่มี Sticker จากแหล่งอื่นนอกจาก Backend

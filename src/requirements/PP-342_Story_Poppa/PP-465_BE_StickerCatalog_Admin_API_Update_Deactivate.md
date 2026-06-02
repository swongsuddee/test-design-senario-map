# PP-465 · [BE][StickerCatalog] Implement Admin API Update / Deactivate Sticker

| Field        | Value                                    |
|--------------|------------------------------------------|
| **Key**      | PP-465                                   |
| **Type**     | Sub-task                                 |
| **Project**  | POPPA                                    |
| **Status**   | To Do                                    |
| **Assignee** | —                                        |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md)        |

---

## User Story

> Admin สามารถแก้ไขข้อมูลหรือ Deactivate Sticker ที่ไม่ต้องการให้ User ใช้งานได้

---

## 1. Description

Implement Admin API Update และ Deactivate Sticker บน sticker-catalog-api ให้ Admin สามารถแก้ไข Metadata ของ Sticker หรือเปลี่ยน Status เป็น Inactive เพื่อซ่อนจาก User

---

## 2. Acceptance Criteria

### Scenario 1 — Update Sticker Success

- **Given:** Admin ส่ง PUT Request พร้อม Sticker ID และข้อมูลที่ต้องการแก้ไข
- **When:** API รับ Request
- **Then:** ข้อมูล Sticker ถูกอัปเดตใน Database

### Scenario 2 — Deactivate Sticker

- **Given:** Admin ส่ง PATCH Request เพื่อ Deactivate Sticker
- **When:** API รับ Request
- **Then:** Sticker Status เปลี่ยนเป็น INACTIVE และหายจาก User Catalog

### Scenario 3 — Sticker Not Found

- **Given:** Admin ระบุ Sticker ID ที่ไม่มีอยู่
- **When:** API รับ Request
- **Then:** Return HTTP 404 Not Found

---

## 3. Definition of Done

- [ ] PUT /admin/stickers/:id อัปเดตข้อมูลสำเร็จ
- [ ] PATCH /admin/stickers/:id/deactivate เปลี่ยน Status เป็น INACTIVE
- [ ] Deactivated Sticker ไม่แสดงใน User Catalog
- [ ] Not Found คืน HTTP 404

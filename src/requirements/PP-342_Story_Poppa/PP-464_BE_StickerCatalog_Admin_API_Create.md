# PP-464 · [BE][StickerCatalog] Implement Admin API Create Sticker

| Field        | Value                                    |
|--------------|------------------------------------------|
| **Key**      | PP-464                                   |
| **Type**     | Sub-task                                 |
| **Project**  | POPPA                                    |
| **Status**   | To Do                                    |
| **Assignee** | —                                        |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md)        |

---

## User Story

> Admin สามารถเพิ่ม Sticker ใหม่เข้า Catalog ผ่าน Admin API

---

## 1. Description

Implement Admin API Create Sticker บน sticker-catalog-api ให้ Admin สามารถเพิ่ม Sticker ใหม่เข้า Catalog พร้อม Metadata เช่น Name, Image URL, Category, และ Status

---

## 2. Acceptance Criteria

### Scenario 1 — Create Sticker Success

- **Given:** Admin ส่ง POST Request พร้อมข้อมูล Sticker ครบถ้วน
- **When:** API รับ Request
- **Then:** Sticker ถูกบันทึกลง Database และ Return Sticker ID กลับไป

### Scenario 2 — Validation Error

- **Given:** Admin ส่ง Request ที่ขาด Image URL
- **When:** API รับ Request
- **Then:** Return HTTP 400 พร้อม Error Message

### Scenario 3 — RBAC Guard

- **Given:** User ที่ไม่ใช่ Admin ส่ง POST Request
- **When:** API รับ Request
- **Then:** Return HTTP 403 Forbidden

---

## 3. Definition of Done

- [ ] POST /admin/stickers API บันทึก Sticker สำเร็จ
- [ ] Validation คืน HTTP 400 เมื่อข้อมูลไม่ครบ
- [ ] RBAC Guard คืน HTTP 403 สำหรับ Non-Admin

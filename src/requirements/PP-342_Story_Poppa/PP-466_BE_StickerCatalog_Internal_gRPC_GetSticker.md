# PP-466 · [BE][StickerCatalog] Implement Internal gRPC — GetSticker RPC

| Field        | Value                                    |
|--------------|------------------------------------------|
| **Key**      | PP-466                                   |
| **Type**     | Sub-task                                 |
| **Project**  | POPPA                                    |
| **Status**   | To Do                                    |
| **Assignee** | —                                        |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md)        |

---

## User Story

> Service อื่นๆ ภายใน Backend สามารถเรียก gRPC GetSticker RPC เพื่อดึงข้อมูล Sticker ได้

---

## 1. Description

Implement Internal gRPC RPC `GetSticker` บน sticker-catalog-api ให้ Services ภายใน (เช่น story-api) สามารถ Query ข้อมูล Sticker ตาม ID หรือ List Stickers ที่ Active ได้ผ่าน gRPC Protocol

---

## 2. Acceptance Criteria

### Scenario 1 — GetSticker by ID

- **Given:** Internal Service ส่ง gRPC Request `GetSticker` พร้อม stickerId
- **When:** sticker-catalog-api รับ RPC
- **Then:** Return ข้อมูล Sticker ครบถ้วน (ID, Name, ImageURL, Status)

### Scenario 2 — ListActiveStickers

- **Given:** Internal Service ส่ง gRPC Request `ListActiveStickers`
- **When:** sticker-catalog-api รับ RPC
- **Then:** Return รายการ Sticker ที่มี Status = ACTIVE ทั้งหมด

### Scenario 3 — Sticker Not Found

- **Given:** stickerId ที่ระบุไม่มีใน Database
- **When:** gRPC RPC ถูกเรียก
- **Then:** Return gRPC Status NOT_FOUND

---

## 3. Definition of Done

- [ ] GetSticker RPC คืนข้อมูล Sticker ตาม ID
- [ ] ListActiveStickers RPC คืน Sticker ที่ Active ทั้งหมด
- [ ] Not Found คืน gRPC Status NOT_FOUND
- [ ] RPC ถูก Document ใน Proto File

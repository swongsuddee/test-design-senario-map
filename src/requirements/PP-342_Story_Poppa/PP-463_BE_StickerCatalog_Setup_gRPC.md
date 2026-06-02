# PP-463 · [BE][StickerCatalog] Setup gRPC Service Skeleton — sticker-catalog-api :50059

| Field        | Value                                    |
|--------------|------------------------------------------|
| **Key**      | PP-463                                   |
| **Type**     | Sub-task                                 |
| **Project**  | POPPA                                    |
| **Status**   | To Do                                    |
| **Assignee** | —                                        |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md)        |

---

## User Story

> ทีม Backend ตั้งค่า gRPC Service Skeleton สำหรับ Sticker Catalog ที่ Port 50059

---

## 1. Description

Setup gRPC Service Skeleton สำหรับ sticker-catalog-api ที่ Port :50059 กำหนด Proto Definitions, Service Skeleton, Health Check Endpoint, และ Basic Connection Verification

---

## 2. Acceptance Criteria

### Scenario 1 — Service Start

- **Given:** sticker-catalog-api ถูก Deploy
- **When:** Service เริ่มทำงาน
- **Then:** Service Listen บน Port :50059 สำเร็จ

### Scenario 2 — Health Check

- **Given:** Service กำลังทำงาน
- **When:** Client เรียก gRPC Health Check
- **Then:** Service Return SERVING Status

### Scenario 3 — Proto File Definition

- **Given:** Proto Files ถูกกำหนด
- **When:** Generate Code จาก Proto
- **Then:** Stub Classes ถูก Generate สำเร็จโดยไม่มี Error

---

## 3. Definition of Done

- [ ] gRPC Service Skeleton ทำงานที่ Port :50059
- [ ] Health Check คืน SERVING Status
- [ ] Proto Files ถูกกำหนดและ Generate Stub ได้
- [ ] Service Document Port และ Service Name

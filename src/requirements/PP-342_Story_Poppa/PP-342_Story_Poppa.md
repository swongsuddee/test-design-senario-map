# PP-342 · [M-App][End-User] Story - Poppa (สตอรี่หน้าหลัก)

| Field        | Value             |
|--------------|-------------------|
| **Key**      | PP-342            |
| **Type**     | Story             |
| **Project**  | POPPA             |
| **Status**   | In Progress             |
| **Assignee** | —                 |
| **Figma**    | Design by Dev     |

---

## User Story

> **ในฐานะ:** End-User ผู้ใช้งาน Mobile App
> **ฉันต้องการ:** แชร์ไลฟ์สไตล์แบบสั้นๆ ที่เป็นปัจจุบันที่สุด (Real-time) และหายไปภายใน 24 ชั่วโมง
> **เพื่อ:** ให้เพื่อน ๆ ได้รู้จักและอาจจะติดตามฉัน

---

## 1. Description

ฟีเจอร์ Story บน Mobile App ช่วยให้ End-User สามารถสร้างและแชร์เนื้อหาแบบสั้นๆ ที่หายไปใน 24 ชั่วโมง รองรับทั้งรูปภาพและวิดีโอสั้น (Trim 15 วินาที) พร้อมเครื่องมือแต่งสตอรี่ เช่น Insert Text, Zoom Text และ Sticker มี Button Menu สำหรับ Create: Post, Story, Reel และกรณีที่ยังไม่มีเพื่อนจะแสดงเป็น Follow Friend เพื่อให้ Story เพื่อนมาแสดงได้ในอนาคต รองรับ Story Archive สำหรับเก็บ Story ที่หมดอายุแล้ว

---

## 2. Acceptance Criteria

### Scenario 1 — Story Creation

- **Given:** End-User เปิดหน้าหลักของแอป
- **When:** กด Create Button และเลือก Story
- **Then:** ระบบเปิดหน้า Story Creation ให้อัปโหลดสื่อและแต่งสตอรี่ได้

### Scenario 2 — Story Viewing

- **Given:** End-User เปิดหน้าหลักของแอป
- **When:** มี Story ของเพื่อนปรากฏ
- **Then:** แสดง Story เพื่อนเรียงตามลำดับเวลา และ End-User สามารถกดดูได้

### Scenario 3 — No Friends State

- **Given:** End-User ยังไม่มีเพื่อนในระบบ
- **When:** เปิดหน้าหลัก
- **Then:** แสดง Follow Friend แทนที่ Story เพื่อน เพื่อชักชวนให้ติดตามคน

### Scenario 4 — Story Expiry

- **Given:** Story ถูกสร้างขึ้นมาแล้ว
- **When:** ผ่านไป 24 ชั่วโมง
- **Then:** Story หายออกจาก Feed อัตโนมัติ

### Scenario 5 — Story Archive

- **Given:** Story ของ End-User หมดอายุแล้ว
- **When:** End-User เข้า Story Archive
- **Then:** แสดง Story ที่หมดอายุในคลังเก็บ Story

---

## 3. Technical Rules

| Rule | Detail |
|------|--------|
| Story Expiry | Story หายไปอัตโนมัติหลัง 24 ชั่วโมง |
| VDO Trim | ตัดวิดีโอสูงสุด 15 วินาที |
| Sticker | ใช้ Sticker จาก Backend เท่านั้น |
| Infrastructure | MongoDB, Kafka Topics, Redis Keys |
| Sticker Catalog API | gRPC Service :50059 |

---

## 4. Definition of Done

- [ ] Story Creation & Media Upload ทำงานได้
- [ ] Story Viewing & Discovery ทำงานได้
- [ ] Story Viewer Insights แสดงผลถูกต้อง
- [ ] Insert Text / Zoom Text ทำงานได้
- [ ] VDO Editor Trim 15 วินาที ทำงานได้
- [ ] Insert Sticker ทำงานได้
- [ ] Story Archive ทำงานได้
- [ ] Backend APIs ครบทุก Endpoint
- [ ] Sticker Catalog gRPC Service ทำงานได้

---

## 5. Subtask Status

| Key | Summary | Status |
|-----|---------|--------|
| [PP-343](./PP-343_Story_Creation_Media_Upload.md) | Story Creation & Media Upload | To Do |
| [PP-344](./PP-344_Story_Viewing_Discovery.md) | Story Viewing & Discovery | To Do |
| [PP-345](./PP-345_Story_Viewer_Insights.md) | Story Viewer Insights | To Do |
| [PP-346](./PP-346_Insert_Text_Zoom_Text.md) | Insert Text ได้ / Zoom Text | To Do |
| [PP-347](./PP-347_VDO_Editor_Trim_15s.md) | VDO editor : Trim 15 วิ | To Do |
| [PP-348](./PP-348_Insert_Sticker.md) | Insert Sticker (Sticker BE มีให้เท่านั้น) | To Do |
| [PP-349](./PP-349_Story_Archive.md) | Story Archive (คลังเก็บ Story) | To Do |
| [PP-455](./PP-455_BE_Setup_Infrastructure.md) | [BE][Story] Setup Infrastructure — MongoDB, Kafka Topics, Redis Keys | Done |
| [PP-457](./PP-457_BE_Implement_API_Create_Story.md) | [BE][Story] Implement API Create Story | In Progress |
| [PP-458](./PP-458_BE_Implement_API_Get_Story_by_ID.md) | [BE][Story] Implement API Get Story by ID | Ready To Test STG |
| [PP-459](./PP-459_BE_Implement_API_Record_Story_View.md) | [BE][Story] Implement API Record Story View | To Do |
| [PP-460](./PP-460_BE_Implement_API_Reply_to_Story.md) | [BE][Story] Implement API Reply to Story | To Do |
| [PP-461](./PP-461_BE_Implement_API_Soft_Delete_Story.md) | [BE][Story] Implement API Soft Delete Story | To Do |
| [PP-462](./PP-462_BE_Implement_PubSub_Consumer_Story_Upload.md) | [BE][Story] Implement Pub/Sub Consumer — Story Upload Events | In Progress |
| [PP-463](./PP-463_BE_StickerCatalog_Setup_gRPC.md) | [BE][StickerCatalog] Setup gRPC Service Skeleton — sticker-catalog-api :50059 | To Do |
| [PP-464](./PP-464_BE_StickerCatalog_Admin_API_Create.md) | [BE][StickerCatalog] Implement Admin API Create Sticker | To Do |
| [PP-465](./PP-465_BE_StickerCatalog_Admin_API_Update_Deactivate.md) | [BE][StickerCatalog] Implement Admin API Update / Deactivate Sticker | To Do |
| [PP-466](./PP-466_BE_StickerCatalog_Internal_gRPC_GetSticker.md) | [BE][StickerCatalog] Implement Internal gRPC — GetSticker RPC | To Do |
| [PP-467](./PP-467_BE_Story_State_Machine.md) | [BE][Story] Implement Story State Machine & Transition Logic | To Do |
| [PP-468](./PP-468_BE_PubSub_Consumer_Story_Upload_Events.md) | [BE][Story] Implement Pub/Sub Consumer — Story Upload Events | To Do |
| [PP-503](./PP-503_BE_Story_Setup_gRPC_Service_Skeleton.md) | [BE][Story] Setup gRPC Service Skeleton — story-api :50057 | Ready To Test STG |
| [PP-567](./PP-567_Intregate_Home_Page_API.md) | [MB][End-User] intregate home page api | To Do |

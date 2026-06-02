# PP-503 · [BE][Story] Setup gRPC Service Skeleton — story-api :50057

| Field        | Value                                              |
|--------------|----------------------------------------------------|
| **Key**      | PP-503                                             |
| **Type**     | Sub-task                                           |
| **Project**  | POPPA                                              |
| **Status**   | Ready To Test STG |
| **Assignee** | Jack-Rachata Punyathananan                         |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md)                  |
| **Figma**    | Design by Dev                                      |

---

## User Story

สร้าง project structure เริ่มต้นสำหรับ `story-api` ซึ่งเป็น gRPC microservice หลักที่รับผิดชอบ story lifecycle ทั้งหมด รวมถึง define proto files สำหรับ RPC ทุกตัว และ wire up clients ของ MongoDB, Redis, Kafka ให้พร้อมใช้งาน

---

## 1. Acceptance Criteria

### Scenario 1 — Service Startup

- **Given:** story-api ถูก deploy ด้วย config ที่ถูกต้อง
- **When:** Service start up
- **Then:** ขึ้นได้บน port `:50057` โดยไม่ error และ Health check endpoint ตอบสนองได้

### Scenario 2 — Proto Files

- **Given:** Service skeleton ถูกสร้างแล้ว
- **When:** ตรวจสอบ proto files
- **Then:** ครอบคลุม RPC ทุกตัว: `CreateStory`, `GetStory`, `RecordView`, `ReplyToStory`, `DeleteStory`

### Scenario 3 — Client Connections

- **Given:** Config/environment variables ถูกต้อง
- **When:** Service start
- **Then:** MongoDB, Redis, Kafka clients เชื่อมต่อได้สำเร็จ

---

## 2. Technical Requirements

### INFRA
- ไม่มี infrastructure setup เพิ่มเติมใน task นี้ (ดู task setup-infrastructure-stories-kafka-redis)

### BE
- Initialize Go project structure สำหรับ `story-api`
- Define proto files สำหรับ RPC ทุกตัว: `CreateStory`, `GetStory`, `RecordView`, `ReplyToStory`, `DeleteStory`
- Wire up MongoDB client (connection pool, database name จาก config)
- Wire up Redis client
- Wire up Kafka producer และ consumer clients
- Wire up GCP Pub/Sub subscriber client
- Implement gRPC server boilerplate พร้อม graceful shutdown

---

## 3. Definition of Done

- [ ] Service ขึ้นได้บน port `:50057` โดยไม่ error
- [ ] Proto files ครอบคลุม RPC ทุกตัวที่ระบุ
- [ ] MongoDB, Redis, Kafka clients เชื่อมต่อได้
- [ ] Health check endpoint ตอบสนองได้

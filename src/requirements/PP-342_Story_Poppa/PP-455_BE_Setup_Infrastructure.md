# PP-455 · [BE][Story] Setup Infrastructure — MongoDB, Kafka Topics, Redis Keys

| Field        | Value                                    |
|--------------|------------------------------------------|
| **Key**      | PP-455                                   |
| **Type**     | Sub-task                                 |
| **Project**  | POPPA                                    |
| **Status**   | Done |
| **Assignee** | —                                        |
| **Parent**   | [PP-342](./PP-342_Story_Poppa.md)        |

---

## User Story

> ทีม Backend ตั้งค่า Infrastructure ที่จำเป็นสำหรับระบบ Story ได้แก่ MongoDB Collections, Kafka Topics, และ Redis Keys

---

## 1. Description

Setup Infrastructure สำหรับระบบ Story ประกอบด้วย MongoDB Collections สำหรับเก็บข้อมูล Story, กำหนด Kafka Topics สำหรับ Event Streaming, และ Redis Keys สำหรับ Cache/State Management

---

## 2. Acceptance Criteria

### Scenario 1 — MongoDB Setup

- **Given:** Infrastructure ยังไม่ได้ถูก Setup
- **When:** รัน Setup Script
- **Then:** MongoDB Collections สำหรับ Story ถูกสร้างพร้อม Index ที่เหมาะสม

### Scenario 2 — Kafka Topics Setup

- **Given:** Kafka Cluster พร้อมใช้งาน
- **When:** รัน Topic Creation Script
- **Then:** Kafka Topics ที่จำเป็นสำหรับ Story Events ถูกสร้าง

### Scenario 3 — Redis Keys Setup

- **Given:** Redis Instance พร้อมใช้งาน
- **When:** Application เริ่มทำงาน
- **Then:** Redis Keys Pattern สำหรับ Story State ถูกกำหนดและใช้งานได้

---

## 3. Definition of Done

- [ ] MongoDB Collections สำหรับ Story ถูกสร้างพร้อม Index
- [ ] Kafka Topics สำหรับ Story Events ถูกสร้าง
- [ ] Redis Keys Pattern ถูกกำหนดและ Document ไว้
- [ ] Infrastructure พร้อมรองรับ API Story
